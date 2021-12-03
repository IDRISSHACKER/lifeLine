import * as React from "react"
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

const SecondaryAction = React.lazy(() => import('ui-component/cards/CardSecondaryAction'))
const RowUser = React.lazy(() => import("./usersComponent/rowUser"))
const AddBusinessOutlinedIcon = React.lazy(() => import('@mui/icons-material/AddBusinessOutlined'));
const MainCard = React.lazy(() => import('ui-component/cards/MainCard'))

const ListUser = () => {
    const users = useSelector(state => state.usersReducer)

    return (
        <React.Suspense fallback={<p>loading</p>}>
            <MainCard title={<div>
                <span>Vos Contacts </span>
                <Chip label={users.length} variant="filled" />
            </div>} secondary={
                <SecondaryAction
                    title="Ajouter un utilisateur"
                    link="/dashboard/contact/add"
                    icon={<AddBusinessOutlinedIcon />}
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
                            {users.length > 0 && users.map((user, index) => (
                                <RowUser user={user} key={index} />
                            ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <div>

                </div>
            </MainCard>
        </React.Suspense>
    )
};

export default ListUser;
