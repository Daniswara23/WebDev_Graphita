-- ============================================================
-- SEED DATA — PT Grahita Adhi Sasmita (GAS)
-- Data awal yang diambil dari mock data di komponen React.
-- Jalankan SETELAH schema.sql berhasil dijalankan.
-- ============================================================


-- ─────────────────────────────────────────────────────────────
-- 1. STATS
-- ─────────────────────────────────────────────────────────────
INSERT INTO stats (number_text, label, sort_order) VALUES
  ('50+',   'Portofolio visual',   1),
  ('12',    'Tahun pengalaman',    2),
  ('98%',   'Kepuasan mitra',      3),
  ('$10M+', 'Dampak bisnis nyata', 4);


-- ─────────────────────────────────────────────────────────────
-- 2. HOME_SERVICES
-- icon_key dipetakan ke SVG di Services.tsx (tidak disimpan di DB)
-- ─────────────────────────────────────────────────────────────
INSERT INTO home_services (num, title, description, icon_key, sort_order) VALUES
  ('01', 'Strategi ESG & Keberlanjutan',
   'Menyusun peta jalan ESG yang selaras dengan strategi bisnis jangka panjang perusahaan.',
   'layers', 1),

  ('02', 'Pelaporan & Pengukuran SDG',
   'Membangun sistem pemantauan SDG yang terukur, transparan, dan siap untuk audit eksternal.',
   'clock', 2),

  ('03', 'Jejak Karbon & Strategi Net Zero',
   'Menghitung emisi karbon serta merancang strategi dekarbonisasi menuju target net zero.',
   'grid', 3),

  ('04', 'Pelatihan & Penguatan Kapasitas',
   'Menyelenggarakan program pelatihan keberlanjutan untuk meningkatkan kesiapan tim internal.',
   'users', 4),

  ('05', 'Due Diligence Keberlanjutan',
   'Melakukan analisis risiko dan peluang keberlanjutan dalam proses investasi dan akuisisi.',
   'pulse', 5),

  ('06', 'Energi Terbarukan & Efisiensi',
   'Memberikan konsultasi transisi energi serta peningkatan efisiensi operasional secara terukur.',
   'sun', 6);


-- ─────────────────────────────────────────────────────────────
-- 3. SERVICE_DETAILS (halaman /services)
-- ─────────────────────────────────────────────────────────────
INSERT INTO service_details (title, description, features, sort_order) VALUES
  (
    'Kajian Pemetaan Terpadu',
    'Analisis komprehensif yang mencakup tiga dimensi utama: psikososial, ekonomi, dan lingkungan. Kami membantu organisasi memahami kompleksitas tantangan keberlanjutan melalui pendekatan holistik.',
    ARRAY['Assessment psikososial komunitas', 'Analisis dampak ekonomi lokal', 'Evaluasi kondisi lingkungan'],
    1
  ),
  (
    'Pendampingan Organisasi & SDM',
    'Pengembangan kapasitas organisasi melalui perancangan rencana strategis yang adaptif dan program peningkatan kinerja tim yang berkelanjutan.',
    ARRAY['Perancangan strategi adaptif', 'Capacity building tim', 'Change management'],
    2
  ),
  (
    'Pengembangan Potensi Lokal',
    'Implementasi model tekno-sosial dan pengembangan mata pencaharian yang ramah lingkungan untuk meningkatkan kesejahteraan masyarakat lokal.',
    ARRAY['Model tekno-sosial inovatif', 'Pengembangan UMKM lokal', 'Mata pencaharian berkelanjutan'],
    3
  ),
  (
    'Ekosistem Pangan ASLI',
    'Inisiasi program pangan yang Aman, Sehat, dan Lestari untuk membangun ketahanan pangan dan kesejahteraan masyarakat melalui pendekatan holistik.',
    ARRAY['Sistem pertanian berkelanjutan', 'Supply chain pangan lokal', 'Pendidikan nutrisi masyarakat'],
    4
  );


-- ─────────────────────────────────────────────────────────────
-- 4. CASE_STUDIES
-- ─────────────────────────────────────────────────────────────
INSERT INTO case_studies (title, client, challenge, solution, result, image_url, sort_order) VALUES
  (
    'Ringkasan Pendirian Perusahaan',
    'Didirikan 03 Februari 2026',
    'Perusahaan dibentuk untuk mendukung transformasi menuju praktik bisnis berkelanjutan.',
    'Kami berfokus pada integrasi SDGs dalam setiap layanan dan proyek yang kami jalankan.',
    'Komitmen terhadap tujuan SDGs untuk menciptakan dampak positif dan pertumbuhan berkelanjutan.',
    '/images/case1.jpg',
    1
  );


-- ─────────────────────────────────────────────────────────────
-- 5. PRODUCTS
-- ─────────────────────────────────────────────────────────────
INSERT INTO products (name, description, price, label, tokopedia_url, shopee_url, sort_order) VALUES
  (
    'Beras Organik Lokal',
    'Dari petani asli, tanpa pestisida, langsung siap masak.',
    'Rp 85.000/kg',
    'Best seller',
    'https://www.tokopedia.com/',
    'https://shopee.co.id/',
    1
  ),
  (
    'Gula Aren Tradisional',
    'Rasa alami, tekstur lembut, cocok untuk minuman dan kue.',
    'Rp 45.000/350g',
    'Terlaris',
    'https://www.tokopedia.com/',
    'https://shopee.co.id/',
    2
  ),
  (
    'Kopi Robusta Nusantara',
    'Aroma kuat, biji pilihan, dukung petani lokal.',
    'Rp 75.000/250g',
    'Asli Indonesia',
    'https://www.tokopedia.com/',
    'https://shopee.co.id/',
    3
  );


-- ─────────────────────────────────────────────────────────────
-- 6. ARTICLES
-- ─────────────────────────────────────────────────────────────
INSERT INTO articles (title, excerpt, category, published_at, sort_order) VALUES
  (
    'Keberdayaan Komunitas Lokal untuk Pertumbuhan Berkelanjutan',
    'Bagaimana strategi pemberdayaan komunitas dapat menciptakan lapangan kerja dan mendorong ekonomi lokal yang berkelanjutan.',
    'Keberdayaan',
    '2026-04-15',
    1
  ),
  (
    'ESG sebagai Strategi Kompetitif Bisnis Modern',
    'Perusahaan yang mengintegrasikan Environmental, Social, dan Governance tidak hanya menciptakan dampak sosial, tetapi juga keuntungan finansial jangka panjang.',
    'Keberlanjutan',
    '2026-04-12',
    2
  ),
  (
    'Transformasi Digital untuk Model Bisnis Berkelanjutan',
    'Teknologi menjadi enabler utama dalam menciptakan solusi keberlanjutan yang scalable dan terukur di era digital.',
    'Keberlanjutan',
    '2026-04-08',
    3
  ),
  (
    'Net Zero Roadmap: Panduan Menuju Emisi Karbon Nol',
    'Strategi langkah demi langkah yang dapat diimplementasikan perusahaan untuk mencapai target net zero emissions.',
    'Keberlanjutan',
    '2026-04-05',
    4
  );


-- ─────────────────────────────────────────────────────────────
-- 7. RESEARCH_REPORTS
-- ─────────────────────────────────────────────────────────────
INSERT INTO research_reports (title, subtitle, year, category, sort_order) VALUES
  (
    'Studi Dampak Program CSR terhadap Kesejahteraan Masyarakat',
    'Riset Kualitatif dan Kuantitatif di 5 Kabupaten Indonesia',
    2026,
    'Ilmu Pengetahuan Sosial',
    1
  ),
  (
    'Analisis Potensi Ekonomi Sirkular di Sektor Pertanian Indonesia',
    'Peluang dan Tantangan Implementasi Circular Economy Model',
    2026,
    'Ilmu Pengetahuan Sosial',
    2
  ),
  (
    'Pemetaan Ekosistem Pangan Lokal dan Strategi Keamanan Pangan',
    'Studi Kasus Implementasi Program ASLI di Komunitas Petani',
    2025,
    'Ilmu Pengetahuan Sosial',
    3
  ),
  (
    'Pengaruh Pendampingan SDM terhadap Peningkatan Kinerja Organisasi',
    'Meta-Analysis dari 20 Organisasi di Wilayah Indonesia Timur',
    2025,
    'Ilmu Pengetahuan Sosial',
    4
  );


-- ─────────────────────────────────────────────────────────────
-- 8. STANDARDS (Etos3T — "Cara kami bekerja")
-- ─────────────────────────────────────────────────────────────
INSERT INTO standards (title, description, details, sort_order) VALUES
  (
    'Mengenal Diriku',
    'Kami mulai dengan mendengar dan memahami konteks tim Anda. Bukan sekadar data, tetapi cerita yang memberi arah pada setiap opsi.',
    'Kami melakukan deep dive untuk memahami nilai-nilai, tantangan, dan visi organisasi Anda. Setiap insight diterjemahkan menjadi strategi yang relevan dan implementatif untuk sustainability journey Anda.',
    1
  ),
  (
    'Proses yang Ringkas',
    'Tak ada jargon yang bikin bingung. Langkah kami dibuat sederhana, ramah, dan mudah diikuti untuk semua pihak.',
    'Metodologi kami dirancang untuk transparency dan engagement. Setiap fase dijelaskan dengan jelas, milestones dimonitor bersama, dan feedback loops memastikan alignment maksimal dengan kebutuhan Anda.',
    2
  ),
  (
    'Hasil yang Terlihat',
    'Setiap rekomendasi disajikan sebagai sesuatu yang bisa ditinjau dan digunakan, bukan hanya sebagai laporan tebal di rak.',
    'Deliverables kami actionable, terukur, dan siap implementasi. Dari roadmap strategis hingga toolkit operasional, semua dirancang untuk memberikan impact nyata dan sustainable value bagi organisasi Anda.',
    3
  );


-- ─────────────────────────────────────────────────────────────
-- 9. TESTIMONIALS
-- ─────────────────────────────────────────────────────────────
INSERT INTO testimonials (quote, author, company, sort_order) VALUES
  (
    'GAS membantu kami mentransformasi pelaporan ESG dari proses yang tidak terstruktur menjadi sistem yang siap audit dalam waktu kurang dari 6 bulan.',
    'Dr. Rina S., Direktur Keberlanjutan',
    'PT Energi Nasional',
    1
  ),
  (
    'Pendekatan strategis mereka dalam menyusun peta jalan net zero memberikan arah yang jelas sekaligus dampak finansial yang terukur bagi perusahaan.',
    'Budi A., Kepala CSR',
    'Astra Agro Lestari',
    2
  ),
  (
    'Solusi SDG yang diberikan tidak hanya konseptual, tetapi juga dapat langsung diimplementasikan dalam operasional sehari-hari.',
    'Sari L., Manajer Operasional',
    'PT Tambang Berkelanjutan',
    3
  );
