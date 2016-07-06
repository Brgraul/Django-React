from .models import Message
from django import forms
from django.utils.translation import ugettext_lazy as _



class ContactForm(forms.ModelForm):
	class Meta:
		model = Message
		fields = ['person_name','person_email','message_subject','message_content']
		labels = {
            'person_name': _('Nombre:'),
            'person_email': _('Correo:'),
            'message_subject': _('Asunto:'),
            'message_content': _('Contenido del mensaje:'),
        }
        help_texts = {
            'person_name': _('Nombre'),
        }
        error_messages = {
            'person_name': {
				'required': 'Rellena este campo porfavor.'
            },
			'person_email': {
                'invalid': 'Porfavor introduce un email valido.',

			}
        }
        widgets = {
            'person_email' : forms.TextInput(attrs = {'placeholder': 'poker@gmail.com'}),
        }
