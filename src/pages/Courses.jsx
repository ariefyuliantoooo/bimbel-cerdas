import React from 'react';
import { BookOpen, GraduationCap, School, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const programs = [
  {
    title: 'Program SD',
    level: 'Kelas 1-6',
    desc: 'Bimbingan belajar menyeluruh untuk semua mata pelajaran sekolah dasar dengan metode yang menyenangkan.',
    features: ['Matematika Dasar', 'Bahasa Indonesia', 'IPA & IPS', 'Persiapan Ujian Sekolah'],
    icon: <School className="text-blue-500" size={32} />,
    price: 'Mulai Rp 500rb/bln'
  },
  {
    title: 'Program SMP',
    level: 'Kelas 7-9',
    desc: 'Fokus pada penguasaan konsep dasar dan persiapan menghadapi ujian sekolah serta masuk SMA favorit.',
    features: ['Matematika Lanjut', 'Fisika & Biologi', 'Bahasa Inggris', 'Persiapan ASPD/UN'],
    icon: <BookOpen className="text-purple-500" size={32} />,
    price: 'Mulai Rp 750rb/bln'
  },
  {
    title: 'Program SMA',
    level: 'Kelas 10-12',
    desc: 'Persiapan intensif untuk kurikulum sekolah dan seleksi masuk perguruan tinggi negeri (UTBK/SNBT).',
    features: ['Matematika IPA/IPS', 'Fisika & Kimia', 'Ekonomi & Geografi', 'TPA & Literasi'],
    icon: <GraduationCap className="text-orange-500" size={32} />,
    price: 'Mulai Rp 1jt/bln'
  }
];

const Courses = () => {
  return (
    <div className="pt-32 pb-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">Program Belajar Kami</h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Pilih program yang sesuai dengan jenjang pendidikanmu dan mulai perjalanan suksesmu sekarang.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((p, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col h-full"
            >
              <div className="bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                {p.icon}
              </div>
              <div className="mb-6">
                <span className="text-sm font-bold text-primary-600 bg-primary-50 px-3 py-1 rounded-full mb-3 inline-block">
                  {p.level}
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{p.title}</h3>
                <p className="text-slate-600 leading-relaxed">{p.desc}</p>
              </div>
              
              <ul className="space-y-3 mb-8 flex-grow">
                {p.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-slate-700 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="font-bold text-slate-900">{p.price}</span>
                <button className="text-primary-600 font-bold hover:underline">Detail &rarr;</button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Program Card */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-primary-800 rounded-3xl p-8 lg:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-3xl font-bold mb-4">Butuh Program Khusus?</h3>
            <p className="text-primary-100 text-lg">Kami juga melayani kelas privat 1-on-1 dan program persiapan olimpiade.</p>
          </div>
          <button className="bg-white text-primary-700 px-8 py-4 rounded-xl font-bold hover:bg-primary-50 transition-colors shadow-lg">
            Hubungi Konsultan Kami
          </button>
        </div>
      </div>
    </div>
  );
};

export default Courses;
