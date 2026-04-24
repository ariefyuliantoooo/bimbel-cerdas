import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

const FloatingWhatsApp = () => {
  const { settings, loading } = useSettings();

  if (loading || !settings.wa_number) return null;

  const waLink = `https://wa.me/${settings.wa_number.replace(/\D/g, '')}`;

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all duration-300 z-50 flex items-center justify-center hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={32} />
    </a>
  );
};

export default FloatingWhatsApp;
