pipeline {
  agent any
  stages {
    

    stage('Buid Image') {
      steps {
        script {
          dockerImage = docker.build registry + ":$BUILD_NUMBER"
        }

      }
    }

    stage('Deploy Image') {
      steps {
        script {
          docker.withRegistry( '', registryCredential ) {
            dockerImage.push()
          }
        }

      }
    }

    stage('Remove Unused docker image') {
      steps {
        script {
          sh "docker rmi $registry:$BUILD_NUMBER"
        }

      }
    }

  }
  environment {
    registry = 'sangad/nodedemo'
    registryCredential = 'dockerhub'
    dockerImage = ''
  }
}