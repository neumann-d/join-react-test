import { blueGrey, cyan, grey, red } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';

import App from './App';
import rootReducer from './store/reducers';
import { CandidatesAction, CandidatesActionTypes } from './store/actions';
import { loadData } from './store/localStorage';

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

// create redux store
const store = createStore(rootReducer);

// use local storage data if existing or try to fetch initial data from API, otherwise use local JSON file
loadData().then(candidates =>
    store.dispatch<CandidatesAction>({ type: CandidatesActionTypes.CANDIDATES, value: candidates })
);

ReactDOM.render(
    // <React.StrictMode>
    <ThemeProvider theme={theme}>
        <Router>
            <CssBaseline />
            <ReduxProvider store={store}>
                <App />
            </ReduxProvider>
        </Router>
    </ThemeProvider>,
    // </React.StrictMode>,
    document.getElementById('root')
);
