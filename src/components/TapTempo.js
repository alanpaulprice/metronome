import React, { Component } from 'react';
import Button from '../elements/Button';
import { processTap, currentBeatMS } from '../tap-tempo-logic';

class TapTempo extends Component {
  onTapTempoButtonMouseDown = () => {
    processTap();
    if (currentBeatMS) this.props.setTempo(parseInt(60000 / currentBeatMS));
  };

  render() {
    return (
      <Button
        onMouseDown={this.onTapTempoButtonMouseDown}
        fontSize="1.5rem"
        padding="1rem"
      >
        Tap Tempo
      </Button>
    );
  }
}

export default TapTempo;
