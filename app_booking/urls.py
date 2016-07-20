
from .views import CheckoutPage, PaymentPage, PaymentConfirmPage, PaymentErrorPage
from .views import CookieTestSet, CookieTestVerify, CookieOrderIsSet, CookieOrderGet
from .views import CookiePetIsSet, CookiePetGet
from django.conf.urls import include, url

urlpatterns = [
    url(r'^checkout/$', CheckoutPage, name='checkout'),
    url(r'^payment/$', PaymentPage, name='payment'),
    url(r'^payment-confirm/$', PaymentConfirmPage, name='payment-confirm'),
    url(r'^payment-error/$', PaymentErrorPage, name='payment-error'),
    #Cookies Handling
    url(r'^api/cookies/cookie_test_set/$', CookieTestSet, name='cookie_set_test'),
    url(r'^api/cookies/cookie_test_verify/$', CookieTestVerify, name='cookie_checkout_page'),
    url(r'^api/cookies/cookie_order_isset/$', CookieOrderIsSet, name='cookie_order_isset'),
    url(r'^api/cookies/cookie_pet_isset/$', CookiePetIsSet, name='cookie_pet_isset'),
    url(r'^api/cookies/cookie_order_get/$', CookieOrderGet, name='cookie_order_get'),
    url(r'^api/cookies/cookie_pet_get/$', CookiePetGet, name='cookie_pet_get'),
]
