export enum CandidateState {
    STATE_SUBMITTED = 'submitted',
    STATE_IN_REVIEW = 'in review',
    STATE_NOT_A_FIT = 'not a fit'
}

export interface Candidate {
    id: string;
    fullName: string;
    email: string;
    password: string;
    phone: string;
    avatar: string;
    applied_on: string;
    state: string;
    score: number;
    deleted: boolean;
}

export interface Candidates {
    [key: string]: Candidate;
}
