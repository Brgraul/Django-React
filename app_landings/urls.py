from django.conf.urls import patterns, include, url
from . import views

urlpatterns = [
    url(r'^(?P<landing_url>[\w-]+)/$', views.LandingPage, name='landing_page'),
]
