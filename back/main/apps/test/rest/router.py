from .views import *


def org(router):
    router.register(r'test-long-task', TestLongTaskViewSet, 'TestLongTask')
