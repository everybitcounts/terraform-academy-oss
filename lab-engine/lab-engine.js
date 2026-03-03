/**
 * Terraform Academy OSS — Lab Engine
 *
 * A configurable interactive lab with:
 * - Code editor with file tree navigation
 * - Terminal emulator with simulated output
 * - Fullscreen modal editors with line numbers
 * - Code validation against configurable rules
 * - Show answer / restart lab functionality
 * - Completion celebration screen
 * - Dev mode / App mode theme toggle
 * - Mobile-first responsive design
 *
 * MIT License — https://github.com/terraform-academy/oss
 */

const LabEngine = (() => {
  let labConfig = null;
  let files = {};

  // ─── DOM ───
  const $ = id => document.getElementById(id);

  // ─── Public API ───

  function init(config) {
    labConfig = config;
    files = { ...config.files };

    // Set titles
    $('lab-title').textContent = config.title;
    $('instruction-title').textContent = config.instructionTitle || 'Instructions';
    $('instruction-body').innerHTML = config.instructionHTML;
    $('completion-text').textContent = `Congrats on completing the ${config.title}!`;

    // Build file tree
    buildFileTree(config.fileTree);

    // Wire up modal syncs
    setupModalSync();

    // Load saved theme
    loadTheme();

    // Load first file
    if (config.defaultFile) {
      loadFile(config.defaultFile);
    }
  }

  // ─── File Tree ───

  function buildFileTree(tree) {
    const container = $('file-tree');
    container.innerHTML = renderTree(tree);
  }

  function renderTree(node, depth = 0) {
    if (typeof node === 'string') {
      // Leaf file
      return `<li class="file" onclick="LabEngine.loadFile('${node}')" style="padding-left:${depth * 15}px;">📄 ${node}</li>`;
    }
    if (Array.isArray(node)) {
      return node.map(item => renderTree(item, depth)).join('');
    }
    // Folder object: { name, children }
    let html = `<li style="padding-left:${depth * 15}px;">📁 ${node.name}</li>`;
    html += `<ul>${node.children.map(c => renderTree(c, depth + 1)).join('')}</ul>`;
    return `<ul>${html}</ul>`;
  }

  function loadFile(filename) {
    const editor = $('editor');
    editor.value = files[filename] || `# ${filename}\n`;
    editor.dataset.file = filename;

    if ($('editorModal').open) {
      $('editorModalContent').value = editor.value;
      updateLineNumbers($('editorModalContent'), $('editorLineNumbers'));
    }
  }

  // ─── Code Validation ───

  function check() {
    const editor = $('editor');
    const code = editor.value.trim();
    const currentFile = editor.dataset.file;

    // Save current file content
    files[currentFile] = editor.value;

    let output = $('terminal').value + '\n\nChecking your code...\n';

    // Check file requirement
    if (labConfig.requiredFile && currentFile !== labConfig.requiredFile) {
      output += `Error: Please edit ${labConfig.requiredFile} to add the required resources.`;
      writeTerminal(output);
      return;
    }

    // Run validation rules
    const rules = labConfig.validationRules || [];
    const failures = [];

    rules.forEach(rule => {
      if (!code.includes(rule.contains)) {
        failures.push(rule.message);
      }
    });

    if (failures.length === 0) {
      output += labConfig.successMessage || 'Success! Your code is correct.\nAll resources validated successfully.';
      writeTerminal(output);
      showCompletion();
    } else {
      output += 'Error: Your code is incomplete.\n' + failures.map(f => `  - ${f}`).join('\n');
      writeTerminal(output);
    }
  }

  function showAnswer() {
    const editor = $('editor');
    if (labConfig.requiredFile && editor.dataset.file !== labConfig.requiredFile) {
      loadFile(labConfig.requiredFile);
    }
    editor.value = labConfig.solution || '# No solution provided';
    $('editorModalContent').value = editor.value;
    updateLineNumbers($('editorModalContent'), $('editorLineNumbers'));

    const output = $('terminal').value + '\n\nSolution displayed in the editor.\nYou can now check the code or modify it.';
    writeTerminal(output);
  }

  function restart() {
    files = { ...labConfig.files };
    if (labConfig.defaultFile) loadFile(labConfig.defaultFile);

    const initMsg = 'Initializing lab environment...\nReady.\n\nLab restarted. All changes have been reset.';
    writeTerminal(initMsg);

    const instructions = $('instructions');
    if (instructions.classList.contains('hidden')) {
      instructions.classList.remove('hidden');
      document.querySelector('.instructions-toggle').textContent = 'Hide Instructions';
    }

    $('completionPrompt').style.display = 'none';
  }

  function clearTerminal() {
    writeTerminal('Terminal cleared.\nInitializing lab environment...\nReady.');
  }

  // ─── Terminal ───

  function writeTerminal(text) {
    $('terminal').value = text;
    $('terminalModalContent').value = text;
    $('terminal').scrollTop = $('terminal').scrollHeight;
    $('terminalModalContent').scrollTop = $('terminalModalContent').scrollHeight;
    updateLineNumbers($('terminalModalContent'), $('terminalLineNumbers'));
  }

  // ─── Modals ───

  function openEditorModal() {
    $('editorModalContent').value = $('editor').value;
    $('editorModal').showModal();
    updateLineNumbers($('editorModalContent'), $('editorLineNumbers'));
    $('editorModalContent').focus();
  }

  function closeEditorModal() {
    $('editor').value = $('editorModalContent').value;
    $('editorModal').close();
  }

  function openTerminalModal() {
    $('terminalModalContent').value = $('terminal').value;
    $('terminalModal').showModal();
    updateLineNumbers($('terminalModalContent'), $('terminalLineNumbers'));
  }

  function closeTerminalModal() {
    $('terminalModal').close();
  }

  function updateLineNumbers(textarea, lineNumbersDiv) {
    const lines = textarea.value.split('\n').length;
    lineNumbersDiv.innerHTML = '';
    for (let i = 1; i <= Math.max(lines, 1); i++) {
      const div = document.createElement('div');
      div.textContent = i;
      lineNumbersDiv.appendChild(div);
    }
  }

  function setupModalSync() {
    $('editor').addEventListener('input', () => {
      if ($('editorModal').open) {
        $('editorModalContent').value = $('editor').value;
        updateLineNumbers($('editorModalContent'), $('editorLineNumbers'));
      }
    });

    $('editorModalContent').addEventListener('input', () => {
      $('editor').value = $('editorModalContent').value;
      updateLineNumbers($('editorModalContent'), $('editorLineNumbers'));
    });

    $('editorModalContent').addEventListener('scroll', () => {
      $('editorLineNumbers').scrollTop = $('editorModalContent').scrollTop;
    });

    $('terminalModalContent').addEventListener('scroll', () => {
      $('terminalLineNumbers').scrollTop = $('terminalModalContent').scrollTop;
    });
  }

  // ─── Instructions ───

  function toggleInstructions() {
    const el = $('instructions');
    el.classList.toggle('hidden');
    document.querySelector('.instructions-toggle').textContent =
      el.classList.contains('hidden') ? 'Show Instructions' : 'Hide Instructions';
  }

  // ─── Theme ───

  function toggleTheme() {
    document.body.classList.toggle('app-mode');
    document.querySelector('.theme-toggle').textContent =
      document.body.classList.contains('app-mode') ? 'Dev Mode' : 'App Mode';
    localStorage.setItem('lab-theme', document.body.classList.contains('app-mode') ? 'app-mode' : 'dev-mode');
  }

  function loadTheme() {
    const saved = localStorage.getItem('lab-theme') || 'dev-mode';
    if (saved === 'app-mode') {
      document.body.classList.add('app-mode');
      document.querySelector('.theme-toggle').textContent = 'Dev Mode';
    }
  }

  // ─── Completion ───

  function showCompletion() {
    $('completionPrompt').style.display = 'block';
  }

  // ─── Expose Public API ───
  return {
    init, loadFile, check, showAnswer, restart, clearTerminal,
    openEditorModal, closeEditorModal, openTerminalModal, closeTerminalModal,
    toggleInstructions, toggleTheme
  };
})();
