import React from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import { makeStyles, createStyles, Grid } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import TextField from "@material-ui/core/TextField";

import { useHistory } from "react-router-dom";
import axios from "axios";

const cities = ["Bhopal", "Jabalpur", "Gwalior"];
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      // display: "flex",
      // flexWrap: "column",
      // justifyContent: "center",
      // alignItems: "center",
      // marginTop: "30px",
    },
    heading: {
      margin: "auto",
      color: "#43ff23",
      marginTop: "25px",
      marginBottom: "15px",
    },
    griditem: {
      display: "flex",
      justifyContent: "space-around",
      margin: "auto",
      marginTop: "25px",
    },
    border: {
      border: "solid 3px black",
    },
    form: {},
    inputField: {
      maxWidth: "400px",
      //height: "40px",
    },
    textField: {
      height: "15px",
    },
    btn: {
      margin: "auto",
      marginTop: "0px",
      width: "150px",
    },
  })
);
export default function CreateEventForm() {
  const classes = useStyles();
  const history = useHistory();

  const inititalValues = {
    title: "",
    price: "",
    host: "",
    city: "",
    date: "",
    description: "",
  };

  const validationSchema = yup.object({
    title: yup.string().required("Title can't be Empty"),
    price: yup.number().required("Price can't be Empty"),
    city: yup.string().required("This field is  is Required"),
    description: yup.string().required("This field is Required"),
  });
  const handleCity = (values, setValues, newValue) => {
    setValues({
      ...values,
      city: newValue,
    });
  };
  const submitHandler = async (values) => {
    try {
      const body = `mutation{
  createEvent(EventInput:{
    title:"${values.title}",
    price:${values.price},
    description:"${values.description}",
    city:"${values.city}"
    date:"${values.date}"
    
  }){
    title,
    price,
    description
    city
    date
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
      history.push("/event");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <>
      <div>
        <Grid container className={classes.root} justifyContent="center">
          <Formik
            initialValues={inititalValues}
            validationSchema={validationSchema}
            onSubmit={(values) => submitHandler(values)}
          >
            {({ values, setValues }) => (
              <Form aria-label="register form" id="register">
                <Grid container className={classes.form}>
                  <Grid item xs={12} lg={9} className={classes.griditem}>
                    <Field name="title">
                      {({ field, meta }) => (
                        <TextField
                          fullWidth
                          size="small"
                          label="Event Title"
                          variant="outlined"
                          {...field}
                          error={!!(meta.touched && meta.error)}
                          helperText={meta.touched ? meta.error : ""}
                          className={classes.inputField}
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={9} lg={4} className={classes.griditem}>
                    <Field name="price">
                      {({ field, meta }) => {
                        return (
                          <TextField
                            fullWidth
                            size="small"
                            type="number"
                            label=" Event Price"
                            variant="outlined"
                            {...field}
                            error={!!(meta.touched && meta.error)}
                            helperText={meta.touched ? meta.error : ""}
                            className={classes.inputField}
                          />
                        );
                      }}
                    </Field>
                  </Grid>
                  <Grid item xs={9} lg={4} className={classes.griditem}>
                    <Field name="host">
                      {({ field, meta }) => (
                        <TextField
                          fullWidth
                          size="small"
                          label=" Event Host"
                          variant="outlined"
                          {...field}
                          error={!!(meta.touched && meta.error)}
                          helperText={meta.touched ? meta.error : ""}
                          className={classes.inputField}
                        />
                      )}
                    </Field>
                  </Grid>

                  <Grid item xs={10} lg={7} className={classes.griditem}>
                    <Field name="city">
                      {({ field, meta }) => (
                        <Autocomplete
                          id="combo-box-demo"
                          options={cities}
                          getOptionSelected={(option) => option}
                          fullWidth
                          className={classes.inputField}
                          value={values.city}
                          onChange={(event, newValue) =>
                            handleCity(values, setValues, newValue)
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              fullWidth
                              size="small"
                              label="Venue"
                              variant="outlined"
                              error={!!(meta.touched && meta.error)}
                              helperText={meta.touched ? meta.error : ""}
                              className={classes.inputField}
                            />
                          )}
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={9} lg={7} className={classes.griditem}>
                    <Field name="date">
                      {({ field, meta }) => (
                        <TextField
                          id="date"
                          fullWidth
                          size="small"
                          label="Event Date"
                          type="date"
                          {...field}
                          error={!!(meta.touched && meta.error)}
                          helperText={meta.touched ? meta.error : ""}
                          className={classes.inputField}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={10} lg={12} className={classes.griditem}>
                    <Field name="description">
                      {({ field, meta }) => (
                        <TextField
                          fullWidth
                          size="large"
                          label="Event Description"
                          variant="outlined"
                          {...field}
                          className={classes.inputField}
                        />
                      )}
                    </Field>
                  </Grid>

                  <Grid container className={classes.griditem}>
                    <Button
                      type="submit"
                      color="secondary"
                      variant="outlined"
                      className={classes.btn}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>
      </div>
    </>
  );
}
