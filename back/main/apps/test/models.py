
from django.contrib.auth import get_user_model
from django.db.models import BooleanField, CharField, Model
User = get_user_model()

__all__ = [
    'TestLongTask'
]

class TestLongTask(Model):
    name        = CharField()
    is_active   = BooleanField(default=True)

    def __str__(self):
        return f"{self.name}"

