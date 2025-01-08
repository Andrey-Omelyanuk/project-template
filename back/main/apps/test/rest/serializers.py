from rest_framework.serializers import IntegerField
from apps.core.rest.serializers import CoreModelSerializer
from django.contrib.auth import get_user_model
from ..models import *
User = get_user_model()


__all__ = [
    'TestLongTaskSerializer',
]


class TestLongTaskSerializer(CoreModelSerializer):
    org_user_group_id = IntegerField(source='id', read_only=True)

    class Meta:
        model = TestLongTask
        exclude = ('org_user_group', )

