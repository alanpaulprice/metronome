import React, { Component } from 'react';
import Div from '../elements/Div';

class KeyboardShortcutsLegend extends Component {
  legend = [
    { action: 'Toggle playback', key: 'Space' },
    { action: 'Tempo Up', key: 'Arrow Right' },
    { action: 'Tempo Down', key: 'Arrow Left' },
    { action: 'Focus Tempo Input', key: 'T' },
    { action: 'Tap Tempo', key: 'M' },
    { action: 'Toggle Accent', key: 'A' },
    { action: 'Accent Beat Up', key: 'X' },
    { action: 'Accent Beat Down', key: 'Z' },
    { action: 'Focus Accent Beat Input', key: 'B' },
    { action: 'Volume Up', key: 'Arrow Up' },
    { action: 'Volume Down', key: 'Arrow Down' }
  ];

  render() {
    const legendJSX = this.legend.map((obj, index) => (
      <Div key={index}>
        <Div>{obj.action}</Div>
        <Div>{obj.key}</Div>
      </Div>
    ));
    return this.props.displayShortcuts ? (
      <Div
        position="fixed"
        top="0"
        left="0"
        width="100vw"
        height="100vh"
        background="rgba(0, 255, 255, 50%)"
      >
        {legendJSX}
      </Div>
    ) : null;
  }
}

export default KeyboardShortcutsLegend;
