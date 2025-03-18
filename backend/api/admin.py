from django.contrib import admin

from .models import Address, Product, Category, Variant, Property, CartDetail, Cart, Order, OrderDetail

# Register your models here.
# admin
# admin123123
# cangngoo@gmail.com

admin.site.register(Address)
admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Variant)
admin.site.register(Property)
admin.site.register(CartDetail)
admin.site.register(Cart)
admin.site.register(Order)
admin.site.register(OrderDetail)
