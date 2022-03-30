import { useState } from "react";
import SocketContext from "./context";

function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  return (
    <SocketContext.Provider value={[socket, setSocket]}>
      {children}
    </SocketContext.Provider>
  );
}
export default SocketProvider;
