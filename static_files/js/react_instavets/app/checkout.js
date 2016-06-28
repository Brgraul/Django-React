var forms = require('newforms')
var BootstrapForm = require('newforms-bootstrap')

/* Forms Locale*/
forms.addLocale('es', {
  b: 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_')
, B: 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_')
, DATE_INPUT_FORMATS: [
    '%d/%m/%Y', '%d/%m/%y'
  , '%d %b %Y', '%d %b %y'
  , '%d %B %Y', '%d %B %y',
  , '%m/%d/%Y',
  ]
, DATETIME_INPUT_FORMATS: [
    '%d/%m/%Y %H:%M:%S'
  , '%d/%m/%Y %H:%M'
  , '%d/%m/%Y'
  , '%m/%d/%Y'
  , '%Y/%m/%d'
  , '%H:%M'
  ]
})

forms.setDefaultLocale('es')

/* We are selecting the step of the process by means of the id, and in the case of the 3rd step
we took advantage of the id_nesting */

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

var PaymentForm = forms.Form.extend({
  card_name: forms.CharField({label: 'Nombre del titular:', required: true}),
  card_number: forms.CharField({label: 'Número Tarjeta:', required: true}),
  exp_date: forms.DateTimeField({label: 'Fecha Caducidad:', required: true, widget: forms.DateInput({format: '%M/%Y'})}),
  csv: forms.CharField({label: 'CSV:' , required: true}),

})

/* function renderField(bf) {
  var className = 'form-field'
    return <div className={className}>
      {bf.labelTag()} {bf.render()}
      {bf.helpTextTag()} {bf.errors().render()}
    </div>
  } */

var BookingForm = forms.Form.extend({
  booking_date: forms.DateTimeField({label: 'Fecha de la cita:', requiered: true, custom: 'readonly', requiered: true, errorMessages: {required:'Rellena este campo porfavor.'} }),
  booking_hour: forms.DateTimeField({label:'Hora de la cita:', custom: 'readonly', requiered: true, errorMessages: {required:'Rellena éste campo porfavor.'}}),
  phone_number: forms.CharField({label: 'Número de teléfono:', requiered: true, errorMessages: {required:'Rellena éste campo porfavor.'}}),
  email: forms.EmailField({label: 'Email:', requiered: true, errorMessages: {invalid: 'Porfavor introduce un email válido.', required:'Rellena éste campo porfavor.'}}),
  first_name: forms.CharField({label: 'Nombre:', requiered: true, errorMessages: {required:'Rellena éste campo porfavor.'}}),
  second_name: forms.CharField({label: 'Apellido:', requiered: true, errorMessages: {required:'Rellena éste campo porfavor.'}}),
  adress: forms.CharField({label: 'Dirección:', requiered: true, errorMessages: {required:'Rellena éste campo porfavor.'}}),
  city: forms.CharField({label: 'Ciudad:', requiered: true, errorMessages: {required:'Rellena éste campo porfavor.'}}),
  acceptTerms: forms.BooleanField({label: 'Acepto los términos de usuario:', required: true, errorMessages: {required:'Es necesario aceptar los términos de usuario para seguir con el proceso.'}}),

})

var SPECIES = [
  ['cat','Gato'],
  ['dog','Perro'],
  ['other','Otro']
]
var GENDER = [
  ['hembra_normal','Hembra Normal'],
  ['hembra_esterilizada','Hembra Esterilizada'],
  ['macho_normal','Macho Normal'],
  ['macho_esterilizado','Macho Esterilizado']
]
/* var BigForm = forms.Form.extend({
  booking_date: forms.CharField({label: 'Fecha de la cita:', requiered: true, custom: 'readonly', requiered: true, errorMessages: {required:'Rellena éste campo porfavor.'} }),
  booking_hour: forms.CharField({label:'Hora de la cita:', custom: 'readonly', requiered: true, errorMessages: {required:'Rellena éste campo porfavor.'}}),
  phone_number: forms.CharField({label: 'Número de teléfono:', requiered: true, errorMessages: {required:'Rellena éste campo porfavor.'}}),
  email: forms.EmailField({label: 'Email:', requiered: true, errorMessages: {invalid: 'Porfavor introduce un email válido.', required:'Rellena éste campo porfavor.'}}),
  first_name: forms.CharField({label: 'Nombre:', requiered: true, errorMessages: {required:'Rellena éste campo porfavor.'}}),
  second_name: forms.CharField({label: 'Apellido:', requiered: true, errorMessages: {required:'Rellena éste campo porfavor.'}}),
  adress: forms.CharField({label: 'Dirección:', requiered: true, errorMessages: {required:'Rellena éste campo porfavor.'}}),
  city: forms.CharField({label: 'Ciudad:', requiered: true, errorMessages: {required:'Rellena éste campo porfavor.'}}),
  acceptTerms: forms.BooleanField({label: 'Acepto los términos de usuario:', required: true, errorMessages: {required:'Es necesario aceptar los términos de usuario para seguir con el proceso.'}}),
  pet_name: forms.CharField({label: 'Nombre de la mascota:', required: true, errorMessages: {required:'Rellena éste campo porfavor.'}}),
  pet_birthday: forms.CharField({label: 'Edad (Años):', required: true, errorMessages: {required:'Rellena éste campo porfavor.'}}),
  pet_species: forms.ChoiceField({required: true, label: 'Especie:', choices: SPECIES, errorMessages: {required:'Rellena éste campo porfavor.'}}),
  pet_gender: forms.ChoiceField({required: true, choices: GENDER, label: 'Sexo de la mascota:', errorMessages: {required:'Selecciona una de las opciones porfavor.'}}),
  pet_breed: forms.CharField({label: 'Raza:', required: true, errorMessages: {required:'Selecciona una de las opciones porfavor.'}}),

}) */

var NewPetForm = forms.Form.extend({
  pet_name: forms.CharField({label: 'Nombre de la mascota:', required: true, errorMessages: {required:'Rellena éste campo porfavor.'}}),
  pet_birthday: forms.CharField({label: 'Edad (Años):', required: true, errorMessages: {required:'Rellena éste campo porfavor.'}}),
  pet_species: forms.ChoiceField({required: true, label: 'Especie:', choices: SPECIES, errorMessages: {required:'Rellena éste campo porfavor.'}}),
  pet_gender: forms.ChoiceField({required: true, choices: GENDER, label: 'Sexo de la mascota:', errorMessages: {required:'Selecciona una de las opciones porfavor.'}}),
  pet_breed: forms.CharField({label: 'Raza:', required: true, errorMessages: {required:'Selecciona una de las opciones porfavor.'}}),
})

var Payment = React.createClass({
  render: function() {
    return <div class="col-md-5 col-md-offset-1 checkout-form-container">
              <p class="form-title" >Datos de pago</p>
              <p class="form-sub" >Estás a punto de completar el pago</p>
              <forms.RenderForm form={PaymentForm} ref="paymentForm">
              <BootstrapForm/>
              </forms.RenderForm>
              <button class="btn-cta-green">Pagar</button>
          </div>
  },
  //Esta funcion que hace?
  onSignup: function(cleanedData) {
    console.log('on isgnup')
    //Handle payment right here with the tpv
    $.ajax({
         url : "http://localhost:8000/checkout/", // the endpoint
         type : "POST", // http method
         data : { data : form.cleanedData }, // data sent with the post request

         // handle a successful response
         success : function(json) {
             $('#post-text').val(''); // remove the value from the input
          //   console.log(json); // log the returned json to the console
             console.log("success on post"); // another sanity check
             window.location.href("http://localhost:8000/payment/");
         },

         // handle a non-successful response
         error : function(xhr,errmsg,err) {
             $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                 " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
             console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
         }
     });
  },
  _onSubmit: function(e){
    e.preventDefault()
    var form = this.refs.paymentForm.getForm()
    //console.log(form.cleanedData)

    var isValid = form.validate()
    if (isValid) {
      console.log('Submitting pet form')

      //this.props.nextStep()
    }
  },
})

//Loads the booking form
var Booking = React.createClass({
  render: function() {
    return <div class="col-md-7 checkout-form-container">
              <p class="form-title" >Reserve su cita</p>
              <p class="form-sub" >Facilítenos alguna información básica porfavor</p>
                <form onSubmit={this._onSubmit} onChange={this.onFormChange}>
                <forms.RenderForm form={BookingForm} component="ul"
                rowComponent="li"
                autoId={true} ref="bookingForm">
               <BootstrapForm/>
                </forms.RenderForm>
                <button class="btn-cta-green">Guardar y continuar</button>
              </form>
            </div>
  },

 /* var Booking = React.createClass({
    render: function() {
      return <div class="col-md-7 checkout-form-container">
                <p class="form-title" >Reserve su cita</p>
                <p class="form-sub" >Facilítenos alguna información básica porfavor</p>
                  <form onSubmit={this._onSubmit} onChange={this.onFormChange}>
                    {this.props.booking_form.boundFields().map(renderField)}
                    <BootstrapForm/>
                    <div>
                    <input type="submit" value="Submit"/>{' '}
                    </div>
                  <button class="btn-cta-green">Guardar y continuar</button>
                </form>
              </div>
    }, */


  renderDateSelectWidget: function(){
    $.datetimepicker.setLocale('es');
    $('#booking_date').datetimepicker({
      timepicker: false,
    //  minDate:'-1970/01/0', //yesterday is minimum date(for today use 0 or -1970/01/01)
      format:'m/d/Y',
      lang:'es'
    });
    $('#booking_hour').datetimepicker({
      datepicker: false,
      format:'H:i',
      lang:'es',
      allowTimes:[ '8:00','8:15','8:30','8:45', '9:00','9:15','9:30','9:45','10:00','10:15','10:30','10:45',
      '11:00','11:15','11:30','11:45', '12:00','12:15','12:30','12:45', '13:00','13:15','13:30','13:45',
      '14:00','14:15','14:30','14:45', '15:00','15:15','15:30','15:45', '16:00','16:15','16:30','16:45'],
    });
  },
  componentDidMount: function() {
    this.renderDateSelectWidget();
  },
  onSignup: function(cleanedData) {
    console.log('on isgnup')
  },
  propTypes: {
    onSignup: React.PropTypes.func.isRequired
  },
  _onSubmit: function(e){
    e.preventDefault()
    var form = this.refs.bookingForm.getForm()
    $.ajax({
         url : "http://localhost:8000/checkout/", // the endpoint
         type : "POST", // http method
         data : { step: this.props.step, data : form.cleanedData }, // data sent with the post request

         // handle a successful response
         success : function(json) {
             $('#post-text').val(''); // remove the value from the input
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
    var isValid = form.validate()
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
              <form onSubmit={this._onSubmit} onChange={this.onFormChange}>
              <forms.RenderForm form={NewPetForm} ref="newPetForm">
              <BootstrapForm/>
              </forms.RenderForm>
              <button class="btn-cta-green">Guardar y continuar</button>
              </form>
            </div>
  },
  onSignup: function(cleanedData) {
    console.log('on isgnup')
  },
  propTypes: {
    onSignup: React.PropTypes.func.isRequired
  },
  _onSubmit: function(e){
    e.preventDefault()
    var form = this.refs.newPetForm.getForm()
    console.log(form)
    $.ajax({
         url : "http://localhost:8000/checkout/", // the endpoint
         type : "POST", // http method
         data : { data : form.cleanedData }, // data sent with the post request

         // handle a successful response
         success : function(json) {
             $('#post-text').val(''); // remove the value from the input
             window.location.replace('http://localhost:8000/payment/');
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
    var isValid = form.validate()
    if (isValid) {
      this.onSignup(form.cleanedData)
      this.props.updatePetFormParams(form.cleanedData);
      //this.props.nextStep()
    }
  },
})

/* Shows the status of the payment process */
var ProgressColumn = React.createClass({
  render: function(){
    return <div class="col-md-3 col-progress col-md-offset-1">
            <h3>Resumen:</h3>
            <h4 class="title">Datos de la cita</h4>
            <h4>{this.props.date}</h4>
            <h4>{this.props.city}</h4>
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
		return {
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
      payment_status: 'Incompleto',
  //    booking_form: new BookingForm,
		}
	},

  // Updates Contact Form Parameters
  updateContactFormParams: function(form_params){
    console.log(form_params.booking_date)
    console.log(Date.parse(form_params.booking_date))
    console.log(Date.toString(form_params.booking_date))
    console.log(time.strftime(form_params.booking_date, format[, locale]))

    this.setState({
      city : form_params.city,
      acceptTerms: form_params.acceptTerms,
      booking_date: Date.toString(form_params.booking_date),
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
    })
  },

  // Increases the state counter in 1
  nextStep: function() {
    this.setState({
      step : this.state.step + 1 ,
      step_id : 'step' + this.state.step ,
    })
  },

  //Decreases the state counter in 1
  previousStep: function() {
    this.setState({
      step : this.state.step - 1
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
                        nextStep={this.nextStep}
                        form_params={this.state.form_params}
                        updateContactFormParams={this.updateContactFormParams}
                        step={this.state.step}
                    //   booking_form={this.state.booking_form}
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

			case 2:
				return    <div class="container">
                    <Header stepid={this.state.step_id} step={this.state.step}/>
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
