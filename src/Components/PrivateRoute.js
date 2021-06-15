import { Route, Redirect } from "react-router";

export default function PrivateRoute({ component: Component, ...rest }) {
  const bool = true;
  return (
    <Route
      {...rest}
      render={(props) =>
        bool === true ? (
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
