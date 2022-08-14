import React from 'react';
import {Navbar, Container, Nav, NavDropdown, } from 'react-bootstrap';
import '../index.css';

function NavbarComponent() {
    return (
        <Navbar className='navbar' variant='dark'>
          <Container>
            <Navbar.Brand className='navbarLogo' href="#">LM Cafe</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                <Nav.Link className='navbarLink1' href="#action1">Home</Nav.Link>
                <Nav.Link className='navbarLink2' href="#action2">About</Nav.Link>
                <NavDropdown title="Contact" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="#action3">CS (Customer Service)</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Website Handler
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
  }
  
  export default NavbarComponent;