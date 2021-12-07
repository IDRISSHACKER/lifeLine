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
    const lang = useSelector(state => state.languageReducer)

    return (
        <div>
            {messages.length > 0 && (

                    <MainCard
                        title={
                            <div>
                                <span>{lang.textes.msgSend[lang.id]}</span>
                                <Chip label={messages.length} variant="filled" />
                            </div>
                        }
                        secondary={<SecondaryAction title={lang.textes.msgSend[lang.id]} link="/dashboard/message/send" icon={<MessageOutlinedIcon />} />}
                    >
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>{lang.textes.receiver[lang.id]}</TableCell>
                                        <TableCell>{lang.textes.message[lang.id]}</TableCell>
                                        <TableCell>{lang.textes.sendedAt[lang.id]}</TableCell>
                                        <TableCell align="right">{lang.textes.action[lang.id]}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>{messages.length > 0 && messages.map((msg, index) => <RowMsg msg={msg} key={index} />
                                )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <div></div>
                    </MainCard>
            )}
            {messages.length === 0 && (
                <Empty
                    text={lang.textes.noSms[lang.id]}
                    buttonText={lang.textes.sendSms[lang.id]}
                    buttonUrl="/dashboard/message/send"
                />
            )}
        </div>
    );
};

export default MessageSended;
