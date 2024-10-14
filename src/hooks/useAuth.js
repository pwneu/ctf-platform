import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

// Wrapper for the AuthProvider.jsx
// Reference: https://www.youtube.com/watch?v=AcYF18oGn6Y

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export default useAuth;
