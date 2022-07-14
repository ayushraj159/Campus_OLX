import React from "react";
import {BiLogInCircle, BiLogOutCircle} from 'react-icons/bi';

import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import { useIsAuthenticated } from "@azure/msal-react";

function handleLogin(instance) {
    instance.loginPopup(loginRequest).then(console.log("logged in")).catch(e => {
        console.error(e);
    });
}

function handleLogout(instance) {
    instance.logoutRedirect().then(console.log("logged out")).catch(e => {
        console.error(e);
    });
}

/**
 * Renders a button which, when selected, will open a popup for login
 */
export const SignInButton = () => {
    const { instance } = useMsal();
    const style = {
        fontSize: '2rem',
        color: '#fff',
        marginRight: '15px',
    }

    return (<>
        <BiLogInCircle style={style} />
        
    </>

    );
}