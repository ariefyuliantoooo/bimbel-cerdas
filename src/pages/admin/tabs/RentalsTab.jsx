import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { getRentals } from '../../../lib/api';

const RentalsTab = () => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Baju Adat',
    price: '',
    description: '',
    size: '',
    stock: 1,
    image_url: '',
    is_available: true
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await getRentals();
      setRentals(data);
    } catch (error) {
      console.error('Error fetching rentals:', error);
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

  const handleEdit = (rental) => {
    setFormData(rental);
    setCurrentId(rental.id);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus item ini?')) {
      try {
        await supabase.from('rentals').delete().eq('id', id);
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
        await supabase.from('rentals').update(formData).eq('id', currentId);
      } else {
        await supabase.from('rentals').insert([formData]);
      }
      setFormData({
        name: '', category: 'Baju Adat', price: '', description: '', size: '', stock: 1, image_url: '', is_available: true
      });
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
      <h2 className="text-2xl font-bold mb-6">Manajemen Sewa Baju</h2>
      
      {/* Form Tambah/Edit */}
      <div className="bg-slate-50 p-6 rounded-xl mb-8">
        <h3 className="font-semibold text-lg mb-4">{isEditing ? 'Edit Baju' : 'Tambah Baju Baru'}</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nama Baju</label>
            <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full p-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Kategori</label>
            <select name="category" value={formData.category} onChange={handleInputChange} className="w-full p-2 border rounded-lg">
              <option value="Baju Adat">Baju Adat</option>
              <option value="Baju Profesi">Baju Profesi</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Harga Sewa / Hari</label>
            <input type="number" name="price" required value={formData.price} onChange={handleInputChange} className="w-full p-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Ukuran</label>
            <input type="text" name="size" value={formData.size} onChange={handleInputChange} className="w-full p-2 border rounded-lg placeholder-slate-400" placeholder="S, M, L, XL" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">URL Gambar</label>
            <input type="text" name="image_url" value={formData.image_url} onChange={handleInputChange} className="w-full p-2 border rounded-lg" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Deskripsi Singkat</label>
            <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full p-2 border rounded-lg rows-2"></textarea>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <input type="checkbox" name="is_available" checked={formData.is_available} onChange={handleInputChange} className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500" />
              <label className="ml-2 text-sm text-gray-700">Tersedia untuk disewa</label>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Stok</label>
              <input type="number" name="stock" min="0" value={formData.stock} onChange={handleInputChange} className="w-20 p-1 border rounded-lg" />
            </div>
          </div>
          <div className="md:col-span-2 flex space-x-2 mt-2">
            <button type="submit" className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700">
              {isEditing ? 'Simpan Perubahan' : 'Tambah Baju'}
            </button>
            {isEditing && (
              <button type="button" onClick={() => {setIsEditing(false); setCurrentId(null); setFormData({name: '', category: 'Baju Adat', price: '', description: '', size: '', stock: 1, image_url: '', is_available: true})}} className="bg-slate-300 text-slate-800 px-4 py-2 rounded-lg font-medium hover:bg-slate-400">
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Tabel Data */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">Gambar</th>
              <th className="p-3">Nama Baju</th>
              <th className="p-3">Kategori</th>
              <th className="p-3">Harga</th>
              <th className="p-3">Status</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {rentals.map(item => (
              <tr key={item.id} className="border-b hover:bg-slate-50">
                <td className="p-3">
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.name} className="w-12 h-12 rounded object-cover" />
                  ) : (
                    <div className="w-12 h-12 bg-slate-200 rounded flex items-center justify-center text-xs text-slate-500">No Img</div>
                  )}
                </td>
                <td className="p-3 font-medium">{item.name}</td>
                <td className="p-3">{item.category}</td>
                <td className="p-3">Rp {parseInt(item.price).toLocaleString('id-ID')}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${item.is_available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {item.is_available ? 'Tersedia' : 'Kosong'}
                  </span>
                </td>
                <td className="p-3 space-x-2">
                  <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800 text-sm">Hapus</button>
                </td>
              </tr>
            ))}
            {rentals.length === 0 && (
              <tr>
                <td colSpan="6" className="p-4 text-center text-slate-500">Belum ada data baju.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RentalsTab;
