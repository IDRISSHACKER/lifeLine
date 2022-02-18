import React from "react"
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Checkbox from '@mui/material/Checkbox'
import Avatar from '@mui/material/Avatar'

class MsgList extends React.Component {
    shouldComponentUpdate(newProps){
        return [ 'value', 'checked', 'handleToggle'].some(
            prop => this.props[prop] !== newProps[prop]
        )
    }
    render() {
        const labelId = `checkbox-list-secondary-label-${this.props.value}`;
        return (
            <div>
                <ListItem
                    key={this.props.value}
                    secondaryAction={
                        <Checkbox
                            edge="end"
                            onChange={this.props.handleToggle(this.props.value)}
                            checked={this.props.checked.indexOf(this.props.value) !== -1}
                            inputProps={{ 'aria-labelledby': labelId }}
                        />
                    }

                    disablePadding
                >
                    <ListItemButton>
                        <ListItemAvatar>
                            <Avatar>{this.props.value.name[0]}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            id={labelId}
                            primary={`+${this.props.value.pays_id}${this.props.value.phone}`}
                            secondary={this.props.value.name + ' ' + this.props.value.surname}
                        />
                    </ListItemButton>
                </ListItem>
            </div>
        )
    }
}

export default MsgList