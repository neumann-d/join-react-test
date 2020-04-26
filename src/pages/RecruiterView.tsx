import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import { Candidates } from '../common/types';

const useStyles = makeStyles(theme => ({
    cardRoot: {
        minWidth: 275,
        marginBottom: theme.spacing(2),
        fontSize: 14
    }
}));

const RecruiterView = ({ candidates }: { candidates: Candidates }) => {
    const classes = useStyles();

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

                        return (
                            <Card key={candidateKey} className={classes.cardRoot}>
                                <CardContent>
                                    <Typography variant="h6" component="h2">
                                        {candidate.fullName}
                                    </Typography>
                                    <Typography color="textSecondary" gutterBottom>
                                        {candidate.email}
                                    </Typography>
                                </CardContent>
                            </Card>
                        );
                    })}
                </>
            </Box>
        </Container>
    );
};

export default RecruiterView;
