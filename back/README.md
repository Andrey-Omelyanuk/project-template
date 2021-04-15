``` bash
python manage.py makemigrations [app_name]

python manage.py run_spider smartphone:imarket_by
python manage.py run_spider smartphone:mobistore_by
python manage.py run_spider smartphone:phone_1k_by
python manage.py run_spider smartphone:svyaznoy_by
python manage.py load_data_to_db

celery worker -A main -l info --concurrency=2
celery worker -A main -l info -Q parsers --concurrency=2 -n parsers@%h
celery beat   -A main -l info --scheduler django_celery_beat.schedulers:DatabaseScheduler
celery flower -A main --port=5555 --broker="amqp://andrey:123456@localhost:5672/all-goods"
```

HOW TO START DEV ON LOCAL
=========================
``` bash
docker-compose up
# !!! next commands run on another console 
# go to inside back-container
docker-compose exec back sh
# create superuser 
echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser(username='admin', password='123456', email='admin@example.com')" | python manage.py shell
# set domain to localhost for site 
echo "from django.contrib.sites.models import Site; site = Site.objects.get_current(); site.domain = 'localhost:8000'; site.save();" | python manage.py shell
```
