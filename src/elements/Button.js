import styled from 'styled-components';

const Button = styled.button.attrs(props => ({
  type: props.type || 'button'
}))`
  font-size: ${props => props.fontSize || props.theme.fontSize || '1rem'};
  text-align: ${props => props.textAlign || 'center'};
  color: ${props => props.color || props.theme.fg || 'black'};
  background: ${props => props.background || props.theme.bg || 'white'};
  padding: ${props => props.padding || '0.5rem'};
  border-color: ${props => props.borderColor || props.theme.fg || 'black'};
  border-width: ${props =>
    props.borderWidth || props.theme.borderWidth || '2px'};
  outline: none;
  ${props => props.position && `position: ${props.position};`}
  ${props => props.top && `top: ${props.top};`}
  ${props => props.right && `right: ${props.right};`}
  ${props => props.marginTop && `margin-top: ${props.marginTop};`}
  ${props => props.width && `width: ${props.width};`}
  ${props => props.height && `height: ${props.height};`}
  ${props => props.fontWeight && `font-weight: ${props.fontWeight};`}
`;

export default Button;
