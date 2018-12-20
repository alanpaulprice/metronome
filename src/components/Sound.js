import { Component } from 'react';
import Tone from 'tone';
import closedHat from '../audio/LinnHat_C.wav';

class Sound extends Component {
  componentDidMount() {
    console.log('MOUNTED');
    Tone.Transport.bpm.value = this.props.tempo;
    this.gain = new Tone.Gain(this.props.volume).toMaster();
    this.player = new Tone.Player(closedHat).connect(this.gain);
    this.loop = new Tone.Loop(() => this.player.start(), '4n').start(0);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tempo !== this.props.tempo)
      Tone.Transport.bpm.value = this.props.tempo;

    if (prevProps.playing !== this.props.playing) Tone.Transport.toggle();

    if (prevProps.volume !== this.props.volume)
      this.gain.gain.value = this.props.volume;
  }

  render() {
    return null;
  }
}

export default Sound;
