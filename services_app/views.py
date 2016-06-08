from django.shortcuts import render
from django.shortcuts import get_object_or_404

from .models import Service, VetsDisplay, CustomerDisplay

# Create your views here.

#Individual Service Page
def ServicePage(request, service_url):
    service = get_object_or_404(Service, url = service_url)
    vets = VetsDisplay.objects.filter(published=True)
    customers = CustomerDisplay.objects.filter(published=True)
    context = {
        'service' : service,
        'vets':vets,
        'customers':customers,
    }
    return render(request, "services_app/service.html", context)
