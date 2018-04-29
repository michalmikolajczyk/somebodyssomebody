class App extends React.Component {
  state = {
    name: '',
    nameList: ['Kaja Kusztra', 'Katharina Kohler', 'Matylda Krzykowski'],
    repeatedName: '',
    understands: false,
    step: 1,
  }

  handleNameChange = event => this.setState({ name: event.target.value });
  
  handleNameRepeat = event => this.setState({ repeatedName: event.target.value });

  handleConsentChange = event => this.setState({ understands: event.target.value });

  nextStep = (event) => {
    this.setState({ step: 2 });
    event.preventDefault();
  }

  finalSubmit = () => {
    alert('somebodys somebody');
  }

  step1 = () => (
    <div>
      <form className="uk-grid-small" data-uk-grid onSubmit={this.nextStep} >
        <div className="uk-width-2-5@s name-please">
          <input
            className="uk-input"
            type="text"
            placeholder="Enter your name"
            value={this.state.name}
            onChange={this.handleNameChange}
          />
        </div>
        <div className="uk-width-2-5@s i-understand">
          <label><input
            className="uk-radio"
            type="radio"
            name="radio2"
            value={this.state.understand}
            onChange={this.handleConsentChange}
          /> I understand the digital ritual</label>
        </div>
        <div className="uk-width-1-5@s">
          {/* <label><input type="submit" className="uk-button uk-button-default" /> Submit</label> */}
          <label><input type="submit" className="uk-button uk-button-default" /></label>
        </div>
      </form>
    </div>
  )

  getRandomName = () => this.state.nameList[Math.floor(Math.random() * this.state.nameList.length)];

  step2 = () => (
    <div>
      <form className="uk-grid-small" data-uk-grid onSubmit={this.finalSubmit} >
        <div className="uk-width-2-5@s name-from-list">
          <span>{this.getRandomName()}</span>
        </div>
        <div className="uk-width-4-5@s name-repeat-please">
          <label className="uk-form-label" htmlFor="form-horizontal-text">Type here the name above:</label>
          <div className="uk-form-controls">
              <input
                className="uk-input"
                id="form-horizontal-text"
                type="text"
                value={this.state.repeatedName}
                onChange={this.handleNameRepeat}
              />
          </div>
        </div>
        <div className="uk-width-1-5@s">
          <label><input type="submit" className="uk-button uk-button-default" /></label>
        </div>
      </form>
    </div>
  )

  render() {
    const { step } = this.state;
    if (step === 1) return this.step1();

    return this.step2();
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('react-app')
);
