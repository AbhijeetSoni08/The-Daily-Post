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
  ];

  const [menuOpen, setMenuOpen] = React.useState(false);

  // Close menu on navigation
  const handleNavClick = () => setMenuOpen(false);

  return (
    <div className="header sticky top-0 z-50 flex justify-between items-center px-8 py-3 bg-white border-b border-gray-200 shadow-sm">
      {/* Logo: Use Link here because we don't need active state styling for the logo */}
      <Logo/>

      {/* Hamburger for mobile */}
      <button
        className="lg:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
        aria-label="Toggle menu"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        <span className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`block h-0.5 w-6 bg-gray-700 my-1 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
        <span className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>

      {/* Desktop nav */}
      <nav className="hidden lg:block">
        <ul className="flex flex-wrap justify-center gap-8 text-base font-medium tracking-wide text-gray-700">
          {navItems.map((item) => (
            item.active && (
              <li key={item.name}>
                <NavLink
                  to={item.slug}
                  className={({ isActive }) =>
                    `pb-1 border-b-2 transition-colors duration-200 ${isActive ? 'border-blue-600 text-blue-700' : 'border-transparent hover:border-gray-400 hover:text-black'}`
                  }
                  onClick={handleNavClick}
                >
                  {item.name}
                </NavLink>
              </li>
            )
          ))}
        </ul>
      </nav>

      {/* Desktop auth buttons */}
      <div className="hidden lg:flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <NavLink
              to="/add-post"
              className="px-4 py-1 text-blue-600 font-semibold border border-blue-600 bg-white hover:bg-blue-50 transition-colors duration-200"
              onClick={handleNavClick}
            >
              + Add Post
            </NavLink>
            <LogoutBTN />
          </>
        ) : (
          <NavLink
            to="/signup"
            className="px-4 py-1 text-blue-600 font-semibold border border-blue-600 bg-white hover:bg-blue-50 transition-colors duration-200"
            onClick={handleNavClick}
          >
            Login & SignUp
          </NavLink>
        )}
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-md flex flex-col items-center py-4 lg:hidden animate-fade-in z-50">
          <ul className="flex flex-col gap-4 w-full items-center text-base font-medium tracking-wide text-gray-700">
            {navItems.map((item) => (
              item.active && (
                <li key={item.name} className="w-full text-center">
                  <NavLink
                    to={item.slug}
                    className={({ isActive }) =>
                      `block w-full pb-1 border-b-2 transition-colors duration-200 ${isActive ? 'border-blue-600 text-blue-700' : 'border-transparent hover:border-gray-400 hover:text-black'}`
                    }
                    onClick={handleNavClick}
                  >
                    {item.name}
                  </NavLink>
                </li>
              )
            ))}
          </ul>
          <div className="flex flex-col gap-2 w-full items-center mt-4">
            {isAuthenticated ? (
              <>
                <NavLink
                  to="/add-post"
                  className="px-4 py-1 text-blue-600 font-semibold border border-blue-600 bg-white hover:bg-blue-50 transition-colors duration-200 w-4/5 text-center"
                  onClick={handleNavClick}
                >
                  + Add Post
                </NavLink>
                <LogoutBTN />
              </>
            ) : (
              <NavLink
                to="/signup"
                className="px-4 py-1 text-blue-600 font-semibold border border-blue-600 bg-white hover:bg-blue-50 transition-colors duration-200 w-4/5 text-center"
                onClick={handleNavClick}
              >
                Login & SignUp
              </NavLink>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Header