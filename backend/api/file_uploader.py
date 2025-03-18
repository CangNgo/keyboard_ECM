import os
import uuid
from minio import Minio
from minio.error import S3Error
from io import BytesIO

def upload_image(image_file):
    client = Minio(
        "127.0.0.1:9000",
        access_key="kx0kjKpYuarX8m613DAD",
        secret_key="FKgSNaNARsgnzC3mHhVnsdwUNnZhHymNUqZgcPjL",
        secure=False
    )

    bucket_name = "images"
    destination_file = "1.png"

    file_data = image_file.read()
    file_size = image_file.size
    name = image_file.name
    _, extension = os.path.splitext(name)
    file_name = str(uuid.uuid4()) + extension

    # Create BytesIO object from the file content
    data = BytesIO(file_data)

    found = client.bucket_exists(bucket_name)
    if not found:
        client.make_bucket(bucket_name)
        print("Created bucket", bucket_name)
    else:
        print("Bucket", bucket_name, "already exists")

    # Upload the file, renaming it in the process
    client.put_object(
            bucket_name,
            file_name,
            data,
            length=file_size,
            content_type=image_file.content_type
    )

    return file_name
