import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../elements/Button';
import { processTap, currentBeatMS } from '../tap-tempo-logic';
import Div from '../elements/Div';

class TapTempoButton extends Component {
  onTapTempoButtonMouseDown = () => {
    processTap();
    if (currentBeatMS) this.props.setTempo(parseInt(60000 / currentBeatMS));
  };

  render() {
    return (
      <Div
        width="50%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Button
          onMouseDown={this.onTapTempoButtonMouseDown}
          padding="1rem"
          fontSize="1.5rem"
          border="1px solid #ffffff"
          borderRadius="50%"
        >
          tap
        </Button>
      </Div>
    );
  }
}

TapTempoButton.propTypes = {
  setTempo: PropTypes.func.isRequired
};

export default TapTempoButton;
