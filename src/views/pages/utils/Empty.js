import {Typography, Button, Box} from "@mui/material"
import {Link as RouterLink} from "react-router-dom"
import { ReactComponent as EmptyImg } from "assets/images/icons/undraw_empty_cart_co35.svg"

export default function Empty({text, buttonText, buttonUrl},props){


    return (
        <div className="empty">
            <EmptyImg className="img" {...props} />
            <Box sx={{mt:3}}>
                <Typography variant="h5">{text}</Typography>
                <Button variant="contained" sx={{mt:1,ml:10}} size="large" color="secondary" component={RouterLink} to={buttonUrl}>{buttonText}</Button>
            </Box>
        </div>
    )
}