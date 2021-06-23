import Cookies from "js-cookie";
import { Route, Redirect } from "react-router";

export default function ProtectedRoute({ component: Component, ...rest }) {
  var isAuth = false;
  if (Cookies.get("c_id")) {
    isAuth = true;
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? (
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
