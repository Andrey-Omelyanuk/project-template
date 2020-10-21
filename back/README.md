# all-goods.back

Parser of Any Goods.

``` bash

source .env/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py makemigrations [app_name]

python manage.py run_spider smartphone:imarket_by
python manage.py run_spider smartphone:mobistore_by
python manage.py run_spider smartphone:phone_1k_by
python manage.py run_spider smartphone:svyaznoy_by
python manage.py load_data_to_db

python manage.py runserver
celery worker -A main -l info --concurrency=2
celery worker -A main -l info -Q parsers --concurrency=2 -n parsers@%h
celery beat   -A main -l info --scheduler django_celery_beat.schedulers:DatabaseScheduler
celery flower -A main --port=5555 --broker="amqp://andrey:123456@localhost:5672/all-goods"

tmux new -s all-goods
tmux a -t all-goods
```
