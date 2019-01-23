import styled from 'styled-components';

const H1 = styled.h1`
  color: ${props => props.theme.fg || 'black'};
  text-align: center;
  font-size: ${props => props.fontSize || '3rem'};
  ${props => props.fontWeight && `font-weight: ${props.fontWeight};`}
  ${props => props.letterSpacing && `letter-spacing: ${props.letterSpacing};`}
  ${props => props.margin && `margin: ${props.margin};`}
  ${props => props.marginTop && `margin-top: ${props.marginTop};`}
`;

export default H1;
