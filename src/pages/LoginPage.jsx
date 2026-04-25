import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'
import { Lock, User, ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // For demo purposes, we check against the provided credentials
      if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('isLoggedIn', 'true')
        toast.success('Selamat datang, Admin!')
        navigate('/admin')
      } else {
        // Fallback check in database if user exists
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('username', username)
          .single()

        if (error || !data) {
          throw new Error('Username atau password salah')
        }
        
        // Simulating password check for demo
        if (data.username === username && password === 'admin123') {
           localStorage.setItem('isLoggedIn', 'true')
           toast.success('Login Berhasil!')
           navigate('/admin')
        } else {
           throw new Error('Username atau password salah')
        }
      }
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-6 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-slate-800/10 rounded-full border border-slate-800"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl shadow-indigo-500/10 border border-slate-800/5">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-8">
              <ShieldCheck size={14} /> Secure Access
            </div>
            <div className="h-24 w-24 bg-indigo-600 rounded-[2rem] mx-auto flex items-center justify-center text-white text-4xl font-black mb-8 shadow-2xl shadow-indigo-200 rotate-3 transform hover:rotate-0 transition-transform">
              B
            </div>
            <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Admin <span className="text-indigo-600">Portal</span></h1>
            <p className="text-slate-500 font-medium">Masuk untuk mengelola ekosistem Bimbel Cerdas</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <User size={14} /> Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-6 py-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white outline-none transition-all font-bold text-slate-700"
                placeholder="admin"
              />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Lock size={14} /> Password
                </label>
                <a href="#" className="text-[10px] font-black text-indigo-600 uppercase hover:underline">Lupa?</a>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white outline-none transition-all font-bold text-slate-700"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-5 rounded-2xl font-black text-white text-xl transition-all shadow-2xl flex items-center justify-center gap-4 active:scale-95 ${
                loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100 transform hover:-translate-y-1'
              }`}
            >
              {loading ? (
                <div className="h-6 w-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Masuk Sekarang <Sparkles size={20} />
                </>
              )}
            </button>
          </form>
          
          <div className="mt-12 text-center">
            <button 
              onClick={() => navigate('/')} 
              className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-black text-sm uppercase tracking-widest transition-colors"
            >
              <ArrowLeft size={16} /> Kembali ke Beranda
            </button>
          </div>
        </div>
        
        <p className="text-center text-slate-500 mt-10 text-xs font-bold uppercase tracking-widest opacity-50">
          &copy; {new Date().getFullYear()} Bimbel Cerdas Management System
        </p>
      </div>
    </div>
  )
}