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
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
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


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Trash = ({ user }) => {
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
        if(dispatch(removeUser(user.id))){
            setDelsuccess(user.id)
        }
        setOpen(false)
    }
    return (
        <>
            {delsuccess && <Info msg="Supression en cour..." type="success" />}
            <IconButton color="error" onClick={handleClickOpen}>
                <DeleteSweepIcon />
            </IconButton>
            <Dialog
                TransitionComponent={Transition}
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Confirmer la supression du contact"}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item sm={12} lg={6}>
                            <DialogContentText>
                                <Avatar sx={{ width: 70, height: 70 }}>
                                    {user.name[0]}
                                </Avatar>
                                <Typography>{user.name} {user.surname}</Typography>
                                <Typography>{user.phone}</Typography>
                            </DialogContentText>
                        </Grid>
                        <Grid item sm={12} lg={6}>
                            <DialogContentText>
                                {"Voulez vous suprimer ce numero ?"}
                            </DialogContentText>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus variant="outlined" color="secondary" onClick={handleClose}>
                        Annuler
                    </Button>
                    <Button variant="contained" color="error" onClick={handleRemove} autoFocus>
                        suprimer
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default function RowUser({ user }, props) {
    let variants = [purple[500], red[500], deepOrange[500]]
    let every = random(0, 2)
    const selected = variants[every]

    return (
        <TableRow {...props}>
            <TableCell>
                <Stack direction="row" spacing={2}>
                    <Avatar sx={{ bgcolor: selected, color: "white" }}>{user.name[0]}</Avatar>
                    <Typography sx={{ pt: { xs: 2, sm: 2, xl: 2 } }}>{user.name} {user.surname}</Typography>
                </Stack>
            </TableCell>
            <TableCell>+{user.pays_id}{user.phone}</TableCell>
            <TableCell>{user.email && user.email}</TableCell>
            <TableCell align="right">
                <Trash user={user} />
            </TableCell>
        </TableRow>
    )
}