/**
 * Kubernetes Basics Question Bank
 * Open Source Content Pack for Terraform Academy OSS
 *
 * 20 questions covering core Kubernetes concepts
 * Suitable for beginners and those preparing for CKAD / CKA
 *
 * License: Apache-2.0
 * Attribution: Built with Terraform Academy OSS (https://github.com/everybitcounts/terraform-academy-oss)
 * More questions available at https://terraformacademy.app (MAX — CKAD and CKA full tracks)
 */

const KubernetesBasicsQuestions = {
  id: 'kubernetes-basics',
  title: 'Kubernetes Basics',
  description: 'Core concepts: pods, deployments, services, config, and the control plane',
  version: '1.0.0',
  license: 'Apache-2.0',
  difficulty: 'beginner',
  estimatedTime: 25,
  passingScore: 70,
  examDomain: 'CKAD / CKA foundations',

  questions: [
    {
      id: 'k8s-001',
      question: 'What is the smallest deployable unit in Kubernetes?',
      options: ['Container', 'Pod', 'Deployment', 'Node'],
      correct: 1,
      explanation: 'A Pod is the smallest deployable unit in Kubernetes. It can contain one or more containers that share the same network namespace and storage volumes.'
    },
    {
      id: 'k8s-002',
      question: 'Which Kubernetes object ensures a specified number of Pod replicas are running at any given time?',
      options: ['StatefulSet', 'DaemonSet', 'ReplicaSet', 'Job'],
      correct: 2,
      explanation: 'A ReplicaSet maintains a stable set of replica Pods running at any given time. Deployments manage ReplicaSets and are the preferred way to work with replicas.'
    },
    {
      id: 'k8s-003',
      question: 'What kubectl command shows all running pods in the current namespace?',
      options: ['kubectl list pods', 'kubectl get pods', 'kubectl describe pods', 'kubectl show pods'],
      correct: 1,
      explanation: '"kubectl get pods" lists all pods in the current namespace. Add -A or --all-namespaces to list pods across all namespaces.'
    },
    {
      id: 'k8s-004',
      question: 'Which Service type exposes a pod on a static port on every node in the cluster?',
      options: ['ClusterIP', 'LoadBalancer', 'ExternalName', 'NodePort'],
      correct: 3,
      explanation: 'NodePort exposes the service on a static port on each node\'s IP. ClusterIP is internal-only. LoadBalancer provisions an external load balancer. ExternalName maps to a DNS name.'
    },
    {
      id: 'k8s-005',
      question: 'What is a Namespace used for in Kubernetes?',
      options: [
        'Grouping nodes by region',
        'Isolating resources within a cluster into logical partitions',
        'Defining container image versions',
        'Configuring network policies between pods'
      ],
      correct: 1,
      explanation: 'Namespaces provide a mechanism for isolating groups of resources within a single cluster. They are used to divide cluster resources between multiple users or teams.'
    },
    {
      id: 'k8s-006',
      question: 'Which component is the entry point for all administrative commands to the Kubernetes cluster?',
      options: ['kubelet', 'etcd', 'kube-apiserver', 'kube-scheduler'],
      correct: 2,
      explanation: 'The kube-apiserver is the front end for the Kubernetes control plane. All kubectl commands and other clients interact with the cluster through the API server.'
    },
    {
      id: 'k8s-007',
      question: 'What does a Kubernetes ConfigMap store?',
      options: [
        'Encrypted secrets for use by pods',
        'Non-confidential configuration data as key-value pairs',
        'Container image pull credentials',
        'Node resource limits'
      ],
      correct: 1,
      explanation: 'ConfigMaps store non-sensitive configuration data as key-value pairs. Pods can consume ConfigMaps as environment variables, command-line arguments, or config files in a volume.'
    },
    {
      id: 'k8s-008',
      question: 'What is the difference between a liveness probe and a readiness probe?',
      options: [
        'They are the same — both restart the container on failure',
        'Liveness restarts the container when it fails; readiness removes it from service endpoints when it fails',
        'Readiness restarts the container; liveness marks it unschedulable',
        'Liveness checks network connectivity; readiness checks CPU usage'
      ],
      correct: 1,
      explanation: 'A liveness probe determines if a container is running — failure causes a restart. A readiness probe determines if a container is ready to serve traffic — failure removes it from Service endpoints without restarting it.'
    },
    {
      id: 'k8s-009',
      question: 'Which Kubernetes object is best suited for running a batch job that should complete and exit?',
      options: ['Deployment', 'DaemonSet', 'Job', 'StatefulSet'],
      correct: 2,
      explanation: 'A Job creates one or more Pods and ensures that a specified number of them successfully terminate. Jobs are designed for batch tasks that run to completion, unlike Deployments which manage long-running services.'
    },
    {
      id: 'k8s-010',
      question: 'What does "kubectl apply -f manifest.yaml" do?',
      options: [
        'Validates the manifest without creating any resources',
        'Creates or updates resources defined in the YAML file declaratively',
        'Deletes and recreates all resources in the file',
        'Applies resource limits defined in the file'
      ],
      correct: 1,
      explanation: '"kubectl apply" creates resources if they don\'t exist, or updates them if they do — a declarative approach. This is different from "kubectl create" which fails if the resource already exists.'
    },
    {
      id: 'k8s-011',
      question: 'What component on each worker node manages pods and ensures containers are running?',
      options: ['kube-proxy', 'kubelet', 'kube-scheduler', 'controller-manager'],
      correct: 1,
      explanation: 'The kubelet is an agent that runs on each node. It ensures containers described in PodSpecs are running and healthy. It communicates with the API server and manages the container runtime.'
    },
    {
      id: 'k8s-012',
      question: 'How do you scale a Deployment named "api" to 5 replicas using kubectl?',
      options: [
        'kubectl resize deployment api --replicas=5',
        'kubectl set replicas deployment/api 5',
        'kubectl scale deployment/api --replicas=5',
        'kubectl update deployment api replicas=5'
      ],
      correct: 2,
      explanation: '"kubectl scale deployment/api --replicas=5" is the correct command. The scale subcommand works on Deployments, ReplicaSets, and StatefulSets.'
    },
    {
      id: 'k8s-013',
      question: 'What is etcd\'s role in a Kubernetes cluster?',
      options: [
        'Container runtime for running pods',
        'Network plugin for pod-to-pod communication',
        'Consistent and highly-available key-value store for all cluster state',
        'Load balancer for distributing traffic to pods'
      ],
      correct: 2,
      explanation: 'etcd is a distributed key-value store that Kubernetes uses as its backing store for all cluster state. All cluster data — including pod specs, secrets, and service configs — is stored in etcd.'
    },
    {
      id: 'k8s-014',
      question: 'Which resource type would you use to run a single copy of a pod on every node in the cluster?',
      options: ['Deployment', 'StatefulSet', 'DaemonSet', 'ReplicaSet'],
      correct: 2,
      explanation: 'A DaemonSet ensures that a copy of a Pod runs on all (or selected) nodes. Common use cases include log collectors, monitoring agents, and network plugins like Calico.'
    },
    {
      id: 'k8s-015',
      question: 'What is the default Service type when you create a Service without specifying a type?',
      options: ['NodePort', 'LoadBalancer', 'ClusterIP', 'ExternalName'],
      correct: 2,
      explanation: 'ClusterIP is the default Service type. It exposes the Service on a cluster-internal IP, making it reachable only from within the cluster.'
    },
    {
      id: 'k8s-016',
      question: 'What does a PersistentVolumeClaim (PVC) do?',
      options: [
        'Defines a storage class for dynamic provisioning',
        'Requests a specific amount and type of storage from the cluster',
        'Mounts a hostPath directory into a pod',
        'Restricts pod access to persistent volumes by namespace'
      ],
      correct: 1,
      explanation: 'A PersistentVolumeClaim is a request for storage by a user. It specifies the size, access modes, and optionally a StorageClass. Kubernetes binds the PVC to a matching PersistentVolume.'
    },
    {
      id: 'k8s-017',
      question: 'What kubectl command streams the logs of a running container in pod "web-pod"?',
      options: [
        'kubectl logs web-pod --stream',
        'kubectl logs -f web-pod',
        'kubectl tail web-pod',
        'kubectl logs web-pod --watch'
      ],
      correct: 1,
      explanation: '"kubectl logs -f web-pod" streams (follows) the logs of the pod in real time. The -f flag behaves like "tail -f".'
    },
    {
      id: 'k8s-018',
      question: 'What is a Kubernetes Secret designed to store?',
      options: [
        'Public SSL certificates only',
        'Sensitive data such as passwords, tokens, and SSH keys',
        'Non-sensitive application configuration',
        'Node resource quotas'
      ],
      correct: 1,
      explanation: 'Secrets store sensitive data like passwords, OAuth tokens, and SSH keys. They are base64-encoded (not encrypted by default) and should be combined with RBAC and encryption at rest for security.'
    },
    {
      id: 'k8s-019',
      question: 'Which field in a Pod spec limits the maximum CPU a container can use?',
      options: ['requests.cpu', 'limits.cpu', 'max.cpu', 'cap.cpu'],
      correct: 1,
      explanation: 'Under resources.limits.cpu you set the maximum CPU the container can use. resources.requests.cpu is the minimum guaranteed amount. The scheduler uses requests for placement; limits enforce the cap.'
    },
    {
      id: 'k8s-020',
      question: 'What does a RollingUpdate deployment strategy do?',
      options: [
        'Terminates all old pods before starting new ones',
        'Gradually replaces old pods with new ones, keeping the service available throughout',
        'Creates a parallel set of new pods and switches traffic all at once',
        'Rolls back to the previous version on any pod failure'
      ],
      correct: 1,
      explanation: 'RollingUpdate gradually replaces old pods with new ones, ensuring a minimum number of pods remain available during the update. This is the default Deployment strategy and avoids downtime.'
    }
  ]
};

if (typeof module !== 'undefined') module.exports = KubernetesBasicsQuestions;
