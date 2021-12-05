import { useSelector } from 'react-redux';
import { TableContainer, Table, TableHead, TableCell, TableBody, TableRow, Paper, Chip } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import RowMsg from './messengerComponent/RowMsg';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import Empty from '../utils/Empty';
import { motion } from "framer-motion"

const MessageSended = () => {
    const messages = useSelector((state) => state.messengerReducer);

    return (
        <div>
            {messages.length > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    whileHover={{ scale: 1.005 }}
                >
                    <MainCard
                        title={
                            <div>
                                <span>Message envoyés </span>
                                <Chip label={messages.length} variant="filled" />
                            </div>
                        }
                        secondary={<SecondaryAction title="Nouveau message " link="/dashboard/message/send" icon={<MessageOutlinedIcon />} />}
                    >
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Receiver</TableCell>
                                        <TableCell>message</TableCell>
                                        <TableCell>sended at</TableCell>
                                        <TableCell align="right">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>{messages.length > 0 && messages.map((msg, index) => <RowMsg msg={msg} key={index} />
                                )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <div></div>
                    </MainCard>
                </motion.div>
            )}
            {messages.length === 0 && (
                <Empty
                    text="Aucun messages à afficher dans votre boite de messages envoyés"
                    buttonText="Envoyer un message"
                    buttonUrl="/dashboard/message/send"
                />
            )}
        </div>
    );
};

export default MessageSended;
