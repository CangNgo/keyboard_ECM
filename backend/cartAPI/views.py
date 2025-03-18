from django.core.serializers import serialize
from django.shortcuts import render
from rest_framework.views import APIView
from serializer import CartSerializer


# Create your views here.

class CartAPI(APIView):
    serializer_class = CartSerializer
    def get(self, request):
        cart = CartSerializer()
        return cart.data
