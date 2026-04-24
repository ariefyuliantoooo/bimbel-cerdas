import React, { useState, useEffect } from 'react';
import { getSettings, updateSetting } from '../../../lib/api';

const SettingsTab = () => {
  const [settings, setSettings] = useState({
    wa_number: '',
    email: '',
    facebook_url: '',
    spp_price: '',
    hero_title: '',
    hero_subtitle: '',
    hero_image: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await getSettings();
      setSettings(prev => ({ ...prev, ...data }));
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      for (const [key, value] of Object.entries(settings)) {
        await updateSetting(key, value);
      }
      setMessage('Pengaturan berhasil disimpan!');
    } catch (error) {
      console.error('Error saving settings:', error);
      setMessage('Gagal menyimpan pengaturan.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Pengaturan Umum</h2>
      {message && <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded-lg">{message}</div>}
      
      <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
        <div className="bg-slate-50 p-6 rounded-xl space-y-4">
          <h3 className="font-semibold text-lg border-b pb-2">Kontak & Sosial Media</h3>
          <div>
            <label className="block text-sm font-medium mb-1">Nomor WhatsApp (Contoh: 62812...)</label>
            <input type="text" name="wa_number" value={settings.wa_number || ''} onChange={handleChange} className="w-full p-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email Utama</label>
            <input type="email" name="email" value={settings.email || ''} onChange={handleChange} className="w-full p-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">URL Facebook</label>
            <input type="text" name="facebook_url" value={settings.facebook_url || ''} onChange={handleChange} className="w-full p-2 border rounded-lg" />
          </div>
        </div>

        <div className="bg-slate-50 p-6 rounded-xl space-y-4">
          <h3 className="font-semibold text-lg border-b pb-2">Website Konten</h3>
          <div>
            <label className="block text-sm font-medium mb-1">Biaya SPP Bimbel / Bulan</label>
            <input type="number" name="spp_price" value={settings.spp_price || ''} onChange={handleChange} className="w-full p-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Judul Hero (Beranda)</label>
            <input type="text" name="hero_title" value={settings.hero_title || ''} onChange={handleChange} className="w-full p-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Sub-judul Hero (Beranda)</label>
            <textarea name="hero_subtitle" value={settings.hero_subtitle || ''} onChange={handleChange} className="w-full p-2 border rounded-lg rows-3" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">URL Gambar Hero (Kosongkan jika default)</label>
            <input type="text" name="hero_image" value={settings.hero_image || ''} onChange={handleChange} className="w-full p-2 border rounded-lg" />
          </div>
        </div>

        <button type="submit" disabled={saving} className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700">
          {saving ? 'Menyimpan...' : 'Simpan Pengaturan'}
        </button>
      </form>
    </div>
  );
};

export default SettingsTab;
