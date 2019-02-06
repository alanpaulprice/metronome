import React from 'react';
import styled from 'styled-components';
import Div from './Div';

const SquareDiv = styled(Div)`
  position: relative;
  height: auto;
  width: 40%;
  display: flex;
  align-items: center;
`;

const SquareImg = styled.img.attrs(props => ({
  src: 'https://via.placeholder.com/1',
  alt: ''
}))`
  display: block;
  width: 100%;
  height: auto;
  opacity: 0;
`;

const ResponsiveSquareDiv = props => (
  <SquareDiv>
    <SquareImg />
    {props.children}
  </SquareDiv>
);

export default ResponsiveSquareDiv;
