# Core
rm apps/core/fixtures/*
python manage.py dumpdata --format=yaml -o apps/core/fixtures/Site.yaml sites.Site
python manage.py dumpdata --format=yaml -o apps/core/fixtures/User.yaml auth.User
# Org 
rm apps/org/fixtures/*
python manage.py dumpdata --format=yaml -o apps/org/fixtures/Org.yaml                   org.Org
python manage.py dumpdata --format=yaml -o apps/org/fixtures/OrgUser.yaml               org.OrgUser 
python manage.py dumpdata --format=yaml -o apps/org/fixtures/OrgUserGroup.yaml          org.OrgUserGroup
python manage.py dumpdata --format=yaml -o apps/org/fixtures/OrgUserInOrgUserGroup.yaml org.OrgUserInOrgUserGroup
