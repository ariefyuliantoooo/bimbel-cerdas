import React, { useState, useEffect } from 'react';
import { getRegistrations } from '../../../lib/api';
import { supabase } from '../../../lib/supabase';

const RegistrationsTab = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await getRegistrations();
      setRegistrations(data);
    } catch (error) {
      console.error('Error fetching registrations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await supabase.from('registrations').update({ status }).eq('id', id);
      loadData();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus data ini?')) {
      try {
        await supabase.from('registrations').delete().eq('id', id);
        loadData();
      } catch (error) {
        console.error('Error deleting:', error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Data Pendaftaran Siswa</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">Tanggal</th>
              <th className="p-3">Nama Siswa</th>
              <th className="p-3">Kontak (WA)</th>
              <th className="p-3">Sekolah & Kelas</th>
              <th className="p-3">Program</th>
              <th className="p-3">Status</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map(reg => (
              <tr key={reg.id} className="border-b hover:bg-slate-50">
                <td className="p-3">{new Date(reg.created_at).toLocaleDateString('id-ID')}</td>
                <td className="p-3">
                  <div className="font-medium">{reg.student_name}</div>
                  <div className="text-sm text-slate-500">Ortu: {reg.parent_name}</div>
                </td>
                <td className="p-3">{reg.phone}</td>
                <td className="p-3">
                  <div>{reg.school}</div>
                  <div className="text-sm text-slate-500">{reg.grade}</div>
                </td>
                <td className="p-3">{reg.program}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    reg.status === 'approved' ? 'bg-green-100 text-green-700' : 
                    reg.status === 'rejected' ? 'bg-red-100 text-red-700' : 
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {reg.status.toUpperCase()}
                  </span>
                </td>
                <td className="p-3 space-x-2">
                  <button onClick={() => handleUpdateStatus(reg.id, 'approved')} className="text-green-600 hover:text-green-800 text-sm">Approve</button>
                  <button onClick={() => handleUpdateStatus(reg.id, 'rejected')} className="text-yellow-600 hover:text-yellow-800 text-sm">Reject</button>
                  <button onClick={() => handleDelete(reg.id)} className="text-red-600 hover:text-red-800 text-sm">Hapus</button>
                </td>
              </tr>
            ))}
            {registrations.length === 0 && (
              <tr>
                <td colSpan="7" className="p-4 text-center text-slate-500">Belum ada data pendaftaran.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegistrationsTab;
