import styled from 'styled-components';

const Card = styled.button`
    border: none;
    border-radius: 5px;
    margin: 5px;
    min-width: 50px;
    max-width: 50px;
    height: 80px;
    background: #fbfbfb;
    color: ${props => props.color || 'black'};
    font-weight: bold;
    font-size: 0.5em;
    box-shadow: 0px 2px 2px 0px #b1aeae;
`;

export default Card;
