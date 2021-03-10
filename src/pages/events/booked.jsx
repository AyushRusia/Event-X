import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomCard from "../../components/CustomCard";
import Grid from "@material-ui/core/Grid";
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
      <Grid container spacing={1} justify="center">
        {data.map((data) => {
          return (
            <>
              <Grid item lg={3} justify="center">
                <CustomCard
                  title={data.title}
                  description={data.description}
                  price={data.price}
                  _id={data._id}
                />
              </Grid>
            </>
          );
        })}
      </Grid>
    </>
  );
};

export default ViewEvent;
