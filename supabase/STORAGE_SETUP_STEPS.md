# 📁 Storage Buckets Setup Steps

## Status: ✅ Siap Dijalankan (Build Test Passed)

Project sudah terhubung ke Supabase baru.  
Yang tersisa: jalankan SQL di dashboard, setup policies, invite admin.

---

## Langkah 1: Jalankan SQL Create Buckets

**Buka Supabase Dashboard → SQL Editor → New Query**

Copy-paste SQL berikut:

```sql
-- 1. Buat bucket "research-reports" (untuk laporan riset)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('research-reports', 'research-reports', true, 10485760, ARRAY['application/pdf'])
ON CONFLICT (id) DO NOTHING;

-- 2. Buat bucket "articles" (untuk artikel/publikasi PDF)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('articles', 'articles', true, 10485760, ARRAY['application/pdf'])
ON CONFLICT (id) DO NOTHING;
```

Klik **Run**.

---

## Langkah 2: Setup Storage Policies via GUI

**Buka Supabase Dashboard → Storage → Buckets**

### Untuk bucket `articles`:
1. Klik bucket `articles`
2. Tab **Policies**
3. Klik **Create policy**
4. Pilih template: **"Give public access to all files"**
5. Klik **Review** → **Save**

### Untuk bucket `research-reports`:
1. Klik bucket `research-reports`
2. Tab **Policies**
3. Klik **Create policy**
4. Pilih template: **"Give public access to all files"**
5. Klik **Review** → **Save**

---

## Langkah 3: Jalankan GRANT Privileges

**Buka SQL Editor → New Query**

Copy-paste isi `supabase/006_GRANT_PRIVILEGES.sql` lalu **Run**.

---

## Verifikasi

Jalankan query ini di SQL Editor:

```sql
-- Cek bucket sudah ada
SELECT id, name, public FROM storage.buckets;
```

Harus menampilkan:
- `research-reports` | `research-reports` | `true`
- `articles` | `articles` | `true`