import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import { Candidates } from '../common/types';
import CandidateCard from './CandidateCard'

const RecruiterView = ({ candidates }: { candidates: Candidates }) => {

    const candidateKeys = Object.keys(candidates);

    if (candidateKeys.length === 0) {
        return <LinearProgress color="secondary" />;
    }

    return (
        <Container maxWidth="sm">
            <Box my={4}>
                <>
                    <Typography variant="h6" component="h1" gutterBottom>
                        {candidateKeys.length} applications submitted
                    </Typography>
                    {candidateKeys.map(candidateKey => {
                        const candidate = candidates[candidateKey];
                        return <CandidateCard key={candidateKey} candidateKey={candidateKey} candidate={candidate} />;
                    })}
                </>
            </Box>
        </Container>
    );
};

export default RecruiterView;
