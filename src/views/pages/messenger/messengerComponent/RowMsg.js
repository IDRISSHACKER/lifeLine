import {
    TableCell,
    TableRow,
    Avatar,
    Stack,
    Typography,
    Button,
    Grid
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeveloperModeTwoToneIcon from '@mui/icons-material/DeveloperModeTwoTone';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import * as React from 'react';
import Slide from '@mui/material/Slide';
import { random } from 'lodash';
import { deepOrange } from '@mui/material/colors';
import { purple } from '@mui/material/colors';
import { red } from '@mui/material/colors';
import { useDispatch } from 'react-redux';
import { removeUser } from 'store/Action/users.action';
import Info from "../../utils/Info"
import { formatTitle } from 'utils/formatText';
import { removeMessage } from 'store/Action/message.action';
import MoreIcon from '@mui/icons-material/More';
import { formatDistanceToNow } from 'date-fns';
import TextField from '@mui/material/TextField';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Trash = ({ msg }) => {
    const [open, setOpen] = React.useState(false);
    const [delsuccess, setDelsuccess] = React.useState(false)
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const dispatch = useDispatch()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleRemove = () => {
        const data = new FormData()
        data.append("id", msg.id)
        if (dispatch(removeMessage(data))) {
            setDelsuccess(1)
            setTimeout(() => setDelsuccess(0), 2000)
        }
        setOpen(false)
    }
    return (
        <>
            {delsuccess === 1 && <Info msg="Message suprimé." type="success" />}
            <Button
                endIcon={<MoreIcon />}
                color="secondary"
                variant="outlined"
                onClick={handleClickOpen}>
                Details
            </Button>
            <Dialog
                TransitionComponent={Transition}
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Lecture du message"}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item sm={12} lg={12}>
                            <DialogContentText>
                                <p>{msg.content}</p>
                            </DialogContentText>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus variant="outlined" color="secondary" onClick={handleClose}>
                        Fermer
                    </Button>
                    <Button variant="contained" color="error" onClick={handleRemove} autoFocus>
                        suprimer
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default function RowMsg({ msg }, props) {
    let variants = [purple[500], red[500], deepOrange[500]]
    let every = random(0, 2)
    const selected = variants[every]

    return (
        <TableRow {...props}>
            <TableCell>
                <Stack direction="row" spacing={2}>
                    <Avatar sx={{ bgcolor: selected, color: "white" }}>{msg.name[0]}</Avatar>
                    <div>
                        <Stack direction="column" spacing={1}>
                            <Typography sx={{ pt: { xs: 0, sm: 0, xl: 0 } }}>{msg.name} {msg.surname}</Typography>
                            <Typography>+{msg.pays_id}{msg.phone}</Typography>
                        </Stack>
                    </div>
                </Stack>
            </TableCell>
            <TableCell>{formatTitle(msg.content, 70)}</TableCell>
            <TableCell>{formatDistanceToNow(new Date(msg.created_at))}</TableCell>
            <TableCell align="right">
                <Trash msg={msg} />
            </TableCell>
        </TableRow>
    )
}