import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, TextField, useMediaQuery, Box, Button, Divider } from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { useDispatch } from 'react-redux';
import { setUser } from 'store/Action/users.action';
import Info from '../utils/Info';
import { useNavigate } from 'react-router';
import { setGroup } from 'store/Action/goupe.action';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import CloudDoneOutlinedIcon from '@mui/icons-material/CloudDoneOutlined';
import { motion } from "framer-motion"

const NewCtg = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [createSuccessed, setCreateSuccessed] = useState(false);
    const [errored, setErrored] = useState(false);

    const resetErr = () => setTimeout(() => setErrored(false), 6000);
    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('title', title);
        data.append('description', description);

        if (title) {
            if (dispatch(setGroup(data))) {
                setTitle('');
                setDescription('');

                setCreateSuccessed(true);
                setTimeout(() => navigate('/dashboard/users/groups'), 2000);
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
        <MainCard
            title="Ajouter un groupe"
            secondary={<SecondaryAction title="List group" link="/dashboard/users/groups" icon={<ListAltOutlinedIcon />} />}
        >
            <form noValidate onSubmit={handleSubmit}>
                <div>
                    {createSuccessed && <Info msg="Groupe créer avec success" type="success" />}
                    {errored && <Info msg="Erreur lors de l'ajout du groupe" type="error" />}
                </div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    whileHover={{ scale: 1.005 }}
                >
                    <Grid container spacing={matchDownSM ? 0 : 2}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                autoFocus
                                fullWidth
                                label="Titre du group "
                                margin="normal"
                                name="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                sx={{ ...theme.typography.customInput }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                multiline
                                rows={6}
                                fullWidth
                                label="Description (optionel)"
                                margin="normal"
                                name="description"
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                sx={{ ...theme.typography.customInput }}
                            />
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
                                        startIcon={<CloudDoneOutlinedIcon />}
                                    >
                                        Ajouter le groupe
                                    </Button>
                                </AnimateButton>
                            </Box>
                        </Grid>
                    </Grid>
                </motion.div>
            </form>
        </MainCard>
    );
};

export default NewCtg;
