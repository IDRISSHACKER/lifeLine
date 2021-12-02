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
import { removeGroup } from 'store/Action/goupe.action';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Trash = ({ group }) => {
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
        if(dispatch(removeGroup(group.id))){
            setDelsuccess(true)
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
                    {"Remove confirmation"}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item sm={12} lg={6}>
                            <DialogContentText>
                                <Typography>{group.title}</Typography>
                            </DialogContentText>
                        </Grid>
                        <Grid item sm={12} lg={6}>
                            <DialogContentText>
                                {"Do you want to delete this tag ?"}
                            </DialogContentText>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus variant="outlined" color="secondary" onClick={handleClose}>
                        close
                    </Button>
                    <Button variant="contained" color="error" onClick={handleRemove} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default function RowGroup({ group }, props) {

    return (
        <TableRow {...props}>
            <TableCell>{group.title}</TableCell>
            <TableCell>{group.description}{group.description.length === 0 && "-"} </TableCell>
            <TableCell>{group.nbUser}</TableCell>
            <TableCell align="right">
                <Trash group={group} />
            </TableCell>
        </TableRow>
    )
}