# Restore data from fixtures.
python manage.py reset_db --noinput
python manage.py migrate

python manage.py loaddata --app=core User Site
# don't load Source and SourceScanner, they initialized by data migrations
# python manage.py loaddata --app=source Source SourceScanner

# Org
# python manage.py loaddata Org OrgUser OrgGroup OrgUserInGroup 
