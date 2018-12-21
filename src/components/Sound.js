import { Component } from 'react';
import Tone from 'tone';
import closedHat from '../audio/LinnHat_C.wav';
import openHat from '../audio/LinnHat_O.wav';

class Sound extends Component {
  componentDidMount() {
    // set initial tempo, initialise and connect audio components
    Tone.Transport.bpm.value = this.props.tempo;
    this.gain = new Tone.Gain(this.props.volume).toMaster();
    this.chh = new Tone.Player(closedHat).connect(this.gain);
    this.ohh = new Tone.Player(openHat).connect(this.gain);

    this.loop = new Tone.Loop(() => {
      this[this.props.accent ? 'ohh' : 'chh'].start(Tone.now(), 0, '4n');
      this.chh.start('+4n');
      this.chh.start('+2n');
      this.chh.start('+2n.');
    }, '1n').start(0);
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
