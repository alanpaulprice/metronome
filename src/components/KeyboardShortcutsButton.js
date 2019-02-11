import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../elements/Button';

class KeyboardShortcutsButton extends Component {
  onKeyboardShortcutsButtonClick = () => this.props.toggleDisplayShortcuts();

  render() {
    return (
      <Button
        onClick={this.onKeyboardShortcutsButtonClick}
        position={this.props.displayShortcuts ? 'fixed' : 'absolute'}
        top="1.25rem"
        right="1.25rem"
        display="flex"
        height="2.75rem"
        width="2.75rem"
        padding="0"
        fontSize="1.5rem"
        fontWeight="900"
        lineHeight="1.5rem"
        color={this.props.displayShortcuts ? '#ffffff' : undefined}
        background="transparent"
        border="2.5px solid"
        borderRadius="50%"
        transition="color 0.2s"
        zIndex="10"
        scaleOnHover
      >
        {this.props.displayShortcuts ? 'x' : '?'}
      </Button>
    );
  }
}

KeyboardShortcutsButton.propTypes = {
  displayShortcuts: PropTypes.bool.isRequired,
  toggleDisplayShortcuts: PropTypes.func.isRequired
};

export default KeyboardShortcutsButton;
