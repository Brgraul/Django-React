from django.contrib import admin

# Register your models here.
from django.forms import TextInput, Textarea
from django import forms
from .models import *
from django.db import models

#admin.site.register(UserVeterian)
#admin.site.register(UserCustomer)

"""
class BookingAdminInline(admin.TabularInline):
    model = Booking
    fields = ['date_booking','adress','city',]
    readonly_fields = ['date_booking','adress','city',]
    fk_name = "customer"
    """

class PetCustomerAdminInline(admin.TabularInline):
    model = Pet
    fk_name = "customer"

class PetBookingAdminInline(admin.TabularInline):
    model = Pet
    fk_name = "booking"

class CustomerAdminInline(admin.TabularInline):
    model = Customer

class CustomerAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'city', 'adress', 'phone_number')
    list_display_links = ('first_name', 'last_name')
    list_filter = ('first_name', 'last_name', 'id')
    inlines = [
        #BookingAdminInline,
        PetCustomerAdminInline,
    ]

class BookingAdmin(admin.ModelAdmin):
    model = Booking
    list_display = ('created', 'customer_email', 'date_booking', 'adress', 'city')
    fieldsets = (
        ('Datos de la Consulta', {
            'fields': ('date_booking', 'city', 'adress'),
            'classes': ('wide'),
            'description' : 'Consulta:',
        }),
        ('Datos del Cliente', {
            'fields': ('customer_first_name', 'customer_last_name', 'customer_email', 'customer_phone_number'),
            'classes': ('wide',),
            'description' : 'Cliente:',
        }),
    )
    formfield_overrides = {
        models.CharField: {'widget': TextInput(attrs={'size':'50'})},
        models.EmailField: {'widget': TextInput(attrs={'size':'50'})},
        models.TextField: {'widget': Textarea(attrs={'rows':2, 'cols':40})},
    }
    inlines = [
        #BookingAdminInline,
        PetBookingAdminInline,
    ]


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
