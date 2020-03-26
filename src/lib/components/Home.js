import React from 'react';
import Dashboard from './Dashboard';
import LoggedInLayout from './LoggedInLayout';

const Home = () => (
    <LoggedInLayout>
        <Dashboard />
    </LoggedInLayout>
);

export default Home;
