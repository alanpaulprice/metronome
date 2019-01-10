// the functionality of this component is based on an example by Damien Clarke:
// https://codepen.io/dxinteractive/pen/bpaMMy

import React, { Component } from 'react';
import Button from '../elements/Button';

const TOTAL_TAP_VALUES = 5,
  MS_UNTIL_CHAIN_RESET = 2000,
  SKIPPED_TAP_THRESHOLD_LOW = 1.75,
  SKIPPED_TAP_THRESHOLD_HIGH = 2.75;

let buttonDown = false,
  tapChain = [],
  tapIndex = 0,
  lastTapMS = null,
  lastTapSkipped = false,
  currentBeatMS = null;

const getCurrentMS = () => new Date().getTime();

const newTapChainShouldBegin = ms => ms > lastTapMS + MS_UNTIL_CHAIN_RESET;

const tapHasBeenSkipped = int =>
  tapChain.length > 1 &&
  !lastTapSkipped &&
  int > currentBeatMS * SKIPPED_TAP_THRESHOLD_LOW &&
  int < currentBeatMS * SKIPPED_TAP_THRESHOLD_HIGH;

const resetTapChain = () => {
  tapChain = [];
  tapIndex = 0;
  lastTapMS = null;
  lastTapSkipped = null;
  currentBeatMS = null;
};

const getAverageTapInterval = () =>
  tapChain.reduce((total, current) => (total += current / tapChain.length), 0);

const processTap = ms => {
  if (newTapChainShouldBegin(ms)) resetTapChain();

  // if it's the first tap of a chain, only set lastTapMS
  if (!lastTapMS) {
    lastTapMS = ms;
    return null;
  }

  // calculate the tap interval (milliseconds since last tap)
  let interval = ms - lastTapMS;

  // if a tap was skipped, half the interval
  if (tapHasBeenSkipped(interval)) {
    interval /= 2;
    lastTapSkipped = true;
  } else {
    lastTapSkipped = false;
  }

  // save the interval in the chain, increment the index, set lastTapMS
  tapChain[tapIndex % TOTAL_TAP_VALUES] = interval;
  tapIndex++;
  lastTapMS = ms;

  // based on the updated chain, calculate and return the new average
  return getAverageTapInterval();
};

class TapTempo extends Component {
  // ========== LOOP

  loop = () => {
    const ms = getCurrentMS();

    if (buttonDown) {
      buttonDown = false;

      currentBeatMS = processTap(ms);

      if (currentBeatMS) this.props.setTempo(parseInt(60000 / currentBeatMS));
    }
  };

  // ========== LIFECYCLE

  componentDidMount() {
    this.interval = setInterval(this.loop, 10);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  // ========== EVENT HANDLERS

  onTapTempoButtonMouseDown = () => (buttonDown = true);

  onTapTempoButtonMouseUp = () => (buttonDown = false);

  // ========== RENDER

  render() {
    return (
      <Button
        onMouseDown={this.onTapTempoButtonMouseDown}
        onMouseUp={this.onTapTempoButtonMouseUp}
      >
        Tap Tempo
      </Button>
    );
  }
}

export default TapTempo;
