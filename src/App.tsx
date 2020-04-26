import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import ViewListIcon from '@material-ui/icons/ViewList';
import React, { useEffect, useState } from 'react';
import { Link, Redirect, Route, Switch, useLocation } from 'react-router-dom';

import RecruiterView from './pages/RecruiterView';
import { Candidates } from './common/types';
import { loadData, saveData } from './store';

const useStyles = makeStyles(theme => ({
    logoBox: {
        display: 'flex'
    },
    title: {
        marginLeft: theme.spacing(2)
    },
    tabs: {
        flexGrow: 1
    },
    tab: {
        color: theme.palette.primary.contrastText
    }
}));

const App = () => {
    const classes = useStyles();

    const pathName = (useLocation() || {}).pathname;
    const candidatePath = '/candidate';
    const recruiterPath = '/recruiter';

    const [tabIndex, setTabIndex] = useState(candidatePath === pathName ? 0 : 1);
    const [candidates, setCandidates] = useState<Candidates>({});

    // try to fetch from API, otherwise use local JSON file
    useEffect(() => {
        const fetchData = async () => {
            if (Object.keys(candidates).length === 0) {
                const candidatesData = await loadData();
                saveData(candidatesData);
                setCandidates(candidatesData);
            }
        };

        fetchData();
    }, [candidates]);

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Grid container alignItems="center">
                        <Grid item md={4} xs={6} className={classes.logoBox}>
                            <Avatar component={Link} to={recruiterPath} alt="Logo" src="/logo192.png" />
                            <Typography variant="h6" className={classes.title}>
                                {process.env.REACT_APP_NAME} {process.env.REACT_APP_VERSION}
                            </Typography>
                        </Grid>
                        <Grid item md={4} xs={6}>
                            <Tabs
                                className={classes.tabs}
                                value={tabIndex}
                                onChange={(_, newValue) => setTabIndex(newValue)}
                                indicatorColor="secondary"
                                textColor="secondary"
                                centered
                            >
                                <Tab
                                    id="candidate-tab"
                                    component={Link}
                                    to={candidatePath}
                                    className={classes.tab}
                                    icon={<PersonIcon />}
                                    label="Candidate"
                                />
                                <Tab
                                    id="recruiter-tab"
                                    component={Link}
                                    to={recruiterPath}
                                    className={classes.tab}
                                    icon={<ViewListIcon />}
                                    label="Recruiter"
                                />
                            </Tabs>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Switch>
                {/* <Route component={() => <App />} exact path={candidatePath} /> */}
                <Route component={() => <RecruiterView candidates={candidates} />} exact path={recruiterPath} />
                <Redirect to={recruiterPath} />
            </Switch>
        </>
    );
};

export default App;
