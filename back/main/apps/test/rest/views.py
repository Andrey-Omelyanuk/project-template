from apps.core.rest.views import CoreModelViewSet
from apps.org.models import OrgUserGroup
from ..models import *
from .serializers import *


__all__ = [
    'TestLongTaskViewSet',
]


class TestLongTaskViewSet(CoreModelViewSet):
    serializer_class = TestLongTaskSerializer

    def get_queryset(self):
        if self.request.user.is_staff:
            return TestLongTask.objects.all()
        else:
            groups = OrgUserGroup.get_viewable_groups(self.request.user)
            return TestLongTask.objects.filter(org_user_group__in=groups)
