import { useEffect } from 'react';
import { useSelector } from 'react-redux';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, Grid, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import chartData from './chart-data/bajaj-area-chart';

// ===========================|| DASHBOARD DEFAULT - BAJAJ AREA CHART CARD ||=========================== //

const BajajAreaChartCard = () => {
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);
    const chartMonth = useSelector(state => state.chartMonthReducer)
    const month = []
    const data = []
    chartMonth.forEach((chart) => {
        month.push(chart.created_at)
        data.push(chart.nb)
    })

    const { navType } = customization;

    const orangeDark = theme.palette.secondary[800];

    useEffect(() => {
        const newSupportChart = {
            ...chartData.options,
            colors: [orangeDark],
            tooltip: {
                theme: 'light'
            }
        };
        ApexCharts.exec(`support-chart`, 'updateOptions', newSupportChart);
    }, [navType, orangeDark]);

    const chartData = {
        type: 'bar',
        height: 130,
        options: {
            chart: {
                id: 'support-chart',
                sparkline: {
                    enabled: true
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth',
                width: 1
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom',
                            offsetX: -10,
                            offsetY: 0
                        }
                    }
                }
            ],
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '50%'
                }
            },
            labels: month,
            xaxis: {
                type: '',
                categories: month,
            },
            yaxis: {
                opposite: true
            },
            legend: {
                horizontalAlign: 'left'
            }

        },
        series: [
            {
                name: "Message",
                data,
            }
        ],
    };


    return (
        <Card sx={{ bgcolor: 'secondary.light' }}>
            <Grid container sx={{ p: 2, pb: 0, color: '#fff' }}>
                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="subtitle1" sx={{ color: theme.palette.secondary.dark }}>
                                Message envoyés
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h4" sx={{ color: theme.palette.grey[800] }}>
                                Group By Month
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.grey[800] }}>
                        This Year
                    </Typography>
                </Grid>
            </Grid>
            <Chart {...chartData} />
        </Card>
    );
};

export default BajajAreaChartCard;
