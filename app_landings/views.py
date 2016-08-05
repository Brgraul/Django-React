from django.shortcuts import render
from django.shortcuts import get_object_or_404

from .models import Landing
from services_app.models import VetsDisplay, CustomerDisplay
from django.shortcuts import render_to_response
from django.template import RequestContext

from django.http import Http404

#Individual Landing Page
def LandingPage(request, landing_url):
    landing = get_object_or_404(Landing, url = landing_url)
    vets = VetsDisplay.objects.filter(published_slider=True)
    customers = CustomerDisplay.objects.filter(published=True)
    context = {
        'landing' : landing,
        'vets':vets,
        'customers':customers,
    }
    return render(request, "app_landings/landing.html", context)
