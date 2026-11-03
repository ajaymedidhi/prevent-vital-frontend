import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface ProtectedRouteProps {
    allowedRoles?: string[];
    children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
    const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
    const location = useLocation();

    if (!isAuthenticated) {
        const redirectPath = encodeURIComponent(location.pathname + location.search);
        return <Navigate to={`/login?redirect=${redirectPath}`} replace />;
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        return <div className="p-4 text-red-600">Unauthorized Access</div>;
    }

    return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
