import ContactMailRoundedIcon from "@material-ui/icons/ContactMailRounded";
import ContactPhoneRoundedIcon from "@material-ui/icons/ContactPhoneRounded";
import { Grid, Box, Typography, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  icons: {
    display: "block",
    border: "2px solid black",
    width: "200px",
  },
  text: {
    display: "block",
    border: "2px solid black",
    width: "200px",
  },
}));
const Contactus = () => {
  const classes = useStyles();
  return (
    <>
      <Grid container justify="center">
        <Box className={classes.icons}>
          <ContactMailRoundedIcon />
          <ContactPhoneRoundedIcon />
        </Box>
        <Box className={classes.text}>
          <Typography>Contact us</Typography>
        </Box>
      </Grid>
    </>
  );
};

export default Contactus;
