import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
const useStyles = makeStyles({
  root: {
    minWidth: 250,
  },
  grid: {
    marginTop: "50px",
  },
  media: {
    height: 140,
    width: 280,
  },
  title: {
    textAlign: "center",
  },
  info: {
    display: "flex",
    justifyContent: "space-around",
  },
});
const CustomCard = (props) => {
  const { eventdata, openDialog } = props;
  const classes = useStyles();

  const bookEvent = async (id) => {
    try {
      const body = `mutation{
  createBooking(EventId:"${id}"){
    title
    description
    price
    
  }
}`;
      const response = await axios.post(
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

      console.log(response.data);
    } catch (e) {
      console.log(e.respone.data);
    }
  };
  return (
    <>
      <Grid
        container
        item
        xs={10}
        lg={4}
        justify="center"
        alignItem="center"
        className={classes.grid}
      >
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image="https://via.placeholder.com/150"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography
                gutterBottom
                className={classes.title}
                variant="h5"
                component="h2"
              >
                {eventdata.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {eventdata.description}
              </Typography>
              <CardActions className={classes.info}>
                <Typography
                  color="secondary"
                  gutterBottom
                  variant="h6"
                  component="h6"
                >
                  {eventdata.price}
                </Typography>
                <Typography
                  color="secondary"
                  gutterBottom
                  variant="h6"
                  component="h6"
                >
                  City
                </Typography>
              </CardActions>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              onClick={openDialog}
              size="small"
              color="primary"
              variant="outlined"
            >
              Book Event
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};

export default CustomCard;
