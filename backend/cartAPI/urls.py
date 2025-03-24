# api/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('cart/add/', views.AddCartDettailAPI.as_view(), name='add_cart_detail'),
]