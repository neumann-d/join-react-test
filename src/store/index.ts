import { Candidate, Candidates } from '../common/types';

// load existing candidate from local browser storage, otherwise fetch from API or local JSON
export const loadData = async () => {
    let candidates: Candidates = {};

    // try to load data from local storage
    try {
        const localCandidates = window.localStorage.getItem('candidates');
        candidates = localCandidates ? JSON.parse(localCandidates) : {};
        // console.log('local storage = ', candidates);
    } catch (e) {}

    if (Object.keys(candidates).length === 0) {
        // try to fetch from API, otherwise use local JSON file
        let candidatesArray: Candidate[] = [];
        try {
            const apiResult = await fetch('https://candidates.free.beeceptor.com/api/candidate');
            candidatesArray = await apiResult.json();
            // console.log('fetched api result = ', candidatesArray);
        } catch (e) {
            // console.log(e);
            try {
                const localResult = await fetch('/candidates.json');
                candidatesArray = await localResult.json();
                // console.log('fetched local result = ', candidatesArray);
            } catch (e) {}
        }

        // transform array to Candidates object
        candidates = candidatesArray.reduce((acc: Candidates, candidate) => {
            acc[candidate.email] = candidate;
            return acc;
        }, {});
    }

    return candidates;
};

export const saveData = (candidates: Candidates) => {
    window.localStorage.setItem('candidates', JSON.stringify(candidates));
};
