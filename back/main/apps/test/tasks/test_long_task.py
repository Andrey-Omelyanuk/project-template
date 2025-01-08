import time
from celery import shared_task


@shared_task
def test_long_task():
    time.sleep(60)
    return 'done'
