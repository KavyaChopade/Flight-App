import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg flight-navbar sticky-top">
        <div className="container">
          {/* Brand */}
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <span className="brand-icon">✈</span>
            <span className="brand-name">Flight-App</span>
          </Link>

          {/* Toggle */}
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flightNavbar"
            aria-controls="flightNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          {/* Links */}
          <div className="collapse navbar-collapse" id="flightNavbar">
            <ul className="navbar-nav ms-auto align-items-lg-center gap-1">
              <li className="nav-item">
                <NavLink className="nav-link" to="/add">
                  ＋ Add Flight
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/list">
                  All Flights
                </NavLink>
              </li>

              {/* Search By dropdown */}
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle btn btn-link"
                  id="searchDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ textDecoration: 'none', border: 'none' }}
                >
                  Search By
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="searchDropdown">
                  <li>
                    <Link className="dropdown-item" to="/code">
                      🔍 Code
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/carrier">
                      ✈ Carrier
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/route">
                      📍 Route
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/price">
                      💰 Price Range
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
