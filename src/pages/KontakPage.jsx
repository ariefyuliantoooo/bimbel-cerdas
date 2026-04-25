import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Phone, Mail, MapPin, Send, MessageSquare, Clock, ArrowRight } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function KontakPage() {
  const [loading, setLoading] = useState(false)
  const [settings, setSettings] = useState({})
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  useEffect(() => {
    async function fetchSettings() {
      const { data } = await supabase.from('settings').select('*')
      const settingsMap = {}
      data?.forEach(item => {
        settingsMap[item.key] = item.value
      })
      setSettings(settingsMap)
    }
    fetchSettings()
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { error } = await supabase.from('contacts').insert([formData])
      if (error) throw error
      toast.success('Pesan Anda telah terkirim!')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      toast.error('Gagal mengirim pesan: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6">
            <MessageSquare size={14} /> Hubungi Kami
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">Ada Pertanyaan? Kami <span className="text-indigo-600">Siap Membantu</span></h1>
          <p className="text-xl text-slate-600 font-medium leading-relaxed">
            Silakan hubungi kami melalui saluran komunikasi di bawah ini atau kirimkan pesan langsung melalui formulir yang tersedia.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {/* Info Cards */}
          <div className="lg:col-span-1 space-y-8 animate-fade-in">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 group hover:border-indigo-200 transition-all">
              <div className="h-16 w-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-lg shadow-indigo-50">
                <Phone size={28} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">Hubungi Kami</h3>
              <p className="text-slate-500 font-medium mb-6">Tersedia via WhatsApp & Telepon</p>
              <div className="space-y-4">
                <a href={`https://wa.me/${(settings.wa_number || '').replace(/\D/g, '')}`} className="block text-xl font-black text-slate-800 hover:text-indigo-600 transition-colors">
                  {settings.wa_number || '+62 852 7212 3300'}
                </a>
                <p className="text-sm font-bold text-slate-400">{settings.wa_secondary}</p>
              </div>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 group hover:border-indigo-200 transition-all">
              <div className="h-16 w-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-lg shadow-emerald-50">
                <Clock size={28} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">Jam Operasional</h3>
              <p className="text-slate-500 font-medium mb-6">Waktu belajar & pelayanan</p>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-slate-700">
                  <span className="font-bold">Senin - Jumat</span>
                  <span className="font-black">08:00 - 17:00</span>
                </div>
                <div className="flex justify-between items-center text-slate-700">
                  <span className="font-bold">Sabtu</span>
                  <span className="font-black">09:00 - 15:00</span>
                </div>
                <div className="flex justify-between items-center text-rose-500">
                  <span className="font-bold">Minggu</span>
                  <span className="font-black">Libur</span>
                </div>
              </div>
            </div>

            <div className="bg-indigo-600 p-10 rounded-[2.5rem] shadow-2xl shadow-indigo-200 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-black mb-4">Lokasi Kami</h3>
                <p className="font-medium text-indigo-100 mb-8 leading-relaxed">
                  Kavling Bakau serip Blok G 3 RT 04 RW 02 SAMBAU NONGSA BATAM
                </p>
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-xl font-black hover:bg-yellow-400 hover:text-indigo-900 transition-all shadow-xl"
                >
                  <MapPin size={18} /> Petunjuk Arah <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <div className="bg-white p-12 md:p-16 rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100">
              <div className="mb-12">
                <h2 className="text-3xl font-black text-slate-900 mb-4">Kirim Pesan Langsung</h2>
                <p className="text-slate-500 font-medium">Kami akan merespon pesan Anda dalam waktu maksimal 1x24 jam kerja.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white outline-none transition-all font-bold text-slate-700"
                      placeholder="Nama Anda"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                      Alamat Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white outline-none transition-all font-bold text-slate-700"
                      placeholder="email@contoh.com"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    Subjek Pertanyaan
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white outline-none transition-all font-bold text-slate-700"
                    placeholder="Contoh: Info Biaya Pendaftaran"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    Pesan Detail
                  </label>
                  <textarea
                    name="message"
                    required
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white outline-none transition-all font-bold text-slate-700 resize-none"
                    placeholder="Tuliskan pesan atau pertanyaan Anda di sini..."
                  ></textarea>
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
                      <Send size={20} /> Kirim Pesan Sekarang
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-20 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white animate-fade-in">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.043322137357!2d104.108422314753!3d1.1578139991553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMDknMjguMSJOIDEwNMKwMDYnMzAuMyJF!5e0!3m2!1sid!2sid!4v1620000000000!5m2!1sid!2sid" 
            width="100%" 
            height="450" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy"
            title="Lokasi Bimbel Cerdas"
          ></iframe>
        </div>
      </div>
    </div>
  )
}