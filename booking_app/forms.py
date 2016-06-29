# -*- encoding: utf-8 -*-
from __future__ import unicode_literals
from django import forms
from django.conf import settings
from django.utils.safestring import mark_safe
from utils import redsys_generate_request

from django.contrib.auth import get_user_model
from django import forms

#Signup Form
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
    #Step 4: Apointment
    booking_reason = forms.CharField(max_length=3000, required = False)
    accept_terms = forms.BooleanField()
    accept_charge = forms.BooleanField()
    #Step 5: Payment details
    payment_ok = forms.BooleanField()


#PaymentForm. Redeclared form the sermepa module
class SermepaPaymentForm(forms.Form):
    Ds_SignatureVersion = forms.IntegerField(widget=forms.HiddenInput())
    Ds_MerchantParameters = forms.IntegerField(widget=forms.HiddenInput())
    Ds_Signature = forms.IntegerField(widget=forms.HiddenInput())

    def __init__(self, *args, **kwargs):
        merchant_parameters = kwargs.pop('merchant_parameters', None)
        super(SermepaPaymentForm, self).__init__(*args, **kwargs)

        if merchant_parameters:
            # Generate needed parameters using 256 signature Redsys method
            Ds_MerchantParameters, Ds_Signature = redsys_generate_request(merchant_parameters)

            # Parameters to send to RedSys
            self.initial['Ds_SignatureVersion'] = settings.SERMEPA_SIGNATURE_VERSION
            self.initial['Ds_MerchantParameters'] = Ds_MerchantParameters
            self.initial['Ds_Signature'] = Ds_Signature


    def render(self):
        return mark_safe(u"""<form id="tpv_form" action="%s" method="post">
            %s
            <input type="submit" name="submit" alt="%s" value="%s"/>
        </form>""" % (settings.SERMEPA_URL_PRO, self.as_p(), settings.SERMEPA_BUTTON_TEXT,
                      settings.SERMEPA_BUTTON_TEXT))

    def sandbox(self):
        return mark_safe(u"""<form id="tpv_form" action="%s" method="post">
            %s
            <input class="btn-cta-green" type="submit" name="submit" alt="%s" value="Confirmar y Pagar"/>
        </form>""" % (settings.SERMEPA_URL_TEST, self.as_p(), settings.SERMEPA_BUTTON_TEXT
                      ))
