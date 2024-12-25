from rest_framework.response import Response
from rest_framework import status
from apps.core.rest.views import CoreModelViewSet, CoreReadOnlyModelViewSet
from django.db.models import Q
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
        if self.request.user.is_staff:
            return OrgUserGroup.objects.all()
        else:
            groups = OrgUserGroup.objects.filter(
                org_users_in_org_user_group__org_user__user=self.request.user)
            descendants_q = Q()
            ancestors_q = Q()

            for group in groups:
                descendants = group.get_descendants(include_self=True)
                ancestors = group.get_ancestors(include_self=True)
                descendants_q |= Q(pk__in=descendants.values_list('pk', flat=True))
                ancestors_q |= Q(pk__in=ancestors.values_list('pk', flat=True))

            queryset = OrgUserGroup.objects.filter(descendants_q | ancestors_q)
            # from ...core.utils import print_sql
            # print_sql(queryset)
            return queryset


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