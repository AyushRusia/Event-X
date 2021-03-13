import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TableRow,
} from "@material-ui/core";

import { Paper, Button } from "@material-ui/core";
import axios from "axios";

import ClientDialog from "../DialogBoxes/clientDialog";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const getClients = async (EventId) => {
  try {
    const body = `query{
                  getClients(EventId:"${EventId}"){
                   name
                   email
                   phone
                   paymentId
                   bookingTime
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
    const clients = response.data.data.getClients;
    return clients;
  } catch (e) {
    console.log(e.response.data);
  }
};

export default function DenseTable(props) {
  const { data } = props;
  const [clients, setClients] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const classes = useStyles();
  const handleClients = async (EventId) => {
    try {
      const data = await getClients(EventId);
      setClients(data);
      setOpenDialog(true);
    } catch (e) {
      console.log(e);
    }
  };
  if (data) {
    return (
      <>
        <ClientDialog
          openDialog={openDialog}
          closefun={() => {
            setOpenDialog(false);
          }}
          data={clients}
        />
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="left">EventId</TableCell>
                <TableCell align="center">Title</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Venue</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Clients</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((event) => (
                <TableRow key={event._id}>
                  <TableCell component="th" scope="row">
                    {event._id}
                  </TableCell>
                  <TableCell align="center">{event.title}</TableCell>
                  <TableCell align="center">{event.date}</TableCell>
                  <TableCell align="center">{event.city}</TableCell>
                  <TableCell align="center">{event.price}</TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() => {
                        handleClients(event._id);
                      }}
                      variant="outlined"
                      color="secondary"
                    >
                      Clients
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  } else
    return (
      <>
        <h1>No Events Found</h1>
      </>
    );
}
