import React, { useState } from 'react';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // يمكنك تنفيذ ما تود فعله بالبحث هنا، مثل تصفية المهام أو التوجيه إلى صفحة البحث
    console.log("Searching for:", searchQuery);
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="text-white text-xl font-bold">Task Management</a>

        {/* Menu Links */}
        <div className="hidden md:flex space-x-4">
          <a href="/" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md">Home</a>
          <a href="/tasks" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md">Tasks</a>
          <a href="/about" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md">About</a>
          <a href="/contact" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md">Contact</a>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center space-x-2">
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks..."
              className="px-3 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="bg-blue-700 px-3 py-2 rounded-r-md text-white hover:bg-blue-800">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 18l6-6-6-6" />
              </svg>
            </button>
          </form>
        </div>

        {/* Dropdown for mobile */}
        <div className="md:hidden">
          <button className="text-white" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <ul className="dropdown-menu absolute hidden text-gray-700 pt-1">
            <li><a href="/" className="block px-4 py-2 text-sm text-white bg-blue-600">Home</a></li>
            <li><a href="/tasks" className="block px-4 py-2 text-sm text-white bg-blue-600">Tasks</a></li>
            <li><a href="/about" className="block px-4 py-2 text-sm text-white bg-blue-600">About</a></li>
            <li><a href="/contact" className="block px-4 py-2 text-sm text-white bg-blue-600">Contact</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
