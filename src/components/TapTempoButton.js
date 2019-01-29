import React, { Component } from 'react';
import Button from '../elements/Button';
import { processTap, currentBeatMS } from '../tap-tempo-logic';

class TapTempoButton extends Component {
  onTapTempoButtonMouseDown = () => {
    processTap();
    if (currentBeatMS) this.props.setTempo(parseInt(60000 / currentBeatMS));
  };

  render() {
    return (
      <Button
        onMouseDown={this.onTapTempoButtonMouseDown}
        padding="1rem"
        fontSize="1.5rem"
        border="1px solid #ffffff"
        borderRadius="50%"
      >
        tap
      </Button>
    );
  }
}

export default TapTempoButton;
