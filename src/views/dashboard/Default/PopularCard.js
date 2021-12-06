import PropTypes from 'prop-types';
import { useState } from 'react';
import {Link as RouterLink} from "react-router-dom"
import { useTheme } from '@mui/material/styles';
import { Button, CardActions, CardContent, Divider, Grid, Menu, Typography } from '@mui/material';
import BajajAreaChartCard from './BajajAreaChartCard';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import CellWifiIcon from '@mui/icons-material/CellWifi';
import GitHubIcon from '@mui/icons-material/GitHub';
import {useSelector} from "react-redux"

const PopularCard = ({ isLoading }) => {
    const theme = useTheme();
    const lang = useSelector(state => state.languageReducer)

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
                                        <Typography variant="h4">{lang.textes.stat[lang.id]}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sx={{ pt: '16px !important' }}>
                                <BajajAreaChartCard />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h4" color="inherit">
                                {lang.textes.chortCut[lang.id]}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container direction="column">
                                   <Grid item>
                                       <Button component={RouterLink} target="_blank" to="https://github.com/idriss-coder/lifeline" startIcon={<CellWifiIcon/>} color="error">{lang.textes.reloadMsg[lang.id]}</Button>
                                   </Grid>
                                   <Grid item>
                                       <Button target="_blank"  href="https://github.com/idriss-coder/lifeline"  startIcon={<GitHubIcon/>} color="secondary">{lang.textes.github[lang.id]}</Button>
                                   </Grid>
                                </Grid>
                                <Divider sx={{ my: 1.5 }} />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }}>
                        <Button component={RouterLink} to="/dashboard/message/sended" size="small" disableElevation>
                            {lang.textes.viewAllMsg[lang.id]}
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
