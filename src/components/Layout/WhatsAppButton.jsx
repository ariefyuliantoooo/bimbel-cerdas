import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { MessageCircle, PhoneCall } from 'lucide-react'

export default function WhatsAppButton() {
  const [waNumber, setWaNumber] = useState('6285272123300')
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    async function fetchSettings() {
      const { data } = await supabase.from('settings').select('*').eq('key', 'wa_number').single()
      if (data) {
        setWaNumber(data.value.replace(/[^0-9]/g, ''))
      }
    }
    fetchSettings()

    const timer = setTimeout(() => setShowTooltip(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed bottom-10 right-10 z-[60] flex flex-col items-end gap-4">
      {showTooltip && (
        <div className="bg-white px-6 py-3 rounded-2xl shadow-2xl border border-slate-100 animate-fade-in relative mb-2">
          <div className="absolute bottom-0 right-6 translate-y-1/2 rotate-45 w-4 h-4 bg-white border-r border-b border-slate-100"></div>
          <p className="text-sm font-black text-slate-800 whitespace-nowrap">
            Butuh Bantuan? Chat Kami Yuk! 👋
          </p>
        </div>
      )}
      
      <a
        href={`https://wa.me/${waNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="h-16 w-16 bg-emerald-500 text-white rounded-full shadow-[0_20px_50px_rgba(16,185,129,0.3)] hover:bg-emerald-600 transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center relative group"
        aria-label="Chat via WhatsApp"
      >
        <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-20"></div>
        <MessageCircle size={32} className="relative z-10" />
        
        <span className="absolute right-full mr-4 bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          WhatsApp Fast Response
        </span>
      </a>
    </div>
  )
}