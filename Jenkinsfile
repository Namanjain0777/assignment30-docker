pipeline {
    agent any

    environment {
        COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {

        stage('Checkout') {
            steps {
                echo '📥 Checking out source code...'
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo '🔨 Building Docker images...'
                sh 'docker compose -f ${COMPOSE_FILE} build --no-cache'
            }
        }

        stage('Test') {
            steps {
                echo '🧪 Running basic health check on backend...'
                sh '''
                    docker compose -f ${COMPOSE_FILE} up -d mongo backend
                    sleep 10
                    docker compose -f ${COMPOSE_FILE} exec -T backend node -e "console.log('Backend OK')"
                    docker compose -f ${COMPOSE_FILE} stop mongo backend
                '''
            }
        }

        stage('Deploy') {
            steps {
                echo '🚀 Deploying all services...'
                sh 'docker compose -f ${COMPOSE_FILE} up -d'
                echo '✅ All services are up!'
            }
        }
    }

    post {
        success {
            echo '🎉 Pipeline completed successfully!'
        }
        failure {
            echo '❌ Pipeline failed. Tearing down containers...'
            sh 'docker compose -f ${COMPOSE_FILE} down || true'
        }
    }
}
