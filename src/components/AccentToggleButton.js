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
        marginTop="5rem"
        fontSize="2.5rem"
        lineHeight="1.5"
        border="none"
      >
        accent
        <br />
        <Icon
          className="material-icons"
          fontSize="3.75rem"
          opacity={this.props.accent ? '1' : '0.5'}
        >
          power_settings_new
          {/* {this.props.accent
            ? 'radio_button_checked'
            : 'radio_button_unchecked'} */}
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
