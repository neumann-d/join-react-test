import { blueGrey, cyan, grey, red } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: blueGrey[900]
        },
        secondary: {
            main: cyan.A100
        },
        error: {
            main: red.A400
        },
        background: {
            default: grey[100]
        }
    }
});

ReactDOM.render(
    // <React.StrictMode>
    <ThemeProvider theme={theme}>
        <Router>
            <CssBaseline />
            <App />
        </Router>
    </ThemeProvider>,
    // </React.StrictMode>,
    document.getElementById('root')
);
