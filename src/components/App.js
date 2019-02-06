import React, { Component, Fragment } from 'react';
import { ThemeProvider } from 'styled-components';
import Sound from './Sound';
import KeyboardShortcuts from './KeyboardShortcuts';
import KeyboardShortcutsLegend from './KeyboardShortcutsLegend';
import KeyboardShortcutsButton from './KeyboardShortcutsButton';
import Header from './Header';
import PlayStopButton from './PlayStopButton';
import TempoInputAndButtons from './TempoInputAndButtons';
import TempoSlider from './TempoSlider';
import TapTempoButton from './TapTempoButton';
import TimeSigControls from './TimeSigControls';
import VolumeControl from './VolumeControl';
import AccentToggleButton from './AccentToggleButton';
import Div from '../elements/Div';
import { Theme, GlobalStyles } from '../styles';

const MIN_TEMPO = 40;
const MAX_TEMPO = 280;
const MIN_TIME_SIG_BEATS = 1;
const MAX_TIME_SIG_BEATS = 99;

const legalTempoValue = num => num >= MIN_TEMPO && num <= MAX_TEMPO;
const legalTimeSigBeatsValue = num =>
  num >= MIN_TIME_SIG_BEATS && num <= MAX_TIME_SIG_BEATS;
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
    timeSigBeatNoteLength: '4',
    displayShortcuts: false
  };

  // ========== REFS

  tempoInputRef = React.createRef();
  timeSigBeatsInputRef = React.createRef();
  tapTempoButtonRef = React.createRef(); // for the component, not the dom node

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

  setTempo = newTempo => {
    newTempo = parseInt(newTempo);

    // if the value isn't within the allowed range, use closest allowed value
    if (newTempo < MIN_TEMPO) newTempo = MIN_TEMPO;
    else if (newTempo > MAX_TEMPO) newTempo = MAX_TEMPO;

    this.setState({ tempo: newTempo });
  };

  // only increment if the new tempo is within the allowed range
  incrementTempo = incr => {
    incr = parseInt(incr);

    this.setState(prevState =>
      // only update state if new value is within allowed range
      legalTempoValue(prevState.tempo + incr)
        ? {
            ...prevState,
            tempo: prevState.tempo + incr,
            tempoInput: String(prevState.tempo + incr)
          }
        : null
    );
  };

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

  // ===== TIME SIG BEATS

  setTimeSigBeats = newTimeSigBeats => {
    newTimeSigBeats = parseInt(newTimeSigBeats);

    // if the value isn't within the allowed range, use closest allowed value
    if (newTimeSigBeats < MIN_TIME_SIG_BEATS)
      newTimeSigBeats = MIN_TIME_SIG_BEATS;
    else if (newTimeSigBeats > MAX_TIME_SIG_BEATS)
      newTimeSigBeats = MAX_TIME_SIG_BEATS;

    this.setState({ timeSigBeats: newTimeSigBeats });
  };

  incrementTimeSigBeats = incr => {
    incr = parseInt(incr);

    this.setState(prevState =>
      // only update state if new value is within allowed range
      legalTimeSigBeatsValue(prevState.timeSigBeats + incr)
        ? {
            ...prevState,
            timeSigBeats: prevState.timeSigBeats + incr,
            timeSigBeatsInput: String(prevState.timeSigBeats + incr)
          }
        : null
    );
  };

  setTimeSigBeatsInput = value => this.setState({ timeSigBeatsInput: value });

  // ===== TIME SIG BEAT NOTE LENGTH

  setTimeSigBeatNoteLength = newTimeSigBeatNoteLength =>
    this.setState({
      timeSigBeatNoteLength: newTimeSigBeatNoteLength
    });

  // ===== VOLUME

  setVolume = value => this.setState({ volume: value });

  incrementVolume = incr =>
    this.setState(prevState =>
      // only update state if new value is within allowed range
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
            timeSigBeatNoteLength={this.state.timeSigBeatNoteLength}
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
            <Header />

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

            <Div
              width="100%"
              marginTop="5rem"
              display="flex"
              justifyContent="space-between"
            >
              <TapTempoButton
                setTempo={this.setTempo}
                ref={this.tapTempoButtonRef}
              />

              <Div // vertical rule
                heigh="100%"
                width="5px"
                background="#ffffff"
                opacity="0.1"
              />

              <TimeSigControls
                timeSigBeats={this.state.timeSigBeats}
                timeSigBeatNoteLength={this.state.timeSigBeatNoteLength}
                timeSigBeatsInput={this.state.timeSigBeatsInput}
                setTimeSigBeats={this.setTimeSigBeats}
                setTimeSigBeatsInput={this.setTimeSigBeatsInput}
                incrementTimeSigBeats={this.incrementTimeSigBeats}
                setTimeSigBeatNoteLength={this.setTimeSigBeatNoteLength}
                MIN_TIME_SIG_BEATS={MIN_TIME_SIG_BEATS}
                MAX_TIME_SIG_BEATS={MAX_TIME_SIG_BEATS}
                timeSigBeatsInputRef={this.timeSigBeatsInputRef}
              />
            </Div>

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
