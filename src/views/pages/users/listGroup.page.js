import { useSelector } from 'react-redux';
import { TableContainer, Table, TableHead, TableCell, TableBody, TableRow, Paper, Chip } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import RowGroup from './usersComponent/rowGroup';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import Empty from '../utils/Empty';
import { motion } from "framer-motion"

const ListGroup = () => {
    const groups = useSelector((state) => state.groupeReducer)
    const lang = useSelector(state => state.languageReducer)

    return (
        <div>
                {groups.length > 0 && (
                    <MainCard
                        title={
                            <div>
                                <span>{lang.textes.groupContact[lang.id]} </span>
                                <Chip label={groups.length} variant="filled" />
                            </div>
                        }
                        secondary={<SecondaryAction title={lang.textes.addGroup[lang.id]} link="/dashboard/users/newCtg" icon={<AddBoxOutlinedIcon />} />}
                    >
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>{lang.textes.groupName[lang.id]}</TableCell>
                                        <TableCell>{lang.textes.description[lang.id]}</TableCell>
                                        <TableCell>{lang.textes.nbContact[lang.id]}</TableCell>
                                        <TableCell align="right">{lang.textes.action[lang.id]}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {groups.length > 0 && groups.map((group, index) => <RowGroup group={group} key={index} />)}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <div></div>
                    </MainCard>
                )}
                {groups.length === 0 && (
                    <Empty text={lang.textes.notGroupToShow[lang.id]} buttonText={lang.textes.addGroup[lang.id]} buttonUrl="/dashboard/users/newCtg" />
                )}
        </div>
    );
};

export default ListGroup;
