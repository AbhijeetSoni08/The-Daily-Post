import React from 'react';
import { Twitter, Instagram, Linkedin, Heart, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className=" bg-gray-100 border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-5xl mx-auto px-4 text-center">
        
        {/* 1. Brand / Logo Area */}
        <div className="mb-6">
          <h2 className="text-3xl font-serif font-bold text-gray-900 tracking-tight">
            The Daily Post
          </h2>
          <p className="text-sm text-gray-500 mt-2 font-light">
            Thoughts, stories, and ideas.
          </p>
        </div>

        {/* 2. Navigation Links */}
        {/* <nav className="mb-8">
          <ul className="flex flex-wrap justify-center gap-8 text-sm font-medium uppercase tracking-wide text-gray-500">
            <li>
              <a href="#" className="hover:text-black transition-colors duration-300 relative group">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition-colors duration-300 relative group">
                Articles
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition-colors duration-300 relative group">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition-colors duration-300 relative group">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          </ul>
        </nav> */}

        {/* 3. Social Icons */}
        <div className="flex justify-center gap-6 mb-10">
          <a href="#" className="p-2 rounded-full bg-gray-50 text-gray-600 hover:bg-black hover:text-white transition-all duration-300">
            <Twitter size={18} />
          </a>
          <a href="#" className="p-2 rounded-full bg-gray-50 text-gray-600 hover:bg-black hover:text-white transition-all duration-300">
            <Instagram size={18} />
          </a>
          <a href="#" className="p-2 rounded-full bg-gray-50 text-gray-600 hover:bg-black hover:text-white transition-all duration-300">
            <Linkedin size={18} />
          </a>
           <a href="#" className="p-2 rounded-full bg-gray-50 text-gray-600 hover:bg-black hover:text-white transition-all duration-300">
            <Mail size={18} />
          </a>
        </div>

        {/* 4. Copyright & Credits */}
        <div className="text-xs text-gray-400 flex flex-col items-center gap-3 border-t border-gray-100 pt-8 w-1/2 mx-auto">
          <p>&copy; {currentYear} The Daily Post. All rights reserved.</p>
          <p className="flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
            Made with <Heart size={10} className="text-red-500 fill-current" /> by Abhijeet
          </p>
        </div>
      </div>
    </footer>
  );
}