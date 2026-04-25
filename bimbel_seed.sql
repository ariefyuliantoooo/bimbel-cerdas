-- =====================================================
-- DATABASE BIMBEL CERDAS - SUPABASE POSTGRESQL
-- =====================================================

-- DROP TABLES (urutan terbalik karena foreign key)
DROP TABLE IF EXISTS contacts CASCADE;
DROP TABLE IF EXISTS registrations CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS rentals CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS team CASCADE;
DROP TABLE IF EXISTS testimonials CASCADE;
DROP TABLE IF EXISTS settings CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- 1. TABEL USERS (Admin)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Insert admin (password: admin123)
INSERT INTO users (username, password) VALUES 
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- 2. TABEL SETTINGS (Pengaturan Website)
CREATE TABLE settings (
    id SERIAL PRIMARY KEY,
    key VARCHAR(100) UNIQUE NOT NULL,
    value TEXT,
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert default settings
INSERT INTO settings (key, value) VALUES
('wa_number', '+6285765347621'),
('wa_secondary', '+6285272123300'),
('email', 'cahyantriwulandari87@gmail.com'),
('facebook_url', 'https://facebook.com/bimbelcerdas'),
('instagram_url', 'https://instagram.com/bimbelcerdas'),
('youtube_url', 'https://youtube.com/bimbelcerdas'),
('spp_price', '100000'),
('hero_title', 'Bimbingan Belajar Berkualitas untuk Anak Anda'),
('hero_subtitle', 'Bimbel khusus SD, mengaji gratis, dan penyewaan baju adat/profesi untuk kebutuhan sekolah'),
('hero_image', '/images/hero-bg.jpg'),
('about_text', 'Bimbel Cerdas hadir untuk membantu siswa SD memahami pelajaran dengan metode yang menyenangkan, sekaligus membangun karakter islami melalui program mengaji gratis.');

-- 3. TABEL SERVICES (Layanan)
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    icon VARCHAR(50),
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO services (icon, title, description) VALUES
('📚', 'Bimbel SD Reguler', 'Kelas bimbingan belajar untuk semua mata pelajaran SD kelas 1-6 dengan metode belajar yang menyenangkan'),
('🌙', 'Mengaji Gratis', 'Program belajar mengaji Al-Qur''an dengan metode yang mudah dipahami anak'),
('👥', 'Pengajar Berkualitas', 'Didampingi oleh guru-guru berpengalaman dan berkompeten di bidangnya'),
('🛍️', 'Sewa Baju', 'Penyewaan baju adat dan profesi untuk kebutuhan pentas sekolah');

-- 4. TABEL TESTIMONIALS
CREATE TABLE testimonials (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    occupation VARCHAR(100),
    image_url TEXT,
    rating INT DEFAULT 5,
    message TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO testimonials (name, occupation, message, rating) VALUES
('Bapak Iqrom', 'Pengusaha Nasional', 'Anak saya yang tadinya kesulitan matematika sekarang lebih percaya diri dan nilainya meningkat signifikan setelah ikut bimbel di sini.', 5),
('Mas Jee', 'Karyawan Perusahaan Besar', 'Program mengajinya sangat bagus, anak saya sekarang sudah lancar membaca Iqro dan mulai belajar Al-Qur''an.', 5),
('Bang Anton', 'Kontraktor', 'Sering menyewa baju adat untuk pentas sekolah di sini. Kualitas bajunya bagus dan harganya terjangkau.', 5);

-- 5. TABEL TEAM (Pengajar)
CREATE TABLE team (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(100),
    expertise TEXT,
    image_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO team (name, role, expertise) VALUES
('Athirah Chamatha', 'Pengajar Tahfidz', 'Tahfidz Quran, Hafalan Juz 30'),
('Bunda Cahyantri Wulandari', 'Guru Bimbel & Mengaji', 'Matematika, IPA, Bahasa Indonesia, Iqro'),
('Ustadz Ahmad Fauzi', 'Guru Mengaji', 'Tahsin, Tajwid, Hafalan Doa Harian'),
('Ibu Dewi Sartika', 'Guru Bimbel', 'Bahasa Inggris, IPS, SBdP');

-- 6. TABEL RENTALS (Sewa Baju)
CREATE TABLE rentals (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    price INT NOT NULL,
    description TEXT,
    size VARCHAR(10) DEFAULT 'ALL',
    stock INT DEFAULT 1,
    image_url TEXT,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO rentals (name, category, price, description, stock) VALUES
('Baju Polwan', 'profesi', 45000, 'Seragam polisi wanita lengkap dengan topi dan aksesoris', 2),
('Baju Adat Nusantara', 'adat', 45000, 'Baju adat Nusantara lengkap dengan aksesoris', 3),
('Baju Perawat', 'profesi', 40000, 'Seragam perawat lengkap dengan topi dan stetoskop', 2),
('Baju Adat Jawa', 'adat', 50000, 'Baju adat Jawa lengkap dengan jarik dan blangkon', 3),
('Baju Dokter', 'profesi', 45000, 'Jas dokter lengkap dengan stetoskop', 2);

-- 7. TABEL REGISTRATIONS (Pendaftaran Siswa)
CREATE TABLE registrations (
    id SERIAL PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL,
    parent_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    school VARCHAR(100),
    grade VARCHAR(20),
    program VARCHAR(50),
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW()
);

-- 8. TABEL CONTACTS (Pesan Kontak)
CREATE TABLE contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- CEK HASIL
SELECT '✅ Setup Database Selesai!' as status;
SELECT COUNT(*) as total_services FROM services;
SELECT COUNT(*) as total_testimonials FROM testimonials;
SELECT COUNT(*) as total_team FROM team;
SELECT COUNT(*) as total_rentals FROM rentals;
