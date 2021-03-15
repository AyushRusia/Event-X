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
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/auth";
import Snackbar from "../../context/snackbar";
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    heading: {
      margin: "auto",
      color: "#7a1139",
      marginTop: "25px",
      marginBottom: "15px",
      fontWeight: "900",
    },
    griditem: {
      display: "flex",
      justifyContent: "center",
      margin: "auto",
      marginTop: "15px",
    },
    form: {
      display: "block",
      backgroundColor: "#bbb",
      boxSizing: "border-box",
      padding: "50px",
      marginRight: "20px",
      marginLeft: "20px",
      borderRadius: "10%",
    },
    inputField: {
      maxWidth: "400px",
      //height: "40px",
    },
    textField: {
      height: "20px",
    },
    btn: {
      margin: "auto",
      fontWeight: "800",
      marginTop: "30px",
      width: "150px",
    },
  })
);
export default function LoginForm(props) {
  const Context = React.useContext(AuthContext);
  const Context2 = React.useContext(Snackbar);
  const [showPassword, setShowPassword] = React.useState(false);
  const classes = useStyles();
  const history = useHistory();
  const inititalValues = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Enter Valid Email")
      .required("Email can't be Empty"),

    password: yup.string().required("Password is Required"),
  });

  const submitHandler = async (values) => {
    try {
      const response = await axios.post(
        "https://eventxserver.herokuapp.com/auth/login",
        {
          ...values,
        }
      );
      console.log(response);
      await Context.getLoggedIn();
      Context2.openbarfun("success", "User Logged In");
      history.push("/event");
    } catch (error) {
      //if (error.response.data.error)
      // Context2.openbarfun("error", error.response.data.error);
      Context2.openbarfun("error", "Something Went Worng");
    }
  };

  return (
    <>
      <div>
        <Grid className={classes.root} container>
          <Box>
            <Typography variant="h5" className={classes.heading}>
              Login With Credentials
            </Typography>
          </Box>
          <Box>
            <Formik
              initialValues={inititalValues}
              validationSchema={validationSchema}
              onSubmit={(values) => submitHandler(values)}
            >
              <Form aria-label="register form" id="register">
                <Grid container spacing={1}>
                  <Paper elevation={2} className={classes.form}>
                    <Grid item xs={12} className={classes.griditem}>
                      <Field name="email">
                        {({ field, meta }) => (
                          <TextField
                            id="email"
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
                    <Grid item xs={12} className={classes.griditem}>
                      <Field name="password">
                        {({ field, meta }) => (
                          <>
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
                          </>
                        )}
                      </Field>
                    </Grid>

                    <Grid item xs={12} className={classes.griditem}>
                      <Button
                        type="submit"
                        variant="outlined"
                        className={classes.btn}
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Paper>
                </Grid>
              </Form>
            </Formik>
          </Box>
        </Grid>
      </div>
    </>
  );
}
