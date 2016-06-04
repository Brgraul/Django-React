from django.conf.urls import patterns, include, url
from . import views

urlpatterns = [
    url(r'^(?P<product_id>[0-9]+)/$', views.ProductPage, name='product_page'),
    url(r'^(?P<product_id>[0-9]+)/payment$', views.ProductPaymentForm, name='product_payment_page'),
    url(r'^sermepa_end$', views.end, name='end'),

]
