// PlaceCard.jsx — Individual place listing card
// Verified badge: icon-only (blue checkmark) next to name
// Shows match indicator when filters are active
// Exports: PlaceCard, CriteriaPill, PlaceholderImage

function PlaceholderImage({ place, style }) {
  const [c1, c2] = place.color || ['#C8A882', '#8B6340'];
  return (
    <div style={{
      ...style,
      background: `linear-gradient(135deg, ${c1}, ${c2})`,
      flexShrink: 0,
    }} />
  );
}

function VerifiedIcon() {
  // Subtle blue checkmark — like Twitter/LinkedIn
  return (
    <span title="Verified by admin" style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: 14, height: 14, flexShrink: 0,
    }}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 13c3.314 0 6-2.686 6-6S10.314 1 7 1 1 3.686 1 7s2.686 6 6 6Z" fill="#3B82F6"/>
        <path d="M4.5 7L6.2 8.7L9.5 5.4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
  );
}

function CriteriaPill({ type, value }) {
  const CONFIG = {
    wifi: {
      fast:    { label: 'WiFi cepat',  cls: 'pill-green' },
      medium:  { label: 'WiFi medium', cls: 'pill-amber' },
      slow:    { label: 'WiFi lambat', cls: 'pill-red'   },
    },
    outlet: {
      many: { label: 'Colokan banyak',   cls: 'pill-green' },
      few:  { label: 'Colokan beberapa', cls: 'pill-amber' },
      none: { label: 'No colokan',       cls: 'pill-red'   },
    },
    noise: {
      quiet:    { label: 'Quiet',    cls: 'pill-green' },
      moderate: { label: 'Moderate', cls: 'pill-amber' },
      lively:   { label: 'Lively',   cls: 'pill-red'   },
    },
    setup: {
      proper:  { label: 'Setup proper',  cls: 'pill-green' },
      lumayan: { label: 'Setup lumayan', cls: 'pill-amber' },
      kurang:  { label: 'Setup kurang',  cls: 'pill-red'   },
    },
  };

  const conf = CONFIG[type]?.[String(value)];
  if (!conf) return null;
  return <span className={`pill ${conf.cls}`}>{conf.label}</span>;
}

function PriceRange({ range, text }) {
  const dots = [1,2,3,4].map(i => (
    <span key={i} style={{
      width: 5, height: 5, borderRadius: '50%',
      background: i <= range ? 'var(--accent)' : 'var(--border)',
      display: 'inline-block',
    }} />
  ));
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }} title={text}>
      {dots}
      <span style={{ marginLeft: 4, fontSize: 11, color: 'var(--text-2)', fontWeight: 600 }}>{text}</span>
    </span>
  );
}

function PlaceCard({ place, isActive, onClick, matchInfo, dimIfUnmatched }) {
  const DISTRICT_LABELS = {
    dago: 'Dago', buah_batu: 'Buah Batu', braga: 'Braga',
    setiabudhi: 'Setiabudhi', antapani: 'Antapani', other: 'Lainnya',
  };
  const TYPE_LABELS = {
    cafe: 'Cafe', restaurant: 'Restoran', hybrid: 'Cafe·Resto',
    hotel_lobby: 'Hotel Lobby', other: 'Lainnya',
  };

  const isUnmatched = dimIfUnmatched && matchInfo && matchInfo.matched < matchInfo.total;
  const isPerfectMatch = matchInfo && matchInfo.matched === matchInfo.total && matchInfo.total > 0;

  const cardStyle = {
    display: 'flex', gap: 12,
    padding: '14px 16px',
    cursor: 'pointer',
    borderBottom: '1px solid var(--border)',
    background: isActive ? 'var(--accent-light)' : 'transparent',
    borderLeft: isActive ? '3px solid var(--accent)' : '3px solid transparent',
    transition: 'background 0.15s, border-color 0.15s, opacity 0.2s',
    opacity: isUnmatched ? 0.55 : 1,
    position: 'relative',
  };

  return (
    <div
      style={cardStyle}
      onClick={() => onClick(place)}
      onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'var(--surface-alt)'; }}
      onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
    >
      {/* Thumbnail */}
      <PlaceholderImage
        place={place}
        style={{ width: 72, height: 72, borderRadius: 'var(--r-md)', flexShrink: 0 }}
      />

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Name row — verified is now an icon inline with name */}
        <div style={{ marginBottom: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 2 }}>
            <span style={{ fontWeight: 700, fontSize: 13.5, color: 'var(--text-1)', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {place.name}
            </span>
            <VerifiedIcon />
            {/* Match badge — only when filters active */}
            {isPerfectMatch && (
              <span style={{
                marginLeft: 'auto', flexShrink: 0,
                fontSize: 10, fontWeight: 700,
                color: 'var(--accent)',
                padding: '2px 7px', borderRadius: 'var(--r-full)',
                border: '1px solid var(--accent)',
                background: 'var(--accent-light)',
                whiteSpace: 'nowrap',
              }}>✓ Cocok</span>
            )}
            {matchInfo && !isPerfectMatch && matchInfo.matched > 0 && (
              <span style={{
                marginLeft: 'auto', flexShrink: 0,
                fontSize: 10, fontWeight: 700, color: 'var(--text-3)',
                whiteSpace: 'nowrap',
              }}>{matchInfo.matched}/{matchInfo.total}</span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '2px 6px' }}>
            <span style={{ fontSize: 11, color: 'var(--text-3)', whiteSpace: 'nowrap' }}>
              {TYPE_LABELS[place.type]} · {DISTRICT_LABELS[place.district]}
            </span>
            <PriceRange range={place.price_range} text={place.price_range_text} />
          </div>
        </div>

        {/* Highlight badge — character tag */}
        {place.highlight && WFC_HIGHLIGHTS[place.highlight] && (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            padding: '4px 9px', borderRadius: 'var(--r-full)',
            background: WFC_HIGHLIGHTS[place.highlight].bg,
            color: WFC_HIGHLIGHTS[place.highlight].color,
            fontSize: 11, fontWeight: 700, letterSpacing: '0.01em',
            marginBottom: 6, marginTop: 6,
          }}>
            <span>{WFC_HIGHLIGHTS[place.highlight].emoji}</span>
            <span>{WFC_HIGHLIGHTS[place.highlight].label}</span>
          </div>
        )}

        {/* Factual pills with REAL numbers */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 6 }}>
          {place.wifi && (
            <span className="pill pill-gray" title={`Diuji ${place.wifi.tested_count}×`}>
              <span style={{ color: place.wifi.download_mbps >= 30 ? 'var(--green)' : place.wifi.download_mbps >= 15 ? 'var(--amber)' : 'var(--red)', fontWeight: 800 }}>
                {place.wifi.download_mbps}
              </span>
              <span style={{ opacity: 0.7, marginLeft: 2 }}>Mbps</span>
            </span>
          )}
          {place.outlets && (
            <span
              className="pill pill-gray"
              title={place.outlets.notes}
              style={{
                color: place.outlets.availability === 'plenty' ? 'var(--green)' :
                  place.outlets.availability === 'limited' ? 'var(--amber)' : 'var(--red)',
                fontWeight: 700,
              }}
            >
              ⚡ Colokan {place.outlets.availability === 'plenty' ? 'banyak' : place.outlets.availability === 'limited' ? 'terbatas' : 'sedikit'}
            </span>
          )}
          {place.menu?.signature?.[0] && (
            <span className="pill pill-accent" title={`Most fav: ${place.menu.signature[0].name}`}>
              <span>⭐</span>
              <span>{place.menu.signature[0].name.length > 16 ? place.menu.signature[0].name.slice(0,14) + '…' : place.menu.signature[0].name}</span>
            </span>
          )}
        </div>

        {/* Open status + rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: 'var(--text-3)' }}>
          {(() => {
            const status = isOpenNow(place);
            return (
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: status.open ? 'var(--green)' : 'var(--text-3)' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: status.open ? 'var(--green)' : 'var(--text-3)', display: 'inline-block' }}></span>
                <span style={{ fontWeight: 600 }}>{status.open ? 'Buka sekarang' : 'Tutup'}</span>
              </span>
            );
          })()}
          {(() => {
            const r = window.avgRating ? window.avgRating(place) : null;
            if (!r || !r.count) return null;
            return (
              <>
                <span style={{ color: 'var(--border-mid)' }}>·</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                  <svg width="10" height="10" viewBox="0 0 14 14"><path d="M7 1.2 8.8 4.85 12.8 5.42 9.9 8.24 10.6 12.2 7 10.32 3.4 12.2 4.1 8.24 1.2 5.42 5.2 4.85z" fill="#E0A847"/></svg>
                  <span style={{ fontWeight: 700, color: 'var(--text-1)' }}>{r.avg.toFixed(1)}</span>
                  <span>({r.count})</span>
                </span>
              </>
            );
          })()}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { PlaceCard, CriteriaPill, PlaceholderImage, VerifiedIcon });
