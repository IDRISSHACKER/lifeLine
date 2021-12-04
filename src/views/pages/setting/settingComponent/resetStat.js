import { useEffect, useState, forwardRef } from "react"
import { Card, CardContent, Grid, Typography, Button } from "@mui/material"
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import Slide from '@mui/material/Slide';
import { useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { reset } from "store/Action/reset.action";
import Info from "views/pages/utils/Info";
import { getMessages } from "store/Action/message.action";
import { getUsers } from "store/Action/users.action";
import { getChartMonth } from "store/Action/chartMonth.action";
import { getAdmin } from "store/Action/admin.action";
import { getChartDay } from "store/Action/chartDay.action";
import { getGroups } from "store/Action/goupe.action";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {ReactComponent as Logo} from "assets/images/icons/undraw_blank_canvas_re_2hwy.svg"

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});
const msg = "Cette option auras pour effet de suprimer touts les messages que vouz envoyées, suprimer vos contacts & groupe"
const Reset = () => {
    const [load, setLoad] = useState(false);
    const [open, setOpen] = useState(false);
    const [delsuccess, setDelsuccess] = useState(false)
    const theme = useTheme();

    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const dispatch = useDispatch()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseLoad = () => {
        setLoad(false);
        setDelsuccess(1)
        setTimeout(()=>setDelsuccess(0),2000)
    };

    const handleRemove = () => {
        if (dispatch(reset())) {
            dispatch(getMessages())
            dispatch(getUsers())
            dispatch(getChartDay())
            dispatch(getChartMonth())
            dispatch(getAdmin())
            dispatch(getGroups())
            setLoad(1)
            setTimeout(()=>{
                handleCloseLoad()
                dispatch(getMessages())
                dispatch(getUsers())
                dispatch(getChartDay())
                dispatch(getChartMonth())
                dispatch(getAdmin())
                dispatch(getGroups())
            },5000)
        }
        setOpen(false)
    }
    return (
        <>
            {delsuccess === 1 && <Info msg="Parametres d'usines restorés" type="success" />}
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={load}
            >
                <CircularProgress color="inherit" /><br />
                <Typography> Renitialisation....</Typography>
            </Backdrop>
            <Button onClick={handleClickOpen} size="large" variant="text" color="error">Renitialiser</Button>
            <Dialog
                TransitionComponent={Transition}
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Voulez vous restorer les parametres d'usines de votre application ?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {msg}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus variant="outlined" color="secondary" onClick={handleClose}>
                        Annuler
                    </Button>
                    <Button variant="contained" color="error" onClick={handleRemove} autoFocus>
                        Renitialiser
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default function ResetStat() {

    const handleReset = (e) => {
        e.preventDefault()
    }

    return (
        <Card>
            <Grid container>
                <Grid item xs={12} md={3} lg={3}>
                    <div className="iconTrash">
                        <Logo className="icon" />
                    </div>
                </Grid>
                <Grid item xs={12} md={9} lg={9}>
                    <CardContent>
                        <Typography variant="h4">Restorer l'application</Typography>
                        <Typography variant="body1">
                            <p>{msg}</p>
                        </Typography>
                        <br />
                        <Reset />
                    </CardContent>
                </Grid>
            </Grid>
        </Card >
    )
}