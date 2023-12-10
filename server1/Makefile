DOCKER_IMAGE := mymojoliciousapp

build:
	docker build --tag ${DOCKER_IMAGE} .

run:
	docker run --publish 8000:8000 ${DOCKER_IMAGE}

shell: 
	docker run --publish 8000:8000 --volume ${PWD}:/app/ -it ${DOCKER_IMAGE} /bin/bash 
