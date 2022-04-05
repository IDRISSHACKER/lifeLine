import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Grid,
    TextField,
    useMediaQuery,
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
    Card,
    CardContent,
    CardActions
} from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from 'store/Action/users.action';
import Info from '../../utils/Info';
import { useNavigate } from 'react-router';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import CloudDoneOutlinedIcon from '@mui/icons-material/CloudDoneOutlined';
import imgSvg from 'assets/images/icons/undraw_message_sent_re_q2kl.svg';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from "framer-motion"
import { setMsg } from './../../../../store/Action/allMsg.action';


export default function NewUser() {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const groups = useSelector((state) => state.groupeReducer)
    const lang = useSelector(state => state.languageReducer)

    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [phone, setPhone] = useState('');
    const [groupSelected, setGroupSelected] = useState(0);
    const [createSuccessed, setCreateSuccessed] = useState(false);
    const [errored, setErrored] = useState(false);

    const resetErr = () => setTimeout(() => setErrored(false), 6000);
    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('nom', nom);
        data.append('prenom', prenom);
        data.append('email', email);
        data.append('pays', code);
        data.append('phone', phone);
        data.append('groupe_id', groupSelected);

        if (nom && prenom && code && phone) {
            if (dispatch(setUser(data))) {
                if (dispatch(setMsg({
                    "nom": nom,
                    "prenom": prenom,
                    "email": email,
                    "code": code,
                    "phone": phone,
                    "groupe": groupSelected
                }))) {

                    setNom('');
                    setPrenom('');
                    setEmail('');
                    setCode('');
                    setPhone('');

                    setCreateSuccessed(true);
                    //setTimeout(() => navigate('/dashboard/contact/list'), 2000);
                }
            } else {
                setErrored(true);
                resetErr();
            }
        } else {
            setErrored(true);
            resetErr();
        }
    };
    return (
        <form noValidate className="newUserForm" onSubmit={handleSubmit}>
            <div>
                {createSuccessed && <Info msg={lang.textes.contactAddSuccess[lang.id]} type="success" />}
                {errored && <Info msg={lang.textes.contactAddErr[lang.id]} type="error" />}
            </div>
            <Grid container spacing={matchDownSM ? 0 : 2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label={lang.textes.nameSingle[lang.id]}
                        margin="normal"
                        name="nom"
                        type="text"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        sx={{ ...theme.typography.customInput }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label={lang.textes.prenom[lang.id]}
                        margin="normal"
                        name="prenom"
                        type="text"
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                        sx={{ ...theme.typography.customInput }}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        label={lang.textes.paysId[lang.id]}
                        margin="normal"
                        name="code"
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        sx={{ ...theme.typography.customInput }}
                    />
                </Grid>
                <Grid item xs={12} sm={8}>
                    <TextField
                        fullWidth
                        label={lang.textes.numTel[lang.id]}
                        margin="normal"
                        name="phone"
                        type="number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        sx={{ ...theme.typography.customInput }}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        fullWidth
                        label={lang.textes.emailAdress[lang.id]}
                        margin="normal"
                        name="email"
                        type="email"
                        defaultValue=""
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ ...theme.typography.customInput }}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Box sx={{ minWidth: 60 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">{lang.textes.selectGroupe[lang.id]}</InputLabel>
                            <Select
                                sx={{ p: 1 }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={groupSelected}
                                onChange={(e) => setGroupSelected(e.target.value)}
                                label="Qtt"
                                size="small"
                            >
                                {groups && groups.map((group, index) => <MenuItem value={group.id}>{group.title}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={8}></Grid>
                <Grid item xs={12} sm={4}>
                    <Box sx={{ mt: 2 }}>
                        <AnimateButton>
                            <Button
                                disableElevation
                                fullWidth
                                size="small"
                                type="submit"
                                variant="contained"
                                color="secondary"
                                startIcon={<CloudDoneOutlinedIcon />}
                            >
                                {lang.textes.addContact[lang.id]}
                            </Button>
                        </AnimateButton>
                    </Box>
                </Grid>
            </Grid>
            <br />
        </form>
    )
}