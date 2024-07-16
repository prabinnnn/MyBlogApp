import React, { useState, useCallback } from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <div className="navBar1">
      <Navbar color="dark" dark className="fixed-top d-flex justify-content-between" expand="md">
        <Link to="/" className="text-white">JSOM</Link>
        <NavbarToggler onClick={toggle} style={{ width: 'auto' }} />
        <Collapse className="" isOpen={isOpen} navbar style={{ color: 'white', width: 'auto' }}>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link to="/" onClick={toggle} className="nav-link text-white">Home</Link>
            </NavItem>
            <NavItem>
              <Link to="/about" onClick={toggle} className="nav-link text-white">About</Link>
            </NavItem>
            <NavItem>
              <Link to="/blogs" onClick={toggle} className="nav-link text-white">Blogs</Link>
            </NavItem>
            <NavItem>
              <Link to="/bookmarks" onClick={toggle} className="nav-link text-white">Bookmarks</Link>
            </NavItem>
            <NavItem>
              <Link to="/contact" onClick={toggle} className="nav-link text-white">Contact</Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavigationBar;
