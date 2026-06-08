// WFC Bandung — Mock Data
// Factual where measurable, contextual where it matters more than numbers

const WFC_DATA = {
  places: [
    {
      id: '1',
      name: 'Kopi Selasar',
      type: 'cafe',
      address: 'Jl. Bukit Pakar Timur No.100, Ciburial, Cimenyan',
      district: 'dago',
      lat: -6.8718,
      lng: 107.6358,
      price_range: 2,
      price_range_text: 'Rp 35–65k',
      min_purchase: 'Min. 1 minuman',
      highlight: 'deep-focus',

      operating_hours: {
        mon: '08:00-22:00', tue: '08:00-22:00', wed: '08:00-22:00',
        thu: '08:00-22:00', fri: '08:00-23:00',
        sat: '08:00-23:00', sun: '09:00-22:00',
      },

      // FACTUAL — internet speed is measurable
      wifi: {
        download_mbps: 47, upload_mbps: 18, ping_ms: 24,
        last_tested: '3 hari lalu', tested_count: 14,
        provider: 'Indihome 100Mbps',
      },

      // FACTUAL — outlets are countable
      outlets: {
      availability: 'plenty',
      notes: 'Setiap meja punya 1-2 colokan kecuali sofa lounge',
      photo_evidence: [
        { caption: 'Meja kerja kayu dengan 2 colokan di samping', gradient: ['#C8A882', '#8B6340'] },
        { caption: 'Bar tinggi dengan colokan terintegrasi', gradient: ['#8B6340', '#5A3D20'] }
      ],
    },

      // CONTEXTUAL — kapan ramai/sepi + KENAPA (subjective but useful)
      noise_context: {
        general_vibe: 'Tenang dan kondusif untuk fokus',
        crowd_pattern: [
          { time: '08:00–11:00', level: 'sepi', reason: 'Hampir kosong, ideal buat deep work pagi' },
          { time: '12:00–14:00', level: 'ramai', reason: 'Lunch rush — banyak warga sekitar makan siang' },
          { time: '14:00–17:00', level: 'sedang', reason: 'Mulai sepi lagi, bisa dapet meja' },
          { time: '18:00–20:00', level: 'ramai', reason: 'After office hours, ada yang nongkrong' },
          { time: '20:00–22:00', level: 'sedang', reason: 'Mulai pulang, tenang lagi' },
        ],
        special_notes: ['Sabtu sore biasanya ada acoustic live'],
      },

      // FACTUAL — physical specs measurable
      seating: {
      setup_types: ['long-table', 'bar', 'sofa'],
      tips: 'Bar tinggi proper buat laptop, sofa lounge cocok kerja santai. Meja utama paling nyaman buat seharian.',
      photo_evidence: [
        { caption: 'Bar tinggi - posisi pas buat laptop', gradient: ['#C8A882', '#5A3D20'] },
        { caption: 'Sofa lounge dengan meja kopi rendah', gradient: ['#8B6340', '#3A2A18'] }
      ],
    },

      // FACTUAL — restaurant menu is public info
      menu: {
        signature: [
          { name: 'Es Kopi Susu Selasar', price: 'Rp 28k', desc: 'Signature drink, kopi lokal Bandung + susu segar', popular: true },
          { name: 'Croissant Cokelat', price: 'Rp 32k', desc: 'Crispy luar, lembut dalam, freshly baked tiap pagi', popular: true },
        ],
        recommended: [
          { name: 'Avocado Toast', price: 'Rp 45k', desc: 'Roti sourdough + alpukat + telur poach' },
          { name: 'Nasi Goreng Selasar', price: 'Rp 38k', desc: 'Nasi goreng kampung lengkap dengan telur ceplok' },
          { name: 'Cold Brew', price: 'Rp 30k', desc: 'Brewed 16 jam, smooth dan less acidic' },
        ],
      },

      // INTERACTIVE seed reviews
      reviews: [
        { id: 'r1-1', nickname: 'Andi · Designer', rating: 5, comment: 'Tempat fav buat kerja. WiFi kencang dan jarang putus. Kopi enak.', ts: '2 hari lalu', verified_visit: true },
        { id: 'r1-2', nickname: 'Maya', rating: 5, comment: 'Pagi-pagi disini ga ada yang ngalahin. Sepi dan tenang banget.', ts: '5 hari lalu' },
        { id: 'r1-3', nickname: 'Dimas', rating: 4, comment: 'Bagus tapi siang agak ramai. Saran pagi atau sore aja.', ts: '1 minggu lalu' },
        { id: 'r1-4', nickname: 'Sari', rating: 5, comment: 'Croissant cokelat MUST TRY. Apalagi pas masih hangat.', ts: '2 minggu lalu' },
      ],

      ambience: ['cozy', 'plant-filled', 'natural-light', 'instagramable'],
      ac_available: true, indoor_outdoor: 'both', lighting: 'natural',
      note: 'Colokan ada di setiap meja, tidak perlu rebutan. WiFi stabil dan kencang, minta password ke kasir. Kursi dan meja tinggi tersedia untuk kerja seharian.',
      verified_by: 'Rizky A.', last_verified: '2 hari lalu',
      status: 'approved', color: ['#C8A882', '#8B6340'],
      criteria: { wifi_speed: 'fast', power_outlet: 'many', noise_level: 'quiet', setup_ergonomics: 'proper', ac_available: true, indoor_outdoor: 'both', lighting: 'natural' },
    },

    {
      id: '2',
      name: 'Nook Coffee & Space',
      type: 'cafe',
      address: 'Jl. Dipatiukur No.27, Lebakgede, Coblong',
      district: 'dago',
      lat: -6.8845, lng: 107.6244,
      price_range: 2, price_range_text: 'Rp 30–55k',
      min_purchase: 'Min. 1 order',
      highlight: 'cozy-work',
      operating_hours: { mon: '09:00-21:00', tue: '09:00-21:00', wed: '09:00-21:00', thu: '09:00-21:00', fri: '09:00-22:00', sat: '09:00-22:00', sun: '10:00-21:00' },
      wifi: { download_mbps: 24, upload_mbps: 9, ping_ms: 42, last_tested: '5 hari lalu', tested_count: 8, provider: 'Biznet 50Mbps' },
      outlets: {
      availability: 'limited',
      notes: 'Colokan di dinding sebelah barat dan beberapa meja tengah',
      photo_evidence: [
        { caption: 'Meja deket dinding dengan colokan double socket', gradient: ['#9BB5A0', '#4A7A5A'] },
        { caption: 'Sofa lounge - tidak ada colokan terdekat', gradient: ['#7A9080', '#3A5A4A'] }
      ],
    },
      noise_context: {
        general_vibe: 'Cozy & santai, ada background musik indie',
        crowd_pattern: [
          { time: '09:00–11:00', level: 'sepi', reason: 'Baru buka, paling tenang seharian' },
          { time: '12:00–15:00', level: 'ramai', reason: 'Mahasiswa Unpad lunch & nugas' },
          { time: '15:00–18:00', level: 'sedang', reason: 'Random customers, bisa kerja' },
          { time: '18:00–21:00', level: 'ramai', reason: 'Anak nongkrong setelah kuliah/kerja' },
        ],
        special_notes: ['Weekend full ramai dari pagi sampai malam'],
      },
      seating: {
      setup_types: ['bar', 'sofa', 'individual'],
      tips: 'Bar dan meja individual cukup ergonomis. Sofa lebih santai, kurang ideal kerja lama.',
      photo_evidence: [
        { caption: 'Window seat dengan meja individual', gradient: ['#9BB5A0', '#4A7A5A'] }
      ],
    },
      menu: {
        signature: [
          { name: 'Nook Latte', price: 'Rp 32k', desc: 'House blend dengan hint vanilla dan caramel', popular: true },
          { name: 'Banana Bread', price: 'Rp 25k', desc: 'Homemade, soft & moist', popular: true },
        ],
        recommended: [
          { name: 'Matcha Latte', price: 'Rp 35k', desc: 'Pakai matcha premium dari Kyoto' },
          { name: 'Truffle Mushroom Pasta', price: 'Rp 55k', desc: 'Spaghetti dengan creamy truffle sauce' },
        ],
      },
      reviews: [
        { id: 'r2-1', nickname: 'Renata', rating: 4, comment: 'Cozy banget, musik indie-nya nyambung sama vibe-nya.', ts: '1 hari lalu' },
        { id: 'r2-2', nickname: 'Bagas · Mhs Unpad', rating: 4, comment: 'Wifi medium tapi bisa kerja kalo browsing biasa.', ts: '4 hari lalu', verified_visit: true },
        { id: 'r2-3', nickname: 'Anonim', rating: 3, comment: 'Siang rame banget, susah dapet meja. Pagi lebih oke.', ts: '1 minggu lalu' },
      ],
      ambience: ['cozy', 'plant-filled', 'minimalist'],
      ac_available: true, indoor_outdoor: 'indoor', lighting: 'medium',
      note: 'Colokan ada di beberapa meja, cukup tapi tidak semua. Ramai di weekend. Interior nyaman dengan banyak tanaman.',
      verified_by: 'Dian M.', last_verified: '5 hari lalu',
      status: 'approved', color: ['#9BB5A0', '#4A7A5A'],
      criteria: { wifi_speed: 'medium', power_outlet: 'few', noise_level: 'moderate', setup_ergonomics: 'proper', ac_available: true, indoor_outdoor: 'indoor', lighting: 'medium' },
    },

    {
      id: '3',
      name: 'Filosofi Kopi Bandung',
      type: 'cafe',
      address: 'Jl. Raya Braga No.48, Braga, Sumur Bandung',
      district: 'braga',
      lat: -6.9123, lng: 107.6089,
      price_range: 3, price_range_text: 'Rp 60–100k',
      highlight: 'all-rounder',
      operating_hours: { mon: '07:00-23:00', tue: '07:00-23:00', wed: '07:00-23:00', thu: '07:00-23:00', fri: '07:00-00:00', sat: '07:00-00:00', sun: '07:00-23:00' },
      wifi: { download_mbps: 65, upload_mbps: 28, ping_ms: 18, last_tested: '1 hari lalu', tested_count: 22, provider: 'Dedicated 100Mbps' },
      outlets: {
      availability: 'plenty',
      notes: 'Lantai 2 punya meja panjang dengan built-in outlets',
      photo_evidence: [
        { caption: 'Lantai 2 - meja panjang dengan colokan built-in', gradient: ['#B5A0C8', '#7A5090'] },
        { caption: 'Lantai 1 area window seat dengan colokan dinding', gradient: ['#9080A8', '#5A4070'] }
      ],
    },
      noise_context: {
        general_vibe: 'Dua lantai — bawah ramai, atas tenang',
        crowd_pattern: [
          { time: '07:00–10:00', level: 'sepi', reason: 'Pagi banget masih sepi, lantai 2 kosong' },
          { time: '11:00–13:00', level: 'sedang', reason: 'Tamu mulai datang, lantai 1 mulai isi' },
          { time: '13:00–15:00', level: 'ramai', reason: 'Lunch rush turis Braga + pekerja sekitar' },
          { time: '19:00–22:00', level: 'sangat ramai', reason: 'Dinner crowd + Braga weekend nights' },
        ],
        special_notes: [
          'Lantai 2 selalu lebih tenang, naik aja kalau lantai 1 ramai',
          'Jumat-Sabtu malam wajib reservasi',
        ],
      },
      seating: {
      setup_types: ['long-table', 'bar', 'sofa', 'private-corner'],
      tips: 'Meja panjang lantai 2 GOAT — luas, ergonomis, tenang. Lantai 1 lebih social.',
      photo_evidence: [
        { caption: 'Lantai 2 - meja panjang community', gradient: ['#B5A0C8', '#7A5090'] },
        { caption: 'Pojokan privat dekat jendela lantai 2', gradient: ['#9080A8', '#5A4070'] }
      ],
    },
      menu: {
        signature: [
          { name: 'Tiwus', price: 'Rp 38k', desc: 'Kopi single origin Jawa Barat, smooth & fruity', popular: true },
          { name: 'Filosofi Perfecto', price: 'Rp 42k', desc: 'House blend signature, balance & bold', popular: true },
          { name: 'Es Kopi Tubruk', price: 'Rp 25k', desc: 'Kopi traditional Indonesia', popular: true },
        ],
        recommended: [
          { name: 'Nasi Goreng Filosofi', price: 'Rp 55k', desc: 'Nasi goreng oriental dengan telur orak-arik' },
          { name: 'Croissant Almond', price: 'Rp 35k', desc: 'Almond cream filling, French style' },
          { name: 'Spaghetti Aglio Olio', price: 'Rp 65k', desc: 'Classic Italian dengan parmesan' },
        ],
      },
      reviews: [
        { id: 'r3-1', nickname: 'Adit · Remote PM', rating: 5, comment: 'WiFi dedicated bisa Zoom 4 hours non-stop. Lantai 2 GOAT.', ts: '6 jam lalu', verified_visit: true },
        { id: 'r3-2', nickname: 'Putri', rating: 5, comment: 'Tiwus-nya wajib coba. Aromanya bikin tenang.', ts: '2 hari lalu' },
        { id: 'r3-3', nickname: 'Anonim', rating: 4, comment: 'Mahal tapi worth it. Suasana Braga + kopi enak.', ts: '4 hari lalu' },
        { id: 'r3-4', nickname: 'Reza', rating: 5, comment: 'Tempat fav buat client meeting. Vibe-nya proper.', ts: '1 minggu lalu' },
        { id: 'r3-5', nickname: 'Tina · Writer', rating: 5, comment: 'Datang sebelum jam 10 pagi, dapet pojokan sepi, nulis 4 jam non-stop.', ts: '2 minggu lalu' },
      ],
      ambience: ['cozy', 'natural-light', 'historical', 'instagramable'],
      ac_available: true, indoor_outdoor: 'both', lighting: 'natural',
      note: 'Dua lantai, lantai atas lebih tenang dan cocok untuk kerja. Colokan tersedia di hampir setiap meja. WiFi dedicated, kencang dan stabil. Kopi enak banget.',
      verified_by: 'Budi S.', last_verified: '1 hari lalu',
      status: 'approved', color: ['#B5A0C8', '#7A5090'],
      criteria: { wifi_speed: 'fast', power_outlet: 'many', noise_level: 'moderate', setup_ergonomics: 'proper', ac_available: true, indoor_outdoor: 'both', lighting: 'natural' },
    },

    {
      id: '4',
      name: 'Common Grounds Buah Batu',
      type: 'cafe',
      address: 'Jl. Buah Batu No.147, Turangga, Lengkong',
      district: 'buah_batu',
      lat: -6.9403, lng: 107.6398,
      price_range: 2, price_range_text: 'Rp 40–70k',
      min_purchase: 'Min. 1 minuman',
      highlight: 'productive',
      operating_hours: { mon: '08:00-22:00', tue: '08:00-22:00', wed: '08:00-22:00', thu: '08:00-22:00', fri: '08:00-23:00', sat: '08:00-23:00', sun: '08:00-22:00' },
      wifi: { download_mbps: 52, upload_mbps: 22, ping_ms: 21, last_tested: '4 hari lalu', tested_count: 17, provider: 'Indihome 100Mbps' },
      outlets: {
      availability: 'plenty',
      notes: 'Hampir semua meja & beberapa di lantai',
      photo_evidence: [
        { caption: 'Long table dengan deretan colokan tersedia', gradient: ['#A0B5C8', '#3A6A8B'] },
        { caption: 'Workstation area dengan floor outlets', gradient: ['#8095A8', '#2A5A7B'] }
      ],
    },
      noise_context: {
        general_vibe: 'Spacious & bright, banyak orang kerja',
        crowd_pattern: [
          { time: '08:00–11:00', level: 'sepi', reason: 'Pagi banget masih sepi, bisa pilih meja' },
          { time: '11:00–14:00', level: 'ramai', reason: 'Lunch + remote workers yang baru mulai shift siang' },
          { time: '14:00–17:00', level: 'sedang', reason: 'Mulai sepi lagi, banyak yang udah pulang' },
          { time: '17:00–22:00', level: 'ramai', reason: 'After work + weekend social crowd' },
        ],
        special_notes: ['Datang sebelum jam 10 buat dapet meja deket jendela'],
      },
      seating: {
      setup_types: ['long-table', 'individual'],
      tips: 'Meja luas dengan kursi ergonomis kayu. Setup paling proper di Buah Batu.',
      photo_evidence: [
        { caption: 'Long table dengan kursi proper', gradient: ['#A0B5C8', '#3A6A8B'] }
      ],
    },
      menu: {
        signature: [
          { name: 'Common Latte', price: 'Rp 35k', desc: 'House blend with house-made vanilla syrup', popular: true },
          { name: 'Eggs Benedict', price: 'Rp 65k', desc: 'Brunch wajib, telur poach + hollandaise', popular: true },
        ],
        recommended: [
          { name: 'Iced Americano', price: 'Rp 28k', desc: 'Simple but bold' },
          { name: 'Avocado Smash', price: 'Rp 48k', desc: 'Sourdough + alpukat + cherry tomato' },
          { name: 'Beef Burger', price: 'Rp 75k', desc: '180g patty + cheddar + truffle aioli' },
        ],
      },
      reviews: [
        { id: 'r4-1', nickname: 'Tirta · Dev', rating: 5, comment: 'WFC fav di Buah Batu. WiFi ngebut & banyak colokan.', ts: '1 hari lalu' },
        { id: 'r4-2', nickname: 'Lisa', rating: 4, comment: 'Brunchnya enak, eggs benedict-nya wajib coba.', ts: '3 hari lalu', verified_visit: true },
        { id: 'r4-3', nickname: 'Reno', rating: 5, comment: 'Spacious, AC dingin, cocok buat kerja seharian.', ts: '1 minggu lalu' },
      ],
      ambience: ['minimalist', 'natural-light', 'productive'],
      ac_available: true, indoor_outdoor: 'indoor', lighting: 'bright',
      note: 'Tempat WFC favorit di Buah Batu. Luas, banyak meja, colokan di semua sudut. WiFi dedicated untuk kerja. AC dingin.',
      verified_by: 'Sari W.', last_verified: '3 hari lalu',
      status: 'approved', color: ['#A0B5C8', '#3A6A8B'],
      criteria: { wifi_speed: 'fast', power_outlet: 'many', noise_level: 'quiet', setup_ergonomics: 'proper', ac_available: true, indoor_outdoor: 'indoor', lighting: 'bright' },
    },

    {
      id: '5',
      name: 'Halfways Coffee',
      type: 'cafe',
      address: 'Jl. Dr. Setiabudhi No.90A, Ledeng, Cidadap',
      district: 'setiabudhi',
      lat: -6.8912, lng: 107.5978,
      price_range: 2, price_range_text: 'Rp 30–55k',
      min_purchase: 'Min. 1 order setiap 3 jam',
      highlight: 'budget-vibe',
      operating_hours: { mon: '09:00-21:00', tue: '09:00-21:00', wed: '09:00-21:00', thu: '09:00-21:00', fri: '09:00-22:00', sat: '09:00-22:00', sun: '10:00-21:00' },
      wifi: { download_mbps: 18, upload_mbps: 6, ping_ms: 48, last_tested: '2 minggu lalu', tested_count: 5, provider: 'Indihome 30Mbps' },
      outlets: {
      availability: 'limited',
      notes: 'Colokan terbatas, sebagian besar di dekat dinding',
      photo_evidence: [
        { caption: 'Meja dinding dengan akses colokan', gradient: ['#C8B09B', '#8B6040'] }
      ],
    },
      noise_context: {
        general_vibe: 'Industrial & moody, bukan tempat super tenang',
        crowd_pattern: [
          { time: '09:00–12:00', level: 'sepi', reason: 'Pagi masih bisa kerja, tenang' },
          { time: '14:00–16:00', level: 'sedang', reason: 'Anak sekolah pulang, mulai isi' },
          { time: '16:00–21:00', level: 'ramai', reason: 'Anak SMA + nongkrong, suara obrolan ramai' },
        ],
        special_notes: [
          'Jumat sore PALING ramai, anak SMA berkumpul setelah pulang sekolah',
          'Hindari hari weekend kalau mau kerja serius',
        ],
      },
      seating: {
      setup_types: ['long-table', 'individual'],
      tips: 'Meja kayu lebar tapi kursi tanpa bantalan — kurang nyaman buat seharian.',
      photo_evidence: [
        { caption: 'Long table dengan kursi kayu industrial', gradient: ['#C8B09B', '#8B6040'] }
      ],
    },
      menu: {
        signature: [
          { name: 'Es Kopi Halfways', price: 'Rp 25k', desc: 'Kopi susu signature, manisnya pas', popular: true },
          { name: 'Pisang Bakar', price: 'Rp 22k', desc: 'Pisang bakar khas, topping bebas', popular: true },
        ],
        recommended: [
          { name: 'Mie Aceh', price: 'Rp 35k', desc: 'Pedas otentik, recommended' },
          { name: 'Roti Bakar Kaya', price: 'Rp 18k', desc: 'Murah meriah, isian custom' },
        ],
      },
      reviews: [
        { id: 'r5-1', nickname: 'Anonim', rating: 3, comment: 'Vibe-nya bagus, tapi anak SMA-nya rame banget sore.', ts: '1 hari lalu' },
        { id: 'r5-2', nickname: 'Kenny', rating: 4, comment: 'Datang pagi aja, dapet meja deket jendela.', ts: '4 hari lalu' },
        { id: 'r5-3', nickname: 'Anonim', rating: 3, comment: 'WiFi-nya kurang stabil kalau lagi rame.', ts: '1 minggu lalu' },
      ],
      ambience: ['industrial', 'rustic', 'natural-light'],
      ac_available: false, indoor_outdoor: 'both', lighting: 'natural',
      note: 'Nuansa industrial yang keren. Colokan terbatas, di dekat dinding. WiFi medium, cukup untuk email dan video call ringan. Tidak ada AC tapi ventilasi oke.',
      verified_by: 'Andi R.', last_verified: '1 minggu lalu',
      status: 'approved', color: ['#C8B09B', '#8B6040'],
      criteria: { wifi_speed: 'medium', power_outlet: 'few', noise_level: 'moderate', setup_ergonomics: 'lumayan', ac_available: false, indoor_outdoor: 'both', lighting: 'natural' },
    },

    {
      id: '6',
      name: "Noah's Barn",
      type: 'hybrid',
      address: 'Jl. Terusan Buah Batu No.299, Margasari',
      district: 'buah_batu',
      lat: -6.9482, lng: 107.6421,
      price_range: 3, price_range_text: 'Rp 60–120k',
      highlight: 'outdoor-escape',
      operating_hours: { mon: '08:00-22:00', tue: '08:00-22:00', wed: '08:00-22:00', thu: '08:00-22:00', fri: '08:00-23:00', sat: '08:00-23:00', sun: '08:00-22:00' },
      wifi: { download_mbps: 38, upload_mbps: 15, ping_ms: 30, last_tested: '4 hari lalu', tested_count: 12, provider: 'Biznet 75Mbps' },
      outlets: {
      availability: 'plenty',
      notes: 'Indoor & outdoor punya colokan, gazebo juga',
      photo_evidence: [
        { caption: 'Area outdoor gazebo dengan colokan tertutup', gradient: ['#A8C5A0', '#3A7A50'] },
        { caption: 'Indoor dengan multiple outlet di setiap meja', gradient: ['#88A580', '#2A5A30'] }
      ],
    },
      noise_context: {
        general_vibe: 'Resto besar dengan area outdoor yang tenang',
        crowd_pattern: [
          { time: '08:00–11:00', level: 'sepi', reason: 'Hampir kosong, area outdoor empty' },
          { time: '12:00–14:00', level: 'ramai', reason: 'Lunch crowd, indoor penuh' },
          { time: '14:00–18:00', level: 'sedang', reason: 'Bisa pilih spot outdoor yang tenang' },
          { time: '19:00–21:00', level: 'ramai', reason: 'Dinner + family time, ada anak-anak' },
        ],
        special_notes: ['Area gazebo selalu lebih tenang, prioritaskan kalau available'],
      },
      seating: {
      setup_types: ['sofa', 'gazebo', 'individual'],
      tips: 'Gazebo outdoor + sofa indoor. Variasi banyak, pilih sesuai mood.',
      photo_evidence: [
        { caption: 'Gazebo outdoor dengan kursi rotan', gradient: ['#A8C5A0', '#3A7A50'] },
        { caption: 'Sofa indoor area family', gradient: ['#88A580', '#2A5A30'] }
      ],
    },
      menu: {
        signature: [
          { name: 'Iga Bakar Madu', price: 'Rp 95k', desc: 'Signature, iga empuk dengan saus madu', popular: true },
          { name: 'Es Kopi Barn', price: 'Rp 35k', desc: 'Kopi susu spesial dengan campuran palm sugar', popular: true },
        ],
        recommended: [
          { name: 'Ayam Goreng Kremes', price: 'Rp 65k', desc: 'Ayam kampung dengan kremes super crispy' },
          { name: 'Nasi Liwet Sunda', price: 'Rp 75k', desc: 'Komplit dengan lalapan dan sambal' },
          { name: 'Pisang Bakar Keju', price: 'Rp 35k', desc: 'Dessert favorit' },
        ],
      },
      reviews: [
        { id: 'r6-1', nickname: 'Rini', rating: 5, comment: 'Gazebonya tenang banget, suka kerja di sana.', ts: '2 hari lalu' },
        { id: 'r6-2', nickname: 'Anonim', rating: 4, comment: 'Mahal tapi worth it, makanan enak suasana adem.', ts: '5 hari lalu' },
        { id: 'r6-3', nickname: 'Dani', rating: 5, comment: 'Iga bakarnya juara, sambil kerja di outdoor + ada angin sepoi.', ts: '1 minggu lalu', verified_visit: true },
      ],
      ambience: ['cozy', 'natural-light', 'garden', 'family-friendly'],
      ac_available: true, indoor_outdoor: 'both', lighting: 'natural',
      note: 'Restoran yang juga nyaman buat kerja. Area outdoor dengan gazebo yang teduh, sangat kondusif. WiFi kencang. Makan siang di sini sambil kerja — worth the price.',
      verified_by: 'Maya L.', last_verified: '4 hari lalu',
      status: 'approved', color: ['#A8C5A0', '#3A7A50'],
      criteria: { wifi_speed: 'fast', power_outlet: 'many', noise_level: 'quiet', setup_ergonomics: 'proper', ac_available: true, indoor_outdoor: 'both', lighting: 'natural' },
    },

    {
      id: '7',
      name: 'Tigawarsa Coffee',
      type: 'cafe',
      address: 'Jl. Braga No.22, Braga, Sumur Bandung',
      district: 'braga',
      lat: -6.9198, lng: 107.6082,
      price_range: 2, price_range_text: 'Rp 30–50k',
      min_purchase: 'Min. 1 minuman',
      highlight: 'social-spot',
      operating_hours: { mon: '10:00-22:00', tue: '10:00-22:00', wed: '10:00-22:00', thu: '10:00-22:00', fri: '10:00-23:00', sat: '10:00-23:00', sun: '10:00-22:00' },
      wifi: { download_mbps: 12, upload_mbps: 4, ping_ms: 65, last_tested: '3 minggu lalu', tested_count: 3, provider: 'WiFi cafe (shared)' },
      outlets: {
      availability: 'limited',
      notes: 'Colokan terbatas, di pojok bawah meja',
      photo_evidence: [
        { caption: 'Colokan di pojok ruangan, harus berebut', gradient: ['#C8A882', '#7A5030'] }
      ],
    },
      noise_context: {
        general_vibe: 'Lively & social, bukan tempat kerja serius',
        crowd_pattern: [
          { time: '10:00–11:00', level: 'sepi', reason: 'Baru buka, masih bisa kerja tenang' },
          { time: '12:00–22:00', level: 'ramai', reason: 'Hampir seharian ramai — turis Braga + photography crowd' },
        ],
        special_notes: [
          'Bukan tempat ideal buat deep work — lebih cocok meet up santai',
          'Spot foto instagramable, banyak orang foto-foto',
        ],
      },
      seating: {
      setup_types: ['bar', 'individual'],
      tips: 'Bangku kayu kecil, tidak ada sandaran. Bukan ideal buat kerja >1 jam.',
      photo_evidence: [
        { caption: 'Bangku tanpa sandaran - tidak ergonomis', gradient: ['#C8A882', '#7A5030'] }
      ],
    },
      menu: {
        signature: [
          { name: 'Es Kopi Tigawarsa', price: 'Rp 30k', desc: 'Kopi susu signature dengan caramel drizzle', popular: true },
          { name: 'Cookies & Cream', price: 'Rp 28k', desc: 'Manis & creamy, anak muda fav', popular: true },
        ],
        recommended: [
          { name: 'Iced Cappuccino', price: 'Rp 32k', desc: 'Smooth dengan foam art' },
          { name: 'Roti Bakar Coklat', price: 'Rp 22k', desc: 'Klasik selalu enak' },
        ],
      },
      reviews: [
        { id: 'r7-1', nickname: 'Naya', rating: 4, comment: 'Cute banget tempatnya, instagrammable. Tapi bukan tempat kerja deh.', ts: '2 hari lalu' },
        { id: 'r7-2', nickname: 'Anonim', rating: 3, comment: 'WiFi-nya lambat banget pas rame.', ts: '1 minggu lalu' },
        { id: 'r7-3', nickname: 'Rio', rating: 4, comment: 'Buat ngopi & foto-foto oke. Kopi-nya enak.', ts: '2 minggu lalu' },
      ],
      ambience: ['instagramable', 'dim-light', 'cozy'],
      ac_available: true, indoor_outdoor: 'indoor', lighting: 'dark',
      note: 'Tempatnya instagramable tapi tidak ideal untuk kerja serius. WiFi lambat di peak hour. Colokan terbatas. Cocok untuk meeting singkat atau kerja ringan.',
      verified_by: 'Hani P.', last_verified: '3 minggu lalu',
      status: 'approved', color: ['#C8A882', '#7A5030'],
      criteria: { wifi_speed: 'slow', power_outlet: 'few', noise_level: 'lively', setup_ergonomics: 'lumayan', ac_available: true, indoor_outdoor: 'indoor', lighting: 'dark' },
    },

    {
      id: '8',
      name: 'Teras Kopi Antapani',
      type: 'cafe',
      address: 'Jl. Antapani Tengah No.52, Antapani',
      district: 'antapani',
      lat: -6.9078, lng: 107.6589,
      price_range: 1, price_range_text: 'Rp 15–35k',
      highlight: 'budget-wfc',
      operating_hours: { mon: '07:00-23:00', tue: '07:00-23:00', wed: '07:00-23:00', thu: '07:00-23:00', fri: '07:00-00:00', sat: '07:00-00:00', sun: '07:00-23:00' },
      wifi: { download_mbps: 22, upload_mbps: 8, ping_ms: 38, last_tested: '1 minggu lalu', tested_count: 7, provider: 'Indihome 50Mbps' },
      outlets: {
      availability: 'plenty',
      notes: 'Hampir semua meja punya colokan extension',
      photo_evidence: [
        { caption: 'Setiap meja punya extension colokan plastik', gradient: ['#D4BC8A', '#9A7A30'] }
      ],
    },
      noise_context: {
        general_vibe: 'Warung kopi outdoor sederhana, suasana kampung',
        crowd_pattern: [
          { time: '07:00–10:00', level: 'sepi', reason: 'Sepi, paling enak buat kerja pagi' },
          { time: '14:00–18:00', level: 'sedang', reason: 'Random customer warga sekitar' },
          { time: '19:00–22:00', level: 'ramai', reason: 'Tongkrongan warga + anak motor' },
        ],
        special_notes: [
          'Outdoor, jadi hujan langsung tutup',
          'Suara motor lewat kadang berisik kalau jam sibuk',
        ],
      },
      seating: {
      setup_types: ['individual', 'outdoor'],
      tips: 'Kursi plastik dengan sandaran, sederhana tapi ok buat kerja ringan.',
      photo_evidence: [
        { caption: 'Kursi plastik outdoor dengan meja kayu', gradient: ['#D4BC8A', '#9A7A30'] }
      ],
    },
      menu: {
        signature: [
          { name: 'Kopi Hitam Tubruk', price: 'Rp 10k', desc: 'Kopi traditional, murah meriah', popular: true },
          { name: 'Mie Rebus Spesial', price: 'Rp 18k', desc: 'Mie instan kreasi dengan telur dan kornet', popular: true },
        ],
        recommended: [
          { name: 'Roti Bakar Coklat', price: 'Rp 15k', desc: 'Murah meriah klasik' },
          { name: 'Es Teh Manis', price: 'Rp 5k', desc: 'Free refill kadang' },
        ],
      },
      reviews: [
        { id: 'r8-1', nickname: 'Wahyu · Mhs', rating: 5, comment: 'Budget friendly banget. Buat mahasiswa wajib coba.', ts: '2 hari lalu' },
        { id: 'r8-2', nickname: 'Anonim', rating: 4, comment: 'Outdoor jadi adem, tapi pas hujan kacau.', ts: '5 hari lalu' },
        { id: 'r8-3', nickname: 'Tara', rating: 4, comment: 'Pagi tenang, sore ramai. Pilih waktu yang tepat.', ts: '1 minggu lalu' },
      ],
      ambience: ['outdoor', 'natural-light', 'casual', 'budget-friendly'],
      ac_available: false, indoor_outdoor: 'outdoor', lighting: 'natural',
      note: 'Hidden gem di Antapani. Harga terjangkau, banyak colokan, WiFi cukup. Outdoor tapi teduh, cocok di pagi hari. Tidak ada AC tapi angin semilir.',
      verified_by: 'Yoga F.', last_verified: '6 hari lalu',
      status: 'approved', color: ['#D4BC8A', '#9A7A30'],
      criteria: { wifi_speed: 'medium', power_outlet: 'many', noise_level: 'quiet', setup_ergonomics: 'lumayan', ac_available: false, indoor_outdoor: 'outdoor', lighting: 'natural' },
    },
  ],

  adminQueue: [
    { id: 'sub-1', place: { name: 'Crematology Coffee Roasters', type: 'cafe', address: 'Jl. Kyai Gede Utama No.14, Dago', district: 'dago' }, submittedBy: 'user_andi@gmail.com', submittedAt: '2 jam lalu', status: 'pending', images: 3, note: 'Tempat kerja yang sangat nyaman, WiFi kencang, colokan banyak.' },
    { id: 'sub-2', place: { name: 'Warung Kopi Purnama', type: 'cafe', address: 'Jl. Alkateri No.22, Braga', district: 'braga' }, submittedBy: 'user_dewi@gmail.com', submittedAt: '5 jam lalu', status: 'pending', images: 2, note: 'Kopi legendaris Bandung, ternyata juga punya WiFi dan colokan.' },
    { id: 'sub-3', place: { name: 'Hotel Savoy Homann Lobby', type: 'hotel_lobby', address: 'Jl. Asia Afrika No.112, Braga', district: 'braga' }, submittedBy: 'user_budi@gmail.com', submittedAt: '1 hari lalu', status: 'pending', images: 4, note: 'Lobby hotel bersejarah, bisa kerja sambil menikmati arsitektur Art Deco.' },
  ],
};

// Helpers
function isOpenNow(place, now = new Date()) {
  const days = ['sun','mon','tue','wed','thu','fri','sat'];
  const today = days[now.getDay()];
  const hours = place.operating_hours?.[today];
  if (!hours) return { open: false, label: 'Tutup', next: null };
  const [openStr, closeStr] = hours.split('-');
  const [oh, om] = openStr.split(':').map(Number);
  const [ch, cm] = closeStr.split(':').map(Number);
  const cur = now.getHours() * 60 + now.getMinutes();
  const open = oh * 60 + om;
  const close = ch === 0 ? 24 * 60 : ch * 60 + cm;
  if (cur < open) return { open: false, label: `Buka jam ${openStr}`, hours, next: openStr };
  if (cur >= close) return { open: false, label: 'Sudah tutup', hours, next: null };
  const minsLeft = close - cur;
  if (minsLeft <= 60) return { open: true, label: `Tutup ${minsLeft}m lagi`, hours, soonClosing: true };
  return { open: true, label: `Buka · tutup ${closeStr}`, hours };
}

// Computed: average rating + count from reviews
function avgRating(place) {
  if (!place.reviews?.length) return { avg: null, count: 0 };
  const sum = place.reviews.reduce((a, r) => a + r.rating, 0);
  return { avg: sum / place.reviews.length, count: place.reviews.length };
}

const AMBIENCE_LABELS = {
  'cozy':            { emoji: '☕', label: 'Cozy' },
  'plant-filled':    { emoji: '🌿', label: 'Plant-filled' },
  'natural-light':   { emoji: '☀️', label: 'Natural light' },
  'minimalist':      { emoji: '◻️', label: 'Minimalist' },
  'industrial':      { emoji: '🏭', label: 'Industrial' },
  'rustic':          { emoji: '🪵', label: 'Rustic' },
  'historical':      { emoji: '🏛️', label: 'Historical' },
  'instagramable':   { emoji: '📸', label: 'Instagramable' },
  'productive':      { emoji: '⚡', label: 'Productive' },
  'garden':          { emoji: '🌳', label: 'Garden' },
  'family-friendly': { emoji: '👨‍👩‍👧', label: 'Family-friendly' },
  'dim-light':       { emoji: '🕯️', label: 'Dim-light' },
  'outdoor':         { emoji: '🌤️', label: 'Outdoor' },
  'casual':          { emoji: '😌', label: 'Casual' },
  'budget-friendly': { emoji: '💸', label: 'Budget' },
};

const WFC_HIGHLIGHTS = {
  'deep-focus':     { emoji: '🧘', label: 'Deep focus',     color: '#2D6A4F', bg: '#E8F4EE', desc: 'Tenang, setup proper, ideal buat kerja serius & coding lama.' },
  'cozy-work':      { emoji: '☕', label: 'Cozy work',      color: '#8B6340', bg: '#F0E8DB', desc: 'Suasana nyaman & homey, cocok buat kerja santai sambil ngopi.' },
  'all-rounder':    { emoji: '⭐', label: 'All-rounder',    color: '#A67C52', bg: '#F0E8DB', desc: 'WiFi cepat, banyak colokan, fleksibel buat solo work atau meeting.' },
  'productive':     { emoji: '⚡', label: 'Productive',     color: '#3A6A8B', bg: '#E8F0F5', desc: 'Luas, banyak meja, cahaya bright — bikin fokus tinggi.' },
  'meeting-friendly':{emoji: '👥', label: 'Meeting-friendly',color: '#7A5090', bg: '#F0EAF5', desc: 'Cocok buat call & meeting tim — meja luas, suasana fine.' },
  'budget-vibe':    { emoji: '🪙', label: 'Budget vibe',    color: '#A65C00', bg: '#FFF3D6', desc: 'Aesthetic kuat, harga terjangkau, untuk kerja ringan.' },
  'budget-wfc':     { emoji: '💸', label: 'Budget WFC',     color: '#2D6A4F', bg: '#E8F4EE', desc: 'Murah meriah, basic terpenuhi, cocok buat mahasiswa & freelancer.' },
  'outdoor-escape': { emoji: '🌳', label: 'Outdoor escape', color: '#3A7A50', bg: '#E8F4EE', desc: 'Area outdoor teduh, lepas dari rutinitas kantor.' },
  'social-spot':    { emoji: '📸', label: 'Social spot',    color: '#B03030', bg: '#FDECEA', desc: 'Lively & instagramable — bagus buat meet up, kurang ideal buat deep work.' },
};

window.WFC_DATA = WFC_DATA;
window.WFC_HIGHLIGHTS = WFC_HIGHLIGHTS;
window.isOpenNow = isOpenNow;
window.avgRating = avgRating;
window.AMBIENCE_LABELS = AMBIENCE_LABELS;
