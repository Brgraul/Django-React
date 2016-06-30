
from .views import CheckoutPage, PaymentPage, PaymentConfirmPage, CookieTestSet, CookieTestVerify
from django.conf.urls import include, url

urlpatterns = [
    url(r'^checkout/$', CheckoutPage, name='checkout'),
    url(r'^payment/$', PaymentPage, name='payment'),
    url(r'^payment-confirm/$', PaymentConfirmPage, name='payment-confirm'),
    #Cookies Handling
    url(r'^api/cookies/cookie_test_set/$', CookieTestSet, name='cookie_set_test'),
    url(r'^api/cookies/cookie_test_verify/$', CookieTestVerify, name='cookie_checkout_page'),
]
