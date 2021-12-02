import { useState, useEffect } from "react"
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
import { useDispatch, useSelector } from 'react-redux'
import Scrollbar from "../utils/ScrollBar";
import SimpleBarReact from 'simplebar-react';
import { setMessages } from "store/Action/message.action";
import Info from "../utils/Info";
import { useNavigate } from "react-router-dom";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

const SendMessage = () => {
    const [checked, setChecked] = useState([]);
    const [groupSelected, setGroupSelected] = useState(0)
    const [contacts, setContacts] = useState([])
    const [checkAll, setCheckAll] = useState(0)
    const [success, setSuccess] = useState(0)
    const [err, setErr] = useState(0)

    const theme = useTheme()
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const users = useSelector(state => state.usersReducer)
    const groups = useSelector(state => state.groupeReducer)

    const [message, setMessage] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = new FormData()

        if (message && checked.length > 0) {
            data.append("message", message)
            data.append("users", JSON.stringify(checked))

            if (dispatch(setMessages(data))) {
                setSuccess(1)
                setTimeout(() => setSuccess(0), 2000)
                setMessage("")
                setChecked([])
                setCheckAll(0)
                setTimeout(() => navigate("/dashboard/message/sended"), 2000)
            } else {
                setErr(1)
                setTimeout(() => setErr(0), 2000)
            }
        } else {
            setErr(1)
            setTimeout(() => setErr(0), 2000)
        }
    }

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
            if (checked.length + 1 === contacts.length) {
                setCheckAll(1)
            }
        } else {
            newChecked.splice(currentIndex, 1);
            setCheckAll(0)
        }

        setChecked(newChecked);
    };

    const handleToggleAll = (e) => {
        const isCheck = e.target.checked
        setCheckAll(isCheck)
        if (!isCheck) {
            setChecked([])
        } else {
            setChecked(contacts)
        }
        let scontacts = contacts
        setContacts(scontacts)
    }

    useEffect(() => {
        setContacts(users)
    }, [])

    const handleSelect = (e) => {
        //alert(e.target.value)
        setCheckAll(0)
        setChecked([])
        setGroupSelected(parseInt(e.target.value))
        if (parseInt(e.target.value) !== 0) {
            let newUsers = []
            users.forEach((group, key) => {
                if (parseInt(group.groupe_id) === parseInt(e.target.value)) {
                    newUsers.push(group)
                }
            })

            setContacts(newUsers)
        } else {
            setContacts(users)
        }
    }


    return (
        <MainCard title="Nouveau message"
            secondary={
                <SecondaryAction
                    title="Messages envoyés"
                    link="/dashboard/message/sended"
                    icon={<SendOutlinedIcon />}
                />
            }
        >
            <div>
                {success === 1 && <Info msg="Message(s) envoyé(s) avec success" type="success" />}
                {err === 1 && <Info msg="Ereur lors de l'envoi du message" type="error" />}
            </div>
            <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={matchDownSM ? 0 : 2}>
                    <Grid item xs={12} sm={8}>
                        <Card variant="outlined">
                            <CardHeader title="Message" subheader="Entrez le contenu de votre message" />
                            <CardContent>
                                <TextField
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
                            <CardActions>
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
                                            Envoyer le message
                                        </Button>
                                    </AnimateButton>
                                </Box>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card variant='elevation'>
                            <CardHeader title={
                                <div>
                                    <span>Selectionner  les contacts </span>
                                    <Chip label={checked.length} />
                                </div>
                            } />
                            <div>
                                <Box sx={{ minWidth: 60 }}>
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
                                            <MenuItem value={0}>All contact</MenuItem>
                                            {groups && groups.map((group, index) => (
                                                <MenuItem key={index} value={group.id}>{group.title}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                            <div>
                                <br />
                                <Scrollbar sx={{ height: "240px" }}>
                                    <List disablePadding>
                                        {contacts && contacts.map((value) => {
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
                                                        <ListItemText id={labelId} primary={`+${value.pays_id}${value.phone}`} secondary={value.name + " " + value.surname} />
                                                    </ListItemButton>
                                                </ListItem>
                                            );
                                        })}
                                    </List>
                                </Scrollbar>
                            </div>
                            <form>
                                <CardActions>
                                    <Checkbox
                                        id="all"
                                        aria-label="dsdd"
                                        checked={checkAll}
                                        onChange={handleToggleAll}
                                        key="all"
                                    />
                                    <label htmlFor="all">{!checkAll ? "Select all contact" : "Unselect all contact"}</label>
                                </CardActions>
                            </form>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                    </Grid>
                </Grid>
            </form>
        </MainCard>
    )
};

export default SendMessage;
