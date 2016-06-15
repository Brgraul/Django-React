from django.contrib import admin

# Register your models here.

from .models import UserVeterian, Pet, Booking, UserCustomer

class UserVeterianAdmin(admin.ModelAdmin):
    list_display = ()


admin.site.register(UserVeterian)
admin.site.register(Pet)
admin.site.register(Booking)
admin.site.register(UserCustomer)
