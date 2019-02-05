import styled from 'styled-components';

const Div = styled.div`
  ${props => props.position && `position: ${props.position};`}
  ${props => props.top && `top: ${props.top};`}
  ${props => props.right && `right: ${props.right};`}
  ${props => props.bottom && `bottom: ${props.bottom};`}
  ${props => props.left && `left: ${props.left};`}
  ${props => props.width && `width: ${props.width};`}
  ${props => props.height && `height: ${props.height};`}
  ${props => props.minWidth && `min-width: ${props.minWidth};`}
  ${props => props.minHeight && `min-height: ${props.minHeight};`}
  ${props => props.zIndex && `z-index: ${props.zIndex};`}
  ${props => props.margin && `margin: ${props.margin};`}
  ${props => props.marginTop && `margin-top: ${props.marginTop};`}
  ${props => props.padding && `padding: ${props.padding};`}
  ${props => props.display && `display: ${props.display};`}
  ${props => props.flexDirection && `flex-direction: ${props.flexDirection};`}
  ${props =>
    props.justifyContent && `justify-content: ${props.justifyContent};`}
  ${props => props.alignItems && `align-items: ${props.alignItems};`}
  ${props => props.textAlign && `text-align: ${props.textAlign};`}
  ${props => props.verticalAlign && `vertical-align: ${props.verticalAlign};`}
  ${props => props.fontSize && `font-size: ${props.fontSize};`}
  ${props => props.fontWeight && `font-weight: ${props.fontWeight};`}
  color: ${props => props.color || props.theme.fg || 'black'};
  ${props => props.background && `background: ${props.background};`}
  ${props => props.border && `border: ${props.border};`}
  ${props => props.opacity && `opacity: ${props.opacity};`}
  ${props => props.transition && `transition: ${props.transition};`}
  ${props => props.overflow && `overflow: ${props.overflow};`}
`;

export default Div;
