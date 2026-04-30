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
                // Only build app services, not jenkins itself
                sh 'docker compose -f ${COMPOSE_FILE} build --no-cache backend frontend'
            }
        }

        stage('Test') {
            steps {
                echo '🧪 Running basic health check on backend...'
                // Use isolated project name (-p ci_test) to avoid conflicts
                // with already-running host containers
                sh '''
                    docker compose -p ci_test -f ${COMPOSE_FILE} up -d mongo backend
                    sleep 10
                    docker compose -p ci_test -f ${COMPOSE_FILE} exec -T backend node -e "console.log('✅ Backend is healthy!')"
                    docker compose -p ci_test -f ${COMPOSE_FILE} down
                '''
            }
        }

        stage('Deploy') {
            steps {
                echo '🚀 Deploying app services...'
                // --no-recreate skips already-running containers (e.g. jenkins)
                // Only bring up app services, not jenkins
                sh 'docker compose -f ${COMPOSE_FILE} up -d --no-recreate mongo backend frontend'
                echo '✅ All services deployed!'
            }
        }
    }

    post {
        success {
            echo '🎉 Pipeline completed successfully!'
        }
        failure {
            echo '❌ Pipeline failed. Cleaning up test containers...'
            sh 'docker compose -p ci_test -f ${COMPOSE_FILE} down || true'
        }
    }
}
