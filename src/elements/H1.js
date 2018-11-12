import styled from 'styled-components';

const H1 = styled.h1`
  color: ${props => props.theme.fg || 'black'};
  text-align: center;
  font-size: 3rem;
`;

export default H1;
