import { Component } from 'react';

class KeyboardShortcuts extends Component {
  onKeydown = code =>
    code === 32 // space
      ? this.props.togglePlaying()
      : code === 84 // t
      ? this.props.tempoInputRef.current.focus()
      : code === 37 // arrow left
      ? this.props.incrementTempo(-1)
      : code === 39 // arrow right
      ? this.props.incrementTempo(1)
      : code === 40 // arrow down
      ? this.props.incrementVolume(-0.1)
      : code === 38 // arrow up
      ? this.props.incrementVolume(0.1)
      : code === 66 // b
      ? this.props.accentBeatInputRef.current.focus()
      : code === 65 // a
      ? this.props.toggleAccent()
      : code === 90 // z
      ? this.props.incrementAccentBeat(-1)
      : code === 88 // x
      ? this.props.incrementAccentBeat(1)
      : null;

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

  render() {
    return null;
  }
}

export default KeyboardShortcuts;
