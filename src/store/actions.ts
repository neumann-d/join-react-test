import { Candidates } from '../common/types';

export enum CandidatesActionTypes {
    CANDIDATES = 'CANDIDATES'
}

export interface CandidatesAction {
    type: CandidatesActionTypes;
    value: Candidates;
}
