import React, { Component } from 'react';
import TempoInput from './TempoInput';
import StartStopButton from './StartStopButton';
import TempoSelectGrid from './TempoSelectGrid';
import KeyboardShortcuts from './KeyboardShortcuts';

const withinAllowedRange = num => num >= 40 && num <= 230;

class App extends Component {
  state = { tempo: 120, tempoInputValue: '120', playing: false, volume: 100 };
  TempoInputRef = React.createRef();

  togglePlayback = () => this.setState({ playing: !this.state.playing });

  setTempo = newTempo =>
    this.setState({ tempo: newTempo, tempoInputValue: newTempo });

  incrementTempo = incr =>
    this.setState(prevState => ({
      ...prevState,
      // Only edit state if the new tempo is within the allowed range
      tempo: withinAllowedRange(prevState.tempo + incr)
        ? prevState.tempo + incr
        : prevState.tempo,
      tempoInputValue: withinAllowedRange(prevState.tempo + incr)
        ? prevState.tempo + incr
        : prevState.tempo
    }));

  onInputSubmit = async e => {
    e.preventDefault();
    const newTempo = parseInt(this.state.tempoInputValue);
    if (withinAllowedRange(newTempo))
      await this.setTempo(parseInt(this.state.tempoInputValue));
    this.TempoInputRef.current.blur();
  };

  // Only allows 3 digits to be entered
  onTempoInputChange = e =>
    this.setState({
      tempoInputValue: e.currentTarget.value.replace(/\D/g, '').slice(0, 3)
    });

  onInputFocus = () => this.setState({ tempoInputValue: '' });

  onInputBlur = () => this.setState({ tempoInputValue: this.state.tempo });

  onIncrementButtonMinusClick = () => this.incrementTempo(-1);

  onIncrementButtonPlusClick = () => this.incrementTempo(1);

  onVolumeInputChange = e => this.setState({ volume: e.currentTarget.value });

  render() {
    return (
      <div className="App">
        <h1>metronome</h1>

        <button
          className="incrementButton"
          onClick={this.onIncrementButtonMinusClick}
        >
          <i className="fa fa-minus" />
        </button>

        <TempoInput
          TempoInputRef={this.TempoInputRef}
          value={this.state.tempoInputValue}
          onChange={this.onTempoInputChange}
          onSubmit={this.onInputSubmit}
          onFocus={this.onInputFocus}
          onBlur={this.onInputBlur}
        />

        <button
          className="incrementButton"
          onClick={this.onIncrementButtonPlusClick}
        >
          <i className="fa fa-plus" />
        </button>

        <StartStopButton
          playing={this.state.playing}
          togglePlayback={this.togglePlayback}
        />

        <TempoSelectGrid setTempo={this.setTempo} />

        <div className="volumeControl">
          <input
            type="range"
            step="10"
            value={this.state.volume}
            onChange={this.onVolumeInputChange}
          />
          <div className="volumeReadout">volume: {this.state.volume}%</div>
        </div>

        <KeyboardShortcuts />
      </div>
    );
  }
}

export default App;
