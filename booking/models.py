from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Vet(models.Model):
    first_name = models.CharField(max_length=100, blank = False, null=True)
    last_name = models.CharField(max_length=100, blank = False, null=True)

    #Active ( in service )
    active = models.BooleanField('Publicar', default=True)

    #Rating, Description
    rating = models.IntegerField(default = 5, blank=False)
    description = models.TextField(max_length=5000, default='Escribe aqui la descripcion del Veterinario.')

    #Vet Profile Image
    
    #Vet Contact Details
