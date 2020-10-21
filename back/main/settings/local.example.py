DEBUG = True
# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE'    : 'django.db.backends.postgresql',
        'NAME'      : 'allgoods',
        'USER'      : 'allgoods',
        'PASSWORD'  : '123456',
        'HOST'      : '127.0.0.1',
        'PORT'      : '5432',
    }
}
