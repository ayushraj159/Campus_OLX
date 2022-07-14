import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

import { Provider } from 'react-redux';
import store from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme({
    palette: {
        primary: {
            main: "rgb(0, 165, 145)" // This is an orange looking color
        },
        // secondary: {
            // main: "#ffcc80" //Another orange-ish color
        // }
    },
    typography: {
        fontFamily: 'Quicksand',
        color: "white"
        },
    overrides: {
        MuiFormControlLabel: {
            label: {
                fontSize: '0.575rem',
            }
        }
    }
});





root.render(
    <Provider store = {store}>
        <ThemeProvider theme = {theme}>
            <App />
        </ThemeProvider>
    </Provider>
);


