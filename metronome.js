/*jshint esversion: 6 */

//TODO: add shift key = +-10 bpm?
//TODO: comment js

document.addEventListener('DOMContentLoaded', function() {
  console.clear();

  let bpm = 120;
  let playing = false;
  let bpmReadout = document.getElementById('bpm-readout-input');
  let volumeReadout = document.getElementById('volume-readout');
  let minusButton = document.getElementById('minus-button');
  let plusButton = document.getElementById('plus-button');
  let playStop = document.getElementById('play-stop');
  let volumeControl = document.getElementById('volume-control');
  let audio1 = new Audio("https://raw.githubusercontent.com/alanpaulprice/metronome/master/Audio/Click-1.mp3");

  // ===== UPDATE READOUT =====
  function updateReadout() {
    bpmReadout.value = (bpm);
  }

  // ===== MINUS BUTTON =====
  minusButton.onclick = () => {
    if (bpm <= 50) return;
    bpm--;
    updateReadout();
  }
  // ===== PLUS BUTTON =====
  plusButton.onclick = () => {
    if (bpm >= 190) return;
    bpm++;
    updateReadout();
  }
  // ===== PLAY / STOP BUTTON =====
  playStop.onclick = () => {
    if (!playing) {
      playing = true;
      playStop.classList.toggle("fa-play");
      playStop.classList.toggle("fa-stop");
      metronomeAudio();
    } else {
      playing = false;
      playStop.classList.toggle("fa-play");
      playStop.classList.toggle("fa-stop");
    }
  }
  // ===== METRONOME AUDIO =====
  // if nome engaged, reset audio n play it,
  // wait a beat before recursively calling func again
  function metronomeAudio() {
    if (playing) {
      audio1.currentTime = 0;
      audio1.play();
      setTimeout(() => {
        metronomeAudio();
      }, 60000 / bpm)
    }
  }

  // ===== BPM TABLE =====
  function bpmTableClick(newBpm) {
    bpm = newBpm;
    updateReadout();
  }

  document.getElementById("bpm-cell-50").onclick = () => bpmTableClick(50);
  document.getElementById("bpm-cell-60").onclick = () => bpmTableClick(60);
  document.getElementById("bpm-cell-70").onclick = () => bpmTableClick(70);
  document.getElementById("bpm-cell-80").onclick = () => bpmTableClick(80);
  document.getElementById("bpm-cell-90").onclick = () => bpmTableClick(90);
  document.getElementById("bpm-cell-100").onclick = () => bpmTableClick(100);
  document.getElementById("bpm-cell-110").onclick = () => bpmTableClick(110);
  document.getElementById("bpm-cell-120").onclick = () => bpmTableClick(120);
  document.getElementById("bpm-cell-130").onclick = () => bpmTableClick(130);
  document.getElementById("bpm-cell-140").onclick = () => bpmTableClick(140);
  document.getElementById("bpm-cell-150").onclick = () => bpmTableClick(150);
  document.getElementById("bpm-cell-160").onclick = () => bpmTableClick(160);
  document.getElementById("bpm-cell-170").onclick = () => bpmTableClick(170);
  document.getElementById("bpm-cell-180").onclick = () => bpmTableClick(180);
  document.getElementById("bpm-cell-190").onclick = () => bpmTableClick(190);

  // ===== VOLUME CONTROL =====
  // converts output of slider to useable values and updates volume n display
  function updateVolume(newVol) {
    audio1.volume = newVol / 5;
    volumeReadout.innerHTML = "VOLUME: " + (newVol / 0.05) + "%";
  }
  // when slider is moved, changes volume and removes focus (caused keyb issues)
  volumeControl.oninput = (val) => {
    updateVolume(val.target.valueAsNumber);
    volumeControl.blur();
  }

  // ===== KEYBINDS =====
  // regex to check the string starts with a 1-9 followed by 1 or 2 digits
  function isValidBpm (str) {
    let patt = /^[1-9][0-9][0-9]?$/
    return str.match(patt)
  }

  document.onkeydown = (e) => {

    // ===== PLAY/STOP VOLUME TEMPO =====
    if (document.activeElement !== bpmReadout) {

      switch (e.key) {
        case " ":
          playStop.click();
          break;

        case "ArrowLeft":
          minusButton.click();
          break;

        case "ArrowRight":
          plusButton.click();
          break;

        case "ArrowUp":
          volumeControl.value++;
          updateVolume(volumeControl.value);
          break;

        case "ArrowDown":
          volumeControl.value--;
          updateVolume(volumeControl.value);
          break;

        default:
          return;
      }
      // ===== INPUT =====
      // if focus is on readout and enter is hit:
    } else if (document.activeElement === bpmReadout && e.key === "Enter") {
      // if bpm is valid, update bpm, else, reset display to prev val, then remove focus
      if (isValidBpm(bpmReadout.value) && bpmReadout.value >= 50 && bpmReadout.value <= 190) {
        bpm = bpmReadout.value;
      } else {
        updateReadout();
      }
      bpmReadout.blur();
    }
  }; /* onkeydown */
  // when readout is left without enter being hit, reset display
  bpmReadout.onblur = () => updateReadout();

}); /* dom content loaded */
