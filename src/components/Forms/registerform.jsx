import React from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import {
  makeStyles,
  createStyles,
  Typography,
  Paper,
  Box,
  Grid,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router-dom";
import axios from "axios";

const cities = ["Bhopal", "Jabalpur", "Gwalior"];
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      height: "100vh",
      margin: 0,
      padding: 0,
      display: "flex",
      flexWrap: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    griditem: {
      display: "flex",
      justifyContent: "center",
      margin: "auto",
      marginTop: "15px",
    },
    form: {
      display: "block",
      boxSizing: "border-box",
      padding: "30px",
      backgroundColor: "#ccc",
      marginRight: "10px",
      marginLeft: "10px",
      borderRadius: "10%",
    },
    inputField: {
      maxWidth: "400px",
      //height: "40px",
    },
    textField: {
      height: "15px",
    },
    btn: {
      margin: "auto",
      marginTop: "30px",
      width: "150px",
    },
  })
);
export default function RegisterForm() {
  const classes = useStyles();
  const history = useHistory();
  const [showPassword, setShowPassword] = React.useState(false);
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
        <Grid container justifyContent="center">
          <Formik
            initialValues={inititalValues}
            validationSchema={validationSchema}
            onSubmit={(values) => submitHandler(values)}
          >
            {({ values, setValues }) => (
              <Form aria-label="register form" id="register">
                <Grid item xs={12} lg={9} className={classes.griditem}>
                  <Paper elevation={6} className={classes.form}>
                    <Grid container>
                      <Grid item xs={9} lg={5} className={classes.griditem}>
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
                      <Grid item xs={9} lg={5} className={classes.griditem}>
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
                      <Grid item xs={12} lg={8} className={classes.griditem}>
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
                      <Grid item xs={12} lg={8} className={classes.griditem}>
                        <Field name="password">
                          {({ field, meta }) => (
                            <OutlinedInput
                              placeholder="Password"
                              id="Password"
                              height="20px"
                              fullwidth
                              type={showPassword ? "text" : "password"}
                              {...field}
                              className={classes.inputField}
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    size="small"
                                    aria-label="toggle password visibility"
                                    onClick={() => {
                                      setShowPassword(!showPassword);
                                    }}
                                    edge="end"
                                  >
                                    {showPassword ? (
                                      <Visibility />
                                    ) : (
                                      <VisibilityOff />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              }
                            />
                          )}
                        </Field>
                      </Grid>
                      <Grid item xs={12} lg={8} className={classes.griditem}>
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
                      <Grid item xs={10} lg={5} className={classes.griditem}>
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
                                  label="City"
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
                      <Grid item xs={10} lg={5} className={classes.griditem}>
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
                      <Grid item xs={9} lg={5} className={classes.griditem}>
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
                      <Grid container className={classes.griditem}>
                        <Button
                          type="submit"
                          color="primary"
                          variant="contained"
                          className={classes.btn}
                        >
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>
      </div>
    </>
  );
}
