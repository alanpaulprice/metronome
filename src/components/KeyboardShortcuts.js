import { Component } from 'react';

class KeyboardShortcuts extends Component {
  incrementTempoAndBlur = value => {
    this.props.incrementTempo(value);
    document.activeElement.blur();
  };

  incrementAccentBeatAndBlur = value => {
    this.props.incrementAccentBeat(value);
    document.activeElement.blur();
  };

  onKeydown = code =>
    code === 32 // space
      ? this.props.togglePlaying()
      : code === 84 // t
      ? this.props.tempoInputRef.current.focus()
      : code === 37 // arrow left
      ? this.incrementTempoAndBlur(-1)
      : code === 39 // arrow right
      ? this.incrementTempoAndBlur(1)
      : code === 40 // arrow down
      ? this.props.incrementVolume(-0.1)
      : code === 38 // arrow up
      ? this.props.incrementVolume(0.1)
      : code === 66 // b
      ? this.props.accentBeatInputRef.current.focus()
      : code === 65 // a
      ? this.props.toggleAccent()
      : code === 90 // z
      ? this.incrementAccentBeatAndBlur(-1)
      : code === 88 // x
      ? this.incrementAccentBeatAndBlur(1)
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
