-- =====================================================
-- AUTO SEED DATABASE BIMBEL CERDAS
-- Jalankan dari terminal dengan psql
-- =====================================================

-- Hapus tabel yang ada (urutan terbalik karena foreign key)
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS contacts CASCADE;
DROP TABLE IF EXISTS registrations CASCADE;
DROP TABLE IF EXISTS rentals CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS team CASCADE;
DROP TABLE IF EXISTS testimonials CASCADE;
DROP TABLE IF EXISTS settings CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- =====================================================
-- BUAT TABEL
-- =====================================================

-- 1. Users (Admin)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Settings
CREATE TABLE settings (
    id SERIAL PRIMARY KEY,
    key VARCHAR(100) UNIQUE NOT NULL,
    value TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Services
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    icon VARCHAR(50),
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Testimonials
CREATE TABLE testimonials (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    occupation VARCHAR(100),
    image_url TEXT,
    rating INT DEFAULT 5,
    message TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Team
CREATE TABLE team (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(100),
    expertise TEXT,
    image_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Rentals
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Registrations
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. Contacts
CREATE TABLE contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 9. Bookings
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    rental_id INT REFERENCES rentals(id),
    customer_name VARCHAR(100) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    booking_date DATE NOT NULL,
    return_date DATE NOT NULL,
    quantity INT DEFAULT 1,
    total_price INT,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- ISI DATA (SEED)
-- =====================================================

-- Admin
INSERT INTO users (username, password, full_name) VALUES 
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Administrator');

-- Settings
INSERT INTO settings (key, value) VALUES
('wa_number', '+6285272123300'),
('wa_secondary', '+6285765347621'),
('email', 'cahyantriwulandari87@gmail.com'),
('facebook_url', 'https://facebook.com/bimbelcerdas'),
('instagram_url', 'https://instagram.com/bimbelcerdas'),
('youtube_url', 'https://youtube.com/bimbelcerdas'),
('spp_price', '100000'),
('hero_title', 'Bimbingan Belajar Berkualitas untuk Anak Anda'),
('hero_subtitle', 'Bimbel khusus SD, mengaji gratis, dan penyewaan baju adat/profesi'),
('hero_image', '/images/hero-bg.jpg'),
('logo_image', '/images/logo.png'),
('about_text', 'Bimbel Cerdas hadir untuk membantu siswa SD memahami pelajaran dengan metode yang menyenangkan, sekaligus membangun karakter islami melalui program mengaji gratis.');

-- Services
INSERT INTO services (icon, title, description, is_active) VALUES
('📚', 'Bimbel SD Reguler', 'Kelas bimbingan belajar untuk semua mata pelajaran SD kelas 1-6', TRUE),
('🌙', 'Mengaji Gratis', 'Program belajar mengaji Al-Qur''an untuk anak-anak', TRUE),
('👥', 'Pengajar Berkualitas', 'Didampingi oleh guru-guru berpengalaman', TRUE),
('🛍️', 'Sewa Baju', 'Penyewaan baju adat dan profesi untuk kebutuhan pentas sekolah', TRUE);

-- Testimonials
INSERT INTO testimonials (name, occupation, message, rating, is_approved) VALUES
('Bapak Iqrom', 'Pengusaha Nasional', 'Anak saya yang tadinya kesulitan matematika sekarang lebih percaya diri!', 5, TRUE),
('Mas Jee', 'Karyawan', 'Program mengajinya sangat bagus, anak saya sudah lancar membaca Iqro', 5, TRUE),
('Bang Anton', 'Kontraktor', 'Sering menyewa baju adat di sini, kualitasnya bagus dan harganya terjangkau', 5, TRUE);

-- Team
INSERT INTO team (name, role, expertise, is_active) VALUES
('Athirah Chamatha', 'Pengajar Tahfidz', 'Hafalan Juz 30, Metode Tilawati', TRUE),
('Bunda Cahyantri Wulandari', 'Guru Bimbel & Mengaji', 'Matematika, IPA, Bahasa Indonesia, Iqro', TRUE),
('Ustadz Ahmad Fauzi', 'Guru Mengaji', 'Tahsin, Tajwid, Hafalan Doa Harian', TRUE),
('Ibu Dewi Sartika', 'Guru Bimbel', 'Bahasa Inggris, IPS, SBdP', TRUE),
('Pak Rahmat Hidayat', 'Guru Matematika', 'Olimpiade Matematika SD, Logika Dasar', TRUE),
('Kak Siska Amelia', 'Guru Mengaji & Seni', 'Kaligrafi, Mewarnai, Juz Amma', TRUE);

-- Rentals
INSERT INTO rentals (name, category, price, description, size, stock, is_available) VALUES
('Baju Polwan', 'profesi', 45000, 'Seragam polisi wanita lengkap dengan topi', 'L', 2, TRUE),
('Baju Adat Nusantara', 'adat', 45000, 'Baju adat Nusantara lengkap dengan aksesoris', 'M,L', 3, TRUE),
('Baju Perawat', 'profesi', 40000, 'Seragam perawat lengkap dengan topi dan stetoskop', 'M,L', 2, TRUE),
('Baju Adat Jawa', 'adat', 50000, 'Baju adat Jawa lengkap dengan jarik dan blangkon', 'M,L', 3, TRUE),
('Baju Dokter', 'profesi', 45000, 'Jas dokter lengkap dengan stetoskop', 'L', 2, TRUE),
('Baju Pilot', 'profesi', 50000, 'Seragam pilot lengkap dengan topi dan dasi', 'S,M,L', 2, TRUE),
('Baju Adat Bali', 'adat', 55000, 'Baju adat Bali lengkap dengan mahkota dan selendang', 'M,L', 2, TRUE);

SELECT '✅ DATABASE BERHASIL DIBUAT!' as status;
SELECT COUNT(*) as total_users FROM users;
SELECT COUNT(*) as total_services FROM services;
SELECT COUNT(*) as total_rentals FROM rentals;