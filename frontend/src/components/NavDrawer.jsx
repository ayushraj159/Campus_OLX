import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Avatar from '@mui/material/Avatar';
import MailIcon from '@mui/icons-material/Mail';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { Link } from 'react-router-dom';

import { GiHamburgerMenu } from 'react-icons/gi'
import AccountMenu from './Menu';

import { useDispatch, useSelector } from 'react-redux';
import { open_login, open_register, closeAll } from '../store/slices/authModalSlice';

export default function NavDrawer() {

    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };


    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }


        setState({ ...state, [anchor]: open });
    };

    const email = useSelector((state: RootState) => state.auth.email)
    const username = useSelector((state: RootState) => state.auth.username)
    const openModal = useSelector((state: RootState) => state.authModal.openModal)

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem>
                    {!email ?
                        ""
                        :
                        <>
                            <ListItemIcon>
                                <Avatar alt="user" src="" >
                                {username && username.toUpperCase()[0]}
                                </Avatar>

                            </ListItemIcon>
                            {username}

                        </>
                    }

                </ListItem>

                {
                    !email ?
                    
                    <>

                    <ListItem key="Login" onClick={() => dispatch(open_login())} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>

                            <ListItemText primary="Login" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem key="Register" onClick={() => dispatch(open_register())} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>

                            <ListItemText primary="Register" />
                        </ListItemButton>
                    </ListItem>
                    </>
                    
                    :
                    <>

                    <Link to='/'>
                        <ListItem key="Profile" disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>

                                <ListItemText primary="Profile" />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Link to='/my-ads'>
                        <ListItem key="My Ads" disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>

                                <ListItemText primary="My Ads" />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    </>

                }



            </List>
            <Divider />
            <List>
                <Link to='/'>
                    <ListItem key="Home" disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>

                            <ListItemText primary="Home" />
                        </ListItemButton>
                    </ListItem>
                </Link>


            </List>
        </Box>
    );

    return (
        <div>

            <React.Fragment key={'right'}>
                <Button onClick={toggleDrawer('right', true)}><GiHamburgerMenu /></Button>
                <Drawer
                    anchor={'right'}
                    open={state['right']}
                    onClose={toggleDrawer('right', false)}
                >
                    {list('right')}
                </Drawer>
            </React.Fragment>

        </div>
    );
}
