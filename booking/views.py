from django.shortcuts import render
import datetime

# Create your views here.
from django.http import HttpResponse


def index(request):
    return render(request, "booking/index.html", {'time' : datetime.datetime.now()})
