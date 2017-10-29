/*jshint esversion: 6 */

document.addEventListener('DOMContentLoaded', function () {
  console.clear();

  let bpm = 120;
  let playing = false;
  let bpmReadout = document.getElementById('bpm-readout');
  let minusButton = document.getElementById('minus-button');
  let plusButton = document.getElementById('plus-button');
  let playStop = document.getElementById('play-stop');
  let audio1 = new Audio("/audio/Click-1.mp3");

  minusButton.onclick = () => {
    bpm--;
    bpmReadout.innerHTML = (bpm);
  }

  plusButton.onclick = () => {
    bpm++;
    bpmReadout.innerHTML = (bpm);
  }

  playStop.onclick = () => {
    if (!playing) {
      playing = true;
      metronomeAudio();
    } else {
      playing = false;
    }
  }

  function metronomeAudio() {

    if (playing) {
      audio1.currentTime = 0;
      audio1.play();
      setTimeout(() => {
        metronomeAudio();
      }, 60000/bpm)
    }
  }

  document.onkeydown = (e) => {
    //console.log(e.key);
    switch (e.key) {
      case " ":
      playStop.click();
      break;

      case "ArrowLeft":
      minusButton .click();
      break;

      case "ArrowRight":
      plusButton.click();
      break;

      default: return;
    }
  };

});
