import '../../style/index.css';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Menu, Toolbar, Typography, IconButton, Switch, FormControlLabel, FormGroup, MenuItem, Link } from '@material-ui/core';
import MdRssFeed from '@material-ui/icons/RssFeed';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const NavBar = ({ logoutHandler }) => {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={auth} onChange={logoutHandler} aria-label="login switch" />}
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link
              color="inherit"
              className={`nav_item ${window.location.pathname === '/' ? 'active' : ""}`} href='/sources'>
              <MdRssFeed />
              Sources
           </Link>
          </Typography>
          {auth && (
            <div>
              <IconButton
                id="nav-avatar"
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
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>

              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
      
export default NavBar;
