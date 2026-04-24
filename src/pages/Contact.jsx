import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { submitContact } from '../lib/api';

const Contact = () => {
  const { settings, loading: settingsLoading } = useSettings();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // 1. Save to Database
      await submitContact(formData);

      // 2. Send via Web3Forms (if access key is available)
      const web3FormsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
      if (web3FormsKey) {
        const formPayload = new FormData();
        formPayload.append('access_key', web3FormsKey);
        formPayload.append('name', formData.name);
        formPayload.append('email', formData.email);
        formPayload.append('phone', formData.phone);
        formPayload.append('message', formData.message);
        // Using the dynamic email to ensure it reaches the owner
        formPayload.append('subject', 'Pesan Baru dari Website Bimbel Cerdas');

        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formPayload,
        });
      }

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (settingsLoading) return null;

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen flex flex-col items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">Hubungi Kami</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Kami siap membantu Anda. Jangan ragu untuk menghubungi kami jika ada pertanyaan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 flex items-start space-x-4">
              <div className="bg-primary-50 p-3 rounded-2xl text-primary-600">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">Alamat</h3>
                <p className="text-slate-600 leading-relaxed">
                  Jl. Pendidikan No. 123<br />
                  Kota Pelajar, Indonesia 12345
                </p>
              </div>
            </div>

            {settings.wa_number && (
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 flex items-start space-x-4">
                <div className="bg-primary-50 p-3 rounded-2xl text-primary-600">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2">Telepon / WhatsApp</h3>
                  <p className="text-slate-600 leading-relaxed">+{settings.wa_number}</p>
                </div>
              </div>
            )}

            {settings.email && (
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 flex items-start space-x-4">
                <div className="bg-primary-50 p-3 rounded-2xl text-primary-600">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2">Email</h3>
                  <p className="text-slate-600 leading-relaxed">{settings.email}</p>
                </div>
              </div>
            )}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100">
              {status === 'success' ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-6">
                    <Send size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Pesan Terkirim!</h3>
                  <p className="text-slate-600 mb-8">
                    Terima kasih telah menghubungi kami. Kami akan membalas pesan Anda secepatnya.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="text-primary-600 font-semibold hover:text-primary-700"
                  >
                    Kirim pesan lain
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {status === 'error' && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100">
                      Terjadi kesalahan. Silakan coba lagi nanti.
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Lengkap</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Nomor Telepon</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                      placeholder="08123456789"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Pesan</label>
                    <textarea
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all resize-none"
                      placeholder="Tulis pesan Anda di sini..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className={`w-full py-4 rounded-xl text-white font-bold text-lg transition-all flex items-center justify-center ${
                      status === 'loading'
                        ? 'bg-slate-400 cursor-not-allowed'
                        : 'bg-primary-600 hover:bg-primary-700 hover:shadow-lg'
                    }`}
                  >
                    {status === 'loading' ? 'Mengirim...' : 'Kirim Pesan'}
                    {!status === 'loading' && <Send className="ml-2 h-5 w-5" />}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
