# -*- coding: utf-8 -*-
from django.shortcuts import render , redirect
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import View
from .forms import InstavetsSermepaPaymentForm
from .models import Booking, Order, Customer, Pet
from datetime import datetime
#Payment Imports
from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.template.loader import render_to_string, get_template
from django.template import Context
from django.core.mail import EmailMessage
from django.conf import settings
from django.core.urlresolvers import reverse
from sermepa.signals import payment_was_successful, payment_was_error, signature_error
from sermepa.models import SermepaIdTPV

#JSON
import json
from django.http import JsonResponse
from django.core import serializers

#Site
from django.contrib.sites.models import Site

import requests
from django.core.files import File

#Functions
def SendEmail(context):
    customer = context['customer']
    subject = "Tu consulta en Instavets"
    to=[customer.email]
    from_email = 'info@instavets.com'
    message = get_template('../templates/email_templates/email_customer.html').render(context)
    msg = EmailMessage(subject, message, to=to, from_email=from_email)
    msg.content_subtype = 'html'
    msg.send()

# Create your views here.
@csrf_exempt
def CheckoutPage(request):
    if request.method == "POST":
        print request.POST
        data = request.POST
        #1. Get data
        step = data.__getitem__('step')
        print step
        if step == '1':
            print 'Step 1: Creating the customer..'
            #Customer
            customer = Customer()
            customer.first_name = data.__getitem__('data[first_name]')
            customer.last_name = data.__getitem__('data[second_name]')
            customer.city = data.__getitem__('data[city]')
            customer.adress = data.__getitem__('data[adress]')
            customer.phone_number = data.__getitem__('data[phone_number]')
            customer.email = data.__getitem__('data[email]')
            customer.save()
            print 'Step 2: Creating the booking..'
            #Booking
            booking = Booking()
            booking.city = data.__getitem__('data[city]')
            booking.adress = data.__getitem__('data[adress]')
            booking.customer = customer
            booking.date_booking = datetime.strptime(data.__getitem__('booking_date_django'), "%a, %d %b %Y %H:%M:%S %Z")
            booking.customer_first_name = data.__getitem__('data[first_name]')
            booking.customer_last_name = data.__getitem__('data[second_name]')
            booking.customer_email = data.__getitem__('data[email]')
            booking.customer_phone_number = data.__getitem__('data[phone_number]')
            booking.save()
            #Saving the order
            print 'Creating the order'
            order = Order()
            order.status = 'pendiente'
            order.booking = booking
            order.customer = customer
            order.save()
            #Generating Response
            request.session['customer_id'] = customer.pk
            request.session['order_id'] = order.pk
            request.session['booking_id'] = booking.pk
            response = HttpResponse('Cookie Set')
            #Writting the cookies
            return response
        elif step == '2':
            pet = Pet()
            customer_id = request.session.get('customer_id')
            customer = get_object_or_404(Customer, pk=customer_id)
            pet.name = data.__getitem__('data[pet_name]')
            pet.gender = data.__getitem__('data[pet_gender]')
            pet.species = data.__getitem__('data[pet_species]')
            pet.breed = data.__getitem__('data[pet_breed]')
            pet.age = data.__getitem__('data[pet_birthday]')
            pet.conditions = data.__getitem__('data[pet_conditions]')
            pet.customer = customer
            pet.save()
            request.session['pet_id'] = pet.pk
            response = HttpResponse('Cookie Set')
            return response
            print 'Pet Saved ...'
            #Redifining Context with the New Data

    return render(request, "booking_app/checkout.html")


@csrf_exempt
def PaymentPage(request):
    #El precio de consulta básica
    amount = int(39 * 100) # El precio es en centimos de euro
    trans_type = '0'
    #Getting Order Info
    customer_id = request.session.get('customer_id')
    booking_id = request.session.get('booking_id')
    order_id = request.session.get('order_id')
    pet_id = request.session.get('pet_id')
    customer = get_object_or_404(Customer, pk=customer_id)
    booking = get_object_or_404(Booking, pk=booking_id)
    order = get_object_or_404(Order, pk=order_id)
    pet = get_object_or_404(Pet, pk=pet_id)
    order.ref_code = SermepaIdTPV.objects.new_idtpv()
    order.save()
    #Getiing Site Domain
    merchant_parameters = {
        "Ds_Merchant_Titular": customer.first_name + customer.last_name ,
        "Ds_Merchant_MerchantData": order.id, # id del Pedido o Carrito, para identificarlo en el mensaje de vuelta
        "Ds_Merchant_MerchantName": 'Instavets',
        "Ds_Merchant_ProductDescription": 'Consulta a Domicilio',
        "Ds_Merchant_Amount": amount,
        "Ds_Merchant_Terminal": settings.SERMEPA_TERMINAL,
        "Ds_Merchant_MerchantCode": settings.SERMEPA_MERCHANT_CODE,
        "Ds_Merchant_Currency": settings.SERMEPA_CURRENCY,
        "Ds_Merchant_MerchantURL": "http://%s%s" % (request.get_host(), reverse('sermepa_ipn')),
        "Ds_Merchant_UrlOK": "http://%s%s" % (request.get_host(), reverse('payment-confirm')),
        "Ds_Merchant_UrlKO": "http://%s%s" % (request.get_host(), reverse('payment-error')),
    }
    print 'order:'
    print order
    if trans_type == '0': #Compra puntual
        merchant_parameters.update({
            "Ds_Merchant_Order": order.ref_code,
            "Ds_Merchant_TransactionType": trans_type,
        })
    elif trans_type == 'L': #Compra recurrente por fichero. Cobro inicial
        merchant_parameters.update({
            "Ds_Merchant_Order": order.ref_code,
            "Ds_Merchant_TransactionType": trans_type,
        })
    elif trans_type == 'M': #Compra recurrente por fichero. Cobros sucesivos
        # order = suscripcion.idtpv #Primer idtpv, 10 digitos
        order.ref_code = ''
        merchant_parameters.update({
            "Ds_Merchant_Order": order.ref_code,
            "Ds_Merchant_TransactionType": trans_type,
        })
    elif trans_type == '0': #Compra recurrente por Referencia. Cobro inicial
        order.ref_code = 'REQUIRED'
        merchant_parameters.update({
            "Ds_Merchant_Order": order.ref_code,
            "Ds_Merchant_TransactionType": trans_type,
        })
    elif trans_type == '0': #Compra recurrente por Referencia. Cobros sucesivos
        # order = suscripcion.idreferencia #Primer idtpv, 10 digitos
        order.ref_code = ''
        merchant_parameters.update({
            "Ds_Merchant_Order": order.ref_code,
            "Ds_Merchant_TransactionType": trans_type,
        })
    elif trans_type == '3': #Devolucion
        # order = suscripcion.idreferencia #Primer idtpv, 10 digitos
        order = ''
        merchant_parameters.update({
            "Ds_Merchant_Order": order.ref_code,
            "Ds_Merchant_TransactionType": trans_type,
            #"Ds_Merchant_AuthorisationCode": pedido.Ds_AuthorisationCode, #Este valor sale
            "Ds_Merchant_AuthorisationCode": '',
            # de la SermepaResponse obtenida del cobro que se quiere devolver.
        })

    form = InstavetsSermepaPaymentForm(merchant_parameters=merchant_parameters)
    context = {
        'customer':customer,
        'booking':booking,
        'order':order,
        'pet': pet,
        'form': form,
        'debug': settings.DEBUG,
    }


    return HttpResponse(render_to_response('booking_app/payment.html', context))
#Email Sending

'''def email_customer_txt(request):
    customer = get_object_or_404(Customer, pk=customer_id)
    booking = get_object_or_404(Booking, pk=booking_id)
    order = get_object_or_404(Order, pk=order_id)
    pet = get_object_or_404(Pet,customer=customer.id )
    subject = "I am a text email"
    to=[customer.email]
    context = {
        'customer': customer,
        'order': order,
        'booking': booking,
        'pet': pet,
    }
    message = render_to_string('../templates/email_templates/email_customer.txt', context)

    EmailMessage(subject, message, to=to).send()
    return ()

def email_customer_html(request):
    customer = get_object_or_404(Customer, pk=customer_id)
    booking = get_object_or_404(Booking, pk=booking_id)
    order = get_object_or_404(Order, pk=order_id)
    pet = get_object_or_404(Pet,customer=customer.id )
    subject = "I am a text email"
    to=[customer.email]
    from_email = 'info@instavets.com'
    context = {
        'customer': customer,
        'order': order,
        'booking': booking,
        'pet': pet,
    }
    message = get_template('../templates/email_templates/email_customer.html').render(Context(context))
    msg = EmailMessage(subject, message, to=to, from_email=from_email)
    msg.content_subtype = 'html'
    return () '''



#Payment Confirm Page
def PaymentConfirmPage(request):
    customer_id = request.session.get('customer_id')
    booking_id = request.session.get('booking_id')
    order_id = request.session.get('order_id')
    customer = get_object_or_404(Customer, pk=customer_id)
    booking = get_object_or_404(Booking, pk=booking_id)
    order = get_object_or_404(Order, pk=order_id)
    pet = get_object_or_404(Pet,customer=customer.id )
    context = {
        'customer': customer,
        'order': order,
        'booking': booking,
        'pet': pet,
    }
    SendEmail(context)
    return render(request, 'booking_app/payment_confirm.html', context )


#Here maek things if payment is not complete
#Payment Confirm Page
def PaymentErrorPage(request):
    customer_id = request.session.get('customer_id')
    booking_id = request.session.get('booking_id')
    order_id = request.session.get('order_id')
    customer = get_object_or_404(Customer, pk=customer_id)
    booking = get_object_or_404(Booking, pk=booking_id)
    order = get_object_or_404(Order, pk=order_id)
    pet = get_object_or_404(Pet,customer=customer.id )
    subject = "I am a text email"
    to=[customer.email]
    from_email = 'info@instavets.com'
    context = {
        'customer': customer,
        'order': order,
        'booking': booking,
        'pet': pet,
    }
    message = get_template('../templates/email_templates/email_customer_error.html').render(Context(context))
    msg = EmailMessage(subject, message, to=to, from_email=from_email)
    msg.content_subtype = 'html'
    msg.send()
    return render(request, 'booking_app/payment_error.html', context )



#----------------------------Cookies--------------------------------------------
#Test If Cookies can be set on user browser
#Returns True of False
@csrf_exempt
def CookieTestSet(request):
    if request.method == "POST":
        request.session.set_test_cookie()
        cookies_set = {'CookieSet':True}
        return JsonResponse(cookies_set)

#Returns True if coookies worked and false othewise
@csrf_exempt
def CookieTestVerify(request):
    if request.method == "POST":
        cookie_worked = {'CookieWorked': request.session.test_cookie_worked()}
        print cookie_worked
        return JsonResponse(cookie_worked)

#Check if user already made an order
@csrf_exempt
def CookieOrderIsSet(request):
    if request.method == "GET":
        if 'order_id' in request.session:
            order_isset = {'OrderIsSet': 'True'}
        else:
            order_isset = {'OrderIsSet': 'False'}
        print JsonResponse(order_isset)
        return JsonResponse(order_isset)

#Check if user has registered any pet
@csrf_exempt
def CookiePetIsSet(request):
    if request.method == "GET":
        if 'pet_id' in request.session:
            pet_isset = {'PetIsSet': 'True'}
        else:
            order_isset = {'PetIsSet': 'False'}
        print JsonResponse(pet_isset)
        return JsonResponse(pet_isset)

#Retrieves the order cookie
@csrf_exempt
def CookieOrderGet(request):
    if request.method == "GET":
        print 'Cookie Order Get'
        if 'order_id' in request.session:
            order_id = request.session.get('order_id')
            order = get_object_or_404(Order, pk=order_id)
            order_json = serializers.serialize("json", [order,])
            order_json = json.loads(order_json)
            order_json = json.dumps(order_json[0])
            print order_json
            return JsonResponse(order_json, safe=False)
        else:
            return JsonResponse({'order': 'false'})

#Retrieves the pet cookie
@csrf_exempt
def CookiePetGet(request):
    if request.method == "GET":
        print 'Cookie Pet Get'
        if request.session.get('pet_id'):
            pet_id = request.session.get('pet_id')
            pet = get_object_or_404(Pet, pk=pet_id)
            pet_json = serializers.serialize("json", [order,])
            pet_json = json.loads(pet_json)
            pet_json = json.dumps(pet_json[0])
            print pet_json
            return JsonResponse(pet_json, safe=False)
        else:
            return JsonResponse({'pet_json': 'false'})

@csrf_exempt
def CookieCustomerGet(request):
    if request.method == "GET":
        print 'Cookie Order Get'
        if request.session.get('order_id'):
            order_id = request.session.get('order_id')
            order = get_object_or_404(Order, pk=order_id)
            order_json = serializers.serialize("json", [order,])
            order_json = json.loads(order_json)
            order_json = json.dumps(order_json[0])
            print order_json
            return JsonResponse(order_json, safe=False)
        else:
            return JsonResponse({'order_json': 'false'})
