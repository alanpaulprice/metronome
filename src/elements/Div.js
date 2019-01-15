import styled from 'styled-components';

const Div = styled.div`
  ${props => props.flex && 'display: flex;'}
  ${props => props.flexDirection && `flex-direction: ${props.flexDirection};`}
`;

export default Div;
