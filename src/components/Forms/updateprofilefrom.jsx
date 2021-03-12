import React from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import { makeStyles, createStyles, Paper, Grid } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";

const cities = ["Bhopal", "Jabalpur", "Gwalior"];
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
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
export default function UpdateForm() {
  const classes = useStyles();
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
    phone: yup.string().required("Phone Number is Required"),
    password: yup.string().required("Password is Required"),
  });
  const handleCity = (values, setValues, newValue) => {
    setValues({
      ...values,
      city: newValue,
    });
  };
  const submitHandler = async (values) => {
    try {
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
                                disabled
                                label="First Name"
                                variant="outlined"
                                {...field}
                                value="Ayush"
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
                              disabled
                              size="small"
                              label="Last Name"
                              variant="outlined"
                              {...field}
                              value="Rusia"
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
                              disabled
                              type={showPassword ? "text" : "password"}
                              {...field}
                              value="test"
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
                              disabled
                              size="small"
                              label="Phone"
                              {...field}
                              value="1234567890"
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
                              disabled
                              className={classes.inputField}
                              value="Bhopal"
                              onChange={(event, newValue) =>
                                handleCity(values, setValues, newValue)
                              }
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  fullWidth
                                  disabled
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
                              disabled
                              size="small"
                              label="College"
                              variant="outlined"
                              {...field}
                              value="MANIT"
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
                              disabled
                              size="small"
                              label="Birthday"
                              type="date"
                              {...field}
                              value="08-09-2001"
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
                        <Grid item xs={6} className={classes.griditem}>
                          <Button
                            color="secondary"
                            variant="contained"
                            disabled
                            className={classes.btn}
                          >
                            Cancel
                          </Button>
                        </Grid>
                        <Grid item xs={6} className={classes.griditem}>
                          <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            disabled
                            className={classes.btn}
                          >
                            Submit
                          </Button>
                        </Grid>
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
