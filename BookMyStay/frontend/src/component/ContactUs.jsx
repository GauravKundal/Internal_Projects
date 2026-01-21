import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaPhoneAlt, FaLinkedin } from "react-icons/fa";
import NavigationBar from "../component/Navbar";
import Footer from "../component/Footer";
import "../Css/contact.css";

const ContactUs = () => {
  return (
    <>
      <NavigationBar />

      <section className="contact-hero text-center text-white">
        <div className="overlay">
          <h1 className="display-5 fw-bold">Contact Us</h1>
          <p className="lead">We’re here to help you 24/7 with your bookings </p>
        </div>
      </section>

      <Container className="py-5 text-center">
        <Row className="justify-content-center">
          <Col md={5}>
            <Card className="contact-card p-4 shadow-sm mb-4">
              <FaPhoneAlt className="contact-icon" />
              <h5 className="mt-3">Call Us</h5>
              <p className="text-muted mb-1">📞 Gaurav Salunkhe +91 7447535563</p>
              <p className="text-muted mb-1">📞 Shashibhushan Mishra +91 7972414108</p>
              <p className="text-muted mb-1">📞 Pradip Patil +91 8788435617</p>
            </Card>
          </Col>

          <Col md={5}>
            <Card className="contact-card p-4 shadow-sm mb-4">
              <FaLinkedin className="contact-icon" />
              <h5 className="mt-3">Connect on LinkedIn</h5>
              <a
                href="https://www.linkedin.com/in/gaurav-salunkhe-813999220/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none text-primary"
              >
                Gaurav Salunkhe 
              </a>
              <a
                href="https://www.linkedin.com/in/pradip-patil-42797737b/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none text-primary"
              >
               Pradip Patil
              </a>
                <a
                href="https://www.linkedin.com/in/shashibhushan-mishra-b4b861122/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none text-primary"
              >
              Shashibhushan Mishra
              </a>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ContactUs;
