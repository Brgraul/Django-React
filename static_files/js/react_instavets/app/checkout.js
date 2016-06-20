var forms = require('newforms')

var PaymentForm = forms.Form.extend({
  card_name: forms.CharField({label: 'Nombre del titular:'}),
  card_number: forms.CharField({label: 'Número Tarjeta:'}),
  csv: forms.CharField({label: 'CSV:'}),
  exp_date: forms.DateTimeField({label: 'Fecha Caducidad:', widget: forms.DateInput({format: '%m/%Y'})}),
})

var SignupForm = forms.Form.extend({
  booking: forms.DateTimeField(),
  phone_number: forms.CharField(),
  email: forms.EmailField(),
  first_name: forms.CharField(),
  second_name: forms.CharField(),
  adress: forms.CharField(),
  city: forms.CharField(),
  acceptTerms: forms.BooleanField({required: true})
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
  onSignup: function() {
    console.log('on isgnup')
    //Handle payment right here with the tpv
  },
  propTypes: {
    onSignup: React.PropTypes.func.isRequired
  },
  _onSubmit: function(e) {
    e.preventDefault()
    //Que es lo de la e?
    //Aqui hacer un Ajax que a una vista determinada de python que maneja el pago
    var form = this.refs.signupForm.getForm()
    console.log(form.cleanedData)
  },


})

var Signup = React.createClass({
  render: function() {
    return <div class="col-md-9">
            <form onSubmit={this._onSubmit}>
              <forms.RenderForm form={SignupForm} ref="signupForm"/>
              <button class="btn-cta-green">Guardar y continuar</button>
            </form>
          </div>
  },
  onSignup: function() {
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
      this.props.onSignup(form.cleanedData)
    }
  },
})

var ProgressColumn = React.createClass({
  render: function(){
    return <div class="col-md-3">
    <h3>Summary</h3>
    </div>
  }
})

var CheckoutContainer =React.createClass({
  render: function() {
    return (
      <div class="row">
    	  <Signup/>
        <Payment/>
        <ProgressColumn/>
      </div>
    );
  }
})


ReactDOM.render(
	<CheckoutContainer/>,
	document.getElementById('container-checkout-form')
)
