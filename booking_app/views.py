from django.shortcuts import render , redirect
from django.shortcuts import get_object_or_404
from django.views.generic import View

# Create your views here.
def UserProfile(request):
    return render(request, "booking_app/profile.html", {})
