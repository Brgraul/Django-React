var vets = [
]

var VetComponent = React.createClass({
	getInitialState: function() {
		return {customText: "Text before the click", zipCode: "00000"};
	},
	onChange: function() {
		this.setState({zipCode: event.target.value});
		console.log(this.state.zipCode);
	},

	render: function() {
		var titleStyle = {fontSize: '36px', marginRight: '20px', float: 'left'};

		return (
				<div className="container">
					<div className="row">
						<div className="column col-md-12 col-sm-12 col-xs-12" style={titleStyle}>
							<h1>¿Cual es tu código postal?</h1>
							<input
					      type="text"
					      value={this.state.zipCode}
								onChange={this.onChange}
					    />
							<button onClick={this.onChange, this.nextComponent}>Click Me!!!</button>
							{this.props.vets.map(function (vet) {
								return (
										<Vet name={vet.name} image={vet.image} />
									)
								})}
						</div>
					</div>
				</div>
			)
	}
});

var Vet = React.createClass({
	render: function() {
		return (
			<div className="container">
				<h2>{this.props.name}</h2>
				<img src={this.props.image}/>
			</div>
			)
	}
});

ReactDOM.render(
	<VetComponent vets={vets}/>,
	document.getElementById('react-vet-profile')
	)
