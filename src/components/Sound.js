import { Component } from 'react';
import PropTypes from 'prop-types';
import Tone from 'tone';
import closedHat from '../audio/LinnHat_C.wav';
import openHat from '../audio/LinnHat_O.wav';

class Sound extends Component {
  updateLoop = () => {
    this.loop.callback = time => {
      this[this.props.accent && !this.props.currentBeat ? 'ohh' : 'chh'].start(
        time,
        0,
        `${this.props.timeSigBeatNoteLength}n`
      );
      this.props.incrementCurrentBeat();
    };
    this.loop.interval = `${this.props.timeSigBeatNoteLength}n`;
  };

  componentDidMount() {
    Tone.Transport.bpm.value = this.props.tempo;
    this.gain = new Tone.Gain(this.props.volume).toMaster();
    this.chh = new Tone.Player(closedHat).connect(this.gain);
    this.ohh = new Tone.Player(openHat).connect(this.gain);

    this.loop = new Tone.Loop().start(0);
    this.updateLoop();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tempo !== this.props.tempo)
      Tone.Transport.bpm.value = this.props.tempo;

    if (prevProps.playing !== this.props.playing)
      Tone.context.ready(Tone.Transport.toggle());

    if (prevProps.volume !== this.props.volume)
      this.gain.gain.value = this.props.volume;

    if (prevProps.timeSigBeatNoteLength !== this.props.timeSigBeatNoteLength)
      this.updateLoop();
  }

  render() {
    return null;
  }
}

Sound.propTypes = {
  tempo: PropTypes.number.isRequired,
  playing: PropTypes.bool.isRequired,
  volume: PropTypes.number.isRequired,
  currentBeat: PropTypes.number.isRequired,
  accent: PropTypes.bool.isRequired,
  timeSigBeats: PropTypes.number.isRequired,
  timeSigBeatNoteLength: PropTypes.number.isRequired,
  incrementCurrentBeat: PropTypes.func.isRequired
};

export default Sound;
