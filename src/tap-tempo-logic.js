// based on an example by Damien Clarke:
// https://codepen.io/dxinteractive/pen/bpaMMy

const TOTAL_TAP_VALUES = 5,
  MS_UNTIL_CHAIN_RESET = 2000,
  SKIPPED_TAP_THRESHOLD_LOW = 1.75,
  SKIPPED_TAP_THRESHOLD_HIGH = 2.75;

let tapChain = [],
  tapIndex = 0,
  lastTapMS = null,
  lastTapSkipped = false;

export let currentBeatMS = null;

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

export const processTap = () => {
  // get the current time in milliseconds
  const ms = new Date().getTime();

  // if the last tap was longer than MS_UNTIL_CHAIN_RESET milliseconds ago:
  // reset all variables
  if (newTapChainShouldBegin(ms)) resetTapChain();

  // if it's the first tap of a chain, set lastTapMS and skip the rest
  if (!lastTapMS) {
    lastTapMS = ms;
    return;
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

  // calculate and store the new average interval
  currentBeatMS = getAverageTapInterval();
};
