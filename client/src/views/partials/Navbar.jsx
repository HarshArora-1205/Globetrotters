import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {

    const { isAuthenticated, logout } = useAuth();


  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
            <Link className="navbar-brand" to={`/`}>Globetrotters</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" aria-current="page" to={`/`}>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={`/escapes`}>Escapes</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={`/escapes/new`}>New Escape</Link>
                    </li>
                </ul>

                <ul className="navbar-nav ms-auto">
                    {
                        !isAuthenticated ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to={`/auth/login`}>Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={`/auth/register`}>Register</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <button className="nav-link" onClick={logout}>Logout</button>
                                </li>
                            </>
                        )
                    }
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Navbar;