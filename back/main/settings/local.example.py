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
