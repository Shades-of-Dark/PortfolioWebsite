import React from 'react';
import { NavLink } from "react-router";
import './NavBar.css';
const Navbar = () => {
    return (
        <nav>
            <div className="navBrand">
                <NavLink to="/" end className={({ isActive }) => isActive ? "navLink activeLink" : "navLink"}>
                    <h3>Vedh Rao</h3>
                </NavLink>
            </div>
            <div className="navLinks">
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
            </div>
        </nav>
    );
}

export default Navbar;