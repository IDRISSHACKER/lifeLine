import { useSelector } from 'react-redux';
import { TableContainer, Table, TableHead, TableCell, TableBody, TableRow, Paper, Chip } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import RowGroup from './usersComponent/rowGroup';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import Empty from '../utils/Empty';
import { motion } from "framer-motion"

const ListGroup = () => {
    const groups = useSelector((state) => state.groupeReducer);

    return (
        <div>
                {groups.length > 0 && (
                    <MainCard
                        title={
                            <div>
                                <span>Groups of Contacts </span>
                                <Chip label={groups.length} variant="filled" />
                            </div>
                        }
                        secondary={<SecondaryAction title="Add group" link="/dashboard/users/newCtg" icon={<AddBoxOutlinedIcon />} />}
                    >
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell>Nombre de contact</TableCell>
                                        <TableCell align="right">Action</TableCell>
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
                    <Empty text="Vous n'avez aucun groupe à afficher !" buttonText="Ajouter un groupe" buttonUrl="/dashboard/users/newCtg" />
                )}
        </div>
    );
};

export default ListGroup;
