// material-ui
import { useTheme } from '@mui/material/styles';
import settings from 'utils/settings';
/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //
const info = new settings().init()

const Logo = () => {
    const theme = useTheme();
    const favicon = info.APP_FOLDER+'/logo.png';

    return (
        /**
         * if you want to use image instead of svg uncomment following, and comment out <svg> element.
         *
         * <img src={logo} alt="Berry" width="100" />
         *
         */
        <img src={favicon} alt="lifline" />
    );
};

export default Logo;
