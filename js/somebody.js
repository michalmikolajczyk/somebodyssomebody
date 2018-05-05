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
        <div className="uk-width-3-5@s name-please">
          <input
            className="uk-input some-textinput some-input"
            type="text"
            placeholder="Enter your name"
            value={this.state.name}
            onChange={this.handleNameChange}
          />
        </div>
        <div className="uk-width-1-5@s i-understand">
          <input
            id="form-horizontal-text-111"
            className="uk-radio some-radio"
            type="radio"
            name="radio2"
            value={this.state.understand}
            onChange={this.handleConsentChange}
          /><label className="uk-form-label some-radio-label" htmlFor="form-horizontal-text-111"> I understand <br/>the digital ritual</label>
        </div>
        <div className="uk-width-1-5@s some-submit">
          <label><input type="submit" className="uk-button uk-button-default some-submit some-input" /></label>
        </div>
      </form>
    </div>
  )

  getRandomName = () => this.state.nameList[Math.floor(Math.random() * this.state.nameList.length)];

  step2 = () => (
    <div>
      <form className="uk-form-horizontal" onSubmit={this.finalSubmit} >
        <div className="uk-grid-small" data-uk-grid>
          <div className="uk-width-5-5@s name-from-list">
            <span>{this.getRandomName()}</span>
          </div>
        </div>
        <div className="uk-grid-small" data-uk-grid>
          <div className="uk-width-4-5@s name-repeat-please">
            <label className="uk-form-label" htmlFor="form-horizontal-text-123">Type here the <br />name above:</label>
            <div className="uk-form-controls">
                <input
                  className="uk-input some-radio some-input"
                  id="form-horizontal-text-123"
                  type="text"
                  value={this.state.repeatedName}
                  onChange={this.handleNameRepeat}
                />
            </div>
          </div>
          <div className="uk-width-1-5@s some-submit last-submit">
            <label><input type="submit" className="uk-button uk-button-default some-submit some-input" /></label>
          </div>
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
