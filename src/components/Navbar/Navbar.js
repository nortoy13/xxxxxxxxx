import React, { useEffect, useState } from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import "./navbar.css";
import ReactSwitch from "react-switch";

function Navbar({ theme, toggleTheme }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setUser(null);
  };
  return (
    <AppBar className="appBar" position="static" color="inherit">
      <div className="brandContainer">
        <Link className="logo" to="/">
          Collections
        </Link>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h4>DarkMode</h4>
        <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
      </div>
      <Toolbar className="toolbar">
        {user ? (
          <div className="profile" style={{ display: "flex", alignItems: "center" }}>
            <Link to={`/users/${user?.result?._id}`}>
              <Avatar className="avatar" alt={user?.result?.name} src={user?.result?.imageUrl}>
                {user?.result?.name.charAt(0)}
              </Avatar>
            </Link>
            <Typography className="username" variant="h6">
              <Link to={`/users/${user?.result?._id}`}>{user?.result?.name}</Link>
            </Typography>
            <Link to="/users">
              <ManageAccountsIcon fontSize="large" />
            </Link>
            <Button variant="contained" className="logout" color="primary" onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">
            Sign in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
