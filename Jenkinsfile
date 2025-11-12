pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = 'oshinibandara2001'
        DOCKER_HUB_REPO_FRONTEND = 'booksy-frontend'
        DOCKER_HUB_REPO_BACKEND = 'booksy-backend'
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo ' Checking out source code from GitHub...'
                git branch: 'main',
                    url: 'https://github.com/Bandara2001/booksy-docker.git',
                    credentialsId: 'github-token'
                sh 'ls -R'  // 👈 Verifies Jenkins has frontend & backend folders
            }
        }

        stage('Verify Dockerfiles') {
            steps {
                echo '🔍 Checking for Dockerfiles...'
                sh '''
                if [ ! -f frontend/Dockerfile ]; then
                    echo " Missing frontend/Dockerfile"
                    exit 1
                fi
                if [ ! -f backend/Dockerfile ]; then
                    echo "Missing backend/Dockerfile"
                    exit 1
                fi
                echo " Dockerfiles found!"
                '''
            }
        }

        stage('Build Docker Images') {
            steps {
                echo ' Building Docker images...'
                sh 'docker compose build'
            }
        }

        stage('Login to Docker Hub') {
            steps {
                echo ' Logging into Docker Hub...'
                withCredentials([usernamePassword(
                    credentialsId: 'docker-hub-credentials',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                }
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                echo ' Pushing images to Docker Hub...'
                script {
                    sh """
                    docker tag booksy-docker-frontend:latest $DOCKER_HUB_USER/$DOCKER_HUB_REPO_FRONTEND:latest
                    docker tag booksy-docker-backend:latest $DOCKER_HUB_USER/$DOCKER_HUB_REPO_BACKEND:latest
                    docker push $DOCKER_HUB_USER/$DOCKER_HUB_REPO_FRONTEND:latest
                    docker push $DOCKER_HUB_USER/$DOCKER_HUB_REPO_BACKEND:latest
                    """
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check logs for details.'
        }
    }
}
