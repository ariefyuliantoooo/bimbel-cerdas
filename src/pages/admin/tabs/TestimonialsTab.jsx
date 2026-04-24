import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { getTestimonials } from '../../../lib/api';

const TestimonialsTab = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    occupation: '',
    message: '',
    rating: 5,
    image_url: '',
    is_approved: false
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await getTestimonials(); // Get all including not approved
      setTestimonials(data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
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

  const handleEdit = (testi) => {
    setFormData(testi);
    setCurrentId(testi.id);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus testimoni ini?')) {
      try {
        await supabase.from('testimonials').delete().eq('id', id);
        loadData();
      } catch (error) {
        console.error('Error deleting:', error);
      }
    }
  };

  const handleApproveToggle = async (id, currentStatus) => {
    try {
      await supabase.from('testimonials').update({ is_approved: !currentStatus }).eq('id', id);
      loadData();
    } catch (error) {
      console.error('Error toggling approval:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await supabase.from('testimonials').update(formData).eq('id', currentId);
      } else {
        await supabase.from('testimonials').insert([formData]);
      }
      setFormData({ name: '', occupation: '', message: '', rating: 5, image_url: '', is_approved: false });
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
      <h2 className="text-2xl font-bold mb-6">Manajemen Testimoni</h2>
      
      <div className="bg-slate-50 p-6 rounded-xl mb-8">
        <h3 className="font-semibold text-lg mb-4">{isEditing ? 'Edit Testimoni' : 'Tambah Testimoni (Manual)'}</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nama Pembuat</label>
            <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full p-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Pekerjaan/Status (Misal: Siswa SMA)</label>
            <input type="text" name="occupation" value={formData.occupation} onChange={handleInputChange} className="w-full p-2 border rounded-lg" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Pesan Testimoni</label>
            <textarea name="message" required value={formData.message} onChange={handleInputChange} className="w-full p-2 border rounded-lg rows-3"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">URL Foto Profil (Opsional)</label>
            <input type="text" name="image_url" value={formData.image_url} onChange={handleInputChange} className="w-full p-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Rating (1-5)</label>
            <input type="number" min="1" max="5" name="rating" required value={formData.rating} onChange={handleInputChange} className="w-full p-2 border rounded-lg" />
          </div>
          <div className="flex items-center space-x-4 md:col-span-2">
            <div className="flex items-center">
              <input type="checkbox" name="is_approved" checked={formData.is_approved} onChange={handleInputChange} className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500" />
              <label className="ml-2 text-sm text-gray-700">Setujui untuk ditampilkan di web</label>
            </div>
          </div>
          <div className="md:col-span-2 flex space-x-2 mt-2">
            <button type="submit" className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700">
              {isEditing ? 'Simpan Perubahan' : 'Tambah Testimoni'}
            </button>
            {isEditing && (
              <button type="button" onClick={() => {setIsEditing(false); setCurrentId(null); setFormData({ name: '', occupation: '', message: '', rating: 5, image_url: '', is_approved: false });}} className="bg-slate-300 text-slate-800 px-4 py-2 rounded-lg font-medium hover:bg-slate-400">
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
              <th className="p-3">Pengirim</th>
              <th className="p-3">Pesan</th>
              <th className="p-3">Rating</th>
              <th className="p-3">Status Tampil</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map(item => (
              <tr key={item.id} className="border-b hover:bg-slate-50">
                <td className="p-3">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-slate-500">{item.occupation}</div>
                </td>
                <td className="p-3 text-sm text-slate-600 max-w-xs truncate">{item.message}</td>
                <td className="p-3">{item.rating}/5</td>
                <td className="p-3">
                  <button onClick={() => handleApproveToggle(item.id, item.is_approved)} className={`px-2 py-1 rounded-full text-xs font-semibold ${item.is_approved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {item.is_approved ? 'Ditampilkan' : 'Sembunyikan'}
                  </button>
                </td>
                <td className="p-3 space-x-2">
                  <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800 text-sm">Hapus</button>
                </td>
              </tr>
            ))}
            {testimonials.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-slate-500">Belum ada testimoni.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestimonialsTab;
