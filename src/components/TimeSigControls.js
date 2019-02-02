import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TimeSigBeatsControls from './TimeSigBeatsControls';
import Div from '../elements/Div';

class TimeSigControls extends Component {
  render() {
    return (
      <Div>
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
