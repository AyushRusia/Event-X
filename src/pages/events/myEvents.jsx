import axios from "axios";
import React, { useEffect, useState } from "react";
import Drawer from "../../components/NavBars/Drawer";
import { Grid, Box, makeStyles, createStyles } from "@material-ui/core";
import DenseTable from "../../components/Tables/myEventTable";
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
        <Box className={classes.root}>
          <Grid container className={classes.content}>
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
