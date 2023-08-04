import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h1 className="mb-3">
        Globetrotters Home
      </h1>
      <Link to={`/auth/login`} className="btn btn-primary me-3">
        Login!
      </Link>
      <Link to={`/escapes`} className="btn btn-warning me-3">
        Escapes!
      </Link>
      <Link to={`/auth/register`} className="btn btn-primary">
        Register!
      </Link>
    </div>
  )
}

export default Home