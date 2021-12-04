import {useSelector} from "react-redux"
import {Avatar} from "@mui/material"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import settings from 'utils/settings';

const set = new settings().init()

export default function AdminCompose(){
    const admin = useSelector(state=>state.adminReducer)
    const avatar = `${set.APP_FOLDER}/files/avatar/${admin.avatar}`

    return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', margin:0 }}
    >
      <ListItem>
        <ListItemIcon sx={{mr:2}}>
          <Avatar sx={{width:60,height:60}} src={avatar} alt={"admin"} />
        </ListItemIcon>
        <ListItemText id="switch-list-label-wifi" primary={admin.name+" "+admin.surname} secondary={"+"+admin.pays_id+""+admin.phone} />
      </ListItem>
    </List>
    )
}