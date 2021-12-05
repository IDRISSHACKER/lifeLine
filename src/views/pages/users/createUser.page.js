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
import Info from '../utils/Info';
import { useNavigate } from 'react-router';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import CloudDoneOutlinedIcon from '@mui/icons-material/CloudDoneOutlined';
import imgSvg from 'assets/images/icons/undraw_message_sent_re_q2kl.svg';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from "framer-motion"

const CreateUser = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const groups = useSelector((state) => state.groupeReducer);

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
                setNom('');
                setPrenom('');
                setEmail('');
                setCode('');
                setPhone('');

                setCreateSuccessed(true);
                setTimeout(() => navigate('/dashboard/contact/list'), 2000);
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
        <Grid container spacing={2}>
            <Grid item sx={12} lg={8}>
                <MainCard
                    title="Ajouter un contact"
                    secondary={
                        <SecondaryAction title="liste des contacts" link="/dashboard/contact/list" icon={<VerifiedUserOutlinedIcon />} />
                    }
                >
                    <form noValidate onSubmit={handleSubmit}>
                        <div>
                            {createSuccessed && <Info msg="Contact ajouté avec success" type="success" />}
                            {errored && <Info msg="Erreur lors de l'ajout du contact" type="error" />}
                        </div>
                        <Grid container spacing={matchDownSM ? 0 : 2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoFocus
                                    fullWidth
                                    label="Nom"
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
                                    label="Prenom"
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
                                    label="Code du pays (+237)"
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
                                    label="Numero de telephone"
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
                                    label="Adresse Email (optionel)"
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
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                            color="secondary"
                                            startIcon={<CloudDoneOutlinedIcon />}
                                        >
                                            Ajouter le contact
                                        </Button>
                                    </AnimateButton>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </MainCard>
            </Grid>
            <Grid item sx={12} lg={4}>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    whileHover={{ scale: 1.06 }}
                >
                    <Card>
                        <CardContent>
                            <Box sx={{ ml: 0 }}>
                                <div>
                                    <img style={{ maxWidth: 300 }} src={imgSvg} alt="" />
                                    <Typography variant="subtitle2" sx={{ mt: 2 }}>
                                        Veillez remplir minitieusement les informations, elle seront utilisées lors de l'envoi des messages.
                                    </Typography>
                                </div>
                            </Box>
                        </CardContent>
                        <CardActions sx={{ mt: 10 }}>
                            <Button component={RouterLink} to="/dashboard/users/newCtg" fullWidth color="error">
                                Ajouter un groupe
                            </Button>
                        </CardActions>
                    </Card>
                </motion.div>
            </Grid>
        </Grid>
    );
};

export default CreateUser;
