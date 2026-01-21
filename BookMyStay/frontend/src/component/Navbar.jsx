import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../Css/Navbar.css";

const NavigationBar = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserRole(decoded.role);
      } catch (e) {
        console.warn("Invalid token", e);
        setUserRole(null);
      }
    } else {
      setUserRole(null);
    }
  }, []);

  const handleLogout = () => {
    // 🔹 Remove token from local storage
    localStorage.removeItem("token");

    // 🔹 Redirect to login page
    navigate("/login");

    // Optional: show confirmation
    alert("You have been logged out successfully!");
  };

  return (
    <Navbar bg="light" expand="lg" fixed="top" className="shadow-sm">
      <Container>
          <Navbar.Brand href="/">
            <img
              src="../src/assets/logo2.jfif"
              width="80"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
            <span>  BookMyStay</span>
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/hotels">Hotels</Nav.Link>
            <Nav.Link href="/my-bookings">My Bookings</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/contact">Contact Us</Nav.Link>
            {userRole === "admin" && (
              <NavDropdown title="Masters" id="masters-dropdown">
                <NavDropdown.Item as={Link} to="/master/cities">City Master</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/master/hotels">Hotel Master</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/master/rooms">Room Master</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/master/users">User Master</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
          <Button
            variant="dark"
            className="ms-3 rounded-pill px-4"
            onClick={handleLogout}
          >
            Log Out
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
