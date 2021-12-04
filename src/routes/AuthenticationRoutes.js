import { lazy } from 'react';
import { Navigate } from "react-router-dom"
// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //
const status = localStorage.getItem("connected") ? parseInt(localStorage.getItem("connected")) : 0 

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/login',
            element: status === 1 ? <Navigate to="/dashboard/default" replace /> : <AuthLogin3 />
        }
    ]
};

export default AuthenticationRoutes;
