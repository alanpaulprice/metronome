import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Div from '../elements/Div';
import Button from '../elements/Button';

class TimeSigBeatNoteLengthControls extends Component {
  onTimeSigBeatNoteLengthButtonClick = e =>
    this.props.setTimeSigBeatNoteLength(e.currentTarget.value);

  render() {
    const buttons = ['2', '4', '8', '16'].map(item => (
      <Button
        key={item}
        value={item}
        onClick={this.onTimeSigBeatNoteLengthButtonClick}
        fontSize="2.5rem"
        border="none"
        opacity={this.props.timeSigBeatNoteLength === item ? '1' : '0.5'}
      >
        {item}
      </Button>
    ));

    return <Div>{buttons}</Div>;
  }
}

TimeSigBeatNoteLengthControls.propTypes = {
  timeSigBeatNoteLength: PropTypes.string.isRequired,
  setTimeSigBeatNoteLength: PropTypes.func.isRequired
};

export default TimeSigBeatNoteLengthControls;
