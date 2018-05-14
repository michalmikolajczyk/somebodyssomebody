const API = 'https://somebodyssomebody.herokuapp.com';
// const API = 'http://localhost:3000';

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
    fetch(API + '/somebody', {
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
    return fetch(API + '/somebody', {
      method: 'get',
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => res.json()).then(json => this.setState({ somebody: json.name })).catch(e => false);
  }

  step1 = (disabled) => (
    <div>
      <form className="uk-grid-small uk-child-width-expand@s uk-text-center" data-uk-grid onSubmit={this.nextStep} >
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
        <div className="uk-width-1-5@s some-submit first-submit ">
          <label><input
            type="submit"
            className="uk-button uk-button-default some-input"
            disabled={disabled}
            value="Submit"
          /></label>
        </div>
      </form>
    </div>
  )

  step2 = (disabled) => (
    <div>
      <form className="uk-form-horizontal" onSubmit={this.finalSubmit} >
        <div className="uk-grid-small uk-child-width-expand@s uk-text-center" data-uk-grid>
          <div className="uk-width-5-5@s name-from-list">
            <div>
              <span>{this.state.somebody}</span>
            </div>
          </div>
        </div>
        <div className="uk-grid-small" data-uk-grid>
          <div className="uk-width-4-5@s name-repeat-please">
            <div>
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
          </div>
          <div className="uk-width-1-5@s some-submit last-submit">
            <label><input
              type="submit"
              className="uk-button uk-button-default some-input"
              disabled={disabled}
              value="Submit"
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

class App2 extends React.Component {
  state = {
    names: ['Kaja Kusztra', 'Katharina Köhler', 'Matylda Krzykowski']
  }

  componentWillMount() {
    this.getAllNames();
  }

  getAllNames = () => {
    return fetch(API + '/everybody', {
      method: 'get',
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => res.json()).then(json => this.setState({ names: json })).catch(e => false);
  }

  render() {
    const { names } = this.state;
    const renderNames = names.map(item => item.name).join(', ');

    return (
      <marquee id="in-app" scrollamount="13" direction="right" className="rotating">{renderNames}, {renderNames}, {renderNames}</marquee>
    );
  }
}

const temp = document.createElement("div");
ReactDOM.render(
  <App2 />,
  temp
);
const container = document.getElementById('react-app-2');
container.replaceChild(temp.querySelector('#in-app'), document.getElementById('out-app'));
