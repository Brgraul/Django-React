
from .views import CheckoutPage, PaymentPage, PaymentConfirmPage
from django.conf.urls import include, url

urlpatterns = [
    url(r'^checkout/$', CheckoutPage, name='checkout'),
    url(r'^payment/$', PaymentPage, name='payment'),
    url(r'^payment-confirm/$', PaymentConfirmPage, name='payment-confirm'),
]
