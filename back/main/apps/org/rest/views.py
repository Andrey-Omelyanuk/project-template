from rest_framework.response import Response
from rest_framework import status
from apps.core.rest.views import CoreModelViewSet, CoreReadOnlyModelViewSet
from ..models import *
from ..actions import user_create_org
from .serializers import * 


__all__ = [
    'OrgViewSet',
    'OrgHistoryListView',
    'OrgUserViewSet',
    'OrgUserHistoryListView',
    'OrgUserGroupViewSet',
    'OrgUserGroupHistoryListView',
    'OrgUserInOrgUserGroupViewSet',
    'OrgUserInOrgUserGroupHistoryListView',
]

class OrgViewSet(CoreModelViewSet):
    serializer_class = OrgSerializer
    def get_queryset(self):
        """ User can see only organizations where he is a member. """
        return Org.objects.filter(org_users__user=self.request.user)

    def perform_create(self, serializer):
        """ Overwrite creation to add custom logic. """
        org, _, _, _ = user_create_org(
            self.request.user.id,
            serializer.validated_data['name']
        )
        serializer.instance = org


class OrgHistoryListView(CoreReadOnlyModelViewSet):
    serializer_class = OrgHistorySerializer
    def get_queryset(self):
        """ The history of organization can see only staff. """
        if self.request.user.is_staff:
            return Org.history.model.objects.all()
        else:
            return None


class OrgUserViewSet(CoreModelViewSet):
    serializer_class = OrgUserSerializer
    def get_queryset(self):
        return OrgUser.objects.all()


class OrgUserHistoryListView(CoreReadOnlyModelViewSet):
    serializer_class = OrgUserHistorySerializer
    def get_queryset(self):
        """ The history of organization can see only staff. """
        if self.request.user.is_staff:
            return OrgUser.history.model.objects.all()
        else:
            return None


class OrgUserGroupViewSet(CoreModelViewSet):
    serializer_class = OrgUserGroupSerializer
    def get_queryset(self):
        return OrgUserGroup.objects.all()

class OrgUserGroupHistoryListView(CoreReadOnlyModelViewSet):
    serializer_class = OrgUserGroupHistorySerializer
    def get_queryset(self):
        """ The history of organization can see only staff. """
        if self.request.user.is_staff:
            return OrgUserGroup.history.model.objects.all()
        else:
            return None


class OrgUserInOrgUserGroupViewSet(CoreModelViewSet):
    serializer_class = OrgUserInOrgUserGroupSerializer
    def get_queryset(self):
        return OrgUserInOrgUserGroup.objects.all()

class OrgUserInOrgUserGroupHistoryListView(CoreReadOnlyModelViewSet):
    serializer_class = OrgUserInOrgUserGroupHistorySerializer
    def get_queryset(self):
        """ The history of organization can see only staff. """
        if self.request.user.is_staff:
            return OrgUserInOrgUserGroup.history.model.objects.all()
        else:
            return None