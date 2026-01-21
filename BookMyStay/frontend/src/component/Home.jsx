import React from "react";
import "../Css/home.css";
// import Footer from "./Footer";
import { Carousel } from "react-bootstrap";

function Home() {
  return (
    <div>
      {/* Hero Carousel Section */}
      <div className="hero-section">
        <Carousel fade interval={3000}>
          <Carousel.Item>
            <img
              className="d-block w-100 hero-img"
              src="../src/assets/m.jpg"
              alt="Luxury Hotel"
            />
            <Carousel.Caption className="hero-caption text-start">
              <h1>Find Your Comfort, Wherever You Go</h1>
              <p>
                BookMyStay connects you with top-rated hotels and homestays —
                offering comfort, luxury, and affordability for every traveler.
              </p>
              {/* <button className="btn btn-light fw-bold mt-2">Book Now</button> */}
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100 hero-img"
              src="../src/assets/p.jpg"
              alt="Cozy Rooms"
            />
            <Carousel.Caption className="hero-caption text-start">
              <h1>Discover Cozy Rooms & Great Deals</h1>
              <p>Relax, unwind, and enjoy your stay with BookMyStay.</p>
              {/* <button className="btn btn-light fw-bold mt-2">Explore Rooms</button> */}
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100 hero-img"
              src="../src/assets/b.jpg"
              alt="Travel Comfort"
            />
            <Carousel.Caption className="hero-caption text-start">
              <h1>Travel. Stay. Repeat.</h1>
              <p>Your comfort is our top priority — wherever you go.</p>
              {/* <button className="btn btn-light fw-bold mt-2">Get Started</button> */}
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      {/* Customer Reviews */}
      <section className="customer-section py-5">
        <div className="container text-center">
          <h2 className="mb-4 fw-bold text-primary">What Our Customers Say</h2>

          <div className="row justify-content-center">
            <div className="col-md-4 mb-4">
              <div className="review-card p-4 shadow-sm">
                <img
                  src="../src/assets/modi.jfif"
                  alt="User"
                  className="review-img"
                />
                <p className="review-text">
                  “BookMyStay made my vacation stress-free! Quick booking, clean
                  rooms, and great service. Highly recommended.”
                </p>
                <h5 className="review-name mt-3">– Narendra Modi</h5>
                <p className="review-stars">⭐⭐⭐⭐⭐</p>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="review-card p-4 shadow-sm">
                <img
                  src="../src/assets/rahul.jfif"
                  alt="User"
                  className="review-img"
                />
                <p className="review-text">
                  “The best hotel deals I’ve found online! Booking was smooth,
                  and everything looked exactly as shown.”
                </p>
                <h5 className="review-name mt-3">– Rahul Gandhi</h5>
                <p className="review-stars">⭐⭐⭐⭐</p>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="review-card p-4 shadow-sm">
                <img
                  src="../src/assets/c p.jpg"
                  alt="User"
                  className="review-img"
                />
                <p className="review-text">
                  “Loved how easy it was to compare hotels and book instantly.
                  Will definitely use BookMyStay again!”
                </p>
                <h5 className="review-name mt-3">– C P Johnson Sir</h5>
                <p className="review-stars">⭐⭐⭐⭐⭐</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
{/* Why Choose Section */}
<section className="why-section py-5">
  <div className="container text-center">
    <h2 className="fw-bold mb-4 text-primary">Why Choose <span className="text-primary">BookMyStay</span>?</h2>
    <p className="text-muted mb-5">
      Experience comfort, trust, and convenience with our curated stays and seamless booking process.
    </p>

    <div className="row justify-content-center">
      <div className="col-md-4 mb-4">
        <div className="why-card shadow-sm">
          <img src="../src/assets/comfort.png" alt="Comfort" className="why-icon"/>
          <h5>Comfort & Luxury</h5>
          <p className="colorfor">Enjoy handpicked hotels that combine modern comfort with premium amenities.</p>
        </div>
      </div>

      <div className="col-md-4 mb-4">
        <div className="why-card shadow-sm">
          <img src="../src/assets/hh.jpg" alt="Secure Booking" className="why-icon"/>
          <h5>Secure & Fast Booking</h5>
          <p className="colorfor">Book with confidence — 100% secure payments and instant confirmation.</p>
        </div>
      </div>

      <div className="col-md-4 mb-4">
        <div className="why-card shadow-sm">
          <img src="../src/assets/time.jpg" alt="24/7 Support" className="why-icon"/>
          <h5>24/7 Customer Support</h5>
          <p className="colorfor">Our support team is always available to help with your bookings and queries.</p>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
}

export default Home;
