from django.shortcuts import render
from django.shortcuts import get_object_or_404

from .models import Service

# Create your views here.

#Individual Service Page
def ServicePage(request, service_url):
    service = get_object_or_404(Service, url = service_url)
    context = { 'service' : service }
    return render(request, "services_app/service.html", context)
