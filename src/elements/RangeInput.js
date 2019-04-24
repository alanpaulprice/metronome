// slider styles created using an app by Daniel Stern:
// http://danielstern.ca/range.css/

import styled from 'styled-components';

const RangeInput = styled.input.attrs(props => ({
  type: 'range'
}))`
  ${props => props.margin && `margin: ${props.margin};`}
  ${props =>
    props.marginTop &&
    `margin-top: ${props.marginTop};`}
  -webkit-appearance: none;
  height: 0.5rem;
  ${props => props.width && `width: ${props.width};`}

  &:focus {
    outline: none;
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 0.5rem;
    cursor: pointer;
    box-shadow: none;
    background: #fff;
    border-radius: 5rem;
    border: none;
  }

  &::-webkit-slider-thumb {
    box-shadow: none;
    border: 0.25rem solid hsla(0, 0%, 0%, 0.75);
    height: 2rem;
    width: 2rem;
    border-radius: 50%;
    background: #fff;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -0.25rem;
    transform: translateY(-25%);
  }

  /* &:focus::-webkit-slider-runnable-track {
    background: #fff;
  } */

  &::-moz-range-track {
    width: 100%;
    height: 100%;
    cursor: pointer;
    box-shadow: none;
    background: #fff;
    border-radius: 5rem;
    border: 0px solid #000;
  }

  &::-moz-range-thumb {
    box-shadow: none;
    border: 0.25rem solid hsla(0, 0%, 0%, 0.75);
    height: 2rem;
    width: 2rem;
    border-radius: 50%;
    background: #fff;
    cursor: pointer;
  }

  &::-ms-track {
    width: 100%;
    height: 5px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }

  &::-ms-fill-lower {
    background: #ffffff;
    border: 0px solid #000000;
    border-radius: 50px;
    box-shadow: none;
  }

  &::-ms-fill-upper {
    background: #ffffff;
    border: 0px solid #000000;
    border-radius: 50px;
    box-shadow: none;
  }

  &::-ms-thumb {
    box-shadow: none;
    border: px solid #000000;
    height: 10px;
    width: 10px;
    border-radius: 50px;
    background: #ffffff;
    cursor: pointer;
    height: 5px;
  }

  /* &:focus::-ms-fill-lower {
    background: #ffffff;
  } */

  /* &:focus::-ms-fill-upper {
    background: #ffffff;
  } */
`;

export default RangeInput;
