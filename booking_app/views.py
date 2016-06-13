from django.shortcuts import render , redirect
from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate, login
from django.views.generic import View
from .forms import UserForm
# Create your views here.

class UserFormView(View):
    form_class = UserForm
    template_name = 'registration_form.html'

#Display blank form
    def get(self, request):
        form = self.form_class(None)
        return render(request, self.template_name,{'form': form})
#Process form data
    def post(self, request):
        form = self.form_class(request.POST)

        if form.is_valid():

                user = form.save(commit=False)
                #Cleaned databases
                username = form.cleaned_data['username']
                password = form.cleaned_data['password']
                user.set_password(password)
                user.save()

        user = authenticate(username=username, password=password)

            if user is not None:

                if user.is_active:
                    login(request, user)
                    return redirect('eutanasia')

        return render(request, self.template_name,{'form': form})
