from .models import *
from rest_framework import serializers
from django.contrib.auth.hashers import  make_password
from . import file_uploader

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password", "email", "phone_number"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validate_data):
        validate_data["password"] = make_password(validate_data["password"])
        user = User.objects.create(**validate_data)
        return user

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = "__all__"

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = "__all__"

class ProductSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(write_only = True)
    properties = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Property.objects.all()
    )

    class Meta:
        model = Product
        fields = ['id', 'name', 'dimensions_mm', 'weight_in_grams', 'total_quantity','image','category', 'properties']

    def create(self, validated_data):
        image = validated_data.pop('image')

        image_url = file_uploader.upload_image(image)
        properties_data = validated_data.pop('properties')

        product = Product.objects.create(image_url=image_url, **validated_data)
        product.properties.set(properties_data)

        return product


class VariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Variant
        fields = "__all__"

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = "__all__"

class CartDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartDetail
        fields = "__all__"

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = "__all__"

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = "__all__"
