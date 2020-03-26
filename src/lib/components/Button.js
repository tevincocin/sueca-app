import styled from 'styled-components';

const Button = styled.button`
    border: none;
    background: ${props => props.color || 'silver'};
    color: black;
    font-weight: bold;
    padding: 20px;
`;

export default Button;
