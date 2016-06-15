from django.shortcuts import render , redirect
from django.shortcuts import get_object_or_404
from django.views.generic import View
from .forms import CheckoutForm
# Create your views here.

def CheckoutPage(request):
    context = {
    'form':CheckoutForm
    }
    return render(request, "booking_app/checkout.html", context)
