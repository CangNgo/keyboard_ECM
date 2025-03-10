from .models import *
from rest_framework import serializers
from django.contrib.auth.hashers import  make_password

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

    def create(self, validated_data):
        return Category(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        return instance

class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = "__all__"

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"

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
