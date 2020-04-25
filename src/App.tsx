import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    title: {
        marginLeft: theme.spacing(2),
    },
}));

const App = () => {
    const classes = useStyles();

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Avatar alt="Logo" src="/logo192.png" />
                    <Typography variant="h6" className={classes.title}>
                        {process.env.REACT_APP_NAME} {process.env.REACT_APP_VERSION}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Typography variant="h4" component="h1">
                Coming soon...
            </Typography>
        </>
    );
};

export default App;
