import React from 'react';
import { GraduationCap, Globe, MessageCircle, Send, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-primary-600 p-2 rounded-lg">
                <GraduationCap className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Bimbel<span className="text-primary-400">Cerdas</span>
              </span>
            </Link>
            <p className="text-slate-400">
              Pusat bimbingan belajar terbaik untuk SD, SMP, dan SMA. Membantu generasi muda meraih masa depan cerah melalui pendidikan berkualitas.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-primary-600 transition-colors">
                <Globe size={20} />
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-primary-600 transition-colors">
                <MessageCircle size={20} />
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-primary-600 transition-colors">
                <Send size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Menu Utama</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="hover:text-primary-400 transition-colors">Beranda</Link></li>
              <li><Link to="/courses" className="hover:text-primary-400 transition-colors">Program Belajar</Link></li>
              <li><Link to="/about" className="hover:text-primary-400 transition-colors">Tentang Kami</Link></li>
              <li><Link to="/contact" className="hover:text-primary-400 transition-colors">Hubungi Kami</Link></li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Program Kami</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-primary-400 transition-colors">SD (Kelas 1-6)</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">SMP (Kelas 7-9)</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">SMA (Kelas 10-12)</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Persiapan UTBK</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Hubungi Kami</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-primary-400 shrink-0" size={20} />
                <span>Jl. Pendidikan No. 123, Jakarta Selatan, Indonesia</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-primary-400 shrink-0" size={20} />
                <span>+62 812 3456 7890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-primary-400 shrink-0" size={20} />
                <span>info@bimbelcerdas.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Bimbel Cerdas. Seluruh hak cipta dilindungi.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
