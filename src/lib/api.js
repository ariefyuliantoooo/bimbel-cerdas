import { supabase } from './supabase';

// Settings
export const getSettings = async () => {
  const { data, error } = await supabase.from('settings').select('*');
  if (error) throw error;
  return data.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {});
};

export const updateSetting = async (key, value) => {
  const { data, error } = await supabase
    .from('settings')
    .update({ value })
    .eq('key', key);
  if (error) throw error;
  return data;
};

// Services
export const getServices = async (activeOnly = false) => {
  let query = supabase.from('services').select('*').order('created_at', { ascending: true });
  if (activeOnly) query = query.eq('is_active', true);
  const { data, error } = await query;
  if (error) throw error;
  return data;
};

// Testimonials
export const getTestimonials = async (approvedOnly = false) => {
  let query = supabase.from('testimonials').select('*').order('created_at', { ascending: false });
  if (approvedOnly) query = query.eq('is_approved', true);
  const { data, error } = await query;
  if (error) throw error;
  return data;
};

// Team
export const getTeam = async (activeOnly = false) => {
  let query = supabase.from('team').select('*').order('created_at', { ascending: true });
  if (activeOnly) query = query.eq('is_active', true);
  const { data, error } = await query;
  if (error) throw error;
  return data;
};

// Rentals
export const getRentals = async (availableOnly = false) => {
  let query = supabase.from('rentals').select('*').order('created_at', { ascending: false });
  if (availableOnly) query = query.eq('is_available', true);
  const { data, error } = await query;
  if (error) throw error;
  return data;
};

// Registrations
export const getRegistrations = async () => {
  const { data, error } = await supabase.from('registrations').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const submitRegistration = async (registrationData) => {
  const { data, error } = await supabase.from('registrations').insert([registrationData]);
  if (error) throw error;
  return data;
};

// Contacts
export const getContacts = async () => {
  const { data, error } = await supabase.from('contacts').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const submitContact = async (contactData) => {
  const { data, error } = await supabase.from('contacts').insert([contactData]);
  if (error) throw error;
  return data;
};

// Storage
export const uploadImage = async (file, path) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${path}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('bimbel_images')
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
    .from('bimbel_images')
    .getPublicUrl(filePath);

  return data.publicUrl;
};
