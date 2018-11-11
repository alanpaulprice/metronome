import styled from 'styled-components';

const Wrapper = styled.div`
  width: 400px;
  height: 400px;
  background: ${props => props.theme.main || 'black'};
`;

export default Wrapper;
