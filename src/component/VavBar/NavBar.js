import React from "react";
import NavBar from "./NavBar.css";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LOGOUT } from "../../action/action";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import "bootstrap/dist/css/bootstrap.min.css";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@bit/mui-org.material-ui-icons.account-circle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import logo from "../../image/1013.png";
const Navbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const userlogin = useSelector((state) => state.userlogin);
  // const handleChange = (event) => {
  //   props.setLogin(event.target.Boolean);
  // };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogout = (e) => {
    e.preventDefault();
    history.push("/");
    dispatch(LOGOUT());
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // console.log(userlogin);

  return (
    <div className="navbar">
      <div className="logodiv">
        {/* <img src={logo} style={{ width: "6rem" }} /> */}
        <p>LOGO</p>
      </div>

      <ul className="listdiv">
        <li
          className="listcontent"
          onClick={() => {
            history.push(`/`);
          }}
        >
          <Button href="#text-buttons" style={{ color: "black" }}>
            houm
          </Button>
        </li>
        <li className="listcontent">
          <Button href="#text-buttons" style={{ color: "black" }}>
            about
          </Button>
        </li>
        {!userlogin && (
          <li
            style={{ paddingLeft: "0.7rem" }}
            className="listcontent"
            onClick={() => {
              history.push(`/LogIN`);
            }}
          >
            <button type="button" class="btn btn-outline-info">
              Log in
            </button>
          </li>
        )}
        {!userlogin && (
          <li
            style={{ paddingLeft: "0.7rem" }}
            className="listcontent"
            onClick={() => {
              history.push(`/SignUp`);
            }}
          >
            <button type="button">Sign up</button>
          </li>
        )}

        {userlogin && (
          <li className="listcontent">
            <Box
              sx={{ flexGrow: 1 }}
              style={{ marginBottom: "0rem", marginTop: "0rem" }}
            >
              <div className="logindiv">
                <IconButton
                  style={{ padding: "0px" }}
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  {/* <AccountCircle /> */}
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
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
                  <MenuItem
                    onClick={() => {
                      history.push(`/Profile`);
                    }}
                  >
                    Edit Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      history.push(`/Creat_new_post`);
                    }}
                  >
                    Creat new post
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
            </Box>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
