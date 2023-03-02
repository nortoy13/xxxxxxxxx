import React, { createContext, useEffect, useState } from "react";
import { Container } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import "./app.css";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import PersonalPage from "./components/PersonalPage/PersonalPage";
import AdminPage from "./components/AdminPage/AdminPage";
import Nav from "./components/Navbar/Nav";
import Settings from "./components/SettingsPage/Settings";

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    if (localStorage.getItem("theme")) {
      setTheme("dark");
    }
  }, []);
  const toggleTheme = () => setTheme((curr) => (curr === "light" ? "dark" : "light"));

  return (
    <BrowserRouter>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <div className="app" id={theme}>
          <Nav />
          <Container maxWidth="xl">
            <Routes>
              <Route path="/" exact element={<Navigate to="/posts" replace />} />
              <Route path="/posts" exact element={<Home />} />
              <Route path="/posts/search" exact element={<Home />} />
              <Route path="/posts/:id" exact element={<PostDetails />} />
              <Route path="/auth" exact element={<Auth />} />
              <Route path="/users/:id" exact element={<PersonalPage />} />
              <Route path="/users" exact element={<AdminPage />} />
              <Route
                path="/settings"
                exact
                element={<Settings theme={theme} toggleTheme={toggleTheme} />}
              />
            </Routes>
          </Container>
        </div>
      </ThemeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
