import axios from "axios";
import React, { useEffect, useState } from "react";
import ViewCard from "../../components/Cards/ViewCard";
import {
  Grid,
  Box,
  makeStyles,
  createStyles,
  Typography,
} from "@material-ui/core";
import PaymentDialog from "../../components/DialogBoxes/paymentDialog";
import Drawer from "../../components/NavBars/Drawer";
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginLeft: theme.spacing(5),
      marginTop: "20px",
      [theme.breakpoints.up("md")]: {
        marginLeft: theme.spacing(14),
      },
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
                  getEligibleEvents{
                    _id
                    title
                    description
                    price
                    city
                    date
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

    const allevents = events.data.data.getEligibleEvents;
    return allevents;
  } catch (e) {
    console.log(e.response.data);
  }
};
const ViewEvent = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [dummy, setDummy] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  useEffect(() => {
    fetchEvents()
      .then((data) => {
        setData(data);
      })
      .catch((e) => console.log(e));
  }, [setData]);

  return (
    <>
      <PaymentDialog
        openDialog={openDialog}
        onClose={() => setOpenDialog(false)}
        dummy={dummy}
      />
      <div>
        <Drawer />
        <Grid container className={classes.content}>
          <Box>
            <Typography variant="h4" className={classes.heading}>
              Book Your Event
            </Typography>
          </Box>
        </Grid>
        <Box className={classes.root}>
          <Grid container justifyContent="center">
            {data.map((pata) => {
              return (
                <>
                  <Grid item xs={9} md={6} lg={4}>
                    {
                      <ViewCard
                        eventdata={pata}
                        openDialog={() => {
                          setDummy(pata);
                          setOpenDialog(true);
                        }}
                      />
                    }
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

export default ViewEvent;
