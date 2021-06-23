import Cookies from "js-cookie";
import { Route, Redirect } from "react-router";

export default function UserRedirect({ component: Component, ...rest }) {
  var isAuth = false;
  if (Cookies.get("c_id")) {
    isAuth = true;
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}
