import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import "./Navbar.css";

function NavBar() {
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);

  useEffect(() => {
    function scrollHandler() {
      updateNavbar(window.scrollY >= 20);
    }
    window.addEventListener("scroll", scrollHandler, { passive: true });
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  const closeMenu = () => updateExpanded(false);

  return (
    <Navbar
      expanded={expand}
      fixed="top"
      expand="md"
      className={navColour ? "sticky minimal-nav" : "minimal-nav"}
    >
      <Container>
        <Navbar.Brand
          as={NavLink}
          to="/"
          className="nav-brand"
          onClick={closeMenu}
        >
          <span className="brand-prompt">~/</span>
          <span className="brand-mark">JN</span>
          <span className="brand-caret">_</span>
        </Navbar.Brand>

        <div className="nav-actions">
          <ThemeToggle className="d-md-none" />
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={() => updateExpanded(expand ? false : "expanded")}
          >
            <span></span>
            <span></span>
            <span></span>
          </Navbar.Toggle>
        </div>

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" defaultActiveKey="#home">
            <Nav.Item>
              <Nav.Link as={NavLink} to="/" end onClick={closeMenu}>
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/about" onClick={closeMenu}>
                About
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/project" onClick={closeMenu}>
                Projects
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/animations" onClick={closeMenu}>
                Animations
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/resume" onClick={closeMenu}>
                Resume
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/network" onClick={closeMenu}>
                Network
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="nav-toggle-item d-none d-md-flex">
              <ThemeToggle />
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
