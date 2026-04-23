import React, { useState, useEffect } from 'react';
import { Menu, X, BookOpen, GraduationCap } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Program', path: '/courses' },
    { name: 'Tentang Kami', path: '/about' },
    { name: 'Kontak', path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'py-3 glass border-b' : 'py-5 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary-600 p-2 rounded-lg shadow-lg">
              <GraduationCap className="text-white w-6 h-6" />
            </div>
            <span className={`text-2xl font-bold tracking-tight ${scrolled ? 'text-slate-900' : 'text-slate-900'}`}>
              Bimbel<span className="text-primary-600">Cerdas</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'text-primary-600 font-bold' : ''}`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/contact" className="btn-primary py-2 px-5">
              Daftar Sekarang
            </Link>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-900 focus:outline-none">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full glass border-t animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-3 text-base font-medium text-slate-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center mt-4 btn-primary"
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
