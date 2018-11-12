import styled from 'styled-components';

const Button = styled.button`
  background: transparent;
  font-size: 1rem;
  padding: 0.5rem;
  color: ${props => props.theme.fg || 'black'};
  border-color: ${props => props.theme.fg || 'black'};
  border-width: ${props =>
    props.noBorder
      ? '0'
      : props.theme.buttonBorderWidth
      ? props.theme.buttonBorderWidth
      : '2px'};
`;

export default Button;
