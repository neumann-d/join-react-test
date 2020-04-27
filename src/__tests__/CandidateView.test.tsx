import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';

import CandidateView from '../pages/CandidateView';
import { Candidate } from '../common/types';
import rootReducer from '../store/reducers';
import { CandidatesAction, CandidatesActionTypes } from '../store/actions';

test('test invalid empty email in candidate tab', async () => {
    const emptyCandidate: Candidate = {
        email: '',
        applied_on: '',
        avatar: '',
        password: '',
        deleted: false,
        fullName: '',
        phone: '',
        score: 0,
        state: ''
    };

    const store = createStore(rootReducer);
    const candidates = { [emptyCandidate.email]: emptyCandidate };
    store.dispatch<CandidatesAction>({ type: CandidatesActionTypes.CANDIDATES, value: candidates });

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

    const emailErrorMessage =
        document.getElementById('candidate-form-email-helper-text') || document.createElement('p');

    expect(emailErrorMessage.innerHTML).toBe('E-mail is required!');
});

test('test invalid existing email in candidate tab', async () => {
    const exampleCandidate: Candidate = {
        email: 'john.doe@example.com',
        applied_on: '',
        avatar: '',
        password: '',
        deleted: false,
        fullName: '',
        phone: '',
        score: 0,
        state: ''
    };
    const store = createStore(rootReducer);
    const candidates = { [exampleCandidate.email]: exampleCandidate };
    store.dispatch<CandidatesAction>({ type: CandidatesActionTypes.CANDIDATES, value: candidates });

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

    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.click(submitButton);

    const emailErrorMessage =
        document.getElementById('candidate-form-email-helper-text') || document.createElement('p');

    expect(emailErrorMessage.innerHTML).toBe('E-mail already in use!');
});

test('test sucessfully create new candidate in candidate tab', async () => {
    const exampleCandidate: Candidate = {
        email: 'john.doe@example.com',
        applied_on: '',
        avatar: '',
        password: '',
        deleted: false,
        fullName: '',
        phone: '',
        score: 0,
        state: ''
    };
    const store = createStore(rootReducer);
    const candidates = { [exampleCandidate.email]: exampleCandidate };
    store.dispatch<CandidatesAction>({ type: CandidatesActionTypes.CANDIDATES, value: candidates });

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
        const updatedCandidates = store.getState();
        // console.log('updatedCandidates = ', updatedCandidates);
        expect(updatedCandidates[emailInputValue].fullName).toBe(fullName);
    });
});
