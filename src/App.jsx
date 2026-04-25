import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import HomePage from './pages/HomePage'
import RentalPage from './pages/RentalPage'
import DaftarPage from './pages/DaftarPage'
import KontakPage from './pages/KontakPage'
import LoginPage from './pages/LoginPage'
import AdminPage from './pages/AdminPage'
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import WhatsAppButton from './components/Layout/WhatsAppButton'

function App() {
  useEffect(() => {
    document.title = "Bimbel Cerdas - Bimbel SD, Mengaji & Sewa Baju Adat"
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Bimbingan belajar berkualitas untuk SD, program mengaji gratis, dan penyewaan baju adat/profesi terlengkap di Batam.')
    }
  }, [])

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Toaster position="top-right" />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sewa-baju" element={<RentalPage />} />
            <Route path="/daftar" element={<DaftarPage />} />
            <Route path="/kontak" element={<KontakPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin/*" element={<AdminPage />} />
          </Routes>
        </main>
        <WhatsAppButton />
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
