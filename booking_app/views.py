from django.shortcuts import render , redirect
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import View
from .forms import CheckoutForm

#Payment Imports
from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.contrib.sites.shortcuts import get_current_site
from django.conf import settings
from django.core.urlresolvers import reverse
from sermepa.forms import SermepaPaymentForm
from sermepa.signals import payment_was_successful, payment_was_error, signature_error
from sermepa.models import SermepaIdTPV

# Create your views here.
@csrf_exempt
def CheckoutPage(request):
    context = {
    'form':CheckoutForm
    }
    if request.method == "POST":
        print request.POST
        data = request.POST.get('data')
        print data

    return render(request, "booking_app/checkout.html", context)

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


def ProductPaymentForm(request, product_id, trans_type='0'):
    site = get_current_site(request)
    amount = int(5.50 * 100) # El precio es en centimos de euro

    merchant_parameters = {
        "Ds_Merchant_Titular": 'John Doe',
        "Ds_Merchant_MerchantData": 12345, # id del Pedido o Carrito, para identificarlo en el mensaje de vuelta
        "Ds_Merchant_MerchantName": 'ACME',
        "Ds_Merchant_ProductDescription": 'petardos',
        "Ds_Merchant_Amount": amount,
        "Ds_Merchant_Terminal": settings.SERMEPA_TERMINAL,
        "Ds_Merchant_MerchantCode": settings.SERMEPA_MERCHANT_CODE,
        "Ds_Merchant_Currency": settings.SERMEPA_CURRENCY,
        "Ds_Merchant_MerchantURL": "http://%s%s" % (settings.SERMEPA_SITE_DOMAIN, reverse('sermepa_ipn')),
        "Ds_Merchant_UrlOK": "http://%s%s" % (settings.SERMEPA_SITE_DOMAIN, reverse('end')),
        "Ds_Merchant_UrlKO": "http://%s%s" % (settings.SERMEPA_SITE_DOMAIN, reverse('end')),
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

    form = SermepaPaymentForm(initial=merchant_parameters)

    return HttpResponse(render_to_response('products_app/payment_form.html', {'form': form, 'debug': settings.DEBUG}))
