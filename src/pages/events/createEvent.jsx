import React from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles, createStyles, Typography, Paper } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/auth";
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {},
    heading: {
      margin: "auto",
      color: "#43ff23",
      marginTop: "25px",
      marginBottom: "15px",
    },
    griditem: {
      margin: "auto",
      marginTop: "20px",
    },
    form: {
      margin: "auto",
      flexGrow: 1,
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "sapce-around",
    },
    inputField: {
      maxWidth: "580px",
      //height: "40px",
    },
    btn: {
      width: "400px",
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
  })
);
const Event = () => {
  const Context = React.useContext(AuthContext);
  const classes = useStyles();
  const history = useHistory();
  const inititalValues = {
    title: "",
    description: "",
    price: "",
  };

  const validationSchema = yup.object({
    title: yup.string(),

    description: yup.string(),
  });

  const submitHandler = async (values) => {
    try {
      const body = `mutation{
  createEvent(EventInput:{
    title:"${values.title}",
    price:${values.price},
    description:"${values.description}",
    
  }){
    title,
    price,
    description
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
      console.log(response);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <>
      <div className={classes.root}>
        <Grid container alignItems="center" justifyContent="center">
          <Typography variant="h4" className={classes.heading}>
            Fill Event Details
          </Typography>
        </Grid>

        <Formik
          initialValues={inititalValues}
          validationSchema={validationSchema}
          onSubmit={(values) => submitHandler(values)}
        >
          {({ values, setValues }) => (
            <Form aria-label="register form" id="register">
              <Grid
                container
                item
                lg={8}
                spacing={4}
                justify={"center"}
                className={classes.form}
              >
                <Paper elevation={6}>
                  <Grid
                    container
                    spacing={4}
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item xs={10} className={classes.griditem}>
                      <Field name="title">
                        {({ field, meta }) => (
                          <TextField
                            id="title"
                            fullWidth
                            size="small"
                            label="Email"
                            variant="outlined"
                            {...field}
                            error={!!(meta.touched && meta.error)}
                            helperText={meta.touched ? meta.error : ""}
                            className={classes.inputField}
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={10} className={classes.griditem}>
                      <Field name="description">
                        {({ field, meta }) => (
                          <TextField
                            id="description"
                            fullWidth
                            size="small"
                            label="Description"
                            variant="outlined"
                            {...field}
                            error={!!(meta.touched && meta.error)}
                            helperText={meta.touched ? meta.error : ""}
                            className={classes.inputField}
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={10} className={classes.griditem}>
                      <Field name="price">
                        {({ field, meta }) => (
                          <TextField
                            id="price"
                            fullWidth
                            size="small"
                            type="number"
                            label="price"
                            variant="outlined"
                            {...field}
                            error={!!(meta.touched && meta.error)}
                            helperText={meta.touched ? meta.error : ""}
                            className={classes.inputField}
                          />
                        )}
                      </Field>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={8}
                    lg={8}
                    spacing={4}
                    justify="center"
                    className={classes.form}
                  >
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      className={classes.btn}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Paper>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
export default Event;
