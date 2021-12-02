import { lazy } from 'react';

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
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: '/dashboard/default',
            element: <DashboardDefault />
        },
        {
            path: '/dashboard/contact/add',
            element: <CreateUserPage />
        },
        {
            path: '/dashboard/contact/list',
            element: <ListUserPage />
        },
        {
            path: '/dashboard/message/send',
            element: <SendMessage />
        },
        {
            path: '/dashboard/message/sended',
            element: <SendedMessage />
        },
        {
            path: '/dashboard/users/newCtg',
            element: <NewCtg />
        },
        {
            path: '/dashboard/users/groups',
            element: <ListGroupPage />
        },
        {
            path: '/sample-page',
            element: <SamplePage />
        }
    ]
};

export default MainRoutes;
