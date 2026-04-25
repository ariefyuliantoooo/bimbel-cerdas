import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { Phone, Search, SlidersHorizontal, Package, Tag, ShoppingBag } from 'lucide-react'

export default function RentalPage() {
  const [loading, setLoading] = useState(true)
  const [rentals, setRentals] = useState([])
  const [category, setCategory] = useState('all')
  const [waNumber, setWaNumber] = useState('')

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        
        // Fetch WA Number
        const { data: settings } = await supabase.from('settings').select('value').eq('key', 'wa_number').single()
        setWaNumber(settings?.value || '6285272123300')

        // Fetch Rentals
        let query = supabase.from('rentals').select('*').eq('is_available', true)
        if (category !== 'all') {
          query = query.eq('category', category)
        }

        const { data, error } = await query
        if (error) throw error
        setRentals(data || [])
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [category])

  return (
    <div className="pt-32 min-h-screen bg-slate-50 pb-24">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6">
            <ShoppingBag size={14} /> Koleksi Eksklusif
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">Sewa Baju Adat & <span className="text-indigo-600">Profesi</span></h1>
          <p className="text-xl text-slate-600 font-medium leading-relaxed">
            Temukan koleksi lengkap pakaian adat nusantara dan seragam profesi anak untuk berbagai acara sekolah, festival, dan pemotretan.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16 bg-white p-4 rounded-3xl shadow-xl shadow-slate-100 border border-slate-100">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto custom-scrollbar">
            <SlidersHorizontal size={18} className="text-slate-400 mr-2 shrink-0" />
            {['all', 'adat', 'profesi'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-8 py-3 rounded-2xl font-black capitalize transition-all shrink-0 ${
                  category === cat 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat === 'all' ? 'Semua Koleksi' : cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari baju..." 
              className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-600 font-medium text-slate-700"
            />
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 p-2">
                <div className="aspect-[4/5] bg-slate-100 rounded-[2rem] animate-pulse"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-slate-100 rounded-full w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-slate-100 rounded-full w-full animate-pulse"></div>
                  <div className="h-12 bg-slate-100 rounded-2xl w-full animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        ) : rentals.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {rentals.map((item, index) => (
              <div 
                key={item.id} 
                className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-indigo-100 transition-all group border border-slate-100 p-2 transform hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="aspect-[4/5] overflow-hidden relative rounded-[2rem]">
                  <img 
                    src={item.image_url || 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80'} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2">
                    <Tag size={14} className="text-indigo-600" />
                    <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">{item.category}</span>
                  </div>
                  {item.stock <= 3 && item.stock > 0 && (
                    <div className="absolute bottom-4 left-4 right-4 bg-orange-500/90 backdrop-blur-md text-white px-4 py-2 rounded-xl text-[10px] font-black text-center uppercase tracking-widest">
                      Stok Terbatas: {item.stock} Tersisa
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-black text-slate-800 mb-2 leading-tight group-hover:text-indigo-600 transition-colors">{item.name}</h3>
                  <p className="text-slate-500 font-medium text-sm mb-6 line-clamp-2 leading-relaxed">{item.description}</p>
                  
                  <div className="flex items-end justify-between mb-6">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Harga Sewa</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm font-black text-indigo-600">Rp</span>
                        <span className="text-3xl font-black text-slate-900">{item.price.toLocaleString('id-ID')}</span>
                      </div>
                    </div>
                    <div className="bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-2">
                        <Package size={14} className={item.stock > 0 ? 'text-emerald-500' : 'text-rose-500'} />
                        <span className={`text-xs font-black ${item.stock > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {item.stock > 0 ? 'Tersedia' : 'Habis'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => window.open(`https://wa.me/${waNumber.replace(/\D/g, '')}?text=Halo Bimbel Cerdas, saya ingin bertanya tentang penyewaan: ${item.name}`, '_blank')}
                    className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black hover:bg-indigo-600 transition-all shadow-xl hover:shadow-indigo-100 flex items-center justify-center gap-3 active:scale-95"
                  >
                    <Phone size={18} /> Hubungi via WhatsApp
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-[3rem] shadow-xl shadow-slate-100 border border-slate-100 animate-fade-in">
            <div className="h-24 w-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8">
              <Search size={40} className="text-slate-300" />
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-4">Koleksi Tidak Ditemukan</h3>
            <p className="text-slate-500 font-medium text-lg max-w-md mx-auto mb-10">
              Maaf, saat ini koleksi yang Anda cari belum tersedia. Silakan cek kategori lainnya.
            </p>
            <button 
              onClick={() => setCategory('all')} 
              className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100"
            >
              Lihat Semua Koleksi
            </button>
          </div>
        )}
      </div>
    </div>
  )
}