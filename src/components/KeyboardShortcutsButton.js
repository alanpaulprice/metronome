import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../elements/Button';
import Icon from '../elements/Icon';
import Div from '../elements/Div';

class KeyboardShortcutsButton extends Component {
  onKeyboardShortcutsButtonClick = () => this.props.toggleDisplayShortcuts();

  render() {
    return (
      <Div
        position={this.props.displayShortcuts ? 'fixed' : 'absolute'}
        top="10px"
        right="10px"
        zIndex="10"
      >
        <Button
          onClick={this.onKeyboardShortcutsButtonClick}
          background="transparent"
          border="none"
          transition="color 0.2s"
          scaleOnHover
        >
          <Icon
            className="material-icons"
            fontSize="3rem"
            color={this.props.displayShortcuts ? '#ffffff' : undefined}
          >
            {this.props.displayShortcuts ? 'clear' : 'details'}
          </Icon>
        </Button>
      </Div>
    );
  }
}

KeyboardShortcutsButton.propTypes = {
  displayShortcuts: PropTypes.bool.isRequired,
  toggleDisplayShortcuts: PropTypes.func.isRequired
};

export default KeyboardShortcutsButton;
