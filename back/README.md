``` bash
python manage.py run_spider smartphone:imarket_by
python manage.py load_data_to_db

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
# add new migrations 
python manage.py makemigrations [app_name]
python manage.py makemigrations spiders
python manage.py migrate 
# create superuser 
echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser(username='admin', password='123456', email='admin@example.com')" | python manage.py shell
# set domain to localhost for site 
echo "from django.contrib.sites.models import Site; site = Site.objects.get_current(); site.domain = 'localhost:8000'; site.save();" | python manage.py shell
# add spiders
echo "from apps.spiders.models import Spider; spider = Spider.objects.create(name='zarya_by', desc='zarya.by');" | python manage.py shell
# add analyzer 
echo "from apps.analyzers.models import Analyzer; analyzer = Analyzer.objects.create(name='tag_count', desc='Count tags on the articles');" | python manage.py shell
```
