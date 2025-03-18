from rest_framework import serializers
from api.models import Cart, CartDetail


class CartSerializer:
    def __init__(self):
        self.data = Cart.objects.all()

    class Meta:
        models = Cart
        fields = "__all__"

class CartDetailSerializer:
    class Meta:
        models = CartDetail
        fields = "__all__"