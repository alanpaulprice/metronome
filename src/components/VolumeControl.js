import React, { Component } from 'react';
import Wrapper from '../elements/Wrapper';
import Slider from '../elements/Slider';

class VolumeControl extends Component {
  onVolumeInputChange = e => this.props.setVolume(e.currentTarget.value);

  render() {
    return (
      <Wrapper>
        <Slider
          min="0"
          max="1"
          step="0.1"
          value={this.props.volume}
          onChange={this.onVolumeInputChange}
        />
        <div>volume: {this.props.volume * 100}%</div>
      </Wrapper>
    );
  }
}

export default VolumeControl;
