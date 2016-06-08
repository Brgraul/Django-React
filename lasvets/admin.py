from django.contrib import admin
# Register your models here.
from .models import VetsDisplay

class VetsDisplayAdmin(admin.ModelAdmin):
    list_display = ('name', 'published')

admin.site.register(VetsDisplay, VetsDisplayAdmin)
