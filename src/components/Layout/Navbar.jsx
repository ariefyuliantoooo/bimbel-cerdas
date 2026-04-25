import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Menu, X, User } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [logo, setLogo] = useState('')
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    
    const fetchLogo = async () => {
      const { data } = await supabase.from('settings').select('value').eq('key', 'logo_image').single()
      if (data?.value) setLogo(data.value)
    }
    fetchLogo()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Sewa Baju', path: '/sewa-baju' },
    { name: 'Pendaftaran', path: '/daftar' },
    { name: 'Kontak', path: '/kontak' },
  ]

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled ? 'bg-white/90 backdrop-blur-xl shadow-lg py-2' : 'bg-white py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              {logo ? (
                <img src={logo} alt="Logo" className="h-12 w-auto object-contain" />
              ) : (
                <div className="h-12 w-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg transform group-hover:rotate-12 transition-transform">
                  B
                </div>
              )}
              <span className="font-black text-2xl text-slate-800 tracking-tighter">Bimbel Cerdas</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`px-6 py-2.5 rounded-2xl font-bold transition-all duration-300 ${
                  location.pathname === link.path 
                    ? 'text-indigo-600 bg-indigo-50 shadow-sm' 
                    : 'text-slate-500 hover:text-indigo-600 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/login" 
              className="ml-4 bg-slate-900 text-white px-7 py-3 rounded-2xl font-black hover:bg-indigo-600 transition-all shadow-xl hover:shadow-indigo-200 transform hover:-translate-y-1 flex items-center gap-2"
            >
              <User size={18} /> Admin
            </Link>
          </div>
          
          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-3 rounded-2xl bg-slate-50 text-slate-600 hover:text-indigo-600 transition-all active:scale-95"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden absolute w-full bg-white shadow-2xl transition-all duration-500 ease-in-out border-t border-slate-50 overflow-hidden ${
        isOpen ? 'max-h-screen opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-10'
      }`}>
        <div className="px-6 pt-6 pb-12 space-y-3">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              onClick={() => setIsOpen(false)}
              className={`block px-6 py-5 rounded-3xl font-black text-lg transition-all ${
                location.pathname === link.path 
                  ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' 
                  : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/login" 
            onClick={() => setIsOpen(false)}
            className="block px-6 py-5 rounded-3xl font-black bg-slate-900 text-white text-center mt-6 shadow-xl"
          >
            Dashboard Admin
          </Link>
        </div>
      </div>
    </nav>
  )
}
