FROM jenkins/jenkins:lts

USER root

# Install Docker Engine (includes CLI + compose plugin) via official convenience script
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://get.docker.com | sh && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Allow jenkins user to run docker
RUN usermod -aG docker jenkins

USER jenkins

# Pre-install essential plugins (Pipeline + Git + recommended basics)
RUN jenkins-plugin-cli --plugins \
    pipeline-model-definition \
    git \
    workflow-aggregator \
    credentials-binding \
    timestamper \
    ws-cleanup
