/*
  010_drop_product_price.sql — Hapus kolom price dari tabel products
  Tidak lagi dibutuhkan karena harga tidak ditampilkan di toko.
*/

ALTER TABLE products DROP COLUMN price;