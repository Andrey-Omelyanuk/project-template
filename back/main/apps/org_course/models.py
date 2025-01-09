from django.db.models import CASCADE, DateTimeField, ForeignKey, \
    Model, PositiveSmallIntegerField
from django.utils.translation import gettext_lazy as _
from simple_history.models import HistoricalRecords
from apps.org.models import AccessLevel, OrgUser, OrgUserGroup
from apps.course.models import Course


class OrgUserCouser(Model):
    """ Personal Access to Couser.
        If start and end are defined then this link valid only this period,
        otherwise the link is permanent.
    """
    course      = ForeignKey(Course , on_delete=CASCADE, related_name='org_users') 
    org_user    = ForeignKey(OrgUser, on_delete=CASCADE, related_name='courses')
    level       = PositiveSmallIntegerField(default=AccessLevel.VIEWER, choices=AccessLevel.choices)
    start       = DateTimeField(null=True, blank=True)
    end         = DateTimeField(null=True, blank=True)

    history = HistoricalRecords()

    class Meta:
        unique_together = (('course', 'org_user'), )


class OrgUserGroupCourse(Model):
    """ Linked Courses to User Group of Organization. 
        If start and end are defined then this link valid only this period,
        otherwise the link is permanent.
    """
    course          = ForeignKey(Course      , on_delete=CASCADE, related_name='org_user_groups')
    org_user_group  = ForeignKey(OrgUserGroup, on_delete=CASCADE, related_name='courses')
    start           = DateTimeField(null=True, blank=True)
    end             = DateTimeField(null=True, blank=True)
     
    history = HistoricalRecords()

    class Meta:
        unique_together = (('course', 'org_user_group'), )

# TODO: add triggers that whould be sync course permission 

