import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routers from "./Routes";
import { AuthContextProvider } from "./context/auth";
import { SnackbarProvider } from "./context/snackbar";
function App() {
  return (
    <>
      <AuthContextProvider>
        <SnackbarProvider>
          <BrowserRouter>
            <Routers />
          </BrowserRouter>
        </SnackbarProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
