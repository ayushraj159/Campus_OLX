import { axios } from "../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { unload_user } from "../store/slices/authSlice";
import LogoutIcon from '@mui/icons-material/Logout';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import AlertDialog from "./AlertDialog";



export default function Logout(){

    const [dialogState, setDialogState] = useState(false)
    const [dialogResponse, setDialogResponse] = useState(false)

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () => {
        // setDialogState(true)
        const response = axios.post('user/logout/blacklist/', {
            refresh_token: localStorage.getItem('refresh_token'),
        });
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        axios.defaults.headers['Authorization'] = null;
        dispatch(unload_user())
        navigate('/');
    }
    
    useEffect(
        () => {
            if(dialogResponse){
                const response = axios.post('user/logout/blacklist/', {
                    refresh_token: localStorage.getItem('refresh_token'),
                });
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                axios.defaults.headers['Authorization'] = null;
                dispatch(unload_user())
                navigate('/');
            }

        }, [dialogResponse]
    )

    
    
    
    return (
        <>

            <AlertDialog content="Are you sure you want to logout?" state = {dialogState} backedState = {setDialogState} response = {setDialogResponse}/>
        <MenuItem onClick={handleLogout}>
            <ListItemIcon>
                <LogoutIcon fontSize="small" />
            </ListItemIcon>
            Logout
        </MenuItem>
        </>
    )

}