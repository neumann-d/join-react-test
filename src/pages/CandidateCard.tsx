import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import { Candidate } from '../common/types';

const useStyles = makeStyles(theme => ({
    cardRoot: {
        minWidth: 275,
        marginBottom: theme.spacing(2),
        fontSize: 14
    },
    progressWrapper: {
        position: 'relative'
    },
    progressValue: {
        position: 'absolute',
        top: '10px',
        left: '6px',
        fontSize: 12
    },
}));

const CandidateCard = ({ candidateKey, candidate }: { candidateKey: string, candidate: Candidate }) => {
    const classes = useStyles();

    if (!candidate) {
        return null;
    }

    return (
        <Card key={candidateKey} className={classes.cardRoot}>
            <CardContent>
                <Grid container alignItems="center" justify="space-between">
                    <Grid item xs={2}>
                        <Avatar alt={candidate.fullName} src={candidate.avatar} />
                    </Grid>
                    <Grid item xs={9}>
                        <Typography variant="h6" component="h2">
                            {candidate.fullName}
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                            {candidate.email}
                        </Typography>
                        <Chip size="small" label={candidate.state && candidate.state.toUpperCase()} />
                        <Typography color="textSecondary">Applied on: {candidate.applied_on}</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <div className={classes.progressWrapper}>
                            <Typography className={classes.progressValue} color="textSecondary">
                                {candidate.score * 100}%
                            </Typography>
                            <CircularProgress variant="static" value={candidate.score * 100} />
                        </div>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default CandidateCard;
