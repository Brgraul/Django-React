from django.contrib import admin
# Register your models here.

from .models import Product, ProductCategory

admin.site.register(Product)
admin.site.register(ProductCategory)
