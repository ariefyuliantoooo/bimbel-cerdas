import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { getServices } from '../../../lib/api';

const ServicesTab = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'BookOpen', // default icon placeholder
    is_active: true
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await getServices();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleEdit = (service) => {
    setFormData({ title: service.title, description: service.description, icon: service.icon, is_active: service.is_active });
    setCurrentId(service.id);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus layanan ini?')) {
      try {
        await supabase.from('services').delete().eq('id', id);
        loadData();
      } catch (error) {
        console.error('Error deleting:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await supabase.from('services').update(formData).eq('id', currentId);
      } else {
        await supabase.from('services').insert([formData]);
      }
      setFormData({ title: '', description: '', icon: 'BookOpen', is_active: true });
      setIsEditing(false);
      setCurrentId(null);
      loadData();
    } catch (error) {
      console.error('Error saving:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manajemen Layanan Bimbel</h2>
      
      <div className="bg-slate-50 p-6 rounded-xl mb-8">
        <h3 className="font-semibold text-lg mb-4">{isEditing ? 'Edit Layanan' : 'Tambah Layanan Baru'}</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Nama Layanan</label>
            <input type="text" name="title" required value={formData.title} onChange={handleInputChange} className="w-full p-2 border rounded-lg" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Deskripsi Singkat</label>
            <textarea name="description" required value={formData.description} onChange={handleInputChange} className="w-full p-2 border rounded-lg rows-3"></textarea>
          </div>
          <div className="flex items-center space-x-4 md:col-span-2">
            <div className="flex items-center">
              <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleInputChange} className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500" />
              <label className="ml-2 text-sm text-gray-700">Tampilkan Layanan Ini</label>
            </div>
          </div>
          <div className="md:col-span-2 flex space-x-2 mt-2">
            <button type="submit" className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700">
              {isEditing ? 'Simpan Perubahan' : 'Tambah Layanan'}
            </button>
            {isEditing && (
              <button type="button" onClick={() => {setIsEditing(false); setCurrentId(null); setFormData({ title: '', description: '', icon: 'BookOpen', is_active: true });}} className="bg-slate-300 text-slate-800 px-4 py-2 rounded-lg font-medium hover:bg-slate-400">
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">Nama Layanan</th>
              <th className="p-3">Deskripsi</th>
              <th className="p-3">Status</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {services.map(item => (
              <tr key={item.id} className="border-b hover:bg-slate-50">
                <td className="p-3 font-medium">{item.title}</td>
                <td className="p-3 text-sm text-slate-600 max-w-xs truncate">{item.description}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${item.is_active ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-700'}`}>
                    {item.is_active ? 'Aktif' : 'Nonaktif'}
                  </span>
                </td>
                <td className="p-3 space-x-2">
                  <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800 text-sm">Hapus</button>
                </td>
              </tr>
            ))}
            {services.length === 0 && (
              <tr>
                <td colSpan="4" className="p-4 text-center text-slate-500">Belum ada layanan yang ditambahkan.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServicesTab;
