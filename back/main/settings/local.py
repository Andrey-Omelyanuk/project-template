DEBUG = True

DATABASES = {
    'default': {
        'ENGINE'    : 'django.db.backends.postgresql',
        'NAME'      : 'project-template',
        'USER'      : 'project-template',
        'PASSWORD'  : '123456',
        'HOST'      : 'db',
        'PORT'      : '5432',
    }
}

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '-o88a7ekn-rmgghy894hy0keliiid_qg&!kyy2vkh9zo=*#yr5'

SITE_DOMAIN = 'localhost:8000'

# Celery config
CELERY_BROKER_URL= 'amqp://andrey:123456@rabbitmq:5672/main'
# CELERY_RESULT_BACKEND = 'django-db'
# CELERY_BEAT_SCHEDULE = {
#     'queue_every_five_mins': {
#         'task': 'polls.tasks.query_every_five_mins',
#         'schedule': crontab(minute=5),
#     },
# }