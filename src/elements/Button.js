import styled from 'styled-components';

const Button = styled.button.attrs({
  // default - type: 'button'
  type: props => props.type || 'button'
})`
  background: transparent;
  outline: none;
  font-size: 1rem;
  padding: 0.5rem;
  /* default - color: black */
  color: ${props => props.theme.fg || 'black'};
  /* default - border-color: black */
  border-color: ${props => props.theme.fg || 'black'};
  border-width: ${props =>
    props.noBorder
      ? '0'
      : props.borderWidth
      ? props.borderWidth
      : props.theme.borderWidth
      ? props.theme.borderWidth
      : '2px'};
`;

export default Button;
