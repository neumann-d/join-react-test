import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Candidate, Candidates, CandidateState } from '../../common/types';
import { calculateScore } from '../../common/utils';
import { saveData } from '../../store';
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

const CandidateView = ({
    useCandidatesState
}: {
    useCandidatesState: [Candidates, React.Dispatch<React.SetStateAction<Candidates>>];
}) => {
    const history = useHistory();
    const classes = useStyles();
    const [candidatesState, setCandidates] = useCandidatesState;
    const candidates = { ...candidatesState };
    const candidateKeys = Object.keys(candidates);

    const emptyCandidate = {
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
    const [showErrorMessage, setShowErrorMessage] = useState('');
    const [avatar, setAvatar] = useState('');

    if (candidateKeys.length === 0) {
        return <LinearProgress color="secondary" />;
    }

    const handleChange = (prop: keyof Candidate) => (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('handleChange');
        setShowErrorMessage('');
        setCandidate({ ...candidate, [prop]: event.target.value });
    };

    const handleSaveCandidate = async () => {
        if (!candidate.email) {
            setShowErrorMessage('E-mail is required!');
        } else if (candidate.email in candidates) {
            setCandidate({ ...candidate, email: '' });
            setShowErrorMessage('E-mail already in use!');
        } else {
            const now = new Date();
            const candidateData = {
                ...candidate,
                avatar,
                state: CandidateState.STATE_SUBMITTED,
                applied_on: `${now.getUTCDate()}.${now.getUTCMonth() + 1}.${now.getUTCFullYear()}`
            };
            candidates[candidate.email] = candidateData

            // calculate score
            candidates[candidate.email].score = calculateScore(candidateData);

            // save candidate in local storage and global state
            saveData(candidates);
            setCandidates(candidates);

            // reset input values
            setCandidate(emptyCandidate);

            // redirect to recruiter view
            history.push('/recruiter');
        }
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
                                        required
                                        error={showErrorMessage.length > 0}
                                        label="Your E-mail"
                                        id="candidate-form-email"
                                        variant="outlined"
                                        placeholder="john.doe@example.com"
                                        onChange={handleChange('email')}
                                        helperText={showErrorMessage}
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
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl className={classes.formControl}>
                                    <Button
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

export default CandidateView;
