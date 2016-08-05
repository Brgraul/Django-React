"""instavets URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import include, url
from django.contrib import admin
from django.conf.urls.static import  static
from django.conf import settings
from services_app.views import MeetTheVetsPage
from django.conf.urls import url
from services_app import views
from django.views.generic import TemplateView



urlpatterns = [
    url(r'^admin_tools/', include('admin_tools.urls')),
    url(r'^accounts/', include('allauth.urls')),
    url(r'^sermepa/', include('sermepa.urls')),
    url(r'^', include('app_booking.urls')),
    url(r'^$', views.Index, name='index'),
    url(r'^terminos/', views.Terms, name='terminos'),
    url(r'^privacidad/', views.Privacy, name='privacidad'),
    url(r'^', include('app_booking.urls')),
    url(r'^tarifas/', views.Pricing, name='tarifas'),
    url(r'^servicios/', include('services_app.urls')),
    url(r'^landings/', include('app_landings.urls')),
    url(r'^productos/', include('products_app.urls')),
    url(r'^contacto/', include('contact_app.urls')),
    url(r'^jet/', include('jet.urls', 'jet')),  # Django JET URLS
    url(r'^jet/dashboard/', include('jet.dashboard.urls', 'jet-dashboard')),  # Django JET dashboard URLS
    url(r'^admin/', admin.site.urls),
    # url(r'^about/', TemplateView.as_view(template_name="500.html")),
    # Meet the vets#
    url(r'^veterinarias/$', MeetTheVetsPage, name='meet_vets_url'),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
