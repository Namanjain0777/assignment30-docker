FROM jenkins/jenkins:lts

USER root

# Install Docker Engine (includes CLI + compose plugin) via official convenience script
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://get.docker.com | sh && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Allow jenkins user to run docker without sudo
RUN usermod -aG docker jenkins

USER jenkins
