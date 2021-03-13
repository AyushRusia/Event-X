import axios from "axios";
import React, { useEffect, useState } from "react";
import Drawer from "../../components/NavBars/Drawer";
import BookedCard from "../../components/Cards/BookedCard";
import {
  Grid,
  Box,
  makeStyles,
  createStyles,
  Typography,
} from "@material-ui/core";
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginLeft: theme.spacing(5),
      [theme.breakpoints.up("md")]: {
        marginLeft: theme.spacing(14),
      },
      marginBottom: "15px",
    },
    content: {
      marginTop: "40px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    workarea: {
      //border: "solid 3px black",
      marginTop: "60px",
    },
    heading: {
      margin: "auto",
      color: "#7a1139",
      marginTop: "25px",
      marginBottom: "15px",
      fontWeight: "900",
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
                        host
                        date
                      }
                      paymentId
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

        <Grid container className={classes.content}>
          <Box>
            <Typography variant="h4" className={classes.heading}>
              Your Booked Events
            </Typography>
          </Box>
        </Grid>
        <Box className={classes.root}>
          <Grid container spacing={0} justifyContent="center">
            {data.map((datas) => {
              return (
                <>
                  <Grid item xs={11} md={5} lg={4}>
                    <BookedCard event={datas} />
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
