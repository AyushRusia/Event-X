// import React, { useContext } from "react";
// import { Formik, Form, Field } from "formik";
// import * as yup from "yup";
// import Button from "@material-ui/core/Button";
// import { makeStyles, createStyles, Paper, Grid } from "@material-ui/core";
// import Autocomplete from "@material-ui/lab/Autocomplete";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import TextField from "@material-ui/core/TextField";
// import OutlinedInput from "@material-ui/core/OutlinedInput";
// import Visibility from "@material-ui/icons/Visibility";
// import VisibilityOff from "@material-ui/icons/VisibilityOff";
// import IconButton from "@material-ui/core/IconButton";
// import axios from "axios";
// import { useHistory } from "react-router-dom";
// import Snackbar from "../../context/snackbar";
// const cities = ["Bhopal", "Jabalpur", "Gwalior"];
// const useStyles = makeStyles((theme) =>
//   createStyles({
//     root: {
//       margin: 0,
//       padding: 0,
//       display: "flex",
//       flexWrap: "row",
//       justifyContent: "center",
//       alignItems: "center",
//     },
//     griditem: {
//       display: "flex",
//       justifyContent: "center",
//       margin: "auto",
//       marginTop: "15px",
//     },
//     form: {
//       display: "block",
//       boxSizing: "border-box",
//       padding: "30px",
//       backgroundColor: "#ccc",
//       marginRight: "10px",
//       marginLeft: "10px",
//       borderRadius: "10%",
//     },
//     inputField: {
//       maxWidth: "400px",
//       //height: "40px",
//     },
//     textField: {
//       height: "15px",
//     },
//     btn: {
//       margin: "auto",
//       marginTop: "30px",
//       width: "150px",
//     },
//   })
// );
// export default function UpdateForm(props) {
//   const { update, setupdatefalse, initialValues } = props;

//   const classes = useStyles();
//   const history = useHistory();
//   const Context2 = useContext(Snackbar);
//   const [showPassword, setShowPassword] = React.useState(false);
//   // const initialValues = {
//   //   name: "Ayush",
//   //   newpassword: "",
//   //   phone: "",
//   //   city: "",
//   //   college: "",
//   //   date_of_birth: "",
//   // };
//   console.log(initialValues);
//   const validationSchema = yup.object({});
//   const handleCity = (values, setValues, newValue) => {
//     setValues({
//       ...values,
//       city: newValue,
//     });
//   };
//   const cancelHandler = (setValues) => {
//     setupdatefalse();
//     setValues(initialValues);
//   };
//   // const submitHandler = async (values) =>
//     try {
//       const body = `mutation{
//   updateProfile(updateUserInput:{
//     name:"${values.name}",
//     phone:"${values.phone}",
//     password:"${values.newpassword}",
//     city:"${values.city}",
//     college:"${values.college}",
//     date_of_birth:"${values.date_of_birth}"
//   }){
//     name
//     password
//     phone
//     password
//     city
//     college
//     date_of_birth
//   }
// }`;
//       setupdatefalse();
//       const response = await axios.post(
//         "http://localhost:8000/graphql",
//         {
//           query: body,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       Context2.openbarfun("success", "Profile Updated");
//       history.push("/profile");
//     } catch (error) {
//       console.log(error.response.data);
//     }
//   };

//   React.useEffect(() => {}, [initialValues]);
//   return (
//     <>
//       <div className={classes.root}>
//         <Grid container justifyContent="center">
//           <Formik
//             initialValues={initialValues}
//             validationSchema={validationSchema}
//             onSubmit={(values) => submitHandler(values)}
//           >
//             {({ values, setValues }) => (
//               <Form aria-label="register form" id="register">
//                 <Grid item xs={12} lg={9} className={classes.griditem}>
//                   <Paper elevation={6} className={classes.form}>
//                     <Grid container>
//                       <Grid item xs={9} lg={8} className={classes.griditem}>
//                         <Field name="name">
//                           {({ field, meta }) => {
//                             return (
//                               <TextField
//                                 fullWidth
//                                 size="small"
//                                 disabled={!update}
//                                 label="Name"
//                                 variant="outlined"
//                                 {...field}
//                                 className={classes.inputField}
//                               />
//                             );
//                           }}
//                         </Field>
//                       </Grid>

//                       <Grid item xs={12} lg={8} className={classes.griditem}>
//                         <Field name="newpassword">
//                           {({ field, meta }) => (
//                             <OutlinedInput
//                               placeholder="Password"
//                               id="Password"
//                               height="20px"
//                               fullwidth
//                               disabled={!update}
//                               type={showPassword ? "text" : "password"}
//                               {...field}
//                               className={classes.inputField}
//                               endAdornment={
//                                 <InputAdornment position="end">
//                                   <IconButton
//                                     size="small"
//                                     aria-label="toggle password visibility"
//                                     onClick={() => {
//                                       setShowPassword(!showPassword);
//                                     }}
//                                     edge="end"
//                                   >
//                                     {showPassword ? (
//                                       <Visibility />
//                                     ) : (
//                                       <VisibilityOff />
//                                     )}
//                                   </IconButton>
//                                 </InputAdornment>
//                               }
//                             />
//                           )}
//                         </Field>
//                       </Grid>
//                       <Grid item xs={12} lg={8} className={classes.griditem}>
//                         <Field name="phone">
//                           {({ field, meta }) => (
//                             <TextField
//                               fullWidth
//                               disabled={!update}
//                               size="small"
//                               label="Phone"
//                               {...field}
//                               variant="outlined"
//                               error={!!(meta.touched && meta.error)}
//                               helperText={meta.touched ? meta.error : ""}
//                               className={classes.inputField}
//                             />
//                           )}
//                         </Field>
//                       </Grid>
//                       <Grid item xs={10} lg={5} className={classes.griditem}>
//                         <Field name="city">
//                           {({ field, meta }) => (
//                             <Autocomplete
//                               id="combo-box-demo"
//                               options={cities}
//                               getOptionSelected={(option) => option}
//                               fullWidth
//                               disabled={!update}
//                               className={classes.inputField}
//                               value={initialValues.city}
//                               onChange={(event, newValue) =>
//                                 handleCity(values, setValues, newValue)
//                               }
//                               renderInput={(params) => (
//                                 <TextField
//                                   {...params}
//                                   fullWidth
//                                   disabled={!update}
//                                   size="small"
//                                   label="City"
//                                   variant="outlined"
//                                   error={!!(meta.touched && meta.error)}
//                                   helperText={meta.touched ? meta.error : ""}
//                                   className={classes.inputField}
//                                 />
//                               )}
//                             />
//                           )}
//                         </Field>
//                       </Grid>
//                       <Grid item xs={10} lg={5} className={classes.griditem}>
//                         <Field name="college">
//                           {({ field, meta }) => (
//                             <TextField
//                               fullWidth
//                               disabled={!update}
//                               size="small"
//                               label="College"
//                               variant="outlined"
//                               {...field}
//                               // value={
//                               //   update ? values.college : inititalValues.college
//                               // }
//                               error={!!(meta.touched && meta.error)}
//                               helperText={meta.touched ? meta.error : ""}
//                               className={classes.inputField}
//                             />
//                           )}
//                         </Field>
//                       </Grid>
//                       <Grid item xs={9} lg={5} className={classes.griditem}>
//                         <Field name="date_of_birth">
//                           {({ field, meta }) => (
//                             <TextField
//                               id="date"
//                               fullWidth
//                               disabled={!update}
//                               size="small"
//                               label="Birthday"
//                               type="date"
//                               {...field}
//                               // value={
//                               //   update
//                               //     ? values.date_of_birth
//                               //    : inititalValues.date_of_birth
//                               //  }
//                               error={!!(meta.touched && meta.error)}
//                               helperText={meta.touched ? meta.error : ""}
//                               className={classes.inputField}
//                               InputLabelProps={{
//                                 shrink: true,
//                               }}
//                             />
//                           )}
//                         </Field>
//                       </Grid>
//                       <Grid container className={classes.griditem}>
//                         <Grid item xs={6} className={classes.griditem}>
//                           <Button
//                             color="secondary"
//                             variant="contained"
//                             disabled={!update}
//                             className={classes.btn}
//                             onClick={() => {
//                               cancelHandler(setValues);
//                             }}
//                           >
//                             Cancel
//                           </Button>
//                         </Grid>
//                         <Grid item xs={6} className={classes.griditem}>
//                           <Button
//                             type="submit"
//                             color="primary"
//                             variant="contained"
//                             disabled={!update}
//                             className={classes.btn}
//                           >
//                             Submit
//                           </Button>
//                         </Grid>
//                       </Grid>
//                     </Grid>
//                   </Paper>
//                 </Grid>
//               </Form>
//             )}
//           </Formik>
//         </Grid>
//       </div>
//     </>
//   );
// }
