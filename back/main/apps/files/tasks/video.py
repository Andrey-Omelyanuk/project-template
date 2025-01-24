import os
import boto3
import uuid
from django.conf import settings
from django.core.files.base import ContentFile
from ..models import File, FileVersion


s3_client = boto3.client('s3',
    aws_access_key_id=settings.MINIO_ACCESS_KEY,
    aws_secret_access_key=settings.MINIO_SECRET_KEY,
    endpoint_url=f'http{'s'if settings.MINIO_USE_HTTPS else ''}://{settings.MINIO_ENDPOINT}'
)

POSTER = [
    'preview',    # gif 720x404 with short preview of the video
    'thumbnail',  # png 720x404
]
# order is important, first is the lowest quality
QUALITIES = ['240p', '360p', '720p', '1080p']


def process_video(file: File, slugs: list[str] | None = None):
    """ Compress the video file. """

    if slugs is None:
        slugs = POSTER + QUALITIES

    # Get the original file path
    original_s3_file = file.file.name
    # Generate a random name for the temporary file
    local_file = f"/tmp/{str(uuid.uuid4())}"
    # Download the file from S3
    s3_client.download_file('main', original_s3_file, local_file)

    # Process the video
    for slug in slugs:
        output_local_file = None
        if slug in 'thumbnail':
            output_local_file = process_thumbnail(local_file, slug)
        if slug in 'preview':
            output_local_file = process_preview(local_file, slug)
        elif slug in QUALITIES:
            output_local_file = process_quality(local_file, slug)
        if not output_local_file:
            continue

        # Upload the processed file back to S3
        with open(output_local_file, 'rb') as f:
            content = ContentFile(f.read())
            ext = output_local_file.split('.')[-1] 
            basename = os.path.basename(original_s3_file).split('.')[0]
            output_s3_path = f"version_files/{basename}_{slug}.{ext}"
            s3_client.upload_fileobj(content, 'main', output_s3_path)
        os.remove(output_local_file)

        # Create a new FileVersion instance
        FileVersion.objects.create(
            original=file,
            slug=slug,
            file=output_s3_path
        )

    os.remove(local_file)


def process_thumbnail(local_file: str, slug: str) -> str :
    """ Extract the first frame from the video """
    output_file_path = f"/tmp/{str(uuid.uuid4())}_{slug}.png"
    os.system(f"ffmpeg -i {local_file} -ss 00:00:01.000 -vframes 1 {output_file_path}")
    return output_file_path

def process_preview(local_file: str, slug: str) -> str :
    """ Create a gif preview of the video. 10 frames for all video. """
    output_file_path = f"/tmp/{str(uuid.uuid4())}_{slug}.gif"
    # os.system(f"ffmpeg -i {local_file} -vf scale=720:404 -t 5 -r 10 {output_file_path}")
    os.system(f"ffmpeg -i {local_file} -vf scale=720:404 -frames:v 10 {output_file_path}")
    return output_file_path

def process_quality(local_file: str, slug: str) -> str:
    """ Compress the video to a specific resolution """
    output_file_path = f"/tmp/{str(uuid.uuid4())}_{slug}.mp4"
    resolution = int(slug[:-1])
    os.system(f"ffmpeg -i {local_file} -vf scale=-1:{resolution} {output_file_path}")
    return output_file_path
