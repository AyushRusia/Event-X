import React, { useState, useEffect } from "react";
import { makeStyles, createStyles, Box } from "@material-ui/core";
import { Grid, Typography, Button } from "@material-ui/core";
import Drawer from "../components/NavBars/Drawer";
import NewForm from "../components/Forms/newform";
import axios from "axios";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      marginTop: theme.spacing(4),
      [theme.breakpoints.up("md")]: {
        marginLeft: theme.spacing(14),
      },
    },
    content: {
      marginTop: "10px",
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
      border: "solid 2px pink",
      borderRadius: "50%",
    },
    image: {
      height: "150px",
      width: "",
      margin: "auto",
      [theme.breakpoints.down("md")]: {
        height: "100px",
        width: "100px",
      },
      info: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "baseline",
      },
      dv: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      },
    },
  })
);

const fetchUser = async () => {
  try {
    const body = `query{
  getUserDetails{
    name
    email
    phone
    city
    college
    date_of_birth
    createdEventsCount
    bookedEventsCount
  }
}`;

    const response = await axios.post(
      "https://eventxserver.herokuapp.com/graphql",
      {
        query: body,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const userdetails = response.data.data.getUserDetails;
    return userdetails;
  } catch (e) {
    console.log(e.response.data);
  }
};
export default function Profile() {
  const classes = useStyles();
  const [update, setUpdate] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [initialValues, setInitialValues] = useState({
    name: "",
    newpassword: "",
    phone: "",
    city: "",
    college: "",
    date_of_birth: "",
  });

  useEffect(() => {
    fetchUser()
      .then((data) => {
        setUserDetails(data);
        setInitialValues(data);
      })
      .catch((e) => console.log(e));
  }, [setUserDetails, setUpdate]);

  return (
    <>
      <Drawer />
      <Box className={classes.root}>
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={6} className={classes.content}>
            <Box>
              <Typography variant="h4" className={classes.heading}>
                Your Profile
              </Typography>
            </Box>
            <Box className={classes.imgcontainer}>
              <img src="/profile.svg" alt="Cover" className={classes.image} />
            </Box>
            <Box>
              <Typography variant="h6" className={classes.heading}>
                Email:{userDetails.email}
              </Typography>

              <Typography variant="h6" component="h6" className={classes.dv}>
                Created Events {userDetails.createdEventsCount}
              </Typography>
              <Typography variant="h6" component="h6" className={classes.dv}>
                Booked Events {userDetails.bookedEventsCount}
              </Typography>
            </Box>
            <Box mt={4}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  setUpdate(true);
                }}
              >
                Update Profile
              </Button>
            </Box>
          </Grid>
          <Grid item xs={11} lg={6} className={classes.workarea}>
            {
              <NewForm
                update={update}
                setupdatefalse={() => {
                  setUpdate(false);
                }}
                initialValues={initialValues}
              />
            }
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
