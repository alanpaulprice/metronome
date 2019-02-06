import styled from 'styled-components';

const Button = styled.button.attrs(props => ({
  type: props.type || 'button'
}))`
  ${props => props.position && `position: ${props.position};`}
  ${props => props.top && `top: ${props.top};`}
  ${props => props.right && `right: ${props.right};`}
  ${props => props.bottom && `bottom: ${props.bottom};`}
  ${props => props.left && `left: ${props.left};`}
  ${props => props.right && `right: ${props.right};`}
  ${props => props.zIndex && `z-index: ${props.zIndex};`}
  ${props => props.width && `width: ${props.width};`}
  ${props => props.height && `height: ${props.height};`}
  ${props => props.zIndex && `z-index: ${props.zIndex};`}
  ${props => props.flex && `flex: ${props.flex};`}
  ${props => props.marginTop && `margin-top: ${props.marginTop};`}
  padding: ${props => props.padding || '0.5rem'};
  font-size: ${props => props.fontSize || props.theme.fontSize || '1rem'};
  ${props => props.fontWeight && `font-weight: ${props.fontWeight};`}
  ${props => props.lineHeight && `line-height: ${props.lineHeight};`}
  text-align: ${props => props.textAlign || 'center'};
  color: ${props => props.color || props.theme.fg || 'black'};
  background: ${props => props.background || props.theme.bg || 'white'};
  border-color: ${props => props.borderColor || props.theme.fg || 'black'};
  ${props => props.border && `border: ${props.border};`};
  ${props => props.borderWidth && `border-width: ${props.borderWidth};`};
  ${props => props.borderRadius && `border-radius: ${props.borderRadius};`}
  outline: ${props => (props.outline ? props.outline : 'none')};
  ${props => props.opacity && `opacity: ${props.opacity};`}
  ${props => props.transition && `transition: ${props.transition};`}
  cursor: ${props => props.cursor || 'pointer'};
`;

export default Button;
