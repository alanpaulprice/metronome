import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../elements/Button';
import { processTap, currentBeatMS } from '../tap-tempo-logic';
import SquareResponsiveDiv from '../elements/SquareResponsiveDiv';

class TapTempoButton extends Component {
  onTapTempoButtonMouseDown = () => {
    processTap();
    if (currentBeatMS) this.props.setTempo(60000 / currentBeatMS);
  };

  render() {
    return (
      <SquareResponsiveDiv width="40%">
        <Button
          onMouseDown={this.onTapTempoButtonMouseDown}
          position="absolute"
          height="100%"
          width="100%"
          fontSize="1.5rem"
          border="1px solid #ffffff"
          borderRadius="50%"
        >
          tap
        </Button>
      </SquareResponsiveDiv>
    );
  }
}

TapTempoButton.propTypes = {
  setTempo: PropTypes.func.isRequired
};

export default TapTempoButton;
