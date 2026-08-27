/* Editorial Botanical Noir: editorial asymmetry, charcoal/moss/brass palette, quiet motion, Cormorant + DM Sans. */
import { useEffect, useMemo, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, Clipboard, Clock3, Copy, Disc3, ExternalLink, Gem, Heart, MapPin, Music2, Pause, Play, Send, X } from "lucide-react";
import { toast } from "sonner";

const CONFIG = {
  couple: "Ayla & Raka",
  shortNames: "Ayla & Raka",
  parents: "Bapak Arman Pratama & Ibu Larasati · Bapak Dimas Wijaya & Ibu Sekar Ayu",
  dateLabel: "Sabtu, 18 Oktober 2026",
  eventDate: "2026-10-18T10:00:00+07:00",
  akad: { time: "10.00 – 11.00 WIB", venue: "Pendopo Aruna", address: "Jl. Kemuning No. 18, Yogyakarta" },
  reception: { time: "12.00 – 15.00 WIB", venue: "Taman Aruna", address: "Jl. Kemuning No. 18, Yogyakarta" },
  maps: "https://www.google.com/maps/search/?api=1&query=Pendopo+Aruna+Yogyakarta",
  calendar: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Ayla%20%26%20Raka%20-%20Pernikahan&dates=20261018T030000Z/20261018T080000Z&details=Hari%20bahagia%20Ayla%20dan%20Raka&location=Pendopo%20Aruna%2C%20Yogyakarta&ctz=Asia%2FJakarta",
  ewallet: { provider: "DANA", number: "0812 3456 7890", recipient: "Ayla Pratama" },
  bank: { name: "Bank Mandiri", number: "1420 8899 1033", recipient: "Raka Wijaya" },
  music: "https://cdn.pixabay.com/download/audio/2022/10/30/audio_9463e5f2ed.mp3?filename=romantic-piano-126182.mp3",
};

const GALLERY = [
  { src: "/manus-storage/botanical-noir-gallery-1_3d58555f.jpg", alt: "Ayla dan Raka di antara rerumputan tinggi" },
  { src: "/manus-storage/botanical-noir-gallery-2_93c53997.jpg", alt: "Tangan Ayla dan Raka dengan cincin pernikahan" },
  { src: "/manus-storage/botanical-noir-hero_0030e58f.jpg", alt: "Ayla dan Raka berjalan di taman botani" },
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=85", alt: "Pasangan berjalan di alam terbuka" },
  { src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=85", alt: "Detail dekorasi meja pernikahan" },
  { src: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=900&q=85", alt: "Pasangan berdiri dalam cahaya senja" },
];

type Guest = { name: string; attendance: string; message: string; time: string };

function getGuestName() {
  const raw = new URLSearchParams(window.location.search).get("to");
  return (raw?.replace(/\s+/g, " ").trim().slice(0, 80) || "Tamu undangan");
}

function useCountdown() {
  const target = useMemo(() => new Date(CONFIG.eventDate).getTime(), []);
  const [left, setLeft] = useState(Math.max(0, target - Date.now()));
  useEffect(() => { const timer = window.setInterval(() => setLeft(Math.max(0, target - Date.now())), 1000); return () => window.clearInterval(timer); }, [target]);
  const total = Math.floor(left / 1000);
  return { days: Math.floor(total / 86400), hours: Math.floor(total / 3600) % 24, minutes: Math.floor(total / 60) % 60, seconds: total % 60 };
}

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [guests, setGuests] = useState<Guest[]>(() => JSON.parse(localStorage.getItem("ayla-raka-guestbook") || "[]"));
  const [form, setForm] = useState({ name: "", attendance: "Saya akan hadir", message: "" });
  const [copied, setCopied] = useState("");
  const countdown = useCountdown();
  const guestName = getGuestName();
  const audio = useMemo(() => new Audio(CONFIG.music), []);
  audio.loop = true; audio.volume = 0.24;

  useEffect(() => { document.body.classList.toggle("locked", lightbox !== null); return () => document.body.classList.remove("locked"); }, [lightbox]);
  useEffect(() => { const onKey = (e: KeyboardEvent) => { if (lightbox === null) return; if (e.key === "Escape") setLightbox(null); if (e.key === "ArrowLeft") setLightbox((lightbox + GALLERY.length - 1) % GALLERY.length); if (e.key === "ArrowRight") setLightbox((lightbox + 1) % GALLERY.length); }; window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey); }, [lightbox]);
  useEffect(() => { const els = document.querySelectorAll("[data-reveal]"); const obs = new IntersectionObserver(entries => entries.forEach(e => { const el = e.target as HTMLElement; if (e.isIntersecting) { el.classList.add("is-visible"); obs.unobserve(el); } }), { threshold: 0.12 }); els.forEach(el => obs.observe(el)); return () => obs.disconnect(); }, [opened]);

  const openInvite = () => { setOpened(true); audio.play().then(() => setMusicOn(true)).catch(() => setMusicOn(false)); };
  const toggleMusic = () => { if (musicOn) { audio.pause(); setMusicOn(false); } else { audio.play().then(() => setMusicOn(true)).catch(() => toast.error("Musik belum dapat diputar. Coba lagi.")); } };
  const copyValue = async (key: string, value: string) => { try { await navigator.clipboard.writeText(value.replace(/\s/g, "")); } catch { const ta = document.createElement("textarea"); ta.value = value; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); ta.remove(); } setCopied(key); window.setTimeout(() => setCopied(""), 2000); };
  const submit = (e: React.FormEvent) => { e.preventDefault(); if (!form.name.trim() || !form.message.trim()) { toast.error("Nama dan pesan ucapan perlu diisi."); return; } const entry = { ...form, name: form.name.trim().slice(0, 60), message: form.message.trim().slice(0, 280), time: new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(new Date()) }; const next = [entry, ...guests]; setGuests(next); localStorage.setItem("ayla-raka-guestbook", JSON.stringify(next)); setForm({ name: "", attendance: "Saya akan hadir", message: "" }); toast.success("Terima kasih, ucapanmu sudah tersimpan di perangkat ini."); };

  return <div className="site-shell">
    <div className={`cover ${opened ? "cover--opened" : ""}`} aria-hidden={opened}>
      <div className="cover-image" />
      <div className="cover-overlay" />
      <div className="cover-content">
        <img className="emblem emblem--large" src="/manus-storage/botanical-noir-emblem_dfb05d0e.png" alt="Emblem Ayla dan Raka" />
        <p className="eyebrow">THE WEDDING OF</p><h1>{CONFIG.couple}</h1><p className="cover-date">{CONFIG.dateLabel}</p>
        <div className="guest-line"><span>Untuk</span><strong>{guestName}</strong></div>
        <button className="brass-button" onClick={openInvite}>Buka Undangan <span>↗</span></button>
      </div><p className="cover-foot">Dengan penuh sukacita, kami mengundangmu</p>
    </div>

    <header className={`topbar ${opened ? "topbar--visible" : ""}`}><a className="brand" href="#top"><img src="/manus-storage/botanical-noir-emblem_dfb05d0e.png" alt="" /> <span>A / R</span></a><nav><a href="#story">Cerita</a><a href="#details">Detail acara</a><a href="#gallery">Galeri</a><a href="#rsvp">RSVP</a><a href="#gift">Tanda kasih</a></nav><span className="top-date">18.10.26</span></header>

    <main id="top">
      <section className="hero section-dark"><div className="hero-copy" data-reveal><p className="eyebrow brass">18 — 10 — 2026</p><h2>Dua hati,<br /><em>satu janji</em><br />yang tenang.</h2><p className="hero-lede">Kami menemukan rumah dalam satu sama lain. Hari ini, kami ingin merayakannya bersamamu.</p><a className="text-link" href="#story">Masuk ke cerita kami <span>↓</span></a></div><div className="hero-portrait" data-reveal><img src="/manus-storage/botanical-noir-hero_0030e58f.jpg" alt="Ayla dan Raka berjalan di taman botani" /><span className="vertical-label">AYLA &amp; RAKA · YOGYAKARTA</span></div></section>

      <section id="story" className="story section-paper"><div className="section-mark"><img src="/manus-storage/botanical-noir-emblem_dfb05d0e.png" alt="" /> 01 /</div><div className="story-grid"><div data-reveal><p className="eyebrow">THE BEGINNING</p><h2>Dari percakapan kecil, kami sampai pada hari ini.</h2></div><div className="story-text" data-reveal><p>Awalnya hanya obrolan panjang yang selalu terasa singkat. Dari meja kopi, perjalanan yang tidak direncanakan, dan hari-hari biasa yang pelan-pelan menjadi istimewa.</p><p>Di antara banyak kemungkinan, kami memilih untuk berjalan ke arah yang sama. Dengan doa keluarga dan orang-orang yang kami cintai, kami mengundangmu menjadi bagian dari langkah berikutnya.</p><p className="signature">Dengan hangat,<br /><strong>Ayla &amp; Raka</strong></p></div><img className="story-image" src="/manus-storage/botanical-noir-story_f7427439.jpg" alt="Undangan kertas, daun, dan kotak cincin" /></div></section>

      <section id="details" className="details section-olive"><div className="section-mark"><img src="/manus-storage/botanical-noir-emblem_dfb05d0e.png" alt="" /> 02 /</div><div className="details-heading" data-reveal><p className="eyebrow brass">TANDAI HARINYA</p><h2>Hari yang kami<br /><em>nantikan.</em></h2><div className="countdown"><div><b>{String(countdown.days).padStart(2, "0")}</b><span>hari</span></div><i>:</i><div><b>{String(countdown.hours).padStart(2, "0")}</b><span>jam</span></div><i>:</i><div><b>{String(countdown.minutes).padStart(2, "0")}</b><span>menit</span></div><i>:</i><div><b>{String(countdown.seconds).padStart(2, "0")}</b><span>detik</span></div></div></div><div className="event-list"><article data-reveal><span className="event-no">01</span><div><p className="eyebrow brass">AKAD NIKAH</p><h3>{CONFIG.akad.venue}</h3><p>{CONFIG.dateLabel}<br />{CONFIG.akad.time}<br />{CONFIG.akad.address}</p></div></article><article data-reveal><span className="event-no">02</span><div><p className="eyebrow brass">RESEPSI</p><h3>{CONFIG.reception.venue}</h3><p>{CONFIG.dateLabel}<br />{CONFIG.reception.time}<br />{CONFIG.reception.address}</p></div></article><div className="event-actions"><a className="outline-button" href={CONFIG.maps} target="_blank" rel="noreferrer"><MapPin size={15} /> Lihat lokasi</a><a className="outline-button" href={CONFIG.calendar} target="_blank" rel="noreferrer"><CalendarDays size={15} /> Simpan ke kalender</a></div></div></section>

      <section id="gallery" className="gallery section-dark"><div className="section-mark"><img src="/manus-storage/botanical-noir-emblem_dfb05d0e.png" alt="" /> 03 /</div><div className="gallery-head" data-reveal><p className="eyebrow brass">A FEW FRAMES</p><h2>Hal-hal kecil<br /><em>yang kami simpan.</em></h2></div><div className="masonry">{GALLERY.map((item, i) => <button className={`gallery-item item-${i + 1}`} key={item.src} onClick={() => setLightbox(i)} aria-label={`Lihat foto ${i + 1}: ${item.alt}`} data-reveal><img src={item.src} alt={item.alt} /><span>Lihat foto {String(i + 1).padStart(2, "0")} ↗</span></button>)}</div></section>

      <section id="rsvp" className="rsvp section-paper"><div className="section-mark"><img src="/manus-storage/botanical-noir-emblem_dfb05d0e.png" alt="" /> 04 /</div><div className="rsvp-grid"><div data-reveal><p className="eyebrow">YOUR PRESENCE</p><h2>Semoga kamu<br /><em>bisa hadir.</em></h2><p className="muted">Beri tahu kami kabarmu. Pesan yang kamu tinggalkan akan tersimpan di perangkat ini.</p></div><div data-reveal><form onSubmit={submit}><label htmlFor="name">Nama lengkap</label><input id="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Tulis namamu" maxLength={60} /><label>Kehadiran</label><div className="radio-row">{["Saya akan hadir", "Belum bisa memastikan", "Tidak dapat hadir"].map(x => <label className="radio" key={x}><input type="radio" name="attendance" checked={form.attendance === x} onChange={() => setForm({ ...form, attendance: x })} /> <span>{x}</span></label>)}</div><label htmlFor="message">Pesan ucapan</label><textarea id="message" rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tulis doa terbaikmu untuk kami" maxLength={280} /><button className="dark-button" type="submit"><Send size={15} /> Kirim konfirmasi</button></form><div className="guestbook"><p className="eyebrow">GUESTBOOK · {guests.length}</p>{guests.length === 0 ? <p className="empty">Pesan ucapanmu akan muncul di sini setelah dikirim.</p> : guests.map((g, i) => <div className="guest-entry" key={`${g.name}-${i}`}><div><strong>{g.name}</strong><span>{g.attendance} · {g.time}</span></div><p>“{g.message}”</p></div>)}</div></div></div></section>

      <section id="gift" className="gift section-dark"><div className="section-mark"><img src="/manus-storage/botanical-noir-emblem_dfb05d0e.png" alt="" /> 05 /</div><div className="gift-content" data-reveal><p className="eyebrow brass">SEBUAH TANDA KECIL</p><h2>Tanda kasih<br /><em>dan doa.</em></h2><p className="muted light">Kehadiran dan doa baikmu adalah hadiah paling berarti. Bila ingin mengirim tanda kasih, berikut detailnya.</p><div className="gift-grid"><div className="gift-detail"><img className="qr" src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(`DANA ${CONFIG.ewallet.number} a.n. ${CONFIG.ewallet.recipient}`)}`} alt={`QR code ${CONFIG.ewallet.provider}`} /><div><p className="eyebrow brass">{CONFIG.ewallet.provider}</p><h3>{CONFIG.ewallet.number}</h3><p>a.n. {CONFIG.ewallet.recipient}</p><button className="copy-button" onClick={() => copyValue("wallet", CONFIG.ewallet.number)}><Copy size={14} /> {copied === "wallet" ? "Tersalin" : "Salin nomor"}</button></div></div><div className="gift-detail gift-bank"><div className="bank-symbol"><Gem size={21} /></div><div><p className="eyebrow brass">{CONFIG.bank.name}</p><h3>{CONFIG.bank.number}</h3><p>a.n. {CONFIG.bank.recipient}</p><button className="copy-button" onClick={() => copyValue("bank", CONFIG.bank.number)}><Copy size={14} /> {copied === "bank" ? "Tersalin" : "Salin nomor"}</button></div></div></div></div></section>
    </main>

    <footer className="footer section-dark"><img className="emblem" src="/manus-storage/botanical-noir-emblem_dfb05d0e.png" alt="" /><h2>Sampai jumpa<br /><em>di hari itu.</em></h2><p>{CONFIG.couple} · {CONFIG.dateLabel}</p></footer>
    <button className={`music-control ${opened ? "music-control--visible" : ""}`} onClick={toggleMusic} aria-label={musicOn ? "Jeda musik" : "Putar musik"}>{musicOn ? <Pause size={17} /> : <Play size={17} />}<span>{musicOn ? "Musik menyala" : "Putar musik"}</span></button>
    <nav className={`mobile-nav ${opened ? "mobile-nav--visible" : ""}`} aria-label="Navigasi utama"><a href="#story"><Heart size={15} /><span>Cerita</span></a><a href="#details"><Clock3 size={15} /><span>Detail</span></a><a href="#gallery"><Disc3 size={15} /><span>Galeri</span></a><a href="#rsvp"><Send size={15} /><span>RSVP</span></a><a href="#gift"><Gem size={15} /><span>Kasih</span></a></nav>
    {lightbox !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Galeri foto" onClick={() => setLightbox(null)}><button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Tutup"><X /></button><button className="lightbox-prev" onClick={e => { e.stopPropagation(); setLightbox((lightbox + GALLERY.length - 1) % GALLERY.length); }} aria-label="Foto sebelumnya"><ChevronLeft /></button><figure onClick={e => e.stopPropagation()}><img src={GALLERY[lightbox].src} alt={GALLERY[lightbox].alt} /><figcaption>{String(lightbox + 1).padStart(2, "0")} / {String(GALLERY.length).padStart(2, "0")} · {GALLERY[lightbox].alt}</figcaption></figure><button className="lightbox-next" onClick={e => { e.stopPropagation(); setLightbox((lightbox + 1) % GALLERY.length); }} aria-label="Foto berikutnya"><ChevronRight /></button></div>}
  </div>;
}
