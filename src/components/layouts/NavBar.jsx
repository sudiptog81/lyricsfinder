import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark mb-5">
    <Link to="/" className="navbar-brand mb-0 h1 mx-auto">
        <i className="fas fa-music" />
        &nbsp;&nbsp;LyricsFinder <i className="fas fa-music" />
      </Link>
    </nav>
  );
};

export default NavBar;
