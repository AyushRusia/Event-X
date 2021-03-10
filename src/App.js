import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routers from "./Routes";
import { AuthContextProvider } from "./context/auth";
function App() {
  return (
    <>
      <AuthContextProvider>
        <BrowserRouter>
          <Routers />
        </BrowserRouter>
      </AuthContextProvider>
    </>
  );
}

export default App;
