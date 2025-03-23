from django.conf import settings
from django.contrib import admin
from django import forms
from django.utils.html import format_html

from .models import Address, Product, Category, Variant, Property, CartDetail, Cart, Order, OrderDetail
from cloudinary.utils import cloudinary_url
import cloudinary
import cloudinary.uploader
# cấu hình coudinay
cloudinary.config(
    cloud_name=settings.CLOUDINARY_STORAGE['CLOUD_NAME'],
    api_key=settings.CLOUDINARY_STORAGE['API_KEY'],
    api_secret=settings.CLOUDINARY_STORAGE['API_SECRET']
)
# Register your models here.
# admin
# admin123123
# cangngoo@gmail.com
class ProductForm(forms.ModelForm):  # Sửa typo: ProductFroms -> ProductForm
    image_file = forms.ImageField(required=False, label="Upload Image")  # Trường tạm để upload

    class Meta:
        model = Product
        fields = [
            "name",
            "dimensions_mm",
            "weight_in_grams",
            "total_quantity",
            "image_file",
            "category",
            "properties",
        ]
class ProductAdmin(admin.ModelAdmin):
    form = ProductForm

    def save_model(self, request, obj, form, change):

        if "image_file" in request.FILES:
            file = request.FILES["image_file"]
            url = cloudinary.uploader.upload(file)
            # print("cloudinay url: " + url)
            obj.image_url = url['secure_url']
        super().save_model(request, obj, form, change)
class VariantForm(forms.ModelForm):
    image_file = forms.ImageField(required=False, label="Upload Image")
    class Meta:
        model = Variant
        fields = [
            'product',
            'name',
            'price',
            'quantity',
            'image_file',
            'sku',
        ]
class VariantAdmin(admin.ModelAdmin):
    list_display = ['name', 'product', 'price', 'quantity', 'sku','image_preview']
    list_per_page = 20
    form = VariantForm
    def save_model(self, request, obj, form, change):
        if 'image_file' in request.FILES:
            file = request.FILES['image_file']
            url = cloudinary.uploader.upload(file)
            obj.image_url = url['secure_url']
        super().save_model(request,obj, form, change)

    def image_preview(self, obj):
        if obj.image_url:
            return format_html('<img src="{}" style="max-width: 100px; max-height: 100px;" />', obj.image_url)
    image_preview.short_description = 'Image'
admin.site.register(Address)
admin.site.register(Category)
admin.site.register(Product, ProductAdmin)
admin.site.register(Variant, VariantAdmin)
admin.site.register(Property)
admin.site.register(CartDetail)
admin.site.register(Cart)
admin.site.register(Order)
admin.site.register(OrderDetail)

