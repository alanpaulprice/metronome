import React, { Component, Fragment } from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import TempoSelectGrid from './TempoSelectGrid';
import KeyboardShortcuts from './KeyboardShortcuts';

import Wrapper from '../elements/Wrapper';
import H1 from '../elements/H1';
import Button from '../elements/Button';

const withinAllowedRange = num => num >= 40 && num <= 230;

const theme = {
  bg: '#333', //'hsl(34, 78%, 91%)',
  fg: '#ccc' //'hsl(34, 76%, 15%)'
};

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: monospace;
  }
  html {
    background: ${theme.bg};
  }
`;

class App extends Component {
  state = { tempo: 120, tempoInputValue: '120', playing: false, volume: 1 };
  TempoInputRef = React.createRef();

  togglePlaybackState = () =>
    this.setState(prevState => ({
      ...prevState,
      playing: !prevState.playing
    }));

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
  // Only blur (triggering input value update) once state has been updated
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

  onPlayStopButtonClick = () => {
    this.togglePlaybackState();
    this.state.playing
      ? this.gain.disconnect(this.audioCtx.destination)
      : this.gain.connect(this.audioCtx.destination);
  };

  onVolumeInputChange = e => this.setState({ volume: e.currentTarget.value });

  componentDidMount() {
    try {
      // Create audio context
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
      // Create gain node
      this.gain = this.audioCtx.createGain();
      this.gain.gain.value = 0.1;
      // Create oscillator
      this.osc = this.audioCtx.createOscillator();
      this.osc.type = 'sine';
      this.osc.connect(this.gain);
      this.osc.start();
    } catch (e) {
      alert('Web Audio API is not supported in this browser');
    }
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Fragment>
          <GlobalStyle />
          <Wrapper>
            <H1>metronome</H1>

            <Button noBorder onClick={this.onIncrementButtonMinusClick}>
              <i className="fa fa-minus" />
            </Button>

            <form onSubmit={this.onInputFormSubmit}>
              <input
                ref={this.TempoInputRef}
                value={this.state.tempoInputValue}
                onChange={this.onTempoInputChange}
                onFocus={this.onInputFocus}
                onBlur={this.onInputBlur}
              />
            </form>

            <Button noBorder onClick={this.onIncrementButtonPlusClick}>
              <i className="fa fa-plus" />
            </Button>

            <Button noBorder onClick={this.onPlayStopButtonClick}>
              <i className={`fa fa-${this.state.playing ? 'stop' : 'play'}`} />
            </Button>

            <TempoSelectGrid setTempo={this.setTempo} />

            <div>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={this.state.volume}
                onChange={this.onVolumeInputChange}
              />
              <div>volume: {this.state.volume * 100}%</div>
            </div>

            <KeyboardShortcuts />
          </Wrapper>
        </Fragment>
      </ThemeProvider>
    );
  }
}

export default App;
