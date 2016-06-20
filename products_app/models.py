from __future__ import unicode_literals

from django.db import models

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
