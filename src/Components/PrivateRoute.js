import { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router";
import GetUser, { UserContext } from "./UserContext";
import { isEmpty } from "./Utils";

export default function PrivateRoute({ component: Component, ...rest }) {
  const user = GetUser();

  return (
    <Route
      {...rest}
      render={(props) =>
        true === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}
