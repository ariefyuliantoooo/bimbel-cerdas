import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import { Link } from 'react-router-dom'

export default function HomePage() {
  const [loading, setLoading] = useState(true)
  const [settings, setSettings] = useState({})
  const [services, setServices] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [team, setTeam] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        
        // Fetch Settings
        const settingsData = await api.getSettings()
        const settingsMap = {}
        settingsData?.forEach(item => {
          settingsMap[item.key] = item.value
        })
        setSettings(settingsMap)

        // Fetch Services
        const servicesData = await api.getServices()
        setServices(servicesData || [])

        // Fetch Testimonials
        const testimonialsData = await api.getTestimonials(3)
        setTestimonials(testimonialsData || [])

        // Fetch Team
        const teamData = await api.getTeam()
        setTeam(teamData || [])

      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={settings.hero_image || 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80'} 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/60"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-white">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight animate-fade-in">
              {settings.hero_title || 'Bimbingan Belajar Berkualitas'}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              {settings.hero_subtitle || 'Bimbel khusus SD, mengaji gratis, dan penyewaan baju adat.'}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/daftar" className="bg-white text-blue-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all transform hover:scale-105 shadow-xl">
                Daftar Sekarang
              </Link>
              <Link to="/sewa-baju" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all">
                Sewa Baju
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Layanan Unggulan</h2>
            <p className="text-lg text-gray-600">
              Kami menyediakan program pendidikan terbaik untuk membantu tumbuh kembang dan kecerdasan anak Anda.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:border-blue-300 hover:shadow-2xl transition-all group">
                <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform inline-block">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing / SPP Section */}
      <section className="py-24 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
              <h2 className="text-4xl font-bold mb-6">Investasi Masa Depan Anak</h2>
              <p className="text-xl text-blue-100 mb-8">
                Dapatkan pendidikan berkualitas dengan biaya yang sangat terjangkau. Biaya SPP sudah termasuk semua fasilitas belajar.
              </p>
              <ul className="space-y-4">
                {['Materi Terpadu', 'Laporan Perkembangan Bulanan', 'Konsultasi Gratis', 'Fasilitas Nyaman'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <svg className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white p-12 rounded-4xl shadow-2xl text-center text-gray-900 transform hover:rotate-2 transition-transform">
              <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4 block">PAKET REGULER</span>
              <div className="flex items-start justify-center gap-1 mb-4">
                <span className="text-2xl font-bold mt-2">Rp</span>
                <span className="text-7xl font-black">{parseInt(settings.spp_price || 100000).toLocaleString('id-ID')}</span>
              </div>
              <p className="text-gray-500 mb-8">per bulan / siswa</p>
              <Link to="/daftar" className="block w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors">
                Daftar Sekarang
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Apa Kata Orang Tua?</h2>
            <p className="text-gray-600">Kepercayaan Anda adalah amanah bagi kami untuk terus memberikan yang terbaik.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testi) => (
              <div key={testi.id} className="bg-white p-8 rounded-3xl shadow-lg relative">
                <div className="text-yellow-400 flex mb-4">
                  {[...Array(testi.rating || 5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6 leading-relaxed">"{testi.message}"</p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold overflow-hidden">
                    {testi.image_url ? <img src={testi.image_url} alt={testi.name} className="w-full h-full object-cover" /> : testi.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testi.name}</h4>
                    <p className="text-sm text-gray-500">{testi.occupation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Tim Pengajar Kami</h2>
            <p className="text-gray-600">Didukung oleh pengajar yang kompeten dan berdedikasi tinggi.</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.id} className="text-center group">
                <div className="relative mb-6 inline-block">
                  <div className="h-48 w-48 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl rotate-3 group-hover:rotate-6 transition-transform absolute inset-0"></div>
                  <div className="h-48 w-48 bg-gray-200 rounded-2xl relative z-10 overflow-hidden">
                    {member.image_url ? (
                      <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl text-gray-400">👤</div>
                    )}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                <p className="text-sm text-gray-500">{member.expertise}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-5xl p-12 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-20 -mr-20 h-64 w-64 bg-white opacity-10 rounded-full"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-64 w-64 bg-white opacity-10 rounded-full"></div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 relative z-10">Siap bergabung dengan Bimbel Cerdas?</h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto relative z-10">
              Daftarkan anak Anda sekarang dan dapatkan pengalaman belajar yang menyenangkan serta bermanfaat.
            </p>
            <Link to="/daftar" className="inline-block bg-white text-blue-700 px-12 py-4 rounded-full font-bold text-xl hover:bg-yellow-400 hover:text-blue-900 transition-all shadow-2xl relative z-10">
              Hubungi Kami Sekarang
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}