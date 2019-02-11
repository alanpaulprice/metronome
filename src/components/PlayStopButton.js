import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../elements/Button';
import Icon from '../elements/Icon';
import Div from '../elements/Div';

class PlayStopButton extends Component {
  onPlayStopButtonClick = () => this.props.togglePlaying();

  render() {
    return (
      <Div display="flex" justifyContent="center" marginTop="5rem">
        <Button onClick={this.onPlayStopButtonClick} border="none" scaleOnHover>
          <Icon className="material-icons" fontSize="12.5rem">
            {this.props.playing ? 'stop' : 'play_arrow'}
          </Icon>
        </Button>
      </Div>
    );
  }
}

PlayStopButton.propTypes = {
  playing: PropTypes.bool.isRequired,
  togglePlaying: PropTypes.func.isRequired
};

export default PlayStopButton;
