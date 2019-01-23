import React from 'react';
import Div from '../elements/Div';

const KeyboardShortcutsLegend = () => {
  const legend = [
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

  const legendJSX = legend.map((obj, index) => (
    <Div key={index}>
      <Div>{obj.action}</Div>
      <Div>{obj.key}</Div>
    </Div>
  ));

  return legendJSX;
};

export default KeyboardShortcutsLegend;
