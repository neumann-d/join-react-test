export interface Candidate {
    id: string;
    fullName: string;
    email: string;
    password: string;
    phone: string;
    avatar: string;
    applied_on: string;
    state: string;
    score: number,
    deleted: boolean
}

export interface Candidates {
    [key: string]: Candidate;
}
