// import './Master.css'
// const Footer = () => {
//     return (
//       <footer className="bg-dark text-white pt-5 pb-3">
//         <div className="container">
//           <div className="row">
  
//             {/* Logo & Description */}
//             <div className="col-md-3">
//               <h3>TaskMaster</h3>
//               <p>Stay organized and boost your productivity with our intuitive task management platform.</p>
//             </div>
  
//             {/* Quick Links */}
//             <div className="col-md-3">
//               <h5>Quick Links</h5>
//               <ul className="list-unstyled">
//                 <li><a href="#" className="text-white text-decoration-none">Dashboard</a></li>
//                 <li><a href="#" className="text-white text-decoration-none">Features</a></li>
                
//                 <li><a href="#" className="text-white text-decoration-none">Support</a></li>
//                 <li><a href="#" className="text-white text-decoration-none">Contact Us</a></li>
//               </ul>
//             </div>
  
//             {/* Contact Info */}
//             <div className="col-md-3">
//               <h5>Contact Us</h5>
//               <p><i className="fas fa-map-marker-alt"></i> Zarqa, JOR</p>
//               <p><i className="fas fa-envelope"></i> support@taskmaster.com</p>
//               <p><i className="fas fa-phone"></i> +1 234 567 890</p>
//             </div>
  
//             {/* Social Media Links */}
//             <div className="col-md-3">
//               <h5>Follow Us</h5>
//               <div className="d-flex gap-3">
//                 <a href="#" className="text-white"><i className="fab fa-facebook fa-2x"></i></a>
//                 <a href="#" className="text-white"><i className="fab fa-twitter fa-2x"></i></a>
//                 <a href="#" className="text-white"><i className="fab fa-linkedin fa-2x"></i></a>
//                 <a href="#" className="text-white"><i className="fab fa-instagram fa-2x"></i></a>
//               </div>
//             </div>
  
//           </div>
//         </div>
//         <div className="text-center mt-4">
//           <p className="mb-0">© {new Date().getFullYear()} TaskMaster. All Rights Reserved.</p>
//         </div>
//       </footer>
//     );
//   };
  
//   export default Footer;
// import React from "react";
// // import { FaTwitter, FaInstagram, FaFacebook, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
// const Footer = () => {
//     return (
//       <div style={{ backgroundColor: "#212529", color: "#ffffff" }}>
//         <footer className="py-5">
//           <div className="row">
//             {/* TaskMaster Info */}
//             <div className="col-md-4 mb-3">
//               <h5>TaskMaster</h5>
//               <p>Boost your productivity and stay on top of your tasks with our powerful task management platform.</p>
//             </div>
  
//             {/* Quick Links */}
//             <div className="col-6 col-md-2 mb-3">
//               <h5>Quick Links</h5>
//               <ul className="nav flex-column">
//                 <li className="nav-item mb-2"><a href="#" className="nav-link p-0" style={{ color: "#ADB5BD" }}>Dashboard</a></li>
//                 <li className="nav-item mb-2"><a href="#" className="nav-link p-0" style={{ color: "#ADB5BD" }}>Features</a></li>
//                 <li className="nav-item mb-2"><a href="#" className="nav-link p-0" style={{ color: "#ADB5BD" }}>Pricing</a></li>
//                 <li className="nav-item mb-2"><a href="#" className="nav-link p-0" style={{ color: "#ADB5BD" }}>Support</a></li>
//               </ul>
//             </div>
  
//             {/* Resources */}
//             <div className="col-6 col-md-2 mb-3">
//               <h5>Resources</h5>
//               <ul className="nav flex-column">
//                 <li className="nav-item mb-2"><a href="#" className="nav-link p-0" style={{ color: "#ADB5BD" }}>Help Center</a></li>
//                 <li className="nav-item mb-2"><a href="#" className="nav-link p-0" style={{ color: "#ADB5BD" }}>Guides</a></li>
//                 <li className="nav-item mb-2"><a href="#" className="nav-link p-0" style={{ color: "#ADB5BD" }}>Blog</a></li>
//                 <li className="nav-item mb-2"><a href="#" className="nav-link p-0" style={{ color: "#ADB5BD" }}>Community</a></li>
//               </ul>
//             </div>
  
//             {/* Contact Us */}
//             <div className="col-md-4 mb-3">
//               <h5>Contact Us</h5>
//               <p><i className="fas fa-envelope"></i> support@taskmaster.com</p>
//               <p><i className="fas fa-phone"></i> +1 234 567 890</p>
//               <p><i className="fas fa-map-marker-alt"></i> New York, USA</p>
//             </div>
//           </div>
  
//           {/* Copyright & Social Media */}
//           <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top" style={{ borderColor: "#495057" }}>
//             <p>&copy; 2024 TaskMaster. All rights reserved.</p>
//             <div className="d-flex gap-3">
//               <a href="#" className="text-white" style={{ opacity: "0.8" }}><i className="fab fa-facebook fa-2x"></i></a>
//               <a href="#" className="text-white" style={{ opacity: "0.8" }}><i className="fab fa-twitter fa-2x"></i></a>
//               <a href="#" className="text-white" style={{ opacity: "0.8" }}><i className="fab fa-linkedin fa-2x"></i></a>
//               <a href="#" className="text-white" style={{ opacity: "0.8" }}><i className="fab fa-instagram fa-2x"></i></a>
//             </div>
//           </div>
//         </footer>
//       </div>
//     );
//   };
  
//   export default Footer;
import React from "react";

const Footer = () => {
  return (
    <div className="bg-gray-900 text-white w-full">
      <footer className="py-10 px-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* TaskMaster Info */}
          <div className="mb-6 p-4 bg-gray-800 rounded-lg shadow-md">
            <h5 className="text-xl font-bold mb-4">TaskMaster</h5>
            <p>
              Boost your productivity and stay on top of your tasks with our
              powerful task management platform.
            </p>
          </div>

          {/* Quick Links */}
          <div className="mb-6 p-4 bg-gray-800 rounded-lg shadow-md">
            <h5 className="text-xl font-bold mb-4">Quick Links</h5>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-all duration-300"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-all duration-300"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-all duration-300"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-all duration-300"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="mb-6 p-4 bg-gray-800 rounded-lg shadow-md">
            <h5 className="text-xl font-bold mb-4">Resources</h5>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-all duration-300"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-all duration-300"
                >
                  Guides
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-all duration-300"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-all duration-300"
                >
                  Community
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="mb-6 p-4 bg-gray-800 rounded-lg shadow-md">
            <h5 className="text-xl font-bold mb-4">Contact Us</h5>
            <p>
              <i className="fas fa-envelope"></i> support@taskmaster.com
            </p>
            <p>
              <i className="fas fa-phone"></i> +1 234 567 890
            </p>
            <p>
              <i className="fas fa-map-marker-alt"></i> New York, USA
            </p>
          </div>
        </div>

        {/* Copyright & Social Media */}
        <div className="flex flex-col sm:flex-row justify-between py-6 border-t border-gray-700 mt-6">
          <p>&copy; 2024 TaskMaster. All rights reserved.</p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-white opacity-80 hover:opacity-100 transition-all duration-300"
            >
              <i className="fab fa-facebook fa-2x"></i>
            </a>
            <a
              href="#"
              className="text-white opacity-80 hover:opacity-100 transition-all duration-300"
            >
              <i className="fab fa-twitter fa-2x"></i>
            </a>
            <a
              href="#"
              className="text-white opacity-80 hover:opacity-100 transition-all duration-300"
            >
              <i className="fab fa-linkedin fa-2x"></i>
            </a>
            <a
              href="#"
              className="text-white opacity-80 hover:opacity-100 transition-all duration-300"
            >
              <i className="fab fa-instagram fa-2x"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
