from django.contrib.auth import get_user_model
from django.db.models import Model, CASCADE, ForeignKey, CharField, BooleanField, PositiveSmallIntegerField
from django.db.models import IntegerChoices, QuerySet
from django.db.models import Q
from django.utils.translation import gettext_lazy as _
from simple_history.models import HistoricalRecords
from simple_history import register as register_history
from mptt.models import MPTTModel, TreeForeignKey
User = get_user_model()


__all__ = [
    'AccessLevel',
    'Org',
    'OrgUser',
    'OrgUserGroup',
    'OrgUserInOrgUserGroup',
]


class AccessLevel(IntegerChoices):
    ADMIN  = 30, _('Admin')
    EDITOR = 20, _('Read/Write')
    VIEWER = 10, _('Read Only')
    NONE   =  0, _('None')
    # guest
    # member
    # manager
    # admin
    # owner


class Org(Model):
    """ Organization """ 
    name        = CharField(max_length=64, null=False)
    is_active   = BooleanField(default=True)

    history = HistoricalRecords()

    def __str__(self):
        return f"{self.name}"


class OrgUser(Model):
    """ User in Organization """ 
    org         = ForeignKey(Org , on_delete=CASCADE, related_name='org_users')
    user        = ForeignKey(User, on_delete=CASCADE, related_name='org_users')
    is_active   = BooleanField(default=True)

    history = HistoricalRecords()

    class Meta:
        unique_together = (("org", "user"),)

    def __str__(self):
        return f"{self.user} in {self.org} (active: {self.is_active})"


class OrgUserGroup(MPTTModel):
    """ Hierarchical groups in Organization """ 
    org     = ForeignKey    (Org   , on_delete=CASCADE, null=False, blank=True, related_name='org_user_groups')
    parent  = TreeForeignKey('self', on_delete=CASCADE, null=True , blank=True, related_name='children')
    name    = CharField     (max_length=32)

    class Meta:
        unique_together = (('parent', 'name'), )

    def __str__(self):
        return f"{self.org} :: {self.parent.name if self.parent else 'ROOT'} :: {self.name}"

    @staticmethod
    def get_viewable_groups(cls, user) -> 'QuerySet[OrgUserGroup]':
        """ Get groups that user can view """

        groups = OrgUserGroup.objects.filter(
            org_users_in_org_user_group__org_user__user=user)
        descendants_q = Q()
        ancestors_q = Q()
        for group in groups:
            descendants = group.get_descendants(include_self=True)
            ancestors = group.get_ancestors(include_self=True)
            descendants_q |= Q(pk__in=descendants.values_list('pk', flat=True))
            ancestors_q |= Q(pk__in=ancestors.values_list('pk', flat=True))

        return OrgUserGroup.objects.filter(descendants_q | ancestors_q)

# MPTTModel has conflict with HistoricalRecords, so we need to register it manually
register_history(OrgUserGroup)


class OrgUserInOrgUserGroup(Model):
    """ Org-User in Organization User Group """
    org_user_group  = ForeignKey(OrgUserGroup, on_delete=CASCADE, null=False, related_name='org_users_in_org_user_group')
    org_user        = ForeignKey(OrgUser     , on_delete=CASCADE, null=False, related_name='org_users_in_org_user_group')
    level           = PositiveSmallIntegerField(default=AccessLevel.VIEWER, choices=AccessLevel.choices)

    history = HistoricalRecords()

    def __str__(self):
        return f"{self.org_user_group} :: {self.org_user} :: {self.level}"

    class Meta:
        unique_together = (('org_user_group', 'org_user'), )
