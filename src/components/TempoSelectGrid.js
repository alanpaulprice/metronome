import React from 'react';

const TempoSelectGrid = ({ setTempo }) => {
  const onGridButtonClick = value => setTempo(value);
  // An array containing the values 40 to 230
  const gridButtonValues = [...Array(20)].map(
    (curr, ind) => (ind + 1) * 10 + 30
  );

  const GridButtons = gridButtonValues.map(curr => (
    <button
      className="gridButton"
      key={curr}
      onClick={() => onGridButtonClick(curr)}
    >
      {curr}
    </button>
  ));

  return <div>{GridButtons}</div>;
};

export default TempoSelectGrid;
