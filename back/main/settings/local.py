DEBUG = True
# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases

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
