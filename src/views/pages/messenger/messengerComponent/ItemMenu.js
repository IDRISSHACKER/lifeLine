import React from "react"
import { MenuItem } from '@mui/material';


class ItemMenu extends React.Component {
    render() {
        const {group} = this.props

        return(
            <MenuItem value = { group.id } >
                { group.title }
            </MenuItem >
        )
    }
}

export default ItemMenu