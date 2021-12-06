import {
    TableCell,
    TableRow,
    Avatar,
    Stack,
    Typography,
    TextField,
    Button,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Backdrop,
    CircularProgress

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
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, removeUser } from 'store/Action/users.action';
import Info from "../../utils/Info"
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import BackupTwoToneIcon from '@mui/icons-material/BackupTwoTone';
import { updateUser } from 'store/Action/users.action';
import { getGroups } from 'store/Action/goupe.action';
import { motion } from "framer-motion"

const Edit = ({ user }) => {
    const dispatch = useDispatch()
    const groups = useSelector(state => state.groupeReducer)
    const [open, setOpen] = React.useState(false);
    const [edited, setEdited] = React.useState(false)
    const [load, setLoad] = React.useState(false)
    const [email, setEmail] = React.useState(user.email)
    const [name, setName] = React.useState(user.name)
    const [phone, setPhone] = React.useState(user.phone)
    const [surname, setSurname] = React.useState(user.surname)
    const [pays_id, setPays_id] = React.useState(user.pays_id)
    const [groupSelected, setGroupSelected] = React.useState(user.groupe_id)

    React.useEffect(()=>{
        setEmail(user.email)
        setName(user.name)
        setPhone(user.phone)
        setSurname(user.surname)
        setPays_id(user.pays_id)
        setGroupSelected(user.groupSelected)
    },[user])

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleCloseLoad = () => {
        setLoad(false);
        setEdited(1)
        setTimeout(() => setEdited(0), 2000)
    };

    const handleUpdate = (e) => {
        e.preventDefault()
        if (phone && pays_id) {
            setOpen(0)
            const data = new FormData()
            data.append("id", user.id)
            data.append("email", email)
            data.append("name", name)
            data.append("phone", phone)
            data.append("surname", surname)
            data.append("pays_id", pays_id)
            data.append("groupe_id", groupSelected)

            if (dispatch(updateUser(data))) {
                setLoad(1)
                dispatch(getUsers())
                dispatch(getGroups())
                setTimeout(() => {
                    handleCloseLoad()
                    dispatch(getUsers())
                    dispatch(getGroups())
                }, 2000)
            }
        }
    }

    return (
        <div>
            {edited === 1 && <Info msg="Contact mise à jour avec success" type="success" />}
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={load}
            >
                <CircularProgress color="inherit" /><br />
                <Typography> Mise à jour en cour...</Typography>
            </Backdrop>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                whileHover={{ scale: 1.2 }}
            >
                <IconButton color="secondary" onClick={handleClickOpen}>
                    <ModeEditOutlineIcon />
                </IconButton>
            </motion.div>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={handleUpdate} autocomplete="off">
                    <DialogTitle>Mise à jour du contact</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                                <Avatar variant="circular" color="primary">{user.name[0]}</Avatar>
                                <Typography>{user.name} {user.surname}</Typography>
                            </Stack>
                        </DialogContentText>
                        <TextField margin="dense" type='email' onChange={(e) => setEmail(e.target.value)} fullWidth value={email} />
                        <TextField margin="dense" onChange={(e) => setName(e.target.value)} value={name} fullWidth />
                        <TextField margin="dense" onChange={(e) => setSurname(e.target.value)} value={surname} fullWidth />
                        <TextField required margin="dense" name="phone_id" type="number" onChange={(e) => setPays_id(e.target.value)} value={pays_id} fullWidth />
                        <TextField required margin="dense" type="number" name='telephone' id="telephone" onChange={(e) => setPhone(e.target.value)} value={phone} fullWidth />
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel id="demo-simple-select-label">Select one group</InputLabel>
                            <Select
                                sx={{ p: 1 }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={groupSelected}
                                onChange={(e) => setGroupSelected(e.target.value)}
                                label="Qtt"
                                size="small"
                            >
                                {groups && groups.map((group, index) => (
                                    <MenuItem value={group.id}>{group.title}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
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
            </Dialog>
        </div>
    )
}

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
        if (dispatch(removeUser(user.id))) {
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
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        whileHover={{ scale: 1.3 }}
                    >
                        <Avatar sx={{ bgcolor: selected, color: "white" }}>{user.name[0]}</Avatar>
                    </motion.div>
                    <Typography sx={{ pt: { xs: 2, sm: 2, xl: 2 } }}>{user.name} {user.surname}</Typography>
                </Stack>
            </TableCell>
            <TableCell>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    whileHover={{ scale: 1.2 }}
                >
                    +{user.pays_id}{user.phone}
                </motion.div>
            </TableCell>
            <TableCell>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    whileHover={{ scale: 1.2 }}
                >
                    {user.email && user.email}
                </motion.div>
            </TableCell>
            <TableCell>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 2 }}
                    transition={{ duration: 1 }}
                    whileHover={{ scale: 1.2 }}
                >{user.title}
                </motion.div>
            </TableCell>
            <TableCell align="right">
                <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
                    <Edit user={user} />
                    <Trash user={user} />
                </Stack>
            </TableCell>
        </TableRow>
    )
}