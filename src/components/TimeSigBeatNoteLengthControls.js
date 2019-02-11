import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Div from '../elements/Div';
import Button from '../elements/Button';

const TimeSigBeatNoteLengthButton = styled(Button)`
${props => props.isSelected && 'transform: scale(1.125);'}
  opacity: ${props => (props.isSelected ? '1' : '0.5')};
  &:hover {
    ${props => props.isSelected || 'opacity: 0.75;'}
  }
`;

class TimeSigBeatNoteLengthControls extends Component {
  onTimeSigBeatNoteLengthButtonClick = e =>
    this.props.setTimeSigBeatNoteLength(e.currentTarget.value);

  render() {
    const buttons = ['2', '4', '8', '16'].map(item => (
      <TimeSigBeatNoteLengthButton
        key={item}
        value={item}
        onClick={this.onTimeSigBeatNoteLengthButtonClick}
        width="25%"
        fontSize="2.5rem"
        border="none"
        isSelected={this.props.timeSigBeatNoteLength === item}
      >
        {item}
      </TimeSigBeatNoteLengthButton>
    ));

    return <Div>{buttons}</Div>;
  }
}

TimeSigBeatNoteLengthControls.propTypes = {
  timeSigBeatNoteLength: PropTypes.string.isRequired,
  setTimeSigBeatNoteLength: PropTypes.func.isRequired
};

export default TimeSigBeatNoteLengthControls;
