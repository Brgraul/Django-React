from __future__ import unicode_literals
from django.db import models

# Create your models here.


class Message(models.Model):
	person_name = models.CharField(max_length=40, null=False, blank=False)
	person_email = models.EmailField(max_length=40, null=False, blank=False)
	message_subject = models.CharField(max_length=40, null=False, blank=False)
	message_content = models.TextField(max_length=500, null=False, blank=False)
	date_created = models.DateTimeField(auto_now=False, auto_now_add=True,)

	def __str__(self):
		return self.message_subject
