from apps.core.rest.views import CoreModelViewSet 
from ..models import *
from .serializers import * 


__all__ = [
    'FileViewSet',
]


class FileViewSet(CoreModelViewSet):
    serializer_class = FileSerializer

    def get_queryset(self):
        return File.objects.filter(uploaded_by=self.request.user)

    def perform_create(self, serializer):
        """ Set the user who uploaded the file. """
        serializer.save(uploaded_by=self.request.user)
