import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { getContacts } from '../../../lib/api';
import { Mail, Phone, Calendar, Trash2 } from 'lucide-react';

const ContactsTab = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await getContacts();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id, currentStatus) => {
    try {
      await supabase.from('contacts').update({ is_read: !currentStatus }).eq('id', id);
      loadData();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus pesan ini permanen?')) {
      try {
        await supabase.from('contacts').delete().eq('id', id);
        loadData();
      } catch (error) {
        console.error('Error deleting:', error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Pesan Masuk (Kontak)</h2>
      
      <div className="space-y-4">
        {contacts.map(msg => (
          <div key={msg.id} className={`p-6 rounded-xl border transition-all ${msg.is_read ? 'bg-slate-50 border-slate-200' : 'bg-white border-primary-200 shadow-sm'}`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg flex items-center gap-2">
                  {msg.name}
                  {!msg.is_read && <span className="w-2 h-2 rounded-full bg-primary-500"></span>}
                </h3>
                <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-600">
                  <div className="flex items-center gap-1">
                    <Mail size={14} />
                    <a href={`mailto:${msg.email}`} className="hover:text-primary-600">{msg.email}</a>
                  </div>
                  {msg.phone && (
                    <div className="flex items-center gap-1">
                      <Phone size={14} />
                      <a href={`tel:${msg.phone}`} className="hover:text-primary-600">{msg.phone}</a>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{new Date(msg.created_at).toLocaleString('id-ID')}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleMarkAsRead(msg.id, msg.is_read)}
                  className={`px-3 py-1 text-sm rounded-md border transition-colors ${msg.is_read ? 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100' : 'bg-primary-50 text-primary-700 border-primary-200 hover:bg-primary-100'}`}
                >
                  {msg.is_read ? 'Tandai Belum Dibaca' : 'Tandai Sudah Dibaca'}
                </button>
                <button 
                  onClick={() => handleDelete(msg.id)}
                  className="p-1 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                  title="Hapus Pesan"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-slate-100 text-slate-700 whitespace-pre-wrap">
              {msg.message}
            </div>
          </div>
        ))}

        {contacts.length === 0 && (
          <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-slate-500">
            Belum ada pesan yang masuk.
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactsTab;
