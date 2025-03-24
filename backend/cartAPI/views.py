from django.core.serializers import serialize
from django.shortcuts import render
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models import CartDetail
from api.serializer import CartDetailSerializer
from .serializer import AddCartDetailSerializer, UpdateCartDetailSerializer


# Create your views here.

# class CartAPI(APIView):
#     serializer_class = CartSerializer
#     def get(self, request):
#         cart = CartSerializer()
#         return cart.data
#     def post(self, request):
#         cart = CartSerializer(data=request.data)
#         if cart.is_valid():
#             cart.save()
class AddCartDettailAPI(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        # print("request: " + request.data)
        AddSerializer = AddCartDetailSerializer(data=request.data, context={"request": request})
        if AddSerializer.is_valid():
            cartDetail = AddSerializer.save()
            cartDetailResponse = CartDetailSerializer(cartDetail)
            return Response(cartDetailResponse.data, status=201)


class InCreaseCartDetailAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        updateSerializer = UpdateCartDetailSerializer
        quantity = request.data["quantity"]
        if updateSerializer.is_valid():
            cartDetail = CartDetail.objects.get(id=quantity)
            cartDetail.quantity = quantity
            cartDetail.save()
            cartDetailResponse = CartDetailSerializer(cartDetail)
            return Response(cartDetailResponse.data, status=200)
