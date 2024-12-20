PROJECT_NAME=project-template
DOCKER_COMPOSE_FILE=docker-compose.yml
# try to import env from .makefile.env
ifneq (,$(wildcard makefile.env))
	include makefile.env
	export $(shell sed 's/=.*//' makefile.env)
endif

help: 
	@echo "init     - Initialize project"
	@echo "build    - Build project"
	@echo "run      - Run project"
	@echo "stop     - Stop and remove all containers and networks"
	@echo "reset    - Stop and remove all containers, networks and volumes"
	@echo "log s=<name> - Show logs for <name> container"
	@echo "sh  s=<name> - Enter to <name> container"


init:
	if [ ! -f "./.env" ]; 					then cp ./.env.example ./.env; fi
	if [ ! -f "./$(DOCKER_COMPOSE_FILE)" ]; then cp ./docker-compose.example.yml ./$(DOCKER_COMPOSE_FILE); fi
	if [ ! -f "./utils/nginx.conf" ]; 		then cp ./utils/nginx.conf.example ./proxy/nginx.conf;  fi
build:
	export DOCKER_BUILDKIT=1 && \
	docker compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) build
run:
	docker compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) up
stop:
	docker compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) down
reset:
	docker compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) down -v
log:
	docker compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) logs $(s)	
sh:
	docker compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) exec $(s) sh	


test_data_dump:
	docker compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) exec back-main sh utils/test_data_dump.sh
test_data_reset:
	docker compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) run back-main sh utils/test_data_reset.sh
makemigrations:
	docker compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) exec back-main python manage.py makemigrations
makemigrations-empty:
	docker compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) exec back-main python manage.py makemigrations source --name new_empty --empty
migrate:
	docker compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) exec back-main python manage.py migrate 

