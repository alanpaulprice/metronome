import React from 'react';
import styled from 'styled-components';

const IconComponent = props => (
  <i className={props.className}>{props.children}</i>
);

const Icon = styled(IconComponent)`
${props => props.fontSize && `font-size: ${props.fontSize};`}
font-weight: ${props => props.fontWeight || '900'};
${props => props.fontWeight && `font-weight: ${props.fontWeight};`}
color: ${props => props.color || props.theme.fg || 'black'};
${props => props.opacity && `opacity: ${props.opacity};`}
`;

export default Icon;
