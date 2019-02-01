import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
        ref={this.props.tapTempoButtonRef}
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

TapTempoButton.propTypes = {
  setTempo: PropTypes.func.isRequired,
  tapTempoButtonRef: PropTypes.shape({
    current: PropTypes.object
  }).isRequired
};

export default TapTempoButton;
