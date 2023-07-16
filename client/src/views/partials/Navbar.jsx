import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
            <a className="navbar-brand" href="/">Globetrotters</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" aria-current="page" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/escapes">Escapes</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/escapes/new">New Escape</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Navbar;