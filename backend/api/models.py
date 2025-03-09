# api/models.py
from django.db import models

class User(models.Model):
    id = models.BigAutoField(primary_key=True)  # Không cần dấu : mà dùng =
    username = models.CharField(max_length=255)  # Dùng CharField thay vì TextField cho username
    password = models.CharField(max_length=255)  # Dùng CharField cho password
    email = models.EmailField(unique=True)      # Thêm unique để tránh trùng email
    phone_number = models.CharField(max_length=15)  # Giới hạn độ dài cho số điện thoại

    def __str__(self):
        return self.username