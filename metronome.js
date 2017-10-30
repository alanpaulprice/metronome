/*jshint esversion: 6 */
//TODO: button hover css
//TODO: play button pulse with clicks

document.addEventListener('DOMContentLoaded', function () {
  console.clear();

  let bpm = 120;
  let playing = false;
  let bpmReadout = document.getElementById('bpm-readout');
  let volumeReadout = document.getElementById('volume-readout');
  let minusButton = document.getElementById('minus-button');
  let plusButton = document.getElementById('plus-button');
  let playStop = document.getElementById('play-stop');
  let volumeControl = document.getElementById('volume-control');
  let audio1 = new Audio("/audio/Click-1.mp3");

  // ===== UPDATE READOUT =====
  function updateReadout () {
    bpmReadout.innerHTML = (bpm);
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
  document.getElementById("bpm-cell-170").onclick = () => bpmTableClick(170);
  document.getElementById("bpm-cell-180").onclick = () => bpmTableClick(180);
  document.getElementById("bpm-cell-190").onclick = () => bpmTableClick(190);

  // ===== VOLUME CONTROL =====
  function updateVolume (newVol) {
    audio1.volume = newVol/5;
    volumeReadout.innerHTML = "VOLUME: " + (newVol/0.05) + "%";
  }

  volumeControl.oninput = (val) => {
    updateVolume(val.target.valueAsNumber);
  }

  // ===== KEYBINDS =====
  document.onkeydown = (e) => {
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

      default: return;
    }
  };

});
