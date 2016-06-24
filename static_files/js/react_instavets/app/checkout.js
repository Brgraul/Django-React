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
              <div class="row">
                <div class="col-md-3">
                <img class="checkout-logo" alt="File logo" src='/static/images/index/logo-y-nombre.png'/>
                </div>
                <div class="col-md-2 col-md-offset-1">
                  <i class="fa fa-user fa-3x checkout-icon" aria-hidden="true"></i>
                  <p class="checkout-text" >1. Datos personales</p>
                </div>
                <div class="col-md-1">
                  <i class="fa fa-long-arrow-right fa-3x checkout-icon arrow" aria-hidden="true" id={this.props.stepid}></i>
                </div>
                <div class="col-md-2">
                  <i class="fa fa-paw fa-3x checkout-icon" aria-hidden="true" id={this.props.stepid}></i>
                  <p class="checkout-text" id={this.props.stepid}>2. Mascotas</p>
                </div>
                <div class="col-md-1 select">
                  <i class="fa fa-long-arrow-right fa-3x checkout-icon arrow" aria-hidden="true" id={this.props.stepid}></i>
                </div>
                <div class="col-md-2 select">
                  <i class="fa fa-credit-card fa-3x checkout-icon" aria-hidden="true" id={this.props.stepid}></i>
                  <p class="checkout-text" id={this.props.stepid}>3. Pago</p>
                  </div>
              </div>
            </div>
  }
})

var PaymentForm = forms.Form.extend({
  card_name: forms.CharField({label: 'Nombre del titular:'}),
  card_number: forms.CharField({label: 'Número Tarjeta:'}),
  exp_date: forms.DateTimeField({label: 'Fecha Caducidad:', widget: forms.DateInput({format: '%M/%Y'})}),
  csv: forms.CharField({label: 'CSV:'}),

})

var BookingForm = forms.Form.extend({
  booking_date: forms.CharField({label: 'Fecha de la cita:', custom: 'readonly' }),
  booking_hour: forms.CharField({label:'Hora de la cita:',custom: 'readonly'}),
  phone_number: forms.CharField({label: 'Número de teléfono:'}),
  email: forms.EmailField({label: 'Email:'}),
  first_name: forms.CharField({label: 'Nombre:'}),
  second_name: forms.CharField({label: 'Apellido:'}),
  adress: forms.CharField({label: 'Dirección:'}),
  city: forms.CharField({label: 'Ciudad:'}),
  acceptTerms: forms.BooleanField({label: 'Acepto los términos de usuario:',
                                  required: true}),

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

var NewPetForm = forms.Form.extend({
  pet_name: forms.CharField({label: 'Nombre de la mascota:'}),
  pet_birthday: forms.CharField({label: 'Edad (Años):'}),
  pet_species: forms.ChoiceField({label: 'Especie:', choices: SPECIES}),
  pet_gender: forms.ChoiceField({required: false, choices: GENDER}),
  pet_breed: forms.CharField({label: 'Raza:'}),
})

var Payment = React.createClass({
  render: function() {
    return <div class="col-md-9">
            <form onSubmit={this._onSubmit}>
              <forms.RenderForm form={PaymentForm} ref="paymentForm">
              <BootstrapForm/>
              </forms.RenderForm>
              <button class="btn-cta-green">Pagar</button>
            </form>
          </div>
  },
  //Esta funcion que hace?
  onSignup: function(cleanedData) {
    console.log('on isgnup')
    //Handle payment right here with the tpv
  },
  _onSubmit: function(e){
    e.preventDefault()
    var form = this.refs.paymentForm.getForm()
    //console.log(form.cleanedData)
    $.ajax({
         url : "http://localhost:8000/checkout/", // the endpoint
         type : "POST", // http method
         data : { data : form.cleanedData }, // data sent with the post request

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
      this.props.nextStep()
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
                <forms.RenderForm form={BookingForm} ref="bookingForm">
                  <BootstrapForm/>
                </forms.RenderForm>
                <button class="btn-cta-green">Guardar y continuar</button>
              </form>
            </div>
  },
  renderDateSelectWidget: function(){
    $.datetimepicker.setLocale('es');
    $('#id_booking_date').datetimepicker({
      timepicker: false,
    //  minDate:'-1970/01/0', //yesterday is minimum date(for today use 0 or -1970/01/01)
      format:'m/d/Y',
      lang:'es'
    });
    $('#id_booking_hour').datetimepicker({
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
         data : { data : form.cleanedData }, // data sent with the post request

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
    return <div class="col-md-7">
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
      this.props.nextStep()
    }
  },
})

/* Shows the status of the payment process */
var ProgressColumn = React.createClass({
  render: function(){
    return <div class="col-md-3 col-progress col-md-offset-2">
            <h3>Resumen:</h3>
            <h4 class="title">Datos de la cita</h4>
            <h4>{this.props.date} {this.props.city}</h4>
            <h4 class="title">Contacto</h4>
            <h4>{this.props.email} {this.props.phone_number}</h4>
            <h4 class="title">Mascota</h4>
            <h4>{this.props.pet_name} {this.props.pet_breed}</h4>
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
      /* Step 1 */
      city: ' ',
      acceptTerms: 'False',
      booking_date: 'Incompleto',
      phone_number: 'Incompleto',
      email: '',
      first_name: 'Nombre',
      second_name: 'Apellidos',
      adress: 'Dirección',
      /* Step 2 */
      pet_name : 'Incompleto',
      pet_birthday : 'Fecha nacimiento mascota',
      pet_species : 'Especie Mascota',
      pet_gender : 'Sexo Mascota',
      pet_breed : '',
      /* Step 3 */
      payment_status: 'Incompleto',
		}
	},

  // Updates Contact Form Parameters
  updateContactFormParams: function(form_params){
    this.setState({
      city : form_params.city,
      acceptTerms: form_params.acceptTerms,
      booking_date: form_params.booking_date,
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
                  <div class="row">
                    <Booking
                      nextStep={this.nextStep}
                      form_params={this.state.form_params}
                      updateContactFormParams={this.updateContactFormParams}
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

			case 2:
				return    <div class="container">
                    <Header stepid={this.state.step_id} />
                    <div class="checkout-body">
                      <NewPet
                        nextStep={this.nextStep}
                        updatePetFormParams={this.updatePetFormParams}
                        step={this.state.step} />
                    </div>
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
      case 3:
  			return   <div class="container">
                    <Header />
                    <div class="checkout-body">
                      <Payment nextStep={this.nextStep} />
                    </div>
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
		}
	}
})


ReactDOM.render(
	<CheckoutContainer/>,
	document.getElementById('container-checkout')
)
