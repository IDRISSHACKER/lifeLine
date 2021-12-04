import { lazy } from 'react';
import { Navigate } from "react-router-dom"
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const CreateUserPage = Loadable(lazy(() => import('views/pages/users/createUser.page')))
const ListUserPage = Loadable(lazy(() => import('views/pages/users/listUser.page')))
const SendMessage = Loadable(lazy(() => import('views/pages/messenger/sendMessage.page')))
const SendedMessage = Loadable(lazy(() => import('views/pages/messenger/messsageSended.page')))
const NewCtg = Loadable(lazy(() => import('views/pages/users/newCtg.page')))
const ListGroupPage = Loadable(lazy(() => import('views/pages/users/listGroup.page')))
const SettingsPage = Loadable(lazy(() => import('views/pages/setting/Setting.page')))

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
