import { useEffect, useState } from 'react'
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { uploadImage } from '../lib/upload'
import { 
  LayoutDashboard, 
  BookOpen, 
  ShoppingBag, 
  Star, 
  Users, 
  FileText, 
  Mail, 
  Settings, 
  LogOut, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Download, 
  Eye, 
  Image as ImageIcon,
  ChevronRight,
  TrendingUp,
  Clock
} from 'lucide-react'
import { toast } from 'react-hot-toast'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

// --- SHARED COMPONENTS ---

const AdminLayout = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      navigate('/login')
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    toast.success('Berhasil keluar')
    navigate('/login')
  }

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Layanan', path: '/admin/services', icon: BookOpen },
    { name: 'Sewa Baju', path: '/admin/rentals', icon: ShoppingBag },
    { name: 'Testimoni', path: '/admin/testimonials', icon: Star },
    { name: 'Tim Pengajar', path: '/admin/team', icon: Users },
    { name: 'Pendaftaran', path: '/admin/registrations', icon: FileText },
    { name: 'Pesan Masuk', path: '/admin/messages', icon: Mail },
    { name: 'Pengaturan', path: '/admin/settings', icon: Settings },
  ]

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-72 bg-white shadow-2xl fixed h-full z-20 flex flex-col border-r border-slate-100">
        <div className="p-8 border-b border-slate-50">
          <Link to="/" className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg">B</div>
            <span className="font-black text-2xl text-slate-800 tracking-tighter">Admin Panel</span>
          </Link>
        </div>
        <nav className="flex-1 mt-6 px-4 space-y-1 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
                location.pathname === item.path 
                  ? 'bg-indigo-600 text-white shadow-indigo-200 shadow-xl translate-x-2' 
                  : 'text-slate-500 hover:bg-indigo-50 hover:text-indigo-600'
              }`}
            >
              <item.icon size={20} className={location.pathname === item.path ? 'text-white' : 'text-slate-400 group-hover:text-indigo-600'} />
              <span className="font-bold">{item.name}</span>
              {location.pathname === item.path && <ChevronRight size={16} className="ml-auto" />}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-50">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3.5 rounded-2xl text-rose-500 hover:bg-rose-50 transition-all duration-300 w-full text-left font-bold"
          >
            <LogOut size={20} />
            <span>Keluar Akun</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72 min-h-screen">
        <div className="p-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}

// --- SUB-PAGES ---

const Dashboard = () => {
  const [stats, setStats] = useState({ services: 0, rentals: 0, registrations: 0, messages: 0, team: 0, testimonials: 0 })
  const [recentRegs, setRecentRegs] = useState([])
  const [recentMsgs, setRecentMsgs] = useState([])
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    async function fetchData() {
      const [{ count: s }, { count: r }, { count: reg }, { count: m }, { count: t }, { count: ts }] = await Promise.all([
        supabase.from('services').select('*', { count: 'exact', head: true }),
        supabase.from('rentals').select('*', { count: 'exact', head: true }),
        supabase.from('registrations').select('*', { count: 'exact', head: true }),
        supabase.from('contacts').select('*', { count: 'exact', head: true }),
        supabase.from('team').select('*', { count: 'exact', head: true }),
        supabase.from('testimonials').select('*', { count: 'exact', head: true }),
      ])
      setStats({ services: s, rentals: r, registrations: reg, messages: m, team: t, testimonials: ts })

      const { data: regs } = await supabase.from('registrations').select('*').order('created_at', { ascending: false }).limit(5)
      setRecentRegs(regs || [])

      const { data: msgs } = await supabase.from('contacts').select('*').order('created_at', { ascending: false }).limit(5)
      setRecentMsgs(msgs || [])

      // Sample Chart Data (Monthly)
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      const data = months.map(m => ({ name: m, count: Math.floor(Math.random() * 20) + 5 }))
      setChartData(data)
    }
    fetchData()
  }, [])

  const statCards = [
    { label: 'Total Layanan', value: stats.services, icon: BookOpen, color: 'blue' },
    { label: 'Sewa Baju', value: stats.rentals, icon: ShoppingBag, color: 'indigo' },
    { label: 'Pendaftaran', value: stats.registrations, icon: FileText, color: 'emerald' },
    { label: 'Pesan Masuk', value: stats.messages, icon: Mail, color: 'amber' },
    { label: 'Tim Pengajar', value: stats.team, icon: Users, color: 'purple' },
    { label: 'Testimoni', value: stats.testimonials, icon: Star, color: 'rose' },
  ]

  return (
    <div className="animate-fade-in">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Dashboard Overview</h1>
        <p className="text-slate-500 mt-2 font-medium">Selamat datang kembali, Admin Bimbel Cerdas.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-10">
        {statCards.map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className={`h-12 w-12 bg-${s.color}-50 text-${s.color}-600 rounded-2xl flex items-center justify-center mb-4`}>
              <s.icon size={24} />
            </div>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mb-1">{s.label}</p>
            <p className="text-3xl font-black text-slate-900">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-4xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <TrendingUp className="text-indigo-600" /> Grafik Pendaftaran
            </h2>
            <select className="bg-slate-50 border-none rounded-xl px-4 py-2 text-sm font-bold text-slate-600 outline-none">
              <option>Tahun 2024</option>
              <option>Tahun 2023</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 600}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 600}} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={30}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 5 ? '#4f46e5' : '#e2e8f0'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-4xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
              <Clock className="text-indigo-600" /> Pendaftar Terbaru
            </h2>
            <div className="space-y-4">
              {recentRegs.map((reg) => (
                <div key={reg.id} className="flex items-center gap-4 group">
                  <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center font-black text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                    {reg.student_name[0]}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="font-bold text-slate-800 truncate">{reg.student_name}</p>
                    <p className="text-xs text-slate-400 font-medium">{reg.program}</p>
                  </div>
                  <div className="text-[10px] font-bold text-slate-300">
                    {new Date(reg.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))}
              {recentRegs.length === 0 && <p className="text-slate-400 text-sm text-center py-4 italic">Belum ada pendaftar.</p>}
            </div>
            <Link to="/admin/registrations" className="block text-center mt-6 text-indigo-600 font-bold text-sm hover:underline">Lihat Semua</Link>
          </div>

          <div className="bg-white p-8 rounded-4xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
              <Mail className="text-indigo-600" /> Pesan Terbaru
            </h2>
            <div className="space-y-4">
              {recentMsgs.map((msg) => (
                <div key={msg.id} className="flex items-center gap-4 group">
                  <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center font-black text-slate-400 group-hover:bg-amber-100 group-hover:text-amber-600 transition-colors">
                    <Mail size={16} />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="font-bold text-slate-800 truncate">{msg.name}</p>
                    <p className="text-xs text-slate-400 font-medium truncate">{msg.message}</p>
                  </div>
                  {!msg.is_read && <div className="h-2 w-2 rounded-full bg-indigo-500 shadow-lg shadow-indigo-200"></div>}
                </div>
              ))}
              {recentMsgs.length === 0 && <p className="text-slate-400 text-sm text-center py-4 italic">Tidak ada pesan.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ImageUploader = ({ value, onChange, label }) => {
  const [preview, setPreview] = useState(value)
  const [loading, setLoading] = useState(false)

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setPreview(URL.createObjectURL(file))
    setLoading(true)
    try {
      const url = await uploadImage(file)
      onChange(url)
      toast.success('Gambar berhasil diunggah')
    } catch (err) {
      toast.error('Gagal mengunggah gambar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <label className="block text-sm font-bold mb-3 text-slate-700">{label}</label>
      <div className="relative group overflow-hidden rounded-3xl border-2 border-dashed border-slate-200 aspect-video flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 hover:border-indigo-300 transition-all">
        {preview ? (
          <>
            <img src={preview} className="w-full h-full object-cover" alt="Preview" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <span className="text-white font-bold flex items-center gap-2"><ImageIcon size={18} /> Ganti Gambar</span>
            </div>
          </>
        ) : (
          <div className="text-center p-6">
            <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-sm text-slate-400 group-hover:text-indigo-500 transition-colors">
              <Plus size={24} />
            </div>
            <p className="text-xs text-slate-500 font-bold">Klik untuk unggah foto</p>
          </div>
        )}
        <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
        {loading && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
            <div className="h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  )
}

const ServicesManager = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [editItem, setEditItem] = useState(null)

  const fetchData = async () => {
    const { data } = await supabase.from('services').select('*').order('created_at', { ascending: false })
    setItems(data || [])
  }

  useEffect(() => { fetchData() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.target)
    const payload = Object.fromEntries(formData.entries())
    payload.is_active = formData.get('is_active') === 'on'

    try {
      if (editItem?.id) {
        await supabase.from('services').update(payload).eq('id', editItem.id)
        toast.success('Layanan diperbarui')
      } else {
        await supabase.from('services').insert([payload])
        toast.success('Layanan ditambahkan')
      }
      setEditItem(null)
      fetchData()
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (confirm('Yakin ingin menghapus layanan ini?')) {
      await supabase.from('services').delete().eq('id', id)
      toast.success('Layanan dihapus')
      fetchData()
    }
  }

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Manajemen Layanan</h1>
          <p className="text-slate-500 font-medium mt-1">Kelola program bimbingan belajar dan layanan lainnya.</p>
        </div>
        <button 
          onClick={() => setEditItem({ title: '', icon: '📚', description: '', is_active: true })} 
          className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-indigo-100 hover:shadow-indigo-200 hover:-translate-y-1 transition-all flex items-center gap-2"
        >
          <Plus size={20} /> Tambah Layanan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <div key={item.id} className="bg-white p-8 rounded-4xl shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="text-4xl">{item.icon}</div>
              <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${item.is_active ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                {item.is_active ? 'Aktif' : 'Non-aktif'}
              </div>
            </div>
            <h3 className="text-xl font-black text-slate-800 mb-3">{item.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-8 h-20 overflow-hidden text-ellipsis line-clamp-3">{item.description}</p>
            <div className="flex gap-3 pt-6 border-t border-slate-50">
              <button 
                onClick={() => setEditItem(item)} 
                className="flex-1 bg-slate-50 text-slate-600 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
              >
                <Edit size={16} /> Edit
              </button>
              <button 
                onClick={() => handleDelete(item.id)} 
                className="h-11 w-11 bg-slate-50 text-rose-500 rounded-xl flex items-center justify-center hover:bg-rose-50 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editItem && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-5xl p-12 max-w-xl w-full shadow-2xl animate-fade-in">
            <h2 className="text-3xl font-black mb-8 text-slate-900">Form Layanan</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-4 gap-6">
                <div className="col-span-1">
                  <label className="block text-sm font-bold mb-2">Ikon</label>
                  <input name="icon" defaultValue={editItem.icon} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 ring-indigo-500 font-bold text-xl text-center" />
                </div>
                <div className="col-span-3">
                  <label className="block text-sm font-bold mb-2">Judul Layanan</label>
                  <input name="title" defaultValue={editItem.title} required className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 ring-indigo-500 font-bold" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Deskripsi Lengkap</label>
                <textarea name="description" defaultValue={editItem.description} required className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 ring-indigo-500 font-medium leading-relaxed" rows="4"></textarea>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl">
                <input type="checkbox" name="is_active" defaultChecked={editItem.is_active} id="is_active" className="h-5 w-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                <label htmlFor="is_active" className="text-sm font-bold text-slate-700">Tampilkan Layanan di Website</label>
              </div>
              <div className="flex justify-end gap-4 mt-10">
                <button type="button" onClick={() => setEditItem(null)} className="px-8 py-4 font-black text-slate-400 hover:text-slate-600">Batalkan</button>
                <button disabled={loading} className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-indigo-100 hover:shadow-indigo-200">
                  {loading ? 'Menyimpan...' : 'Simpan Data'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

const RentalsManager = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [editItem, setEditItem] = useState(null)

  const fetchData = async () => {
    const { data } = await supabase.from('rentals').select('*').order('created_at', { ascending: false })
    setItems(data || [])
  }

  useEffect(() => { fetchData() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.target)
    const values = Object.fromEntries(formData.entries())
    
    try {
      const payload = { 
        ...values, 
        price: parseInt(values.price), 
        stock: parseInt(values.stock), 
        image_url: editItem.image_url,
        is_available: formData.get('is_available') === 'on'
      }

      if (editItem?.id) {
        await supabase.from('rentals').update(payload).eq('id', editItem.id)
        toast.success('Baju diperbarui')
      } else {
        await supabase.from('rentals').insert([payload])
        toast.success('Baju baru ditambahkan')
      }
      
      setEditItem(null)
      fetchData()
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (confirm('Yakin ingin menghapus koleksi baju ini?')) {
      await supabase.from('rentals').delete().eq('id', id)
      toast.success('Koleksi dihapus')
      fetchData()
    }
  }

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Manajemen Sewa Baju</h1>
          <p className="text-slate-500 font-medium mt-1">Kelola stok baju adat dan profesi untuk disewakan.</p>
        </div>
        <button 
          onClick={() => setEditItem({ name: '', category: 'adat', price: 0, stock: 0, description: '', size: 'ALL', image_url: '', is_available: true })}
          className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-indigo-100 hover:shadow-indigo-200 transition-all flex items-center gap-2"
        >
          <Plus size={20} /> Tambah Baju
        </button>
      </div>

      <div className="bg-white rounded-5xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50">
            <tr>
              <th className="px-8 py-5 font-black text-slate-400 text-[10px] uppercase tracking-widest">Barang</th>
              <th className="px-8 py-5 font-black text-slate-400 text-[10px] uppercase tracking-widest">Kategori</th>
              <th className="px-8 py-5 font-black text-slate-400 text-[10px] uppercase tracking-widest">Harga</th>
              <th className="px-8 py-5 font-black text-slate-400 text-[10px] uppercase tracking-widest">Stok / Ukuran</th>
              <th className="px-8 py-5 font-black text-slate-400 text-[10px] uppercase tracking-widest">Status</th>
              <th className="px-8 py-5 font-black text-slate-400 text-[10px] uppercase tracking-widest text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/30 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <img src={item.image_url || 'https://via.placeholder.com/100'} className="h-16 w-16 rounded-2xl object-cover shadow-sm group-hover:scale-110 transition-transform" alt="" />
                    <div className="font-black text-slate-800">{item.name}</div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${item.category === 'adat' ? 'bg-indigo-50 text-indigo-600' : 'bg-amber-50 text-amber-600'}`}>
                    {item.category}
                  </span>
                </td>
                <td className="px-8 py-6 font-black text-indigo-600">Rp {item.price.toLocaleString()}</td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-slate-700">{item.stock}</span>
                    <span className="text-xs font-bold text-slate-400">/ {item.size}</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className={`h-2.5 w-2.5 rounded-full ${item.is_available ? 'bg-emerald-500 shadow-emerald-200' : 'bg-slate-300 shadow-slate-100'} shadow-lg`}></div>
                </td>
                <td className="px-8 py-6 text-right space-x-2">
                  <button onClick={() => setEditItem(item)} className="h-11 w-11 bg-slate-50 text-indigo-600 rounded-xl flex items-center justify-center hover:bg-indigo-100 transition-colors">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="h-11 w-11 bg-slate-50 text-rose-500 rounded-xl flex items-center justify-center hover:bg-rose-50 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && <div className="p-20 text-center text-slate-400 font-bold italic">Koleksi baju masih kosong.</div>}
      </div>

      {editItem && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-5xl p-12 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in custom-scrollbar">
            <h2 className="text-3xl font-black mb-10 text-slate-900">{editItem.id ? 'Edit Koleksi Baju' : 'Tambah Baju Baru'}</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <ImageUploader 
                  value={editItem.image_url} 
                  onChange={(url) => setEditItem({ ...editItem, image_url: url })} 
                  label="Foto Baju"
                />
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2 text-slate-700">Ukuran</label>
                    <input name="size" defaultValue={editItem.size} placeholder="Contoh: S, M, XL, ALL" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 ring-indigo-500 font-bold" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 text-slate-700">Jumlah Stok</label>
                    <input name="stock" type="number" defaultValue={editItem.stock} required className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 ring-indigo-500 font-bold" />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-2 text-slate-700">Nama Baju</label>
                  <input name="name" defaultValue={editItem.name} required className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 ring-indigo-500 font-bold" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2 text-slate-700">Kategori</label>
                    <select name="category" defaultValue={editItem.category} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 ring-indigo-500 font-bold">
                      <option value="adat">Baju Adat</option>
                      <option value="profesi">Baju Profesi</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 text-slate-700">Harga Sewa (Rp)</label>
                    <input name="price" type="number" defaultValue={editItem.price} required className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 ring-indigo-500 font-bold text-indigo-600" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-slate-700">Deskripsi Barang</label>
                  <textarea name="description" defaultValue={editItem.description} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 ring-indigo-500 font-medium" rows="4"></textarea>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 p-5 rounded-2xl">
                  <input type="checkbox" name="is_available" defaultChecked={editItem.is_available} id="is_available" className="h-6 w-6 rounded-lg border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                  <label htmlFor="is_available" className="text-sm font-black text-slate-700">Barang Tersedia untuk Disewa</label>
                </div>
                <div className="flex justify-end gap-4 pt-4">
                  <button type="button" onClick={() => setEditItem(null)} className="px-8 py-4 font-black text-slate-400 hover:text-slate-600">Batalkan</button>
                  <button disabled={loading} className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-indigo-100 hover:shadow-indigo-200">
                    {loading ? 'Proses...' : 'Simpan Data'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

const RegistrationsManager = () => {
  const [items, setItems] = useState([])
  const [filter, setFilter] = useState('all')

  const fetchData = async () => {
    let query = supabase.from('registrations').select('*').order('created_at', { ascending: false })
    if (filter !== 'all') query = query.eq('status', filter)
    const { data } = await query
    setItems(data || [])
  }

  useEffect(() => { fetchData() }, [filter])

  const updateStatus = async (id, status) => {
    await supabase.from('registrations').update({ status }).eq('id', id)
    toast.success(`Status diubah ke ${status}`)
    fetchData()
  }

  const exportToCSV = () => {
    if (items.length === 0) return toast.error('Tidak ada data untuk diekspor')
    const headers = ['Nama Siswa', 'Orang Tua', 'No WA', 'Email', 'Sekolah', 'Kelas', 'Program', 'Status', 'Tanggal']
    const csvContent = [
      headers.join(','),
      ...items.map(i => [
        `"${i.student_name}"`,
        `"${i.parent_name}"`,
        `"${i.phone}"`,
        `"${i.email}"`,
        `"${i.school}"`,
        `"${i.grade}"`,
        `"${i.program}"`,
        `"${i.status}"`,
        new Date(i.created_at).toLocaleDateString()
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.setAttribute('download', `pendaftaran_bimbel_cerdas_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success('File CSV berhasil diunduh')
  }

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Pendaftaran Siswa</h1>
          <p className="text-slate-500 font-medium mt-1">Kelola data calon siswa yang mendaftar melalui website.</p>
        </div>
        <div className="flex gap-4">
          <select 
            onChange={(e) => setFilter(e.target.value)} 
            className="bg-white border border-slate-200 rounded-2xl px-6 py-4 font-bold text-slate-600 outline-none shadow-sm focus:ring-2 ring-indigo-500"
          >
            <option value="all">Semua Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <button 
            onClick={exportToCSV}
            className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black shadow-lg hover:bg-slate-800 transition-all flex items-center gap-2"
          >
            <Download size={20} /> Ekspor CSV
          </button>
        </div>
      </div>

      <div className="bg-white rounded-5xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50">
            <tr>
              <th className="px-8 py-5 font-black text-slate-400 text-[10px] uppercase tracking-widest">Nama Siswa</th>
              <th className="px-8 py-5 font-black text-slate-400 text-[10px] uppercase tracking-widest">Kontak</th>
              <th className="px-8 py-5 font-black text-slate-400 text-[10px] uppercase tracking-widest">Detail Sekolah</th>
              <th className="px-8 py-5 font-black text-slate-400 text-[10px] uppercase tracking-widest">Program</th>
              <th className="px-8 py-5 font-black text-slate-400 text-[10px] uppercase tracking-widest">Status</th>
              <th className="px-8 py-5 font-black text-slate-400 text-[10px] uppercase tracking-widest text-right">Tindakan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/30 transition-colors">
                <td className="px-8 py-6">
                  <div className="font-black text-slate-800">{item.student_name}</div>
                  <div className="text-xs font-bold text-slate-400 mt-0.5">Ortu: {item.parent_name}</div>
                </td>
                <td className="px-8 py-6">
                  <div className="text-sm font-bold text-slate-700">{item.phone}</div>
                  <div className="text-xs font-medium text-slate-400">{item.email || '-'}</div>
                </td>
                <td className="px-8 py-6">
                  <div className="text-sm font-bold text-slate-700">{item.school}</div>
                  <div className="text-xs font-medium text-slate-400">Kelas {item.grade}</div>
                </td>
                <td className="px-8 py-6">
                  <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                    {item.program}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <select 
                    value={item.status} 
                    onChange={(e) => updateStatus(item.id, e.target.value)}
                    className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest outline-none border-none ${
                      item.status === 'pending' ? 'bg-amber-50 text-amber-600' : 
                      item.status === 'approved' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                    }`}
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
                <td className="px-8 py-6 text-right">
                  <button onClick={() => { if(confirm('Hapus pendaftaran ini?')) supabase.from('registrations').delete().eq('id', item.id).then(fetchData) }} className="h-10 w-10 text-rose-500 hover:bg-rose-50 rounded-xl flex items-center justify-center transition-colors ml-auto">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && <div className="p-20 text-center text-slate-400 font-bold italic">Tidak ada pendaftar ditemukan.</div>}
      </div>
    </div>
  )
}

const SettingsManager = () => {
  const [settings, setSettings] = useState([])
  const [loading, setLoading] = useState(false)
  const [localSettings, setLocalSettings] = useState({})

  const fetchData = async () => {
    const { data } = await supabase.from('settings').select('*')
    setSettings(data || [])
    const map = {}
    data?.forEach(s => map[s.key] = s.value)
    setLocalSettings(map)
  }

  useEffect(() => { fetchData() }, [])

  const handleSave = async (key) => {
    setLoading(true)
    const s = settings.find(item => item.key === key)
    try {
      if (s) {
        await supabase.from('settings').update({ value: localSettings[key] }).eq('id', s.id)
      } else {
        await supabase.from('settings').insert([{ key, value: localSettings[key] }])
      }
      toast.success(`${key.replace('_', ' ')} disimpan`)
      fetchData()
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  const getSettingValue = (key) => localSettings[key] || ''

  return (
    <div className="animate-fade-in max-w-5xl">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Pengaturan Website</h1>
        <p className="text-slate-500 font-medium mt-1">Konfigurasi visual, kontak, dan biaya operasional website.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Branding & Media */}
        <div className="space-y-8">
          <div className="bg-white p-10 rounded-5xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-black text-slate-800 mb-8 flex items-center gap-2">
              <ImageIcon className="text-indigo-600" /> Visual & Branding
            </h2>
            <div className="space-y-8">
              <div className="space-y-4">
                <ImageUploader 
                  label="Background Hero (Beranda)" 
                  value={getSettingValue('hero_image')} 
                  onChange={(url) => setLocalSettings({...localSettings, hero_image: url})}
                />
                <button onClick={() => handleSave('hero_image')} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">
                  Simpan Foto Hero
                </button>
              </div>
              
              <div className="space-y-4 pt-6 border-t border-slate-50">
                <ImageUploader 
                  label="Logo Website" 
                  value={getSettingValue('logo_image')} 
                  onChange={(url) => setLocalSettings({...localSettings, logo_image: url})}
                />
                <button onClick={() => handleSave('logo_image')} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">
                  Simpan Logo
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-5xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-black text-slate-800 mb-8 flex items-center gap-2">
              <TrendingUp className="text-emerald-600" /> Biaya & Tarif
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold mb-3 text-slate-700">Tarif SPP Bimbel / Bulan (Rp)</label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 font-black text-slate-400">Rp</span>
                  <input 
                    type="number"
                    value={getSettingValue('spp_price')} 
                    onChange={(e) => setLocalSettings({...localSettings, spp_price: e.target.value})}
                    className="w-full pl-12 pr-5 py-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 ring-emerald-500 font-black text-emerald-600"
                  />
                </div>
              </div>
              <button onClick={() => handleSave('spp_price')} className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all">
                Simpan Tarif SPP
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-10 rounded-5xl shadow-sm border border-slate-100 h-fit">
          <h2 className="text-xl font-black text-slate-800 mb-8 flex items-center gap-2">
            <Mail className="text-indigo-600" /> Kontak & Sosial Media
          </h2>
          <form onSubmit={(e) => { e.preventDefault(); toast.success('Klik tombol simpan pada masing-masing field'); }} className="space-y-6">
            {[
              { key: 'wa_number', label: 'WhatsApp Utama' },
              { key: 'wa_secondary', label: 'WhatsApp Cadangan' },
              { key: 'email', label: 'Email Resmi' },
              { key: 'facebook_url', label: 'Facebook URL' },
              { key: 'instagram_url', label: 'Instagram URL' },
              { key: 'youtube_url', label: 'YouTube URL' },
            ].map((field) => (
              <div key={field.key} className="p-6 bg-slate-50 rounded-3xl border border-slate-100/50">
                <label className="block text-sm font-black mb-3 text-slate-500 uppercase tracking-widest">{field.label}</label>
                <div className="flex gap-3">
                  <input 
                    value={getSettingValue(field.key)} 
                    onChange={(e) => setLocalSettings({...localSettings, [field.key]: e.target.value})}
                    placeholder={`Masukkan ${field.label}...`}
                    className="flex-1 px-5 py-4 rounded-2xl bg-white border border-slate-200 outline-none focus:ring-2 ring-indigo-500 font-bold text-slate-700"
                  />
                  <button 
                    type="button"
                    onClick={() => handleSave(field.key)}
                    className="px-6 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            ))}
          </form>
        </div>
      </div>
    </div>
  )
}

// Reuse SimpleTableManager for Messages with better UI
const MessagesManager = () => {
  const [items, setItems] = useState([])
  const fetchData = async () => {
    const { data } = await supabase.from('contacts').select('*').order('created_at', { ascending: false })
    setItems(data || [])
  }
  useEffect(() => { fetchData() }, [])

  const toggleRead = async (item) => {
    await supabase.from('contacts').update({ is_read: !item.is_read }).eq('id', item.id)
    fetchData()
  }

  const handleDelete = async (id) => {
    if (confirm('Hapus pesan ini?')) {
      await supabase.from('contacts').delete().eq('id', id)
      toast.success('Pesan dihapus')
      fetchData()
    }
  }

  return (
    <div className="animate-fade-in">
      <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-10">Pesan Masuk</h1>
      <div className="space-y-6">
        {items.map((msg) => (
          <div key={msg.id} className={`bg-white p-8 rounded-4xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6 relative group overflow-hidden ${!msg.is_read ? 'ring-2 ring-indigo-100' : ''}`}>
            {!msg.is_read && <div className="absolute left-0 top-0 bottom-0 w-2 bg-indigo-600 shadow-xl shadow-indigo-100"></div>}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="font-black text-slate-800 text-lg">{msg.name}</h3>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">{new Date(msg.created_at).toLocaleString()}</span>
              </div>
              <div className="flex gap-4 text-xs font-bold text-slate-400 mb-4">
                <span>📞 {msg.phone}</span>
                <span>📧 {msg.email}</span>
              </div>
              <p className="text-slate-600 font-medium leading-relaxed bg-slate-50 p-6 rounded-3xl">{msg.message}</p>
            </div>
            <div className="flex md:flex-col gap-3 justify-center">
              <button onClick={() => toggleRead(msg)} className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-all ${msg.is_read ? 'bg-slate-100 text-slate-400' : 'bg-indigo-600 text-white shadow-lg shadow-indigo-100'}`}>
                {msg.is_read ? <Eye size={20} /> : <CheckCircle size={20} />}
              </button>
              <button onClick={() => handleDelete(msg.id)} className="h-12 w-12 bg-slate-50 text-rose-500 rounded-2xl flex items-center justify-center hover:bg-rose-50 transition-colors">
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && <div className="p-20 text-center text-slate-400 font-bold italic">Kotak masuk kosong.</div>}
      </div>
    </div>
  )
}

// --- MAIN ADMIN ROUTER ---

export default function AdminPage() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/services" element={<ServicesManager />} />
        <Route path="/rentals" element={<RentalsManager />} />
        <Route path="/testimonials" element={<TestimonialsManager 
            fetchData={async (supabase) => {
              const { data } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false })
              return data
            }}
          />} 
        />
        <Route path="/team" element={<TeamManager />} />
        <Route path="/settings" element={<SettingsManager />} />
        <Route path="/registrations" element={<RegistrationsManager />} />
        <Route path="/messages" element={<MessagesManager />} />
        <Route path="*" element={<div className="text-center py-40">
          <div className="h-20 w-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
            <LayoutDashboard size={40} />
          </div>
          <h2 className="text-2xl font-black text-slate-400 italic">Pilih menu untuk mengelola konten.</h2>
        </div>} />
      </Routes>
    </AdminLayout>
  )
}

// --- MISSING MANAGER COMPONENTS (STUBBED TO BE FULLY IMPLEMENTED) ---

const TestimonialsManager = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [editItem, setEditItem] = useState(null)

  const fetchData = async () => {
    const { data } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false })
    setItems(data || [])
  }

  useEffect(() => { fetchData() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.target)
    const payload = { 
      ...Object.fromEntries(formData.entries()),
      rating: parseInt(formData.get('rating')),
      image_url: editItem.image_url,
      is_approved: formData.get('is_approved') === 'on'
    }

    try {
      if (editItem?.id) await supabase.from('testimonials').update(payload).eq('id', editItem.id)
      else await supabase.from('testimonials').insert([payload])
      toast.success('Testimoni disimpan')
      setEditItem(null); fetchData()
    } catch (err) { toast.error(err.message) }
    finally { setLoading(false) }
  }

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Kelola Testimoni</h1>
        <button onClick={() => setEditItem({ name: '', occupation: '', message: '', rating: 5, image_url: '', is_approved: true })} className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black shadow-lg flex items-center gap-2"><Plus size={20} /> Tambah Testimoni</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {items.map((item) => (
          <div key={item.id} className="bg-white p-8 rounded-4xl shadow-sm border border-slate-100 flex gap-6">
            <img src={item.image_url || 'https://via.placeholder.com/100'} className="h-20 w-20 rounded-2xl object-cover shadow-sm" alt="" />
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-black text-slate-800 text-lg">{item.name}</h3>
                  <p className="text-xs font-bold text-slate-400">{item.occupation}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${item.is_approved ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                  {item.is_approved ? 'Approved' : 'Pending'}
                </div>
              </div>
              <div className="flex gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < item.rating ? 'currentColor' : 'none'} />)}
              </div>
              <p className="text-slate-500 text-sm italic mb-6">"{item.message}"</p>
              <div className="flex gap-3">
                <button onClick={() => setEditItem(item)} className="text-indigo-600 font-bold text-xs hover:underline">Edit</button>
                <button onClick={() => { if(confirm('Hapus?')) supabase.from('testimonials').delete().eq('id', item.id).then(fetchData) }} className="text-rose-500 font-bold text-xs hover:underline">Hapus</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {editItem && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-5xl p-12 max-w-xl w-full shadow-2xl animate-fade-in custom-scrollbar overflow-y-auto max-h-[90vh]">
            <h2 className="text-3xl font-black mb-8">Form Testimoni</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <ImageUploader label="Foto Pemberi Testimoni" value={editItem.image_url} onChange={url => setEditItem({...editItem, image_url: url})} />
              <input name="name" defaultValue={editItem.name} placeholder="Nama Lengkap" required className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none font-bold" />
              <input name="occupation" defaultValue={editItem.occupation} placeholder="Pekerjaan" required className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none font-bold" />
              <textarea name="message" defaultValue={editItem.message} placeholder="Pesan Testimoni" required className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none font-medium" rows="3"></textarea>
              <div className="flex items-center gap-4">
                <label className="text-sm font-bold text-slate-700">Rating (1-5)</label>
                <input name="rating" type="number" min="1" max="5" defaultValue={editItem.rating} className="w-20 px-4 py-2 rounded-xl bg-slate-50 border-none font-black text-center text-indigo-600" />
              </div>
              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl">
                <input type="checkbox" name="is_approved" defaultChecked={editItem.is_approved} id="is_approved" className="h-5 w-5 rounded border-slate-300 text-indigo-600" />
                <label htmlFor="is_approved" className="text-sm font-bold text-slate-700">Tampilkan Testimoni di Website</label>
              </div>
              <div className="flex justify-end gap-4 mt-10">
                <button type="button" onClick={() => setEditItem(null)} className="font-black text-slate-400">Batal</button>
                <button disabled={loading} className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black shadow-xl">{loading ? '...' : 'Simpan'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

const TeamManager = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [editItem, setEditItem] = useState(null)

  const fetchData = async () => {
    const { data } = await supabase.from('team').select('*').order('created_at', { ascending: false })
    setItems(data || [])
  }

  useEffect(() => { fetchData() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.target)
    const payload = { 
      ...Object.fromEntries(formData.entries()),
      image_url: editItem.image_url,
      is_active: formData.get('is_active') === 'on'
    }

    try {
      if (editItem?.id) await supabase.from('team').update(payload).eq('id', editItem.id)
      else await supabase.from('team').insert([payload])
      toast.success('Data pengajar disimpan')
      setEditItem(null); fetchData()
    } catch (err) { toast.error(err.message) }
    finally { setLoading(false) }
  }

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Tim Pengajar</h1>
        <button onClick={() => setEditItem({ name: '', role: '', expertise: '', image_url: '', is_active: true })} className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black shadow-lg flex items-center gap-2"><Plus size={20} /> Tambah Pengajar</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((member) => (
          <div key={member.id} className="bg-white p-8 rounded-4xl shadow-sm border border-slate-100 text-center group transition-all">
            <div className="relative h-32 w-32 mx-auto mb-6">
              <img src={member.image_url || 'https://via.placeholder.com/150'} className="h-full w-full rounded-3xl object-cover shadow-md group-hover:scale-105 transition-transform" alt="" />
              {!member.is_active && <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] rounded-3xl flex items-center justify-center font-black text-slate-400 text-xs uppercase tracking-widest">Non-aktif</div>}
            </div>
            <h3 className="font-black text-xl text-slate-800">{member.name}</h3>
            <p className="text-indigo-600 font-bold text-sm mb-4">{member.role}</p>
            <p className="text-slate-400 text-xs font-medium mb-8 leading-relaxed line-clamp-2">{member.expertise}</p>
            <div className="flex gap-2">
              <button onClick={() => setEditItem(member)} className="flex-1 bg-slate-50 text-slate-500 py-3 rounded-xl font-bold text-xs hover:bg-indigo-50 hover:text-indigo-600 transition-colors">Edit</button>
              <button onClick={() => { if(confirm('Hapus?')) supabase.from('team').delete().eq('id', member.id).then(fetchData) }} className="h-10 w-10 bg-slate-50 text-rose-500 rounded-xl flex items-center justify-center hover:bg-rose-50 transition-colors"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
      {editItem && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-5xl p-12 max-w-xl w-full shadow-2xl animate-fade-in custom-scrollbar overflow-y-auto max-h-[90vh]">
            <h2 className="text-3xl font-black mb-8 text-slate-900">Form Pengajar</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <ImageUploader label="Foto Pengajar" value={editItem.image_url} onChange={url => setEditItem({...editItem, image_url: url})} />
              <input name="name" defaultValue={editItem.name} placeholder="Nama Lengkap" required className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none font-bold" />
              <input name="role" defaultValue={editItem.role} placeholder="Jabatan / Role" required className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none font-bold" />
              <textarea name="expertise" defaultValue={editItem.expertise} placeholder="Keahlian Khusus" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none font-medium" rows="3"></textarea>
              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl">
                <input type="checkbox" name="is_active" defaultChecked={editItem.is_active} id="is_active" className="h-5 w-5 rounded border-slate-300 text-indigo-600" />
                <label htmlFor="is_active" className="text-sm font-bold text-slate-700">Tampilkan Pengajar di Website</label>
              </div>
              <div className="flex justify-end gap-4 mt-10">
                <button type="button" onClick={() => setEditItem(null)} className="font-black text-slate-400">Batalkan</button>
                <button disabled={loading} className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-indigo-100">{loading ? 'Proses...' : 'Simpan'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

