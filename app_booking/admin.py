from django.contrib import admin

# Register your models here.

from .models import Pet, Booking, Order, Customer

#admin.site.register(UserVeterian)
admin.site.register(Pet)
admin.site.register(Order)
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
    list_display = ('date_booking', 'adress', 'city',)
    list_select_related = ('customer',)

    def get_customer(self, obj):
        return obj.customer
    get_customer = 'customer'
    get_customer.admin_order_field  = 'Customer'  #Allows column order sorting
    get_customer.short_description = 'Cliente'  #Renames column head

Seee Doics for this django-related-admin!!!!!!!!!!!!!!!!

admin.site.register(Customer, CustomerAdmin)
admin.site.register(Booking, BookingAdmin)
