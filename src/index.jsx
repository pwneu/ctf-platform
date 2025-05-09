// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { SignalRProvider } from "./context/SignalRProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <SignalRProvider>
        <ScrollToTop />
        <App />
      </SignalRProvider>
    </AuthProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
