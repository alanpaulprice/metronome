import { Component } from 'react';
import Tone from 'tone';
import closedHat from '../audio/LinnHat_C.wav';
import openHat from '../audio/LinnHat_O.wav';

class Sound extends Component {
  componentDidMount() {
    // set the tempo and prepare audio components
    Tone.Transport.bpm.value = this.props.tempo;
    this.gain = new Tone.Gain(this.props.volume).toMaster();
    this.chh = new Tone.Player(closedHat).connect(this.gain);
    this.ohh = new Tone.Player(openHat).connect(this.gain);

    // loop one quarter note and increment the currentBeat
    // if currentBeat is 0 and accent is enabled, the note will be accented
    Tone.Transport.scheduleRepeat(time => {
      this[this.props.accent && !this.props.currentBeat ? 'ohh' : 'chh'].start(
        time,
        0,
        '4n'
      );
      this.props.incrementCurrentBeat();
    }, '4n');
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tempo !== this.props.tempo)
      Tone.Transport.bpm.value = this.props.tempo;

    if (prevProps.playing !== this.props.playing)
      Tone.context.ready(Tone.Transport.toggle());

    if (prevProps.volume !== this.props.volume)
      this.gain.gain.value = this.props.volume;
  }

  render() {
    return null;
  }
}

export default Sound;
