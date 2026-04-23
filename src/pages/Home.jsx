import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import { ArrowRight, GraduationCap, Laptop, BookOpen } from 'lucide-react';

const Home = () => {
  return (
    <main>
      <Hero />
      
      {/* Short Banner */}
      <section className="py-12 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-white">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                <Laptop size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Tersedia Kelas Online</h3>
                <p className="text-primary-100">Belajar kapan saja dan di mana saja dengan platform interaktif.</p>
              </div>
            </div>
            <button className="bg-white text-primary-600 px-8 py-4 rounded-xl font-bold hover:bg-primary-50 transition-colors shadow-lg">
              Coba Trial Gratis
            </button>
          </div>
        </div>
      </section>

      <Features />

      {/* Program Highlight */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img src="/images/teacher.png" alt="Education" className="rounded-2xl shadow-lg w-full aspect-square object-cover" />
                  <div className="bg-secondary-500 p-6 rounded-2xl text-white">
                    <h4 className="text-3xl font-bold mb-2">10+</h4>
                    <p className="text-secondary-100">Tahun Pengalaman</p>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="bg-primary-500 p-6 rounded-2xl text-white">
                    <h4 className="text-3xl font-bold mb-2">5000+</h4>
                    <p className="text-primary-100">Alumni Sukses</p>
                  </div>
                  <img src="https://images.unsplash.com/photo-1523240715630-9994294d7072?auto=format&fit=crop&q=80&w=600" alt="Learning" className="rounded-2xl shadow-lg w-full aspect-[3/4] object-cover" />
                </div>
              </div>
            </div>
            <div className="flex-1 order-1 lg:order-2">
              <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
                Pendidikan Berkualitas Adalah <br />
                <span className="text-primary-600">Investasi Masa Depan</span>
              </h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                Kami tidak hanya memberikan materi pelajaran, tetapi juga membangun karakter dan kepercayaan diri siswa. Dengan pendampingan intensif, setiap siswa mendapatkan perhatian yang mereka butuhkan.
              </p>
              <div className="space-y-4 mb-10">
                {[
                  'Konsultasi akademik gratis setiap saat',
                  'Laporan perkembangan belajar bulanan',
                  'Grup diskusi interaktif bersama mentor',
                  'Akses materi selamanya melalui aplikasi'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                    </div>
                    <span className="text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <button className="btn-primary">Pelajari Selengkapnya</button>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl">
            {/* Background Decorative */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/20 rounded-full blur-[80px] -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-600/20 rounded-full blur-[80px] -ml-32 -mb-32"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Siap Untuk Sukses?</h2>
              <p className="text-slate-400 text-xl mb-10 max-w-2xl mx-auto">
                Daftarkan dirimu sekarang dan nikmati diskon spesial 20% untuk pendaftaran bulan ini. Kuota terbatas!
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button className="bg-primary-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-primary-700 transition-all shadow-xl shadow-primary-900/20 flex items-center gap-3">
                  Daftar Sekarang <ArrowRight size={20} />
                </button>
                <button className="bg-white/10 text-white border border-white/20 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all backdrop-blur-sm">
                  Hubungi WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
