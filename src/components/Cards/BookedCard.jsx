import React, { useContext } from "react";
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
import Snackbar from "../../context/snackbar";
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

  dv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  hpid: {
    paddingLeft: "15px",
    fontWeight: "600",
  },
}));
const BookedCard = (props) => {
  const { event } = props;
  const classes = useStyles();
  const Context2 = useContext(Snackbar);
  return (
    <>
      <Grid
        item
        xs={11}
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
                {event.event.title}
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
                  <CalendarTodayIcon color="secondary" /> {event.event.date}
                </Typography>
                <Typography
                  variant="h6"
                  component="span"
                  className={classes.dv}
                >
                  <PinDropIcon color="secondary" />
                  {event.event.city}
                </Typography>
              </Typography>
            </CardContent>

            <Typography
              color="secondary"
              gutterBottom
              component="p"
              className={classes.hpid}
            >
              Host <span style={{ color: "blue" }}>{event.event.host}</span>
            </Typography>
            <Typography
              color="secondary"
              gutterBottom
              component="p"
              className={classes.hpid}
            >
              PaymentId:
              <span style={{ color: "blue" }}>{event.paymentId}</span>
            </Typography>
          </CardActionArea>
          <CardActions className={classes.info}>
            <Button
              onClick={() => {
                Context2.openbarfun("info", "You Can't cancel This Event");
              }}
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

export default BookedCard;
