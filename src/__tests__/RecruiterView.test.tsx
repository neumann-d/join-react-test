import { render } from '@testing-library/react';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { createStore } from 'redux';

import { Candidate } from '../common/types';
import { createId } from '../common/utils';
import RecruiterView from '../pages/RecruiterView';
import { CandidatesAction, CandidatesActionTypes } from '../store/actions';
import rootReducer from '../store/reducers';

test('add candidate and rendering in recruiter tab', async () => {
    let candidate: HTMLElement = document.createElement('div');
    const fullName = 'Bob Test';
    const email = `bob.test@example.com`;
    const newCandidate: Candidate = {
        id: createId(),
        email,
        fullName,
        applied_on: '26.04.2020',
        password: '123123123',
        phone: '+49123456',
        avatar: 'https://randomuser.me/api/portraits/men/13.jpg',
        state: 'submitted',
        score: 1.0,
        deleted: false
    };
    const store = createStore(rootReducer);
    const candidates = { testEmail: newCandidate };
    store.dispatch<CandidatesAction>({ type: CandidatesActionTypes.CANDIDATES, value: candidates });

    const { findByText } = render(
        <ReduxProvider store={store}>
            <RecruiterView />
        </ReduxProvider>
    );
    candidate = await findByText(email);

    expect(candidate).toBeInTheDocument();
});
