import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../elements/Button';

class KeyboardShortcutsButton extends Component {
  onKeyboardShortcutsButtonClick = () => this.props.toggleDisplayShortcuts();

  render() {
    return (
      <Button
        onClick={this.onKeyboardShortcutsButtonClick}
        position="fixed"
        top="2.5rem"
        right="2.5rem"
        display="flex"
        height="5rem"
        width="5rem"
        padding="0"
        fontSize="2.5rem"
        fontWeight="900"
        color={this.props.displayShortcuts ? '#ffffff' : undefined}
        background="transparent"
        border="5px solid"
        borderRadius="50%"
        transition="color 0.2s"
      >
        {this.props.displayShortcuts ? 'X' : '?'}
      </Button>
    );
  }
}

KeyboardShortcutsButton.propTypes = {
  displayShortcuts: PropTypes.bool.isRequired,
  toggleDisplayShortcuts: PropTypes.func.isRequired
};

export default KeyboardShortcutsButton;
