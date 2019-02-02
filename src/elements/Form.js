import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  ${props => props.flex && `flex: ${props.flex};`}
  justify-content: center;
`;

export default Form;
