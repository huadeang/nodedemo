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
          // docker.withRegistry( '', registryCredential ) {
          //   dockerImage.push()
          // }
          sh "docker push $registry:$latest"
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
    registry = '778817355209.dkr.ecr.aap-southeast-1.amazonaws.com/rsm-projectku-dev'
    registryCredential = 'dockerhub'
    dockerImage = ''
  }
}