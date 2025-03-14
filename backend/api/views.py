from rest_framework import generics, mixins
from rest_framework.permissions import AllowAny

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

class ImageView(
    generics.CreateAPIView,
    generics.UpdateAPIView,
):
    queryset = models.Product.objects.all()
    serializer_class = serializer.ProductSerializer
    permission_classes = [AllowAny]

