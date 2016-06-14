from django.shortcuts import render , redirect
from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate, login
from django.views import generic
from django.views.generic import View
from .forms import LoginForm, RegisterForm
# Create your views here.

#Registration form view
class RegisterFormView(View):
    form_class = RegisterForm
    template_name = 'booking_app/registration_form.html'

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
        print user.username
        if user is not None:

                if user.is_active:
                    login(request, user)
                    return redirect('index')

        return render(request, self.template_name,{'form': form})

#Login form view
class LoginFormView(View):
    form_class = LoginForm
    template_name = 'booking_app/login_form.html'

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
                print username , password
        user = authenticate(username=username, password=password)
        if user is not None:

                if user.is_active:
                    login(request, user)
                    return redirect('index')
        else:
            return redirect('login')

        return render(request, self.template_name,{'form': form})
