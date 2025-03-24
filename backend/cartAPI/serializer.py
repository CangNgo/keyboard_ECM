from rest_framework import serializers
from api.models import Cart, CartDetail, Variant


class CartSerializer:
    def __init__(self):
        self.data = Cart.objects.all()

    class Meta:
        models = Cart
        fields = "__all__"


class AddCartDetailSerializer(serializers.Serializer):
    variantId = serializers.IntegerField()

    def create(self, validated_data):
        try:
            user = self.context['request'].user
            variant = Variant.objects.get(id=validated_data['variantId'])
            cart, created = Cart.objects.get_or_create(user=user)

            cartDetail, crated_detail = CartDetail.objects.get_or_create(variant=variant, cart=cart, defaults={"quantity": 1})
            if crated_detail:
                cartDetail.quantity = 1
                cartDetail.save()
            else:
                cartDetail.quantity += 1
                cartDetail.save()
            return cartDetail
        except Variant.DoesNotExist:
            return "Sản phẩm không tồn tại"


class UpdateCartDetailSerializer(serializers.Serializer):
    variantId = serializers.IntegerField()
    quantity = serializers.IntegerField(min_value=1)
