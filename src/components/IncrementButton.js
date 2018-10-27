import React from 'react';

const IncrementButton = ({ children, increment, clickEvent }) => {
  const onClick = () => clickEvent(increment);
  return <button onClick={onClick}>{children}</button>;
};

export default IncrementButton;
