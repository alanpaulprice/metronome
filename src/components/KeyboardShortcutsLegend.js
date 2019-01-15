import React from 'react';
import Div from '../elements/Div';

const KeyboardShortcutsLegend = () => {
  return (
    <Div>
      <h3>keyboard shortcuts</h3>
      <Div>
        <Div>play/stop</Div>
        <Div>space</Div>
      </Div>
      <Div>
        <Div>tempo up/down</Div>
        <Div>arrow left/right</Div>
      </Div>
      <Div>
        <Div>focus tempo input</Div>
        <Div>t</Div>
      </Div>
      <Div>
        <Div>tap tempo</Div>
        <Div>m</Div>
      </Div>
      <Div>
        <Div>toggle accent</Div>
        <Div>a</Div>
      </Div>
      <Div>
        <Div>accent beat up/down</Div>
        <Div>z/x</Div>
      </Div>
      <Div>
        <Div>focus accent beat input</Div>
        <Div>b</Div>
      </Div>
      <Div>
        <Div>volume up/down</Div>
        <Div>arrow up/down</Div>
      </Div>
    </Div>
  );
};

export default KeyboardShortcutsLegend;
