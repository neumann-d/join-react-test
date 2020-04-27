import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';

import rootReducer from '../store/reducers';
import App from '../App';

test('renders candidate/recruiter tab links', () => {
    const history = createMemoryHistory();
    const store = createStore(rootReducer);
    render(
        <ReduxProvider store={store}>
            <Router history={history}>
                <App />
            </Router>
        </ReduxProvider>
    );

    const candidateTab = document.getElementById('candidate-tab') || document.createElement('a');
    const recruiterTab = document.getElementById('recruiter-tab') || document.createElement('a');

    expect(candidateTab.closest('a')).toHaveAttribute('href', '/candidate');
    expect(recruiterTab.closest('a')).toHaveAttribute('href', '/recruiter');
});
