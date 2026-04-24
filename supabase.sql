-- Supabase SQL Schema for Bimbel Cerdas

-- 1. Create Tables
CREATE TABLE IF NOT EXISTS public.settings (
    id SERIAL PRIMARY KEY,
    key VARCHAR(255) UNIQUE NOT NULL,
    value TEXT NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS public.services (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.testimonials (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    occupation VARCHAR(255),
    message TEXT NOT NULL,
    rating INTEGER DEFAULT 5,
    image_url TEXT,
    is_approved BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.team (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    expertise TEXT,
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.rentals (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL, -- 'Baju Adat', 'Baju Profesi'
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    size VARCHAR(50),
    stock INTEGER DEFAULT 1,
    image_url TEXT,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.registrations (
    id SERIAL PRIMARY KEY,
    student_name VARCHAR(255) NOT NULL,
    parent_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    school VARCHAR(255),
    grade VARCHAR(50),
    program VARCHAR(255),
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Insert Initial Data
INSERT INTO public.settings (key, value, description) VALUES
    ('wa_number', '6286765347621', 'Nomor WhatsApp Admin (gunakan format 62...)'),
    ('email', 'cahyantriwulandari87@gmail.com', 'Email Utama Bimbel'),
    ('facebook_url', 'https://facebook.com/bimbelcerdas', 'URL Facebook Page'),
    ('spp_price', '100000', 'Biaya SPP Bimbel per Bulan'),
    ('hero_title', 'Raih Prestasi Terbaik Bersama Bimbel Cerdas', 'Judul Utama di Beranda'),
    ('hero_subtitle', 'Metode pembelajaran inovatif dan tutor berpengalaman untuk mengoptimalkan potensi akademismu.', 'Sub-judul di Beranda'),
    ('hero_image', '', 'URL Gambar Hero')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

INSERT INTO public.services (title, description, icon) VALUES
    ('Pendampingan Belajar', 'Bimbingan intensif untuk semua mata pelajaran sekolah dengan metode yang menyenangkan.', 'BookOpen'),
    ('Persiapan Ujian', 'Program khusus persiapan Ujian Sekolah dan Seleksi Masuk Perguruan Tinggi Negeri.', 'GraduationCap'),
    ('Konsultasi PR', 'Bantuan penyelesaian tugas sekolah dengan penjelasan yang mudah dipahami.', 'PenTool')
ON CONFLICT DO NOTHING;

-- 3. Row Level Security (RLS)
-- Aktifkan RLS
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rentals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Kebijakan untuk Public (Read Only untuk yang perlu, Insert untuk yang perlu)
CREATE POLICY "Public read settings" ON public.settings FOR SELECT USING (true);
CREATE POLICY "Public read active services" ON public.services FOR SELECT USING (is_active = true);
CREATE POLICY "Public read approved testimonials" ON public.testimonials FOR SELECT USING (is_approved = true);
CREATE POLICY "Public read active team" ON public.team FOR SELECT USING (is_active = true);
CREATE POLICY "Public read available rentals" ON public.rentals FOR SELECT USING (is_available = true);

-- Public insert policies
CREATE POLICY "Public insert testimonials" ON public.testimonials FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert registrations" ON public.registrations FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert contacts" ON public.contacts FOR INSERT WITH CHECK (true);

-- Kebijakan untuk Admin (Semua akses)
CREATE POLICY "Admin all settings" ON public.settings TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all services" ON public.services TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all testimonials" ON public.testimonials TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all team" ON public.team TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all rentals" ON public.rentals TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all registrations" ON public.registrations TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all contacts" ON public.contacts TO authenticated USING (true) WITH CHECK (true);

-- 4. Storage Bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('bimbel_images', 'bimbel_images', true) ON CONFLICT DO NOTHING;

-- Storage Policies
CREATE POLICY "Public view images" ON storage.objects FOR SELECT USING ( bucket_id = 'bimbel_images' );
CREATE POLICY "Admin manage images" ON storage.objects TO authenticated USING ( bucket_id = 'bimbel_images' ) WITH CHECK ( bucket_id = 'bimbel_images' );
