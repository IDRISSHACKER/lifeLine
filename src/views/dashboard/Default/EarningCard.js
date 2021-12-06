import PropTypes from 'prop-types';
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Chip, Grid, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import { useSelector } from 'react-redux';
import settings from 'utils/settings';
const set = new settings().init()

const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.dark,
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: theme.palette.secondary[800],
        borderRadius: '50%',
        top: -85,
        right: -95,
        [theme.breakpoints.down('sm')]: {
            top: -105,
            right: -140
        }
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: theme.palette.secondary[800],
        borderRadius: '50%',
        top: -125,
        right: -15,
        opacity: 0.5,
        [theme.breakpoints.down('sm')]: {
            top: -155,
            right: -70
        }
    }
}));

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const EarningCard = ({ isLoading }) => {
    const admin = useSelector(state => state.adminReducer)
    const lang = useSelector(state => state.languageReducer)
    const theme = useTheme();
    const User1 = `${set.APP_FOLDER}/files/avatar/${admin.avatar}`

    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 2.25 }}>
                        <Grid container direction="column">
                            <Grid item>
                                <Grid container justifyContent="space-between">
                                    <Grid item>
                                        <Grid container>
                                            <Grid item lg={6}>
                                                <Avatar
                                                    src={User1}
                                                    variant="rounded"
                                                    sx={{
                                                        ...theme.typography.commonAvatar,
                                                        ...theme.typography.largeAvatar,
                                                        backgroundColor: theme.palette.secondary[800],
                                                        mt: 1,
                                                        width:60,
                                                        height:60
                                                    }}
                                                >
                                                    <AdminPanelSettingsOutlinedIcon sx={{ color: "white" }} />
                                                </Avatar>
                                            </Grid>
                                            <Grid item lg={6}>
                                                <Avatar
                                                    variant="rounded"
                                                    sx={{
                                                        ...theme.typography.commonAvatar,
                                                        ...theme.typography.largeAvatar,
                                                        backgroundColor: theme.palette.secondary[800],
                                                        mt: 1
                                                    }}
                                                >
                                                    <AdminPanelSettingsOutlinedIcon sx={{ color: "white" }} />
                                                </Avatar>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container alignItems="center">
                                    <Grid item>
                                        <Typography sx={{ fontSize: '1.4rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                                            {admin && admin.name} {admin && admin.surname}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Avatar
                                            sx={{
                                                cursor: 'pointer',
                                                ...theme.typography.smallAvatar,
                                                backgroundColor: theme.palette.secondary[200],
                                                color: theme.palette.secondary.dark
                                            }}
                                        >
                                            <ArrowUpwardIcon fontSize="inherit" sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }} />
                                        </Avatar>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item sx={{ mb: 1.25 }}>
                                <Typography
                                    sx={{
                                        fontSize: '1rem',
                                        fontWeight: 500,
                                        color: theme.palette.secondary[200]
                                    }}
                                >
                                    <Chip sx={{ color: "white" }} label={<span>{lang.textes.admin[lang.id]}</span>} />
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

EarningCard.propTypes = {
    isLoading: PropTypes.bool
};

export default EarningCard;
