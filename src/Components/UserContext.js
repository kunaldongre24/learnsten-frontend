import { useContext, useEffect, createContext } from "react";
import { getUserById } from "./Api";
import Cookies from "js-cookie";

export const UserContext = createContext({});

const GetUser = () => {
  const c_id = Cookies.get("c_id");
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    try {
      async function fetchUser() {
        if (c_id) {
          const result = await getUserById(c_id);
          setUser(result);
        }
      }
      fetchUser();
    } catch (err) {
      console.log(err);
    }
  }, [setUser, c_id]);

  return user;
};
export default GetUser;
