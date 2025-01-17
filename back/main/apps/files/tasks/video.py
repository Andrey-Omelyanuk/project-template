import os
import boto3
import uuid
from celery import shared_task
from django.conf import settings
from django.core.files.base import ContentFile
from ..models import File, FileVersion


s3_client = boto3.client(
    's3',
    aws_access_key_id=settings.MINIO_ACCESS_KEY,
    aws_secret_access_key=settings.MINIO_SECRET_KEY,
    endpoint_url=f'http{'s' if settings.MINIO_USE_HTTPS else ''}://{settings.MINIO_ENDPOINT}'
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

    # Generate a random name for the temporary file
    temp_file_name = str(uuid.uuid4())
    local_file_path = f"/tmp/{temp_file_name}"
    s3_client.download_file('main', original_file_path, local_file_path)

    # Process the video
    resolution = 720 if compression == '720p' else 1080
    output_file_path = f"/tmp/{temp_file_name}_{compression}.mp4"
    os.system(f"ffmpeg -i {local_file_path} -vf scale=-1:{resolution} {output_file_path}")

    # Upload the processed file back to S3
    with open(output_file_path, 'rb') as f:
        content = ContentFile(f.read())
        output_s3_path = f"version_files/{os.path.basename(original_file_path).split('.')[0]}_{compression}.mp4"
        s3_client.upload_fileobj(content, 'main', output_s3_path)

    # Create a new FileVersion instance
    FileVersion.objects.create(
        original=file,
        slug=compression,
        file=output_s3_path
    )

    # Clean up local files
    os.remove(output_file_path)
    os.remove(local_file_path)
