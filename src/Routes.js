import { Route, Switch, Redirect } from "react-router";
import Register from "./pages/register";
import CreateEvent from "./pages/events/createEvent";
import Login from "./pages/login";
import ViewEvent from "./pages/events/viewEvents";
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
            <Switch>
              <Route exact path="/event">
                <ViewEvent />
              </Route>
              <Route exact path="/event/create">
                <CreateEvent />
              </Route>
              <Route exact path="/event/booked">
                <CreateEvent />
              </Route>
              <Route exact path="/event/myEvents">
                <ViewEvent />
              </Route>
            </Switch>
          </>
        )}
        <Route>
          <Error />
        </Route>
      </Switch>
    </>
  );
}
