import React from 'react';

const PlayStopButton = ({ playing, togglePlayback }) => {
  const iconClasses = (playing) ? "fa fa-stop" : "fa fa-play";
  return (
    <button className="PlayStopButton" onClick={() => togglePlayback()}>
      <i className={iconClasses}></i>
    </button>
  );
}

export default PlayStopButton;