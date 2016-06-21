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

var Signup = React.createClass({
  getInitialState: function(){
    //Ajax Request for translated cookie
    //if cookie nulll automplete with default data
    return{
      form_to_load: form,
      form_to_load_ref: "signupForm",
      signupFormData: {city: 'Incompleto'},
    }
  },

  formToRender: function(){
    return SignupForm
  },

  onFormChange: function() {
    if ( this.props.step == 1){
      this.setState({
        //signupFormData: this.refs.signupForm.getForm().data,
      })
    }
    this.forceUpdate()
  },
  render: function() {
    console.log(this.props.step)
    switch (this.props.step) {
      case 1:
        console.log('tira al caso uso')
        var form = this.formToRender()
        console.log(form)
        return <div class="row">
                  <div class="col-md-9">
                    <form onSubmit={this._onSubmit} onChange={this.onFormChange}>
                    <forms.RenderForm form={form} ref="signupForm"/>
                    <button class="btn-cta-green">Guardar y continuar</button>
                  </form>
                </div>
                <ProgressColumn signupFormData={this.state.signupFormData}/>
              </div>
      case 2:
        console.log('tira al caso dos')
        return <div class="row">
                  <div class="col-md-9">
                    <form onSubmit={this._onSubmit} onChange={this.onFormChange}>
                    <forms.RenderForm form={NewPetForm} ref="newPetForm"/>
                    <button class="btn-cta-green">Guardar y continuar</button>
                  </form>
                </div>
                <ProgressColumn signupFormData={this.state.signupFormData}/>
              </div>
      case 3:
        console.log('tira al caso res')
        return <div class="row">
                  <div class="col-md-9">
                    <form onSubmit={this._onSubmit} onSignup={this.onSignup} onChange={this.onFormChange}>
                    <forms.RenderForm form={PaymentForm} ref="paymentForm"/>
                    <button class="btn-cta-green">Guardar y continuar</button>
                  </form>
                </div>
                <ProgressColumn signupFormData={this.state.signupFormData}/>
              </div>
    }
  },
  propTypes: {
    onSignup: React.PropTypes.func.isRequired
  },
  _onSubmit: function(e) {
    e.preventDefault()
    /*
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
    }*/
    this.props.nextStep()
  },
})


var ProgressColumn = React.createClass({
  render: function(){
    return <div class="col-md-3 col-progress">
            <div class="row">
              <h2>Step Name</h2>
              <h4>{this.props.signupFormData.city}</h4>
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

  onSignup: function() {
    console.log('container signup')
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
				return(
          <div class="container">
            <Header step={this.state.step} />
            <div class="checkout-body">
              <Signup step={this.state.step} nextStep={this.nextStep} />
            </div>
          </div>
              );
		}
})


ReactDOM.render(
	<CheckoutContainer/>,
	document.getElementById('container-checkout')
)
