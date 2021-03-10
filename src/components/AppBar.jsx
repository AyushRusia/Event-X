import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link, useLocation, useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  btn: {
    marginRight: theme.spacing(3),
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Event Registration Portal
          </Typography>
          <Button
            onClick={() => {
              history.push("/");
            }}
            color="secondary"
            variant="contained"
            className={classes.btn}
          >
            {/* <Link to="/">Login</Link> */}
            Login
          </Button>
          <Button
            onClick={() => {
              history.push("/register");
            }}
            color="secondary"
            variant="contained"
            className={classes.btn}
          >
            {/* <Link to="/register">Register</Link> */}
            Register
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
