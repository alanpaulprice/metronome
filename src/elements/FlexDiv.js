import styled from 'styled-components';

const FlexDiv = styled.div`
  display: flex;
  flex-direction: ${props => props.flexDirection || 'row'};
`;

export default FlexDiv;
