from django.shortcuts import get_object_or_404, render
from . import models
from .forms import ContactForm
from django.shortcuts import redirect


# Create your views here.

def contacto(request):
	title = "Contacto:"
	form = ContactForm(request.POST or None)
	context = {
		'title' : title,
		'form': form
	}

	if form.is_valid():
		print request.POST
		instance = form.save(commit=False)
		instance.save()
		print instance.person_name
		context = {
			"title": "Gracias, en breve contactaremos contigo."
		}
		return redirect('/contacto')


	return render(request, 'contact_app/contact.html', context)
