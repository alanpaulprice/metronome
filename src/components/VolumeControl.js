import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Div from '../elements/Div';
import RangeInput from '../elements/RangeInput';
import Icon from '../elements/Icon';

class VolumeControl extends Component {
  onVolumeInputChange = e =>
    this.props.setVolume(Number(e.currentTarget.value));

  render() {
    return (
      <Fragment>
        <Div
          width="100%"
          marginTop="5rem"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Icon className="material-icons">volume_mute</Icon>
          <RangeInput
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
      </Fragment>
    );
  }
}

VolumeControl.propTypes = {
  volume: PropTypes.number.isRequired,
  setVolume: PropTypes.func.isRequired
};

export default VolumeControl;
