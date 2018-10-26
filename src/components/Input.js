import React from 'react';

const Input = ({ reference, value, onChange, onSubmit, onFocus, onBlur }) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        ref={reference}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </form>
  );
};

export default Input;
