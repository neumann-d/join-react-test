import { Candidate } from './types';

export const calculateScore = (candidate: Candidate) => {
    const score =
        (candidate.fullName ? 0.1 : 0) +
        (candidate.email ? 0.1 : 0) +
        (candidate.password ? 0.1 : 0) +
        (candidate.phone ? 0.2 : 0) +
        (candidate.avatar ? 0.5 : 0);
    return score;
};
