from django.shortcuts import render
from . import models
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from . import serializer
from rest_framework.permissions import IsAuthenticated, AllowAny

# Create your views here.
class CreateUserView (generics.CreateAPIView):
    queryset = models.User.objects.all()
    serializer_class = serializer.UserSerializer
    permission_classes = [AllowAny]

@api_view(['POST'])
def createCategory (request):
    s = serializer.CategorySerializer(data = request.data)
    if s.is_valid():
        s.save()
        return Response(s.data, status=status.HTTP_201_CREATED)
    return Response(s.errors, status=status.HTTP_400_BAD_REQUEST)
createCategory.permission_classes = [AllowAny]

@api_view(['PUT'])
def updateCategory (request):
    try:
        category_id = request.data.get('id')
        if not category_id:
            return Response({"error": "Category ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        category = models.Category.objects.get(id=category_id)
        serializer = serializer.CategorySerializer(category, data=request.data, partial=True)  # partial=True for PATCH-like updates
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except models.Category.DoesNotExist:
        return Response({"error": "Category not found"}, status=status.HTTP_404_NOT_FOUND)
updateCategory.permission_classes = [AllowAny]
