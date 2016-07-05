from django.contrib import admin
from .models import Message
# Register your models here.


class MessageAdmin(admin.ModelAdmin):
	list_display = ['__str__','person_email','person_name','message_subject', 'message_content', 'date_created']
	class Meta:
		model = Message


admin.site.register(Message, MessageAdmin)
