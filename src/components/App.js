import React, { Component, Fragment } from 'react';
import { ThemeProvider } from 'styled-components';
import Sound from './Sound';
import KeyboardShortcuts from './KeyboardShortcuts';
import PlayStopButton from './PlayStopButton';
import TempoInputAndButtons from './TempoInputAndButtons';
import TempoSlider from './TempoSlider';
import TapTempoButton from './TapTempoButton';
import AccentControls from './AccentControls';
import VolumeControl from './VolumeControl';
import AccentToggleButton from './AccentToggleButton';
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
const legalTimeSigBeatsValue = num =>
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
    timeSigBeats: 4,
    timeSigBeatsInput: '4',
    timeSigBeatNoteLength: '',
    displayShortcuts: false
  };

  // ========== REFS

  tempoInputRef = React.createRef();
  timeSigBeatsInputRef = React.createRef();
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
        prevState.currentBeat < this.state.timeSigBeats - 1
          ? prevState.currentBeat + 1
          : 0
    }));

  // ===== ACCENT

  toggleAccent = () =>
    this.setState(prevState => ({
      ...prevState,
      accent: !prevState.accent
    }));

  setTimeSigBeats = newBeat => this.setState({ timeSigBeats: newBeat });

  incrementTimeSigBeats = incr =>
    this.setState(prevState =>
      legalTimeSigBeatsValue(prevState.timeSigBeats + incr)
        ? {
            ...prevState,
            timeSigBeats: prevState.timeSigBeats + incr,
            timeSigBeatsInput: String(prevState.timeSigBeats + incr)
          }
        : null
    );

  setTimeSigBeatsInput = value => this.setState({ timeSigBeatsInput: value });

  // ===== TIME SIG BEAT NOTE LENGTH

  setTimeSigBeatNoteLength = newValue =>
    this.setState({ timeSigBeatNoteLength: newValue });

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
            timeSigBeats={this.state.timeSigBeats}
            incrementCurrentBeat={this.incrementCurrentBeat}
          />

          <KeyboardShortcuts
            togglePlaying={this.togglePlaying}
            incrementTempo={this.incrementTempo}
            incrementVolume={this.incrementVolume}
            toggleAccent={this.toggleAccent}
            incrementTimeSigBeats={this.incrementTimeSigBeats}
            tempoInputRef={this.tempoInputRef}
            timeSigBeatsInputRef={this.timeSigBeatsInputRef}
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

            <TempoInputAndButtons
              tempo={this.state.tempo}
              tempoInput={this.state.tempoInput}
              setTempo={this.setTempo}
              setTempoInput={this.setTempoInput}
              incrementTempo={this.incrementTempo}
              MIN_TEMPO={MIN_TEMPO}
              MAX_TEMPO={MAX_TEMPO}
              tempoInputRef={this.tempoInputRef}
            />

            <TempoSlider
              tempo={this.state.tempo}
              setTempo={this.setTempo}
              MIN_TEMPO={MIN_TEMPO}
              MAX_TEMPO={MAX_TEMPO}
            />

            <TapTempoButton
              setTempo={this.setTempo}
              tapTempoButtonRef={this.tapTempoButtonRef}
            />

            <AccentControls
              timeSigBeats={this.state.timeSigBeats}
              timeSigBeatsInput={this.state.timeSigBeatsInput}
              setTimeSigBeats={this.setTimeSigBeats}
              setTimeSigBeatsInput={this.setTimeSigBeatsInput}
              incrementTimeSigBeats={this.incrementTimeSigBeats}
              MIN_ACCENT_BEAT={MIN_ACCENT_BEAT}
              MAX_ACCENT_BEAT={MAX_ACCENT_BEAT}
              timeSigBeatsInputRef={this.timeSigBeatsInputRef}
            />

            <VolumeControl
              volume={this.state.volume}
              setVolume={this.setVolume}
            />

            <AccentToggleButton
              accent={this.state.accent}
              toggleAccent={this.toggleAccent}
            />
          </Div>
        </Fragment>
      </ThemeProvider>
    );
  }
}

export default App;
