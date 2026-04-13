import { useEffect, useRef, useState } from 'react';

const VENDEDORES_URL =
  'https://script.google.com/macros/s/AKfycbxijOeRbp18ilfPwq6So3v8nxDPA8LNH8zAj3Ly4KnZivo9rhiDbuod8fmZkjTKOChj/exec?api=vendedores';

const PUNTOS_VENTA = {
  Subebida: [
    { nombre: 'Suc. Villa Guerrero', url: 'https://maps.app.goo.gl/U9WedAchCRvqAEKV6' },
    { nombre: 'Suc. Fresno', url: 'https://maps.app.goo.gl/G2trRoZoFX9PfHb97' },
    { nombre: 'Suc. Buenos Aires', url: 'https://maps.app.goo.gl/eJLJDbsR3NhySPgRA' },
  ],
  Mexca: [
    { nombre: 'Suc. Colón', url: 'https://maps.app.goo.gl/dvP7yHoHTpefZ5xA9' },
    { nombre: 'Suc. Vázquez', url: 'https://maps.app.goo.gl/vQjf53UCoTsddCta6' },
  ],
};

function PinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.2-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.5-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5s-.7-1.7-.9-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.2-.3-.2-.5-.3Zm-5.5 7.6h-.1c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4a9.7 9.7 0 0 1-1.5-5.2C2 6.9 6.5 2.4 12 2.4c2.7 0 5.2 1 7 3 1.9 1.9 3 4.4 3 7 0 5.5-4.5 10-10 10Zm8.5-18.5A11.8 11.8 0 0 0 12 .4C5.4.4 0 5.8 0 12.4c0 2.1.6 4.2 1.6 6L0 24l5.8-1.5a11.9 11.9 0 0 0 6.2 1.7h.1c6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.6-8.4Z"/>
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function ChevronIcon({ open }) {
  return (
    <svg
      width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      style={{ transition: 'transform 0.25s', transform: open ? 'rotate(180deg)' : 'rotate(0)' }}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function PuntoCard({ nombre, url }) {
  return (
    <div className="glass rounded-2xl p-4 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <div className="text-amber-300 shrink-0"><PinIcon /></div>
        <span className="font-semibold text-white text-[17px] truncate">{nombre}</span>
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 h-12 px-4 inline-flex items-center justify-center rounded-xl font-semibold text-[15px] bg-gradient-to-br from-amber-300 to-amber-600 text-black active:scale-95 transition-transform shadow-lg shadow-amber-900/40"
      >
        Cómo ir
      </a>
    </div>
  );
}

function PuntosVenta() {
  return (
    <section className="w-full max-w-md mx-auto px-5 pt-8">
      <h2 className="text-2xl font-extrabold text-center mb-1 gold-text">Puntos de Venta Físicos</h2>
      <p className="text-center text-white/70 text-sm mb-5">Compra tu boleto en efectivo</p>

      {Object.entries(PUNTOS_VENTA).map(([grupo, lista]) => (
        <div key={grupo} className="mb-6">
          <h3 className="text-lg font-bold mb-3 text-white/90 px-1">{grupo}</h3>
          <div className="flex flex-col gap-3">
            {lista.map((p) => (
              <PuntoCard key={p.nombre} {...p} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

function Hero({ onCta }) {
  return (
    <section className="w-full max-w-md mx-auto px-5 py-10">
      <div className="glass-strong rounded-3xl p-7 text-center">
        <div className="text-amber-300 text-xs font-bold tracking-[0.25em] mb-3">CHARREADA UNIVERSITARIA</div>
        <h1 className="text-3xl font-extrabold leading-tight mb-2">
          <span className="gold-text">Compra tu boleto</span>
          <br />
          <span className="text-white">de la Charreada Universitaria Masiva</span>
        </h1>
        <p className="text-white/75 text-[15px] mt-3 mb-6">
          El evento más grande del año. No te quedes sin el tuyo.
        </p>
        <button
          onClick={onCta}
          className="w-full h-14 rounded-2xl font-bold text-[17px] bg-gradient-to-br from-red-600 via-red-700 to-red-900 text-white active:scale-[0.98] transition-transform shadow-xl shadow-red-950/60 border border-red-400/30"
        >
          Vendedores en universidades
        </button>
      </div>
    </section>
  );
}

function VendedorCard({ nombre, telefono }) {
  const cleaned = String(telefono || '').replace(/\D/g, '');
  const waLink = `https://wa.me/52${cleaned}?text=Hola%2C+me+interesa+comprar+boletos+para+la+Charreada+Universitaria`;
  return (
    <div className="glass rounded-2xl p-4 flex items-center justify-between gap-3">
      <div className="min-w-0">
        <div className="font-semibold text-white text-[16px] truncate">{nombre}</div>
        <div className="text-white/60 text-xs">Vendedor oficial</div>
      </div>
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 h-12 px-4 inline-flex items-center gap-2 rounded-xl font-semibold text-[15px] bg-gradient-to-br from-emerald-400 to-emerald-600 text-white active:scale-95 transition-transform shadow-lg shadow-emerald-900/40"
      >
        <WhatsAppIcon />
        WhatsApp
      </a>
    </div>
  );
}

function UniversidadAccordion({ universidad, vendedores, open, onToggle }) {
  return (
    <div className="glass rounded-2xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full min-h-[56px] px-5 py-4 flex items-center justify-between gap-3 text-left"
      >
        <div className="min-w-0">
          <div className="font-bold text-white text-[17px] truncate">{universidad}</div>
          <div className="text-white/60 text-xs">{vendedores.length} {vendedores.length === 1 ? 'vendedor' : 'vendedores'}</div>
        </div>
        <div className="text-amber-300 shrink-0"><ChevronIcon open={open} /></div>
      </button>
      {open && (
        <div className="px-3 pb-3 pt-1 flex flex-col gap-2 fade-in">
          {vendedores.map((v, i) => (
            <VendedorCard key={`${v.nombre}-${i}`} {...v} />
          ))}
        </div>
      )}
    </div>
  );
}

function Vendedores({ sectionRef }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openUni, setOpenUni] = useState(null);

  useEffect(() => {
    let alive = true;
    fetch(VENDEDORES_URL)
      .then((r) => {
        if (!r.ok) throw new Error('bad status');
        return r.json();
      })
      .then((json) => {
        if (!alive) return;
        const arr = Array.isArray(json) ? json : json?.data || [];
        const grouped = {};
        for (const row of arr) {
          const uni = (row.universidad || '').trim();
          const nombre = (row.nombre || '').trim();
          const telefono = (row.telefono || '').toString().trim();
          if (!uni || !nombre || !telefono) continue;
          if (!grouped[uni]) grouped[uni] = [];
          grouped[uni].push({ nombre, telefono });
        }
        setData(grouped);
        setLoading(false);
      })
      .catch(() => {
        if (!alive) return;
        setError(true);
        setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  const entries = data ? Object.entries(data).filter(([, list]) => list.length > 0) : [];

  return (
    <section ref={sectionRef} className="w-full max-w-md mx-auto px-5 pt-4 pb-16">
      <h2 className="text-2xl font-extrabold text-center mb-1 gold-text">Vendedores por Universidad</h2>
      <p className="text-center text-white/70 text-sm mb-6">Contacta directo por WhatsApp</p>

      {loading && (
        <div className="glass rounded-2xl p-10 flex flex-col items-center gap-3">
          <div className="spinner" />
          <div className="text-white/70 text-sm">Cargando vendedores…</div>
        </div>
      )}

      {error && !loading && (
        <div className="glass rounded-2xl p-6 text-center">
          <div className="text-3xl mb-2">😕</div>
          <div className="font-semibold text-white mb-1">No pudimos cargar los vendedores</div>
          <div className="text-white/70 text-sm mb-4">Revisa tu conexión e inténtalo de nuevo.</div>
          <button
            onClick={() => window.location.reload()}
            className="h-12 px-5 inline-flex items-center rounded-xl font-semibold bg-white/15 border border-white/25 text-white active:scale-95 transition-transform"
          >
            Reintentar
          </button>
        </div>
      )}

      {!loading && !error && entries.length === 0 && (
        <div className="glass rounded-2xl p-6 text-center text-white/80">
          Aún no hay vendedores disponibles.
        </div>
      )}

      {!loading && !error && entries.length > 0 && (
        <div className="flex flex-col gap-3">
          {entries.map(([uni, list]) => (
            <UniversidadAccordion
              key={uni}
              universidad={uni}
              vendedores={list}
              open={openUni === uni}
              onToggle={() => setOpenUni(openUni === uni ? null : uni)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function RpesModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-5 fade-in"
      style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="glass-strong rounded-3xl p-6 max-w-sm w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-3 right-3 w-10 h-10 inline-flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white active:scale-95 transition-transform"
        >
          <CloseIcon />
        </button>
        <div className="text-amber-300 text-[11px] font-bold tracking-[0.3em] mb-2">RPES.MX</div>
        <h3 className="text-xl font-extrabold text-white leading-tight mb-3">
          ¿Sabías que en <span className="gold-text">RPES.MX</span> puedes reservar en cualquier antro de GDL?
        </h3>
        <p className="text-white/70 text-sm mb-5">
          Mesas, cover, guestlist y más. Escríbenos directo y te ayudamos.
        </p>
        <a
          href="https://instagram.com/rpes.mx"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-14 inline-flex items-center justify-center gap-2 rounded-2xl font-bold text-[16px] text-white active:scale-[0.98] transition-transform shadow-xl"
          style={{ background: 'linear-gradient(135deg,#f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)' }}
        >
          <InstagramIcon />
          Escríbenos en Instagram @rpes.mx
        </a>
      </div>
    </div>
  );
}

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const vendedoresRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setShowModal(true), 600);
    return () => clearTimeout(t);
  }, []);

  const scrollToVendedores = () => {
    vendedoresRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="app-bg min-h-[100svh] w-full">
      <PuntosVenta />
      <Hero onCta={scrollToVendedores} />
      <Vendedores sectionRef={vendedoresRef} />
      {showModal && <RpesModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
