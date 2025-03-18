import SignalRContext from "@/context/SignalRProvider";
import { useContext } from "react";

const useSignalR = () => {
  const context = useContext(SignalRContext);

  if (context === undefined) {
    throw new Error("useSignalR must be used within a SignalRProvider");
  }

  return context;
};

export default useSignalR;
