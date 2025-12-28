import React from 'react'
import { NavLink, Link } from 'react-router-dom' // Import Link and NavLink
import LogoutBTN from './LogoutBTN'
import { useSelector } from 'react-redux'
import {Logo} from '../index.js'

function Header() {
  const isAuthenticated = useSelector((state) => state.auth.status );
  const navItems = [
    { name: "Home", slug: "/" , active : true},
    { name: "Articles", slug: "/all-posts", active : true },
    { name: "About", slug: "/about" , active : true },
    { name: "Contact", slug: "/contact" , active : isAuthenticated }
  ]

  

  return (
    <div className="header sticky top-0 z-50 flex justify-between items-center px-8 py-3 bg-white border-b border-gray-200 shadow-sm">
      
      {/* Logo: Use Link here because we don't need active state styling for the logo */}
      <Logo/>

      <nav>
        <ul className="flex flex-wrap justify-center gap-8 text-base font-medium tracking-wide text-gray-700">
          {navItems.map((item) => (
            item.active && (
              <li key={item.name}>
                <NavLink
                  to={item.slug}
                  className={({ isActive }) =>
                    `pb-1 border-b-2 transition-colors duration-200 ${isActive ? 'border-blue-600 text-blue-700' : 'border-transparent hover:border-gray-400 hover:text-black'}`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            )
          ))}
        </ul>
      </nav>

      {isAuthenticated ? (
        <div className="flex items-center gap-4">
          <NavLink
            to="/add-post"
            className="px-4 py-1 text-blue-600 font-semibold border border-blue-600 bg-white hover:bg-blue-50 transition-colors duration-200"
          >
            + Add Post
          </NavLink>
          <LogoutBTN />
        </div>
      ) : (
        <NavLink
          to="/signup"
          className="px-4 py-1 text-blue-600 font-semibold border border-blue-600 bg-white hover:bg-blue-50 transition-colors duration-200"
        >
          Login & SignUp
        </NavLink>
      )}
    </div>
  )
}

export default Header