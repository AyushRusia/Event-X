import React, { useContext } from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import { makeStyles, createStyles, Typography, Paper } from "@material-ui/core";
import { Grid } from "@material-ui/core";
//import Drawer from "../components/AppBar";
import axios from "axios";
import AuthContext from "../context/auth";
import { useHistory } from "react-router";
const cities = ["Bhopal", "Jabalpur", "Gwalior"];
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      position: "absolute",
      marginTop: "70px",
    },
    heading: {
      margin: "auto",
      color: "#43ff23",
    },
    griditem: {
      display: "flex",
      flexWrap: "wrap",
      justifyItems: "center",
      alignItems: "center",
      justifyContent: "center",
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
      margin: "auto",
    },
  })
);
export default function Register() {
  const classes = useStyles();
  const history = useHistory();
  const inititalValues = {
    fname: "",
    lname: "",
    email: "",
    password: "",
    phone: "",
    city: "",
    college: "",
    dob: "",
  };

  const validationSchema = yup.object({
    fname: yup.string().required("Name can't be Empty"),
    lname: yup.string().required("Name can't be Empty"),
    email: yup
      .string()
      .email("Enter Valid Email")
      .required("Email can't be Empty"),
    phone: yup.string().required("Phone Number is Required"),
    password: yup.string().required("Password is Required"),
  });
  const handleCity = (values, setValues, newValue) => {
    console.log(newValue);
    setValues({
      ...values,
      city: newValue,
    });
  };
  const submitHandler = async (values) => {
    try {
      const response = await axios.post("http://localhost:8000/auth/register", {
        ...values,
      });
      console.log(response);
      history.push("/");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <>
      <div className={classes.root}>
        <Grid container>
          <Typography variant="h4" className={classes.heading}>
            Register Yourself By filling The following Data
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
                xs={10}
                lg={8}
                spacing={4}
                justify={"center"}
                className={classes.form}
              >
                <Paper elevation={6}>
                  <Grid
                    container
                    spacing={4}
                    justify={"center"}
                    className={classes.form}
                  >
                    {" "}
                    <Grid item xs={8} lg={4} className={classes.griditem}>
                      <Field name="fname">
                        {({ field, meta }) => {
                          return (
                            <TextField
                              fullWidth
                              size="small"
                              label="First Name"
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
                    <Grid item xs={8} lg={4} className={classes.griditem}>
                      <Field name="lname">
                        {({ field, meta }) => (
                          <TextField
                            fullWidth
                            size="small"
                            label="Last Name"
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
                      <Field name="email">
                        {({ field, meta }) => (
                          <TextField
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
                    <Grid
                      item
                      xs={10}
                      className={classes.griditem}
                      justifyContent="center"
                    >
                      <Field name="password">
                        {({ field, meta }) => (
                          <TextField
                            fullWidth
                            size="small"
                            label="Password"
                            type="password"
                            variant="outlined"
                            {...field}
                            error={!!(meta.touched && meta.error)}
                            helperText={meta.touched ? meta.error : ""}
                            className={classes.inputField}
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid
                      item
                      xs={10}
                      className={classes.griditem}
                      justifyContent="center"
                    >
                      <Field name="phone">
                        {({ field, meta }) => (
                          <TextField
                            fullWidth
                            size="small"
                            label="Phone"
                            {...field}
                            variant="outlined"
                            error={!!(meta.touched && meta.error)}
                            helperText={meta.touched ? meta.error : ""}
                            className={classes.inputField}
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={10} lg={4}>
                      <Field name="city">
                        {({ field, meta }) => (
                          <Autocomplete
                            id="combo-box-demo"
                            options={cities}
                            getOptionSelected={(option) => option}
                            style={{}}
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
                                label="City"
                                variant="outlined"
                                error={!!(meta.touched && meta.error)}
                                helperText={meta.touched ? meta.error : ""}
                              />
                            )}
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={10} lg={4}>
                      <Field name="college">
                        {({ field, meta }) => (
                          <TextField
                            fullWidth
                            size="small"
                            label="College"
                            variant="outlined"
                            {...field}
                            error={!!(meta.touched && meta.error)}
                            helperText={meta.touched ? meta.error : ""}
                            className={classes.inputField}
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid
                      item
                      xs={10}
                      lg={5}
                      className={classes.griditem}
                      justifyContent="center"
                    >
                      <Field name="dob">
                        {({ field, meta }) => (
                          <TextField
                            id="date"
                            fullWidth
                            size="small"
                            label="Birthday"
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
                  </Grid>
                  <Grid
                    container
                    item
                    lg={8}
                    spacing={4}
                    justify={"center"}
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
}
