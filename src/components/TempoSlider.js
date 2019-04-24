import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RangeInput from '../elements/RangeInput';

class TempoSlider extends Component {
  onTempoSliderChange = e => this.props.setTempo(e.currentTarget.value);

  render() {
    return (
      <RangeInput
        type="range"
        min={this.props.MIN_TEMPO}
        max={this.props.MAX_TEMPO}
        step={1}
        value={this.props.tempo}
        onChange={this.onTempoSliderChange}
        width="100%"
        marginTop="5rem"
      />
    );
  }
}

TempoSlider.propTypes = {
  tempo: PropTypes.number.isRequired,
  setTempo: PropTypes.func.isRequired,
  MIN_TEMPO: PropTypes.number.isRequired,
  MAX_TEMPO: PropTypes.number.isRequired
};

export default TempoSlider;
