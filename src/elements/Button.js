import styled from 'styled-components';

const Button = styled.button`
  color: ${props => props.theme.secondary || 'black'};
  background: transparent;
  border-color: ${props => props.theme.secondary || 'black'};
`;

export default Button;
