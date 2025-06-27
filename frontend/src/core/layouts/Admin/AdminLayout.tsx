// src/layouts/PublicLayout.tsx
import React from 'react';
import Header from '../nav/Header';
import { Outlet } from 'react-router-dom';
import AdminNavItems from '../../../utils/navbar/AdminNavItems';

const AdminLayout:React.FC = () => {
    return (
        <>
            <Header NavItems={AdminNavItems} />
            <main><Outlet /></main>
        </>
    );
};

export default AdminLayout;
