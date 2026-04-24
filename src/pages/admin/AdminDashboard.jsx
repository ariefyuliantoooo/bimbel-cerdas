import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Settings, Users, BookOpen, Star, MessageSquare, ClipboardList, LayoutDashboard } from 'lucide-react';

import SettingsTab from './tabs/SettingsTab';
import RegistrationsTab from './tabs/RegistrationsTab';
import RentalsTab from './tabs/RentalsTab';
import ServicesTab from './tabs/ServicesTab';
import TestimonialsTab from './tabs/TestimonialsTab';
import TeamTab from './tabs/TeamTab';
import ContactsTab from './tabs/ContactsTab';

const DashboardHome = () => (
  <div className="p-6">
    <h2 className="text-3xl font-bold mb-4">Selamat Datang di Admin Panel</h2>
    <p className="text-slate-600 mb-8">Gunakan menu navigasi di sebelah kiri untuk mengelola konten website Anda.</p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
        <h3 className="font-bold text-blue-800 text-lg mb-2">Tips Pengelolaan</h3>
        <p className="text-sm text-blue-600">Pastikan untuk mengecek menu 'Pesan Masuk' secara berkala untuk melihat pertanyaan dari calon siswa.</p>
      </div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'settings', label: 'Pengaturan', icon: Settings },
    { id: 'services', label: 'Layanan', icon: BookOpen },
    { id: 'rentals', label: 'Sewa Baju', icon: Users },
    { id: 'team', label: 'Tim Pengajar', icon: Users },
    { id: 'testimonials', label: 'Testimoni', icon: Star },
    { id: 'registrations', label: 'Pendaftaran', icon: ClipboardList },
    { id: 'contacts', label: 'Pesan Masuk', icon: MessageSquare },
  ];

  const renderTab = () => {
    switch (activeTab) {
      case 'settings': return <SettingsTab />;
      case 'services': return <ServicesTab />;
      case 'rentals': return <RentalsTab />;
      case 'team': return <TeamTab />;
      case 'testimonials': return <TestimonialsTab />;
      case 'registrations': return <RegistrationsTab />;
      case 'contacts': return <ContactsTab />;
      default: return <DashboardHome />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 font-bold text-xl border-b border-slate-800 flex items-center">
          Bimbel<span className="text-primary-400">Cerdas</span> Admin
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-primary-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
        <div className="p-4 border-t border-slate-800">
          <div className="text-xs text-slate-400 mb-3 px-2 truncate">
            {user?.email}
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg text-red-400 hover:bg-slate-800 transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 min-h-[80vh]">
            {renderTab()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
