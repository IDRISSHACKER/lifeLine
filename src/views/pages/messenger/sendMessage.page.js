import { useState, useEffect } from "react"
import { useTheme } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import {
    Grid,
    TextField,
    useMediaQuery,
    Box,
    Button,
    Divider,
    Card,
    CardHeader,
    CardContent
} from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import { useSelector, useDispatch } from 'react-redux'
import { getUsers } from "../../../store/Action/users.action"

const SendMessage = () => {
    const [checked, setChecked] = useState([1]);
    const theme = useTheme()
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const dispatch = useDispatch()

    const users = useSelector(state => state.usersReducer)


    useEffect(()=>{
        dispatch(getUsers())
    },[])

    const [message, setMessage] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = new FormData()
        data.append("message", message)
    }

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
    
        setChecked(newChecked);
      };

    return (
        <MainCard title="Nouveau message" secondary={<SecondaryAction link="/dashboard/default" />}>
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
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card>
                            <CardHeader title="Selectionner  les contacts" />
                            <CardContent>
                                <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                    {users.map((value) => {
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
                                                    <ListItemText id={labelId} primary={`+${value.pays_id}${value.phone}`} secondary={value.name+" "+value.surname} />
                                                </ListItemButton>
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box sx={{ mt: 2 }}>
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
                    </Grid>
                </Grid>
            </form>
        </MainCard>
    )
};

export default SendMessage;
