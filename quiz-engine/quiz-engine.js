/**
 * Terraform Academy OSS — Quiz Engine
 * 
 * A configurable, multi-module quiz engine with:
 * - Sidebar navigation between modules
 * - Timed quizzes with per-question navigation
 * - Single-select and multi-select question support
 * - Progress tracking with localStorage persistence
 * - Review progress across all modules
 * - Module completion certificates
 * - Final certificate when all modules complete
 * - Dark/light theme toggle
 * - Mobile-responsive with hamburger menu
 *
 * MIT License — https://github.com/terraform-academy/oss
 */

const QuizEngine = (() => {
  // ─── Internal State ───
  let config = {
    title: 'Quiz',
    sidebarTitle: 'Modules',
    certTitle: 'Certificate of Completion',
    timePerModule: 1200,
    storageKey: 'quiz-engine-state',
    questions: {}
  };

  let state = {
    currentModule: null,
    currentQuestion: 0,
    answers: {},
    timer: 0,
    timerInterval: null,
    moduleProgress: {}
  };

  // ─── DOM References ───
  const $ = id => document.getElementById(id);

  // ─── Public API ───

  function init(userConfig) {
    Object.assign(config, userConfig);

    // Build module progress structure
    const moduleKeys = Object.keys(config.questions);
    moduleKeys.forEach(key => {
      state.moduleProgress[key] = { completed: false, score: 0, answers: {} };
    });

    // Set titles
    $('quiz-title').textContent = config.title;
    $('sidebar-title').textContent = config.sidebarTitle;
    $('final-cert-title').textContent = config.certTitle;

    // Build sidebar
    buildSidebar(moduleKeys);

    // Wire up event listeners
    $('submit-btn').onclick = submitAnswer;
    $('next-btn').onclick = nextQuestion;
    $('prev-btn').onclick = prevQuestion;
    $('themeToggle').onclick = toggleTheme;
    $('next-module-btn').onclick = nextModule;
    $('restart-module-btn').onclick = restartModule;
    $('restart-all-btn').onclick = restartAll;

    // Touch handling for mobile
    setupTouchHandlers();

    // Load persisted state
    loadTheme();
    loadState();

    // Start first module
    const startModule = state.currentModule || moduleKeys[0];
    loadModule(startModule);

    // Fade in
    document.body.classList.add('loaded');
  }

  // ─── Sidebar ───

  function buildSidebar(moduleKeys) {
    const list = $('module-list');
    list.innerHTML = '';

    moduleKeys.forEach(key => {
      const li = document.createElement('li');
      li.setAttribute('data-module', key);
      li.textContent = formatModuleName(key);
      li.onclick = () => loadModule(key);
      list.appendChild(li);
    });

    // Review progress tab
    document.querySelector('[data-module="review_progress"]').onclick = () => showReviewProgress();
  }

  function formatModuleName(key) {
    return key.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  function toggleMenu() {
    const sidebar = $('sidebar');
    const overlay = document.querySelector('.menu-overlay');
    const isOpen = sidebar.classList.contains('active');
    sidebar.classList.toggle('active', !isOpen);
    sidebar.classList.toggle('hidden', isOpen);
    document.body.style.overflow = isOpen ? '' : 'hidden';
  }

  // ─── Module Loading ───

  function loadModule(moduleKey) {
    if (moduleKey === 'review_progress') {
      showReviewProgress();
      return;
    }

    $('review-progress-container').style.display = 'none';
    $('quiz-container').style.display = 'flex';

    state.currentModule = moduleKey;
    state.currentQuestion = 0;
    state.answers = state.moduleProgress[moduleKey].answers || {};

    // Update sidebar active state
    document.querySelectorAll('#module-list li, #utility-list li').forEach(li => li.classList.remove('active'));
    const activeLi = document.querySelector(`[data-module="${moduleKey}"]`);
    if (activeLi) activeLi.classList.add('active');

    $('module-title').textContent = `${formatModuleName(moduleKey)} Quiz`;

    startTimer();
    loadQuestion();
    updateProgress();

    $('module-congratulations').classList.remove('active');
    $('final-certificate').classList.remove('active');

    if (window.innerWidth <= 768) {
      const sidebar = $('sidebar');
      if (sidebar.classList.contains('active')) toggleMenu();
    }
  }

  // ─── Timer ───

  function startTimer() {
    if (state.timerInterval) clearInterval(state.timerInterval);
    state.timer = config.timePerModule;
    updateTimerDisplay();
    state.timerInterval = setInterval(() => {
      state.timer--;
      updateTimerDisplay();
      if (state.timer <= 0) {
        clearInterval(state.timerInterval);
        submitModule();
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    const m = Math.floor(state.timer / 60);
    const s = state.timer % 60;
    $('timer').textContent = `Time Remaining: ${m}:${s < 10 ? '0' : ''}${s}`;
  }

  // ─── Question Rendering ───

  function loadQuestion() {
    const questions = config.questions[state.currentModule];
    const q = questions[state.currentQuestion];
    const isMulti = Array.isArray(q.answer);

    $('question').textContent = `${state.currentQuestion + 1}. ${q.text}${isMulti ? ' (Select ALL that apply)' : ''}`;

    const optionsDiv = $('options');
    optionsDiv.innerHTML = '';
    q.options.forEach((option, i) => {
      const letter = String.fromCharCode(65 + i);
      const inputType = isMulti ? 'checkbox' : 'radio';
      const isChecked = isMulti
        ? (state.answers[state.currentQuestion] || []).includes(letter)
        : state.answers[state.currentQuestion] === letter;

      const label = document.createElement('label');
      label.innerHTML = `<input type="${inputType}" name="answer" value="${letter}" ${isChecked ? 'checked' : ''}> ${option}`;
      optionsDiv.appendChild(label);
    });

    $('feedback').innerHTML = '';
    $('submit-btn').disabled = false;
    $('prev-btn').disabled = state.currentQuestion === 0;
    $('next-btn').disabled = state.answers[state.currentQuestion] === undefined;

    updateQuestionNav();
  }

  function updateQuestionNav() {
    const nav = $('question-nav');
    nav.innerHTML = '';
    config.questions[state.currentModule].forEach((_, i) => {
      const btn = document.createElement('button');
      btn.textContent = i + 1;
      if (state.answers[i] !== undefined) btn.classList.add('answered');
      if (i === state.currentQuestion) btn.classList.add('current');
      btn.onclick = () => {
        state.currentQuestion = i;
        loadQuestion();
      };
      nav.appendChild(btn);
    });
  }

  // ─── Answer Handling ───

  function submitAnswer() {
    const selected = document.querySelectorAll('input[name="answer"]:checked');
    if (selected.length === 0) {
      $('feedback').textContent = 'Please select an answer!';
      $('feedback').className = 'feedback incorrect';
      return;
    }

    const q = config.questions[state.currentModule][state.currentQuestion];
    const answers = Array.from(selected).map(el => el.value);
    const isMulti = Array.isArray(q.answer);

    let isCorrect;
    if (isMulti) {
      isCorrect = answers.length === q.answer.length && answers.every(v => q.answer.includes(v));
    } else {
      isCorrect = answers[0] === q.answer;
    }

    state.answers[state.currentQuestion] = isMulti ? answers : answers[0];

    const fb = $('feedback');
    fb.innerHTML = isCorrect ? 'Correct!' : `Incorrect. ${q.explanation}`;
    fb.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;

    $('submit-btn').disabled = true;
    $('next-btn').disabled = false;

    updateProgress();
    updateQuestionNav();
    saveState();
  }

  function nextQuestion() {
    const questions = config.questions[state.currentModule];
    if (state.currentQuestion < questions.length - 1) {
      state.currentQuestion++;
      loadQuestion();
    } else {
      submitModule();
    }
  }

  function prevQuestion() {
    if (state.currentQuestion > 0) {
      state.currentQuestion--;
      loadQuestion();
    }
  }

  // ─── Progress ───

  function updateProgress() {
    const answered = Object.keys(state.answers).length;
    const total = config.questions[state.currentModule].length;
    $('progress').style.width = `${(answered / total) * 100}%`;
  }

  // ─── Module Completion ───

  function submitModule() {
    clearInterval(state.timerInterval);
    const questions = config.questions[state.currentModule];
    let score = 0;

    questions.forEach((q, i) => {
      const userAnswer = state.answers[i];
      if (userAnswer === undefined) return;
      if (Array.isArray(q.answer)) {
        if (Array.isArray(userAnswer) && userAnswer.length === q.answer.length && userAnswer.every(v => q.answer.includes(v))) score++;
      } else {
        if (userAnswer === q.answer) score++;
      }
    });

    state.moduleProgress[state.currentModule].score = score;
    state.moduleProgress[state.currentModule].completed = true;
    state.moduleProgress[state.currentModule].answers = { ...state.answers };
    saveState();

    $('completed-module').textContent = formatModuleName(state.currentModule);
    $('module-score').textContent = `${score}/${questions.length}`;
    generateSummary('module');
    $('module-congratulations').classList.add('active');

    checkFinalCompletion();
  }

  function nextModule() {
    const modules = Object.keys(config.questions);
    const idx = modules.indexOf(state.currentModule);
    loadModule(modules[(idx + 1) % modules.length]);
  }

  function restartModule() {
    state.answers = {};
    state.moduleProgress[state.currentModule] = { completed: false, score: 0, answers: {} };
    saveState();
    loadModule(state.currentModule);
  }

  function restartAll() {
    Object.keys(state.moduleProgress).forEach(key => {
      state.moduleProgress[key] = { completed: false, score: 0, answers: {} };
    });
    state.answers = {};
    saveState();
    loadModule(Object.keys(config.questions)[0]);
    $('final-certificate').classList.remove('active');
  }

  function checkFinalCompletion() {
    if (Object.values(state.moduleProgress).every(m => m.completed)) {
      $('completion-date').textContent = new Date().toLocaleDateString();
      generateSummary('final');
      $('final-certificate').classList.add('active');
    }
  }

  // ─── Review Progress ───

  function showReviewProgress() {
    $('quiz-container').style.display = 'none';
    $('module-congratulations').classList.remove('active');
    $('final-certificate').classList.remove('active');
    if (state.timerInterval) clearInterval(state.timerInterval);
    $('timer').textContent = '';

    const container = $('review-progress-container');
    container.style.display = 'block';

    let html = '<h2>Overall Progress Summary</h2>';
    html += '<p style="margin-bottom:20px;color:var(--primary-text);opacity:0.7;">Review the incorrect answers to improve your score.</p>';

    Object.keys(config.questions).forEach(key => {
      const data = state.moduleProgress[key];
      const total = config.questions[key].length;
      const pct = total > 0 ? ((data.score / total) * 100).toFixed(0) : 0;

      html += `
        <div class="review-module-summary ${data.completed ? 'completed' : 'not-completed'}">
          <strong>${formatModuleName(key)}</strong><br>
          Status: ${data.completed ? 'Completed' : 'Not Started'}<br>
          Score: ${data.score} / ${total} (${pct}%)
        </div>`;
    });
    container.innerHTML = html;

    document.querySelectorAll('#module-list li, #utility-list li').forEach(li => li.classList.remove('active'));
    document.querySelector('[data-module="review_progress"]').classList.add('active');

    if (window.innerWidth <= 768) {
      const sidebar = $('sidebar');
      if (sidebar.classList.contains('active')) toggleMenu();
    }
  }

  // ─── Summary Generation ───

  function generateSummary(type) {
    const checkSVG = '<svg style="width:16px;height:16px;vertical-align:middle;margin-left:4px;" viewBox="0 0 16 16" fill="#28a745"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/></svg>';
    const xSVG = '<svg style="width:16px;height:16px;vertical-align:middle;margin-left:4px;" viewBox="0 0 16 16" fill="#dc3545"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>';

    function getAnswerText(q, ans) {
      if (ans === undefined || ans === null) return 'Not answered';
      const getText = opt => q.options[opt.charCodeAt(0) - 65];
      return Array.isArray(ans) ? ans.map(getText).join(', ') : getText(ans);
    }

    function isCorrect(q, ans) {
      if (ans === undefined || ans === null) return false;
      if (Array.isArray(q.answer)) {
        return Array.isArray(ans) && ans.length === q.answer.length && ans.every(v => q.answer.includes(v));
      }
      return ans === q.answer;
    }

    function buildItems(questions, answers) {
      let html = '';
      questions.forEach((q, i) => {
        const ans = answers[i];
        const correct = isCorrect(q, ans);
        html += `
          <div class="summary-item ${correct ? 'correct' : 'incorrect'}">
            <strong>Q${i + 1}:</strong> ${q.text}<br>
            <strong>Your answer:</strong> ${getAnswerText(q, ans)} ${correct ? checkSVG : xSVG}<br>
            ${!correct ? `<strong>Correct answer:</strong> ${getAnswerText(q, q.answer)}<br>` : ''}
            <em>${q.explanation}</em>
          </div>`;
      });
      return html;
    }

    if (type === 'module') {
      $('question-summary-module').innerHTML = '<h3>Module Review</h3>' +
        buildItems(config.questions[state.currentModule], state.moduleProgress[state.currentModule].answers);
    } else {
      let html = '<h3>Final Quiz Review</h3>';
      Object.keys(config.questions).forEach(key => {
        if (state.moduleProgress[key]?.completed) {
          html += `<h4>${formatModuleName(key)}</h4>`;
          html += buildItems(config.questions[key], state.moduleProgress[key].answers);
        }
      });
      $('question-summary-final').innerHTML = html;
    }
  }

  // ─── Theme ───

  function toggleTheme() {
    const current = document.body.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', next);
    localStorage.setItem(`${config.storageKey}-theme`, next);
  }

  function loadTheme() {
    const saved = localStorage.getItem(`${config.storageKey}-theme`) || 'dark';
    document.body.setAttribute('data-theme', saved);
  }

  // ─── Persistence ───

  function saveState() {
    try {
      const toSave = {
        currentModule: state.currentModule,
        currentQuestion: state.currentQuestion,
        answers: state.answers,
        moduleProgress: state.moduleProgress
      };
      localStorage.setItem(config.storageKey, JSON.stringify(toSave));
    } catch (e) {
      console.warn('QuizEngine: Could not save state', e);
    }
  }

  function loadState() {
    try {
      const saved = localStorage.getItem(config.storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.moduleProgress && parsed.currentModule) {
          state.currentModule = parsed.currentModule;
          state.currentQuestion = parsed.currentQuestion || 0;
          state.answers = parsed.answers || {};
          // Merge saved progress with current module structure
          Object.keys(parsed.moduleProgress).forEach(key => {
            if (state.moduleProgress[key]) {
              state.moduleProgress[key] = parsed.moduleProgress[key];
            }
          });
        }
      }
    } catch (e) {
      console.warn('QuizEngine: Could not load state', e);
    }
  }

  // ─── Touch Handling ───

  function setupTouchHandlers() {
    document.addEventListener('touchstart', e => {
      if (e.touches.length > 1) e.preventDefault();
    }, { passive: false });

    document.addEventListener('touchmove', e => {
      let target = e.target;
      let canScroll = false;
      while (target && target !== document.body) {
        const style = window.getComputedStyle(target);
        if (style.overflowY === 'auto' || style.overflowY === 'scroll') {
          if (target.scrollHeight > target.clientHeight) {
            canScroll = true;
            break;
          }
        }
        target = target.parentElement;
      }
      if (!canScroll) e.preventDefault();
    }, { passive: false });

    document.addEventListener('dblclick', e => e.preventDefault());
  }

  // ─── Expose Public API ───
  return { init, toggleMenu };
})();
