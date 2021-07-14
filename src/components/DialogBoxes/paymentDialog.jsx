import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Snackbar from "../../context/snackbar";
export default function PaymentDialog(props) {
  const Context2 = React.useContext(Snackbar);
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
        "https://eventxserver.herokuapp.com/graphql",
        { query: body1 },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

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
        "https://eventxserver.herokuapp.com/graphql",
        {
          query: body2,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      handleClose();
      if (response.data.data.createBooking.title)
        Context2.openbarfun("success", "Event Booked Successfully");
      history.push("/event/booked");
    } catch (e) {
      setPending(false);
      console.log(e.response.data);
      Context2.openbarfun("error", "Something Went wrong");
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
      <DialogTitle id="alert-dialog-title">Confirm</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you Sure to pay for this event
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          disabled={pending}
          onClick={BookEvent}
          color="primary"
          autoFocus
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
