import axios from "axios";
import React, { useEffect, useState } from "react";
import Drawer from "../../components/NavBars/Drawer";
import {
  Grid,
  Box,
  makeStyles,
  createStyles,
  Typography,
} from "@material-ui/core";
import DenseTable from "../../components/Tables/myEventTable";
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      border: "solid 2px black",
      display: "flex",
      justifyContent: "center",
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("md")]: {
        marginLeft: theme.spacing(14),
      },
    },
    content: {
      marginTop: "50px",
      display: "flex",
      flexDirection: "row",
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
      display: "flex",
      justifyContent: "center",
    },
  })
);
const fetchEvents = async () => {
  try {
    const body = `query{
                  getUserDetails{
                   createdEvents{
                     _id
                     title
                     price
                     city
                     date
                   }
                    }
                  }`;
    const events = await axios.post(
      "http://localhost:8000/graphql",
      {
        query: body,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const allevents = events.data.data.getUserDetails.createdEvents;
    return allevents;
  } catch (e) {
    console.log(e.response.data);
  }
};
const MyEvents = () => {
  const classes = useStyles();
  const [events, setEvents] = useState([]);
  useEffect(() => {
    fetchEvents()
      .then((data) => {
        setEvents(data);
      })
      .catch((e) => console.log(e));
  }, [setEvents]);

  return (
    <>
      <div>
        <Drawer />
        <Grid container className={classes.content}>
          <Box>
            <Typography variant="h4" className={classes.heading}>
              My Event's
            </Typography>
          </Box>
        </Grid>
        <Box className={classes.root}>
          <Grid container className={classes.workarea}>
            <Grid item xs={12} lg={12}>
              <DenseTable data={events} />
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default MyEvents;
