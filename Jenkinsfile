pipeline {
    agent {
        docker {
            image 'node:latest'
            args '-u root:root'
        }
    }

    stages {
        stage('build') {
            steps {
                echo 'building global-frontend'
                sh 'npm install --no-audit'
                sh 'ng build --prod'
            }
        }

        stage('test') {
            steps {
                echo 'testing global-frontend'
                sh 'npm run test'
            }
        }

        stage('dockerize') {
            steps {
                echo 'building global-frontend'
                script {

                    checkout scm

                    docker.withRegistry('https://registry.hub.docker.com', 'docker') {

                        def customImage = docker.build("snave020/global-frontend:pipeline")

                        /* Push the container to the custom Registry */
                        customImage.push()
                    }
                }
            }

            

           
        }

    }
       
    
}
