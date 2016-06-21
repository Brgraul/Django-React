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
  /*
  card_name: forms.CharField({label: 'Nombre del titular:'}),
  card_number: forms.CharField({label: 'Número Tarjeta:'}),
  exp_date: forms.DateTimeField({label: 'Fecha Caducidad:', widget: forms.DateInput({format: '%M/%Y'})}),
  */
  csv: forms.CharField({label: 'CSV:'}),

})

var SignupForm = forms.Form.extend({
  /* booking: forms.DateTimeField({label: 'Fecha y hora de la cita:'}),
  phone_number: forms.CharField({label: 'Número de teléfono:'}),
  email: forms.EmailField({label: 'Email:'}),
  first_name: forms.CharField({label: 'Nombre:'}),
  second_name: forms.CharField({label: 'Apellido:'}),
  adress: forms.CharField({label: 'Dirección:'}),
  */
  city: forms.CharField({label: 'Ciudad:'}),
  onFormChange: function(){
    console.log('form changed')
  },
  acceptTerms: forms.BooleanField({label: 'Acepto los términos de usuario:',
                                  required: true,
                                  controlled: true,
                                  onChange: this.onFormChange.bind(this)}),


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

var Signup = React.createClass({
  render: function() {
    console.log('dasd')
    return <div class="row">
              <div class="col-md-9">
                <form onSubmit={this._onSubmit}>
                <forms.RenderForm form={SignupForm} ref="signupForm"/>
                <button class="btn-cta-green">Guardar y continuar</button>
              </form>
            </div>
            <ProgressColumn />
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
    var form = this.refs.signupForm.getForm()
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

var NewPet = React.createClass({
  render: function() {
    console.log('dasd')
    return <div class="col-md-9">
            <form onSubmit={this._onSubmit}>
              <forms.RenderForm form={NewPetForm} ref="newpetForm"/>
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
    return <div class="col-md-3 col-progress">
            <div class="row">
              <h2>Step Name</h2>
              <h4>Step Description and all that .....</h4>
            </div>
            <div class="row">
              <h2>Step Name</h2>
              <h4>Step Description and all that .....</h4>
            </div>
            <div class="row">
              <h2>Step Name</h2>
              <h4>Step Description and all that .....</h4>
            </div>
            <div class="row">
              <h2>Step Name</h2>
              <h4>Step Description and all that .....</h4>
            </div>
          </div>
  }
})

var CheckoutContainer = React.createClass({
	getInitialState: function() {
		return {
			step: 1
		}
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
				return(
          <div class="container">
            <Header step={this.state.step} />
            <div class="checkout-body">
              <Signup nextStep={this.nextStep} />
            </div>
          </div>
              );
			case 2:
				return <Payment nextStep={this.nextStep}
                            previousStep={this.previousStep} />
      case 3:
  			return <NewPet nextStep={this.nextStep}
                            previousStep={this.previousStep} />
		}
	}
})


ReactDOM.render(
	<CheckoutContainer/>,
	document.getElementById('container-checkout')
)
