DOCKER_IMAGE:=express_test
build:
	docker build --tag ${DOCKER_IMAGE} .
run:
	docker run --publish 8001:8001 ${DOCKER_IMAGE}