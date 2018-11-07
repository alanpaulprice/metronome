import React from 'react';

const KeyboardShortcuts = () => {
  return (
    <div className="KeyboardShortcuts">
      <h3>keyboard shortcuts</h3>
      <div>
        <div className="action">play/stop</div>
        <div className="shortcut">spacebar</div>
      </div>
      <div>
        <div className="action">tempo up/down</div>
        <div className="shortcut">arrow left/right</div>
      </div>
      <div>
        <div className="action">volume up/down</div>
        <div className="shortcut">arrow up/down</div>
      </div>
    </div>
  );
}

export default KeyboardShortcuts;