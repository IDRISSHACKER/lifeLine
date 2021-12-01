import { useState, useEffect } from "react"
import { useTheme } from '@mui/material/styles';
import {
    Grid,
    TextField,
    useMediaQuery,
    Box,
    Button,
    Divider
} from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { useDispatch } from "react-redux";
import { setUser } from "store/Action/users.action";
import Info from "../utils/Info";
import { useNavigate } from "react-router";

const CreateUser = () => {
    const theme = useTheme()
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [nom, setNom] = useState("")
    const [prenom, setPrenom] = useState("")
    const [email, setEmail] = useState("")
    const [code, setCode] = useState("")
    const [phone, setPhone] = useState("")
    const [createSuccessed, setCreateSuccessed] = useState(false)
    const [errored, setErrored] = useState(false)

    const resetErr = ()=>setTimeout(()=>setErrored(false),6000)
    const handleSubmit = (e) => {
        e.preventDefault()

        const data = new FormData()
        data.append("nom", nom)
        data.append("prenom", prenom)
        data.append("email", email)
        data.append("pays", code)
        data.append("phone", phone)

        if (nom && prenom && code && phone) {

            if (dispatch(setUser(data))) {

                setNom("")
                setPrenom("")
                setEmail("")
                setCode("")
                setPhone("")

                setCreateSuccessed(true)
                setTimeout(()=>navigate("/dashboard/contact/list"),2000)
            }else{
                setErrored(true)
                resetErr()
            }
        }else{
            setErrored(true)
            resetErr()
        }
    }

    return (
        <MainCard title="Ajouter un contact" secondary={<SecondaryAction link="/dashboard/default" />}>
            <form noValidate onSubmit={handleSubmit}>
                <div>
                    {createSuccessed && <Info msg="Contact ajouté avec success" type="success" />}
                    {errored && <Info msg="Erreur lors de l'ajout du contact" type="error" />}
                </div>
                <Grid container spacing={matchDownSM ? 0 : 2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
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
                    <Divider />
                    <Grid item xs={12} sm={8}>
                    </Grid>
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
                                >
                                    Ajouter le contact
                                </Button>
                            </AnimateButton>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </MainCard>
    )
};

export default CreateUser;
