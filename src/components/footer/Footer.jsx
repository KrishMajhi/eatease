import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => (
  <footer className="footer">
    <div className="footer-inner">
      <div className="footer-brand">
        <span className="footer-logo">EatEase<span style={{ color: "var(--clr-ink)" }}>.</span></span>
        <p>Good food, delivered fast. Fresh from your favourite restaurants straight to your door.</p>
      </div>

      <div className="footer-links">
        <div className="footer-col">
          <h4>Company</h4>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="footer-col">
          <h4>Explore</h4>
          <Link to="/">Home</Link>
          <Link to="/search">Search</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/cart">Cart</Link>
        </div>
        <div className="footer-col">
          <h4>Legal</h4>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </div>

    <div className="footer-bottom">
      <p>© {new Date().getFullYear()} EatEase. Built by Krish.</p>
    </div>
  </footer>
);

export default Footer;
