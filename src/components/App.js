import React, { Component, Fragment } from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import Sound from './Sound';
import KeyboardShortcuts from './KeyboardShortcuts';

import TempoControls from './TempoControls';
import AccentControls from './AccentControls';
import VolumeControl from './VolumeControl';
import KeyboardShortcutsLegend from './KeyboardShortcutsLegend';

import Wrapper from '../elements/Wrapper';
import H1 from '../elements/H1';
import Button from '../elements/Button';

const MIN_TEMPO = 40;
const MAX_TEMPO = 280;

const legalTempoValue = num => num >= MIN_TEMPO && num <= MAX_TEMPO;
const legalAccentBeatValue = num => num >= 1 && num <= 99;
const legalVolumeValue = num => num >= 0 && num <= 1;

const theme = {
  bg: '#555', //'hsl(34, 78%, 91%)',
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

  tempoInputRef = React.createRef();
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

  // ========== EVENT HANDLERS

  onPlayStopButtonClick = () => this.togglePlaying();

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

          <KeyboardShortcuts
          togglePlaying={this.togglePlaying}
            tempoInputRef={this.tempoInputRef}
          incrementTempo={this.incrementTempo}
          incrementVolume={this.incrementVolume}
          toggleAccent={this.toggleAccent}
          incrementAccentBeat={this.incrementAccentBeat}
            accentBeatInputRef={this.accentBeatInputRef}
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
              MIN_TEMPO={MIN_TEMPO}
              MAX_TEMPO={MAX_TEMPO}
              tempoInputRef={this.tempoInputRef}
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
              accentBeatInputRef={this.accentBeatInputRef}
              />

            <VolumeControl
              volume={this.state.volume}
              setVolume={this.setVolume}
              />

            <KeyboardShortcutsLegend />
          </Wrapper>
        </Fragment>
      </ThemeProvider>
    );
  }
}

export default App;
