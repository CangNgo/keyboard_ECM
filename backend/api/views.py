from django.shortcuts import render
from .models import User
from rest_framework import generics
from .serializer import UserSerializer 
from rest_framework.permissions import IsAuthenticated, AllowAny

# Create your views here.
class CreateUserView (generics.CreateAPIView): 
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
