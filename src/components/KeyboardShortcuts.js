import { Component } from 'react';

const blur = () => document.activeElement.blur();

// the or operator (||) is used to call two functions on one line
class KeyboardShortcuts extends Component {
  onKeydown = code =>
    code === 32 // space
      ? this.props.togglePlaying() || blur()
      : code === 84 // t
      ? this.props.tempoInputRef.current.focus()
      : code === 37 // arrow left
      ? this.props.incrementTempo(-1) || blur()
      : code === 39 // arrow right
      ? this.props.incrementTempo(1) || blur()
      : code === 77 // m
      ? this.props.tapTempoButtonRef.current.onTapTempoButtonMouseDown() ||
        blur()
      : code === 40 // arrow down
      ? this.props.incrementVolume(-0.1) || blur()
      : code === 38 // arrow up
      ? this.props.incrementVolume(0.1) || blur()
      : code === 66 // b
      ? this.props.accentBeatInputRef.current.focus()
      : code === 65 // a
      ? this.props.toggleAccent() || blur()
      : code === 90 // z
      ? this.props.incrementAccentBeat(-1) || blur()
      : code === 88 // x
      ? this.props.incrementAccentBeat(1) || blur()
      : null;

  componentDidMount() {
    window.addEventListener('keydown', e => this.onKeydown(e.keyCode));
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', e => this.onKeydown(e.keyCode));
  }

  render() {
    return null;
  }
}

export default KeyboardShortcuts;
