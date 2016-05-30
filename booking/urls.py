from django.conf.urls import patterns, include, url
from rest_framework.routers import DefaultRouter
from . import views

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'vets_api', views.VetViewSet)

urlpatterns = [
    url(r'^$', views.Index, name='index'),
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    #url(r'^api/(?P<vet_id>\d+)/$', views.VetDetail, name='vet-details'),
    #url(r'^api/', include(router.urls)),
    #url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]

#urlpatterns = format_suffix_patterns(urlpatterns)
