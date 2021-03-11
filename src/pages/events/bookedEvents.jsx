import axios from "axios";
import React, { useEffect, useState } from "react";
import Drawer from "../../components/NavBars/Drawer";
import TempCard from "../../components/Cards/tempcard";
import { Grid, Box, makeStyles, createStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginLeft: theme.spacing(8),
      [theme.breakpoints.up("md")]: {
        marginLeft: theme.spacing(14),
      },
    },
    content: {},
    workarea: {
      //border: "solid 3px black",
      marginTop: "60px",
    },
  })
);
const fetchEvents = async () => {
  try {
    const body = `query{
                  getUserDetails{
                    bookedEvents{
                      event{
                        title
                        description
                        city
                      }
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

    const allevents = events.data.data.getUserDetails.bookedEvents;
    return allevents;
  } catch (e) {
    console.log(e.response.data);
  }
};
const BookedEvent = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchEvents()
      .then((data) => {
        setData(data);
      })
      .catch((e) => console.log(e));
  }, []);

  console.log(data);
  return (
    <>
      <div>
        <Drawer />
        <Box className={classes.root}>
          <Grid container spacing={0} justifyContent="center">
            {data.map((pata) => {
              return (
                <>
                  <Grid item xs={9} md={5} lg={4}>
                    <TempCard />
                  </Grid>
                </>
              );
            })}
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default BookedEvent;
