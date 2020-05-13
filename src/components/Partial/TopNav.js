import React, { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  Container
} from 'reactstrap';
import {Link} from "react-router-dom";

const TopNav = (props) => {
  return (
      <Navbar color="light" light expand="md">
        <Container>
            <NavbarBrand><Link to="/">Course Management System</Link></NavbarBrand>
            <div className="nav-btn">
                <i className="fas fa-bars fa-2x" aria-hidden="true"></i>
            </div>
        </Container>
      </Navbar>
  );
}

export default TopNav;