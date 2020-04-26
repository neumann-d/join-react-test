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
import { Link, Redirect, Route, Switch } from 'react-router-dom';

import RecruiterView from './pages/RecruiterView';
import { Candidate, Candidates } from './common/types';

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

    const [tabIndex, setTabIndex] = useState(1);
    const [candidates, setCandidates] = useState<Candidates>({});

    // try to fetch from API, otherwise use local JSON file
    useEffect(() => {
        const fetchData = async () => {
            if (Object.keys(candidates).length === 0) {
                // try to fetch from API, otherwise use local JSON file
                let candidatesArray: Candidate[] = [];
                try {
                    const apiResult = await fetch('https://candidates.free.beeceptor.com/api/candidate');
                    candidatesArray = await apiResult.json();
                    // console.log('fetched api result = ', candidatesArray);
                } catch (e) {
                    // console.log(e);
                    try {
                        const localResult = await fetch('/candidates.json');
                        candidatesArray = await localResult.json();
                        // console.log('fetched local result = ', candidatesArray);
                    } catch (e) {}
                }

                if (candidatesArray.length > 0) {
                    const candidatesData = candidatesArray.reduce((acc: Candidates, candidate) => {
                        acc[candidate.email] = candidate;
                        return acc;
                    }, {});
    
                    setCandidates(candidatesData);
                }
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
                            <Avatar component={Link} to="/recruiter" alt="Logo" src="/logo192.png" />
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
                                    to="/candidate"
                                    className={classes.tab}
                                    icon={<PersonIcon />}
                                    label="Candidate"
                                />
                                <Tab
                                    id="recruiter-tab"
                                    component={Link}
                                    to="/recruiter"
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
                {/* <Route component={() => <App />} exact path="/candidate" />  */}
                <Route component={() => <RecruiterView candidates={candidates} />} exact path="/recruiter" />
                <Redirect to="/recruiter" />
            </Switch>
        </>
    );
};

export default App;
