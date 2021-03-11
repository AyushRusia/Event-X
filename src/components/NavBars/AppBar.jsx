import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
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

export default function ButtonAppBar(props) {
  const { page } = props;
  const classes = useStyles();
  const history = useHistory();
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Event Registration Portal
          </Typography>

          <Button
            onClick={() => {
              history.push(page === "login" ? "/register" : "/");
            }}
            color="secondary"
            variant="contained"
            className={classes.btn}
          >
            {page === "login" ? "Register" : "Login"}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
