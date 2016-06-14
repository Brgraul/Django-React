
from booking_app import views
from django.conf.urls import include, url

urlpatterns = [
    url(r'^accounts/profile/$', views.UserProfile, name='profile'),
]
