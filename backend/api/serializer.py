from .models import User
from rest_framework import serializers
from django.contrib.auth.hashers import  make_password
from rest_framework.decorators import action
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password", "email"]
        extra_kwargs = {"password": {"write_only": True}}
        
    @action(detail=True, methods=["POST"])
    def create(self, validate_data): 
        validate_data["password"] = make_password(validate_data["password"])
        user = User.objects.create(**validate_data)
        return user 
    