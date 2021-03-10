import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import { useHistory } from "react-router-dom";
export default function PaymentDialog(props) {
  const { openDialog, onClose, dummy } = props;
  const [pending, setPending] = React.useState(false);
  const history = useHistory();
  //const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    onClose();
  };
  const BookEvent = async () => {
    try {
      ////////////////////////////////////////paying money
      const body1 = `mutation{
                   payOrder(EventId:"${dummy._id}"){
                            paymentId
                            bookingTime
                            event
                             user
                          }
                          }`;
      setPending(true);
      const payorder = await axios.post(
        "http://localhost:8000/graphql",
        { query: body1 },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(payorder);
      console.log("suceessful payment");
      setPending(false);

      //////////////////////////////////////////////////////booking event
      setPending(true);
      const body2 = `mutation{
  createBooking(BookingInput:{
    EventId:"${payorder.data.data.payOrder.event}",
    paymentId:"${payorder.data.data.payOrder.paymentId}"
    
  }){
    title
    description
    price
  }
}`;
      const response = await axios.post(
        "http://localhost:8000/graphql",
        {
          query: body2,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      handleClose();
      history.push("/event/booked");
    } catch (e) {
      setPending(false);
      console.log(e.response.data);
      handleClose();
    }
  };
  return (
    <Dialog
      open={openDialog}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Use Google's location service?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Disagree
        </Button>
        <Button
          disabled={pending}
          onClick={BookEvent}
          color="primary"
          autoFocus
        >
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}
