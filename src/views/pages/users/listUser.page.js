import * as React from 'react';
import { useSelector } from 'react-redux';
import { TableContainer, Table, TableHead, TableCell, TableBody, TableRow, Paper, Chip } from '@mui/material';
import Empty from '../utils/Empty';
import { motion } from 'framer-motion';

const SecondaryAction = React.lazy(() => import('ui-component/cards/CardSecondaryAction'));
const RowUser = React.lazy(() => import('./usersComponent/rowUser'));
const AddBusinessOutlinedIcon = React.lazy(() => import('@mui/icons-material/AddBusinessOutlined'));
const MainCard = React.lazy(() => import('ui-component/cards/MainCard'));
const ListUser = () => {
    const users = useSelector((state) => state.usersReducer)
    const lang = useSelector(state => state.languageReducer)

    return (
        <React.Suspense fallback={<p>loading</p>}>
            <div>
                {users.length > 0 && (
                        <MainCard
                            title={
                                <div>
                                    <span>{lang.textes.contact[lang.id]}</span>
                                    <Chip label={users.length} variant="filled" />
                                </div>
                            }
                            secondary={
                                <SecondaryAction
                                    title={lang.textes.addContact[lang.id]}
                                    link="/dashboard/contact/add"
                                    icon={<AddBusinessOutlinedIcon />}
                                />
                            }
                        >
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>{lang.textes.name[lang.id]}</TableCell>
                                            <TableCell>{lang.textes.phone[lang.id]}</TableCell>
                                            <TableCell>{lang.textes.email[lang.id]}</TableCell>
                                            <TableCell>{lang.textes.groupe[lang.id]}</TableCell>
                                            <TableCell align="right">{lang.textes.action[lang.id]}</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>{users.length > 0 && users.map((user, index) => <RowUser user={user} key={index} />)}</TableBody>
                                </Table>
                            </TableContainer>
                            <div></div>
                        </MainCard>
                )}
                {users.length === 0 && (
                    <Empty
                        text={lang.textes.emptyUsers[lang.id]}
                        buttonText={lang.textes.addContact[lang.id]}
                        buttonUrl="/dashboard/contact/add"
                    />
                )}
            </div>
        </React.Suspense>
    );
};

export default ListUser;
