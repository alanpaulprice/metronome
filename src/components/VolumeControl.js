import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Div from '../elements/Div';
import Input from '../elements/Input';
import Icon from '../elements/Icon';

class VolumeControl extends Component {
  onVolumeInputChange = e =>
    this.props.setVolume(Number(e.currentTarget.value));

  render() {
    return (
      <Fragment>
        <Div
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Icon className="material-icons">volume_mute</Icon>
          <Input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={this.props.volume}
            onChange={this.onVolumeInputChange}
            width="50%"
            margin="0 1.25rem"
          />
          <Icon className="material-icons">volume_up</Icon>
        </Div>
        <Div width="100%" textAlign="center">
          {this.props.volume * 100}%
        </Div>
      </Fragment>
    );
  }
}

VolumeControl.propTypes = {
  volume: PropTypes.number.isRequired,
  setVolume: PropTypes.func.isRequired
};

export default VolumeControl;
