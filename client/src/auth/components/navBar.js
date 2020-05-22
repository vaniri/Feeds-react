import React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles, Typography, Breadcrumbs, Button, Link } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import GrainIcon from '@material-ui/icons/Grain';
import '../../style/index.css';

const useStyles = makeStyles((theme) => ({
  link: {
    display: 'flex',
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}));

const NavBar = ({ logoutHandler }) => {
  const classes = useStyles();

  return (
    <Breadcrumbs id="nav" aria-label="breadcrumb">
        <Link color="inherit"
        className={`nav_item ${window.location.pathname === '/' ? 'active' : ""}`} href='/home'>
        <HomeIcon className={classes.icon} />
        Home
        </Link>
      <Link
        color="inherit"
        className={`nav_item ${window.location.pathname === '/sources' ? 'active' : ""}`} href='/sources'>
        <WhatshotIcon className={classes.icon} />
        Sources
      </Link>
      <Typography color="textPrimary" className={classes.link}>
        <GrainIcon className={classes.icon} />
        Breadcrumb
      </Typography>
      <Button id="logout-button" type="submit" onClick={logoutHandler}>Log out
      </Button>
    </Breadcrumbs>
  );
}

export default NavBar;
