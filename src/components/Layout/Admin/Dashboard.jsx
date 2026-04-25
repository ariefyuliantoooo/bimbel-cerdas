import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Dashboard() {
  const [stats, setStats] = useState({
    services: 0,
    testimonials: 0,
    team: 0,
    rentals: 0,
    registrations: 0,
    contacts: 0
  })

  useEffect(() => {
    fetchStats()
  }, [])

  async function fetchStats() {
    const tables = ['services', 'testimonials', 'team', 'rentals', 'registrations', 'contacts']
    const newStats = {}
    
    for (const table of tables) {
      const { count } = await supabase.from(table).select('*', { count: 'exact', head: true })
      newStats[table] = count || 0
    }
    
    setStats(newStats)
  }

  const statCards = [
    { name: 'Layanan', value: stats.services, icon: '📚', color: 'bg-blue-500' },
    { name: 'Testimoni', value: stats.testimonials, icon: '⭐', color: 'bg-yellow-500' },
    { name: 'Tim Pengajar', value: stats.team, icon: '👥', color: 'bg-green-500' },
    { name: 'Sewa Baju', value: stats.rentals, icon: '👘', color: 'bg-purple-500' },
    { name: 'Pendaftaran', value: stats.registrations, icon: '📝', color: 'bg-orange-500' },
    { name: 'Pesan Masuk', value: stats.contacts, icon: '💬', color: 'bg-red-500' },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.name}</p>
                <p className="text-3xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} text-white text-2xl w-12 h-12 rounded-full flex items-center justify-center`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}