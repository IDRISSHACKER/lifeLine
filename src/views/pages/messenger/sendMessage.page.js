import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import {
    Grid,
    TextField,
    useMediaQuery,
    Box,
    Button,
    Card,
    CardHeader,
    CardContent,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    CardActions,
    Chip
} from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from 'store/Action/message.action';
import Info from '../utils/Info';
import AdminCompose from '../utils/AdminCompose';
import { useNavigate } from 'react-router-dom';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { getChartMonth } from 'store/Action/chartMonth.action';
import { getChartDay } from 'store/Action/chartDay.action';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { ReactComponent as EmptyImg } from 'assets/images/icons/undraw_empty_cart_co35.svg';
import { motion } from "framer-motion"
import sendSms from 'utils/sendSms';

const SendMessage = () => {
    const [checked, setChecked] = useState([]);
    const [groupSelected, setGroupSelected] = useState(0);
    const [contacts, setContacts] = useState([]);
    const [checkAll, setCheckAll] = useState(0);
    const [success, setSuccess] = useState(0);
    const [err, setErr] = useState(0);
    const [errr, setErrr] = useState(0)
    const [msg, setMsg] = useState("")
    const [status, setStatus] = useState()

    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const users = useSelector((state) => state.usersReducer);
    const groups = useSelector((state) => state.groupeReducer);
    const lang = useSelector(state => state.languageReducer)

    const [message, setMessage] = useState('');

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
            if (checked.length + 1 === contacts.length) {
                setCheckAll(1);
            }
        } else {
            newChecked.splice(currentIndex, 1);
            setCheckAll(0);
        }

        setChecked(newChecked);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (message && checked.length > 0) {
            checked.forEach((userId, index) => {
                sendSms("+" + userId.pays_id + userId.phone, message).then(res => {
                    if (res) {
            
                    } else {
                        
                        let tab = checked.filter(el=>el.id !== userId.id)
                        setChecked(tab)

                        setErrr(1)
                        setMsg(userId.name + "(+" + userId.pays_id + userId.phone + ")")
                        setTimeout(() => setErr(0), 2000);
                    }
                })

                if (checked.length === index + 1) {
                    setTimeout(() => {
                        const data = new FormData();
                        data.append('message', message);
                        data.append('users', JSON.stringify(checked));
            
                        if (dispatch(setMessages(data))) {
                            dispatch(getChartMonth());
                            dispatch(getChartDay());
                        }
                        setMessage('');
                        setChecked([]);
                        setCheckAll(0);
                        setTimeout(() => setSuccess(1), 2000);
                        setTimeout(() => setSuccess(0), 4000);
                        setTimeout(() => navigate('/dashboard/message/sended'), 4000);
                    }, 500)

                }
            })

        } else {
            setErr(1);
            setTimeout(() => setErr(0), 2000);
        }
    }
    setTimeout(() => {
        dispatch(getChartMonth());
        dispatch(getChartDay());
    }, 1500);


    const handleToggleAll = (e) => {
        const isCheck = e.target.checked;
        setCheckAll(isCheck);
        if (!isCheck) {
            setChecked([]);
        } else {
            setChecked(contacts);
        }
        let scontacts = contacts;
        setContacts(scontacts);
    };

    useEffect(() => {
        setContacts(users);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSelect = (e) => {
        //alert(e.target.value)
        setCheckAll(0);
        setChecked([]);
        setGroupSelected(parseInt(e.target.value));
        if (parseInt(e.target.value) !== 0) {
            let newUsers = [];
            users.forEach((group, key) => {
                if (parseInt(group.groupe_id) === parseInt(e.target.value)) {
                    newUsers.push(group);
                }
            });

            setContacts(newUsers);
        } else {
            setContacts(users);
        }
    };

    return (
        <div>
            <div>
                {success === 1 && <Info msg={lang.textes.msgSaveSuccess[lang.id]} type="success" />}
                {err === 1 && <Info msg={lang.textes.errorSendSms[lang.id]} type="error" />}
                {errr === 1 && <Info msg={lang.textes.errorSendSmsNumber[lang.id]} type="error" />}
            </div>
            <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={matchDownSM ? 0 : 2}>
                    <Grid item xs={12} sm={8}>
                        <motion.div
                        >
                            <MainCard
                                title={lang.textes.titleNewMsg[lang.id]}
                                elevation={1}
                                secondary={
                                    <SecondaryAction title={lang.textes.msgSend[lang.id]} link="/dashboard/message/sended" icon={<SendOutlinedIcon />} />
                                }
                            >
                                <div>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 1.5 }}
                                        whileHover={{ scale: 1.03 }}
                                    >
                                        <Grid>
                                            <AdminCompose />
                                        </Grid>
                                    </motion.div>
                                </div>
                                <CardContent sx={{ mt: 0, pt: 0, mb: 0, pb: 2 }}>
                                    <TextField
                                        autoFocus
                                        fullWidth
                                        margin="normal"
                                        name="message"
                                        type="text"
                                        multiline
                                        rows={12}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        sx={{ ...theme.typography.customInput }}
                                    />
                                </CardContent>
                                <CardActions sx={{ mt: 0, pt: 0 }}>
                                    <Box>
                                        <AnimateButton>
                                            <Button
                                                endIcon={<SendIcon />}
                                                disableElevation
                                                fullWidth
                                                size="large"
                                                type="submit"
                                                variant="contained"
                                                color="secondary"
                                            >
                                                {lang.textes.sendMsg[lang.id]}
                                            </Button>
                                        </AnimateButton>
                                    </Box>
                                </CardActions>
                            </MainCard>
                        </motion.div>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.5 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <Card elevation={2}>
                                <CardHeader
                                    title={
                                        <div>
                                            <span>
                                            {lang.textes.allContact[lang.id]}
                                                <Chip label={checked.length} />
                                            </span>
                                        </div>
                                    }
                                />
                                <div>
                                    <Box sx={{ minWidth: 60, ml: 3, mr: 3 }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label"></InputLabel>
                                            <Select
                                                sx={{ p: 1 }}
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={groupSelected}
                                                onChange={handleSelect}
                                                label="Qtt"
                                                size="small"
                                            >
                                                <MenuItem value={0}>{lang.textes.allContact[lang.id]}</MenuItem>
                                                {groups &&
                                                    groups.map((group, index) => (
                                                        <MenuItem key={index} value={group.id}>
                                                            {group.title}
                                                        </MenuItem>
                                                    ))}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </div>
                                <div>
                                    <br />
                                    <Box>
                                        <PerfectScrollbar style={{ height: '100%', maxHeight: '350px', overflowX: 'hidden' }}>
                                            <Box>
                                                <List disablePadding>
                                                    {contacts &&
                                                        contacts.map((value) => {
                                                            const labelId = `checkbox-list-secondary-label-${value}`;
                                                            return (
                                                                <ListItem
                                                                    key={value}
                                                                    secondaryAction={
                                                                        <Checkbox
                                                                            edge="end"
                                                                            onChange={handleToggle(value)}
                                                                            checked={checked.indexOf(value) !== -1}
                                                                            inputProps={{ 'aria-labelledby': labelId }}
                                                                        />
                                                                    }
                                                                    disablePadding
                                                                >
                                                                    <ListItemButton>
                                                                        <ListItemAvatar>
                                                                            <Avatar>{value.name[0]}</Avatar>
                                                                        </ListItemAvatar>
                                                                        <ListItemText
                                                                            id={labelId}
                                                                            primary={`+${value.pays_id}${value.phone}`}
                                                                            secondary={value.name + ' ' + value.surname}
                                                                        />
                                                                    </ListItemButton>
                                                                </ListItem>
                                                            );
                                                        })}
                                                </List>
                                                <Box sx={{ ml: 7 }}>
                                                    {contacts.length === 0 && <EmptyImg style={{ width: 200, height: 'auto' }} />}
                                                </Box>
                                            </Box>
                                        </PerfectScrollbar>
                                    </Box>
                                </div>
                                <form>
                                    <CardActions>
                                        
                                        <Checkbox id="all" aria-label="dsdd" checked={checkAll} onChange={handleToggleAll} key="all" />
                                        <label htmlFor="all">{!checkAll ? lang.textes.selectAllContact[lang.id] : lang.textes.unselectAllContact[lang.id]}</label>
                                    </CardActions>
                                </form>
                            </Card>
                        </motion.div>
                        {contacts.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1.1 }}
                                whileHover={{ scale: 1.1 }}
                            >
                                <Button
                                    variant="contained"
                                    size="small"
                                    sx={{ mt: 2, ml: { lg: 17, sm: 5 } }}
                                    component={RouterLink}
                                    to="/dashboard/contact/add"
                                    color="error"
                                >
                                    {lang.textes.addContact[lang.id]}
                                </Button>
                            </motion.div>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={4} lg={4}></Grid>
                </Grid>
            </form>
        </div>
    );
};

export default SendMessage;
