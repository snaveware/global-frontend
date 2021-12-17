pipeline {
    agent any

    stages {
        stage('build') {
            steps {
                echo 'building global-frontend'
                sh 'npm i'
                sh 'ng build --prod'
            }
        }

        stage('test') {
            steps {
                echo 'testing global-frontend'
                sh 'npm run test'
            }
        }

        stage('build') {
            steps {
                echo 'building global-frontend'
            }
            script {
                checkout scm

                docker.withRegistry('https://registry.hub.docker.com', '5efdc081-eaa6-41c3-85b6-52f9497e6fe4') {

                def customImage = docker.build("snave020/global-frontend")

                /* Push the container to the custom Registry */
                customImage.push()
            }

           
        }

       
    }

}
