from django.contrib import admin

# Register your models here.

from .models import Pet, Booking, Order, Customer

#admin.site.register(UserVeterian)
admin.site.register(Pet)
admin.site.register(Order)
#admin.site.register(UserCustomer)


class CustomerAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'city', 'adress', 'phone_number')
    list_display_links = ('first_name', 'last_name')
    list_filter = ('first_name', 'last_name', 'id')

class BookingAdmin(admin.ModelAdmin):
    list_display = ('date_booking', 'adress', 'city', 'customer')
    list_filter = 'id'
    readonly_fields = 'city'

admin.site.register(Customer, CustomerAdmin)
admin.site.register(Booking, BookingAdmin)
