import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import React, { useState } from 'react';

import { Candidates, CandidateState } from '../common/types';
import { saveData } from '../store';

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
    formContainer: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200
    }
}));

const CandidateCard = ({
    candidateKey,
    useCandidatesState
}: {
    candidateKey: string;
    useCandidatesState: [Candidates, React.Dispatch<React.SetStateAction<Candidates>>];
}) => {
    const classes = useStyles();

    // menu state
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    // dialog states
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedState, setSelectedState] = useState<string>('');

    const [candidatesState, setCandidates] = useCandidatesState;
    const candidates = { ...candidatesState };
    const candidate = candidates[candidateKey];

    if (!candidate || candidate.deleted) {
        return null;
    }

    if (candidate.state && !selectedState) {
        setSelectedState(candidate.state);
    }

    const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleDelete = (candidateKey: string) => {
        candidates[candidateKey].deleted = true;
        saveData(candidates);
        setCandidates(candidates);
        handleCloseMenu();
    };

    const handleChangeState = () => {
        candidates[candidateKey].state = selectedState;
        saveData(candidates);
        setCandidates(candidates);
        handleCloseChangeStateDialog();
    };

    const handleChangeSelectedState = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedState(String(event.target.value) || '');
    };

    const handleOpenChangeStateDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseChangeStateDialog = () => {
        setOpenDialog(false);
        handleCloseMenu();
    };

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
                        <IconButton
                            aria-label="more"
                            aria-controls="candidate-menu"
                            aria-haspopup="true"
                            onClick={handleClickMenu}
                        >
                            <MoreHorizIcon />
                        </IconButton>
                        <Menu
                            id="candidate-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleCloseMenu}
                        >
                            <MenuItem onClick={handleOpenChangeStateDialog}>Change State</MenuItem>
                            <Dialog open={openDialog} onClose={handleCloseChangeStateDialog}>
                                <DialogTitle>Change State</DialogTitle>
                                <DialogContent>
                                    <form className={classes.formContainer}>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel id="application-state-label">State</InputLabel>
                                            <Select
                                                labelId="application-state-label"
                                                id="application-state-select"
                                                value={selectedState}
                                                onChange={handleChangeSelectedState}
                                                input={<Input />}
                                            >
                                                {Object.entries(CandidateState).map((stateKeyValue, key) => {
                                                    return (
                                                        <MenuItem key={key} value={stateKeyValue[1]}>
                                                            {stateKeyValue[1]}
                                                        </MenuItem>
                                                    );
                                                })}
                                            </Select>
                                        </FormControl>
                                    </form>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleCloseChangeStateDialog}>
                                        Cancel
                                    </Button>
                                    <Button onClick={handleChangeState} variant="contained" color="primary">
                                        Ok
                                    </Button>
                                </DialogActions>
                            </Dialog>
                            <MenuItem onClick={() => handleDelete(candidateKey)}>Delete</MenuItem>
                        </Menu>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default CandidateCard;
