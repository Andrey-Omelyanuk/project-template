from .views import *


def files(router):
    router.register(r'file', FileViewSet, basename="file")
