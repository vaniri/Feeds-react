import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Typography, Breadcrumbs, link } from '@material-ui/core';
import { HomeIcon, WhatshotIcon, GrainIcon }from '@material-ui/icons';

const NavBar = ({ location }) => {
    return (
        <Breadcrumbs aria-label='breadcrumb'>
        <Link color='inherit' 
            href='/login' 
            className={`nav_item ${locatin.pathname === '/login' ? 'active' : ""}`}>
          <HomeIcon className={classes.icon} />
          Log-in
        </Link>
        <Link
          color='inherit'
          href='/'
          className={`nav_item ${location.pathname === '/' ? 'active' : ""}`}
        >
          <WhatshotIcon className={classes.icon} />
          Home
        </Link>
        <Typography color='textPrimary' className={classes.link}>
          <GrainIcon className={classes.icon} />
          Breadcrumb
        </Typography>
      </Breadcrumbs>
    )
}

export default withRouter(NavBar);