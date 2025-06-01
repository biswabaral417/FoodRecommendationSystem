// src/layouts/PublicLayout.tsx
import React from 'react';
import Header from '../nav/Header';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
    return (
        <>
            <Header />
            <main><Outlet /></main>
        </>
    );
};

export default PublicLayout;
