import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function SettingsManager() {
  const [settings, setSettings] = useState({
    wa_number: '',
    wa_secondary: '',
    email: '',
    facebook_url: '',
    instagram_url: '',
    youtube_url: '',
    spp_price: '100000',
    hero_title: '',
    hero_subtitle: '',
    about_text: ''
  })
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  async function fetchSettings() {
    const { data } = await supabase.from('settings').select('key, value')
    if (data) {
      const settingsObj = {}
      data.forEach(item => {
        settingsObj[item.key] = item.value
      })
      setSettings(prev => ({ ...prev, ...settingsObj }))
    }
  }

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSaved(false)

    for (const [key, value] of Object.entries(settings)) {
      await supabase
        .from('settings')
        .update({ value: value.toString(), updated_at: new Date() })
        .eq('key', key)
    }

    setLoading(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Pengaturan Website</h1>
      
      <div className="bg-white rounded-xl shadow-lg p-6">
        {saved && (
          <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-6">
            ✅ Pengaturan berhasil disimpan!
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Nomor WhatsApp Utama</label>
              <input
                type="text"
                name="wa_number"
                value={settings.wa_number}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="6285272123300"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Nomor WhatsApp Cadangan</label>
              <input
                type="text"
                name="wa_secondary"
                value={settings.wa_secondary}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="6285765347621"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="email@example.com"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-semibold mb-2">SPP Bimbel (Rp)</label>
              <input
                type="number"
                name="spp_price"
                value={settings.spp_price}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="100000"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Facebook URL</label>
              <input
                type="url"
                name="facebook_url"
                value={settings.facebook_url}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="https://facebook.com/..."
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Instagram URL</label>
              <input
                type="url"
                name="instagram_url"
                value={settings.instagram_url}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="https://instagram.com/..."
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-semibold mb-2">YouTube URL</label>
              <input
                type="url"
                name="youtube_url"
                value={settings.youtube_url}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="https://youtube.com/..."
              />
            </div>
          </div>
          
          <div className="mt-6">
            <label className="block text-gray-700 font-semibold mb-2">Hero Title</label>
            <input
              type="text"
              name="hero_title"
              value={settings.hero_title}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Bimbingan Belajar Berkualitas untuk Anak Anda"
            />
          </div>
          
          <div className="mt-4">
            <label className="block text-gray-700 font-semibold mb-2">Hero Subtitle</label>
            <textarea
              name="hero_subtitle"
              value={settings.hero_subtitle}
              onChange={handleChange}
              rows="2"
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Bimbel khusus SD, mengaji gratis, dan penyewaan baju adat/profesi"
            />
          </div>
          
          <div className="mt-4">
            <label className="block text-gray-700 font-semibold mb-2">Tentang Kami</label>
            <textarea
              name="about_text"
              value={settings.about_text}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          
          <div className="mt-6">
            <button type="submit" disabled={loading} className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700">
              {loading ? 'Menyimpan...' : 'Simpan Pengaturan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}