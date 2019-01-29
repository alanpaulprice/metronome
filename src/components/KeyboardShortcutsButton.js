import React, { Component } from 'react';
import Button from '../elements/Button';

class KeyboardShortcutsButton extends Component {
  onKeyboardShortcutsButtonClick = () => this.props.toggleDisplayShortcuts();

  render() {
    return (
      <Button
        onClick={this.onKeyboardShortcutsButtonClick}
        position="fixed"
        top="0"
        right="0"
        height="3.75rem"
        width="3.75rem"
        padding="0"
        vertical-align="center"
        fontSize="2.5rem"
        fontWeight="900"
        color={this.props.displayShortcuts ? '#ffffff' : undefined}
        background="transparent"
        borderWidth="0"
        transition="color 0.2s"
      >
        {this.props.displayShortcuts ? 'X' : '?'}
      </Button>
    );
  }
}

export default KeyboardShortcutsButton;
