import { lazy } from 'react';
import { Navigate } from "react-router-dom"
// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const CreateUserPage = Loadable(lazy(() => import('views/pages/users/createUser.page')))
const ListUserPage = Loadable(lazy(() => import('views/pages/users/listUser.page')))
const SendMessage = Loadable(lazy(() => import('views/pages/messenger/sendMessage.page')))
const SendedMessage = Loadable(lazy(() => import('views/pages/messenger/messsageSended.page')))
const NewCtg = Loadable(lazy(() => import('views/pages/users/newCtg.page')))
const ListGroupPage = Loadable(lazy(() => import('views/pages/users/listGroup.page')))
const SettingsPage = Loadable(lazy(() => import('views/pages/setting/Setting.page')))
// ==============================|| MAIN ROUTING ||============================== //

const status = localStorage.getItem("connected") ? parseInt(localStorage.getItem("connected")) : 0 

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: status ? <Navigate to="/dashboard/default" /> : <Navigate to="/login" />
        },
        {
            path: '/dashboard/default',
            element: status ? <DashboardDefault /> : <Navigate to="/login" />
        },
        {
            path: '/dashboard/contact/add',
            element: status ? <CreateUserPage /> : <Navigate to="/login" />
        },
        {
            path: '/dashboard/contact/list',
            element: status ? <ListUserPage /> : <Navigate to="/login" />
        },
        {
            path: '/dashboard/message/send',
            element: status ? <SendMessage /> : <Navigate to="/login" />
        },
        {
            path: '/dashboard/message/sended',
            element: status ? <SendedMessage /> : <Navigate to="/login" />
        },
        {
            path: '/dashboard/users/newCtg',
            element: status ? <NewCtg /> : <Navigate to="/login" />
        },
        {
            path: '/dashboard/users/groups',
            element: status ? <ListGroupPage /> : <Navigate to="/login" />
        },
        {
            path: '/dashboard/settings',
            element: status ? <SettingsPage /> : <Navigate to="/login" />
        },
        {
            path: '*',
            element: status ? <Navigate to="/dashboard/default" /> : <Navigate to="/login" />
        }
    ]
};

export default MainRoutes;
