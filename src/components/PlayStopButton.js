import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../elements/Button';
import Icon from '../elements/Icon';

class PlayStopButton extends Component {
  onPlayStopButtonClick = () => this.props.togglePlaying();

  render() {
    return (
      <Button
        onClick={this.onPlayStopButtonClick}
        borderWidth="0"
        marginTop="5rem"
      >
        <Icon className="material-icons" fontSize="12.5rem">
          {this.props.playing ? 'stop' : 'play_arrow'}
        </Icon>
      </Button>
    );
  }
}

PlayStopButton.propTypes = {
  playing: PropTypes.bool.isRequired,
  togglePlaying: PropTypes.func.isRequired
};

export default PlayStopButton;
