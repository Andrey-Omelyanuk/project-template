# We have to import all the tasks here so that they can be registered with Celery
from .video import process_video_task

