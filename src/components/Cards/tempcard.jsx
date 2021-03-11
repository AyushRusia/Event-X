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
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import PinDropIcon from "@material-ui/icons/PinDrop";
const useStyles = makeStyles({
  root: {
    minWidth: 280,
  },
  grid: {
    marginTop: "50px",
  },
  media: {
    height: 180,
    width: 280,
  },
  title: {
    textAlign: "center",
  },
  info: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "baseline",
  },
  p: {
    margin: "auto",
    width: 235,
    height: 100,
    textAlign: "justify",
    border: "1px solid pink",
    overflow: "auto",
  },
});
const TempCard = () => {
  const classes = useStyles();
  return (
    <>
      <Grid
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
              image="https://picsum.photos/200/300"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography
                gutterBottom
                className={classes.title}
                variant="h5"
                component="h4"
              >
                Title
              </Typography>
              <Typography component="span" className={classes.info}>
                <Typography gutterBottom variant="h6" component="span">
                  <CalendarTodayIcon /> Date
                </Typography>
                <Typography gutterBottom variant="h6" component="span">
                  <PinDropIcon />
                  City
                </Typography>
              </Typography>
              <Typography
                variant="body2"
                color="secondary"
                component="p"
                className={classes.p}
              >
                Description
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions className={classes.info}>
            <Typography
              color="primary"
              gutterBottom
              variant="h6"
              component="h6"
            >
              Price
            </Typography>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};

export default TempCard;
