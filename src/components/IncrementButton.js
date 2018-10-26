import React from 'react';

const IncrementButton = ({ text, increment, clickEvent }) => {
  const onClick = () => clickEvent(increment);
  return <div onClick={onClick}>{text}</div>;
};

export default IncrementButton;
