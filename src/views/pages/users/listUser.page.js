import { useState, useEffect } from "react"
import { useTheme } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux'
import { getUsers } from "../../../store/Action/users.action"
import {
    Grid,
    TextField,
    useMediaQuery,
    Box,
    Button,
    Divider,
    TableContainer,
    Table,
    TableHead,
    TableCell,
    TableBody,
    TableRow,
    Paper
} from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import RowUser from "./usersComponent/rowUser"

// ==============================|| TYPOGRAPHY ||============================== //

const ListUser = () => {
    const theme = useTheme()
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const dispatch = useDispatch()

    const users = useSelector(state => state.usersReducer)


    useEffect(()=>{
        dispatch(getUsers())
    },[])

    return (
        <MainCard title="Vos Contacts" secondary={<SecondaryAction link="/dashboard/default" />}>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nom</TableCell>
                            <TableCell>Telephone</TableCell>
                            <TableCell>Email</TableCell>
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
