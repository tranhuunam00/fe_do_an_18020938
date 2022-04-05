import { useReducer, createContext, useContext } from "react";
import reducer, { initState } from "./reducer";
import UserContext from "./context";

function UserProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
}
export default UserProvider;
console.log(initState);
