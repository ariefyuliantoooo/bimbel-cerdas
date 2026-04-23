import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Contact from './pages/Contact';

// Placeholder for About page
const About = () => (
  <div className="pt-32 pb-24 min-h-[60vh] bg-slate-50">
    <div className="max-w-4xl mx-auto px-4 text-center">
      <h1 className="text-5xl font-bold text-slate-900 mb-8">Tentang Kami</h1>
      <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100 text-left space-y-6">
        <p className="text-xl text-slate-600 leading-relaxed">
          <span className="text-primary-600 font-bold">Bimbel Cerdas</span> didirikan dengan satu visi sederhana: membuat pendidikan berkualitas dapat diakses oleh setiap siswa. Kami percaya bahwa setiap anak memiliki potensi unik yang bisa dikembangkan dengan metode yang tepat.
        </p>
        <p className="text-slate-600 leading-relaxed">
          Sejak tahun 2014, kami telah membantu lebih dari 5.000 siswa meraih impian mereka, mulai dari peningkatan nilai rapor hingga lolos seleksi Perguruan Tinggi Negeri favorit.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
          <div className="p-6 bg-primary-50 rounded-2xl border border-primary-100">
            <h4 className="font-bold text-primary-900 text-xl mb-2">Visi Kami</h4>
            <p className="text-primary-700">Menjadi pusat bimbingan belajar nomor satu yang melahirkan generasi cerdas dan berkarakter.</p>
          </div>
          <div className="p-6 bg-secondary-50 rounded-2xl border border-secondary-100">
            <h4 className="font-bold text-secondary-900 text-xl mb-2">Misi Kami</h4>
            <p className="text-secondary-700">Menyediakan pengajar terbaik dan kurikulum inovatif yang adaptif terhadap perubahan zaman.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
