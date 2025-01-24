from celery import shared_task
from ..models import File
from .video import process_video
from .audio import process_audio
from .image import process_image
from .other import process_other

@shared_task
def process_file_task(file_id: int, slugs: list[str] | None = None):
    """ Process file task. """
    try:
        file = File.objects.prefetch_related('versions').get(id=file_id)
    except File.DoesNotExist:
        return

    match file.type:
        case File.Type.VIDEO:
            process_video(file, slugs)
        case File.Type.AUDIO:
            process_audio(file, slugs)
        case File.Type.IMAGE:
            process_image(file, slugs)
        case _:
            process_other(file, slugs)
