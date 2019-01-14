import styled from 'styled-components';

const Input = styled.input.attrs(props => ({
  type: props.type || 'text'
}))`
  ${props => props.display && `display: ${props.display};`}
  color: ${props => props.color || props.theme.fg || 'black'};
  background: ${props => props.background || props.theme.bg || 'white'};
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
