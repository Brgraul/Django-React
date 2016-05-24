from django.shortcuts import render
import datetime
from models import Vet
from rest_framework import generics
from serializers import VetSerializer

#Api imports
from serializers import VetSerializer
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework import renderers
from rest_framework.decorators import detail_route

# Create your views here.
from django.http import HttpResponse


def Index(request):
    return render(request, "booking/index.html", {'time' : datetime.datetime.now()})


# Api Views
class VetViewSet(generics.RetrieveUpdateDestroyAPIView):
    queryset = Vet.objects.all()
    serializer_class = VetSerializer

def Vet(request, vet_id):
    vet = Vet.objects.get(pk=band_id)
    return render(request, "booking/vet.html", {'vet':vet})
