from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
User = get_user_model()


class Command(BaseCommand):
    help = 'Helpper for create test data manually'
    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Done'))
