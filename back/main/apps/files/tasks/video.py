import os
import boto3
from celery import shared_task
from django.conf import settings
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from ..models import File, FileVersion


s3_client = boto3.client(
    's3',
    aws_access_key_id=settings.S3_ACCESS_KEY_ID,
    aws_secret_access_key=settings.S3_SECRET_ACCESS_KEY,
    endpoint_url=settings.S3_ENDPOINT_URL
)


@shared_task
def process_video_task(file_id: int, compression: str):
    """ Compress the video file and save it as a new FileVersion instance. """

    file = File.objects.get(id=file_id)
    if file.type != File.Type.VIDEO:
        # Only video should be recompressed.
        return

    # Download the file from S3
    original_file_path = file.file.name
    local_file_path = f"/tmp/{os.path.basename(original_file_path)}"
    s3_client.download_file(settings.S3_BUCKET_NAME, original_file_path, local_file_path)

    # Process the video
    resolution = 720 if compression == '720p' else 1080
    output_file_path = f"{os.path.splitext(local_file_path)[0]}_{resolution}.mp4"
    os.system(f"ffmpeg -i {local_file_path} -vf scale=-1:{resolution} {output_file_path}")

    # Upload the processed file back to S3
    with open(output_file_path, 'rb') as f:
        content = ContentFile(f.read())
        output_s3_path = f"version_files/{os.path.basename(output_file_path)}"
        default_storage.save(output_s3_path, content)

    # Create a new FileVersion instance
    FileVersion.objects.create(
        original=file,
        slug=compression,
        file=output_s3_path
    )

    # Clean up local files
    os.remove(local_file_path)
    os.remove(output_file_path)
