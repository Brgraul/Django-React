
from booking_app import views
from django.conf.urls import include, url

urlpatterns = [
    url(r'^checkout/$', views.CheckoutPage, name='profile'),
]
