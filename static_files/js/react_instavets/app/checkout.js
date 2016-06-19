var forms = require('newforms')

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
        <ProgressColumn/>
      </div>
    );
  }
})


ReactDOM.render(
	<CheckoutContainer/>,
	document.getElementById('container-checkout-form')
)
