from django.contrib.auth import get_user_model
from rest_framework.serializers import PrimaryKeyRelatedField
from apps.core.rest.serializers import CoreModelSerializer
from ..models import *
User = get_user_model()


__all__ = [
    'FileSerializer',
    'FileVersionSerializer',
]


class FileSerializer(CoreModelSerializer):
    uploaded_by_id = PrimaryKeyRelatedField(source='uploaded_by', queryset=User.objects.all())
    class Meta:
        model = File
        exclude = ('uploaded_by', )
        expandable_fields = {
            'user': 'apps.core.rest.UserSerializer',
            'versions': ('apps.files.rest.FileVersionSerializer', {'many': True}),
        }



class FileVersionSerializer(CoreModelSerializer):
    original_id = PrimaryKeyRelatedField(source='original',  queryset=File.objects.all())
    class Meta:
        model = FileVersion
        exclude = ('original', )

