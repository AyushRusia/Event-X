import React from "react";
import { makeStyles, createStyles, Typography } from "@material-ui/core";
import { Grid, Box } from "@material-ui/core";
import AppBar from "../components/NavBars/AppBar";
import LoginForm from "../components/Forms/loginform";
import CustomCarousel from "../components/indexpage/carousel";
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#ddd",
    },
    content: {
      marginTop: "60px",
      height: "",
      padding: "15px",
    },
    workarea: {
      marginTop: "60px",
    },
    title: {
      textAlign: "center",
      fontFamily: "sans-serif",
      fontWeight: "800",
    },
    subtitle: {
      paddingRight: "20px",
      paddingLeft: "20px",
      marginTop: "10px",
      textAlign: "justify",
      marginBottom: "8px",
      fontFamily: "serif",
      color: "#000",
      fontWeight: "700",
    },
  })
);
export default function Login() {
  const classes = useStyles();

  return (
    <>
      <Grid container className={classes.root}>
        <AppBar page="login" />
        <Grid item xs={12} md={6} lg={7} className={classes.content}>
          <Box mt={4} justifyContent="center">
            <Typography variant="h5" component="h4" className={classes.title}>
              Welcome To Event X
            </Typography>
            <Typography
              variant="h6"
              fontFamily="serif"
              component="p"
              className={classes.subtitle}
            >
              Register yourself in EventX then you can online create Event's
              Booking System then sit back and relax we will take payments on
              behalf of you provide all the necessary details of clients.
            </Typography>
          </Box>
          <Box>
            <CustomCarousel />
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={5} className={classes.workarea}>
          <LoginForm />
        </Grid>
      </Grid>
    </>
  );
}
