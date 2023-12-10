DOCKER_IMAGE:= client

run local:
	python3 -m http.server 8001

build:
	docker build --tag ${DOCKER_IMAGE} .
run: 
	docker run --rm -it --publish 8001:8001 ${DOCKER_IMAGE}