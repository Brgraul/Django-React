from django.conf.urls import url, include
from . import views
from .views import contacto


urlpatterns = [
    url(r'^$', views.contacto, name='contacto'),
]
