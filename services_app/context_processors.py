
from .models import Service

def services_processor(request):
    #Retrieve services
    services = Service.objects.filter(published = True)
    #Construct menu link array
    menu_links = {}
    for service in services:
        menu_links[service.url] = service.menu_link
    return {'menu_links': menu_links}
