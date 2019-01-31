import React, { Component, Fragment } from 'react';
import { ThemeProvider } from 'styled-components';
import Sound from './Sound';
import KeyboardShortcuts from './KeyboardShortcuts';
import PlayStopButton from './PlayStopButton';
import TempoControls from './TempoControls';
import AccentControls from './AccentControls';
import VolumeControl from './VolumeControl';
import KeyboardShortcutsButton from './KeyboardShortcutsButton';
import KeyboardShortcutsLegend from './KeyboardShortcutsLegend';
import Div from '../elements/Div';
import H1 from '../elements/H1';
import { Theme, GlobalStyles } from '../styles';

const MIN_TEMPO = 40;
const MAX_TEMPO = 280;
const MIN_ACCENT_BEAT = 1;
const MAX_ACCENT_BEAT = 99;

const legalTempoValue = num => num >= MIN_TEMPO && num <= MAX_TEMPO;
const legalAccentBeatValue = num =>
  num >= MIN_ACCENT_BEAT && num <= MAX_ACCENT_BEAT;
const legalVolumeValue = num => num >= 0 && num <= 1;

class App extends Component {
  state = {
    playing: false,
    tempo: 120,
    tempoInput: '120',
    volume: 1,
    currentBeat: 0,
    accent: false,
    accentBeat: 4,
    accentBeatInput: '4',
    displayShortcuts: false
  };

  // ========== REFS

  tempoInputRef = React.createRef();
  accentBeatInputRef = React.createRef();
  tapTempoButtonRef = React.createRef();

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

  setTempo = newTempo => this.setState({ tempo: newTempo });

  // only increment if the new tempo is within the allowed range
  incrementTempo = incr =>
    this.setState(prevState =>
      legalTempoValue(prevState.tempo + incr)
        ? {
            ...prevState,
            tempo: prevState.tempo + incr,
            tempoInput: String(prevState.tempo + incr)
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

  setAccentBeat = newBeat => this.setState({ accentBeat: newBeat });

  incrementAccentBeat = incr =>
    this.setState(prevState =>
      legalAccentBeatValue(prevState.accentBeat + incr)
        ? {
            ...prevState,
            accentBeat: prevState.accentBeat + incr,
            accentBeatInput: String(prevState.accentBeat + incr)
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

  // ===== SHORTCUTS

  toggleDisplayShortcuts = () =>
    this.setState(prevState => ({
      ...prevState,
      displayShortcuts: !prevState.displayShortcuts
    }));

  // ========== RENDER

  render() {
    return (
      <ThemeProvider theme={Theme}>
        <Fragment>
          <GlobalStyles />
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
            incrementTempo={this.incrementTempo}
            incrementVolume={this.incrementVolume}
            toggleAccent={this.toggleAccent}
            incrementAccentBeat={this.incrementAccentBeat}
            tempoInputRef={this.tempoInputRef}
            accentBeatInputRef={this.accentBeatInputRef}
            tapTempoButtonRef={this.tapTempoButtonRef}
          />

          <KeyboardShortcutsLegend
            displayShortcuts={this.state.displayShortcuts}
            toggleDisplayShortcuts={this.toggleDisplayShortcuts}
          />

          <KeyboardShortcutsButton
            displayShortcuts={this.state.displayShortcuts}
            toggleDisplayShortcuts={this.toggleDisplayShortcuts}
          />

          <Div display="flex" flexDirection="column" alignItems="center">
            <H1
              fontSize="5rem"
              fontWeight="900"
              letterSpacing="-0.425rem"
              marginTop="5rem"
            >
              metronome
            </H1>

            <PlayStopButton
              playing={this.state.playing}
              togglePlaying={this.togglePlaying}
            />

            <TempoControls
              tempo={this.state.tempo}
              tempoInput={this.state.tempoInput}
              setTempo={this.setTempo}
              setTempoInput={this.setTempoInput}
              incrementTempo={this.incrementTempo}
              legalTempoValue={legalTempoValue}
              MIN_TEMPO={MIN_TEMPO}
              MAX_TEMPO={MAX_TEMPO}
              tempoInputRef={this.tempoInputRef}
              tapTempoButtonRef={this.tapTempoButtonRef}
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
              MIN_ACCENT_BEAT={MIN_ACCENT_BEAT}
              MAX_ACCENT_BEAT={MAX_ACCENT_BEAT}
              accentBeatInputRef={this.accentBeatInputRef}
            />

            <VolumeControl
              volume={this.state.volume}
              setVolume={this.setVolume}
            />
          </Div>
        </Fragment>
      </ThemeProvider>
    );
  }
}

export default App;
