import os

DEBUG = True
ALLOWED_HOSTS = ["*"]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': 'test_db.sqlite3',
    }
}

# Redis Caching
# TODO: Add null cache client
# CACHES['default']['OPTIONS']['CLIENT_CLASS'] = ''
