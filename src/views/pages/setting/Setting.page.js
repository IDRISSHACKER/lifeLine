import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import GridViewIcon from '@mui/icons-material/GridView';
import { Avatar, Grid, Divider, CardActions, Button, TextField, Typography } from '@mui/material'
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import GppBadIcon from '@mui/icons-material/GppBad';
import LoadingButton from '@mui/lab/LoadingButton';

import Info from '../utils/Info';
import { getAdmin, updateAdmin, updateAvatar } from 'store/Action/admin.action';
import settings from 'utils/settings';
const set = new settings().init()

const Item = ({ icon, txt }) => {
    return (
        <ListItemButton>
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <ListItemText primary={txt} />
        </ListItemButton>
    )
}
const Setting = () => {
    const admin = useSelector(state => state.adminReducer)
    const dispatch = useDispatch()
    const imgCont = useRef("")
    const User1 = `${set.APP_FOLDER}/files/avatar/${admin.avatar}`

    const [edit, setEdit] = useState(0)
    const [success, setSuccess] = useState(0)
    const [successAvatar, setSuccessAvatar] = useState(0)
    const [email, setEmail] = useState(admin.email)
    const [name, setName] = useState(admin.name)
    const [phone, setPhone] = useState(admin.phone)
    const [surname, setSurname] = useState(admin.surname)
    const [pays_id, setPays_id] = useState(admin.pays_id)
    const [password, setPassword] = useState("")

    const handleUpdate = (e) => {
        e.preventDefault()
        const nPassword = password === "" ? admin.password : password
        const data = new FormData()
        data.append("id", admin.id)
        data.append("email", email)
        data.append("name", name)
        data.append("phone", phone)
        data.append("surname", surname)
        data.append("pays_id", pays_id)
        data.append("password", nPassword)
        data.append("changed", password === "" ? 0 : 1)

        if (dispatch(updateAdmin(data))) {
            setSuccess(1)
            setTimeout(() => {
                setSuccess(0)
                setEdit(0)
            }, 2000)
        }
    }

    const handleUpdateAvatar = (e) => {
        if (e.target.files) {
            const file = e.target.files[0]
            let fFile = new FormData()
            fFile.append("img", file)
            try {
                const src = URL.createObjectURL(e.target.files[0])
                imgCont.current.innerHTML = `<img alt='avatar' src='${src}' class='MuiAvatar-img css-1pqm26d-MuiAvatar-img'>`
                if(dispatch(updateAvatar(fFile))){
                    dispatch(getAdmin())
                    dispatch(getAdmin())

                    setSuccessAvatar(1)
                    setTimeout(()=>setSuccessAvatar(0),2000)
                }

            }catch (err) {

            }

        }

        dispatch(getAdmin())
        dispatch(getAdmin())
    }

    return (
        <Grid container>
            <Grid item xs={12} md={6} lg={!edit ? 4 : 6}>
                {success === 1 && <Info msg="Profil mise à jour" />}
                {successAvatar === 1 && <Info msg="Votre avatar à été mise à jour !" />}
                <form onSubmit={handleUpdate}>
                    <MainCard title={<div>
                        <span>Profil </span>
                    </div>} secondary={
                        <SecondaryAction
                            title="Tableau de board"
                            link="/dashboard/default"
                            icon={<GridViewIcon />}
                        />}
                    >
                        <List
                            sx={{ width: '100%', maxWidth: 760, bgcolor: 'background.paper' }}
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                            subheader={
                                <div className="avatarCount">
                                    <input onChange={handleUpdateAvatar} className="avatarInput" id="avatar" type="file" name="avatar" />
                                    <label className="avatarLabel" htmlFor="avatar">
                                        <Avatar ref={imgCont} src={User1} alt="avatar" sx={{ width: !edit ? 200 : 100, height: !edit ? 200 : 100, ml: !edit ? 10 : 30, mb: 4 }} />
                                    </label>
                                </div>
                            }
                        >
                            <Divider />
                            <ListItemButton>
                                <ListItemIcon>
                                    <ForwardToInboxIcon />
                                </ListItemIcon>
                                {!edit && <ListItemText primary={admin.email} />}
                                {edit === 1 &&
                                    <TextField type='email' onChange={(e) => setEmail(e.target.value)} fullWidth value={email} />
                                }
                            </ListItemButton>
                            <Divider />
                            <ListItemButton>
                                <ListItemIcon>
                                    <AdminPanelSettingsIcon />
                                </ListItemIcon>
                                {!edit && <ListItemText primary={admin.name + " " + admin.surname} />}
                                {edit === 1 &&
                                    <Grid container direction="row" spacing={2}>
                                        <Grid item xs={12} sm={6} lg={6}>
                                            <TextField onChange={(e) => setName(e.target.value)} value={name} fullWidth />
                                        </Grid>
                                        <Grid item xs={12} sm={6} lg={6}>
                                            <TextField onChange={(e) => setSurname(e.target.value)} value={surname} fullWidth />
                                        </Grid>
                                    </Grid>
                                }
                            </ListItemButton>
                            <Divider />
                            <ListItemButton>
                                <ListItemIcon>
                                    <PermPhoneMsgIcon />
                                </ListItemIcon>
                                {!edit && <ListItemText primary={"+" + admin.pays_id + " " + admin.phone} />}
                                {edit === 1 &&
                                    <Grid container direction="row" spacing={2}>
                                        <Grid item xs={4} sm={4} lg={2}>
                                            <TextField onChange={(e) => setPays_id(e.target.value)} value={pays_id} fullWidth />
                                        </Grid>
                                        <Grid item xs={8} sm={8} lg={10}>
                                            <TextField onChange={(e) => setPhone(e.target.value)} value={phone} fullWidth />
                                        </Grid>
                                    </Grid>
                                }
                            </ListItemButton>
                            <Divider />
                            <ListItemButton>
                                <ListItemIcon>
                                    <LockOpenIcon />
                                </ListItemIcon>
                                {!edit && <ListItemText primary={"........."} />}
                                {edit === 1 &&
                                    <Grid container direction="row" spacing={2}>
                                        <Grid item xs={12} sm={12} lg={12} >
                                            <TextField type="password" onChange={(e) => setPassword(e.target.value)} value={password} fullWidth />
                                            <Typography sx={{ pt: 1 }} color="error" variant="subtitle2">! Laisser vide si vous ne voulez pas modifier</Typography>
                                        </Grid>
                                    </Grid>
                                }
                            </ListItemButton>
                        </List>
                        <Divider />
                        <CardActions>
                            {!edit &&
                                <Button
                                    fullWidth
                                    size='medium'
                                    color='secondary'
                                    variant='contained'
                                    startIcon={
                                        <ModeEditOutlineIcon />
                                    }
                                    onClick={() => setEdit(1)}
                                >Editer</Button>
                            }
                            {edit === 1 &&
                                <Grid container direction="row" spacing={1}>
                                    <Grid item xs={12} sm={6} lg={2}>
                                        <Button fullWidth
                                            size='medium'
                                            color='error'
                                            variant='contained'
                                            startIcon={<GppBadIcon />}
                                            onClick={() => setEdit(0)}>
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={10}>
                                        {!success && <Button
                                            fullWidth
                                            size='medium'
                                            color='secondary'
                                            variant='contained'
                                            type="submit"
                                            startIcon={
                                                <BeenhereIcon />
                                            }
                                        >Sauvegarder</Button>}
                                        {success === 1 && <LoadingButton
                                            fullWidth
                                            loading
                                            loadingPosition="start"
                                            startIcon={<BeenhereIcon />}
                                            variant="outlined"
                                        >
                                            Sauvegarde en cour...
                                        </LoadingButton>}
                                    </Grid>
                                </Grid>
                            }
                        </CardActions>
                    </MainCard>
                </form>
            </Grid>
            <Grid item xs={12} md={6} lg={8}>

            </Grid>
        </Grid>
    )
};

export default Setting;
