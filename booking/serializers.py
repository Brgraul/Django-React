from rest_framework import serializers
from .models import Vet


#Serializing the Booking model
class VetSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Vet
        fields = ('id',
        	'first_name',
        	'last_name',
        	'active',
        	'rating',
        	'description',
        	)
