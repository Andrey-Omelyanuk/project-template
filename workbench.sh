#!/bin/sh
# example:
# -d is to detach the session for able to run in background and continue to run other commands
#tmux new-session -s intelas -n code -d 'vim' 
#tmux new-window  -t intelas:1 -n logs            'docker-compose up; bash -i'
#tmux new-window  -t intelas:2 -n run  'sleep 30s; docker-compose exec back2 sh'
#tmux split-window -v                  'sleep 30s; docker-compose exec front sh'
#tmux split-window -v                  'sleep 30s; docker-compose logs -f back2; bash -i'
#tmux split-window -h                  'sleep 30s; docker-compose logs -f front; bash -i'

PROJECT_NAME=project-template
START_DELAY=20s
tmux new-session  -s ${PROJECT_NAME}   -n main    -d "make run"
tmux new-window   -t ${PROJECT_NAME}:1 -n web        "sleep ${START_DELAY}; make sh s=web u=node"
tmux new-window   -t ${PROJECT_NAME}:2 -n web-log    "sleep ${START_DELAY}; make log s=web"
tmux new-window   -t ${PROJECT_NAME}:3 -n back       "sleep ${START_DELAY}; make sh s=back-main  u=app"
tmux new-window   -t ${PROJECT_NAME}:4 -n back-log   "sleep ${START_DELAY}; make log s=back-main"
tmux new-window   -t ${PROJECT_NAME}:5 -n worker-log "sleep ${START_DELAY}; docker compose logs -f back-main-worker"
# back to first window
tmux select-window -t ${PROJECT_NAME}:0
# attach to the session
tmux -2 attach-session -t ${PROJECT_NAME}
