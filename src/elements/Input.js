import styled from 'styled-components';

const Input = styled.input.attrs(props => ({
  type: props.type || 'text'
}))`
  color: ${props => props.color || props.theme.bg || 'black'};
  background: ${props => props.background || props.bg || 'white'};
  font-size: ${props => props.fontSize || '1rem'};
  text-align: ${props => props.textAlign || 'center'};
  border-width: ${props =>
    props.noBorder
      ? '0'
      : props.borderWidth || props.theme.borderWidth || '2px'};
  justify-self: center;
  align-self: center;
`;

export default Input;
