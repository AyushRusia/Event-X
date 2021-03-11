import React from "react";
import { makeStyles, createStyles, Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Image from "@material-ui/core";
import AppBar from "../components/AppBar";
import RegisterForm from "../components/Forms/registerform";
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      backgroundColor: "#ddd",
    },
    container: {
      display: "flex",
      flexDirection: "row-reverse",
    },
    content: { margin: "auto", marginTop: "100px" },
    heading: {
      textAlign: "center",
      fontFamily: "Raleway",
      fontWeight: "700",
      color: "#7a1139",
    },
    image: {
      height: "350px",
      width: "",
      margin: "auto",
      [theme.breakpoints.down("md")]: {
        height: "260px",
        width: "270px",
        margin: "auto",
      },
    },
    workarea: {
      display: "block",
      margin: "auto",
      marginTop: "25px",
      //border: "solid 2px black",
    },
  })
);
export default function Register() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar />
      <Grid container className={classes.container} justifyContent="center">
        <Grid item xs={11} lg={6} className={classes.content}>
          <Typography className={classes.heading} variant="h4">
            Register to EventX
          </Typography>
          <img src="/register.png" className={classes.image} />
        </Grid>
        <Grid item xs={11} lg={6} className={classes.workarea}>
          <RegisterForm />
        </Grid>
      </Grid>
    </div>
  );
}
