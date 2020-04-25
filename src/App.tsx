import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const App = () => {
  console.log(`${process.env.REACT_APP_NAME} ${process.env.REACT_APP_VERSION}`);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            {process.env.REACT_APP_NAME} {process.env.REACT_APP_VERSION}
          </Typography>
        </Toolbar>
      </AppBar>
      <Typography variant="h4" component="h1">
        Hello World
      </Typography>
    </>
  );
}

export default App;
