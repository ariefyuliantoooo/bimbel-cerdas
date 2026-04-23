import React from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Andi Saputra',
    role: 'Siswa SMA 8 Jakarta',
    content: 'Belajar di Bimbel Cerdas sangat seru! Pengajarnya asik dan cara menjelaskannya sangat mudah dipahami. Berkat Bimbel Cerdas, saya berhasil lolos ke ITB.',
    avatar: 'https://i.pravatar.cc/150?u=andi'
  },
  {
    name: 'Siti Aminah',
    role: 'Orang Tua Siswa',
    content: 'Anak saya yang tadinya malas belajar jadi sangat bersemangat setelah bergabung. Nilai raportnya naik signifikan. Sangat recommended!',
    avatar: 'https://i.pravatar.cc/150?u=siti'
  },
  {
    name: 'Rian Hidayat',
    role: 'Siswa SMP 1 Jakarta',
    content: 'Fasilitasnya lengkap dan mentornya sabar banget. Materi yang susah jadi terasa gampang kalau dijelasin sama kakak-kakak di sini.',
    avatar: 'https://i.pravatar.cc/150?u=rian'
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Apa Kata Mereka?</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Ribuan siswa telah membuktikan keunggulan metode belajar kami.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative"
            >
              <Quote className="absolute top-6 right-8 text-primary-100" size={48} />
              <div className="flex gap-1 text-yellow-400 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <p className="text-slate-600 italic mb-8 relative z-10 leading-relaxed">
                "{t.content}"
              </p>
              <div className="flex items-center gap-4">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-primary-100" />
                <div>
                  <h4 className="font-bold text-slate-900">{t.name}</h4>
                  <p className="text-sm text-slate-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
