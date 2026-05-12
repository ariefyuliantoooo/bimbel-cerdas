import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../lib/api'
import { Phone, Mail, MapPin, Share2, Camera, Video } from 'lucide-react'

export default function Footer() {
  const [settings, setSettings] = useState({})

  useEffect(() => {
    async function fetchSettings() {
      const data = await api.getSettings()
      const settingsMap = {}
      data?.forEach(item => {
        settingsMap[item.key] = item.value
      })
      setSettings(settingsMap)
    }
    fetchSettings()
  }, [])

  return (
    <footer className="bg-slate-900 text-white pt-20 pb-12 overflow-x-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-3">
              <div className="h-12 w-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg shrink-0">B</div>
              <span className="font-black text-2xl tracking-tighter">Bimbel Cerdas</span>
            </Link>
            <p className="text-slate-400 font-medium leading-relaxed text-sm">
              Membangun masa depan anak melalui pendidikan berkualitas, metode belajar menyenangkan, dan pembentukan karakter islami.
            </p>
            <div className="flex space-x-3">
              {[
                { icon: Share2, url: settings.facebook_url },
                { icon: Camera, url: settings.instagram_url },
                { icon: Video, url: settings.youtube_url }
              ].map((social, i) => (
                <a key={i} href={social.url || '#'} target="_blank" rel="noreferrer" className="h-10 w-10 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-indigo-600 transition-all transform hover:-translate-y-1">
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-black mb-6">Tautan Cepat</h3>
            <ul className="space-y-3">
              {['Beranda', 'Sewa Baju', 'Pendaftaran', 'Hubungi Kami', 'Login Admin'].map((item, i) => (
                <li key={i}>
                  <Link
                    to={item === 'Beranda' ? '/' : item === 'Sewa Baju' ? '/sewa-baju' : item === 'Pendaftaran' ? '/daftar' : item === 'Hubungi Kami' ? '/kontak' : '/login'}
                    className="text-slate-400 hover:text-white transition-colors font-bold text-sm flex items-center group"
                  >
                    <span className="h-1.5 w-0 bg-indigo-500 rounded-full group-hover:w-3 transition-all mr-0 group-hover:mr-3"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-black mb-6">Hubungi Kami</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-4 group">
                  <div className="h-11 w-11 bg-slate-800 rounded-2xl flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">WhatsApp</p>
                    <a href={`https://wa.me/${(settings.wa_number || '').replace(/\D/g, '')}`} className="font-bold text-sm hover:text-indigo-400 transition-colors">
                      {settings.wa_number || '+62 85765347621'}
                    </a>
                    {settings.wa_secondary && <p className="text-xs text-slate-500 mt-0.5">{settings.wa_secondary}</p>}
                  </div>
                </div>
                <div className="flex items-start space-x-4 group">
                  <div className="h-11 w-11 bg-slate-800 rounded-2xl flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Email</p>
                    <a href={`mailto:${settings.email || 'cahyantriwulandari87@gmail.com'}`} className="font-bold text-sm hover:text-indigo-400 transition-colors break-all">
                      {settings.email || 'cahyantriwulandari87@gmail.com'}
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-start space-x-4 group">
                <div className="h-11 w-11 bg-slate-800 rounded-2xl flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Alamat</p>
                  <a
                    href={settings.google_maps_url || 'https://maps.app.goo.gl/PvGXkP35g8yUFQ64A?g_st=aw'}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-sm leading-relaxed hover:text-indigo-400 transition-colors"
                  >
                    {settings.address || 'Kavling Bakau serip Blok G 3 RT 04 RW 02 SAMBAU NONGSA BATAM'}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm font-bold">
            &copy; {new Date().getFullYear()} Bimbel Cerdas. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm font-bold text-slate-500">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

