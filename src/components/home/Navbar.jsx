
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { auth, database, ref, get } from "../../firebase";

// const Navbar = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [userName, setUserName] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserName = async () => {
//       const user = auth.currentUser;
//       if (user) {
//         const userRef = ref(database, `users/${user.uid}/name`);
//         const snapshot = await get(userRef);
//         if (snapshot.exists()) {
//           setUserName(snapshot.val());
//         }
//       }
//     };
//     fetchUserName();
//   }, []);

//   const handleNavigation = (path) => {
//     if (userName) {
//       alert(`Welcome, ${userName}! Hope you have a great experience.`);
//     }
//     navigate(path);
//   };

//   return (
//     <nav className="bg-blue-600 p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         {/* Logo */}
//         <button onClick={() => handleNavigation("/")} className="text-white text-xl font-bold">
//           Task Management
//         </button>


//         {/* Menu Links */}
//         <div className="hidden md:flex space-x-4">
//           <button onClick={() => handleNavigation("/")} className="text-white hover:bg-blue-700 px-3 py-2 rounded-md">
//             Home
//           </button>
//           <button onClick={() => handleNavigation("/tasks")} className="text-white hover:bg-blue-700 px-3 py-2 rounded-md">
//             Tasks
//           </button>
//           <button onClick={() => handleNavigation("/about")} className="text-white hover:bg-blue-700 px-3 py-2 rounded-md">
//             About
//           </button>
//           <button onClick={() => handleNavigation("/contact")} className="text-white hover:bg-blue-700 px-3 py-2 rounded-md">
//             Contact
//           </button>
//         </div>

//         {/* Search Bar */}
//         <div className="hidden md:flex items-center space-x-2">
//           <form
//             onSubmit={(e) => {
//               e.preventDefault();
//               console.log("Searching for:", searchQuery);
//             }}
//             className="flex items-center"
//           >
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search tasks..."
//               className="px-3 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <button type="submit" className="bg-blue-700 px-3 py-2 rounded-r-md text-white hover:bg-blue-800">
//               🔍
//             </button>
//           </form>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState } from "react";
import { Menu, X, Search } from "lucide-react";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isHovered, setIsHovered] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const handleNavigation = (path) => {
    console.log(`Navigating to: ${path}`);
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/tasks", label: "Tasks" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" }
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 shadow-lg relative">
      <div className="container mx-auto">
        {/* Top Bar */}
        <div className="flex justify-between items-center">
          {/* Logo */}
          <button 
            onClick={() => handleNavigation("/")} 
            className="group relative text-white text-2xl font-bold tracking-wider transform transition-all duration-300 hover:scale-105"
          >
            <span className="inline-block transform transition-transform group-hover:scale-110">
              Manage
            </span>
            <span className="inline-block ml-2 text-blue-200 transform transition-transform group-hover:scale-110">
            Mate
            </span>
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></div>
          </button>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-6">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNavigation(link.path)}
                onMouseEnter={() => setIsHovered(link.path)}
                onMouseLeave={() => setIsHovered("")}
                className="relative text-white py-2 px-4 rounded-md transition-all duration-300 hover:bg-blue-700/50"
              >
                <span className="relative z-10">{link.label}</span>
                <div
                  className={`absolute inset-0 bg-blue-500/20 rounded-md transform transition-transform duration-300 ${
                    isHovered === link.path ? "scale-100" : "scale-0"
                  }`}
                ></div>
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transform -translate-x-1/2 transition-all duration-300 group-hover:w-full"></div>
              </button>
            ))}
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex items-center space-x-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log("Searching for:", searchQuery);
              }}
              className="flex items-center group"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tasks..."
                className="w-48 px-4 py-2 rounded-l-md border border-transparent bg-blue-700/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-blue-800/40 transition-all duration-300"
              />
              <button 
                type="submit" 
                className="bg-blue-700 px-4 py-2 rounded-r-md text-white transition-all duration-300 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white p-2 hover:bg-blue-700/50 rounded-md transition-colors duration-300"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden absolute left-0 right-0 top-full bg-blue-800 shadow-lg transition-all duration-300 transform ${
            isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0 pointer-events-none'
          }`}
        >
          <div className="p-4 space-y-4">
            {/* Mobile Navigation Links */}
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => handleNavigation(link.path)}
                  className="text-white py-2 px-4 rounded-md hover:bg-blue-700/50 transition-colors duration-300 text-left"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Mobile Search Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log("Searching for:", searchQuery);
              }}
              className="flex items-center"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tasks..."
                className="flex-1 px-4 py-2 rounded-l-md border border-transparent bg-blue-700/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button 
                type="submit" 
                className="bg-blue-700 px-4 py-2 rounded-r-md text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;