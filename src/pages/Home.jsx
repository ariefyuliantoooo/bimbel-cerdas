import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { getServices, getTestimonials, getTeam } from '../lib/api';

const Home = () => {
  const { settings, loading: settingsLoading } = useSettings();
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesData, testimonialsData, teamData] = await Promise.all([
          getServices(true),
          getTestimonials(true),
          getTeam(true)
        ]);
        setServices(servicesData);
        setTestimonials(testimonialsData);
        setTeam(teamData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (settingsLoading || loading) {
    return <div className="pt-32 pb-24 min-h-screen text-center text-xl">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-white -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
                {settings.hero_title || 'Raih Prestasi Terbaik Bersama Bimbel Cerdas'}
              </h1>
              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {settings.hero_subtitle || 'Metode pembelajaran inovatif dan tutor berpengalaman untuk mengoptimalkan potensi akademismu.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/registration"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full text-white bg-primary-600 hover:bg-primary-700 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary-500/30"
                >
                  Daftar Sekarang
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/courses"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full text-slate-700 bg-white border-2 border-slate-200 hover:border-primary-500 hover:text-primary-600 transition-all duration-300"
                >
                  Lihat Program
                </Link>
              </div>
            </div>
            <div className="relative hidden lg:block">
              {settings.hero_image ? (
                <img src={settings.hero_image} alt="Hero" className="w-full h-auto rounded-3xl shadow-2xl object-cover aspect-square" />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-100 to-primary-50 rounded-[3rem] transform rotate-3 scale-105" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Layanan Unggulan Kami</h2>
            <p className="text-xl text-slate-600">Solusi belajar lengkap untuk setiap jenjang pendidikan.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={service.id || index} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:bg-white transition-all duration-300 group">
                <div className="w-14 h-14 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Star className="w-8 h-8" /> {/* Placeholder icon, could use lucide dynamic icon mapping */}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Pengajar Profesional Kami</h2>
            <p className="text-xl text-slate-600">Belajar bersama para ahli di bidangnya.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all text-center">
                <div className="h-48 overflow-hidden bg-slate-200">
                  {member.image_url ? (
                    <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">No Photo</div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
                  <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-slate-500">{member.expertise}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Apa Kata Mereka?</h2>
            <p className="text-xl text-slate-600">Kisah sukses siswa-siswi yang telah belajar bersama kami.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testi) => (
              <div key={testi.id} className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
                <div className="flex items-center space-x-1 mb-6 text-yellow-400">
                  {[...Array(testi.rating || 5)].map((_, i) => (
                    <Star key={i} className="fill-current w-5 h-5" />
                  ))}
                </div>
                <p className="text-slate-600 mb-6 italic">"{testi.message}"</p>
                <div className="flex items-center space-x-4">
                  {testi.image_url ? (
                    <img src={testi.image_url} alt={testi.name} className="w-12 h-12 rounded-full object-cover" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
                      {testi.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold text-slate-900">{testi.name}</h4>
                    <p className="text-sm text-slate-500">{testi.occupation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
