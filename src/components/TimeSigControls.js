import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TimeSigBeatsControls from './TimeSigBeatsControls';
import TimeSigBeatNoteLengthControls from './TimeSigBeatNoteLengthControls';
import Div from '../elements/Div';

class TimeSigControls extends Component {
  render() {
    return (
      <Div
        width="40%"
        display="flex"
        flexDirection="column"
        justifyContent="space-around"
      >
        <TimeSigBeatsControls
          timeSigBeats={this.props.timeSigBeats}
          timeSigBeatsInput={this.props.timeSigBeatsInput}
          setTimeSigBeats={this.props.setTimeSigBeats}
          setTimeSigBeatsInput={this.props.setTimeSigBeatsInput}
          incrementTimeSigBeats={this.props.incrementTimeSigBeats}
          MIN_TIME_SIG_BEATS={this.props.MIN_TIME_SIG_BEATS}
          MAX_TIME_SIG_BEATS={this.props.MAX_TIME_SIG_BEATS}
          timeSigBeatsInputRef={this.props.timeSigBeatsInputRef}
        />
        <TimeSigBeatNoteLengthControls
          timeSigBeatNoteLength={this.props.timeSigBeatNoteLength}
          setTimeSigBeatNoteLength={this.props.setTimeSigBeatNoteLength}
        />
      </Div>
    );
  }
}

TimeSigControls.propTypes = {
  timeSigBeats: PropTypes.number.isRequired,
  timeSigBeatNoteLength: PropTypes.string.isRequired,
  timeSigBeatsInput: PropTypes.string.isRequired,
  setTimeSigBeats: PropTypes.func.isRequired,
  setTimeSigBeatsInput: PropTypes.func.isRequired,
  incrementTimeSigBeats: PropTypes.func.isRequired,
  setTimeSigBeatNoteLength: PropTypes.func.isRequired,
  MIN_TIME_SIG_BEATS: PropTypes.number.isRequired,
  MAX_TIME_SIG_BEATS: PropTypes.number.isRequired,
  timeSigBeatsInputRef: PropTypes.shape({
    current: PropTypes.object
  }).isRequired
};

export default TimeSigControls;
