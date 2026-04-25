import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function ServicesManager() {
  const [services, setServices] = useState([])
  const [form, setForm] = useState({ icon: '📚', title: '', description: '', is_active: true })
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchServices()
  }, [])

  async function fetchServices() {
    const { data } = await supabase.from('services').select('*').order('id')
    if (data) setServices(data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (editingId) {
      await supabase.from('services').update(form).eq('id', editingId)
    } else {
      await supabase.from('services').insert([form])
    }

    setForm({ icon: '📚', title: '', description: '', is_active: true })
    setEditingId(null)
    await fetchServices()
    setLoading(false)
  }

  const handleEdit = (service) => {
    setForm(service)
    setEditingId(service.id)
  }

  const handleDelete = async (id) => {
    if (confirm('Yakin ingin menghapus?')) {
      await supabase.from('services').delete().eq('id', id)
      await fetchServices()
    }
  }

  const toggleActive = async (id, currentStatus) => {
    await supabase.from('services').update({ is_active: !currentStatus }).eq('id', id)
    await fetchServices()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Manajemen Layanan</h1>
      
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Layanan' : 'Tambah Layanan Baru'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Icon (Emoji)</label>
              <input
                type="text"
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Judul Layanan</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Deskripsi</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows="3"
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                className="mr-2"
              />
              <label>Aktif</label>
            </div>
            <div className="flex space-x-2">
              <button type="submit" disabled={loading} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                {loading ? 'Menyimpan...' : (editingId ? 'Update' : 'Simpan')}
              </button>
              {editingId && (
                <button type="button" onClick={() => { setEditingId(null); setForm({ icon: '📚', title: '', description: '', is_active: true }) }} className="bg-gray-300 px-6 py-2 rounded-lg hover:bg-gray-400">
                  Batal
                </button>
              )}
            </div>
          </form>
        </div>
        
        {/* List */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Daftar Layanan</h2>
          <div className="space-y-3">
            {services.map((service) => (
              <div key={service.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-3xl">{service.icon}</span>
                      <h3 className="font-semibold">{service.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded ${service.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {service.is_active ? 'Aktif' : 'Nonaktif'}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">{service.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button onClick={() => handleEdit(service)} className="text-blue-600 hover:text-blue-800">✏️</button>
                    <button onClick={() => handleDelete(service.id)} className="text-red-600 hover:text-red-800">🗑️</button>
                    <button onClick={() => toggleActive(service.id, service.is_active)} className="text-gray-600 hover:text-gray-800">
                      {service.is_active ? '🔴' : '🟢'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {services.length === 0 && <p className="text-gray-500 text-center py-4">Belum ada data layanan</p>}
          </div>
        </div>
      </div>
    </div>
  )
}