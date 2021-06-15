import { useContext, useEffect, createContext } from "react";
import { getUserById } from "./Api";
import axios from "axios";

export const UserContext = createContext({});

const GetUser = () => {
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    try {
      async function fetchUser() {
        const response = await axios.get(
          "http://localhost:8000/api/v1/auth/login",
          {
            withCredentials: true,
          }
        );
        if (response.data.loggedIn) {
          const result = await getUserById(response.data.user);
          setUser(result);
        }
      }
      fetchUser();
    } catch {
      console.log("there is some error");
    }
  }, [setUser]);

  return user;
};
export default GetUser;
