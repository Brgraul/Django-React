var forms = require('newforms')

var Header = React.createClass({
  render: function() {
    return  <div class="row">
              <div class="col-md-3">
                <h1>Logo Instavets</h1>
              </div>
              <div class="col-md-1">
                <i class="fa fa-calendar fa-3x" aria-hidden="true" ></i>
              </div>
              <div class="col-md-1">
                <i class="fa fa-long-arrow-right fa-2x" aria-hidden="true"></i>
              </div>
              <div class="col-md-1">
                <i class="fa fa-user fa-3x" aria-hidden="true"></i>
              </div>
              <div class="col-md-1">
                <i class="fa fa-long-arrow-right fa-2x" aria-hidden="true"></i>
              </div>
              <div class="col-md-1">
                <i class="fa fa-paw fa-3x" aria-hidden="true"></i>
              </div>
              <div class="col-md-1">
                <i class="fa fa-long-arrow-right fa-2x" aria-hidden="true"></i>
              </div>
              <div class="col-md-1">
                <i class="fa fa-credit-card fa-3x" aria-hidden="true"></i>
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
  booking_date: forms.DateTimeField({label: 'Fecha y hora de la cita:'}),
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
              <forms.RenderForm form={PaymentForm} ref="paymentForm"/>
              <button class="btn-cta-green">Pagar</button>
            </form>
          </div>
  },
  //Esta funcion que hace?
  onSignup: function(cleanedData) {
    console.log('on isgnup')
    //Handle payment right here with the tpv
  },
  propTypes: {
    onSignup: React.PropTypes.func.isRequired
  },
  _onSubmit: function(e) {
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
             console.log(json); // log the returned json to the console
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

var Booking = React.createClass({
  render: function() {
    return <div class="col-md-9">
                <form onSubmit={this._onSubmit} onChange={this.onFormChange}>
                <forms.RenderForm form={BookingForm} ref="bookingForm"/>
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
    var form = this.refs.bookingForm.getForm()
    $.ajax({
         url : "http://localhost:8000/checkout/", // the endpoint
         type : "POST", // http method
         data : { data : form.cleanedData }, // data sent with the post request

         // handle a successful response
         success : function(json) {
             $('#post-text').val(''); // remove the value from the input
             console.log(json); // log the returned json to the console
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

var NewPet = React.createClass({
  render: function() {
    console.log('dasd')
    return <div class="col-md-8">
              <form onSubmit={this._onSubmit} onChange={this.onFormChange}>
              <forms.RenderForm form={NewPetForm} ref="newPetForm"/>
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
  _onSubmit: function(e) {
    e.preventDefault()
    var form = this.refs.newpetForm.getForm()
    console.log(form.cleanedData)
    $.ajax({
         url : "http://localhost:8000/checkout/", // the endpoint
         type : "POST", // http method
         data : { data : form.cleanedData }, // data sent with the post request

         // handle a successful response
         success : function(json) {
             $('#post-text').val(''); // remove the value from the input
             console.log(json); // log the returned json to the console
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

var ProgressColumn = React.createClass({
  render: function(){
    console.log(this.props.formData)
    return <div class="col-md-3 col-progress">
            <h2>Resumen:</h2>
            <h4>Fecha: </h4>
            <h4>Ciudad:  {this.props.city}</h4>
            <div class="row">
              <h3>Contacto</h3>
              <h4>Ciudad:</h4>
            </div>
            <div class="row">
              <h2>Step Name</h2>
              <h4>Step Description and all that .....</h4>
            </div>
            <div class="row">
              <h2>Pagado</h2>
              <h4>{this.props.payment_status}</h4>
            </div>
          </div>
  }
})


/* PARENT TO ALL THE ELEMENTS OF THE APP*/
var CheckoutContainer = React.createClass({
	getInitialState: function() {
		return {
			step: 1,
      /* Step 1 */
      city: 'ciudad',
      acceptTerms: 'False',
      booking_date: 'Fecha',
      phone_number: 'sin completar',
      email: 'sin completar',
      first_name: 'Nombre',
      second_name: 'Apellidos',
      adress: 'Dirección',
      /* Step 2 */
      pet_name : 'Nombre Mascota',
      pet_birthday : 'Fecha nacimiento mascota',
      pet_species : 'Especie Mascota',
      pet_gender : 'Sexo Mascota',
      pet_breed : 'Raza Mascota',
      /* Step 3 */
      payment_status: 'incomplete',
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
      step : this.state.step + 1
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
                  <Header step={this.state.step} />
                  <div class="checkout-body">
                    <Booking nextStep={this.nextStep} form_params={this.state.form_params} updateContactFormParams={this.updateContactFormParams}/>
                    <ProgressColumn
                        city={this.state.city}
                        date={this.state.date}
                        payment_status={this.state.payment_status}
                    />
                  </div>
                </div>

			case 2:
				return    <div class="container">
                    <Header step={this.state.step} />
                    <div class="checkout-body">
                      <NewPet nextStep={this.nextStep} form_params={this.state.form_params} />
                    </div>
                    <ProgressColumn
                        city={this.state.city}
                        date={this.state.date}
                        payment_status={this.state.payment_status}
                    />
                    </div>
      case 3:
  			return   <div class="container">
                    <Header step={this.state.step} />
                    <div class="checkout-body">
                      <Payment nextStep={this.nextStep} form_params={this.state.form_params} />
                    </div>
                    <ProgressColumn
                        city={this.state.city}
                        date={this.state.date}
                        payment_status={this.state.payment_status}
                    />
                    </div>
		}
	}
})


ReactDOM.render(
	<CheckoutContainer/>,
	document.getElementById('container-checkout')
)
