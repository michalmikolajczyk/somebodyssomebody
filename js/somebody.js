class App extends React.Component {
  state = {
    name: '',
    somebody: '',
    repeatedName: '',
    understand: false,
    step: 1,
  }

  componentWillMount() {
    this.getRandomName();
  }

  handleNameChange = event => this.setState({ name: event.target.value });
  
  handleNameRepeat = event => this.setState({ repeatedName: event.target.value });

  handleConsentChange = event => this.setState({ understand: event.target.value });

  nextStep = (event) => {
    this.setState({ step: 2 });
    event.preventDefault();
  }

  finalSubmit = (ev) => {
    ev.preventDefault();
    const body = JSON.stringify({ name: this.state.name });
    fetch('https://somebodyssomebody.herokuapp.com/somebody', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body,
    }).then(res => {
      alert('somebodys somebody');
      return location.reload();
    });
  }

  getRandomName = () => {
    return fetch('https://somebodyssomebody.herokuapp.com/somebody', {
      method: 'get',
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => res.json()).then(json => this.setState({ somebody: json.name })).catch(e => false);
  }

  step1 = (disabled) => (
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
          <label><input
            type="submit"
            className="uk-button uk-button-default some-submit some-input"
            disabled={disabled}
          /></label>
        </div>
      </form>
    </div>
  )

  step2 = (disabled) => (
    <div>
      <form className="uk-form-horizontal" onSubmit={this.finalSubmit} >
        <div className="uk-grid-small" data-uk-grid>
          <div className="uk-width-5-5@s name-from-list">
            <span>{this.state.somebody}</span>
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
            <label><input
              type="submit"
              className="uk-button uk-button-default some-submit some-input"
              disabled={disabled}
            /></label>
          </div>
        </div>
      </form>
    </div>
  );

  render() {
    const { step, name, repeatedName, somebody, understand } = this.state;
    const firstSubmitDisabled = !name || !understand;
    const secondSubmitDisabled = (repeatedName !== somebody);
    if (step === 1) return this.step1(firstSubmitDisabled);

    return this.step2(secondSubmitDisabled);
  }
};

ReactDOM.render(
  <App />,
  document.getElementById('react-app')
);
