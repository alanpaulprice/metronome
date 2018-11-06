import React from 'react';

const StartStopButton = ({ playing, togglePlayback }) => {
  const iconClasses = (playing) ? "fa fa-stop" : "fa fa-play";
  return (
    <button className="StartStopButton" onClick={() => togglePlayback()}>
      <i className={iconClasses}></i>
    </button>
  );
}

export default StartStopButton;