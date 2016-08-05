from django.contrib import admin

# Register your models here.

from .models import Landing

class LandingsAdmin(admin.ModelAdmin):
    list_display = ('name', 'url')

admin.site.register(Landing, LandingsAdmin)
