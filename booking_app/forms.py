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

class CheckoutForm(forms.Form):
    phone_number = forms.CharField(max_length='100', required = True)
    email = forms.EmailField(required = True)
    first_name = forms.CharField(max_length ='100', required = True)
    second_name = forms.CharField(max_length ='100', required = True)
    adress = forms.CharField(max_length ='500', required = True)
    city = forms.CharField(max_length ='50', required = True)
    zip_code = forms.CharField(max_length ='5', required = True)
