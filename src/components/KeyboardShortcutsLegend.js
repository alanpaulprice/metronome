import React, { Component } from 'react';
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
        <Div color="#ffffff" fontSize="1rem" fontWeight="900">
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
        left="0"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        width="100vw"
        minHeight="100vh"
        background="linear-gradient(90deg, rgba(0, 0, 0, 80%), rgba(0, 0, 0, 100%), rgba(0, 0, 0, 100%), rgba(0, 0, 0, 80%))"
        textAlign="center"
        transition="color 5s"
      >
        {legendJSX}
      </Div>
    ) : null;
  }
}

export default KeyboardShortcutsLegend;
