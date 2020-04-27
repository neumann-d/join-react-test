import { fireEvent, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createStore } from 'redux';

import CandidateView from '../pages/CandidateView';
import rootReducer from '../store/reducers';

test('test create new empty candidate in candidate tab with score 0%', async () => {
    const store = createStore(rootReducer);
    const history = createMemoryHistory();
    render(
        <ReduxProvider store={store}>
            <Router history={history}>
                <CandidateView />
            </Router>
        </ReduxProvider>
    );

    const emailInput = document.getElementById('candidate-form-email') || document.createElement('input');
    const submitButton = document.getElementById('candidate-form-submit') || document.createElement('button');

    fireEvent.change(emailInput, { target: { value: '' } });
    fireEvent.click(submitButton);

    store.subscribe(() => {
        const candidates = store.getState();
        const candidatesIds = Object.keys(candidates);
        // console.log('updatedCandidates = ', updatedCandidates);
        expect(candidates[candidatesIds[0]].score).toBe(0);
    });
});

test('test sucessfully create new candidate in candidate tab with score 30%', async () => {
    const store = createStore(rootReducer);
    const history = createMemoryHistory();
    render(
        <ReduxProvider store={store}>
            <Router history={history}>
                <CandidateView />
            </Router>
        </ReduxProvider>
    );

    const emailInput = document.getElementById('candidate-form-email') || document.createElement('input');
    const fullNameInput = document.getElementById('candidate-form-full-name') || document.createElement('input');
    const passwordInput = document.getElementById('candidate-form-password') || document.createElement('input');
    const submitButton = document.getElementById('candidate-form-submit') || document.createElement('button');

    const emailInputValue = 'john.doe.new@example.com';
    const fullName = 'John Doe';
    fireEvent.change(emailInput, { target: { value: emailInputValue } });
    fireEvent.change(fullNameInput, { target: { value: fullName } });
    fireEvent.change(passwordInput, { target: { value: 'abc123' } });
    fireEvent.click(submitButton);

    store.subscribe(() => {
        const candidates = store.getState();
        const candidatesIds = Object.keys(candidates);
        // console.log('updatedCandidates = ', updatedCandidates);
        expect(candidates[candidatesIds[0]].score).toBe(0.3);
    });
});
