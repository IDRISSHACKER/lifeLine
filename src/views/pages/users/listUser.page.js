import * as React from 'react';
import { useSelector } from 'react-redux';
import { TableContainer, Table, TableHead, TableCell, TableBody, TableRow, Paper, Chip, Button, TextField, Stack, Menu, MenuItem, Divider, InputAdornment } from '@mui/material';
import Empty from '../utils/Empty';
import { LoadingButton } from '@mui/lab';
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress';
import { AddCircleOutlineSharp, Filter1Rounded, Filter2Outlined, FilterBAndWRounded, SearchOutlined } from '@mui/icons-material';

const SecondaryAction = React.lazy(() => import('ui-component/cards/CardSecondaryAction'));
const RowUser = React.lazy(() => import('./usersComponent/rowUser'));
const AddBusinessOutlinedIcon = React.lazy(() => import('@mui/icons-material/AddBusinessOutlined'));
const MainCard = React.lazy(() => import('ui-component/cards/MainCard'));
const ListUser = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const usersTabs = useSelector((state) => state.usersReducer)
    const lang = useSelector(state => state.languageReducer)

    const [users, setUsers] = React.useState([])
    const [loadUsers, setLoadUsers] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const CONTACT_VISIBLE = 10

    React.useEffect(() => {


        let counter = 0
        let local_Users = []
        usersTabs.forEach(user => {
            if (counter < CONTACT_VISIBLE) {
                local_Users.push(user)
                counter += 1
            }
        });
        setUsers(local_Users)

    }, [usersTabs])

    const showMoreContact = () => {
        setLoadUsers(true)
        let counter = 0
        let local_Users = []
        const newSize = users.length + CONTACT_VISIBLE
        for (counter = 0; counter < newSize; counter++) {
            local_Users.push(usersTabs[counter])

        }
        setUsers(local_Users);
        setTimeout(() => {
            setLoadUsers(false)
        }, 2000)
    }

    const showAllContact = () => {
        setLoading(true)
        let timer = setTimeout(()=>{
            setUsers(usersTabs)
            setLoading(false)
            clearTimeout(timer)
        },200)
    }

    const handleFindContact = (e) => {
        const value = e.target.value;
        if (value.length > 0) {
            let local_Users1 = []
            usersTabs.forEach(user => {
                if (user.name.toLowerCase().includes(value.toLowerCase())) {
                    local_Users1.push(user)
                }else{
                    //local_Users = usersTabs
                }
            }
            )
            if (local_Users1.length > 0) {
                let counter = 0
                let local_Users = []
                local_Users1.forEach(user => {
                    if (counter < CONTACT_VISIBLE) {
                        local_Users.push(user)
                        counter += 1
                    }
                });
                setUsers(local_Users)
            }else{
               
            }
        } else {
            let counter = 0
            let local_Users = []
            usersTabs.forEach(user => {
                if (counter < CONTACT_VISIBLE) {
                    local_Users.push(user)
                    counter += 1
                }
            });
            setUsers(local_Users)
        }
    }


    return (
        <React.Suspense fallback={<p>loading</p>}>
            <div>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
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
                                icon={<AddCircleOutlineSharp />}
                            />
                        }
                    >
                        <div>
                            <div className='tab-filter'>
                                <Stack spacing={2}>
                                    <TextField 
                                    id="findContact" 
                                    label="find a contact" 
                                    variant="outlined" 
                                    onChange={handleFindContact}
                                    InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="end">
                                                    <SearchOutlined />
                                                </InputAdornment>
                                            ),
                                    }}
                                     />
                                    <div>
                                       {/**  <Button
                                            id="demo-customized-button"
                                            aria-controls={open ? 'demo-customized-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            variant="contained"
                                            disableElevation
                                            onClick={handleClick}
                                            endIcon={<FilterBAndWRounded />}
                                        >
                                            sort by
                                        </Button>
                                        <Menu
                                            id="demo-customized-menu"
                                            MenuListProps={{
                                                'aria-labelledby': 'demo-customized-button',
                                            }}
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                        >
                                            <MenuItem onClick={handleClose} disableRipple>
                                                Edit
                                            </MenuItem>
                                            <MenuItem onClick={handleClose} disableRipple>
                                                Duplicate
                                            </MenuItem>
                                            <Divider sx={{ my: 0.5 }} />
                                            <MenuItem onClick={handleClose} disableRipple>
                                                Archive
                                            </MenuItem>
                                            <MenuItem onClick={handleClose} disableRipple>
                                                More
                                            </MenuItem>
                                        </Menu>
                                        */}
                                    </div>
                                </Stack>
                            </div>
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
                        </div>
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
                            <div>
                                <Button mt={20} variant="contained" disableElevation onClick={showMoreContact}>
                                    {`${lang.textes.showAll[lang.id]} +${usersTabs.length - users.length}`}
                                </Button>
                                <Button mt={20} variant="outlined" disableElevation onClick={showAllContact}>
                                    Show all
                                </Button>
                            </div>)}
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
