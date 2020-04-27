import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Dispatch } from 'redux';

import { Candidate, Candidates, CandidateState } from '../../common/types';
import { calculateScore, createId } from '../../common/utils';
import { CandidatesAction, CandidatesActionTypes } from '../../store/actions';
import CandidateAvatarUpload from './CandidateAvatarUpload';

const useStyles = makeStyles(theme => ({
    avatar: {
        margin: theme.spacing(2),
        height: '10ch',
        width: '10ch'
    },
    formContainer: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    formControl: {
        margin: theme.spacing(1),
        width: '45ch'
    },
    formInputLabel: {
        marginLeft: theme.spacing(2)
    }
}));

const CandidateView = ({ candidates, setCandidates }: { candidates: Candidates; setCandidates: Function }) => {
    const history = useHistory();
    const classes = useStyles();

    const emptyCandidate = {
        id: '',
        email: '',
        applied_on: '',
        avatar: '',
        password: '',
        deleted: false,
        fullName: '',
        phone: '',
        score: 0,
        state: ''
    };
    const [candidate, setCandidate] = useState(emptyCandidate);
    const [avatar, setAvatar] = useState('');

    const handleChange = (prop: keyof Candidate) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setCandidate({ ...candidate, [prop]: event.target.value });
    };

    const handleSaveCandidate = () => {
        const now = new Date();
        const id = createId();
        const candidateData = {
            ...candidate,
            id,
            avatar,
            state: CandidateState.STATE_SUBMITTED,
            applied_on: `${now.getUTCDate()}.${now.getUTCMonth() + 1}.${now.getUTCFullYear()}`
        };
        candidates[id] = candidateData;

        // calculate score
        candidates[id].score = calculateScore(candidateData);

        // save updated candidates in global redux state
        setCandidates(candidates);

        // reset input values
        setCandidate(emptyCandidate);

        // redirect to recruiter view
        history.push('/recruiter');
    };

    return (
        <Container maxWidth="sm">
            <Box my={4}>
                <>
                    <Typography variant="h6" component="h1" gutterBottom>
                        Interested in this job?
                    </Typography>
                    <form className={classes.formContainer}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <FormControl className={classes.formControl}>
                                    <Avatar className={classes.avatar} alt={candidate.fullName} src={avatar} />
                                    <CandidateAvatarUpload
                                        useAvatarState={[avatar, setAvatar]}
                                        buttonText={avatar ? 'Change picture' : 'Upload picture'}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl className={classes.formControl}>
                                    <TextField
                                        label="Your E-mail"
                                        id="candidate-form-email"
                                        variant="outlined"
                                        placeholder="john.doe@example.com"
                                        onChange={handleChange('email')}
                                        value={candidate.email}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl className={classes.formControl}>
                                    <TextField
                                        label="Full Name"
                                        id="candidate-form-full-name"
                                        variant="outlined"
                                        placeholder="John Doe"
                                        onChange={handleChange('fullName')}
                                        value={candidate.fullName}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl className={classes.formControl}>
                                    <TextField
                                        label="Password"
                                        id="candidate-form-password"
                                        variant="outlined"
                                        type="password"
                                        placeholder="Choose a password"
                                        onChange={handleChange('password')}
                                        value={candidate.password}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl className={classes.formControl}>
                                    <TextField
                                        label="Phone Number"
                                        id="candidate-form-phone-number"
                                        variant="outlined"
                                        placeholder="1231122890"
                                        onChange={handleChange('phone')}
                                        value={candidate.phone}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl className={classes.formControl}>
                                    <Button
                                        id="candidate-form-submit"
                                        color="primary"
                                        variant="contained"
                                        onClick={handleSaveCandidate}
                                        size="large"
                                    >
                                        Apply for this job
                                    </Button>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </form>
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

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        setCandidates: (candidates: Candidates) =>
            dispatch<CandidatesAction>({ type: CandidatesActionTypes.CANDIDATES, value: candidates })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CandidateView);
