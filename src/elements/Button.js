import styled from 'styled-components';

const Button = styled.button.attrs(props => ({
  type: props.type || 'button'
}))`
  font-size: ${props => props.fontSize || props.theme.fontSize || '1rem'};
  color: ${props => props.color || props.theme.fg || 'black'};
  background: ${props => props.background || props.theme.bg || 'white'};
  padding: ${props => props.padding || '0.5rem'};
  ${props => props.marginTop && `margin-top: ${props.marginTop};`}
  text-align: ${props => props.textAlign || 'center'};
  border-color: ${props => props.borderColor || props.theme.fg || 'black'};
  border-width: ${props =>
    props.borderWidth || props.theme.borderWidth || '2px'};
  outline: none;
`;

export default Button;
