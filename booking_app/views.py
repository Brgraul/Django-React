from django.shortcuts import render , redirect
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import View
from .forms import CheckoutForm
# Create your views here.
@csrf_exempt
def CheckoutPage(request):
    context = {
    'form':CheckoutForm
    }
    if request.method == "POST":
        print request.POST
        data = request.POST.get('data')
        print data

    return render(request, "booking_app/checkout.html", context)
