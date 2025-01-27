import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useMemo } from "react";
import { themeSettings } from "./theme";
import { Toaster } from "react-hot-toast";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import Navbar from "./components/Navbar";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import HomePage from "./Pages/HomePage";

function App() {
  const theme = useMemo(() => createTheme(themeSettings()), []);
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Toaster />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
