"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from api import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/user/register", views.CreateUserView.as_view(), name="register"), 
    path("api/category", views.CategoryView.as_view(), name="category"),
    path("api/category/<int:pk>", views.CategoryView.as_view(), name="category_detail"),
    path("api/property", views.PropertyView.as_view(), name="property"),
    path("api/property/<int:pk>", views.PropertyView.as_view(), name="property_detail"),
    path("api/product", views.ImageView.as_view(), name="image"),

    path("api/token", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh_token"),
    path("api-auth/", include("rest_framework.urls")),
    # Address
    path("api/address/", views.createAddress, name="create_address"),
    path("api/address/<int:pk>/", views.updateAddress, name="update_address"),
    path("api-auth/", include("rest_framework.urls")),

    # variant
    path("api/variant", views.addVariant, name="add_variant"),

    #property
    path("api/property", views.addProperties, name="add_property"),
    
    # getProduct
    path("api/list_product", views.getListProduct.as_view(), name="get_list_product"),
]
