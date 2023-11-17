DOCKER_IMAGE := mymojoliciousapp

build:
    docker build --tag ${DOCKER_IMAGE} -f app.Dockerfile .

run:
    docker run --publish 8000:8000 ${DOCKER_IMAGE}

