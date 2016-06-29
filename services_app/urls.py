from django.conf.urls import patterns, include, url
from . import views

urlpatterns = [
    url(r'^(?P<service_url>[\w-]+)/$', views.ServicePage, name='service_page'),
    url(r'^$', views.Index, name='index'),
    url(r'^(?P<vet_id>\d+)/$', views.VetProfile, name='vet'),
]
