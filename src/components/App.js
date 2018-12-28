import React, { Component, Fragment } from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import TempoSelectGrid from './TempoSelectGrid';
import KeyboardShortcuts from './KeyboardShortcuts';
import Sound from './Sound';

import Wrapper from '../elements/Wrapper';
import H1 from '../elements/H1';
import Button from '../elements/Button';

const withinAllowedTempoRange = num => num >= 40 && num <= 230;

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
  state = {
    tempo: 120,
    tempoInputValue: '120',
    playing: false,
    volume: 1,
    accent: false,
    accentBeat: 4,
    accentBeatInput: '4'
  };

  TempoInputRef = React.createRef();

  // ========== STATE MODIFICATION

  // ===== PLAYING

  togglePlaying = () =>
    this.setState(prevState => ({
      ...prevState,
      playing: !prevState.playing
    }));

  // ===== TEMPO

  setTempo = newTempo =>
    this.setState({ tempo: newTempo, tempoInputValue: newTempo });

  // only increment if the new tempo is within the allowed range
  incrementTempo = incr =>
    this.setState(prevState => ({
      ...prevState,
      tempo: withinAllowedTempoRange(prevState.tempo + incr)
        ? prevState.tempo + incr
        : prevState.tempo,
      tempoInputValue: withinAllowedTempoRange(prevState.tempo + incr)
        ? prevState.tempo + incr
        : prevState.tempo
    }));

  // ===== ACCENT

  toggleAccent = () =>
    this.setState(prevState => ({
      ...prevState,
      accent: !prevState.accent
    }));

  setAccentBeat = beat => {
    this.setState({ accentBeat: beat });
  };

  // ========== EVENT HANDLERS

  // blur (triggering input value update) after state has been updated
  onInputFormSubmit = async e => {
    e.preventDefault();
    const newTempo = parseInt(this.state.tempoInputValue);
    if (withinAllowedTempoRange(newTempo))
      await this.setTempo(parseInt(this.state.tempoInputValue));
    this.TempoInputRef.current.blur();
  };

  // only allows 3 digits to be entered
  onTempoInputChange = e =>
    this.setState({
      tempoInputValue: e.currentTarget.value.replace(/\D/g, '').slice(0, 3)
    });

  onInputFocus = () => this.setState({ tempoInputValue: '' });

  onInputBlur = () => this.setState({ tempoInputValue: this.state.tempo });

  onIncrementTempoButtonClick = e =>
    this.incrementTempo(Number(e.currentTarget.value));

  onPlayStopButtonClick = () => {
    this.togglePlaying();
  };

  onVolumeInputChange = e => {
    this.setState({ volume: e.currentTarget.value });
  };

  onAccentToggleButtonClick = () => this.toggleAccent();

  // ========== RENDER

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Fragment>
          <GlobalStyle />
          <Sound
            tempo={this.state.tempo}
            playing={this.state.playing}
            volume={this.state.volume}
            accent={this.state.accent}
          />
          <Wrapper>
            <H1>metronome</H1>
            <label>
              Tempo
              <Button
                noBorder
                value={-1}
                onClick={this.onIncrementTempoButtonClick}
              >
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
              <Button
                noBorder
                value={1}
                onClick={this.onIncrementTempoButtonClick}
              >
              <i className="fa fa-plus" />
            </Button>
            </label>

            <Button noBorder onClick={this.onPlayStopButtonClick}>
              <i className={`fa fa-${this.state.playing ? 'stop' : 'play'}`} />
            </Button>

            <label>
              Accent
              <Button name="accent" onClick={this.onAccentToggleButtonClick}>
                {this.state.accent ? 'On' : 'Off'}
            </Button>
            </label>

            <TempoSelectGrid setTempo={this.setTempo} />

            <div>
              <input
                type="range"
                min="0"
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
