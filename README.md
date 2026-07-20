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

## Changelog — WEB_GAS_1.2.6

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