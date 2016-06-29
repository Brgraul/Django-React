from django.shortcuts import render , redirect
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import View
from .forms import CheckoutForm, SermepaPaymentForm
from .models import Booking, Order, Customer
from datetime import datetime
#Payment Imports
from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.contrib.sites.shortcuts import get_current_site
from django.conf import settings
from django.core.urlresolvers import reverse
from .forms import SermepaPaymentForm
from sermepa.signals import payment_was_successful, payment_was_error, signature_error
from sermepa.models import SermepaIdTPV

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
            print 'Step 1: Creating the customer'
            #Customer
            customer = Customer()
            customer.first_name = data.__getitem__('data[first_name]')
            customer.last_name = data.__getitem__('data[second_name]')
            customer.city = data.__getitem__('data[city]')
            customer.adress = data.__getitem__('data[adress]')
            customer.save()
            print 'Step 1: Creating the booking'
            #Booking
            booking = Booking()
            #Bulding a Date Field
            #booking.date_booking = data.__getitem__(pet_birthday)
            booking.city = data.__getitem__('data[city]')
            booking.adress = data.__getitem__('data[adress]')
            booking.customer = customer
            print data.__getitem__('booking_date_django')
            booking_date = datetime.strptime(data.__getitem__('booking_date_django'), "%a, %d %b %Y %H:%M:%S %Z")
            booking.date_booking = booking_date
            booking.save()
            #Saving the order
            order = Order()
            order.status = 'pendiente'
            order.booking = booking
            order.save()
        elif step == 2:
            pet = Pet.create()
            pet.name = data.__getitem__(pet_name)
            pet.species = data.__getitem__(pet_species)
            pet.breed = data.__getitem__(pet_breed)
            pet.birthday = data.__getitem__(pet_birthday)
            pet.save()
            #Redifining Context with the New Data
            context = {
                'customer':customer,
                'booking':booking,
                'order':order,
            }
            return render_to_response('booking_app/payment.html', context)

    return render(request, "booking_app/checkout.html")

#Payment Views
#This associates and handles payment
from sermepa.signals import payment_was_successful
from sermepa.signals import payment_was_error
from sermepa.signals import signature_error

#Define Payment Lsiteners
def payment_ok(sender, **kwargs):
    '''sender es un objecto de clase SermepaResponse. Utiliza el campo Ds_MerchantData
    para asociarlo a tu Pedido o Carrito'''
    pedido = Pedido.objects.get(id=sender.Ds_MerchantData)
    pedido.estado = 'cobrado'
    pedido.Ds_AuthorisationCode = sender.Ds_AuthorisationCode #Guardar este valor en caso
    # de poder hacer devoluciones, es necesario.
    pedido.save()
    send_email_success(pedido)

def payment_ko(sender, **kwargs):
    pass

def sermepa_ipn_error(sender, **kwargs):
    pass

#Asociate Listeners
payment_was_successful.connect(payment_ok)
payment_was_error.connect(payment_ko)
signature_error.connect(sermepa_ipn_error)


@csrf_exempt
def PaymentPage(request):
    site = get_current_site(request)
    amount = int(5.50 * 100) # El precio es en centimos de euro
    trans_type = '0'
    merchant_parameters = {
        "Ds_Merchant_Titular": 'John Doe',
        "Ds_Merchant_MerchantData": 12345, # id del Pedido o Carrito, para identificarlo en el mensaje de vuelta
        "Ds_Merchant_MerchantName": 'Instavets',
        "Ds_Merchant_ProductDescription": 'Consultas',
        "Ds_Merchant_Amount": amount,
        "Ds_Merchant_Terminal": settings.SERMEPA_TERMINAL,
        "Ds_Merchant_MerchantCode": settings.SERMEPA_MERCHANT_CODE,
        "Ds_Merchant_Currency": settings.SERMEPA_CURRENCY,
        "Ds_Merchant_MerchantURL": "http:/%s%s" % (settings.SERMEPA_SITE_DOMAIN, reverse('sermepa_ipn')),
        "Ds_Merchant_UrlOK": "http://%s%s" % (settings.SERMEPA_SITE_DOMAIN, reverse('payment-confirm')),
        "Ds_Merchant_UrlKO": "http://%s%s" % (settings.SERMEPA_SITE_DOMAIN, reverse('payment-confirm')),
    }

    if trans_type == '0': #Compra puntual
        order = SermepaIdTPV.objects.new_idtpv() #Tiene que ser un numero unico cada vez
        merchant_parameters.update({
            "Ds_Merchant_Order": order,
            "Ds_Merchant_TransactionType": trans_type,
        })
    elif trans_type == 'L': #Compra recurrente por fichero. Cobro inicial
        order = SermepaIdTPV.objects.new_idtpv() #Tiene que ser un numero unico cada vez
        merchant_parameters.update({
            "Ds_Merchant_Order": order,
            "Ds_Merchant_TransactionType": trans_type,
        })
    elif trans_type == 'M': #Compra recurrente por fichero. Cobros sucesivos
        # order = suscripcion.idtpv #Primer idtpv, 10 digitos
        order = ''
        merchant_parameters.update({
            "Ds_Merchant_Order": order,
            "Ds_Merchant_TransactionType": trans_type,
        })
    elif trans_type == '0': #Compra recurrente por Referencia. Cobro inicial
        order = 'REQUIRED'
        merchant_parameters.update({
            "Ds_Merchant_Order": order,
            "Ds_Merchant_TransactionType": trans_type,
        })
    elif trans_type == '0': #Compra recurrente por Referencia. Cobros sucesivos
        # order = suscripcion.idreferencia #Primer idtpv, 10 digitos
        order = ''
        merchant_parameters.update({
            "Ds_Merchant_Order": order,
            "Ds_Merchant_TransactionType": trans_type,
        })
    elif trans_type == '3': #Devolucion
        # order = suscripcion.idreferencia #Primer idtpv, 10 digitos
        order = ''
        merchant_parameters.update({
            "Ds_Merchant_Order": order,
            "Ds_Merchant_TransactionType": trans_type,
            #"Ds_Merchant_AuthorisationCode": pedido.Ds_AuthorisationCode, #Este valor sale
            "Ds_Merchant_AuthorisationCode": '',
            # de la SermepaResponse obtenida del cobro que se quiere devolver.
        })

    print 'MERCHANT PARAMETERS:'
    print merchant_parameters

    form = SermepaPaymentForm(merchant_parameters=merchant_parameters)

    return HttpResponse(render_to_response('booking_app/payment.html', {'form': form, 'debug': settings.DEBUG}))


def PaymentConfirmPage(sender, **kwargs):
    order = Booking.objects.get(id=sender.Ds_MerchantData)
    order.status = 'pagado'
    pedido.Ds_AuthorisationCode = sender.Ds_AuthorisationCode #Guardar este valor en caso
    # de poder hacer devoluciones, es necesario.
    pedido.save()
    send_email_success(pedido)
    print sender
    return HttpResponse('confirmacion de pago page')
