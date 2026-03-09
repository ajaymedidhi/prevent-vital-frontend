import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from '../admin-shared/components/layout';

const CorporateLayout = () => {
    return (
        <Layout>
            <Outlet />
        </Layout>
    );
};

export default CorporateLayout;
