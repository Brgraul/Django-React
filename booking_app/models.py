from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User
from products_app.models import Product, ProductCategory

# Defines the customer profile
class UserCustomer(User):
    phone_number = models.IntegerField( null=True, blank = True )
    adress = models.CharField(max_length = 500, blank = False, null = False)
    city = models.CharField(max_length = 100, blank = False, null = False)
    zip_code = models.CharField( max_length = 5, null=True, blank = True )

    class Meta:
        verbose_name_plural='Clientes'

    def __str__(self):              # __unicode__ on Python 2
      return "%s %s" % (self.first_name, self.last_name)

class UserVeterian(User):
    phone_number = models.IntegerField( null=True, blank = True, verbose_name = 'Telefono')
    adress = models.CharField(max_length = 500, blank = False, null = False, verbose_name = 'Direccion')
    city = models.CharField(max_length = 100, blank = False, null = False, verbose_name = 'Ciudad')
    zip_code = models.CharField(max_length = 5, null=True, blank = True, verbose_name = 'Codigo Postal')

    class Meta:
       verbose_name_plural='Veterinarios'

    def __str__(self):              # __unicode__ on Python 2
      return "%s %s" % (self.first_name, self.last_name)


class Pet(models.Model):
    class Meta:
        verbose_name_plural='Mascotas'
    name = models.CharField(max_length = 100, blank = False, null = False, verbose_name = 'Nombre')
    species = models.CharField(max_length = 100, blank = False, null = False,verbose_name = 'Especie')
    breed = models.CharField(max_length = 100, blank = False, null = False, verbose_name = 'Raza')
    conditions = models.TextField(max_length=5000, verbose_name = 'Razon de la consulta')
    user_customer = models.ForeignKey('UserCustomer', null=True , blank = True, verbose_name = 'Dueno')
    birthday = models.DateField(auto_now=False, auto_now_add=False, blank = True, null = True, verbose_name = 'Fecha de Nacimiento')
    GENDER = (
       ('hembra_normal','Hembra Normal'),
       ('hembra_esterilizada','Hembra Esterilizada'),
       ('macho_normal','Macho Normal'),
       ('macho_esterilizado','Macho Esterilizado'),
    )
    gender = models.CharField(max_length=20, choices=GENDER, blank = True, null=True, verbose_name = 'Sexo' )

    def __str__(self):              # __unicode__ on Python 2
      return "%s %s" % (self.name, self.breed)

class Booking(models.Model):
    class Meta:
        verbose_name_plural='Reservas'
    created = models.DateTimeField(auto_now=False, auto_now_add=True, blank = False, null = False, verbose_name = 'Creado')
    updated = models.DateTimeField(auto_now=True, auto_now_add=False, blank = False, null = False, verbose_name = 'Actualizado')
    date_booking = models.DateTimeField(auto_now=False, auto_now_add=False, blank = False, null = False, verbose_name = 'Fecha de la Consulta')
    user_customer = models.ForeignKey('UserCustomer', null=True , blank = True, verbose_name = 'Cliente' )
    pet_customer = models.ForeignKey('Pet', null=True , blank = True, verbose_name = 'Mascota' )
    user_veterian = models.ForeignKey('UserVeterian', null=True , blank = True, verbose_name = 'Veterinario' )
    adress = models.CharField(max_length = 500, blank = False, null = False, verbose_name = 'Direccion')
    city = models.CharField(max_length = 100, blank = False, null = False, verbose_name = 'Ciudad')
    zip_code = models.CharField(max_length = 5, null=True, blank = True, verbose_name = 'Codigo Postal')
    products = models.ManyToManyField(Product)

    def __str__(self):              # __unicode__ on Python 2
      return "%s|%s" % (self.city, self.date_booking )
