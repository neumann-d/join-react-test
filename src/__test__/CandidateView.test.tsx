import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React, { useState } from 'react';
import { Router } from 'react-router-dom';

import CandidateView from '../pages/CandidateView';
import { Candidate, Candidates } from '../common/types';

test('test invalid empty email in candidate tab', async () => {
    const TestCandidateViewComponent = () => {
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
        const [candidates, setCandidates] = useState<Candidates>({ [emptyCandidate.email]: emptyCandidate });
        return <CandidateView useCandidatesState={[candidates, setCandidates]} />;
    };

    const history = createMemoryHistory();
    render(
        <Router history={history}>
            <TestCandidateViewComponent />
        </Router>
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
    const TestCandidateViewComponent = () => {
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
        const [candidates, setCandidates] = useState<Candidates>({ [exampleCandidate.email]: exampleCandidate });
        return <CandidateView useCandidatesState={[candidates, setCandidates]} />;
    };

    const history = createMemoryHistory();
    render(
        <Router history={history}>
            <TestCandidateViewComponent />
        </Router>
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
    let candidates: Candidates = {
        [exampleCandidate.email]: exampleCandidate
    };
    const TestCandidateViewComponent = () => {
        const [candidateState, setCandidatesState] = useState<Candidates>(candidates);
        candidates = { ...candidates, ...candidateState };
        // console.log('render: candidates = ', candidates);
        return <CandidateView useCandidatesState={[candidateState, setCandidatesState]} />;
    };

    const history = createMemoryHistory();
    render(
        <Router history={history}>
            <TestCandidateViewComponent />;
        </Router>
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

    // console.log('candidates = ', candidates);

    expect(candidates[emailInputValue].fullName).toBe(fullName);
});
