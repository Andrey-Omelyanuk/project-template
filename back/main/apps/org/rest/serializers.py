from rest_framework.serializers import PrimaryKeyRelatedField, CharField, IntegerField, ValidationError, BooleanField
from apps.core.rest.serializers import CoreModelSerializer
from django.contrib.auth import get_user_model
from ..models import *
User = get_user_model()

__all__ = [
    'OrgSerializer',
    'OrgHistorySerializer',
    'OrgUserSerializer',
    'OrgUserHistorySerializer',
    'OrgUserGroupSerializer',
    'OrgUserGroupHistorySerializer',
    'OrgUserInOrgUserGroupSerializer',
    'OrgUserInOrgUserGroupHistorySerializer',
]


class OrgSerializer(CoreModelSerializer):
    class Meta:
        model = Org
        fields = '__all__'
        # expandable_fields = {
        #     'org-users': CompanyFeaturesSerializer,
        # }


class OrgHistorySerializer(CoreModelSerializer):
    id                  = IntegerField(source='history_id'    , read_only=True)
    org_id              = IntegerField(source='id'            , read_only=True)
    history_user_id     = PrimaryKeyRelatedField(source='history_user' , queryset=User.objects.all())
    class Meta:
        model = Org.history.model
        exclude = ('history_id', 'history_user', )
        # expandable_fields = {
        #     'company': CompanySerializer,
        # }



class OrgUserSerializer(CoreModelSerializer):
    org_id   = PrimaryKeyRelatedField(source='org',  queryset=Org.objects.all())
    user_id  = PrimaryKeyRelatedField(source='user', queryset=User.objects.all())
    class Meta:
        model = OrgUser
        exclude = ('org', 'user', )


class OrgUserHistorySerializer(CoreModelSerializer):
    id                  = IntegerField(source='history_id'    , read_only=True)
    org_user_id         = IntegerField(source='id'            , read_only=True)
    history_user_id     = PrimaryKeyRelatedField(source='history_user' , queryset=User.objects.all())
    org_id              = PrimaryKeyRelatedField(source='org',  queryset=Org.objects.all())
    user_id             = PrimaryKeyRelatedField(source='user', queryset=User.objects.all())
    class Meta:
        model = OrgUser.history.model
        exclude = ('history_id', 'history_user', 'org', 'user', )


class OrgUserGroupSerializer(CoreModelSerializer):
    org_id      = PrimaryKeyRelatedField(source='org', queryset=Org.objects.all())
    parent_id   = PrimaryKeyRelatedField(source='parent' , queryset=OrgUserGroup.objects.all())
    class Meta:
        model = OrgUserGroup 
        exclude = ('org', 'parent', )
        expandable_fields = {
            'org': OrgSerializer,
        }

class OrgUserGroupHistorySerializer(CoreModelSerializer):
    id                  = IntegerField(source='history_id'    , read_only=True)
    org_user_group_id   = IntegerField(source='id'            , read_only=True)
    history_user_id     = PrimaryKeyRelatedField(source='history_user'  , queryset=User.objects.all())
    org_id              = PrimaryKeyRelatedField(source='org'           , queryset=Org.objects.all())
    parent_id           = PrimaryKeyRelatedField(source='parent'        , queryset=OrgUserGroup.objects.all())
    class Meta:
        model = OrgUserGroup.history.model
        exclude = ('org', 'parent', 'history_id', 'history_user', )
        expandable_fields = {
            'org': OrgSerializer,
        }


class OrgUserInOrgUserGroupSerializer(CoreModelSerializer):
    org_user_group_id = PrimaryKeyRelatedField(source='org_user_group', queryset=OrgUserGroup.objects.all())
    org_user_id       = PrimaryKeyRelatedField(source='org_user'      , queryset=OrgUser.objects.all())
    class Meta:
        model = OrgUserInOrgUserGroup 
        exclude = ('org_user_group', 'org_user', )
        expandable_fields = {
            'org_user_group': OrgUserGroupSerializer,
            'org_user'      : OrgUserSerializer,
        }


class OrgUserInOrgUserGroupHistorySerializer(CoreModelSerializer):
    id                            = IntegerField(source='history_id'    , read_only=True)
    org_user_in_org_user_group_id = IntegerField(source='id'            , read_only=True)
    history_user_id               = PrimaryKeyRelatedField(source='history_user'  , queryset=User.objects.all())
    org_user_group_id             = PrimaryKeyRelatedField(source='org_user_group', queryset=OrgUserGroup.objects.all())
    org_user_id                   = PrimaryKeyRelatedField(source='org_user'      , queryset=OrgUser.objects.all())
    class Meta:
        model = OrgUserInOrgUserGroup.history.model
        exclude = ('org_user_group', 'org_user', 'history_id', 'history_user', )
        expandable_fields = {
            'company_user_group': OrgUserGroupSerializer,
            'company_user'      : OrgUserSerializer,
        }
