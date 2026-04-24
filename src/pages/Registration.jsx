import React, { useState } from 'react';
import { submitRegistration } from '../lib/api';
import { useSettings } from '../context/SettingsContext';
import { CheckCircle } from 'lucide-react';

const Registration = () => {
  const { settings } = useSettings();
  const [formData, setFormData] = useState({
    student_name: '',
    parent_name: '',
    phone: '',
    email: '',
    school: '',
    grade: '',
    program: 'Reguler',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await submitRegistration(formData);
      setSuccess(true);
    } catch (err) {
      setError('Terjadi kesalahan saat mengirim pendaftaran. Silakan coba lagi.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="pt-32 pb-24 min-h-[60vh] bg-slate-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-4 text-center">
          <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 flex flex-col items-center">
            <CheckCircle className="text-green-500 w-20 h-20 mb-6" />
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Pendaftaran Berhasil!</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Terima kasih telah mendaftar di Bimbel Cerdas. Tim kami akan segera menghubungi Anda untuk informasi lebih lanjut.
            </p>
            <button
              onClick={() => { setSuccess(false); setFormData({ student_name: '', parent_name: '', phone: '', email: '', school: '', grade: '', program: 'Reguler' }); }}
              className="px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors w-full"
            >
              Daftar Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-[60vh] bg-slate-50">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Pendaftaran Siswa Baru</h1>
          <p className="text-xl text-slate-600">
            Bergabunglah bersama kami dan wujudkan prestasi gemilangmu.
          </p>
          {settings.spp_price && (
            <div className="mt-6 inline-block bg-primary-50 px-6 py-3 rounded-full text-primary-700 font-semibold border border-primary-100">
              Biaya SPP: Rp {parseInt(settings.spp_price).toLocaleString('id-ID')}/bulan
            </div>
          )}
        </div>

        <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-slate-100">
          {error && (
            <div className="mb-8 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Lengkap Siswa</label>
                <input
                  type="text"
                  name="student_name"
                  value={formData.student_name}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                  placeholder="Contoh: Budi Santoso"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Orang Tua/Wali</label>
                <input
                  type="text"
                  name="parent_name"
                  value={formData.parent_name}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                  placeholder="Contoh: Bapak Anton"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Nomor WhatsApp/HP</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                  placeholder="Contoh: 08123456789"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email (Opsional)</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                  placeholder="contoh@email.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Asal Sekolah</label>
                <input
                  type="text"
                  name="school"
                  value={formData.school}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                  placeholder="Contoh: SD Negeri 1"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Kelas</label>
                <input
                  type="text"
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                  placeholder="Contoh: 6 SD"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Pilihan Program</label>
              <select
                name="program"
                value={formData.program}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
              >
                <option value="Reguler">Reguler</option>
                <option value="Intensif UN">Intensif UN</option>
                <option value="Persiapan PTN">Persiapan PTN</option>
                <option value="Private">Private</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl text-white font-bold text-lg transition-all ${
                loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700 hover:shadow-lg'
              }`}
            >
              {loading ? 'Mengirim Data...' : 'Kirim Pendaftaran'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
