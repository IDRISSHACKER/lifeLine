import PropTypes from 'prop-types';
import { useState } from 'react';
import {Link as RouterLink} from "react-router-dom"
// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Button, CardActions, CardContent, Divider, Grid, Menu, MenuItem, Typography } from '@mui/material';

// project imports
import BajajAreaChartCard from './BajajAreaChartCard';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import CellWifiIcon from '@mui/icons-material/CellWifi';
import GitHubIcon from '@mui/icons-material/GitHub';
// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const PopularCard = ({ isLoading }) => {
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            {isLoading ? (
                <SkeletonPopularCard />
            ) : (
                <MainCard content={false}>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Grid container alignContent="center" justifyContent="space-between">
                                    <Grid item>
                                        <Typography variant="h4">Statistique</Typography>
                                    </Grid>
                                    <Grid item>
                                        <MoreHorizOutlinedIcon
                                            fontSize="small"
                                            sx={{
                                                color: theme.palette.primary[200],
                                                cursor: 'pointer'
                                            }}
                                            aria-controls="menu-popular-card"
                                            aria-haspopup="true"
                                            onClick={handleClick}
                                        />
                                        <Menu
                                            id="menu-popular-card"
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                            variant="selectedMenu"
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right'
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right'
                                            }}
                                        >
                                        </Menu>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sx={{ pt: '16px !important' }}>
                                <BajajAreaChartCard />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h4" color="inherit">
                                    Racourcis utiles
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container direction="column">
                                   <Grid item>
                                       <Button component={RouterLink} target="_blank" to="https://github.com/idriss_coder/lifeline" startIcon={<CellWifiIcon/>} color="error">Recharger mes messages</Button>
                                   </Grid>
                                   <Grid item>
                                       <Button target="_blank"  href="https://github.com/idriss_coder/lifeline"  startIcon={<GitHubIcon/>} color="secondary">Depot github</Button>
                                   </Grid>
                                </Grid>
                                <Divider sx={{ my: 1.5 }} />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }}>
                        <Button component={RouterLink} to="/dashboard/message/sended" size="small" disableElevation>
                            View All Messages
                            <ChevronRightOutlinedIcon />
                        </Button>
                    </CardActions>
                </MainCard>
            )}
        </>
    );
};

PopularCard.propTypes = {
    isLoading: PropTypes.bool
};

export default PopularCard;
