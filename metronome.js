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

  // ===== UPDATE READOUT =====
  function updateReadout () {
    bpmReadout.innerHTML = (bpm);
  }

  // ===== MINUS BUTTON =====
  minusButton.onclick = () => {
    bpm--;
    updateReadout();
  }
  // ===== PLUS BUTTON =====
  plusButton.onclick = () => {
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
  function metronomeAudio() {
    if (playing) {
      audio1.currentTime = 0;
      audio1.play();
      setTimeout(() => {
        metronomeAudio();
      }, 60000/bpm)
    }
  }

  // ===== BPM TABLE =====
  function bpmTableClick (newBpm) {
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

  // ===== KEYBINDS =====
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
