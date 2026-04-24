import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { getTeam } from '../../../lib/api';

const TeamTab = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    expertise: '',
    image_url: '',
    is_active: true
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await getTeam();
      setTeam(data);
    } catch (error) {
      console.error('Error fetching team:', error);
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

  const handleEdit = (member) => {
    setFormData(member);
    setCurrentId(member.id);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus anggota tim ini?')) {
      try {
        await supabase.from('team').delete().eq('id', id);
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
        await supabase.from('team').update(formData).eq('id', currentId);
      } else {
        await supabase.from('team').insert([formData]);
      }
      setFormData({ name: '', role: '', expertise: '', image_url: '', is_active: true });
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
      <h2 className="text-2xl font-bold mb-6">Manajemen Tim Pengajar</h2>
      
      <div className="bg-slate-50 p-6 rounded-xl mb-8">
        <h3 className="font-semibold text-lg mb-4">{isEditing ? 'Edit Anggota Tim' : 'Tambah Anggota Tim'}</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
            <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full p-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Jabatan / Posisi</label>
            <input type="text" name="role" required value={formData.role} onChange={handleInputChange} className="w-full p-2 border rounded-lg placeholder-slate-400" placeholder="Misal: Tutor Matematika" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Keahlian (Deskripsi Singkat)</label>
            <textarea name="expertise" value={formData.expertise} onChange={handleInputChange} className="w-full p-2 border rounded-lg rows-2" placeholder="Lulusan Universitas X, Pengalaman 5 tahun..."></textarea>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">URL Foto Profil (Opsional)</label>
            <input type="text" name="image_url" value={formData.image_url} onChange={handleInputChange} className="w-full p-2 border rounded-lg" />
          </div>
          <div className="flex items-center space-x-4 md:col-span-2">
            <div className="flex items-center">
              <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleInputChange} className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500" />
              <label className="ml-2 text-sm text-gray-700">Aktif (Tampilkan di web)</label>
            </div>
          </div>
          <div className="md:col-span-2 flex space-x-2 mt-2">
            <button type="submit" className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700">
              {isEditing ? 'Simpan Perubahan' : 'Tambah Anggota'}
            </button>
            {isEditing && (
              <button type="button" onClick={() => {setIsEditing(false); setCurrentId(null); setFormData({ name: '', role: '', expertise: '', image_url: '', is_active: true });}} className="bg-slate-300 text-slate-800 px-4 py-2 rounded-lg font-medium hover:bg-slate-400">
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map(item => (
          <div key={item.id} className="bg-white border rounded-xl p-4 shadow-sm flex flex-col items-center text-center relative">
            <div className="absolute top-2 right-2 space-x-2">
              <button onClick={() => handleEdit(item)} className="text-blue-500 hover:text-blue-700 text-sm">Edit</button>
              <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700 text-sm">Hapus</button>
            </div>
            
            <div className="w-20 h-20 rounded-full bg-slate-200 overflow-hidden mb-4">
              {item.image_url ? (
                <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">No Img</div>
              )}
            </div>
            <h4 className="font-bold text-lg">{item.name}</h4>
            <p className="text-primary-600 text-sm font-medium mb-2">{item.role}</p>
            <p className="text-slate-500 text-xs line-clamp-2">{item.expertise}</p>
            {!item.is_active && (
              <span className="mt-3 px-2 py-1 bg-slate-100 text-slate-500 text-xs rounded-full">Nonaktif</span>
            )}
          </div>
        ))}
        {team.length === 0 && (
          <div className="col-span-full p-4 text-center text-slate-500">Belum ada anggota tim.</div>
        )}
      </div>
    </div>
  );
};

export default TeamTab;
