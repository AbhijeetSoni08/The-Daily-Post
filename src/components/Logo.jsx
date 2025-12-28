import React from 'react'
import { Link } from 'react-router-dom'

function Logo({width = '100px'}) {
  return (
    <div><Link to="/" className="logo font-serif font-bold text-xl cursor-pointer">
        The Daily Post
      </Link></div>
  )
}

export default Logo