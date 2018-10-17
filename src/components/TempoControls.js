import React, { Component } from 'react';

class TempoControls extends Component {
  render() {
    return (
      <div className="tempo-controls">
        <div onClick={this.onMinusButtonClick}>-</div>
        <form onSubmit={undefined}>
          <input
            min="60"
            max="200"
            type="number"
            value={undefined}
            onChange={undefined}
          />
        </form>
        <div onClick={undefined}>+</div>
      </div>
    );
  }
}

export default TempoControls;
