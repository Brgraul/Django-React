var React = require('react');
var ReactDOM = require('react-dom');
var forms = require('newforms')
var BootstrapForm = require('newforms-bootstrap')
var Tether = require('react-tether');

/* We are selecting the step of the process by means of the id, and in the case of the 3rd step
we took advantage of the id_nesting */

/* Forms Locale*/
forms.addLocale('es', {
  b: 'ene._feb._mar_abr._may_jun_jul._ago_sept._oct._nov._dec.'.split('_')
, B: 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_')
, D: 'lunes_martes_miercoles_juesves_viernes_sabado_domingo'.split('_')
, DATE_INPUT_FORMATS: [
    '%d/%m/%Y', '%d/%m/%y'
  , '%d %b %Y', '%d %b %y'
  , '%d %B %Y', '%d %B %y',
  , '%m/%d/%Y',
  ]
, DATETIME_INPUT_FORMATS: [
    '%d/%m/%Y %H:%M:%S'
  , '%d/%m/%Y %H:%M'
  , '%D, %B %d , %H'
  , '%d/%m/%Y'
  , '%m/%d/%Y'
  , '%Y/%m/%d'
  , '%H:%M'
  ]
})

forms.setDefaultLocale('es');

/* Header */
var Header = React.createClass({
  render: function() {
      return  <div class="header-booking">
              <div class="container">
              <div class="row">
                <div class="col-md-3">
                <img class="img-responsive checkout-logo" alt="File logo" src='/static/images/index/logo-y-nombre.png'/>
                </div>
                <div class="col-md-5 col-md-offset-2">
                <div class="checkout-col">
                  <i class="fa fa-user fa-2x checkout-icon" aria-hidden="true"></i>
                  <p class="checkout-text" >1.Contacto</p>
                </div>
                <div class="checkout-col">
                  <i class="fa fa-long-arrow-right fa-2x checkout-icon arrow" aria-hidden="true" id={this.props.stepid}></i>
                </div>
                <div class="checkout-col">
                  <i class="fa fa-paw fa-2x checkout-icon" aria-hidden="true" id={this.props.stepid}></i>
                  <p class="checkout-text" id={this.props.stepid}>2.Mascota</p>
                </div>
                <div class="checkout-col select">
                  <i class="fa fa-long-arrow-right fa-2x checkout-icon arrow" aria-hidden="true" id={this.props.stepid}></i>
                </div>
                <div class="checkout-col select">
                  <i class="fa fa-credit-card fa-2x checkout-icon" aria-hidden="true" id={this.props.stepid}></i>
                  <p class="checkout-text" id={this.props.stepid}>3.Pago</p>
                  </div>
                  </div>
                  </div>
              </div>
            </div>
  }
})

var BookingForm = forms.Form.extend({
  booking_date: forms.DateTimeField({label: 'Fecha de la cita:', requiered: true, custom: 'readonly', requiered: true, errorMessages: {required:'Rellena este campo porfavor.'}, format: '%m/%d/%Y'}),
  booking_hour: forms.DateTimeField({label:'Hora de la cita:', custom: 'readonly', requiered: true, errorMessages: {required:'Rellena éste campo porfavor.'}, format: '%H:%M',initial: 'prototype'}),
  phone_number: forms.CharField({ label: 'Número de teléfono:', requiered: true, errorMessages: {required:'Rellena éste campo porfavor.'}}),
  email: forms.EmailField({label: 'Email:', requiered: true, errorMessages: {invalid: 'Porfavor introduce un email válido.', required:'Rellena éste campo porfavor.'}}),
  first_name: forms.CharField({label: 'Nombre:', requiered: true, errorMessages: {required:'Rellena éste campo porfavor.'}}),
  second_name: forms.CharField({label: 'Apellido:', requiered: true, errorMessages: {required:'Rellena éste campo porfavor.'}}),
  adress: forms.CharField({label: 'Dirección:', requiered: true, errorMessages: {required:'Rellena éste campo porfavor.'}}),
  city: forms.CharField({label: 'Ciudad:', requiered: true, errorMessages: {required:'Rellena éste campo porfavor.'}}),
  acceptTerms: forms.BooleanField({label: 'Acepto los términos de usuario:', required: true, errorMessages: {required:'Es necesario aceptar los términos de usuario para seguir con el proceso.'}}),
})

var SPECIES = [
  ['Perro','Perro'],
  ['Gato','Gato'],
  ['Otro','Otro']
]
var GENDER = [
  ['macho_normal','Macho Normal'],
  ['macho_esterilizado','Macho Esterilizado'],
  ['hembra_normal','Hembra Normal'],
  ['hembra_esterilizada','Hembra Esterilizada'],
]

var NewPetForm = forms.Form.extend({
  pet_name: forms.CharField({label: 'Nombre de la mascota:', required: true, errorMessages: {required:'Rellena éste campo porfavor.'}}),
  pet_birthday: forms.CharField({label: 'Edad (años):', required: true, errorMessages: {required:'Rellena éste campo porfavor.'}}),
  pet_species: forms.ChoiceField({initial: 'Perro', required: true, label: 'Especie:', choices: SPECIES, errorMessages: {required:'Rellena éste campo porfavor.'}}),
  pet_gender: forms.ChoiceField({initial: 'macho_normal',required: true, choices: GENDER, label: 'Sexo de la mascota:', errorMessages: {required:'Selecciona una de las opciones porfavor.'}}),
  pet_breed: forms.CharField({label: 'Raza:', required: true, errorMessages: {required:'Selecciona una de las opciones porfavor.'}}),
  pet_conditions: forms.CharField({label: '¿Qué le sucede?:', required: false, widget: forms.Textarea})
})

//Loads the booking form
var Booking = React.createClass({
  getInitialState: function(){
    return{
      order : 'false',
      pato: 'pato',
      source: document.location.origin + '/api/cookies/cookie_order_get/',
    }
  },
  render: function() {
    console.log('Order:')
    console.log(this.state.order);
    if (!((this.state.order == 'false') || (this.state.order === undefined))){
      console.log('order in if');
      console.log(this.state.order);
      var bookingForm = new BookingForm({initial: {
        booking_date:this.state.order.customer.booking_date,
        booking_hour:this.state.order.customer.booking_hour,
        phone_number:this.state.order.customer.phone_number,
        email:this.state.order.customer.email,
        first_name: this.state.order.customer.first_name,
        second_name: this.state.order.customer.second_name,
        adress: this.state.order.customer.adress,
        city: this.state.order.customer.city,
        acceptTerms: this.state.order.customer.acceptTerms,
      }, autoId: false});
    }
    else{
      var bookingForm = new BookingForm({onChange:this._onFormChange});
    }
    return <div class="col-md-7 checkout-form-container">
              <p class="form-title" >Reserve su cita</p>
              <p class="form-sub" >Facilítenos alguna información básica porfavor</p>
                <form onSubmit={this._onSubmit} onChange={this._onFormChange}>
                <forms.RenderForm form={bookingForm} component="ul"
                rowComponent="li"
                ref="bookingForm">
                  <BootstrapForm />
                </forms.RenderForm>
                <button class="btn-cta-green">Guardar y continuar</button>
              </form>
            </div>
  },
  renderDateSelectWidget: function(){
    $.datetimepicker.setLocale('es');
    $('#id_booking_date').datetimepicker({
      timepicker: false,
      minDate: '0', //yesterday is minimum date(for today use 0 or -1970/01/01)
      format:'m/d/Y',
      lang:'es'
    });
    $('#id_booking_hour').datetimepicker({
      datepicker: false,
      format:'H:i',
      lang:'es',
      allowTimes:[ '08:00','08:15','08:30','08:45', '09:00','09:15','09:30','9:45','10:00','10:15','10:30','10:45',
      '11:00','11:15','11:30','11:45', '12:00','12:15','12:30','12:45', '13:00','13:15','13:30','13:45',
      '14:00','14:15','14:30','14:45', '15:00','15:15','15:30','15:45', '16:00','16:15','16:30','16:45'],
    });
  },
  componentDidMount: function() {
    this.renderDateSelectWidget();
    this.serverRequest = $.get(this.state.source, function (result) {
      order = JSON.parse(result)
      this.setState({
        order: order,
      });
    }.bind(this));
  },
  _onFormChange: function() {
    this.forceUpdate()
  },
  componentWillUnmount: function() {
    this.serverRequest.abort();
  },
  onSignup: function(cleanedData) {
    console.log('Booking On SignUp')
    var booking_date_django = this.props.dateDjangoDefault(cleanedData.booking_date, cleanedData.booking_hour)
    var url_checkout = window.location.href;
    $.ajax({
         url : url_checkout,
         type : "POST",
         data : { step: this.props.step, data : cleanedData, booking_date_django: booking_date_django }, // data sent with the post request
         success : function(json) {
           console.log('json booking sent and success')
         },
         error : function(xhr,errmsg,err) {
             $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                 " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
             console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
         }
     });
  },
  propTypes: {
    onSignup: React.PropTypes.func.isRequired
  },
  onFormChange: function(){
    var form = this.refs.bookingForm.getForm()
    this.props.updateContactFormParams(form.cleanedData);
  },
  _onSubmit: function(e){
    e.preventDefault()
    var form = this.refs.bookingForm.getForm()
    var isValid = form.validate()
    console.log('isValid')
    if (isValid) {
      this.onSignup(form.cleanedData)
      this.props.updateContactFormParams(form.cleanedData);
      this.props.nextStep()
    }
  },
})

/* Renders the pet form */
var NewPet = React.createClass({
  render: function() {
    return <div class="col-md-7 checkout-form-container">
              <p class="form-title" >Registre a su mascota</p>
              <p class="form-sub" >Nos preocupamos por su amigo peludo</p>
              <form id = "petform" onSubmit={this._onSubmit} onChange={this.onFormChange}>
              <forms.RenderForm form={NewPetForm} ref="newPetForm">
                <BootstrapForm form={NewPetForm} />
              </forms.RenderForm>
              <button class="btn-cta-green">Guardar y continuar</button>
              </form>
            </div>
  },
  onSignup: function(cleanedData) {
    var url_checkout = window.location.href;
    var url_payment = document.location.origin + '/payment/';
    $.ajax({
         url : url_checkout, // the endpoint
         type : "POST", // http method
         data : { data : cleanedData, step: this.props.step }, // data sent with the post request

         // handle a successful response
         success : function(json) {
             $('#post-text').val(''); // remove the value from the input
             window.location.replace(url_payment);
          //   console.log(json); // log the returned json to the console
             console.log("success"); // another sanity check
         },

         // handle a non-successful response
         error : function(xhr,errmsg,err) {
             $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                 " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
             console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
         }
     });
  },
  propTypes: {
    onSignup: React.PropTypes.func.isRequired
  },
  _onSubmit: function(e){
    e.preventDefault()
    var form = this.refs.newPetForm.getForm()
    var isValid = form.validate()
    if (isValid) {
      this.props.updatePetFormParams(form.cleanedData);
      this.onSignup(form.cleanedData)
    }
  },
})

/* Shows the status of the payment process */
var ProgressColumn = React.createClass({
  render: function(){
    return <div class="col-md-3 col-progress col-md-offset-1">
            <h3>Resumen:</h3>
            <h4 class="title">Datos de la cita</h4>
            <h4>{this.props.date} en {this.props.city}</h4>
            <h4 class="title">Contacto</h4>
            <h4>{this.props.email}</h4>
            <h4>{this.props.phone_number}</h4>
            <h4 class="title">Mascota</h4>
            <h4>{this.props.pet_name}</h4>
            <h4>{this.props.pet_breed}</h4>
            <h4 class="title">Pago</h4>
            <h4>{this.props.payment_status}</h4>
          </div>
  }
})

/* PARENT TO ALL THE ELEMENTS OF THE APP*/
var CheckoutContainer = React.createClass({
	getInitialState: function() {
    //window.Perf = Perf;
    //Perf.start()
    this.cookieTestSet();
    this.cookieTestVerify();
		return {
      loaded: false,
      step: 1,
      step_id: 'step1',
      //Step 1
      city: ' ',
      acceptTerms: 'False',
      booking_date: 'Incompleto',
      phone_number: 'Incompleto',
      email: '',
      first_name: 'Nombre',
      second_name: 'Apellidos',
      adress: 'Dirección',
      //Step 2
      pet_name : 'Incompleto',
      pet_birthday : 'Fecha nacimiento mascota',
      pet_species : 'Gato',
      pet_gender : 'Hembra normal',
      pet_breed : '',
      pet_conditions : '',
      payment_status: 'Incompleto',
      cookies_enabled: false,
      //api
      url_order_get: 'http://localhost:8000/api/cookies/cookie_order_get/',
		}
	},
  //Set Test Cookie
  cookieTestSet: function(){
    var url_cookie_test_set = document.location.origin + '/api/cookies/cookie_test_set/';
    $.ajax({
         url : url_cookie_test_set, // the endpoint
         type : "POST", // http method
         // handle a successful response
         success : function(data) {
             console.log(data);
         },
         // handle a non-successful response
         error : function(xhr,errmsg,err) {
             $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                 " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
             console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
         }
     });
  },
  cookieTestVerify: function(){
    var url_cookie_test_verify = document.location.origin + '/api/cookies/cookie_test_verify/';
    $.ajax({
         url : url_cookie_test_verify , // the endpoint
         type : "POST", // http method
         // handle a successful response
         success : function(data) {
             console.log(data);
         },
         // handle a non-successful response
         error : function(xhr,errmsg,err) {
             $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                 " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
             console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
         }
     });
  },
   cookiePetIsSet: function(){
     var url_cookie_pet_isset = document.location.origin + '/api/cookies/cookie_pet_isset/';
     $.ajax({
          url : url_cookie_pet_isset, // the endpoint
          type : "GET", // http method
          // handle a successful response
          success : function(data) {
              console.log(data);
              console.log(data.PetIsSet);
              return data.PetIsSet;
          },
          // handle a non-successful response
          error : function(xhr,errmsg,err) {
              $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                  " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
              console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
          }
      });
    },
   cookieOrderGet: function(){
     var url = document.location.origin + '/api/cookies/cookie_order_get/';
     $.ajax({
          url : url, // the endpoint
          type : "GET", // http method
          // handle a successful response
          success : function(data) {
              data = JSON.parse(data);
              console.log('data:');
              console.log(data);
              console.log(data.model);
              console.log(data.fields);

              return data
          },
          // handle a non-successful response
          error : function(xhr,errmsg,err) {
              $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                  " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
              console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
          }
      });
   },
   CookiePetGet: function(){
     var url = document.location.origin + '/api/cookies/cookie_pet_get/';
     $.ajax({
          url : url, // the endpoint
          type : "GET", // http method
          // handle a successful response
          success : function(data) {
              console.log(data);
          },
          // handle a non-successful response
          error : function(xhr,errmsg,err) {
              $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                  " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
              console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
          }
      });
   },
  dateStringFormat: function(date, hour){
    //Getting Time
    var minutes = hour.getMinutes();
    var hours = hour.getHours();
    var month = date.getUTCMonth();
    //day of the week(0-6)
    var day = date.getUTCDay();
    //day of the moth(0-30)
    var month_day = date.getDate();
    //Building the String
    var days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
    var months = ['Ene', 'Feb', 'Marzo', 'Abr', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Sept', 'Oct', 'Nov', 'Dic'];
    if ((String(minutes)).length == 1){
      minutes = '0' + minutes
    }
    if ((String(hours)).length == 1){
      hours = '0' + hours
    }
    var date_string = days[day] + ', '  + month_day + ' de ' +  months[month] + ' a las ' + hours + ':' + minutes;
    return date_string;
  },
  //Converts UNIX timestamp to date format for progress bar
  //Problem ... it gets it with two hour delay ...dont know why ..
  dateDjangoDefault: function(date, hour){
    //Getting Time
    var minutes = hour.getMinutes();
    //2 hours added for later conversion to UTC withut changes
    var hours = hour.getHours() + 2;
    var month = date.getUTCMonth();
    var year = date.getFullYear();
    var day = date.getDate();
    var seconds = 0;
    var milliseconds = 0;
    var date_django = new Date(year, month, day, hours, minutes, seconds, milliseconds);
    //Needs to be converted to UTC because of django format
    var date_django = date_django.toUTCString();
    return date_django;
  },
  // Updates ProgresColumnParams
  updateContactFormParams: function(form_params){
    var date_string = this.dateStringFormat(form_params.booking_date, form_params.booking_hour)
    this.setState({
      city : form_params.city,
      acceptTerms: form_params.acceptTerms,
      booking_date: date_string,
      phone_number: form_params.phone_number,
      email : form_params.email,
      first_name : form_params.first_name,
      second_name : form_params.second_name,
      adress : form_params.adress,
    })
  },
  // Updates Pet Form Parameters
  updatePetFormParams: function(form_params){
    this.setState({
      pet_name : form_params.pet_name,
      pet_birthday : form_params.pet_birthday,
      pet_species : form_params.pet_species,
      pet_gender : form_params.pet_gender,
      pet_breed : form_params.pet_breed,
      pet_conditions : form_params.pet_condition
    })
  },
  // Increases the state counter in 1
  nextStep: function() {
    this.setState({
      step : this.state.step + 1 ,
      step_id : 'step' + this.state.step
    })
  },
  //Decreases the state counter in 1
  previousStep: function() {
    this.setState({
      step : this.state.step - 1 ,
      step_id : 'step' + this.state.step ,
    })
  },
  render: function() {
		switch (this.state.step) {
			case 1:
				return  <div class="container">
                    <Header stepid={this.state.step_id}/>
                      <div class="container">
                        <div class="row">
                            <Booking
                              cookieOrderGet={this.cookieOrderGet}
                              nextStep={this.nextStep}
                              updateContactFormParams={this.updateContactFormParams}
                              step={this.state.step}
                              dateDjangoDefault={this.dateDjangoDefault}
                              city={this.state.city}
                              adress={this.state.adress}
                              date={this.state.booking_date}
                              payment_status={this.state.payment_status}
                              email={this.state.email}
                              phone_number={this.state.phone_number}
                              pet_name={this.state.pet_name}
                              pet_breed={this.state.pet_breed}
                          //   booking_form={this.state.booking_form}
                            />
                            <ProgressColumn
                                city={this.state.city}
                                adress={this.state.adress}
                                date={this.state.booking_date}
                                payment_status={this.state.payment_status}
                                email={this.state.email}
                                phone_number={this.state.phone_number}
                                pet_name={this.state.pet_name}
                                pet_breed={this.state.pet_breed}
                            />
                        </div>
                      </div>
                  </div>
			case 2:
				return    <div class="container">
                    <Header stepid={this.state.step_id} step={this.state.step}/>
                    <div class="container">
                    <div class="row">
                      <NewPet
                        nextStep={this.nextStep}
                        updatePetFormParams={this.updatePetFormParams}
                        step={this.state.step}
                       />
                      <ProgressColumn
                        city={this.state.city}
                        date={this.state.booking_date}
                        payment_status={this.state.payment_status}
                        email={this.state.email}
                        phone_number={this.state.phone_number}
                        pet_name={this.state.pet_name}
                        pet_breed={this.state.pet_breed}
                      />
                      </div>
                      </div>
                    </div>
      case 3:
  			return   <div class="container">
                    <Header />
                    <div class="row">
                      <Payment nextStep={this.nextStep}
                      />
                      <ProgressColumn
                        city={this.state.city}
                        date={this.state.booking_date}
                        payment_status={this.state.payment_status}
                        email={this.state.email}
                        phone_number={this.state.phone_number}
                        pet_name={this.state.pet_name}
                        pet_breed={this.state.pet_breed}
                      />
                      </div>
                    </div>
		}
	}
})

ReactDOM.render(
  <CheckoutContainer/>,
	document.getElementById('container-checkout')
)
