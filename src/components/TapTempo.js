// the functionality of this component is based on an example by Damien Clarke:
// https://codepen.io/dxinteractive/pen/bpaMMy

import React, { Component } from 'react';
import Button from '../elements/Button';

const TOTAL_TAP_VALUES = 5,
  MS_UNTIL_CHAIN_RESET = 2000,
  SKIPPED_TAP_THRESHOLD_LOW = 1.75,
  SKIPPED_TAP_THRESHOLD_HIGH = 2.75;

class TapTempo extends Component {
  buttonDown = false;
  tapChain = [];
  tapIndex = 0;
  lastTapMS = null;
  lastTapSkipped = false;
  currentBeatMS = null;

  getCurrentMS = () => new Date().getTime();

  newTapChainShouldBegin = ms => ms > this.lastTapMS + MS_UNTIL_CHAIN_RESET;

  tapHasBeenSkipped = int =>
    this.tapChain.length > 1 &&
    !this.lastTapSkipped &&
    int > this.currentBeatMS * SKIPPED_TAP_THRESHOLD_LOW &&
    int < this.currentBeatMS * SKIPPED_TAP_THRESHOLD_HIGH;

  resetTapChain = () => {
    this.tapChain = [];
    this.tapIndex = 0;
    this.lastTapMS = null;
    this.lastTapSkipped = null;
    this.currentBeatMS = null;
  };

  getAverageTapInterval = () =>
    this.tapChain.reduce(
      (total, current) => (total += current / this.tapChain.length),
      0
    );

  processTap = ms => {
    // if it's the first tap of a chain, only set lastTapMS
    if (!this.lastTapMS) {
      this.lastTapMS = ms;
      return null;
    }

    // calculate the tap interval (milliseconds since last tap)
    let interval = ms - this.lastTapMS;

    // if a tap was skipped, half the interval
    if (this.tapHasBeenSkipped(interval)) {
      interval /= 2;
      this.lastTapSkipped = true;
    } else {
      this.lastTapSkipped = false;
    }

    // save the interval in the chain, increment the index, set lastTapMS
    this.tapChain[this.tapIndex % TOTAL_TAP_VALUES] = interval;
    this.tapIndex++;
    this.lastTapMS = ms;

    // based on the updated chain, calculate and return the new average
    return this.getAverageTapInterval();
  };

  loop = () => {
    const ms = this.getCurrentMS();

    if (this.buttonDown) {
      this.buttonDown = false;

      if (this.newTapChainShouldBegin(ms)) this.resetTapChain();

      this.currentBeatMS = this.processTap(ms);

      if (this.currentBeatMS)
        this.props.setTempo(parseInt(60000 / this.currentBeatMS));
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

  onTapTempoButtonMouseDown = () => (this.buttonDown = true);

  onTapTempoButtonMouseUp = () => (this.buttonDown = false);

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
