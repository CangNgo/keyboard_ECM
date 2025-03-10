# api/models.py
from django.db import models
from django.core.validators import MinValueValidator

class User(models.Model):
    id = models.BigAutoField(primary_key=True)  # Không cần dấu : mà dùng =
    username = models.CharField(max_length=255)  # Dùng CharField thay vì TextField cho username
    password = models.CharField(max_length=255)  # Dùng CharField cho password
    email = models.EmailField(unique=True)      # Thêm unique để tránh trùng email
    phone_number = models.CharField(max_length=15)  # Giới hạn độ dài cho số điện thoại

    def __str__(self):
        return self.username

class Address(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    city = models.CharField(max_length=255)
    ward = models.CharField(max_length=255)
    district = models.CharField(max_length=255)
    specific_address = models.CharField(max_length=255)

class Category(models.Model):
    name = models.CharField(max_length=255)


class Property(models.Model):
    name = models.CharField(max_length=255)
    value = models.CharField(max_length=255)

class Product(models.Model):
    name = models.CharField(max_length=255)
    dimensions_mm = models.CharField(max_length=20)
    weight_in_grams = models.FloatField(
        validators=[MinValueValidator(1.0)]  # Ensures cost >= 0
    )
    total_quantity = models.IntegerField(
        default=0
    )
    image_url = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    properties = models.ManyToManyField(Property)
    created_at = models.DateField(auto_now_add=True)

class Variant(models.Model):
    product = models.ForeignKey(Product,on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    price = models.DecimalField(
        max_digits=10,          # Total digits (including decimals)
        decimal_places=2,       # Digits after decimal (e.g., 1234.56)
        default=0.00,           # Default value
        validators=[MinValueValidator(0.00)]  # Ensures cost >= 0
    )
    quantity = models.IntegerField(default=0)
    image_url = models.CharField(max_length=255)
    sku = models.CharField(max_length=255)

class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class CartDetail(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    variant = models.ForeignKey(Variant, on_delete=models.CASCADE)
    quantity = models.IntegerField(
        validators=[MinValueValidator(1)]
    )

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    total_amount = models.DecimalField(
        max_digits=10,          # Total digits (including decimals)
        decimal_places=2,       # Digits after decimal (e.g., 1234.56)
        default=0.00,           # Default value
        validators=[MinValueValidator(0.00)]  # Ensures cost >= 0
    )
    STATUS_CHOICES = [
        ('PREPARING', 'preparing'),
        ('SHIPPING', 'shipping'),
        ('COMPLETED', 'completed'),
        ('CANCEL', 'cancel')
    ]
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='PREPARING'
    )
    created_at = models.DateField(auto_now_add=True)

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    variant = models.ForeignKey(Variant, on_delete=models.CASCADE)
    quantity = models.IntegerField(
        validators=[MinValueValidator(1)]
    )
    total_amount = models.DecimalField(
        max_digits=10,          # Total digits (including decimals)
        decimal_places=2,       # Digits after decimal (e.g., 1234.56)
        default=0.00,           # Default value
        validators=[MinValueValidator(0.00)]  # Ensures cost >= 0
    )


