import React from 'react';
import styled from 'styled-components';

const IconComponent = props => (
  <i className={props.className}>{props.children}</i>
);

const Icon = styled(IconComponent)`
  ${props => props.fontSize && `font-size: ${props.fontSize};`}
  vertical-align: ${props => props.verticalAlign || 'middle'};
  ${props => props.float && `float: ${props.float};`}
`;

export default Icon;
