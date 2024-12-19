from .views import * 


def org(router):
    router.register(r'org'                               , OrgViewSet,                           'Org')
    router.register(r'org-history'                       , OrgHistoryListView,                   'OrgHistory')
    router.register(r'org-user'                          , OrgUserViewSet,                       'OrgUser')
    router.register(r'org-user-history'                  , OrgUserHistoryListView,               'OrgUserHistory')
    router.register(r'org-user-group'                    , OrgUserGroupViewSet,                  'OrgUserGroup')
    router.register(r'org-user-group-history'            , OrgUserGroupHistoryListView,          'OrgUserGroupHistory')
    router.register(r'org-user-in-org-user-group'        , OrgUserInOrgUserGroupViewSet,         'OrgUserInOrgUserGroup')
    router.register(r'org-user-in-org-user-group-history', OrgUserInOrgUserGroupHistoryListView, 'OrgUserInOrgUserGroupHistory')
