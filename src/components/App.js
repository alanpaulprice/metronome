import React, { Component } from 'react';
import TempoControls from './TempoControls';

class App extends Component {
  state = {
    tempo: 120
  };
  setTempo = tempo => this.setState({ tempo });
  render() {
    return (
      <div className="App">
        <h1>metronome</h1>
        <TempoControls
          tempo={undefined}
          setTempo={undefined}
          decrementTempo={undefined}
          incrementTempo={undefined}
        />
      </div>
    );
  }
}

export default App;
