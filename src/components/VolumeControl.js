import React, { Component } from 'react';

import Div from '../elements/Div';
import Input from '../elements/Input';
import Icon from '../elements/Icon';

class VolumeControl extends Component {
  onVolumeInputChange = e => this.props.setVolume(e.currentTarget.value);

  render() {
    return (
      <Div>
        <Icon className="material-icons">volume_mute</Icon>
        <Input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={this.props.volume}
          onChange={this.onVolumeInputChange}
        />
        <Icon className="material-icons">volume_up</Icon>
        <Div textAlign="center">{this.props.volume * 100}%</Div>
      </Div>
    );
  }
}

export default VolumeControl;
