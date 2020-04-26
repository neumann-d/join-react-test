import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import { Candidates } from '../common/types';
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
    
    const [candidates, setCandidates] = useCandidatesState;
    const candidate = candidates[candidateKey];


    if (!candidate || candidate.deleted) {
        return null;
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
                            <MenuItem onClick={() => handleDelete(candidateKey)}>Delete</MenuItem>
                        </Menu>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default CandidateCard;
