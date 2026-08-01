# WebDev Graphita — Website Grahita Indonesia

Website resmi Grahita Indonesia, dibangun dengan [Next.js](https://nextjs.org).

## Tech Stack

- **Framework:** Next.js 16 (Turbopack)
- **Database & Storage:** Supabase
- **Styling:** CSS Modules + Inline Styles
- **Deployment:** Hostinger

## Getting Started

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

---

## Changelog — WEB_GAS_1.3.0

### 1. Perbaikan Form Kontak — Honeypot False Positive & Validasi 1000 Kata

**Masalah 1 (Honeypot False Positive):** Honeypot anti-spam lama menggunakan `<input type="text" name="website">` dengan label "Website" yang disembunyikan via CSS. Browser autofill (Chrome/Edge) menganggapnya field valid dan mengisinya otomatis saat user mengetik nama/email yang sama dengan pengiriman sebelumnya. Akibatnya form dianggap bot → halaman langsung menampilkan "Pesan Terkirim!" **tanpa insert ke database** → pesan tidak muncul di admin.

**Masalah 2 (Validasi >1000 kata tidak berfungsi):** Check honeypot berada sebelum check word count. Karena honeypot terisi autofill, fungsi langsung `return` sebelum validasi kata dijalankan — sehingga pesan >1000 kata tetap menampilkan sukses tanpa error.

**Solusi:**
- Honeypot diubah menjadi `<input type="hidden" name="company_website">` — browser autofill tidak akan pernah mengisi field hidden, namun bot naif yang mengisi semua field tetap terdeteksi
- Tombol submit di-disable saat pesan >1000 kata (tampilan "Pesan Terlalu Panjang" dengan opacity 50%)
- Pesan error permanen ditampilkan di bawah textarea + border merah saat melebihi 1000 kata
- Error handling Supabase ditingkatkan — deteksi `error.code === "23514"` (constraint violation) dengan pesan spesifik per constraint
- `console.error` dengan detail error untuk memudahkan diagnosa

**File diubah:**
- `src/components/ContactForm.tsx` — Perbaikan honeypot, validasi word count, dan error handling

**File baru (migrasi database):**
- `supabase/022_fix_contact_validation.sql` — Perbaikan fungsi `fn_count_words` (mengembalikan 0 untuk input kosong, bukan NULL) + pastikan CHECK constraints aktif (idempotent)

### 2. Fitur Hapus Pesan di Admin Portal

**Masalah:** Admin tidak bisa menghapus pesan masuk di halaman `/portal/pesan` karena tidak ada RLS policy DELETE untuk tabel `contact_submissions` di database.

**Solusi:**
- Menambahkan RLS policy DELETE untuk admin di tabel `contact_submissions`
- Membuat server action `deletePesan(id)` dengan proteksi `requireAuth()`
- Menambahkan tombol Hapus (dengan konfirmasi) di halaman daftar pesan dan halaman detail pesan

**File baru:**
- `supabase/023_add_contact_delete_policy.sql` — RLS policy DELETE untuk admin
- `src/app/portal/(dashboard)/pesan/actions.ts` — Server action delete pesan

**File diubah:**
- `src/app/portal/(dashboard)/pesan/page.tsx` — Tombol Hapus di daftar pesan
- `src/app/portal/(dashboard)/pesan/[id]/page.tsx` — Tombol Hapus di halaman detail

---

## Changelog — WEB_GAS_1.2.8

### 1. Loading Skeleton & Halaman Loading

**Masalah:** Saat navigasi antar halaman (home, contact, dokumentasi), pengalaman pengguna terasa kosong tanpa indikasi loading.

**Solusi:** Dibuat komponen `PageSkeleton` reusable dengan animasi pulse dan spinner, digunakan di 3 halaman utama.

**File baru:**
- `src/components/LoadingSkeleton.tsx` — Komponen skeleton reusable dengan animasi pulse + spinner
- `src/app/loading.tsx` — Loading state untuk halaman home
- `src/app/contact/loading.tsx` — Loading state untuk halaman contact
- `src/app/dokumentasi/loading.tsx` — Loading state untuk halaman dokumentasi

### 2. Sortable Tables (useSort Hook)

**Masalah:** Tabel di portal admin tidak bisa diurutkan berdasarkan kolom, menyulitkan pencarian data ketika jumlah data sudah banyak.

**Solusi:** Dibuat custom hook `useSort` yang menyediakan sorting ascending/descending untuk semua tipe data (string, number, boolean) dengan locale Indonesia.

**File baru:**
- `src/hooks/useSort.ts` — Custom hook useSort dengan toggle direction dan sort indicator

**File diubah (menerapkan sortable tables):**
- `src/app/portal/(dashboard)/case-videos/page.tsx` — Sortable columns
- `src/app/portal/(dashboard)/dokumentasi/page.tsx` — Sortable columns
- `src/app/portal/(dashboard)/ekosistem/page.tsx` — Sortable columns
- `src/app/portal/(dashboard)/marketplace-links/page.tsx` — Sortable columns
- `src/app/portal/(dashboard)/social-links/page.tsx` — Sortable columns
- `src/app/portal/(dashboard)/testimoni/page.tsx` — Sortable columns
- `src/app/portal/(dashboard)/toko/page.tsx` — Sortable columns

### 3. Visual Refinements — Animasi & Hover Effects

**Perbaikan tampilan pada halaman About dan komponen global:**

**File diubah:**
- `src/app/about/page.tsx` — Menambahkan class `hover-glow-blue`, `hover-glow-gold`, `grid-item`, serta `animationDelay` pada setiap card filosofi nama, nilai inti, dan fokus dampak
- `src/app/globals.css` — Menambahkan:
  - Style dasar `.grid-item` dengan opacity & transform untuk scroll animation
  - Utility class `.hover-glow-blue` dan `.hover-glow-gold`
  - Animasi `@keyframes spin` untuk loading spinner
  - Class `.loading` dengan pulse animation

### 4. Portfolio Statistik — Menambahkan Photo Galleries

**Masalah:** Counter portofolio visual di StatsBar hanya menghitung articles + research_reports, belum termasuk photo_galleries.

**Solusi:** Menambahkan query count dari tabel `photo_galleries` (is_published = true) ke dalam total portofolio.

**File diubah:**
- `src/components/StatsBar.tsx` — Menambahkan `photo_galleries` count ke total portofolio

### 5. EcosystemHub — Cegah Duplikat Partner & Case Studies

**Masalah:** Data partner dan case studies di EcosystemHub bisa tampil duplikat jika ada data serupa di database.

**Solusi:** Menambahkan deduplikasi dengan `Map` berdasarkan kombinasi key unik.

**File diubah:**
- `src/components/EcosystemHub.tsx` — Filter duplikat partner (key: category + name) dan case studies (key: title + client + sector)

### 6. Security Headers — CSP, HSTS & More

**Masalah:** Website belum memiliki security headers untuk melindungi dari serangan XSS, clickjacking, dan MIME-type sniffing.

**Solusi:** Menambahkan security headers lengkap di `next.config.ts` melalui fungsi `headers()`.

**File diubah:**
- `next.config.ts` — Menambahkan:
  - Content-Security-Policy (CSP)
  - X-Frame-Options: DENY
  - X-Content-Type-Options: nosniff
  - Strict-Transport-Security (HSTS, max-age=2 tahun)
  - Referrer-Policy: strict-origin-when-cross-origin
  - Permissions-Policy (nonaktifkan camera, microphone, geolocation)

### 7. Perbaikan Minor

- `src/app/services/page.tsx` — Minor styling adjustment
- `src/components/CtaBand.tsx` — Button styling improvements
- `src/components/Footer.tsx` — Minor styling updates
- `src/components/Etos3T.tsx` — Minor styling updates
- `src/components/ContactForm.tsx` — Minor adjustment
- `src/app/page.tsx` — Lazy loading order refinement

---

## Changelog — WEB_GAS_1.2.9

### 1. Idle Timeout — Auto-Logout Portal Admin

**Masalah:** Sesi admin tetap aktif meskipun tidak ada aktivitas, meningkatkan risiko keamanan jika admin meninggalkan perangkat.

**Solusi:** Dibuat komponen `IdleTimeout` yang mendeteksi inactivity selama 30 menit, menampilkan warning modal 30 detik sebelum logout otomatis.

**File baru:**
- `src/components/IdleTimeout.tsx` — Client component dengan event listener (mousedown, keydown, mousemove, touchstart, scroll, click) untuk mereset timer, modal warning dengan tombol "Saya masih di sini" dan "Logout Sekarang"

**File diubah:**
- `src/app/portal/(dashboard)/layout.tsx` — Integrasi komponen `IdleTimeout` di layout dashboard

### 2. Responsive Navbar — Sembunyikan Admin Link di Layar Sedang

**Masalah:** Link "Admin" di navbar bertumpuk dengan menu lain pada layar 1200–1400px.

**Solusi:** Menambahkan media query untuk menyembunyikan `.navbar-admin-link` pada layar ≤1400px.

**File diubah:**
- `src/app/globals.css` — Menambahkan `@media (max-width: 1400px) { .navbar-admin-link { display: none !important; } }`

### 3. Portal Layout Refinements

**Perbaikan tata letak halaman portal untuk konsistensi dan keamanan.**

**File diubah:**
- `src/app/portal/layout.tsx` — Penyesuaian layout portal
- `src/app/portal/(dashboard)/layout.tsx` — Penambahan komentar dokumentasi dan import IdleTimeout

### 4. Proxy Improvements

**Peningkatan pada proxy server untuk menangani request dengan lebih baik.**

**File diubah:**
- `src/proxy.ts` — Perubahan signifikan (69 baris baru) untuk meningkatkan handling proxy

### 5. UI Component Updates

**Perbaikan minor pada beberapa komponen UI.**

**File diubah:**
- `src/components/ContactSection.tsx` — Penyesuaian section kontak
- `src/components/Footer.tsx` — Update styling footer
- `src/components/Navbar.tsx` — Penyesuaian navigasi
- `src/components/TestimonialsModal.tsx` — Perbaikan modal testimoni

---

## Changelog — WEB_GAS_1.2.7

### 1. Perbaikan Error "Unexpected end of form" (Next.js 16 + Turbopack)

**Masalah:** Form dengan `<input type="file">` di Server Component menyebabkan error `"Unexpected end of form"` dan `"Functions cannot be passed directly to Client Components"`.

**Solusi:** Semua form yang memiliki file upload diubah menjadi **Client Component** (`"use client"`). Server Action tetap dipanggil dari dalam Client Component.

**File baru:**
- `src/components/EditRisetForm.tsx` — Client component edit riset
- `src/components/EditTokoForm.tsx` — Client component edit toko
- `src/components/EditPublikasiForm.tsx` — Client component edit publikasi
- `src/components/CreateRisetForm.tsx` — Client component create riset
- `src/components/CreateTokoForm.tsx` — Client component create toko
- `src/components/CreatePublikasiForm.tsx` — Client component create publikasi

**File diubah:**
- `src/app/portal/(dashboard)/riset/[id]/edit/page.tsx`
- `src/app/portal/(dashboard)/riset/create/page.tsx`
- `src/app/portal/(dashboard)/toko/[id]/edit/page.tsx`
- `src/app/portal/(dashboard)/toko/create/page.tsx`
- `src/app/portal/(dashboard)/publikasi/[id]/edit/page.tsx`
- `src/app/portal/(dashboard)/publikasi/create/page.tsx`

### 2. Validasi Ukuran File di Client-Side

**Masalah:** Upload file > 10MB (misal 20MB) gagal tanpa peringatan apapun.

**Solusi:** Validasi ukuran file dilakukan di browser sebelum form dikirim. Jika melebihi batas, muncul pesan error merah dan form tidak dikirim.

**Batas ukuran:**
- PDF (Riset & Publikasi): **maks 10 MB**
- Image (Toko): **maks 5 MB**

**File diubah:**
- `src/app/portal/(dashboard)/publikasi/ArticleFormatSelector.tsx` — Validasi + label "maks 10MB"

### 3. Perbaikan Binding Server Action

**Masalah:** Penggunaan `.bind(null, id)` pada form action menyebabkan error di Next.js 16.

**Solusi:** Semua form edit yang tidak punya file upload menggunakan **hidden input** (`<input type="hidden" name="id" value={id} />`) dan memanggil server action langsung tanpa binding.

**File diubah:**
- `src/app/portal/(dashboard)/riset/actions.ts`
- `src/app/portal/(dashboard)/toko/actions.ts`
- `src/app/portal/(dashboard)/publikasi/actions.ts`
- `src/app/portal/(dashboard)/marketplace-links/actions.ts`
- `src/app/portal/(dashboard)/marketplace-links/[id]/edit/page.tsx`
- `src/app/portal/(dashboard)/case-videos/actions.ts`
- `src/app/portal/(dashboard)/case-videos/[id]/edit/page.tsx`
- `src/app/portal/(dashboard)/social-links/actions.ts`
- `src/app/portal/(dashboard)/social-links/[id]/edit/page.tsx`
- `src/app/portal/(dashboard)/testimoni/actions.ts`
- `src/app/portal/(dashboard)/testimoni/[id]/edit/page.tsx`
- `src/app/portal/(dashboard)/ekosistem/actions.ts`
- `src/app/portal/(dashboard)/ekosistem/case-studies/[id]/edit/page.tsx`
- `src/app/portal/(dashboard)/ekosistem/partners/[id]/edit/page.tsx`

### 4. Storage Policies & Migration

**File baru:**
- `supabase/019_setup_all_storage_policies.sql` — SQL migration untuk storage policies

### 5. Optimasi Preload CSS Warning

**Masalah:** Warning `"The resource was preloaded using link preload but not used"` untuk CSS chunk.

**Solusi:** Konfigurasi `next.config.ts` dioptimasi untuk mengurangi preload CSS yang tidak terpakai.

**File diubah:**
- `next.config.ts`

### 6. Cleanup

- `src/lib/supabase/upload.ts` — Dihapus (deprecated, digantikan `fileUpload.ts`)
- `src/components/EditFormWrapper.tsx` — Dihapus (tidak jadi dipakai)

---

## Changelog — WEB_GAS_1.2.6

...

*(Changelog sebelumnya tidak diubah dan tetap tersimpan)*