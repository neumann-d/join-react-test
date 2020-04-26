import { act, render } from '@testing-library/react';
import React, { useState } from 'react';

import RecruiterView from '../pages/RecruiterView';
import { Candidate, Candidates } from '../common/types';

test('add candidate and rendering in recruiter tab', async () => {
    let candidate: HTMLElement = document.createElement('div');
    const fullName = 'Bob Test';
    const email = `bob.test@example.com`;
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

    const { findByText } = render(<TestRecruiterViewComponent />);
    candidate = await findByText(email);

    expect(candidate).toBeInTheDocument();
});
