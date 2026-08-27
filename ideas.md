# Brainstorm Arah Visual — Undangan Digital Tema Baru

## Tiga Pendekatan Awal

### Tema: Editorial Botanical Noir
**Very Brief Intro:** Undangan bernuansa malam yang intim dengan fotografi botanical, tipografi editorial, dan aksen kuningan hangat. Terasa dewasa, puitis, dan personal tanpa jatuh ke gaya cyberpunk.

**Probability:** 0.07

### Tema: Coastal Paper Modern
**Very Brief Intro:** Arah terang dengan warna pasir, biru kabut, dan tekstur kertas arsip yang menghadirkan suasana pesisir yang tenang. Layout lapang dan fotografi natural memberi rasa hangat serta effortless.

**Probability:** 0.04

### Tema: Japanese Ceremony Minimal
**Very Brief Intro:** Komposisi hening yang terinspirasi wabi-sabi, memakai ruang kosong, tinta arang, merah vermilion sebagai aksen, dan detail cap emblem yang sangat terukur.

**Probability:** 0.02

## Pendekatan Terpilih: Editorial Botanical Noir

### Design Movement
Editorial romanticism bertemu botanical still life dan dark-paper stationery: dramatis namun tenang, berlapis tekstur, dan terasa seperti undangan cetak eksklusif yang hidup di layar.

### Core Principles
1. **Ruang gelap sebagai kanvas:** latar charcoal hangat memberi panggung bagi nama, foto, dan aksen emas.
2. **Editorial asimetris:** kolom offset, garis vertikal, dan crop foto yang berani menggantikan susunan kartu seragam.
3. **Botanical sebagai bahasa visual:** motif ranting, daun, dan garis ukir menjadi benang merah antarseksi.
4. **Interaksi yang hening:** motion lembut, reveal bertahap, dan kontrol yang jelas tanpa efek berlebihan.

### Color Philosophy
Charcoal tinta (#171815) membawa kedalaman dan suasana malam. Moss gelap (#4D5A45) menyiratkan pertumbuhan dan perjalanan bersama. Kuningan antik (#C6A56A) dipakai hemat sebagai tanda momen penting, bukan dekorasi berlebihan. Kertas tulang (#E8E1D3) memberi kontras hangat untuk blok cerita dan detail acara.

### Layout Paradigm
Halaman memakai jalur editorial memanjang: hero terbagi antara teks besar dan portrait image, cerita bergerak dalam kolom offset, detail acara memakai garis waktu vertikal, dan galeri menggunakan masonry dengan satu gambar jangkar yang lebih besar. Konten tidak dipusatkan secara seragam.

### Signature Elements
- Emblem berupa dua daun yang membentuk lengkung inisial, tanpa teks.
- Garis tipis kuningan dengan titik koordinat kecil sebagai separator.
- Tekstur grain kertas dan ilustrasi ranting garis halus di sudut section.

### Interaction Philosophy
Setiap aksi terasa seperti membuka lembar undangan: tombol memiliki respons tekan yang singkat, navigasi membawa pengguna dengan smooth scroll, dan lightbox memberi fokus penuh pada satu foto. Feedback RSVP harus langsung, sopan, dan tidak mengarang data tamu.

### Animation
Cover naik dari bawah selama 720 ms dengan cubic-bezier yang lembut. Header muncul sedikit terlambat melalui opacity dan translateY. Section reveal memakai IntersectionObserver dengan translateY 18px dan opacity, sementara foto menggunakan scale 1.025 ke 1. Hover galeri hanya memperbesar sangat halus. Semua motion non-esensial dimatikan pada prefers-reduced-motion.

### Typography System
Display menggunakan **Cormorant Garamond** untuk nama pasangan, angka tanggal, dan judul section; karakternya romantis dan editorial. Body menggunakan **DM Sans** untuk keterbacaan UI dan detail. Eyebrow memakai DM Sans uppercase dengan tracking lebar. Hierarki: display 72–112px desktop, 48–68px mobile; heading 40–64px; body 15–18px dengan line-height longgar.

### Brand Essence
Undangan digital malam yang dirancang untuk pasangan yang ingin merayakan kisah mereka dengan keintiman, tekstur, dan ketenangan yang berkarakter.

Personality: **intimate, artful, grounded**.

### Brand Voice
Headline dan CTA terdengar hangat, spesifik, dan sedikit puitis; bukan filler generik.

Contoh headline: “Dari percakapan kecil, kami sampai pada hari ini.”

Contoh CTA: “Masuk ke cerita kami” dan “Tandai tanggalnya”.

### Wordmark & Logo
Logo adalah emblem grafis tanpa teks: dua daun ramping yang saling berhadapan, membentuk lengkung seperti huruf ampersand abstrak. Emblem tampil dalam kuningan antik di cover dan versi tinta gelap di section kertas.

### Signature Brand Color
**Antique Brass — #C6A56A**, warna penanda yang mengikat malam, kertas, dan momen perayaan dalam satu aksen yang mudah dikenali.

## Style Decisions

- Emblem dua daun wajib muncul berulang sebagai seal kecil pada setiap section, bukan hanya di cover atau footer.
- Semua fotografi harus dibaca sebagai satu dunia nocturnal botanical: charcoal, moss, ivory, skin tone, dan warm brass; foto daylight dipakai hanya bila tetap mendukung mood tersebut.
- Bahasa utama undangan adalah Bahasa Indonesia. Bahasa Inggris hanya dipertahankan bila menjadi aksen editorial kecil, bukan pengganti copy utama.
- Section RSVP dan tanda kasih memakai tekstur grain, garis kuningan, dan aksen stationery agar tindakan praktis tetap terasa intim dan seremonial.
