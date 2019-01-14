import styled from 'styled-components';

const H1 = styled.h1`
  color: ${props => props.theme.fg || 'black'};
  text-align: center;
  font-size: ${props => props.fontSize || '3rem'};
  margin: ${props => props.margin || '0'};
`;

export default H1;
