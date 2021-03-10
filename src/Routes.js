import { Route, Switch, Redirect } from "react-router";
import Register from "./pages/register";
import Event from "./pages/events/event";
import Login from "./pages/login";
import AppBar from "./components/AppBar";
import Drawer from "./components/Drawer";
import ViewEvent from "./pages/events/view";
import React from "react";
import AuthContext from "./context/auth";

const Error = () => {
  return (
    <h1>
      Errorasdfghjklddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    </h1>
  );
};
export default function Routers() {
  const context = React.useContext(AuthContext);
  console.log("executed");
  return (
    <>
      {!context.authdata.isLoggedIn ? <AppBar /> : <Drawer />}
      <Switch>
        <Route exact path="/">
          {context.authdata.isLoggedIn ? <Redirect to="/event" /> : <Login />}
        </Route>
        <Route exact path="/register">
          {context.authdata.isLoggedIn ? (
            <Redirect to="/event" />
          ) : (
            <Register />
          )}
        </Route>
        {context.authdata.isLoggedIn === true && (
          <>
            <Route exact path="/event">
              <ViewEvent />
            </Route>

            <Route path="/event/create">
              <Event />
            </Route>
          </>
        )}
        <Route>
          <Error />
        </Route>
      </Switch>
    </>
  );
}
