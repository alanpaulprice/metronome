import React, { Component, Fragment } from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import TempoControls from './TempoControls';
import TempoSelectGrid from './TempoSelectGrid';
import KeyboardShortcuts from './KeyboardShortcuts';
import Sound from './Sound';

import Wrapper from '../elements/Wrapper';
import H1 from '../elements/H1';
import Button from '../elements/Button';

const legalTempoValue = num => num >= 40 && num <= 230;

const legalAccentBeatValue = num => num >= 1 && num <= 99;

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
    playing: false,
    tempo: 120,
    tempoInput: '120',
    volume: 1,
    accent: false,
    accentBeat: 4,
    accentBeatInput: '4'
  };

  accentBeatInputRef = React.createRef();

  // ========== STATE MODIFICATION

  // ===== PLAYBACK

  togglePlaying = () =>
    this.setState(prevState => ({
      ...prevState,
      playing: !prevState.playing
    }));

  // ===== TEMPO

  setTempo = newTempo =>
    this.setState({ tempo: newTempo, tempoInput: newTempo });

  // only increment if the new tempo is within the allowed range
  incrementTempo = incr =>
    this.setState(prevState =>
      legalTempoValue(prevState.tempo + incr)
        ? {
      ...prevState,
            tempo: prevState.tempo + incr,
            tempoInput: prevState.tempo + incr
          }
        : null
    );

  setTempoInput = value => this.setState({ tempoInput: value });

  clearTempoInput = () => this.setState({ tempoInput: '' });

  // ===== ACCENT

  toggleAccent = () =>
    this.setState(prevState => ({
      ...prevState,
      accent: !prevState.accent
    }));

  setAccentBeat = newBeat =>
    this.setState({ accentBeat: newBeat, accentBeatInput: newBeat });

  incrementAccentBeat = incr =>
    this.setState(prevState =>
      legalAccentBeatValue(prevState.accentBeat + incr)
        ? {
            ...prevState,
            accentBeat: prevState.accentBeat + incr,
            accentBeatInput: prevState.accentBeat + incr
          }
        : null
    );

  // ========== EVENT HANDLERS

  // ===== PLAYBACK / VOLUME

  onPlayStopButtonClick = () => {
    this.togglePlaying();
  };

  onVolumeInputChange = e => {
    this.setState({ volume: e.currentTarget.value });
  };

  // ===== ACCENT

  onAccentToggleButtonClick = () => this.toggleAccent();

  // if the value isn't a valid accent beat, do nothing
  // blur (triggering input value update) after state has been updated
  onAccentBeatInputFormSubmit = async e => {
    e.preventDefault();
    const newAccentBeat = parseInt(this.state.accentBeatInput);
    if (!legalAccentBeatValue(newAccentBeat)) return;
    await this.setAccentBeat(newAccentBeat);
    this.accentBeatInputRef.current.blur();
  };

  onAccentBeatInputFocus = () => this.setState({ accentBeatInput: '' });

  onAccentBeatInputBlur = () =>
    this.setState({ accentBeatInput: this.state.accentBeat });

  // only allows 2 digits to be entered
  onAccentBeatInputChange = e =>
    this.setState({
      accentBeatInput: e.currentTarget.value.replace(/\D/g, '').slice(0, 2)
    });

  onIncrementAccentBeatButtonClick = e =>
    this.incrementAccentBeat(parseInt(e.currentTarget.value));

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

            <Button noBorder onClick={this.onPlayStopButtonClick}>
              <i className={`fa fa-${this.state.playing ? 'stop' : 'play'}`} />
            </Button>

            <TempoControls
              tempo={this.state.tempo}
              setTempo={this.setTempo}
              tempoInput={this.state.tempoInput}
              setTempoInput={this.setTempoInput}
              clearTempoInput={this.clearTempoInput}
              incrementTempo={this.incrementTempo}
              legalTempoValue={legalTempoValue}
            />

            <label>
              Accent
              <Button name="accent" onClick={this.onAccentToggleButtonClick}>
                {this.state.accent ? 'On' : 'Off'}
            </Button>
              <Button
                noBorder
                value={-1}
                onClick={this.onIncrementAccentBeatButtonClick}
              >
                <i className="fa fa-minus" />
              </Button>
              <form onSubmit={this.onAccentBeatInputFormSubmit}>
              <input
                  ref={this.accentBeatInputRef}
                value={this.state.accentBeatInput}
                onChange={this.onAccentBeatInputChange}
                  onFocus={this.onAccentBeatInputFocus}
                  onBlur={this.onAccentBeatInputBlur}
              />
              </form>
              <Button
                noBorder
                value={1}
                onClick={this.onIncrementAccentBeatButtonClick}
              >
                <i className="fa fa-plus" />
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
