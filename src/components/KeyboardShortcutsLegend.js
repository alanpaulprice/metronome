import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Div from '../elements/Div';

class KeyboardShortcutsLegend extends Component {
  legend = [
    { action: 'Toggle Playback', key: 'Space' },
    { action: 'Tempo Up', key: 'Arrow Right' },
    { action: 'Tempo Down', key: 'Arrow Left' },
    { action: 'Volume Up', key: 'Arrow Up' },
    { action: 'Volume Down', key: 'Arrow Down' },
    { action: 'Focus Tempo Input', key: 'T' },
    { action: 'Tap Tempo', key: 'M' },
    { action: 'Toggle Accent', key: 'A' },
    { action: 'Accent Beat Up', key: 'X' },
    { action: 'Accent Beat Down', key: 'Z' },
    { action: 'Focus Accent Beat Input', key: 'B' }
  ];

  onContainerDivClick = () =>
    this.props.displayShortcuts && this.props.toggleDisplayShortcuts();

  render() {
    const legendJSX = this.legend.map((obj, index) => (
      <Div key={index} margin="1rem 0">
        <Div color="#ffffff" fontSize="1.25rem" fontWeight="700">
          {obj.action}
        </Div>
        <Div color="#ffffff" fontSize="1.5rem">
          {obj.key}
        </Div>
      </Div>
    ));

    return this.props.displayShortcuts ? (
      <Div
        onClick={this.onContainerDivClick}
        position="fixed"
        top="0"
        right="0"
        bottom="0"
        left="0"
        display="flex"
        flexDirection="column"
        padding="4rem 0"
        background="rgba(0, 0, 0, 80%)"
        textAlign="center"
        transition="color 5s"
        zIndex="9"
        overflow="auto"
      >
        {legendJSX}
      </Div>
    ) : null;
  }
}

KeyboardShortcutsLegend.propTypes = {
  displayShortcuts: PropTypes.bool.isRequired,
  toggleDisplayShortcuts: PropTypes.func.isRequired
};

export default KeyboardShortcutsLegend;
