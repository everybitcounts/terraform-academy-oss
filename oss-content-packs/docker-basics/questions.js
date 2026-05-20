/**
 * Docker Basics Question Bank
 * Open Source Content Pack for Terraform Academy OSS
 *
 * 20 questions covering core Docker concepts
 * Suitable for beginners and those preparing for Docker Certified Associate (DCA)
 *
 * License: Apache-2.0
 * Attribution: Built with Terraform Academy OSS (https://github.com/everybitcounts/terraform-academy-oss)
 * More questions available at https://terraformacademy.app (MAX — full DCA track)
 */

const DockerBasicsQuestions = {
  id: 'docker-basics',
  title: 'Docker Basics',
  description: 'Core concepts: images, containers, Dockerfiles, Compose, networking, and registries',
  version: '1.0.0',
  license: 'Apache-2.0',
  difficulty: 'beginner',
  estimatedTime: 25,
  passingScore: 70,
  examDomain: 'Docker Certified Associate (DCA) foundations',

  questions: [
    {
      id: 'dkr-001',
      question: 'What is a Docker image?',
      options: [
        'A running instance of a container',
        'A read-only template used to create containers',
        'A virtual machine snapshot',
        'A Dockerfile script'
      ],
      correct: 1,
      explanation: 'A Docker image is a read-only template containing the application code, runtime, libraries, and settings needed to create a container. Images are built from Dockerfiles and stored in registries.'
    },
    {
      id: 'dkr-002',
      question: 'Which command runs a container from the "nginx:latest" image and maps host port 8080 to container port 80?',
      options: [
        'docker start nginx:latest -p 8080:80',
        'docker run -p 8080:80 nginx:latest',
        'docker run --port 8080:80 nginx:latest',
        'docker exec -p 8080:80 nginx:latest'
      ],
      correct: 1,
      explanation: '"docker run -p 8080:80 nginx:latest" maps host port 8080 to container port 80. The format is -p <host_port>:<container_port>.'
    },
    {
      id: 'dkr-003',
      question: 'What does the COPY instruction do in a Dockerfile?',
      options: [
        'Copies files from one container to another',
        'Copies files or directories from the build context into the container filesystem',
        'Downloads files from a URL into the container',
        'Copies environment variables from the host'
      ],
      correct: 1,
      explanation: 'COPY copies files and directories from the build context (your local machine) into the container\'s filesystem. ADD is similar but also handles URLs and tar extraction.'
    },
    {
      id: 'dkr-004',
      question: 'What is Docker Compose primarily used for?',
      options: [
        'Building container images from source code',
        'Defining and running multi-container Docker applications',
        'Orchestrating containers across multiple machines',
        'Creating Docker networks manually'
      ],
      correct: 1,
      explanation: 'Docker Compose defines and runs multi-container applications using a YAML file (docker-compose.yml). It manages services, networks, and volumes for local development and testing.'
    },
    {
      id: 'dkr-005',
      question: 'Which Dockerfile instruction sets the working directory for subsequent RUN, COPY, and CMD instructions?',
      options: ['PATH', 'WORKDIR', 'DIR', 'CD'],
      correct: 1,
      explanation: 'WORKDIR sets the working directory inside the container for any RUN, CMD, ENTRYPOINT, COPY, and ADD instructions that follow it. It creates the directory if it does not exist.'
    },
    {
      id: 'dkr-006',
      question: 'What is the purpose of a .dockerignore file?',
      options: [
        'Lists Docker images to exclude from the registry',
        'Specifies files and directories to exclude from the build context sent to the daemon',
        'Prevents certain containers from starting automatically',
        'Configures which ports to ignore during container binding'
      ],
      correct: 1,
      explanation: 'A .dockerignore file prevents specified files and directories from being included in the build context sent to the Docker daemon. This reduces build time and image size, and prevents leaking sensitive files into images.'
    },
    {
      id: 'dkr-007',
      question: 'What is an image layer in Docker?',
      options: [
        'A security boundary between containers',
        'A read-only filesystem change created by each Dockerfile instruction',
        'A network segment connecting containers',
        'A compressed backup of container state'
      ],
      correct: 1,
      explanation: 'Each instruction in a Dockerfile creates a new read-only layer on top of the previous ones. Layers are cached and reused across builds, making subsequent builds faster when only later layers change.'
    },
    {
      id: 'dkr-008',
      question: 'Which command removes all stopped containers, unused networks, dangling images, and build cache?',
      options: [
        'docker rm --all',
        'docker clean',
        'docker system prune',
        'docker purge'
      ],
      correct: 2,
      explanation: '"docker system prune" removes all stopped containers, all networks not used by at least one container, all dangling images, and all build cache. Add -a to also remove unused images (not just dangling).'
    },
    {
      id: 'dkr-009',
      question: 'What is the difference between CMD and ENTRYPOINT in a Dockerfile?',
      options: [
        'CMD runs at build time; ENTRYPOINT runs at start time',
        'ENTRYPOINT defines the executable that always runs; CMD provides default arguments that can be overridden',
        'They are identical — both define the container start command',
        'CMD defines the image; ENTRYPOINT defines the container'
      ],
      correct: 1,
      explanation: 'ENTRYPOINT sets the executable that always runs when the container starts. CMD provides default arguments to ENTRYPOINT, or the default command if ENTRYPOINT is not set. CMD arguments can be overridden at runtime; ENTRYPOINT typically cannot without --entrypoint.'
    },
    {
      id: 'dkr-010',
      question: 'What does "docker build -t myapp:v1 ." do?',
      options: [
        'Pulls the myapp:v1 image and runs it',
        'Builds a Docker image from the current directory Dockerfile and tags it as myapp:v1',
        'Starts a container named myapp with version v1',
        'Tests the Docker build environment'
      ],
      correct: 1,
      explanation: '"docker build" builds an image from a Dockerfile. -t tags the resulting image as myapp:v1. The trailing "." specifies the build context (current directory, where Docker looks for the Dockerfile).'
    },
    {
      id: 'dkr-011',
      question: 'What is a multi-stage Docker build used for?',
      options: [
        'Running multiple applications in a single container',
        'Building separate images for development, staging, and production',
        'Producing small production images by discarding build-time dependencies',
        'Connecting multiple Docker hosts together'
      ],
      correct: 2,
      explanation: 'Multi-stage builds use multiple FROM statements in one Dockerfile. You build the application in one stage (with compilers, SDKs, etc.) and copy only the final artifact into a lean runtime image — dramatically reducing final image size.'
    },
    {
      id: 'dkr-012',
      question: 'Which Docker network driver allows containers to communicate directly using the host machine\'s network stack?',
      options: ['bridge', 'overlay', 'host', 'none'],
      correct: 2,
      explanation: 'The host network driver removes network isolation between the container and the host. The container shares the host\'s network namespace directly. Bridge is the default for standalone containers. Overlay is used for Swarm multi-host networking.'
    },
    {
      id: 'dkr-013',
      question: 'How do you persist data beyond the lifecycle of a container?',
      options: [
        'Use PERSIST instruction in the Dockerfile',
        'Mount a Docker volume or bind mount to the container',
        'Set the container restart policy to always',
        'Enable container checkpointing'
      ],
      correct: 1,
      explanation: 'Volumes and bind mounts persist data outside the container\'s writable layer. Named volumes are managed by Docker and survive container deletion. Bind mounts map a specific host path into the container.'
    },
    {
      id: 'dkr-014',
      question: 'What is Docker Hub?',
      options: [
        'The Docker command-line tool',
        'A cloud-based registry for storing and sharing container images',
        'The Docker Desktop management interface',
        'A tool for orchestrating Docker Swarm clusters'
      ],
      correct: 1,
      explanation: 'Docker Hub is the default public container registry. It hosts official images (nginx, node, postgres, etc.), public community images, and private repositories. You push images with "docker push" and pull with "docker pull".'
    },
    {
      id: 'dkr-015',
      question: 'Which command executes an interactive shell inside a running container named "web"?',
      options: [
        'docker attach web /bin/bash',
        'docker shell web',
        'docker exec -it web /bin/bash',
        'docker run -it web /bin/bash'
      ],
      correct: 2,
      explanation: '"docker exec -it web /bin/bash" runs an interactive bash shell in the already-running container "web". -i keeps stdin open; -t allocates a pseudo-TTY. Use "docker run" to start a new container from an image instead.'
    },
    {
      id: 'dkr-016',
      question: 'What does the ENV instruction do in a Dockerfile?',
      options: [
        'Imports environment variables from the host machine',
        'Sets environment variables that persist in the container at runtime',
        'Defines build arguments used only during image build',
        'Encrypts sensitive configuration values'
      ],
      correct: 1,
      explanation: 'ENV sets environment variables that are available both during the build process and when the container runs. Use ARG for build-time only variables. ENV values appear in "docker inspect" output, so do not use them for secrets.'
    },
    {
      id: 'dkr-017',
      question: 'What is the purpose of EXPOSE in a Dockerfile?',
      options: [
        'Automatically publishes the port to the host network',
        'Documents which ports the container intends to listen on at runtime',
        'Opens a firewall rule on the host for the specified port',
        'Maps a container port to a dynamic host port'
      ],
      correct: 1,
      explanation: 'EXPOSE is documentation — it tells users and tooling which ports the application listens on, but does NOT actually publish the port. You still need -p or -P with "docker run" to publish ports to the host.'
    },
    {
      id: 'dkr-018',
      question: 'What does "docker ps -a" show?',
      options: [
        'All images on the local system',
        'All containers, including stopped ones',
        'All running containers only',
        'All volumes and networks'
      ],
      correct: 1,
      explanation: '"docker ps" shows only running containers. Adding -a (--all) shows all containers regardless of state — running, stopped, exited, and created.'
    },
    {
      id: 'dkr-019',
      question: 'Which Docker Compose command stops and removes containers, networks, and volumes defined in docker-compose.yml?',
      options: [
        'docker compose stop',
        'docker compose kill',
        'docker compose down',
        'docker compose remove'
      ],
      correct: 2,
      explanation: '"docker compose down" stops and removes containers and networks. Add -v to also remove named volumes. "docker compose stop" only stops containers without removing them.'
    },
    {
      id: 'dkr-020',
      question: 'What is a dangling Docker image?',
      options: [
        'An image that has no running containers',
        'An image layer that is no longer referenced by any tagged image',
        'An image pulled from an untrusted registry',
        'An image with no CMD or ENTRYPOINT instruction'
      ],
      correct: 1,
      explanation: 'Dangling images are image layers that are no longer referenced by a tagged image — typically created when you rebuild an image with the same tag. They show as "<none>:<none>" in "docker images". Remove them with "docker image prune".'
    }
  ]
};

if (typeof module !== 'undefined') module.exports = DockerBasicsQuestions;
