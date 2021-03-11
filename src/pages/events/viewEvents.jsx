import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomCard from "../../components/CustomCard";
import { Grid, Box, makeStyles, createStyles } from "@material-ui/core";
import PaymentDialog from "../../components/paymentDialog";
import Drawer from "../../components/NavBars/Drawer";
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
        <Box className={classes.root}>
          <Grid container spacing={0} justifyContent="center">
            {data.map((pata) => {
              return (
                <>
                  <Grid item xs={9} md={5} lg={4}>
                    {
                      <CustomCard
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
