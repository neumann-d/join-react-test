import { act, render } from '@testing-library/react';
import React, { useState } from 'react';

import RecruiterView from '../pages/RecruiterView';
import { Candidate, Candidates } from '../common/types';

test('add candidate and rendering in recruiter tab', () => {
    let candidate: HTMLElement = document.createElement('div');
    const fullName = 'Bob Test';
    const email = `bob.test${Math.random() * 1000}@invalidmail`; // use invalid to avoid clashes with real data
    const newCandidate: Candidate = {
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

    const TestRecruiterViewComponent = () => {
        const [candidates, setCandidates] = useState<Candidates>({ testEmail: newCandidate });
        return <RecruiterView useCandidatesState={[candidates, setCandidates]} />;
    };

    act(() => {
        const { getByText } = render(<TestRecruiterViewComponent />);
        candidate = getByText(email);
    });

    expect(candidate).toBeInTheDocument();
}, 30000);
