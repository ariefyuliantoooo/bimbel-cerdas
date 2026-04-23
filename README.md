# Bimbel Cerdas 🚀

Website modern dan dinamis untuk pusat bimbingan belajar "Bimbel Cerdas". Dibangun menggunakan React, Vite, Supabase, dan Tailwind CSS.

## 🛠️ Tech Stack
- **Frontend**: React + Vite
- **Styling**: Tailwind CSS + Lucide Icons + Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel Ready

## 🚀 Cara Menjalankan Secara Lokal

1. **Clone project** atau buka di VS Code.
2. **Install Dependensi**:
   ```bash
   npm install
   ```
3. **Konfigurasi Environment**:
   Edit file `.env.local` dan masukkan kredensial Supabase Anda:
   ```env
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
4. **Jalankan Aplikasi**:
   ```bash
   npm run dev
   ```
   Buka [http://localhost:5173](http://localhost:5173) di browser Anda.

## 🌍 Deployment ke Vercel

1. Hubungkan repository GitHub Anda ke Vercel.
2. Tambahkan Environment Variables di dashboard Vercel (`VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY`).
3. Vercel akan otomatis mendeteksi konfigurasi Vite dan men-deploy aplikasi Anda.

## 📂 Struktur Folder
- `src/components`: Komponen UI yang dapat digunakan kembali.
- `src/pages`: Halaman utama aplikasi (Home, Courses, Contact, About).
- `src/lib`: Konfigurasi library eksternal (Supabase).
- `public/images`: Aset gambar statis.

---
Dibuat dengan ❤️ oleh Antigravity.
