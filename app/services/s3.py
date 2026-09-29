"""
Amazon S3 storage service for CloudNexus.
"""

import os
from pathlib import Path

import boto3
from dotenv import load_dotenv


load_dotenv()


AWS_REGION = os.getenv("AWS_REGION", "ap-south-1")
S3_BUCKET_NAME = os.getenv("S3_BUCKET_NAME")


if not S3_BUCKET_NAME:
    raise RuntimeError(
        "S3_BUCKET_NAME is missing from .env"
    )


s3 = boto3.client(
    "s3",
    region_name=AWS_REGION,
)


def upload_bytes(
    key: str,
    data: bytes,
    content_type: str,
) -> str:

    s3.put_object(
        Bucket=S3_BUCKET_NAME,
        Key=key,
        Body=data,
        ContentType=content_type,
    )

    return key


def presign_get(
    key: str,
    expires_seconds: int = 600,
) -> str:

    return s3.generate_presigned_url(
        "get_object",
        Params={
            "Bucket": S3_BUCKET_NAME,
            "Key": key,
            "ResponseContentDisposition": "inline",
            "ResponseContentType": "application/pdf",
        },
        ExpiresIn=expires_seconds,
    )


def delete_object(key: str) -> None:

    s3.delete_object(
        Bucket=S3_BUCKET_NAME,
        Key=key,
    )


def local_fallback_path(
    file_id: str,
    filename: str,
) -> Path:

    from app.config import UPLOAD_DIR

    dest_dir = UPLOAD_DIR / file_id
    dest_dir.mkdir(
        parents=True,
        exist_ok=True,
    )

    return dest_dir / filename
def download_object(key: str, destination: str) -> str:
    """
    Download an S3 object to a temporary/local path.
    Returns the destination path.
    """

    s3.download_file(
        S3_BUCKET_NAME,
        key,
        destination,
    )
    return destination