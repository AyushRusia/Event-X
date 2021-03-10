import React from "react";
import { makeStyles, createStyles, Typography, Paper } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import AppBar from "../components/AppBar";
import RegisterForm from "../components/Forms/registerform";
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {},
    content: {},
    workarea: {
      display: "block",
      margin: "auto",
      marginTop: "60px",
      //border: "solid 2px black",
    },
  })
);
export default function Register() {
  const classes = useStyles();

  return (
    <>
      <AppBar />
      <Grid container className={classes.root} justifyContent="center">
        <Grid item xs={11} lg={8} className={classes.workarea}>
          <RegisterForm />
        </Grid>
      </Grid>
    </>
  );
}
