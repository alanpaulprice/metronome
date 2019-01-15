import styled from 'styled-components';

const Div = styled.div`
  ${props => props.flex && 'display: flex;'}
  ${props => props.flexDirection && `flex-direction: ${props.flexDirection};`}
  ${props =>
    props.justifyContent && `justify-content: ${props.justifyContent};`}
  ${props => props.alignItems && `align-items: ${props.alignItems};`}
`;

export default Div;
