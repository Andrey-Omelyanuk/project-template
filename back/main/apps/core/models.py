import logging
from celery.signals import task_success, task_failure, task_revoked, task_retry, task_prerun
from celery.result import AsyncResult
from django.dispatch import receiver
from django.db.models import IntegerChoices
from django.utils.translation import gettext_lazy as _
from .pub_sub import pub_sub_obj_send


logger = logging.getLogger('core-models')


class AccessLevel(IntegerChoices):
    ADMIN  = 30, _('Admin')
    EDITOR = 20, _('Read/Write')
    VIEWER = 10, _('Read Only')
    NONE   =  0, _('None')


@receiver([task_success, task_failure, task_revoked, task_retry, task_prerun, ])
def task_success_handler(sender=None, result=None, **kwargs):
    task_id = sender.request.id
    result = AsyncResult(task_id)
    pub_sub_obj_send(['admin'], 'async-task', {
        'id': task_id,
        'status': result.status,
    })
