import React, { Component, Fragment } from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import TempoControls from './TempoControls';
import AccentControls from './AccentControls';
import VolumeControl from './VolumeControl';
import KeyboardShortcuts from './KeyboardShortcuts';
import Sound from './Sound';

import Wrapper from '../elements/Wrapper';
import H1 from '../elements/H1';
import Button from '../elements/Button';

const minTempo = 40;
const maxTempo = 230;

const legalTempoValue = num => num >= minTempo && num <= maxTempo;
const legalAccentBeatValue = num => num >= 1 && num <= 99;
const legalVolumeValue = num => num >= 0 && num <= 1;

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
    currentBeat: 0,
    accent: false,
    accentBeat: 4,
    accentBeatInput: '4'
  };

  accentBeatInputRef = React.createRef();

  // ========== STATE MODIFICATION

  // ===== PLAYBACK

  // if playing is being toggled to false, reset currentBeat
  togglePlaying = () =>
    this.setState(prevState => ({
      ...prevState,
      playing: !prevState.playing,
      currentBeat: prevState.playing ? 0 : prevState.currentBeat
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

  // ===== BEAT

  incrementCurrentBeat = () =>
    this.setState(prevState => ({
      ...prevState,
      currentBeat:
        prevState.currentBeat < this.state.accentBeat - 1
          ? prevState.currentBeat + 1
          : 0
    }));

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

  setAccentBeatInput = value => this.setState({ accentBeatInput: value });

  // ===== VOLUME

  setVolume = value => this.setState({ volume: value });

  // only increment if the new volume is within the allowed range
  incrementVolume = incr =>
    this.setState(prevState =>
      legalVolumeValue(prevState.volume + incr)
        ? {
            ...prevState,
            volume: Math.round((prevState.volume + incr) * 10) / 10
          }
        : null
    );

  // ========== KEYBINDS

  onKeydown = code =>
    code === 32 // space
      ? this.togglePlaying()
      : code === 40 // arrow down
      ? this.incrementVolume(-0.1)
      : code === 38 // arrow up
      ? this.incrementVolume(0.1)
      : code === 37 // arrow left
      ? this.incrementTempo(-1)
      : code === 39 // arrow right
      ? this.incrementTempo(1)
      : code === 65 // a
      ? this.toggleAccent()
      : code === 90 // z
      ? this.incrementAccentBeat(-1)
      : code === 88 // x
      ? this.incrementAccentBeat(1)
      : null;
  // ========== EVENT HANDLERS

  onPlayStopButtonClick = () => this.togglePlaying();

  // ========== LIFECYCLE

  componentDidMount() {
    window.addEventListener('keydown', e => {
      this.onKeydown(e.keyCode);
    });
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', e => {
      this.onKeydown(e.keyCode);
    });
  }

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
            currentBeat={this.state.currentBeat}
            accent={this.state.accent}
            accentBeat={this.state.accentBeat}
            incrementCurrentBeat={this.incrementCurrentBeat}
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
              incrementTempo={this.incrementTempo}
              legalTempoValue={legalTempoValue}
              minTempo={minTempo}
              maxTempo={maxTempo}
            />

            <AccentControls
              accent={this.state.accent}
              accentBeat={this.state.accentBeat}
              accentBeatInput={this.state.accentBeatInput}
              toggleAccent={this.toggleAccent}
              setAccentBeat={this.setAccentBeat}
              setAccentBeatInput={this.setAccentBeatInput}
              incrementAccentBeat={this.incrementAccentBeat}
              legalAccentBeatValue={legalAccentBeatValue}
              />

            <VolumeControl
              volume={this.state.volume}
              setVolume={this.setVolume}
              />

            <KeyboardShortcuts />
          </Wrapper>
        </Fragment>
      </ThemeProvider>
    );
  }
}

export default App;
