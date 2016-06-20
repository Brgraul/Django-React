from django.conf.urls import patterns, include, url
from . import views

urlpatterns = [
    url(r'^(?P<product_id>[0-9]+)/$', views.ProductPage, name='product_page'),
]
