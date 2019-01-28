import React, { Component } from 'react';

import Button from '../elements/Button';
import Icon from '../elements/Icon';

class PlayStopButton extends Component {
  onPlayStopButtonClick = () => this.props.togglePlaying();

  render() {
    return (
      <Button
        onClick={this.onPlayStopButtonClick}
        borderWidth="0"
        fontSize="7.5rem"
        marginTop="5rem"
      >
        <Icon className="material-icons" fontSize="12.5rem">
          {this.props.playing ? 'stop' : 'play_arrow'}
        </Icon>
      </Button>
    );
  }
}

export default PlayStopButton;
