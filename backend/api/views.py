from django.shortcuts import render
from . import models
from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status,generics, mixins
from . import serializer
from rest_framework.permissions import AllowAny

# Create your views here.
class CreateUserView (generics.CreateAPIView):
    queryset = models.User.objects.all()
    serializer_class = serializer.UserSerializer
    permission_classes = [AllowAny]

class CategoryView (
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    generics.GenericAPIView
):
    queryset = models.Category.objects.all()
    serializer_class = serializer.CategorySerializer
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        if 'pk' in kwargs:
            return self.retrieve(request, *args, **kwargs)
        return self.list(request, *args, **kwargs)
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

class PropertyView(
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    generics.GenericAPIView
):
    queryset = models.Property.objects.all()
    serializer_class = serializer.PropertySerializer
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        if 'pk' in kwargs:
            return self.retrieve(request, *args, **kwargs)
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
    
# Address 
@api_view(['POST'])
@permission_classes([AllowAny])
def createAddress(request):
    # kiểm tra có nhập thiếu dữ liệu hay không
    required_field = ["user", "city", "district", "ward"]
    
    valid = validata_data(request, required_field)
    if valid :
        return valid
    
    # kiểm tra user có tồn tại hay không 
    user_id =request.data.get("user")
    if not models.User.objects.filter(id = user_id).exists(): 
        return Response({"Error": "User không tồn tại"}, status=status.HTTP_400_BAD_REQUEST)
    seria = serializer.AddressSerializer(data=request.data)
    if seria.is_valid():
        seria.save()
        return Response(seria.data, status=status.HTTP_201_CREATED)
    return Response(seria.errors, status=status.HTTP_400_BAD_REQUEST)

# Cập nhật địa chỉ
@api_view(["PUT"])
@permission_classes([AllowAny])
def updateAddress(request, pk): 
    # Kiểm tra địa chỉ có tồn tại không
    try:
        instance = models.Address.objects.get(id=pk)
    except models.Address.DoesNotExist:
        return Response({"error": "Không tìm thấy địa chỉ cần cập nhật"}, status=status.HTTP_404_NOT_FOUND)

    # Kiểm tra user có tồn tại không
    if "user" in request.data and not models.User.objects.filter(id=request.data["user"]).exists():
        return Response({"error": "Người dùng không tồn tại"}, status=status.HTTP_400_BAD_REQUEST)

    # Cập nhật dữ liệu
    seria = serializer.AddressSerializer(instance, data=request.data, partial=True) 
    if seria.is_valid():
        seria.save()
        return Response(seria.data, status=status.HTTP_200_OK)
    
    return Response(seria.errors, status=status.HTTP_400_BAD_REQUEST) 
# Kiểm tra nếu dữ liệu chưa nhập đủ 
def validata_data(request, required_field): 
    miss_field = [field for field in required_field if field not in request.data]
    if miss_field : 
        return Response({"Error": f"Nhập thiếu dữ liệu: {', '.join(miss_field)}"}, status= status.HTTP_400_BAD_REQUEST)
