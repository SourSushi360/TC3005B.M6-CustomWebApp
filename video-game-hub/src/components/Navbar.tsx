// src/components/Navbar.tsx
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';

export const Navbar = () => {
    return (
	<nav className="navbar">
	    <div className="container">
	        <div className="navbar-brand">
		    <Link to="/">Logo</Link>
		</div>
		<div className={"nav-links"}>
		    <NavLink to="/">Dashboard</NavLink>
		</div>
	    </div>
	</nav>
    );
};
