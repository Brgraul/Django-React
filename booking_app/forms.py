from django.contrib.auth import get_user_model
from django import forms

class SignupForm(forms.ModelForm):
    class Meta:
        model = get_user_model()
        fields = ['first_name', 'last_name']

    def signup(self, request, user):
        user.first_name = self.cleaned_data['first_name']
        user.last_name = self.cleaned_data['last_name']
        user.save()

#Checkout Form.
class CheckoutForm(forms.Form):
    #Step 1: Date
    date = forms.DateTimeField(required = True)
    #Step 2: Contact Info
    phone_number = forms.CharField(max_length=100, required = True)
    email = forms.EmailField(required=True)
    first_name = forms.CharField(max_length=100, required = True)
    second_name = forms.CharField(max_length=100, required = True)
    adress = forms.CharField(max_length=500, required = True)
    city = forms.CharField(max_length=50, required = True)
    zip_code = forms.CharField(max_length=5, required = True)
    #Step 3: Pets
    pet_name = forms.CharField(max_length=100, required = True)
    pet_birthday = forms.DateTimeField(required = True)
    pet_species = forms.CharField(max_length=100, required = False)
    GENDER = (
       ('hembra_normal','Hembra Normal'),
       ('hembra_esterilizada','Hembra Esterilizada'),
       ('macho_normal','Macho Normal'),
       ('macho_esterilizado','Macho Esterilizado'),
    )
    pet_gender = forms.ChoiceField(required = False, choices = GENDER)
    pet_breed = forms.CharField(max_length=100, required = False)
    #Step 3: Apointment
    booking_reason = forms.CharField(max_length=3000, required = False)
    accept_terms = forms.BooleanField()
    accept_charge = forms.BooleanField()
    #Step 4: Payment details
    payment_ok = forms.BooleanField()
