import { IconDashboard, IconUserPlus, IconUser } from '@tabler/icons';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined"
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined"
import SendOutlinedIcon from "@mui/icons-material/SendOutlined"

const icons = { IconDashboard, IconUser, IconUserPlus, GroupAddOutlinedIcon, GroupsOutlinedIcon, MessageOutlinedIcon, SendOutlinedIcon };

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
            id: 'sendMsg',
            title: 'Nouveau message',
            type: 'item',
            url: '/dashboard/message/send',
            icon: icons.MessageOutlinedIcon,
            breadcrumbs: false
        },
        {
            id: 'sendedMsg',
            title: 'Messages envoyés',
            type: 'item',
            url: '/dashboard/message/sended',
            icon: icons.SendOutlinedIcon,
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
            id: 'addCtg',
            title: 'Ajouter un groupe',
            type: 'item',
            url: '/dashboard/users/newCtg',
            icon: icons.GroupAddOutlinedIcon,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
