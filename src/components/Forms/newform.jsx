import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles, createStyles, Paper, Grid } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Snackbar from "../../context/snackbar";
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
export default function NewForm(props) {
  const { update, setupdatefalse, initialValues } = props;

  const classes = useStyles();
  const history = useHistory();
  const Context2 = useContext(Snackbar);
  const [showPassword, setShowPassword] = React.useState(false);
  const handleCity = (values, setValues, newValue) => {
    setValues({
      ...values,
      city: newValue,
    });
  };
  const [values, setValues] = React.useState({
    name: "Ayush",
    newpassword: "test",
    phone: "123456",
    city: "city A",
    college: "college A",
    date_of_birth: "2001-09-08",
  });
  React.useEffect(() => {
    setValues(initialValues);
  }, [setupdatefalse, initialValues]);

  const changeHandler = (event) => {
    const { value, name } = event.target;
    setValues((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };
  const cancelHandler = (setValues) => {
    setupdatefalse();
    setValues(initialValues);
  };
  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const body = `mutation{
      updateProfile(updateUserInput:{
        name:"${values.name}",
        phone:"${values.phone}",
        password:"${values.newpassword}",
        city:"${values.city}",
        college:"${values.college}",
        date_of_birth:"${values.date_of_birth}"
      }){
        name
        password
        phone
        password
        city
        college
        date_of_birth
      }
    }`;
      setupdatefalse();
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
      Context2.openbarfun("success", "Profile Updated");
      history.push("/profile");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <Grid item xs={12} lg={9} className={classes.griditem}>
          <Paper elevation={6} className={classes.form}>
            <Grid container>
              <Grid item xs={9} lg={8} className={classes.griditem}>
                <TextField
                  label="Name"
                  name="name"
                  value={values.name}
                  onChange={changeHandler}
                  disabled={!update}
                  variant="outlined"
                  fullWidth
                  size="small"
                  className={classes.inputField}
                />
              </Grid>
              <Grid item xs={9} lg={8} className={classes.griditem}>
                <TextField
                  label="Phone"
                  name="phone"
                  value={values.phone}
                  onChange={changeHandler}
                  disabled={!update}
                  variant="outlined"
                  fullWidth
                  size="small"
                  className={classes.inputField}
                />
              </Grid>

              <Grid item xs={12} lg={8} className={classes.griditem}>
                <OutlinedInput
                  placeholder="New Password(If any)"
                  name="newpassword"
                  value={values.newpassword}
                  onChange={changeHandler}
                  id="Password"
                  height="15px"
                  fullwidth
                  disabled={!update}
                  type={showPassword ? "text" : "password"}
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
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </Grid>

              <Grid item xs={10} lg={5} className={classes.griditem}>
                <Autocomplete
                  id="combo-box-demo"
                  options={cities}
                  getOptionSelected={(option) => option}
                  fullWidth
                  disabled={!update}
                  className={classes.inputField}
                  value={values.city}
                  onChange={(event, newValue) =>
                    handleCity(values, setValues, newValue)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      disabled={!update}
                      size="small"
                      label="City"
                      variant="outlined"
                      className={classes.inputField}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={9} lg={5} className={classes.griditem}>
                <TextField
                  label="College"
                  name="college"
                  value={values.college}
                  onChange={changeHandler}
                  disabled={!update}
                  variant="outlined"
                  fullWidth
                  size="small"
                  className={classes.inputField}
                />
              </Grid>
              <Grid item xs={9} lg={5} className={classes.griditem}>
                <TextField
                  label="Birthday"
                  name="date_of_birth"
                  value={values.date_of_birth}
                  onChange={changeHandler}
                  id="date"
                  fullWidth
                  disabled={!update}
                  size="small"
                  type="date"
                  className={classes.inputField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid container className={classes.griditem}>
                <Grid item xs={6} className={classes.griditem}>
                  <Button
                    color="secondary"
                    variant="contained"
                    disabled={!update}
                    className={classes.btn}
                    onClick={() => {
                      cancelHandler(setValues);
                    }}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item xs={6} className={classes.griditem}>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    disabled={!update}
                    className={classes.btn}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </form>
    </>
  );
}
