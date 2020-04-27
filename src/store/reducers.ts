import { Candidates } from '../common/types';
import { CandidatesAction, CandidatesActionTypes } from './actions';
import { saveData } from './localStorage';

const rootReducer = (candidates: Candidates = {}, action: CandidatesAction) => {
    if (action.type === CandidatesActionTypes.CANDIDATES) {
        const candidatesUpdate: Candidates = action.value;

        // merge new state
        const updatedCandidates: Candidates = {
            ...candidates,
            ...candidatesUpdate
        };

        // save state in local browser storage
        saveData(updatedCandidates);

        return updatedCandidates;
    }
    return candidates;
};

export default rootReducer;
