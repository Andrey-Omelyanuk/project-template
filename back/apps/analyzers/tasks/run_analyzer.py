from datetime       import datetime
from celery         import shared_task
from django.utils.timezone import utc


@shared_task
def run_analyzer(session_id):
    from ..models import Analyzer, AnalyzerSession
    session  = AnalyzerSession .objects.get(id=session_id)
    analyzer = Analyzer.objects.get(id=session.analyzer_id)
    analyzer_function = getattr(__import__(f"apps.analyzers.analyzers.{analyzer.name}", fromlist=['analyzer']), 'analyzer')
    analyzer_function()
    session.finished = datetime.utcnow().replace(tzinfo=utc)
    session.save()
