import React from "react";
import NavBar from "./NavBar.css";
import { useHistory, useRouteMatch } from "react-router-dom";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@bit/mui-org.material-ui-icons.account-circle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

const Navbar = (props) => {
  const history = useHistory();

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    props.setLogin(event.target.Boolean);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="navbar">
      <div className="logodiv">
        <p>LOGO</p>
      </div>

      <ul className="listdiv">
        <li
          className="listcontent"
          onClick={() => {
            history.push(`/`);
          }}
        >
          Home
        </li>
        <li className="listcontent">About</li>
        <li
          className="listcontent"
          onClick={() => {
            history.push(`/LogIN`);
          }}
        >
          Log in
        </li>
        <li
          className="listcontent"
          onClick={() => {
            history.push(`/SignUp`);
          }}
        >
          Sign up
        </li>
        <li
          className="listcontent"
          onClick={() => {
            history.push(`/New`);
          }}
        >
          New
        </li>
        <li className="listcontent">
          <Box sx={{ flexGrow: 1 }}>
            {auth && (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={handleChange}>Logout</MenuItem>
                </Menu>
              </div>
            )}
          </Box>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
