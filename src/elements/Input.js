import styled from 'styled-components';

const Input = styled.input.attrs(props => ({
  type: props.type || 'text'
}))`
${props => props.width && `width: ${props.width};`}
${props => props.maxWidth && `max-width: ${props.maxWidth};`}
${props => props.margin && `margin: ${props.margin};`}
${props => props.marginTop && `margin-top: ${props.marginTop};`}
${props => props.display && `display: ${props.display};`}
${props => props.flex && `flex: ${props.flex};`}
color: ${props => props.color || props.theme.fg || 'black'};
background: ${props => props.background || props.theme.bg || 'white'};
font-size: ${props => props.fontSize || '1rem'};
text-align: ${props => props.textAlign || 'center'};
${props => props.border && `border: ${props.border};`};
${props => props.borderWidth && `border-width: ${props.borderWidth};`};
outline: ${props => props.outline || 'none'};
justify-self: center;
align-self: center;
cursor: ${props => props.cursor || 'pointer'};
`;

export default Input;
