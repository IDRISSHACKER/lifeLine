// assets
import { IconDashboard, IconUserPlus, IconUser } from '@tabler/icons';

// constant
const icons = { IconDashboard, IconUser, IconUserPlus };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Tableau de bord',
            type: 'item',
            url: '/dashboard/default',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'user',
            title: 'Contacts',
            type: 'item',
            url: '/dashboard/contact/list',
            icon: icons.IconUser,
            breadcrumbs: false
        },
        {
            id: 'addUser',
            title: 'Ajouter un contact',
            type: 'item',
            url: '/dashboard/contact/add',
            icon: icons.IconUserPlus,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
