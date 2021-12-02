import { useSelector } from 'react-redux'
import {
    TableContainer,
    Table,
    TableHead,
    TableCell,
    TableBody,
    TableRow,
    Paper,
    Chip
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import RowUser from "./usersComponent/rowUser"
import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';

const ListUser = () => {
    const users = useSelector(state => state.usersReducer)

    return (
        <MainCard title={<div>
            <span>Vos Contacts </span>
            <Chip label={users.length} variant="filled" />
        </div>} secondary={
            <SecondaryAction
                title="Ajouter un utilisateur"
                link="/dashboard/contact/add"
                icon={<AddBusinessOutlinedIcon/>}
            />
        }
    >
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nom</TableCell>
                            <TableCell>Telephone</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Groupe</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.length > 0 && users.map((user, index)=>(
                            <RowUser user={user} key={index} />
                        ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <div>
                
            </div>
        </MainCard>
    )
};

export default ListUser;
