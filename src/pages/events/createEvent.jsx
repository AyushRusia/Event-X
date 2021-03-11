import React from "react";
import { makeStyles, createStyles, Box } from "@material-ui/core";
import { Grid, Typography } from "@material-ui/core";
import Drawer from "../../components/NavBars/Drawer";
import CreateEventForm from "../../components/Forms/createeventform";
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      marginLeft: theme.spacing(8),
      [theme.breakpoints.up("md")]: {
        marginLeft: theme.spacing(14),
      },
    },
    content: {
      marginTop: "30px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    heading: {
      margin: "auto",
      color: "#7a1139",
      marginTop: "25px",
      marginBottom: "15px",
      fontWeight: "900",
    },
    workarea: {
      display: "block",
      margin: "auto",
      marginTop: "10px",
    },
    imgcontainer: {
      marginTop: "10px",
      display: "flex",
      justifyItems: "center",
      alignItems: "flex-end",
    },
    image: {
      height: "350px",
      width: "",
      margin: "auto",
      [theme.breakpoints.down("md")]: {
        height: "120px",
        width: "120px",
      },
    },
  })
);
export default function CreateEvent() {
  const classes = useStyles();

  return (
    <>
      <Drawer />
      <Box className={classes.root}>
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={6} className={classes.content}>
            <Box>
              <Typography variant="h5" className={classes.heading}>
                Create Your Event
              </Typography>
            </Box>
            <Box className={classes.imgcontainer}>
              <img src="/event.svg" alt="Cover" className={classes.image} />
            </Box>
          </Grid>
          <Grid item xs={11} lg={6} className={classes.workarea}>
            <CreateEventForm />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
