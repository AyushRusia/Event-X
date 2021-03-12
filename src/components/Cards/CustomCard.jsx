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
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 280,
    [theme.breakpoints.up("md")]: {
      width: "380px",
      border: "solid 3px black",
    },
  },
  grid: {
    marginTop: "50px",
  },
  media: {
    height: 180,
    width: 280,
    [theme.breakpoints.up("md")]: {
      width: "380px",
    },
  },
  title: {
    textAlign: "center",
    color: "#7a1139",
    fontWeight: "900",
  },
  info: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "baseline",
  },
  p: {
    margin: "auto",
    width: 235,
    padding: "5px",
    [theme.breakpoints.up("md")]: {
      width: "340px",
    },
    height: 100,
    textAlign: "justify",
    border: "1px solid pink",
    overflow: "auto",
  },
  dv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));
const CustomCard = (props) => {
  const { eventdata, openDialog } = props;
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
              <Typography gutterBottom className={classes.title} variant="h5">
                {eventdata.title}
              </Typography>
              <Typography
                component="span"
                color="primary"
                className={classes.info}
              >
                <Typography
                  variant="h6"
                  component="span"
                  className={classes.dv}
                >
                  <CalendarTodayIcon color="secondary" /> {eventdata.date}
                </Typography>
                <Typography
                  variant="h6"
                  component="span"
                  className={classes.dv}
                >
                  <PinDropIcon color="secondary" />
                  {eventdata.city}
                </Typography>
              </Typography>
              <Typography
                variant="body2"
                color="secondary"
                component="p"
                className={classes.p}
              >
                {eventdata.description}
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
              Price {eventdata.price}
            </Typography>
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
