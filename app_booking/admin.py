from django.contrib import admin

# Register your models here.

from .models import Pet, Booking, Order, Customer

#admin.site.register(UserVeterian)
admin.site.register(Pet)
admin.site.register(Booking)
admin.site.register(Order)
admin.site.register(Customer)
#admin.site.register(UserCustomer)
