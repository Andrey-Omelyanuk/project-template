PROJECT_NAME=project-template
DOCKER_COMPOSE_FILE=docker-compose.yml
# try to import env from .makefile.env
ifneq (,$(wildcard makefile.env))
	include makefile.env
	export $(shell sed 's/=.*//' makefile.env)
endif

init:
	if [ ! -f "./.env" ]; 					then cp ./.env.example ./.env; fi
	if [ ! -f "./$(DOCKER_COMPOSE_FILE)" ]; then cp ./docker-compose.example.yml ./$(DOCKER_COMPOSE_FILE); fi
	if [ ! -f "./proxy/nginx.conf" ]; 		then cp ./proxy/nginx.conf.example ./proxy/nginx.conf;  fi

build:
	export DOCKER_BUILDKIT=1 && \
	docker compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) build

run:
	docker compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) up

stop:
	docker compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) down

log:
	docker compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) logs $(s)	

sh:
	docker compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) exec $(s) sh	
