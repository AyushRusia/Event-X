import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomCard from "../../components/CustomCard";
import Grid from "@material-ui/core/Grid";
import PaymentDialog from "../../components/paymentDialog";
const fetchEvents = async () => {
  try {
    const body = `query{
                  getEligibleEvents{
                    _id
                    title
                    description
                    price
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
      <Grid container spacing={1} justify="center">
        {data.map((pata) => {
          return (
            <>
              <Grid item lg={3} justify="center">
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
    </>
  );
};

export default ViewEvent;
