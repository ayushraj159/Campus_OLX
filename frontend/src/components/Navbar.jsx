import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import Dropdown from './Dropdown.jsx';
import { BiLogInCircle } from 'react-icons/bi'
import { BiUserCircle } from 'react-icons/bi';
import Button from './Button';
import NavDrawer from './NavDrawer';

import Box from '@mui/material/Box';

import Modal from '@mui/material/Modal';

import Register from './Register';
import Login from './Login';
import { useDispatch, useSelector } from 'react-redux';
import { open_login, open_register, closeAll } from '../store/slices/authModalSlice';
import AccountMenu from './Menu'

function Navbar() {
    const [isMobile, setMobile] = useState(window.innerWidth < 960);
    
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: isMobile ? '80vw' : '45vw',
        height: '80vh',
        bgcolor: 'background.paper',
        boxShadow: 24,
        outline: 'none',
        zIndex: "10000",
        p: 4,
        fontSize: '5px',
        overflowY: 'auto'
    };
    const dispatch = useDispatch()
    const navigator = useNavigate()
    const [atHome, setAtHome] = useState(true)

    const changeNavOnNavigate = {

    }

    const email = useSelector((state: RootState) => state.auth.email)
    const openModal = useSelector((state: RootState) => state.authModal.openModal)
    const openLogin = useSelector((state: RootState) => state.authModal.openLogin)
    const openRegister = useSelector((state: RootState) => state.authModal.openRegister)


    const [dropdown, setDropdown] = useState(false);

    
    const handleOpen = () => {
        dispatch(open_login());
    }
    
    const updateScreen = () => {
      setMobile(window.innerWidth < 960);
    };
  
    useEffect(() => {
        if (window.location.pathname === "/") {
            setAtHome(true);
        } else {
            setAtHome(false)
        }
        window.addEventListener("resize", updateScreen);
        return () => window.removeEventListener("resize", updateScreen);

    }, [navigator]);



    const onMouseEnter = () => {
        if (window.innerWidth < 960) {
            setDropdown(true);
        } else {
            setDropdown(true);
        }
    };

    const onMouseLeave = () => {
        if (window.innerWidth < 960) {
            setDropdown(true);
        } else {
            setDropdown(false);
        }
    };


    const [scrolled, setScrolled] = useState(false);
    const changeNavbarColor = () => {
        if (window.scrollY >= 80) {
            setScrolled(true);
        }
        else {
            setScrolled(false);
        }
    }

    window.addEventListener('scroll', changeNavbarColor);


    return (
        <>

            {/* auth modal */}

            <Modal
                open={openModal}
                onClose={() => dispatch(closeAll())}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            
            >
                <Box sx={style}>
                    {openLogin ? <Login /> : <Register />}
                </Box>

            </Modal>



            <nav className={!scrolled ? atHome ? "navbar" : "navbar notAtHomeNotScrolled" : "navbar navbar-color" }  >
                <Link to='/' className='navbar-logo'>
                    olxC
                    <i class='fab fa-firstdraft' />
                </Link>
                {/* <div className='menu-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} >Click</i>
                </div> */}
                <ul className='nav-menu'>
                    <li className='nav-item'>
                        <Link to='/' className='nav-links'>
                            Home
                        </Link>
                    </li>
                    <li
                        className='nav-item'
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                    >
                        <Link
                            to='/'
                            className='nav-links'    
                        >
                            Categories <i className='fa fa-angle-down' />
                        </Link>
                        {dropdown && <Dropdown />}
                    </li>
                    <li className='nav-item'>
                        <Link
                            to='category/'
                            className='nav-links'
                            state={{}}
                        >
                            Products
                        </Link>
                    </li>
                    {/* <li className='nav-item'>
                        <Link
                            to='/contact-us'
                            className='nav-links'
                        >
                            Contact Us
                        </Link>
                    </li> */}
                </ul>
                <Button />
                {
                    (!isMobile) ?
                    email ? 
                        <AccountMenu className='nav-icons'/>
                    :
                        <BiLogInCircle onClick={() => dispatch(open_login())} className='nav-icons' />
                    :
                    ""
                    
                }

                {isMobile && <NavDrawer className='nav-icons' />}

            </nav>
        </>
    );
}



export default Navbar;