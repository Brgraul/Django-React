from __future__ import unicode_literals

from django.db import models


def payment_ok(sender, **kwargs):
    '''sender es un objecto de clase SermepaResponse. Utiliza el campo Ds_MerchantData
    para asociarlo a tu Pedido o Carrito'''
    pedido = Pedido.objects.get(id=sender.Ds_MerchantData)
    pedido.estado = 'cobrado'
    pedido.Ds_AuthorisationCode = sender.Ds_AuthorisationCode #Guardar este valor en caso
    # de poder hacer devoluciones, es necesario.
    pedido.save()
    send_email_success(pedido)

def payment_ko(sender, **kwargs):
    pass

def sermepa_ipn_error(sender, **kwargs):
    pass

# Sermepa Asociacion
from sermepa.signals import payment_was_successful
from sermepa.signals import payment_was_error
from sermepa.signals import signature_error

payment_was_successful.connect(payment_ok)
payment_was_error.connect(payment_ko)
signature_error.connect(sermepa_ipn_error)


#Product Categories
class ProductCategory(models.Model):
    name = models.CharField(max_length = 100, blank = False, null = False)
    description = models.TextField(max_length=5000, default='Descripcion de la categoria de producto ...')

#Products
class Product(models.Model):
    name = models.CharField(max_length = 100, blank = False, null = False)
    description = models.TextField(max_length=5000, default='Descripcion del producto ...')
    category = models.ForeignKey(ProductCategory, on_delete = models.CASCADE)
    price = models.IntegerField(blank = False, null = False)

    #Published on the web ( in service )
    published = models.BooleanField('Publicado', default = True)
