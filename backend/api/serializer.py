from .models import *
from rest_framework import serializers
from django.contrib.auth.hashers import  make_password
from . import file_uploader

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password", "email", "phone_number"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            password=validated_data["password"],
            email=validated_data["email"],
            phone_number=validated_data["phone_number"]
        )
        return user

    def delete(self, instance):  # Sửa cú pháp: cần self
        return instance.delete()


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = "__all__"

    def create(self, validated_data):
        return Address.objects.create(**validated_data)

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = "__all__"


    def create(self, validated_data):

        return Property.objects.create(**validated_data)


class VariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Variant
        fields = "__all__"
    def create(self, validated_data):
        image = validated_data.pop('image')
        image_url = file_uploader.upload_image(image)
        return Variant.objects.create(image = image_url, **validated_data)

class ProductSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(write_only = True)
    properties = PropertySerializer(many=True, read_only=True)
    variants = VariantSerializer(many = True, read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'dimensions_mm', 'weight_in_grams', 'total_quantity','image', 'image_url','category', 'properties', 'variants']

    def get_price(self, product):
        lowest = product.variant.order_by('price').first()
        return lowest.price if lowest else None

class PreviewProductSerializer(serializers.ModelSerializer):
    price = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'name', 'image_url', 'price']

    def get_price(self, product):
        lowest = product.variants.order_by('price').first()
        return lowest.price if lowest else None

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

class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderDetail
        fields = "__all__"
