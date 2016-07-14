from django.contrib import admin

# Register your models here.

from .models import Pet, Booking, Order, Customer

#admin.site.register(UserVeterian)

#admin.site.register(UserCustomer)


class BookingAdminInline(admin.TabularInline):
    model = Booking
    fk_name = "customer"

class CustomerAdminInline(admin.TabularInline):
    model = Customer

class CustomerAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'city', 'adress', 'phone_number')
    list_display_links = ('first_name', 'last_name')
    list_filter = ('first_name', 'last_name', 'id')
    inlines = [
        BookingAdminInline,
    ]

class BookingAdmin(admin.ModelAdmin):
    model = Booking
    list_display = ('created', 'date_booking', 'adress', 'city',)


class OrderAdmin(admin.ModelAdmin):
    model = Order
    list_display = ('created', 'status', 'customer', 'booking',)


class PetAdmin(admin.ModelAdmin):
    model = Pet
    list_display = ('name','customer', 'gender',)



admin.site.register(Customer, CustomerAdmin)
admin.site.register(Booking, BookingAdmin)
admin.site.register(Pet, PetAdmin)
admin.site.register(Order, OrderAdmin)
