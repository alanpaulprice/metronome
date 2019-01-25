import styled from 'styled-components';

const Div = styled.div`
  ${props => props.position && `position: ${props.position};`}
  ${props => props.top && `top: ${props.top};`}
  ${props => props.right && `right: ${props.right};`}
  ${props => props.bottom && `bottom: ${props.bottom};`}
  ${props => props.left && `left: ${props.left};`}
  ${props => props.width && `width: ${props.width};`}
  ${props => props.height && `height: ${props.height};`}
  ${props => props.flexDirection && `flex-direction: ${props.flexDirection};`}
  ${props =>
    props.justifyContent && `justify-content: ${props.justifyContent};`}
  ${props => props.alignItems && `align-items: ${props.alignItems};`}
  ${props => props.background && `background: ${props.background};`}
`;

export default Div;
