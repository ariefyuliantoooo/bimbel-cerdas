import { supabase } from './supabase';

const API_URL = 'http://localhost:5001/api';
const SOURCE = import.meta.env.VITE_API_SOURCE || 'supabase';

const isLocal = SOURCE === 'local';

export const api = {
  // 1. Settings
  getSettings: async () => {
    if (isLocal) {
      const res = await fetch(`${API_URL}/settings`);
      return res.json();
    } else {
      const { data } = await supabase.from('settings').select('*');
      return data || [];
    }
  },
  updateSetting: async (id, value) => {
    if (isLocal) {
      const res = await fetch(`${API_URL}/settings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value }),
      });
      return res.json();
    } else {
      const { data } = await supabase.from('settings').update({ value }).eq('id', id).select().single();
      return data;
    }
  },

  // 2. Services
  getServices: async () => {
    if (isLocal) {
      const res = await fetch(`${API_URL}/services`);
      return res.json();
    } else {
      const { data } = await supabase.from('services').select('*').order('created_at', { ascending: false });
      return data || [];
    }
  },
  createService: async (data) => {
    if (isLocal) {
      const res = await fetch(`${API_URL}/services`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return res.json();
    } else {
      const { data: result } = await supabase.from('services').insert([data]).select().single();
      return result;
    }
  },
  updateService: async (id, data) => {
    if (isLocal) {
      const res = await fetch(`${API_URL}/services/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return res.json();
    } else {
      const { data: result } = await supabase.from('services').update(data).eq('id', id).select().single();
      return result;
    }
  },
  deleteService: async (id) => {
    if (isLocal) {
      const res = await fetch(`${API_URL}/services/${id}`, { method: 'DELETE' });
      return res.json();
    } else {
      const { error } = await supabase.from('services').delete().eq('id', id);
      return { success: !error };
    }
  },

  // 3. Testimonials
  getTestimonials: async (limit) => {
    if (isLocal) {
      const res = await fetch(`${API_URL}/testimonials${limit ? `?limit=${limit}` : ''}`);
      return res.json();
    } else {
      let query = supabase.from('testimonials').select('*').order('created_at', { ascending: false });
      if (limit) query = query.limit(limit);
      const { data } = await query;
      return data || [];
    }
  },
  createTestimonial: async (data) => {
    if (isLocal) {
      const res = await fetch(`${API_URL}/testimonials`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return res.json();
    } else {
      const { data: result } = await supabase.from('testimonials').insert([data]).select().single();
      return result;
    }
  },
  updateTestimonial: async (id, data) => {
    if (isLocal) {
      const res = await fetch(`${API_URL}/testimonials/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return res.json();
    } else {
      const { data: result } = await supabase.from('testimonials').update(data).eq('id', id).select().single();
      return result;
    }
  },
  deleteTestimonial: async (id) => {
    if (isLocal) {
      const res = await fetch(`${API_URL}/testimonials/${id}`, { method: 'DELETE' });
      return res.json();
    } else {
      const { error } = await supabase.from('testimonials').delete().eq('id', id);
      return { success: !error };
    }
  },

  // 4. Team
  getTeam: async () => {
    if (isLocal) {
      const res = await fetch(`${API_URL}/team`);
      return res.json();
    } else {
      const { data } = await supabase.from('team').select('*').order('created_at', { ascending: false });
      return data || [];
    }
  },
  createTeamMember: async (data) => {
    if (isLocal) {
      const res = await fetch(`${API_URL}/team`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return res.json();
    } else {
      const { data: result } = await supabase.from('team').insert([data]).select().single();
      return result;
    }
  },
  updateTeamMember: async (id, data) => {
    if (isLocal) {
      const res = await fetch(`${API_URL}/team/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return res.json();
    } else {
      const { data: result } = await supabase.from('team').update(data).eq('id', id).select().single();
      return result;
    }
  },
  deleteTeamMember: async (id) => {
    if (isLocal) {
      const res = await fetch(`${API_URL}/team/${id}`, { method: 'DELETE' });
      return res.json();
    } else {
      const { error } = await supabase.from('team').delete().eq('id', id);
      return { success: !error };
    }
  },

  // 5. Rentals
  getRentals: async () => {
    if (isLocal) {
      const res = await fetch(`${API_URL}/rentals`);
      return res.json();
    } else {
      const { data } = await supabase.from('rentals').select('*').order('created_at', { ascending: false });
      return data || [];
    }
  },
  createRental: async (data) => {
    if (isLocal) {
      const res = await fetch(`${API_URL}/rentals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return res.json();
    } else {
      const { data: result } = await supabase.from('rentals').insert([data]).select().single();
      return result;
    }
  },
  updateRental: async (id, data) => {
    if (isLocal) {
      const res = await fetch(`${API_URL}/rentals/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return res.json();
    } else {
      const { data: result } = await supabase.from('rentals').update(data).eq('id', id).select().single();
      return result;
    }
  },
  deleteRental: async (id) => {
    if (isLocal) {
      const res = await fetch(`${API_URL}/rentals/${id}`, { method: 'DELETE' });
      return res.json();
    } else {
      const { error } = await supabase.from('rentals').delete().eq('id', id);
      return { success: !error };
    }
  },

  // 6. Registrations
  getRegistrations: async (status) => {
    if (isLocal) {
      const res = await fetch(`${API_URL}/registrations${status ? `?status=${status}` : ''}`);
      return res.json();
    } else {
      let query = supabase.from('registrations').select('*').order('created_at', { ascending: false });
      if (status && status !== 'all') query = query.eq('status', status);
      const { data } = await query;
      return data || [];
    }
  },
  createRegistration: async (data) => {
    if (isLocal) {
      const res = await fetch(`${API_URL}/registrations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return res.json();
    } else {
      const { data: result } = await supabase.from('registrations').insert([data]).select().single();
      return result;
    }
  },
  updateRegistrationStatus: async (id, status) => {
    if (isLocal) {
      const res = await fetch(`${API_URL}/registrations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      return res.json();
    } else {
      const { data: result } = await supabase.from('registrations').update({ status }).eq('id', id).select().single();
      return result;
    }
  },
  deleteRegistration: async (id) => {
    if (isLocal) {
      const res = await fetch(`${API_URL}/registrations/${id}`, { method: 'DELETE' });
      return res.json();
    } else {
      const { error } = await supabase.from('registrations').delete().eq('id', id);
      return { success: !error };
    }
  },

  // 7. Contacts
  getContacts: async () => {
    if (isLocal) {
      const res = await fetch(`${API_URL}/contacts`);
      return res.json();
    } else {
      const { data } = await supabase.from('contacts').select('*').order('created_at', { ascending: false });
      return data || [];
    }
  },
  createContact: async (data) => {
    if (isLocal) {
      const res = await fetch(`${API_URL}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return res.json();
    } else {
      const { data: result } = await supabase.from('contacts').insert([data]).select().single();
      return result;
    }
  },
  updateContactStatus: async (id, is_read) => {
    if (isLocal) {
      const res = await fetch(`${API_URL}/contacts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_read }),
      });
      return res.json();
    } else {
      const { data: result } = await supabase.from('contacts').update({ is_read }).eq('id', id).select().single();
      return result;
    }
  },
  deleteContact: async (id) => {
    if (isLocal) {
      const res = await fetch(`${API_URL}/contacts/${id}`, { method: 'DELETE' });
      return res.json();
    } else {
      const { error } = await supabase.from('contacts').delete().eq('id', id);
      return { success: !error };
    }
  },

  // User Management
  getUsers: async () => {
    if (isLocal) {
      const res = await fetch(`${API_URL}/users`);
      return res.json();
    } else {
      const { data } = await supabase.from('users').select('id, username, created_at').order('id', { ascending: true });
      return data;
    }
  },
  createUser: async (userData) => {
    if (isLocal) {
      const res = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      return res.json();
    } else {
      const { data } = await supabase.from('users').insert([userData]).select().single();
      return data;
    }
  },
  deleteUser: async (id) => {
    if (isLocal) {
      const res = await fetch(`${API_URL}/users/${id}`, { method: 'DELETE' });
      return res.json();
    } else {
      const { data } = await supabase.from('users').delete().eq('id', id);
      return data;
    }
  },

  // 8. Admin Stats
  getAdminStats: async () => {
    if (isLocal) {
      const res = await fetch(`${API_URL}/admin/stats`);
      return res.json();
    } else {
      const [
        { count: services },
        { count: rentals },
        { count: registrations },
        { count: contacts },
        { count: team },
        { count: testimonials }
      ] = await Promise.all([
        supabase.from('services').select('*', { count: 'exact', head: true }),
        supabase.from('rentals').select('*', { count: 'exact', head: true }),
        supabase.from('registrations').select('*', { count: 'exact', head: true }),
        supabase.from('contacts').select('*', { count: 'exact', head: true }),
        supabase.from('team').select('*', { count: 'exact', head: true }),
        supabase.from('testimonials').select('*', { count: 'exact', head: true })
      ]);

      return {
        services: services || 0,
        rentals: rentals || 0,
        registrations: registrations || 0,
        messages: contacts || 0,
        team: team || 0,
        testimonials: testimonials || 0
      };
    }
  },

  // 9. Login
  login: async (credentials) => {
    if (isLocal) {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      return res.json();
    } else {
      const { data, error } = await supabase.from('users').select('*').eq('username', credentials.username).single();
      if (data && credentials.password === data.password) {
        return { success: true, user: data };
      }
      return { success: false, message: 'Invalid credentials' };
    }
  }
};
