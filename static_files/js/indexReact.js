var vets = [
	{name: "Bayside", image: "http://www.google.es "},
	{name: "Bayside", image: "http://www.google.es "},
	{name: "Bayside", image: "http://www.google.es "},
]

var VetComponent = React.createClass({
	getInitialState: function() {
		return {customText: "Text before the click"};
	},
	customClickFunction: function() {
		this.setState({customText: "You clicked the button"});
	},
	render: function() {
		var testStyle = {fontSize: '36px', marginRight: '20px' };
		return (
				<div style={testStyle}>
					<h1>{this.state.customText}</h1>
					<button onClick={this.customClickFunction}>Click Me!!!</button>
					{this.props.vets.map(function (vet) {
						return (
								<Vet name={vet.name} image={vet.image} />
						)
					})}
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
