import { useState } from 'react'
import { api } from '../lib/api'
import { CheckCircle2, Send, Phone, User, Mail, School, GraduationCap, BookOpen, Sparkles } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function DaftarPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    student_name: '',
    parent_name: '',
    phone: '',
    email: '',
    school: '',
    grade: '',
    program: 'Bimbel SD Reguler'
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.createRegistration(formData)
      setSuccess(true)
      toast.success('Pendaftaran berhasil terkirim!')
      setFormData({
        student_name: '',
        parent_name: '',
        phone: '',
        email: '',
        school: '',
        grade: '',
        program: 'Bimbel SD Reguler'
      })
    } catch (error) {
      toast.error('Gagal mendaftar: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="bg-white p-12 md:p-20 rounded-[3rem] shadow-2xl shadow-indigo-100 text-center max-w-2xl w-full border border-slate-100 animate-fade-in">
          <div className="h-24 w-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-4xl font-black text-slate-900 mb-6">Pendaftaran Berhasil!</h2>
          <p className="text-xl text-slate-600 mb-12 leading-relaxed">
            Terima kasih telah mempercayakan pendidikan putra/putri Anda kepada <span className="font-black text-indigo-600">Bimbel Cerdas</span>. Tim kami akan segera menghubungi Anda melalui WhatsApp untuk proses verifikasi selanjutnya.
          </p>
          <button 
            onClick={() => setSuccess(false)}
            className="bg-indigo-600 text-white px-12 py-5 rounded-2xl font-black hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 transform hover:-translate-y-1 active:scale-95"
          >
            Daftar Siswa Lain
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 overflow-hidden flex flex-col lg:flex-row border border-slate-100">
          {/* Info Side */}
          <div className="lg:w-2/5 bg-slate-900 p-12 md:p-16 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 opacity-20 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600 opacity-20 rounded-full -ml-32 -mb-32 blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-8 border border-indigo-500/30">
                <Sparkles size={14} /> Admission Open 2024
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">Wujudkan Masa Depan <span className="text-indigo-400">Cemerlang</span></h2>
              <p className="text-slate-400 font-medium text-lg mb-12 leading-relaxed">
                Bergabunglah dengan komunitas belajar kami dan rasakan pengalaman belajar yang berbeda, interaktif, dan penuh motivasi.
              </p>
              
              <div className="space-y-8">
                {[
                  { icon: BookOpen, title: 'Materi Terstruktur', desc: 'Kurikulum menyesuaikan sekolah' },
                  { icon: GraduationCap, title: 'Pengajar Profesional', desc: 'Lulusan universitas ternama' },
                  { icon: CheckCircle2, title: 'Hasil Terjamin', desc: 'Peningkatan nilai yang signifikan' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 group">
                    <div className="h-14 w-14 bg-slate-800 rounded-2xl flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-xl">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-black text-lg">{item.title}</h4>
                      <p className="text-slate-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-20 pt-10 border-t border-slate-800 relative z-10">
              <p className="text-sm font-bold text-slate-500 mb-2 uppercase tracking-widest">Bantuan Pendaftaran?</p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center">
                  <Phone size={18} />
                </div>
                <p className="text-xl font-black text-white">+62 852 7212 3300</p>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:w-3/5 p-12 md:p-20">
            <div className="mb-12">
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Formulir Siswa Baru</h1>
              <p className="text-slate-500 font-medium">Lengkapi data di bawah ini untuk memulai perjalanan belajar Anda.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <User size={14} /> Nama Lengkap Siswa
                  </label>
                  <input
                    type="text"
                    name="student_name"
                    required
                    value={formData.student_name}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white outline-none transition-all font-bold text-slate-700"
                    placeholder="Contoh: Ahmad Fauzi"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <User size={14} /> Nama Orang Tua
                  </label>
                  <input
                    type="text"
                    name="parent_name"
                    required
                    value={formData.parent_name}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white outline-none transition-all font-bold text-slate-700"
                    placeholder="Nama Ayah/Ibu"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <Phone size={14} /> Nomor WhatsApp
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white outline-none transition-all font-bold text-slate-700"
                    placeholder="0812xxxx"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <Mail size={14} /> Email (Opsional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white outline-none transition-all font-bold text-slate-700"
                    placeholder="email@contoh.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <School size={14} /> Asal Sekolah
                  </label>
                  <input
                    type="text"
                    name="school"
                    value={formData.school}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white outline-none transition-all font-bold text-slate-700"
                    placeholder="Nama Sekolah"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <GraduationCap size={14} /> Kelas
                  </label>
                  <select
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white outline-none transition-all font-black text-slate-700 appearance-none"
                  >
                    <option value="">Pilih Kelas</option>
                    {[1,2,3,4,5,6].map(n => <option key={n} value={n}>Kelas {n} SD</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <BookOpen size={14} /> Program Pilihan
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['Bimbel SD Reguler', 'Mengaji Gratis', 'Bimbel + Mengaji'].map((prog) => (
                    <label 
                      key={prog} 
                      className={`cursor-pointer p-4 rounded-2xl border-2 transition-all flex items-center justify-center text-center font-bold text-sm ${
                        formData.program === prog 
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-md shadow-indigo-100' 
                          : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="program" 
                        value={prog} 
                        checked={formData.program === prog}
                        onChange={handleChange}
                        className="hidden"
                      />
                      {prog}
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-5 rounded-2xl font-black text-white text-xl transition-all shadow-2xl flex items-center justify-center gap-4 active:scale-95 ${
                  loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100 transform hover:-translate-y-1'
                }`}
              >
                {loading ? (
                  <div className="h-6 w-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Send size={20} /> Kirim Pendaftaran
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}