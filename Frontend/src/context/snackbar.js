import React from "react";
const Snackbar = React.createContext();

const SnackbarProvider = (props) => {
  const [openbar, setOpenbar] = React.useState({
    open: false,
  });

  const openbarfun = (type, message) => {
    setOpenbar({
      open: true,
      severity: type,
      message: message,
    });
  };
  const closebarfun = () => {
    setOpenbar({
      open: false,
      severity: "",
      message: "",
    });
  };
  return (
    <>
      <Snackbar.Provider value={{ openbar, openbarfun, closebarfun }}>
        {props.children}
      </Snackbar.Provider>
    </>
  );
};
export default Snackbar;
export { SnackbarProvider };
