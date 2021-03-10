import React from "react";
import { makeStyles, createStyles } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import AppBar from "../components/AppBar";
import LoginForm from "../components/Forms/loginform";
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    content: {},
    workarea: {
      //border: "solid 3px black",
      marginTop: "60px",
    },
  })
);
export default function Login() {
  const classes = useStyles();

  return (
    <>
      <Grid container className={classes.root}>
        <AppBar />
        <Grid item xs={12} md={6} lg={6} className={classes.content}></Grid>
        <Grid item xs={12} md={6} lg={4} className={classes.workarea}>
          <LoginForm />
        </Grid>
      </Grid>
    </>
  );
}
