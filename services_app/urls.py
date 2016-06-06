from django.conf.urls import patterns, include, url
from . import views

urlpatterns = [
    url(r'^(?P<service_url>[\w-]+)/$', views.ServicePage, name='service_page'),

]
