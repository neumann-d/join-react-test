import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import React, { useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { Candidates, CandidateState } from '../../common/types';
import { CandidatesAction, CandidatesActionTypes } from '../../store/actions';

const useStyles = makeStyles(theme => ({
    avatar: {
        margin: theme.spacing(1),
        height: '6ch',
        width: '6ch'
    },
    cardRoot: {
        minWidth: 275,
        marginBottom: theme.spacing(2),
        fontSize: 14
    },
    formContainer: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200
    },
    progressWrapper: {
        position: 'relative'
    },
    progressValue: {
        position: 'absolute',
        top: '10px',
        left: '6px',
        fontSize: 12
    }
}));

const CandidateCardMenu = ({
    candidateId,
    candidates,
    setCandidates
}: {
    candidateId: string;
    candidates: Candidates;
    setCandidates: Function;
}) => {
    const classes = useStyles();

    // menu state
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    // dialog states
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedState, setSelectedState] = useState<string>('');

    const candidate = candidates[candidateId];

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
        setCandidates(candidates);
        handleCloseMenu();
    };

    const handleChangeState = () => {
        candidates[candidateId].state = selectedState;
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
        <>
            <IconButton aria-label="more" aria-controls="candidate-menu" aria-haspopup="true" onClick={handleClickMenu}>
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
                        <Button onClick={handleCloseChangeStateDialog}>Cancel</Button>
                        <Button onClick={handleChangeState} variant="contained" color="primary">
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
                <MenuItem onClick={() => handleDelete(candidateId)}>Delete</MenuItem>
            </Menu>
        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(CandidateCardMenu);
