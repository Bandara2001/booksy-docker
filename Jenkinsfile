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
                git branch: 'main',
                    url: 'https://github.com/Bandara2001/booksy-docker.git',
                    credentialsId: 'github-token'
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    sh 'docker compose build'
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials',
                                                usernameVariable: 'DOCKER_USER',
                                                passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                }
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
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