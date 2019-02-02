import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../elements/Button';
import Icon from '../elements/Icon';

class AccentToggleButton extends Component {
  onAccentToggleButtonClick = () => this.props.toggleAccent();

  render() {
    return (
      <Button
        onClick={this.onAccentToggleButtonClick}
        fontSize="1.5rem"
        textAlign="left"
        border="none"
      >
        accent
        <Icon className="material-icons" float="right">
          {this.props.accent
            ? 'radio_button_checked'
            : 'radio_button_unchecked'}
        </Icon>
      </Button>
    );
  }
}

AccentToggleButton.propTypes = {
  accent: PropTypes.bool.isRequired,
  toggleAccent: PropTypes.func.isRequired
};

export default AccentToggleButton;
