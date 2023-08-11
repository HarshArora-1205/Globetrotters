import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth';

const Home = () => {

  const { isAuthenticated, logout } = useAuth();

  return (
    <div className='d-flex text-center text-white bg-dark vh-100'>
      <div className="container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <header className='mb-auto'>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="float-md-start mb-0" style={{ fontFamily: 'Barrio, cursive' }}>
              Globetrotters
            </h3>
            <nav className='nav nav-masthead justify-content-center float-md-end'>
              <Link to={`/`} className="nav-link active" aria-current="page">
                Home
              </Link>
              <Link to={`/escapes`} className="nav-link">
                Escapes
              </Link>

              {
                !isAuthenticated ? (
                  <>
                    <Link to={`/auth/login`} className="nav-link">
                      Login
                    </Link>
                    <Link to={`/auth/register`} className="nav-link">
                      Register
                    </Link>
                  </>
                ) : (
                  <>
                    <button className="nav-link" onClick={logout}>
                      Logout
                    </button>

                  </>
                )
              }
            </nav>
          </div>
        </header>
        <main className="px-3">
          <h1 style={{ fontFamily: 'Barrio, cursive' }}>Globetrotters</h1>
          <p className="lead">
            Welcome to Globetrotters! <br />
            Get information about popular tourist destinations in India. <br />
            Explore different places, view details, create itineraries, and share your experiences.
          </p>
          <Link to={`/escapes`} className="btn btn-lg btn-secondary font-weight-bold">
            View Escapes
          </Link>
        </main>

        <footer className="mt-auto text-white-50">
          <p>&copy; Globetrotters 2023 | All Rights Reserved</p>
        </footer>

        
      </div>
    </div>
  )
}

export default Home