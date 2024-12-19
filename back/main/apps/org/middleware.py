from django.core.exceptions import PermissionDenied
from .models import OrgUser


def OrgUserMiddleware(get_response):

    def middleware(request):
        org_user_id = request.META.get('HTTP_ORG_USER_ID')

        if org_user_id is None:
            request.org_user = None
        else:
            try:
                request.org_user = OrgUser.objects.get(id=org_user_id, user=request.user, is_active=True)
            except OrgUser.DoesNotExist:
                # ignore wrong org_user_id
                request.org_user = None
                # raise PermissionDenied()

        response = get_response(request)
        return response

    return middleware
