import * as React from 'react';
import { useSelector } from 'react-redux';
import { TableContainer, Table, TableHead, TableCell, TableBody, TableRow, Paper, Chip, Button } from '@mui/material';
import Empty from '../utils/Empty';
import { LoadingButton } from '@mui/lab';

const SecondaryAction = React.lazy(() => import('ui-component/cards/CardSecondaryAction'));
const RowUser = React.lazy(() => import('./usersComponent/rowUser'));
const AddBusinessOutlinedIcon = React.lazy(() => import('@mui/icons-material/AddBusinessOutlined'));
const MainCard = React.lazy(() => import('ui-component/cards/MainCard'));
const ListUser = () => {
    const usersTabs = useSelector((state) => state.usersReducer)
    const lang = useSelector(state => state.languageReducer)

    const [users, setUsers] = React.useState([])
    const [loadUsers, setLoadUsers] = React.useState(false)
    const CONTACT_VISIBLE = 30

    React.useEffect(()=>{
        let counter = 0
        let local_Users = []
        usersTabs.forEach(user => {
            if(counter < CONTACT_VISIBLE){
                local_Users.push(user)
                counter += 1
            }
        });
        setUsers(local_Users)
    },[usersTabs])

    const showAllContact = ()=>{
        setLoadUsers(true)
        let counter = 0
        let local_Users = []
        const newSize = users.length+CONTACT_VISIBLE
        for(counter = 0; counter < newSize; counter++){
            local_Users.push(usersTabs[counter])

        }
        setUsers(local_Users);
        setTimeout(()=>{
            setLoadUsers(false)
        },2000)
    }


    return (
        <React.Suspense fallback={<p>loading</p>}>
            <div>
                {users.length > 0 && (
                        <MainCard
                            title={
                                <div>
                                    <span>{lang.textes.contact[lang.id]}</span>
                                    <Chip label={` ${users.length}/${usersTabs.length} `} variant="filled" />
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
                {usersTabs.length > users.length && (
                    <div>
                        <br />
                        {!loadUsers && (
                        <Button mt={20} variant="contained" disableElevation onClick={showAllContact}>
                            {lang.textes.showAll[lang.id]}
                        </Button>)}
                        {loadUsers && (<LoadingButton loading loadingIndicator={lang.textes.loadNewContact[lang.id]} variant="outlined">
                            {lang.textes.loadNewContact[lang.id]}.............................................
                        </LoadingButton>)}
                    </div>
                )}
            </div>
        </React.Suspense>
    );
};

export default ListUser;
