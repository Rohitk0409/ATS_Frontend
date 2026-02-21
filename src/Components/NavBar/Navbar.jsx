// Navbar.jsx
import { Menu, X } from "lucide-react"; // ← npm install lucide-react
import { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", route: "/", icon: "🏠" },
    { name: "About", route: "/about", icon: "ℹ️" },
    { name: "Feedback", route: "/feedback", icon: "✉️" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-indigo-800 text-white shadow-lg border-b border-indigo-700 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold tracking-tight bg-gradient-to-r from-indigo-300 to-white bg-clip-text text-transparent">
              ResumeMetric
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 lg:gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.route}
                to={item.route}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `group flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${
                    isActive
                      ? "bg-indigo-700 text-white shadow-md"
                      : "text-indigo-100 hover:bg-indigo-700/60 hover:text-white"
                  }`
                }
              >
                <span className="text-lg opacity-90 group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md hover:bg-indigo-700/50 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-7 w-7" />
              ) : (
                <Menu className="h-7 w-7" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Slide down / full width */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pt-2 pb-5 space-y-2 bg-indigo-900/95 border-t border-indigo-700">
          {navItems.map((item) => (
            <NavLink
              key={item.route}
              to={item.route}
              onClick={closeMenu}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors
                ${
                  isActive
                    ? "bg-indigo-700/80 text-white"
                    : "text-indigo-100 hover:bg-indigo-700/60 hover:text-white"
                }`
              }
            >
              <span className="text-2xl opacity-90">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
