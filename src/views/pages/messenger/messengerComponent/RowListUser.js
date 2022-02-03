import React from "react"
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Checkbox from '@mui/material/Checkbox'
import Avatar from '@mui/material/Avatar'

class MsgList extends React.PureComponent {
    render() {
        const { value, checked, handleToggle } = this.props;
        const labelId = `checkbox-list-secondary-label-${value}`;
        return (
            <div>
                <ListItem
                    key={value}
                    secondaryAction={
                        <Checkbox
                            edge="end"
                            onChange={handleToggle(value)}
                            checked={checked.indexOf(value) !== -1}
                            inputProps={{ 'aria-labelledby': labelId }}
                        />
                    }

                    disablePadding
                >
                    <ListItemButton>
                        <ListItemAvatar>
                            <Avatar>{value.name[0]}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            id={labelId}
                            primary={`+${value.pays_id}${value.phone}`}
                            secondary={value.name + ' ' + value.surname}
                        />
                    </ListItemButton>
                </ListItem>
            </div>
        )
    }
}

export default MsgList