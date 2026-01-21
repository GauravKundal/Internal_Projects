import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import NavigationBar from "../component/Navbar";
import Footer from "../component/Footer";
import "../Css/about.css";

const AboutUs = () => {
  return (
    <>
      <NavigationBar />

      {/* Hero Section */}
      <section className="about-hero text-center text-white">
        <div className="overlay">
          <h1 className="display-5 fw-bold">About BookMyStay</h1>
          <p className="lead">Your trusted partner in finding comfort and luxury anywhere</p>
        </div>
      </section>

      {/* About Info */}
      <Container className="py-5">
        <Row className="align-items-center">
          <Col md={6}>
            <img src="../src/assets/aboutUS.jpg" alt="About Us" className="img-fluid rounded shadow" />
          </Col>
          <Col md={6}>
            <h2 className="fw-bold text-primary mb-3">Who We Are</h2>
            <p className="text-muted">
              <strong>BookMyStay</strong> is an online hotel and homestay booking platform designed
              to make your travel experience seamless and comfortable. Whether you're on a business trip
              or family vacation, we connect you with verified properties, best deals, and quick booking options.
            </p>
            <p className="text-muted">
              Founded with a passion for technology and hospitality, our goal is to bridge the gap between
              travelers and quality accommodation at affordable prices.
            </p>
          </Col>
        </Row>
      </Container>

      {/* Developer Section */}
      <section className="developers py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-5 text-white">Meet the Developers</h2>
          <div className="row justify-content-center">
            <div className="col-md-4 mb-4">
              <Card className="dev-card p-4 shadow-lg">
                <img src="../src/assets/My Photo.jpg" alt="Developer" className="dev-img" />
                <h5 className="mt-3">Gaurav Salunkhe</h5>
                <p className="text-muted">Full Stack Developer (React + NestJS + Express)</p>
              </Card>
            </div>
            <div className="col-md-4 mb-4">
              <Card className="dev-card p-4 shadow-lg">
                <img src="../src/assets/Pradip.jfif" alt="Developer" className="dev-img" />
                <h5 className="mt-3">Pradip Patil</h5>
                <p className="text-muted">Full Stack Developer (React + NestJS + Express)</p>
              </Card>
            </div>
                <div className="col-md-4 mb-4">
              <Card className="dev-card p-4 shadow-lg">
                <img src="../src/assets/Shashi.png" alt="Developer" className="dev-img" />
                <h5 className="mt-3">Shashibhushan Mishra</h5>
                <p className="text-muted">Full Stack Developer (React + NestJS + Express)</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default AboutUs;
