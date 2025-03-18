import { createContext } from "react";
import { useState, useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import { toast } from "react-toastify";
import useAuth from "@/hooks/useAuth";

const SignalRContext = createContext();

export const SignalRProvider = ({ children }) => {
  const { auth } = useAuth();
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    if (!auth?.accessToken) return;

    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("/api/announcements", {
        accessTokenFactory: () => auth.accessToken,
        withCredentials: true,
      })
      .withAutomaticReconnect()
      .build();

    newConnection
      .start()
      .then(() => setConnection(newConnection))
      .catch(() => {});

    const handleAnnouncement = (message) => {
      toast.info(message, { autoClose: 30_000 });
    };

    newConnection.on("ReceiveAnnouncement", handleAnnouncement);

    return () => {
      newConnection.off("ReceiveAnnouncement", handleAnnouncement);
      newConnection.stop();
    };
  }, [auth?.accessToken]);

  return (
    <SignalRContext.Provider value={{ connection }}>
      {children}
    </SignalRContext.Provider>
  );
};

export default SignalRContext;
