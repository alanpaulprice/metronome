import React from 'react';

const TempoSelectGrid = ({ setTempo }) => {
  const onGridButtonClick = e => setTempo(e.target.value);

  // An array containing the values 40 to 230
  const gridButtonValues = [...Array(20)].map(
    (curr, ind) => (ind + 1) * 10 + 30
  );

  const GridButtons = gridButtonValues.map(curr => (
    <button className="gridButton" key={curr} value={curr}>
      {curr}
    </button>
  ));

  return (
    <div className="TempoSelectGrid" onClick={onGridButtonClick}>
      {GridButtons}
    </div>
  );
};

export default TempoSelectGrid;
