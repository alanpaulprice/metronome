import React, { Component } from 'react';
import Div from '../elements/Div';
import Input from '../elements/Input';

class VolumeControl extends Component {
  onVolumeInputChange = e => this.props.setVolume(e.currentTarget.value);

  render() {
    return (
      <Div>
        <Input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={this.props.volume}
          onChange={this.onVolumeInputChange}
        />
        <Div>volume: {this.props.volume * 100}%</Div>
      </Div>
    );
  }
}

export default VolumeControl;
