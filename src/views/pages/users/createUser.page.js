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
import { lazy } from 'react'
import Loadable from 'ui-component/Loadable';
const UserManager = Loadable(lazy(() => import('./usersComponent/userManager')));
const AddSettings = Loadable(lazy(() => import('./usersComponent/addSettings')));
import SaveAll from './usersComponent/saveAllComponent';

const CreateUser = () => {
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
                setNom('');
                setPrenom('');
                setEmail('');
                setCode('');
                setPhone('');

                setCreateSuccessed(true);
                //setTimeout(() => navigate('/dashboard/contact/list'), 2000);
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
                    title={lang.textes.addContact[lang.id]}
                    secondary={
                        <SecondaryAction title={lang.textes.userList[lang.id]} link="/dashboard/contact/list" icon={<VerifiedUserOutlinedIcon />} />
                    }
                >
                </MainCard>
                <UserManager />
            </Grid>
            <Grid item sx={12} lg={4}>
                <Card className="settingsPannel">
                    <CardContent>
                        <Box sx={{ ml: 0 }}>
                            <div>
                                <img style={{ maxWidth: 300 }} src={imgSvg} alt="" />
                                <AddSettings />
                            </div>
                        </Box>
                    </CardContent>
                    <CardActions sx={{ mt: 10 }}>
                        <div className="userFormSettings">

                        </div>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    );
};

export default CreateUser;
