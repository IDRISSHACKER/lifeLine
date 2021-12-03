import { Card, CardContent, Grid, Typography, Button } from "@mui/material"
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';

export default function ResetStat() {

    return (
        <Card>
            <Grid container>
                <Grid item xs={12} md={3} lg={3}>
                    <div className="iconTrash">
                        <ModelTrainingIcon className="icon" />
                    </div>
                </Grid>
                <Grid item xs={12} md={9} lg={9}>
                    <CardContent>
                        <Typography variant="h4">Restorer l'application</Typography>
                        <Typography variant="body1">
                            Cette option auras pour effet de suprimer touts les messages que vouz envoyées, suprimer vos contacts & groupe
                        </Typography>
                        <br />
                        <Button size="large" variant="text" color="error">Renitialiser</Button>
                    </CardContent>
                </Grid>
            </Grid>
        </Card >
    )
}