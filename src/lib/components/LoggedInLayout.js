import React, { useContext } from 'react';
import styled from 'styled-components';
import UserContext from '../contexts/UserContext';

const ProfileImage = styled.img`
    margin: 5px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
`;

const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;

    div:first-child {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    div:last-child {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`;

const LoggedInLayout = ({ children }) => {
    const { user } = useContext(UserContext);

    return user && (
        <>
            <Header background="brand">
                <div>
                    <ProfileImage alt="profile" src={user.photoURL} />
                    <span>{user.displayName || user.email}</span>
                </div>
                <div>

                </div>
            </Header>
            <>
                {children}
            </>
        </>
    );
};

export default LoggedInLayout;
