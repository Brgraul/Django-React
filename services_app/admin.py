from django.contrib import admin
# Register your models here.
from .models import Service, VetsDisplay, CustomerDisplay


class ServiceAdmin(admin.ModelAdmin):
    list_display = ('name', 'menu_link')

class VetsDisplayAdmin(admin.ModelAdmin):
    list_display = ('name', 'published_slider','published_lasvets')

class CustomerDisplayAdmin(admin.ModelAdmin):
    list_display = ('name', 'published')

admin.site.register(Service, ServiceAdmin)

admin.site.register(VetsDisplay, VetsDisplayAdmin)

admin.site.register(CustomerDisplay, CustomerDisplayAdmin)
