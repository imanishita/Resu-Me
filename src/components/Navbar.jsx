import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/ats-checker", label: "ATS Checker" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  return (
    <nav
      className={`navbar ${isOpen ? "navbar-open" : ""} ${
        scrolled ? "navbar-scrolled" : ""
      }`}
    >
      <div className="navbar-container">
        <div className="navbar-logo">
          <NavLink to="/" onClick={() => setIsOpen(false)}>
            ResuMe
          </NavLink>
          <div className="tagline">Create professional resumes in minutes</div>
        </div>

        {/* Desktop Nav */}
        <div className="navbar-desktop">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              onClick={() => setIsOpen(false)}
            >
              {item.label}
              <span className="underline"></span>
            </NavLink>
          ))}
        </div>

        {/* Mobile menu button */}
        <div className="navbar-mobile-button">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar-mobile-menu ${isOpen ? "open" : ""}`}>
        {navItems.map((item, index) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) =>
              isActive ? "mobile-nav-link active" : "mobile-nav-link"
            }
            onClick={() => setIsOpen(false)}
            style={{
              transitionDelay: `${index * 100}ms`,
              transform: isOpen ? "translateX(0)" : "translateX(50px)",
              opacity: isOpen ? 1 : 0,
            }}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
