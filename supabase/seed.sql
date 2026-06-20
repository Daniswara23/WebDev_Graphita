-- ============================================================
-- SEED DATA — PT Grahita Adhi Sasmita (GAS)
-- Data awal yang diambil dari mock data di komponen React.
-- Jalankan SETELAH schema.sql berhasil dijalankan.
-- ============================================================

-- Hapus data lama sebelum insert data baru (hindari duplikasi)
DELETE FROM standards;
DELETE FROM testimonials;
DELETE FROM ecosystem_case_studies;
DELETE FROM ecosystem_partners;
DELETE FROM research_reports;
DELETE FROM articles;
DELETE FROM products;
DELETE FROM case_studies;
DELETE FROM service_details;
DELETE FROM home_services;
DELETE FROM stats;


-- ─────────────────────────────────────────────────────────────
-- 1. STATS
-- ─────────────────────────────────────────────────────────────
INSERT INTO stats (number_text, label, sort_order) VALUES
  ('12',    'Tahun pengalaman',    1);


-- ─────────────────────────────────────────────────────────────
-- 2. HOME_SERVICES
-- icon_key dipetakan ke SVG di Services.tsx (tidak disimpan di DB)
-- ─────────────────────────────────────────────────────────────
INSERT INTO home_services (num, title, description, icon_key, sort_order) VALUES
  ('01', 'Riset & Pemetaan Sosial Terintegrasi',
   'Menganalisis kondisi psikososial, ekonomi, dan lingkungan secara holistik untuk menghasilkan data dan pemetaan yang dapat diandalkan.',
   'barChart', 1),

  ('02', 'Perencanaan Strategis & Konsultasi Keberlanjutan',
   'Mendampingi organisasi menyusun rencana strategis adaptif yang selaras dengan tujuan keberlanjutan jangka panjang.',
   'checkCircle', 2),

  ('03', 'Pengembangan Kapasitas & Pemberdayaan Komunitas',
   'Meningkatkan kompetensi SDM dan memberdayakan komunitas melalui program pelatihan, workshop, dan pendampingan berkelanjutan.',
   'userGroup', 3),

  ('04', 'Fasilitasi Kolaborasi Multipihak',
   'Menjembatani kerja sama antara penyandang dana, mitra teknis, pemerintah, dan organisasi sosial untuk menciptakan dampak yang lebih luas.',
   'network', 4),

  ('05', 'Publikasi & Diseminasi Ilmu Pengetahuan',
   'Menerbitkan dan menyebarluaskan hasil riset, laporan dampak, serta publikasi ilmiah untuk mendukung pengambilan kebijakan berbasis bukti.',
   'documentText', 5);


-- ─────────────────────────────────────────────────────────────
-- 3. SERVICE_DETAILS (halaman /services)
-- ─────────────────────────────────────────────────────────────
INSERT INTO service_details (title, description, features, sort_order) VALUES
  (
    'Riset & Pemetaan Sosial Terintegrasi',
    'Layanan kajian komprehensif yang menggabungkan analisis psikososial, ekonomi, dan lingkungan untuk menghasilkan data terukur serta pemetaan berbasis bukti — dasar pengambilan kebijakan yang lebih tepat.',
    ARRAY['Pemetaan psikososial & ekonomi lokal', 'Analisis dampak lingkungan berbasis data', 'Laporan riset siap pakai untuk kebijakan'],
    1
  ),
  (
    'Perencanaan Strategis & Konsultasi Keberlanjutan',
    'Pendampingan menyusun rencana strategis adaptif yang selaras dengan SDGs, mulai dari asesmen awal hingga implementasi dan evaluasi berkelanjutan.',
    ARRAY['Roadmap keberlanjutan perusahaan', 'Konsultasi strategis adaptif berkelanjutan', 'Monitoring & evaluasi berbasis indikator'],
    2
  ),
  (
    'Pengembangan Kapasitas & Pemberdayaan Komunitas',
    'Program capacity building untuk SDM internal dan eksternal, termasuk pelatihan, workshop, dan pendampingan komunitas untuk meningkatkan daya saing dan kesejahteraan.',
    ARRAY['Pelatihan SDM & change management', 'Workshop pemberdayaan komunitas', 'Pendampingan berkelanjutan jangka panjang'],
    3
  ),
  (
    'Fasilitasi Kolaborasi Multipihak',
    'Menjembatani kerja sama antar stakeholders — penyandang dana, mitra teknis, pemerintah, dan organisasi sosial — agar setiap program berjalan efektif dan berdampak luas.',
    ARRAY['Kerjasama penyandang dana & mitra teknis', 'Kolaborasi dengan pemerintah & LSM', 'Memetakan ekosistem stakeholders'],
    4
  ),
  (
    'Publikasi & Diseminasi Ilmu Pengetahuan',
    'Memproduksi dan menerbitkan hasil riset, laporan dampak, publikasi ilmiah, serta infografis kreatif untuk mendukung penyebaran knowledge berbasis bukti.',
    ARRAY['Laporan tahunan dampak ESG', 'Publikasi ilmiah & policy brief', 'Infografis kreatif untuk publik'],
    5
  );


-- ─────────────────────────────────────────────────────────────
-- 4. CASE_STUDIES
-- ─────────────────────────────────────────────────────────────
INSERT INTO case_studies (title, client, challenge, solution, result, image_url, sort_order) VALUES
  (
    'Landasan Filosofi & Komitmen SDGs',
    'PT Grahita Adhi Sasmita — Didirikan 03 Februari 2026',
    'Menjawab kebutuhan akan partisipasi sektor swasta dalam mencerdaskan kehidupan bangsa dan mendukung kesejahteraan umum — berlandaskan Akta Pendirian Nomor 02.',
    'Kami menyelaraskan seluruh kegiatan usaha dengan Sustainable Development Goals (SDGs), fokus pada 3 pilar: Penguatan Pertumbuhan Ekonomi & Inovasi (SDG 8 & 9), Pengembangan Ilmu Pengetahuan & Pengurangan Kesenjangan (SDG 10 & 17), serta Peningkatan Kesejahteraan & Keadilan Sosial (SDG 1 & 3).',
    'Komitmen untuk menjadi sahabat yang menuju keberlanjutan yang maknawi — menciptakan pusaran kebaikan yang terus bertumbuh dan memberikan nilai tambah yang dapat diwariskan bagi generasi selanjutnya.',
    '/images/case1.jpg',
    1
  );


-- ─────────────────────────────────────────────────────────────
-- 5. PRODUCTS
-- ─────────────────────────────────────────────────────────────
INSERT INTO products (name, description, label, tokopedia_url, shopee_url, sort_order) VALUES
  (
    'Beras Organik Lokal',
    'Dari petani asli, tanpa pestisida, langsung siap masak.',
    'Best seller',
    'https://www.tokopedia.com/',
    'https://shopee.co.id/',
    1
  ),
  (
    'Gula Aren Tradisional',
    'Rasa alami, tekstur lembut, cocok untuk minuman dan kue.',
    'Terlaris',
    'https://www.tokopedia.com/',
    'https://shopee.co.id/',
    2
  ),
  (
    'Kopi Robusta Nusantara',
    'Aroma kuat, biji pilihan, dukung petani lokal.',
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
-- 8. STANDARDS (Etos3T — "Cara kami bekerja" → 3T: Tanggap, Tangguh, Tumbuh)
-- ─────────────────────────────────────────────────────────────
INSERT INTO standards (title, description, details, sort_order) VALUES
  (
    'Tanggap',
    'Peka terhadap situasi serta sigap merumuskan solusi yang relevan dengan perubahan yang terjadi.',
    'Kami selalu hadir dan peka terhadap kebutuhan serta dinamika yang berkembang. Setiap perubahan dianalisis secara cepat dan tepat, sehingga solusi yang ditawarkan selalu relevan dan kontekstual. Ketanggapan kami adalah fondasi untuk membangun kepercayaan dan kolaborasi yang solid.',
    1
  ),
  (
    'Tangguh',
    'Pantang surut saat menghadapi masalah, menjaga kejujuran dan kepercayaan, serta menyelesaikan setiap aktivitas dengan kesungguhan sesuai target.',
    'Komitmen kami tidak pernah goyah dalam menghadapi tantangan. Integritas dan kejujuran menjadi pegangan utama dalam setiap langkah. Setiap aktivitas dijalani dengan dedikasi penuh, memastikan hasil yang sesuai target dan melampaui harapan mitra.',
    2
  ),
  (
    'Tumbuh',
    'Senantiasa belajar hal-hal baru, menambah pengetahuan, dan berkembang bersama mitra untuk mencapai tujuan yang lebih maju dan berkualitas.',
    'Kami percaya bahwa pertumbuhan adalah perjalanan bersama. Setiap interaksi dengan mitra menjadi kesempatan untuk belajar dan berinovasi. Dengan semangat terus berkembang, kami bersama-sama menciptakan solusi yang lebih baik, lebih maju, dan lebih berdampak bagi semua.',
    3
  );


-- ─────────────────────────────────────────────────────────────
-- 9. ECOSYSTEM_PARTNERS (mitra kolaborasi)
-- ─────────────────────────────────────────────────────────────
INSERT INTO ecosystem_partners (category, name, description, icon_svg, sort_order) VALUES
  ('donor', 'Kementerian Lingkungan Hidup', 'Pendanaan Program CSR untuk inisiatif keberlanjutan nasional.', 'handHeart', 1),
  ('donor', 'UNDP Indonesia', 'Hibah internasional untuk program pengembangan manusia dan lingkungan.', 'handHeart', 2),
  ('donor', 'PT Sarana Multi Infrastruktur', 'Investasi hijau untuk proyek-proyek berkelanjutan.', 'handHeart', 3),

  ('technical', 'Institut Pertanian Bogor', 'Riset pangan lokal dan inovasi pertanian berkelanjutan.', 'microscope', 1),
  ('technical', 'ICSEL Consulting', 'Konsultan ahli di bidang keberlanjutan dan ESG.', 'microscope', 2),
  ('technical', 'Universitas Gadjah Mada', 'Penelitian psikososial masyarakat dan pengembangan kebijakan.', 'microscope', 3),

  ('government', 'Bappeda Provinsi Kalimantan', 'Perencanaan pembangunan daerah terpadu.', 'building', 1),
  ('government', 'Kementerian Kooperasi & UMKM', 'Pengembangan ekonomi usaha kecil dan menengah.', 'building', 2),
  ('government', 'LSM Gerakan Lingkungan', 'Advokasi dan aksi nyata untuk lingkungan hidup.', 'building', 3);


-- ─────────────────────────────────────────────────────────────
-- 10. ECOSYSTEM_CASE_STUDIES (studi kasus proyek)
-- ─────────────────────────────────────────────────────────────
INSERT INTO ecosystem_case_studies (title, client, sector, summary, impact, sort_order) VALUES
  (
    'Transformasi ESG di Sektor Pertambangan',
    'PT Tambang Berkelanjutan',
    'Mining & Energy',
    'Mendampingi perusahaan tambang dalam menyusun peta jalan keberlanjutan, mulai dari pengukuran emisi karbon hingga program pemberdayaan masyarakat sekitar.',
    'Pengurangan emisi 32% dalam 2 tahun dan 1.200 keluarga masyarakat mendapatkan akses pasar lokal.',
    1
  ),
  (
    'Ekosistem Pangan ASLI di Kalimantan Timur',
    'Dinas Pertanian Kaltim',
    'Pertanian',
    'Menginisiasi dan mengakselerasi program Pangan ASLI (Aman, Sehat, Lestari) melibatkan 500 petani lokal dan pembentukan supply chain berkelanjutan.',
    'Peningkatan pendapatan petani 45% dan pengurangan penggunaan pestisida kimia sebesar 60%.',
    2
  ),
  (
    'Pemetaan Sosial untuk Pembangunan Infrastruktur',
    'Kementerian PUPR',
    'Infrastruktur',
    'Melakukan kajian pemetaan psikososial dan ekonomi komunitas terdampak pembangunan jalan tol, merancang program mitigasi dan pemberdayaan.',
    '156 households terdampak mendapatkan kompensasi tepat waktu dan 85% keluhan masyarakat teratasi sebelum proyek rampung.',
    3
  );


-- ─────────────────────────────────────────────────────────────
-- 11. TESTIMONIALS
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
