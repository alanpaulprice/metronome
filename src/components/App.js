import React, { Component } from 'react';
import TempoInput from './TempoInput';
import PlayStopButton from './PlayStopButton';
import TempoSelectGrid from './TempoSelectGrid';

class App extends Component {
  state = { tempo: 120, tempoInputValue: '120', playing: false };
  TempoInputRef = React.createRef();

  togglePlayback = () => this.setState({ playing: !this.state.playing })
  setTempo = newTempo => this.setState({ tempo: newTempo, tempoInputValue: newTempo });
  incrementTempo = incr =>
    this.setState(prevState => ({
      ...prevState,
      tempo: prevState.tempo + incr,
      tempoInputValue: prevState.tempo + incr
    }));
  onInputSubmit = async e => {
    e.preventDefault();
    const newTempo = parseInt(this.state.tempoInputValue);
    if (newTempo >= 40 && newTempo <= 240) await this.setTempo(parseInt(this.state.tempoInputValue));
    this.TempoInputRef.current.blur();
  };
  onTempoInputChange = e => {
    this.setState({
      // Only allows 3 digits to be entered
      tempoInputValue: e.currentTarget.value.replace(/\D/g, '').slice(0, 3)
    });
  };
  onInputFocus = () => this.setState({ tempoInputValue: '' });
  onInputBlur = () => this.setState({ tempoInputValue: this.state.tempo });

  render() {
    return (
      <div className="App">
        <h1>metronome</h1>

        <button className="incrementButton"
          onClick={() => this.incrementTempo(-1)}
        >
          <i className="fa fa-minus"></i>
        </button>

        <TempoInput
          TempoInputRef={this.TempoInputRef}
          value={this.state.tempoInputValue}
          onChange={this.onTempoInputChange}
          onSubmit={this.onInputSubmit}
          onFocus={this.onInputFocus}
          onBlur={this.onInputBlur}
        />

        <button className="incrementButton"
          onClick={() => this.incrementTempo(1)}
        >
          <i className="fa fa-plus"></i>
        </button>

        <PlayStopButton playing={this.state.playing} togglePlayback={this.togglePlayback} />

        <TempoSelectGrid setTempo={this.setTempo} />
      </div>
    );
  }
}

export default App;
