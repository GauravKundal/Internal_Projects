import React from "react";
import "../Css/footer.css";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer-modern">
      <div className="container text-center">
        <img src="../src/assets/logo2.jfif" alt="BookMyStay Logo" className="footer-logo mb-3" />
        <h4 className="text-white fw-bold mb-2">BookMyStay</h4>
        <p className="text-light small mb-3">
          Making travel stays easier, smarter, and more comfortable — anytime, anywhere.
        </p>

        <div className="social-icons mt-3 mb-4">
          <a href="#"><FaFacebook /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaLinkedin /></a>
        </div>

        {/* <div className="footer-links mb-3">
          <a href="#">Home</a>
          <a href="#">Hotels</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div> */}

        <p className="small mb-0">
          © {new Date().getFullYear()} <strong>BookMyStay</strong>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
