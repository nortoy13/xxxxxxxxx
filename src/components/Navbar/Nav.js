import React, { useEffect, useState } from "react";
import { Avatar, Button, Checkbox, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import decode from "jwt-decode";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SettingsIcon from "@mui/icons-material/Settings";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import "./navbar.css";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { getUser } from "../../actions/users";
function Navigation() {
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
  useEffect(() => {
    dispatch(getUser(user?.result._id));
  }, [user]);
  const { userInfo } = useSelector((state) => state.users);
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setUser(null);
  };
  return (
    <Navbar elevation={6} className="appBar" sticky="top" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link className="logo" to="/">
            Collections
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="nav ms-auto my-2 my-lg-0">
            <Link to="/settings" className="me-4">
              <h5>
                <SettingsIcon fontSize="large" />
              </h5>
            </Link>
            {user ? (
              <>
                {userInfo?.isAdmin && (
                  <Link to="/users" className="me-4">
                    <h5>
                      <ManageAccountsIcon fontSize="large" />
                    </h5>
                  </Link>
                )}
                <div style={{ display: "flex", alignItems: "center" }} className="me-4">
                  <Link to={`/users/${user?.result?._id}`}>
                    <Avatar
                      className="avatar"
                      alt={user?.result?.name}
                      src={user?.result?.imageUrl}
                    >
                      {user?.result?.name.charAt(0)}
                    </Avatar>
                  </Link>
                  <Typography className="username" variant="h6">
                    <Link to={`/users/${user?.result?._id}`}>{user?.result?.name}</Link>
                  </Typography>
                </div>
                <Button variant="contained" className="logout" color="primary" onClick={logout}>
                  <LogoutIcon fontSize="small" />
                </Button>
              </>
            ) : (
              <Button className="login" component={Link} to="/auth" variant="contained" color="primary">
                <LoginIcon />
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
