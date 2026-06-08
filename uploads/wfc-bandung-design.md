# WFC Bandung — Design Document
> Work From Cafe tracker khusus Bandung. Curated, trusted, no fluff.

---

## 1. Product Overview

**WFC Bandung** adalah platform untuk menemukan tempat kerja nyaman di Bandung — bukan cuma cafe, tapi juga restaurant, hotel lobby, atau tempat lain yang punya WiFi, ambience, meja & kursi yang proper.

Semua data dikurasi dan di-approve admin sebelum visible ke publik. Tidak ada data ngasal, tidak ada rating crowdsourced yang misleading — hanya fakta yang sudah diverifikasi.

---

## 2. Scope & Positioning

- **Kota pertama:** Bandung
- **Venue yang masuk:** Cafe, restaurant, semi-restaurant, hotel lobby — selama punya WiFi, tempat duduk proper, dan nyaman buat kerja
- **Ekspansi:** Setelah traction di Bandung, bisa ke Jogja atau Jakarta

---

## 3. Data Structure

### 3.1 `places` — listing utama

| Field | Type | Keterangan |
|---|---|---|
| `id` | uuid | Primary key |
| `name` | text | Nama tempat |
| `slug` | text | URL-friendly name |
| `type` | enum | `cafe` / `restaurant` / `hybrid` / `hotel_lobby` / `other` |
| `address` | text | Alamat lengkap |
| `district` | enum | `dago` / `buah_batu` / `braga` / `setiabudhi` / `antapani` / `other` |
| `lat` | float | Koordinat latitude |
| `lng` | float | Koordinat longitude |
| `price_range` | int (1–4) | 1 = <30k, 2 = 30–60k, 3 = 60–100k, 4 = >100k |
| `price_range_text` | text | Contoh: "Rp 30–60k" |
| `min_purchase` | text, nullable | Contoh: "min order 1 minuman" |
| `time_limit` | text, nullable | Contoh: "maks 3 jam", "bebas" |
| `best_time_wfc` | text | Contoh: "Weekday pagi sebelum jam 11" |
| `hours` | JSON | `{ mon: "08:00–22:00", tue: "08:00–22:00", ... }` |
| `status` | enum | `pending` / `approved` / `archived` |
| `submitted_by` | uuid (FK users) | |
| `approved_by` | uuid (FK users), nullable | |
| `last_verified_at` | timestamp | |
| `created_at` | timestamp | |
| `updated_at` | timestamp | |

---

### 3.2 `wfc_criteria` — one-to-one dengan places

| Field | Type | Keterangan |
|---|---|---|
| `id` | uuid | |
| `place_id` | uuid (FK) | |
| `wifi_available` | bool | |
| `wifi_speed` | enum | `slow` / `medium` / `fast` / `unknown` |
| `wifi_password_easy` | bool, nullable | Mudah minta atau tidak |
| `power_outlet` | enum | `none` / `few` / `many` |
| `outlet_location` | text, nullable | Contoh: "di pojok kiri, bawah meja bar" |
| `noise_level` | enum | `quiet` / `moderate` / `lively` |
| `lighting` | enum | `dark` / `medium` / `bright` / `natural` |
| `ac_available` | bool | |
| `indoor_outdoor` | enum | `indoor` / `outdoor` / `both` |
| `table_type` | enum | `normal` / `low` / `bar` / `shared` / `mixed` |
| `chair_type` | enum | `regular` / `sofa` / `bar_stool` / `wooden` / `mixed` |
| `setup_ergonomics` | enum | `proper` / `lumayan` / `kurang` |
| `setup_note` | text, nullable | Contoh: "sofa empuk tapi meja kopi, ga ideal seharian" |

---

### 3.3 `place_images`

| Field | Type | Keterangan |
|---|---|---|
| `id` | uuid | |
| `place_id` | uuid (FK) | |
| `url` | text | URL dari Supabase Storage |
| `caption` | text, nullable | |
| `is_primary` | bool | Foto utama untuk thumbnail |
| `uploaded_by` | uuid (FK users) | |
| `created_at` | timestamp | |

---

### 3.4 `users`

| Field | Type | Keterangan |
|---|---|---|
| `id` | uuid | |
| `email` | text | |
| `display_name` | text | |
| `role` | enum | `user` / `admin` |
| `rejection_count` | int | Default 0 |
| `is_flagged` | bool | Default false. Flag setelah 3x reject |
| `created_at` | timestamp | |

---

### 3.5 `submissions_log`

| Field | Type | Keterangan |
|---|---|---|
| `id` | uuid | |
| `place_id` | uuid (FK) | |
| `submitted_by` | uuid (FK users) | |
| `status` | enum | `pending` / `approved` / `rejected` |
| `rejection_reason` | text, nullable | |
| `reviewed_by` | uuid (FK users), nullable | |
| `reviewed_at` | timestamp, nullable | |
| `created_at` | timestamp | |

---

### 3.6 `verifications` — konfirmasi "masih akurat"

| Field | Type | Keterangan |
|---|---|---|
| `id` | uuid | |
| `place_id` | uuid (FK) | |
| `verified_by` | uuid (FK users) | |
| `note` | text, nullable | |
| `created_at` | timestamp | |

---

### 3.7 `reviews` *(v2 — siapkan schema sekarang)*

| Field | Type | Keterangan |
|---|---|---|
| `id` | uuid | |
| `place_id` | uuid (FK) | |
| `user_id` | uuid (FK) | |
| `rating_wfc` | int (1–5) | |
| `body` | text | |
| `visited_at` | date | |
| `created_at` | timestamp | |

---

## 4. Kriteria WFC per Listing

Ditampilkan sebagai **status pills** dengan warna yang encode makna:

| Kriteria | Hijau (good) | Kuning (mid) | Merah (bad) |
|---|---|---|---|
| Colokan | Banyak | Beberapa | Tidak ada |
| WiFi | Cepat | Medium | Lambat / tidak ada |
| Noise | Quiet | Moderate | Lively |
| Setup kerja | Proper | Lumayan | Kurang |
| Durasi | Bebas | Ada batas | — |

**Catatan submitter** ditampilkan sebagai teks bebas di bawah pills — ini yang bikin informasinya terasa real dan spesifik. Contoh: *"Colokan ada di setiap meja. Password WiFi minta ke kasir. Weekday pagi paling kondusif."*

---

## 5. Submission & Approval Flow

```
User submit (wajib login, min 2 foto)
    ↓
Masuk antrian admin — tidak visible ke publik
    ↓
Admin review:
  - Foto real & sesuai?
  - Alamat valid? (cross-check maps)
  - Kriteria yang diisi masuk akal?
    ↓
Approve → Visible ke publik
Reject  → Notif ke user + alasan
         (3x reject → akun di-flag)
```

---

## 6. Last Verified System

- Setiap listing punya timestamp **"Terakhir dikonfirmasi"**
- Tombol **"Masih akurat"** bisa diklik user yang pernah ke sana
- Listing tidak diperbarui > **6 bulan** → badge ⚠️ otomatis + admin di-notify
- Tempat tutup permanent → bisa di-report → admin archive listing

---

## 7. UI Structure

### Topbar
- Logo
- Search box
- Filter chips: `Colokan`, `WiFi cepat`, `Quiet`, `<50k`, `Buka sekarang`, `Natural light`, `No time limit`
- Tombol "Rekomendasiin tempat"

### Sidebar (kiri)
- Area filter: `Semua`, `Dago`, `Buah Batu`, `Braga`, `Setiabudhi`, `Antapani`
- Count hasil + sort option
- Place cards — masing-masing berisi:
  - Nama + verified badge (jika sudah dikurasi admin)
  - Tipe venue · Area
  - Price range pill
  - 4–5 criteria pills dengan warna status
  - Catatan singkat dari submitter
  - Best time to WFC

### Map (kanan)
- Pin per lokasi dengan label nama
- Pin aktif = highlighted
- Zoom controls + "current location"

### Detail Panel (bawah map, on click)
- Nama + sub info
- Foto-foto (minimum 2, dari submitter)
- Catatan lengkap submitter
- Semua criteria dalam grid
  - Colokan, WiFi, Noise, Setup kerja, Durasi, Cahaya, AC, Indoor/outdoor
- "Terakhir dikonfirmasi" + tombol "Masih akurat"

---

## 8. Tech Stack

| Layer | Pilihan | Alasan |
|---|---|---|
| Frontend | Next.js + Tailwind CSS | SSR bagus untuk SEO, deploy mudah di Vercel |
| Map | Leaflet.js + OpenStreetMap | Gratis, cukup untuk v1 |
| Backend & DB | Supabase (PostgreSQL) | Built-in auth, storage, real-time — satu platform |
| Image storage | Supabase Storage | Terintegrasi, URL disimpan di DB bukan binary |
| Auth | Supabase Auth | Login user, role admin |
| Admin panel v1 | Supabase Studio | Gratis, tidak perlu build custom UI dulu |
| Deploy | Vercel (FE) + Supabase (BE) | |

---

## 9. V1 Scope (MVP)

**Yang masuk v1:**
- Map view + sidebar listing
- Filter chips (WiFi, colokan, noise, harga, buka sekarang)
- Filter per area (Dago, Buah Batu, Braga, Setiabudhi)
- Detail panel per listing (foto, criteria, catatan, last verified)
- User login + submission form
- Admin approval flow via Supabase Studio
- Last verified system + tombol konfirmasi

**Yang ditunda ke v2:**
- Review / rating system
- Peak hour tracking yang lebih structured
- Notifikasi user (submission approved/rejected)
- Custom admin panel UI
- Ekspansi kota lain

---

## 10. Open Questions

- Apakah submission butuh akun Google / email saja?
- Berapa minimum foto wajib per submission? (saran: 2, idealnya 3)
- Siapa yang jadi admin pertama dan bagaimana workflow review-nya di awal?
- Apakah "masih akurat" butuh login atau bisa anonim?
