import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { connect } from 'react-redux';

import { Candidates } from '../../common/types';
import CandidateCard from './CandidateCard';
import CandidateCardMenu from './CandidateCardMenu';

const RecruiterView = ({ candidates }: { candidates: Candidates }) => {
    const candidateKeys = Object.keys(candidates);

    if (candidateKeys.length === 0) {
        return <LinearProgress style={{ height: '1ch' }} color="secondary" />;
    }

    const numberUndeletedCandidates = candidateKeys.reduce(
        (acc: number, curr: string) => (candidates[curr].deleted ? acc : acc + 1),
        0
    );

    return (
        <Container maxWidth="sm">
            <Box my={4}>
                <>
                    <Typography variant="h6" component="h1" gutterBottom>
                        {numberUndeletedCandidates} applications submitted
                    </Typography>
                    {candidateKeys.map(candidateKey => {
                        const menu = <CandidateCardMenu candidateKey={candidateKey} />;
                        return (
                            <CandidateCard
                                key={candidateKey}
                                candidateKey={candidateKey}
                                candidate={candidates[candidateKey]}
                                menu={menu}
                            />
                        );
                    })}
                </>
            </Box>
        </Container>
    );
};

const mapStateToProps = (candidates: Candidates) => {
    return {
        candidates
    };
};

export default connect(mapStateToProps)(RecruiterView);
