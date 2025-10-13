import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, NavLink } from "react-router-dom";
function Navbarr() {

    return <>
   <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">BrandLogo</Navbar.Brand>
          <Nav className="me-auto">
            <NavLink className={({ isActive }) => 
    isActive ? "nav-link active" : "nav-link"
  } to="/"   >Home</NavLink>

            <NavLink className={({ isActive }) => 
    isActive ? "nav-link active" : "nav-link"
  } to="/movies">Movies</NavLink>
            <NavLink className={({ isActive }) => 
    isActive ? "nav-link active" : "nav-link"
  }  to="/categories">Categories</NavLink>
             <NavLink className={({ isActive }) => 
    isActive ? "nav-link active" : "nav-link"
  } to="/pricing">Pricing</NavLink>
            <NavLink className={({ isActive }) => 
    isActive ? "nav-link active" : "nav-link"
  } to="/about">About us</NavLink>
          </Nav>
        </Container>
      </Navbar>


    </>

}

export default Navbarr;