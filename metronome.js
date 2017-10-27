/*jshint esversion: 6 */

document.addEventListener('DOMContentLoaded', function () {
  console.clear();

  let bpm = 120;
  let playing = false;
  let bpmReadout = document.getElementById('bpm-readout');
  let minusButton = document.getElementById('minus-button');
  let plusButton = document.getElementById('plus-button');
  let playStop = document.getElementById('play-stop');
  let audio = new Audio("http://freesound.org/data/previews/250/250552_4570971-lq.mp3");

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
      //console.log("Hello"); //TODO: Change to a click
      audio.currentTime = 0;
      audio.play();
      setTimeout(() => {
        metronomeAudio();
      }, 60000/bpm)
    }
  }

});
