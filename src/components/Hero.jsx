import React from 'react';
import { ArrowRight, Star, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-slate-50">
      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20 pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary-300 blur-[120px]"></div>
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] rounded-full bg-secondary-300 blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block py-1 px-4 rounded-full bg-primary-100 text-primary-700 font-semibold text-sm mb-6 border border-primary-200">
                🚀 #1 Bimbel Terpercaya di Indonesia
              </span>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight mb-6">
                Wujudkan <span className="gradient-text">Impianmu</span> Bersama Kami
              </h1>
              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0">
                Belajar lebih efektif dengan mentor profesional, kurikulum terupdate, dan metode pembelajaran yang menyenangkan. Raih nilai terbaik dan kampus impianmu!
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button className="btn-primary flex items-center gap-2 text-lg">
                  Mulai Belajar <ArrowRight size={20} />
                </button>
                <button className="btn-secondary text-lg">Lihat Program</button>
              </div>

              <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-6">
                {[
                  { text: 'Kurikulum Terbaru', icon: <CheckCircle className="text-primary-500" size={18} /> },
                  { text: 'Mentor Ahli', icon: <CheckCircle className="text-primary-500" size={18} /> },
                  { text: 'Materi Lengkap', icon: <CheckCircle className="text-primary-500" size={18} /> }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-slate-700 font-medium">
                    {item.icon}
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Image */}
          <div className="flex-1 relative">
            <motion.div
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="/images/hero.png" 
                  alt="Students Studying" 
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 hidden sm:flex items-center gap-4 animate-float">
                <div className="bg-yellow-100 p-3 rounded-xl">
                  <Star className="text-yellow-500 fill-yellow-500" size={24} />
                </div>
                <div>
                  <p className="font-bold text-slate-900">4.9/5 Rating</p>
                  <p className="text-xs text-slate-500">Dari 5000+ Siswa</p>
                </div>
              </div>

              <div className="absolute top-10 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 hidden sm:flex items-center gap-4 animate-float" style={{ animationDelay: '1s' }}>
                <div className="bg-green-100 p-3 rounded-xl">
                  <GraduationCap className="text-green-500" size={24} />
                </div>
                <div>
                  <p className="font-bold text-slate-900">100% Lulus</p>
                  <p className="text-xs text-slate-500">PTN Favorit</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
