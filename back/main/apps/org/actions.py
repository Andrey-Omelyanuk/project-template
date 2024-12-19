from django.db import transaction
from models import Org, OrgUser, OrgUserGroup, OrgUserInOrgUserGroup, AccessLevel


@transaction.atomic
def user_create_org(user_id: int, name: str):
    org = Org(name=name)
    org.save()
    # root group has name as org
    org_user_group = OrgUserGroup(org=org, name=name)
    org_user_group.save()
    # parent of root is himself
    org_user_group.parent = org_user_group.id
    org_user_group.save()
    # make user an admin(it's equal as owner) of organization
    org_user = OrgUser(user_id=user_id, org_id=org.id)
    org_user.save()
    org_user_in_org_user_group = OrgUserInOrgUserGroup(
        org_user = org_user,
        org_user_group = org_user_group,
        level = AccessLevel.ADMIN
    )
    org_user_in_org_user_group.save()

    return org, org_user, org_user_group, org_user_group
