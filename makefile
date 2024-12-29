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
	@echo "sh  s=<name> u=<user> - Go into <name> container as <user>" 

	@echo test_data_dump
	@echo test_data_reset
	@echo makemigrations
	@echo makemigrations-empty
	@echo migrate


init:
	if [ ! -f "./.env" ];
		then cp  ./utils/.env.example ./.env; fi
	if [ ! -f "./$(DOCKER_COMPOSE_FILE)" ];
		then cp  ./utils/docker-compose.example.yml ./$(DOCKER_COMPOSE_FILE); fi
	if [ ! -f "./utils/nginx.conf" ];
		then cp  ./utils/nginx.conf.example ./proxy/nginx.conf;  fi
build:
	mkdir -p ./back/main/tmp 
	mkdir -p ./front/web/tmp 
	cp -R ~/.config/nvim ./back/main/tmp 
	cp -R ~/.config/nvim ./front/web/tmp 
	export DOCKER_BUILDKIT=1 && \
	docker compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) build --parallel
	rm -R ./back/main/tmp
	rm -R ./front/web/tmp
run:
	docker compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) up
stop:
	docker compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) stop 
down:
	docker compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) down
reset:
	docker compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) down -v
log:
	docker compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) logs -f $(s)	
sh:
	docker compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) exec -u $(u) $(s) sh


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
