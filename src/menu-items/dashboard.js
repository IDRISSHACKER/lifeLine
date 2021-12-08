import { IconDashboard, IconUserPlus, IconUser } from '@tabler/icons';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined"
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined"
import SendOutlinedIcon from "@mui/icons-material/SendOutlined"
import SettingsIcon from '@mui/icons-material/Settings';
const icons = { IconDashboard, IconUser, IconUserPlus, GroupAddOutlinedIcon, GroupsOutlinedIcon, MessageOutlinedIcon, SendOutlinedIcon, SettingsIcon };

const dashboard = {
    id: 'dashboard',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard/default',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'send',
            title: 'New sms',
            type: 'item',
            url: '/dashboard/message/send',
            icon: icons.MessageOutlinedIcon,
            breadcrumbs: false
        },
        {
            id: 'sended',
            title: 'Sended',
            type: 'item',
            url: '/dashboard/message/sended',
            icon: icons.SendOutlinedIcon,
            breadcrumbs: false
        },
        {
            id: 'list',
            title: 'Contacts',
            type: 'item',
            url: '/dashboard/contact/list',
            icon: icons.IconUser,
            breadcrumbs: false
        },
        {
            id: 'add',
            title: 'add contact',
            type: 'item',
            url: '/dashboard/contact/add',
            icon: icons.IconUserPlus,
            breadcrumbs: false
        },
        {
            id: 'groups',
            title: 'Groups',
            type: 'item',
            url: '/dashboard/users/groups',
            icon: icons.GroupsOutlinedIcon,
            breadcrumbs: false
        },
        {
            id: 'newCtg',
            title: 'add group',
            type: 'item',
            url: '/dashboard/users/newCtg',
            icon: icons.GroupAddOutlinedIcon,
            breadcrumbs: false
        },
        {
            id: 'settings',
            title: 'Settings',
            type: 'item',
            url: '/dashboard/settings',
            icon: icons.SettingsIcon,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
