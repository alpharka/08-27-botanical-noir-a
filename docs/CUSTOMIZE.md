# Panduan Kustomisasi Undangan Digital

Panduan ini menjelaskan cara mengganti identitas, isi acara, visual, musik, dan perilaku website undangan **Ayla & Raka** tanpa mengubah arsitektur utama. Website saat ini merupakan frontend-only React sehingga RSVP dan buku tamu disimpan di `localStorage` browser, bukan dikirim ke server.

## 1. Menjalankan proyek secara lokal

Pastikan Node.js dan pnpm tersedia, lalu jalankan perintah berikut dari folder proyek:

```bash
pnpm install
pnpm dev
```

Untuk memastikan hasil produksi dapat dibuat, gunakan:

```bash
pnpm check
pnpm build
```

Perintah `pnpm check` memeriksa TypeScript, sedangkan `pnpm build` membuat bundle produksi. Peringatan ukuran bundle dari Vite tidak menghentikan proses build, tetapi dapat menjadi pekerjaan optimasi lanjutan bila aset dan fitur bertambah.

## 2. Mengganti data pasangan dan acara

Semua data undangan tersentralisasi di bagian `CONFIG` pada file `client/src/pages/Home.tsx`. Jangan menyebarkan nilai data ke banyak komponen karena hal itu membuat personalisasi lebih sulit dan berisiko meninggalkan data lama.

| Properti | Fungsi | Contoh nilai |
|---|---|---|
| `couple` | Nama lengkap yang tampil di cover dan footer | `Ayla & Raka` |
| `shortNames` | Nama panggilan pasangan | `Ayla & Raka` |
| `parents` | Nama orang tua | `Bapak ... & Ibu ...` |
| `dateLabel` | Tanggal yang dibaca manusia | `Sabtu, 18 Oktober 2026` |
| `eventDate` | Target countdown dalam format ISO dengan zona waktu | `2026-10-18T10:00:00+07:00` |
| `akad` | Waktu, venue, dan alamat akad | objek acara |
| `reception` | Waktu, venue, dan alamat resepsi | objek acara |
| `maps` | URL lokasi Google Maps | URL pencarian lokasi |
| `calendar` | URL template Google Calendar | URL event |
| `music` | URL file musik instrumental | URL audio publik |

Contoh konfigurasi acara:

```ts
const CONFIG = {
  couple: "Nama Mempelai 1 & Nama Mempelai 2",
  shortNames: "Panggilan 1 & Panggilan 2",
  dateLabel: "Sabtu, 18 Oktober 2026",
  eventDate: "2026-10-18T10:00:00+07:00",
  akad: {
    time: "10.00 – 11.00 WIB",
    venue: "Nama Venue Akad",
    address: "Alamat lengkap venue",
  },
  reception: {
    time: "12.00 – 15.00 WIB",
    venue: "Nama Venue Resepsi",
    address: "Alamat lengkap venue",
  },
};
```

`eventDate` harus menggunakan tanggal dan jam acara yang benar. Countdown membaca nilai ini setiap detik. URL `calendar` juga perlu dibuat ulang apabila tanggal, jam, lokasi, atau timezone berubah. Website menggunakan timezone Asia/Jakarta pada template saat ini.

## 3. Mengganti nama tamu pada URL

Nama tamu dibaca dari parameter query `to`. Contoh URL:

```text
https://undangan-das-arrjuvvq.manus.space/?to=Keluarga%20Budi%20Santoso
```

Spasi dapat ditulis sebagai `%20`. Website membersihkan whitespace, membatasi panjang nama, dan menampilkannya sebagai teks biasa. Jika parameter tidak tersedia, cover menampilkan `Tamu undangan`.

Untuk membuat banyak link tamu, gunakan pola yang sama dan encode nama tamu sebelum ditempatkan di URL. Jangan menaruh HTML atau script sebagai nilai parameter; nilai tersebut memang diperlakukan sebagai teks, bukan markup.

## 4. Mengganti foto dan emblem

Aset utama menggunakan URL storage berikut di `Home.tsx`:

| Peran | Lokasi penggunaan |
|---|---|
| Hero/cover | `botanical-noir-hero_0030e58f.jpg` |
| Foto cerita | `botanical-noir-story_f7427439.jpg` |
| Emblem daun | `botanical-noir-emblem_dfb05d0e.png` |
| Foto galeri | array `GALLERY` |

Untuk aset baru, simpan file asli di luar folder source, yaitu `/home/ubuntu/webdev-static-assets/`, kemudian unggah menggunakan workflow asset proyek. Gunakan URL storage yang dihasilkan, bukan path lokal. Jangan menaruh foto besar di `client/public` atau `client/src/assets` karena dapat memperlambat deployment.

Array `GALLERY` membutuhkan minimal enam objek. Setiap objek memiliki `src` dan `alt`:

```ts
const GALLERY = [
  {
    src: "/manus-storage/foto-baru.jpg",
    alt: "Deskripsi foto yang informatif",
  },
];
```

Gunakan foto dengan orientasi portrait, landscape, dan crop tinggi untuk mempertahankan ritme masonry. Pastikan setiap foto berbeda dan `alt` menjelaskan isi gambar secara singkat.

## 5. Mengganti tema visual

Token visual utama berada di bagian atas `client/src/index.css`.

| Token | Peran |
|---|---|
| `--ink` | Charcoal gelap untuk latar malam |
| `--ink-2` | Variasi charcoal |
| `--moss` | Hijau moss untuk section detail acara |
| `--brass` | Aksen kuningan dan emblem |
| `--paper` | Warna kertas tulang |
| `--paper-2` | Variasi kertas |
| `--serif` | Font display editorial |
| `--sans` | Font body dan UI |

Untuk mempertahankan identitas Editorial Botanical Noir, ubah token secara terukur dan pertahankan kontras antara teks dan latar. Bila ingin mengganti arah visual sepenuhnya, ubah token terlebih dahulu, lalu periksa cover, section paper, section olive, formulir, tombol, dan lightbox pada desktop serta mobile.

Font dimuat melalui Google Fonts pada `client/src/index.css`. Jangan mengganti font utama dengan Inter jika ingin mempertahankan karakter editorial yang dirancang saat ini. Judul menggunakan Cormorant Garamond, sedangkan UI dan body menggunakan DM Sans.

## 6. Mengganti musik

Ubah `CONFIG.music` dengan URL file audio instrumental yang dapat diakses browser. Musik mulai diputar setelah pengguna menekan **Buka Undangan**, karena browser dapat menolak autoplay sebelum ada interaksi pengguna. Volume default diatur menjadi 24 persen dan audio berjalan loop.

Jika URL audio memerlukan login, cookie, atau header khusus, audio tidak akan berfungsi di website publik. Gunakan file publik yang memiliki izin penggunaan yang sesuai dan uji tombol **Putar musik** serta **Jeda musik** pada browser desktop dan mobile.

## 7. Mengatur RSVP dan buku tamu

Form RSVP memiliki tiga status kehadiran, nama, dan pesan ucapan. Validasi saat ini mewajibkan nama serta pesan tidak kosong. Setelah dikirim, data ditambahkan ke guestbook dan disimpan dengan key berikut:

```text
ayla-raka-guestbook
```

Untuk menghapus data RSVP lokal selama pengujian, buka DevTools browser dan jalankan:

```js
localStorage.removeItem("ayla-raka-guestbook")
```

Data localStorage hanya tersedia pada browser dan perangkat yang sama. Jika data perlu dikumpulkan oleh panitia dari banyak tamu, website perlu di-upgrade ke backend/database. Pada tahap tersebut, ganti penyimpanan lokal dengan endpoint server, tambahkan loading state dan error state, serta validasi server-side. Jangan menambahkan data tamu contoh, testimonial, rating, atau review buatan.

## 8. Mengganti rekening dan QR e-wallet

Detail pembayaran berada di `CONFIG.ewallet` dan `CONFIG.bank`. Ganti provider, nomor, serta nama penerima dengan data final. Tombol salin menghapus spasi saat menyalin agar nomor mudah digunakan.

QR e-wallet dibuat dari payload yang memuat provider, nomor, dan penerima. Setelah nomor diubah, QR akan menggunakan payload baru secara otomatis karena URL QR dirakit dari `CONFIG.ewallet` saat render. Verifikasi hasil scan sebelum undangan dibagikan.

Data rekening di proyek saat ini adalah contoh yang harus diganti. Jangan menerbitkan website publik sebelum nomor, bank, nama penerima, dan QR diverifikasi oleh pemilik undangan.

## 9. Mengubah copy dan bahasa

Copy utama berada langsung di markup section pada `Home.tsx`. Pertahankan gaya kalimat yang hangat, spesifik, dan personal. Beberapa label editorial berbahasa Inggris sengaja dipertahankan sebagai aksen kecil, sedangkan instruksi dan CTA utama menggunakan Bahasa Indonesia.

Saat mengganti copy, periksa panjang teks pada lebar sekitar 320 px. Judul yang terlalu panjang dapat mengubah tinggi section dan ritme layout. Gunakan paragraf pendek untuk cerita dan hindari filler seperti “Welcome to our website”.

## 10. Checklist sebelum membagikan link

| Pemeriksaan | Hasil yang diharapkan |
|---|---|
| URL tanpa `to` | Cover menampilkan `Tamu undangan` |
| URL dengan `?to=` | Nama tamu tampil aman dan tidak merusak layout |
| Tombol buka | Cover slide-up dan konten menjadi interaktif |
| Musik | Playback dimulai setelah interaksi atau dapat dipicu dari kontrol floating |
| Countdown | Menampilkan nilai yang terus diperbarui menuju tanggal acara |
| Google Maps | Membuka lokasi yang benar pada tab baru |
| Google Calendar | Membuka event dengan tanggal, waktu, lokasi, dan timezone benar |
| Galeri | Enam foto tampil tanpa duplikasi dan memiliki alt text |
| Lightbox | Mendukung klik overlay, tombol navigasi, Escape, ArrowLeft, dan ArrowRight |
| RSVP kosong | Menampilkan validasi dan tidak membuat entry |
| RSVP berhasil | Entry baru muncul di guestbook dan tersimpan lokal |
| Tombol salin | Label berubah menjadi `Tersalin` sementara |
| Mobile | Tidak ada overflow horizontal atau navigasi menutupi konten |
| Reduced motion | Konten tampil langsung saat preferensi motion dikurangi |
| Data final | Nama, tanggal, lokasi, rekening, dan e-wallet sudah diverifikasi |

## 11. Struktur file penting

```text
client/
  index.html                 # Judul dan bahasa dokumen
  src/
    pages/Home.tsx           # Data CONFIG, section, interaksi, GALLERY
    index.css                # Token tema, layout, responsive, motion
ideas.md                     # Arah visual dan keputusan desain
```

Untuk perubahan kecil pada isi, biasanya cukup mengubah `CONFIG`, `GALLERY`, dan copy di `Home.tsx`. Untuk perubahan tema, ubah token dan aturan layout di `index.css`. Hindari mengubah folder `server` karena proyek ini ditujukan sebagai frontend-only.

## 12. Referensi teknis

Dokumentasi ini tidak menambahkan ketergantungan eksternal baru. Referensi berikut digunakan sebagai bacaan lanjutan untuk konsep yang relevan dengan implementasi:

[1]: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API "MDN Web Docs — Intersection Observer API"
[2]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage "MDN Web Docs — Window localStorage"
[3]: https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API "MDN Web Docs — Clipboard API"
[4]: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/dialog_role "MDN Web Docs — ARIA dialog role"
