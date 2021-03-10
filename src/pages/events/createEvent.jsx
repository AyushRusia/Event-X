import React from "react";
import { makeStyles, createStyles } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Drawer from "../../components/NavBars/Drawer";
import CreateEventForm from "../../components/Forms/createeventform";
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {},
    content: {},
    workarea: {
      display: "block",
      margin: "auto",
      marginTop: "10px",
    },
  })
);
export default function CreateEvent() {
  const classes = useStyles();

  return (
    <>
      <Drawer />
      <Grid container className={classes.root} justifyContent="center">
        <Grid item xs={11} lg={6} className={classes.workarea}>
          <CreateEventForm />
        </Grid>
      </Grid>
    </>
  );
}
