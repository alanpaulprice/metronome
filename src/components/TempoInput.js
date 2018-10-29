import React from 'react';

const Input = ({ TempoInputRef, value, onChange, onSubmit, onFocus, onBlur }) => {
  return (
    <form className="TempoInput" onSubmit={onSubmit}>
      <input
        ref={TempoInputRef}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </form>
  );
};

export default Input;
