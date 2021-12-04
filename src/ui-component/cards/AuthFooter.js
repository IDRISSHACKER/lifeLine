// material-ui
import { Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
    <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle2" component={Link} href="https://github.com/idriss-coder/lifleline" target="_blank" underline="hover">
            lifeline github
        </Typography>
        <Typography variant="subtitle2" component={Link} href="#" target="_blank" underline="hover">
            &copy; idrisscoder@gmail.com
        </Typography>
    </Stack>
);

export default AuthFooter;
