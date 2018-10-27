import React, { Component } from 'react';
import IncrementButton from './IncrementButton';
import Input from './Input';

class App extends Component {
  state = { tempo: 120, inputValue: '120' };
  inputRef = React.createRef();

  setTempo = newTempo => this.setState({ tempo: newTempo });
  incrementTempo = incr =>
    this.setState(prevState => ({
      ...prevState,
      tempo: prevState.tempo + incr,
      inputValue: prevState.tempo + incr
    }));
  onInputSubmit = async event => {
    event.preventDefault();
    await this.setTempo(parseInt(this.state.inputValue));
    this.inputRef.current.blur();
  };
  onInputChange = event => {
    this.setState({
      // Only allows 3 digits to be entered
      inputValue: event.currentTarget.value.replace(/\D/g, '').slice(0, 3)
    });
  };
  onInputFocus = () => this.setState({ inputValue: '' });
  onInputBlur = () => this.setState({ inputValue: this.state.tempo });

  render() {
    return (
      <div className="App">
        <h1>metronome</h1>

        <div className="TempoControls">
          <IncrementButton
            increment={-1}
            clickEvent={this.incrementTempo}
          >
            <i className="fa fa-minus"></i>
          </IncrementButton>
          <Input
            reference={this.inputRef}
            value={this.state.inputValue}
            onChange={this.onInputChange}
            onSubmit={this.onInputSubmit}
            onFocus={this.onInputFocus}
            onBlur={this.onInputBlur}
          />
          <IncrementButton
            increment={1}
            clickEvent={this.incrementTempo}
          >
            <i className="fa fa-plus"></i>
          </IncrementButton>
        </div>
      </div>
    );
  }
}

export default App;
