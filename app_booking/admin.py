from django.contrib import admin

# Register your models here.

from .models import Pet, Booking


#admin.site.register(UserVeterian)
admin.site.register(Pet)
admin.site.register(Booking)
#admin.site.register(UserCustomer)
