import React from 'react';
import { withRouter } from 'react-router-dom';
import { Typography, Breadcrumbs, Link } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import GrainIcon from '@material-ui/icons/Grain';

const NavBar = ({ location }) => {
    return (
        <Breadcrumbs aria-label='breadcrumb'>
        <Link color='inherit' 
            href='/login' 
            className={`nav_item ${location.pathname === '/login' ? 'active' : ""}`}>
          <HomeIcon />
          Log-in
        </Link>
        <Link
          color='inherit'
          href='/'
          className={`nav_item ${location.pathname === '/' ? 'active' : ""}`}
        >
          <WhatshotIcon />
          Home
        </Link>
        <Typography color='textPrimary'>
          <GrainIcon />
          Breadcrumb
        </Typography>
      </Breadcrumbs>
    )
}

export default withRouter(NavBar);