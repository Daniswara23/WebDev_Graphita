# 🚀 Panduan Migrasi Supabase ke PT Grahita Adhi Sasmita

## Status: 🔧 Storage Buckets Setup (Perlu Dijalankan)

---

## Step 1: Buat Project Supabase Baru

1. Buka [Supabase Dashboard](https://supabase.com/dashboard)
2. Login dengan akun PT Grahita Adhi Sasmita
3. Klik **New Project**
4. Isi:
   - **Project Name**: `grahita-website` atau sesuai keinginan
   - **Database Password**: Simpan password ini di tempat aman
5. **PENTING - Security Settings**:
   - ❌ **Uncheck** "Automatically expose new tables"
   - ❌ **Uncheck** "Enable automatic RLS"
6. Pilih Region: **Asia-Pacific** (recommended)
7. Klik **Create New Project** (tunggu ~2 menit)

---

## Step 2: Dapatkan Credentials

Buka project baru → **Settings → API**

Copy nilai-nilai berikut:
- **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- **Anon (public) key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Service Role Key** → `SUPABASE_SERVICE_ROLE_KEY` (untuk migrasi data)

---

## Step 3: Update .env.local

Buka file `.env.local` dan ganti:
```env
NEXT_PUBLIC_SUPABASE_URL="https://YOUR-NEW-PROJECT.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR-ANON-KEY"
```

---

## Step 4: Jalankan SQL Schema

Buka **SQL Editor** di dashboard Supabase baru → **New Query**

### 4.1. Jalankan schema.sql (urut)
```sql
-- Copy-paste seluruh isi supabase/schema.sql ke SQL Editor
-- Jalankan dengan tombol "Run"
```

### 4.2. Jalankan storage buckets
```sql
-- Copy-paste supabase/008_STORAGE_BUCKETS.sql ke SQL Editor
-- Jalankan dengan tombol "Run"
```

---

## Step 5: Setup Storage Bucket di Dashboard

Buka **Storage** → **Buckets**

Pastikan bucket berikut sudah ada:
- `research-reports` (public)
- `articles` (public)

Jika belum, buat manual:
- Klik **New Bucket**
- Name: `research-reports`, Public: ✅
- Name: `articles`, Public: ✅

---

## Step 6: Setup Admin User

**Proses 2 langkah:**

### 6.1. Invite user admin
Buka **Authentication** → **Users** → **Invite User**
- Masukkan email admin (misal: `admin@grahita.co.id`)
- User akan menerima email untuk set password

### 6.2. Tambahkan ke whitelist admin_users
Setelah admin **login pertama kali**, jalankan SQL:

**SQL Editor → New Query:**
```sql
-- Ganti dengan email admin sebenarnya
INSERT INTO admin_users (email, full_name) VALUES ('admin@grahita.co.id', 'Admin Grahita');
```

Perlu password di Supabase Auth tetapi tidak perlu di tabel `admin_users` — sistem cek hanya email via `layout.tsx`.

---

## Step 7: Verification

Jalankan di SQL Editor:
```sql
-- Cek semua tabel terbuat
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' AND table_type = 'BASE TABLE';

-- Cek RLS policies
SELECT tablename, rowsecurity FROM pg_tables 
WHERE schemaname = 'public';

-- Cek storage buckets
SELECT id, name, public FROM storage.buckets;
```

---

## Step 8: Test Local Development

```bash
npm run dev
```

Buka http://localhost:3000/portal/login

Login dengan user yang sudah di-invite di Step 6.

---

## 🔧 Troubleshooting

**Jika terjadi error "policy already exists":**
- Ignore saja, policy sudah ada dari schema

**Jika storage bucket error:**
- Pastikan bucket name sesuai dengan yang diharapkan oleh kode
- Bucket `research-reports` & `articles` wajib public

**Jika auth tidak berfungsi:**
- Pastikan email sudah di-invite dari dashboard
- Pastikan user sudah login minimal sekali