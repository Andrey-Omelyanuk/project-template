from celery.result import AsyncResult
# from celery.task.control import revoke
from django.contrib.auth import get_user_model
from django.db.models import CASCADE, ForeignKey, Model, UUIDField
from apps.org.models import OrgUserGroup
from .tasks.test_long_task import test_long_task
User = get_user_model()


__all__ = [
    'TestLongTask'
]


class TestLongTask(Model):
    task_id         = UUIDField(null=True, blank=True, unique=True)
    org_user_group  = ForeignKey(OrgUserGroup, on_delete=CASCADE)
    initiator       = ForeignKey(User, on_delete=CASCADE, null=True, blank=True)

    def __str__(self):
        return f"{self.org_user_group}: {self.task_id}"

    def save(self, *args, **kwargs):
        if not self.id:
            result = test_long_task.delay()
            self.task_id = result.id
        return super().save(*args, **kwargs)

    @property
    def status(self) -> str:
        result = AsyncResult(self.task_id)
        return result.status

    # def revoke(self):
    #    revoke(self.task_id, terminate=True)
