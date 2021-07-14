import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TableRow,
} from "@material-ui/core";

import { Paper } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function ClientTable(props) {
  const { clients } = props;
  const classes = useStyles();

  if (clients) {
    return (
      <>
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="center">Client</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Phone</TableCell>
                <TableCell align="center">PaymentId</TableCell>
                <TableCell align="center">BookingTime</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map((client) => (
                <TableRow>
                  <TableCell align="center">{client.name}</TableCell>
                  <TableCell align="center">{client.email}</TableCell>
                  <TableCell align="center">{client.phone}</TableCell>
                  <TableCell align="center">{client.paymentId}</TableCell>
                  <TableCell align="center">{client.bookingTime}</TableCell>
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
