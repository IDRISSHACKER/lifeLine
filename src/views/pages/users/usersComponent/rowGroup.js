import {
    TableCell,
    TableRow,
    Stack,
    Typography,
    Button,
    Grid,
    Backdrop,
    CircularProgress,
    TextField
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
import { useDispatch } from 'react-redux';
import Info from "../../utils/Info"
import { removeGroup } from 'store/Action/goupe.action';
import { updateGroup } from 'store/Action/goupe.action';
import { getUsers } from 'store/Action/users.action';
import BackupTwoToneIcon from '@mui/icons-material/BackupTwoTone';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { motion } from "framer-motion"

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function Edit({ group }) {
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false)
    const [title, setTitle] = React.useState(group.title)
    const [description, setDescription] = React.useState(group.description)
    const [updated, setUpdated] = React.useState(0)
    const [load, setLoad] = React.useState(0)

    React.useEffect(()=>{
        setTitle(group.title)
        setDescription(group.description)
    })
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseLoad = () => {
        setLoad(false);
        setUpdated(1)
        setTimeout(() => setUpdated(0), 2000)
    };

    const handleUpdate = (e) => {
        e.preventDefault()
        setOpen(0)
        if (title) {
            setLoad(1)
            const data = new FormData()
            data.append("id", group.id)
            data.append("title", title)
            data.append("description", description)

            if (dispatch(updateGroup(data))) {
                setTimeout(() => {
                    handleCloseLoad()
                    dispatch(getUsers())
                }, 2000)
            }
        }
    }

    return (
        <div>
            <IconButton color="secondary" onClick={handleClickOpen}>
                <ModeEditOutlineIcon />
            </IconButton>
            {updated === 1 && <Info msg="Contact mise à jour avec success" type="success" />}
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={load}
            >
                <CircularProgress color="inherit" /><br />
                <Typography> Mise à jour en cour...</Typography>
            </Backdrop>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Editer le group</DialogTitle>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <form onSubmit={handleUpdate}>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Title"
                                type="text"
                                fullWidth
                                value={title}
                                onChange={e => setTitle(e.target.value)}

                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Description"
                                type="text"
                                fullWidth
                                value={description}
                                multiline
                                rows={5}
                                onChange={e => setDescription(e.target.value)}

                            />
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus variant="outlined" color="secondary" onClick={handleClose}>
                                Annuler
                            </Button>
                            <Button startIcon={<BackupTwoToneIcon />} variant="contained" color="secondary" type="submit" autoFocus>
                                update
                            </Button>
                        </DialogActions>
                    </form>
                </motion.div>
            </Dialog>
        </div>
    );
}

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
        if (dispatch(removeGroup(group.id))) {
            setDelsuccess(1)
            setTimeout(() => setDelsuccess(0), 2000)
        }
        setOpen(false)
    }
    return (
        <>
            {delsuccess === 1 && <Info msg="Groupe retiré avec success" type="success" />}
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
            <TableCell>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    whileHover={{ scale: 1.2 }}
                >
                    {group.title}
                </motion.div>
            </TableCell>
            <TableCell>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    whileHover={{ scale: 1.2 }}
                >
                    {group.description}{group.description.length === 0 && "-"}
                </motion.div>
            </TableCell>
            <TableCell>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    whileHover={{ scale: 1.2 }}
                >
                    {group.nbUser}
                </motion.div>
            </TableCell>
            <TableCell align="right">
                <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
                    <Edit group={group} />
                    <Trash group={group} />
                </Stack>
            </TableCell>
        </TableRow>
    )
}