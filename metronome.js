/*jshint esversion: 6 */

document.addEventListener('DOMContentLoaded', function () {
  console.clear();

  let bpm = 60;
  let playing = false;
  let playStop = document.getElementById('play-stop');

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
      console.log("Hello"); //TODO: Change to a click
      setTimeout(() => {
        metronomeAudio();
      }, 60000/bpm)
    }
  }

});
