from rest_framework import serializers
from .models import Vet


#Serializing the Booking model
class VetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vet
