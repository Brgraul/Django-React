from django.shortcuts import render
from django.shortcuts import get_object_or_404
#Importing Models
from .models import Product, ProductCategory

# Create your views here.
from django.http import HttpResponse

#Individual Product Page
def ProductPage(request, product_id):
    product = get_object_or_404(Product, pk=product_id)
    context = { 'product' : product }
    return render(request, "products_app/product.html", context)

#redirect to buying a product
def ProductBookingPage(request, product_id):
    product = get_object_or_404(Product, pk=product_id)
    context = { 'product' : product }
    return render(request, "products_app/product.html", context)
