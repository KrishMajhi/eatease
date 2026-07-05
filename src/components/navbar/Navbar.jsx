import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./nav.css";
import LocationSearch from "../location bar/LocationSearch";

const Navbar = () => {
  const cartItems = useSelector((state) => state.mycart.cart);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
      <Link to="/">
        <div className="logo">EatEase<span className="logo-dot">.</span></div>
      </Link>

      <div className="nav-location">
        <LocationSearch />
      </div>

      <ul className="nav-links">
        <li>
          <NavLink to="/search" className={({ isActive }) => "navlink" + (isActive ? " active" : "")}>
            🔍 Search
          </NavLink>
        </li>
        <li>
          <NavLink to="/" end className={({ isActive }) => "navlink" + (isActive ? " active" : "")}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => "navlink" + (isActive ? " active" : "")}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={({ isActive }) => "navlink" + (isActive ? " active" : "")}>
            Contact
          </NavLink>
        </li>
        {/* <li>
          <NavLink to="/menu" className={({ isActive }) => "navlink" + (isActive ? " active" : "")}>
            Menu
          </NavLink>
        </li> */}
        <li>
          <div className="nav-cart-wrap">
            <NavLink to="/cart" className={({ isActive }) => "navlink" + (isActive ? " active" : "")}>
              🛒 Cart
              {cartItems.length > 0 && (
                <span className="cart-badge">{cartItems.length}</span>
              )}
            </NavLink>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
