import { Typography, Button, Box } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { ReactComponent as EmptyImg } from "assets/images/icons/undraw_empty_cart_co35.svg"
import { motion } from "framer-motion"
export default function Empty({ text, buttonText, buttonUrl }, props) {


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            whileHover={{ scale: 1.03 }}
        >
            <div className="empty">
                <EmptyImg className="img" {...props} />
                <Box sx={{ mt: 3 }} className="emptyBox">
                    <Typography variant="h5">{text}</Typography>
                    <Button variant="contained" size="large" color="secondary" component={RouterLink} to={buttonUrl}>{buttonText}</Button>
                </Box>
            </div>
        </motion.div>
    )
}