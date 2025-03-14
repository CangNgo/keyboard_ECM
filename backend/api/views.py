from rest_framework import generics, mixins
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from . import models
from . import serializer


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

# Cập nhật và xóa địa chỉ
@api_view(["PUT", "DELETE"])
@permission_classes([AllowAny])
def updateAddress(request, pk): 
    # Kiểm tra địa chỉ có tồn tại không
    try:
        instance = models.Address.objects.get(id=pk)
    except models.Address.DoesNotExist:
        return Response({"error": "Không tìm thấy địa chỉ cần cập nhật"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == "PUT": 
            # Kiểm tra user có tồn tại không
        if "user" in request.data and not models.User.objects.filter(id=request.data["user"]).exists():
            return Response({"error": "Người dùng không tồn tại"}, status=status.HTTP_400_BAD_REQUEST)

        # Cập nhật dữ liệu
        seria = serializer.AddressSerializer(instance, data=request.data, partial=True) 
        if seria.is_valid():
            seria.save()
            return Response(seria.data, status=status.HTTP_200_OK)
        
        return Response(seria.errors, status=status.HTTP_400_BAD_REQUEST) 
    elif request.method == "DELETE": 
        serializerInstance = serializer.AddressSerializer(instance )
        serializerInstance.delete(instance)
        return Response({"message": "Xóa địa chỉ thành công"}, status = status.HTTP_200_OK)

# Kiểm tra nếu dữ liệu chưa nhập đủ 
def validata_data(request, required_field): 
    miss_field = [field for field in required_field if field not in request.data]
    if miss_field : 
        return Response({"Error": f"Nhập thiếu dữ liệu: {', '.join(miss_field)}"}, status= status.HTTP_400_BAD_REQUEST)
class ImageView(
    generics.CreateAPIView,
    generics.UpdateAPIView,
):
    queryset = models.Product.objects.all()
    serializer_class = serializer.ProductSerializer
    permission_classes = [AllowAny]

