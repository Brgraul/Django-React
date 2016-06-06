from __future__ import unicode_literals

from django.db import models

# Create your models here.

#Products
class Service(models.Model):
    name = models.CharField(max_length = 100, blank = False, null = False)
    menu_link = models.CharField(max_length = 20, blank = False, null = False)
    url = models.CharField(max_length = 20, blank = False, null = False)
    headline = models.TextField(max_length=5000, default='Headline...')
    short_description = models.TextField(max_length=5000, default='Descripcion corta ...')
    long_description = models.TextField(max_length=5000, default='Descripcion larga ...')
    image = models.ImageField(upload_to='services_app',max_length=100)
    #Published on the web ( in service )
    published = models.BooleanField('Publicado', default = True)
