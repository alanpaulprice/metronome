import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import TempoSelectGrid from './TempoSelectGrid';
import KeyboardShortcuts from './KeyboardShortcuts';
import Button from './Button';

const withinAllowedRange = num => num >= 40 && num <= 230;

const theme = {
  main: 'hsl(34, 78%, 91%)',
  secondary: 'hsl(34, 76%, 15%)'
};

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

  onInputFormSubmit = async e => {
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

  onPlayStopButtonClick = () => this.togglePlayback();

  onVolumeInputChange = e => this.setState({ volume: e.currentTarget.value });

  render() {
    return (
      <ThemeProvider theme={{ theme }}>
        <div className="App">
          <h1>metronome</h1>

          <Button
            className="incrementButton"
            onClick={this.onIncrementButtonMinusClick}
          >
            <i className="fa fa-minus" />
          </Button>

          <form onSubmit={this.onInputFormSubmit}>
            <input
              className="tempoInput"
              ref={this.TempoInputRef}
              value={this.state.tempoInputValue}
              onChange={this.onTempoInputChange}
              onFocus={this.onInputFocus}
              onBlur={this.onInputBlur}
            />
          </form>

          <Button
            className="incrementButton"
            onClick={this.onIncrementButtonPlusClick}
          >
            <i className="fa fa-plus" />
          </Button>

          <Button
            className="playStopButton"
            onClick={this.onPlayStopButtonClick}
          >
            <i className={`fa fa-${this.state.playing ? 'stop' : 'play'}`} />
          </Button>

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
      </ThemeProvider>
    );
  }
}

export default App;
