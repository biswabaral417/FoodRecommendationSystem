// src/layouts/PublicLayout.tsx
import Header from '../nav/Header';
import { Outlet } from 'react-router-dom';
import NavItems from '../../../utils/navbar/BasicNavItems';

const PublicLayout = () => {
    return (
        <>
            <Header NavItems={NavItems}/>
            <main><Outlet /></main>
        </>
    );
};

export default PublicLayout;
