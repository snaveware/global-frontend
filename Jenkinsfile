node {
    checkout scm

    docker.withRegistry('https://registry.hub.docker.com', '5efdc081-eaa6-41c3-85b6-52f9497e6fe4') {

        def customImage = docker.build("snave020/global-frontend")

        /* Push the container to the custom Registry */
        customImage.push()
    }
}