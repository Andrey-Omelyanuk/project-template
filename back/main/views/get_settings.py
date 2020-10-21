# -*- coding: utf-8 -*-
import json
from django.views.decorators.http import require_http_methods
from django.http import HttpResponse
from django.conf import settings


@require_http_methods(['GET'])
def get_settings(request):
    _settings = dict()
    _settings['DEBUG'] = settings.DEBUG
    # special cases for linkedin
    # try: _settings['FACEBOOK_CLIENT_ID'] = SocialApp.objects.get(provider='facebook').client_id
    # except: pass
    # try: _settings['GOOGLE_CLIENT_ID'  ] = SocialApp.objects.get(provider='google'  ).client_id
    # except: pass

    return HttpResponse(json.dumps(_settings), content_type="application/json")
