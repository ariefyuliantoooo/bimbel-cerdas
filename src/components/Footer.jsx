import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, MapPin, Phone, Mail } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

// Inline SVG icon for Facebook
const FacebookIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const Footer = () => {
  const { settings, loading } = useSettings();

  if (loading) return null;

  return (
    <footer className="bg-slate-900 pt-20 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <div className="bg-primary-500 p-2 rounded-xl">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-2xl text-white tracking-tight">
                Bimbel<span className="text-primary-400">Cerdas</span>
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed mb-6">
              Membangun masa depan gemilang melalui pendidikan berkualitas dan bimbingan terpercaya.
            </p>
            <div className="flex space-x-4">
              {settings.facebook_url && (
                <a
                  href={settings.facebook_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-800 p-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-primary-500 transition-all duration-300"
                >
                  <FacebookIcon size={20} />
                </a>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Layanan Kami</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/courses" className="text-slate-400 hover:text-primary-400 transition-colors">Program Bimbel</Link>
              </li>
              <li>
                <Link to="/rentals" className="text-slate-400 hover:text-primary-400 transition-colors">Sewa Baju Adat & Profesi</Link>
              </li>
              <li>
                <Link to="/registration" className="text-slate-400 hover:text-primary-400 transition-colors">Pendaftaran Siswa</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Tautan Cepat</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-slate-400 hover:text-primary-400 transition-colors">Beranda</Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-primary-400 transition-colors">Hubungi Kami</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Hubungi Kami</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 group">
                <MapPin className="text-primary-400 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" size={20} />
                <span className="text-slate-400 leading-relaxed">
                  Jl. Pendidikan No. 123, Kota Pelajar, Indonesia 12345
                </span>
              </li>
              {settings.wa_number && (
                <li className="flex items-center space-x-3 group">
                  <Phone className="text-primary-400 flex-shrink-0 group-hover:scale-110 transition-transform" size={20} />
                  <span className="text-slate-400">+{settings.wa_number}</span>
                </li>
              )}
              {settings.email && (
                <li className="flex items-center space-x-3 group">
                  <Mail className="text-primary-400 flex-shrink-0 group-hover:scale-110 transition-transform" size={20} />
                  <span className="text-slate-400">{settings.email}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-center">
          <p className="text-slate-500">
            &copy; {new Date().getFullYear()} Bimbel Cerdas. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
