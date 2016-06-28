
from booking_app import views
from django.conf.urls import include, url

urlpatterns = [
    url(r'^checkout/$', views.CheckoutPage, name='checkout'),
    url(r'^payment/$', views.PaymentPage, name='payment'),
    url(r'^payment-confirm/$', views.PaymentConfirmPage, name='payment-confirm'),

]
