from apps.core.rest.views import CoreModelViewSet 
from ..models import *
from .serializers import * 


__all__ = [
    'FileViewSet',
]


class FileViewSet(CoreModelViewSet):
    serializer_class = FileSerializer

    def get_queryset(self):
        """ This endpoint return files only to owners. """
        if self.request.user.is_staff:
            return File.objects.all()
        elif self.request.user:
            return File.objects.all(uploaded_by=self.request.user)
        else:
            return None

    def perform_create(self, serializer):
        """ Set the user who uploaded the file. """
        serializer.save(uploaded_by=self.request.user)
