from typing import List
import json
import logging
import requests
from requests.adapters import HTTPAdapter, Retry
from django.conf import settings


def change_case(str):
    """ Utils. Change camel case to snake case."""
    return ''.join(['_'+i.lower() if i.isupper()
               else i for i in str]).lstrip('_')


def pub_sub_obj_send(channels: List[str], model_name: str, obj):
    """ Utils. Send object to PubSub service."""
    session = requests.Session()
    retries = Retry(total=1, backoff_factor=1, status_forcelist=[500, 502, 503, 504])
    session.mount('http://', HTTPAdapter(max_retries=retries))
    try:
        session.post(
            settings.CENTRIFUGO_HTTP_API_ENDPOINT + '/api/broadcast',
            data=json.dumps({
                'channels': channels,
                # 'idempotency_key': f'{model_name}_{obj.pk}',
                'data': {
                    'model': model_name,
                    'obj': obj 
                },
            }),
            headers={
                'Content-type': 'application/json', 
                'X-API-Key': settings.CENTRIFUGO_HTTP_API_KEY,
                'X-Centrifugo-Error-Mode': 'transport'
            }
        )
    except requests.exceptions.RequestException as e:
        logging.error(e)
