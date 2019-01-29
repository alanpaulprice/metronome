import React from 'react';
import styled from 'styled-components';

const IconComponent = props => (
  <i className={props.className}>{props.children}</i>
);

const Icon = styled(IconComponent)`
${props => props.float && `float: ${props.float};`}
vertical-align: ${props => props.verticalAlign || 'middle'};
${props => props.fontSize && `font-size: ${props.fontSize};`}
${props => props.fontWeight && `font-weight: ${props.fontWeight};`}
color: ${props => props.color || props.theme.fg || 'black'};
`;

export default Icon;
