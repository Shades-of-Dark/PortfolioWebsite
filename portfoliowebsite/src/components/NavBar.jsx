import React from 'react';
import { NavLink } from "react-router";
import './NavBar.css';
function Navbar() {
    return (
        <nav>
            <NavLink to="/" end className={({ isActive }) => isActive ? "navLink activeLink" : "navLink"}>
                Vedh Rao
            </NavLink>
            <NavLink
                to="/work"
                className={({ isActive }) => isActive ? "navLink activeLink" : "navLink"}
            >
                Work
            </NavLink>
            <NavLink
                to="/about"
                className={({ isActive }) => isActive ? "navLink activeLink" : "navLink"}
            >
                About
            </NavLink>
            <NavLink
                to="/contact"
                className={({ isActive }) => isActive ? "navLink activeLink" : "navLink"}
            >
                Contact
            </NavLink>
        </nav>
    );
}

export default Navbar;