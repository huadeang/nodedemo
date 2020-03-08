pipeline {
  agent any
  stages {
    

    stage('Buid Image') {
      steps {
        script {
          dockerImage = docker.build registry + ":latest"
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

    stage('Deployment K8s') {
        steps {
            sh 'kubectl apply -f aws-demo-k8s.yaml';
        }
    }

    stage('Remove Unused docker image') {
      steps {
        script {
          sh "docker rmi $registry:$latest"
        }

      }
    }

  }
  environment {
    registry = '778817355209.dkr.ecr.ap-southeast-1.amazonaws.com/rsm-projectku-dev'
    registryCredential = 'aws-sanbox'
    dockerImage = ''
  }
}