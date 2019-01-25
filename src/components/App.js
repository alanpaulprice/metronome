import React, { Component, Fragment } from 'react';
import { ThemeProvider } from 'styled-components';

import Sound from './Sound';
import KeyboardShortcuts from './KeyboardShortcuts';

import TempoControls from './TempoControls';
import AccentControls from './AccentControls';
import VolumeControl from './VolumeControl';
import KeyboardShortcutsLegend from './KeyboardShortcutsLegend';

import Div from '../elements/Div';
import H1 from '../elements/H1';
import Button from '../elements/Button';
import Icon from '../elements/Icon';

import GlobalStyle from '../GlobalStyle';
import StyleTheme from '../StyleTheme';

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

  // ===== SHORTCUTS

  toggleDisplayShortcuts = () =>
    this.setState(prevState => ({
      ...prevState,
      displayShortcuts: !prevState.displayShortcuts
    }));

  // ========== EVENT HANDLERS

  onPlayStopButtonClick = () => this.togglePlaying();

  onKeyboardShortcutsButtonClick = () => this.toggleDisplayShortcuts();

  // ========== RENDER

  render() {
    return (
      <ThemeProvider theme={StyleTheme}>
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
            tapTempoButtonRef={this.tapTempoButtonRef}
          />

          <KeyboardShortcutsLegend
            displayShortcuts={this.state.displayShortcuts}
            toggleDisplayShortcuts={this.toggleDisplayShortcuts}
          />

          <Button
            onClick={this.onKeyboardShortcutsButtonClick}
            position="fixed"
            top="0"
            right="0"
            height="3.75rem"
            width="3.75rem"
            padding="0"
            fontSize="2.5rem"
            fontWeight="900"
            vertical-align="center"
            borderWidth="0"
            color={this.state.displayShortcuts ? '#ffffff' : StyleTheme.fg}
            background="transparent"
            transition="color 0.2s"
          >
            {this.state.displayShortcuts ? 'X' : '?'}
          </Button>

          <Div display="flex" flexDirection="column" alignItems="center">
            <H1
              fontSize="5rem"
              fontWeight="900"
              letterSpacing="-0.425rem"
              marginTop="5rem"
            >
              metronome
            </H1>

            <Button
              onClick={this.onPlayStopButtonClick}
              borderWidth="0"
              fontSize="7.5rem"
              marginTop="5rem"
            >
              <Icon className="material-icons" fontSize="12.5rem">
                {this.state.playing ? 'stop' : 'play_arrow'}
              </Icon>
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
