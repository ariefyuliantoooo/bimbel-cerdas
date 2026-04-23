import React from 'react';
import { BookOpen, Users, Clock, Award, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Kurikulum Adaptif',
    desc: 'Materi yang disusun sesuai dengan standar pendidikan terbaru dan kebutuhan siswa.',
    icon: <BookOpen size={32} />,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    title: 'Mentor Berpengalaman',
    desc: 'Pengajar profesional lulusan universitas ternama (UI, ITB, UGM) yang ahli di bidangnya.',
    icon: <Users size={32} />,
    color: 'bg-purple-100 text-purple-600'
  },
  {
    title: 'Waktu Fleksibel',
    desc: 'Pilihan jadwal belajar yang bisa disesuaikan dengan aktivitas sekolahmu.',
    icon: <Clock size={32} />,
    color: 'bg-orange-100 text-orange-600'
  },
  {
    title: 'Fasilitas Lengkap',
    desc: 'Ruang belajar nyaman, modul cetak, dan akses ribuan video pembelajaran online.',
    icon: <Award size={32} />,
    color: 'bg-green-100 text-green-600'
  },
  {
    title: 'Jaminan Kualitas',
    desc: 'Metode belajar yang teruji meningkatkan nilai akademis secara signifikan.',
    icon: <ShieldCheck size={32} />,
    color: 'bg-red-100 text-red-600'
  },
  {
    title: 'Tryout Berkala',
    desc: 'Latihan soal dan simulasi ujian nasional/UTBK secara rutin dengan analisis mendalam.',
    icon: <Zap size={32} />,
    color: 'bg-yellow-100 text-yellow-600'
  }
];

const Features = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Mengapa Memilih Bimbel Cerdas?</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Kami memberikan solusi belajar terbaik untuk membantu siswa mencapai potensi maksimal mereka.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              className="p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-16 h-16 rounded-2xl ${f.color} flex items-center justify-center mb-6`}>
                {f.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">{f.title}</h3>
              <p className="text-slate-600 leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
