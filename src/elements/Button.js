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
  ${props => props.margin && `margin: ${props.margin};`}
  ${props => props.marginTop && `margin-top: ${props.marginTop};`}
  ${props => props.display && `display: ${props.display};`}
  ${props => props.flex && `flex: ${props.flex};`}
  padding: ${props => props.padding && `padding: ${props.padding};`};
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
  backface-visibility: hidden;
  ${props => props.transform && `transform: ${props.transform};`}
  cursor: ${props => props.cursor || 'pointer'};
  transition: all 0.2s;
  ${props =>
    props.scaleOnHover &&
    `&:hover {
    transform: scale(1.125);
  }
  &:active {
    transform: scale(1);
  }`}
`;

export default Button;
