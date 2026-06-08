// DetailPanel.jsx — Honest, photo-evidence-based detail panel
// Measurable: WiFi (Speedtest), hours, menu | Opinion + photos: outlets, seating, vibe
// Exports: DetailPanel, PhotoEvidenceGallery

function DetailPanel({ place, isOpen, onClose, onVerify, isLoggedIn, onLogin, currentUser }) {
  const [activeImage, setActiveImage] = React.useState(0);

  React.useEffect(() => {
    setActiveImage(0);
  }, [place?.id]);

  if (!isOpen || !place) return null;

  const DISTRICT_LABELS = { dago:'Dago', buah_batu:'Buah Batu', braga:'Braga', setiabudhi:'Setiabudhi', antapani:'Antapani', other:'Lainnya' };
  const TYPE_LABELS = { cafe:'Cafe', restaurant:'Restoran', hybrid:'Cafe · Resto', hotel_lobby:'Hotel Lobby', other:'Lainnya' };

  const highlight = window.WFC_HIGHLIGHTS?.[place.highlight];
  const status = window.isOpenNow ? window.isOpenNow(place) : { open: false };
  const ambienceLabels = window.AMBIENCE_LABELS || {};
  const rating = window.avgRating ? window.avgRating(place) : { avg: null, count: 0 };
  const w = place.wifi, o = place.outlets, n = place.noise_context, s = place.seating;

  const imgGradients = [
    place.color,
    [place.color[1], place.color[0]],
    ['#9BB5A0', '#4A7A5A'],
    ['#B5A0C8', '#7A5090'],
  ];

  const wifiTone = w ? (w.download_mbps >= 30 ? 'good' : w.download_mbps >= 15 ? 'okay' : 'bad') : 'gray';
  const TONE = { good: 'var(--green)', okay: 'var(--amber)', bad: 'var(--red)', gray: 'var(--text-3)' };
  const TONE_BG = { good: 'var(--green-bg)', okay: 'var(--amber-bg)', bad: 'var(--red-bg)', gray: 'var(--surface-alt)' };

  const AVAILABILITY = {
    plenty:    { label: 'Banyak',   tone: 'good', desc: 'Hampir semua meja punya akses colokan' },
    adequate:  { label: 'Cukup',    tone: 'okay', desc: 'Sebagian meja punya colokan, perlu pilih' },
    limited:   { label: 'Terbatas', tone: 'bad',  desc: 'Colokan sedikit, harus cepat datang' },
  };

  const SETUP_LABELS = {
    'long-table':      { emoji: '📏', label: 'Meja panjang' },
    'bar':             { emoji: '🍸', label: 'Bar / counter' },
    'sofa':            { emoji: '🛋️', label: 'Sofa lounge' },
    'individual':      { emoji: '◻️', label: 'Meja individual' },
    'gazebo':          { emoji: '🏡', label: 'Gazebo outdoor' },
    'outdoor':         { emoji: '🌤️', label: 'Outdoor' },
    'private-corner':  { emoji: '🪟', label: 'Pojokan privat' },
  };

  const LEVEL_TONE = { 'sepi': 'good', 'tenang': 'good', 'sedang': 'okay', 'ramai': 'bad', 'sangat ramai': 'bad' };

  const DAYS = [
    { id: 'mon', label: 'Senin' },{ id: 'tue', label: 'Selasa' },{ id: 'wed', label: 'Rabu' },
    { id: 'thu', label: 'Kamis' },{ id: 'fri', label: 'Jumat' },{ id: 'sat', label: 'Sabtu' },{ id: 'sun', label: 'Minggu' },
  ];
  const todayId = ['sun','mon','tue','wed','thu','fri','sat'][new Date().getDay()];

  const sheetStyle = {
    position: 'absolute',
    bottom: 0, left: 0, right: 0, zIndex: 50,
    background: 'var(--surface)',
    borderTop: '1px solid var(--border)',
    borderRadius: 'var(--r-lg) var(--r-lg) 0 0',
    boxShadow: '0 -12px 40px rgba(26,23,20,0.18)',
    maxHeight: '85%',
    display: 'flex', flexDirection: 'column',
    overflow: 'hidden',
  };

  return (
    <div style={sheetStyle} className="slide-up-enter">

      {/* Drag handle */}
      <div style={{ position: 'absolute', top: 12, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 5, pointerEvents: 'none' }}>
        <div style={{ width: 40, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.7)', boxShadow: '0 1px 2px rgba(0,0,0,0.2)' }} />
      </div>
      <button onClick={onClose} style={{
        position: 'absolute', top: 14, right: 14, zIndex: 10,
        width: 34, height: 34, borderRadius: '50%',
        background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)',
        border: 'none', cursor: 'pointer', fontSize: 18,
        color: 'var(--text-1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: 'var(--shadow-sm)',
      }}>×</button>

      <div style={{ flex: 1, overflowY: 'auto' }}>

        {/* HERO */}
        <div style={{ position: 'relative', height: 300, overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(135deg, ${imgGradients[activeImage][0]}, ${imgGradients[activeImage][1]})`,
            transition: 'background 0.4s ease',
          }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.55) 100%)' }} />

          <div style={{ position: 'absolute', top: 16, left: 20, zIndex: 2, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <span style={{ padding: '4px 11px', borderRadius: 'var(--r-full)', background: 'rgba(255,255,255,0.95)', color: 'var(--text-1)', fontSize: 11, fontWeight: 700 }}>{TYPE_LABELS[place.type]}</span>
            {rating.count > 0 && (
              <span style={{ padding: '4px 9px', borderRadius: 'var(--r-full)', background: 'rgba(255,255,255,0.95)', color: '#1A1714', fontSize: 11, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <svg width="11" height="11" viewBox="0 0 14 14"><path d="M7 1.2 8.8 4.85 12.8 5.42 9.9 8.24 10.6 12.2 7 10.32 3.4 12.2 4.1 8.24 1.2 5.42 5.2 4.85z" fill="#E0A847"/></svg>
                {rating.avg.toFixed(1)} <span style={{ color: 'var(--text-3)', fontWeight: 500 }}>· {rating.count}</span>
              </span>
            )}
          </div>

          {status.open ? (
            <div style={{ position: 'absolute', top: 16, right: 60, zIndex: 2, display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 11px', background: 'rgba(45,106,79,0.95)', color: 'white', borderRadius: 'var(--r-full)', fontSize: 11, fontWeight: 700 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'white' }}></span>
              {status.label || 'Buka'}
            </div>
          ) : (
            <div style={{ position: 'absolute', top: 16, right: 60, zIndex: 2, padding: '4px 11px', background: 'rgba(0,0,0,0.55)', color: 'white', borderRadius: 'var(--r-full)', fontSize: 11, fontWeight: 700 }}>
              {status.label || 'Tutup'}
            </div>
          )}

          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 28px 22px', color: 'white', zIndex: 2 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.85, marginBottom: 4 }}>{DISTRICT_LABELS[place.district]}</div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 400, lineHeight: 1.05, letterSpacing: '-0.02em', textShadow: '0 2px 12px rgba(0,0,0,0.3)' }}>{place.name}</h1>
          </div>

          {imgGradients.length > 1 && (
            <div style={{ position: 'absolute', bottom: 16, right: 20, zIndex: 3, display: 'flex', gap: 5 }}>
              {imgGradients.map((_, i) => (
                <button key={i} onClick={() => setActiveImage(i)} style={{
                  width: i === activeImage ? 22 : 6, height: 6, borderRadius: 3,
                  background: i === activeImage ? 'white' : 'rgba(255,255,255,0.55)',
                  border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.25s',
                }} />
              ))}
            </div>
          )}
        </div>

        {/* HIGHLIGHT BANNER */}
        {highlight && (
          <div style={{
            padding: '16px 28px',
            background: highlight.bg,
            borderBottom: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 'var(--r-md)',
              background: 'var(--surface)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, flexShrink: 0,
              boxShadow: 'var(--shadow-xs)',
            }}>{highlight.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: highlight.color, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 2 }}>
                Cocok untuk · {highlight.label}
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-1)', lineHeight: 1.45 }}>{highlight.desc}</div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--accent)' }}>{place.price_range_text}</div>
              <div style={{ fontSize: 10, color: 'var(--text-3)' }}>per kunjungan</div>
            </div>
          </div>
        )}

        <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: 36 }}>

          {/* === WiFi — yang benar-benar terukur === */}
          {w && (
            <section>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)' }}>📶 WiFi</h3>
                <span style={{ fontSize: 10, color: 'var(--text-3)', fontStyle: 'italic' }}>Diuji pakai Speedtest</span>
              </div>
              <div style={{ padding: 18, background: 'var(--surface-alt)', borderRadius: 'var(--r-md)', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 42, fontWeight: 400, color: TONE[wifiTone], lineHeight: 1, letterSpacing: '-0.02em' }}>{w.download_mbps}</span>
                  <span style={{ fontSize: 13, color: 'var(--text-2)', fontWeight: 700 }}>Mbps download</span>
                  <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--text-3)', fontWeight: 600 }}>↑ {w.upload_mbps} Mbps · {w.ping_ms}ms ping</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-2)', marginBottom: 6 }}>
                  Provider: <strong style={{ color: 'var(--text-1)' }}>{w.provider}</strong>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-3)', fontStyle: 'italic', borderTop: '1px solid var(--border)', paddingTop: 8, marginTop: 4 }}>
                  Tes terakhir {w.last_tested} · {w.tested_count}× diuji oleh kontributor. Hasil dapat berbeda berdasarkan jam & jumlah pengunjung.
                </div>
              </div>
            </section>
          )}

          {/* === COLOKAN — qualitative + photo evidence === */}
          {o && (
            <section>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)' }}>⚡ Colokan</h3>
                <span style={{ fontSize: 10, color: 'var(--text-3)', fontStyle: 'italic' }}>Bukti foto dari kontributor</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '8px 14px', borderRadius: 'var(--r-md)',
                  background: TONE_BG[AVAILABILITY[o.availability]?.tone || 'gray'],
                  color: TONE[AVAILABILITY[o.availability]?.tone || 'gray'],
                  fontSize: 13, fontWeight: 700,
                }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'currentColor' }}></span>
                  Ketersediaan: {AVAILABILITY[o.availability]?.label || '-'}
                </div>
                <span style={{ fontSize: 12, color: 'var(--text-2)' }}>
                  {AVAILABILITY[o.availability]?.desc}
                </span>
              </div>
              {o.notes && (
                <div style={{ padding: '10px 14px', background: 'var(--surface-alt)', borderRadius: 'var(--r-sm)', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5, marginBottom: 14, fontStyle: 'italic' }}>
                  "{o.notes}"
                </div>
              )}
              {o.photo_evidence && o.photo_evidence.length > 0 && (
                <PhotoEvidenceGallery photos={o.photo_evidence} />
              )}
            </section>
          )}

          {/* === MEJA & KURSI — qualitative + photo evidence === */}
          {s && (
            <section>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)' }}>🪑 Meja & kursi</h3>
                <span style={{ fontSize: 10, color: 'var(--text-3)', fontStyle: 'italic' }}>Bukti foto dari kontributor</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                {s.setup_types?.map(t => {
                  const cfg = SETUP_LABELS[t] || { emoji: '', label: t };
                  return (
                    <span key={t} style={{
                      display: 'inline-flex', alignItems: 'center', gap: 5,
                      padding: '6px 12px', borderRadius: 'var(--r-full)',
                      background: 'var(--surface)', border: '1px solid var(--border)',
                      fontSize: 12, fontWeight: 600, color: 'var(--text-1)',
                    }}>
                      <span>{cfg.emoji}</span>{cfg.label}
                    </span>
                  );
                })}
              </div>
              {s.tips && (
                <div style={{ padding: '10px 14px', background: 'var(--surface-alt)', borderRadius: 'var(--r-sm)', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5, marginBottom: 14, fontStyle: 'italic' }}>
                  "{s.tips}"
                </div>
              )}
              {s.photo_evidence && s.photo_evidence.length > 0 && (
                <PhotoEvidenceGallery photos={s.photo_evidence} />
              )}
            </section>
          )}

          {/* === SUASANA & TIPS DARI KOMUNITAS (opinion, no chart) === */}
          {n && (
            <section>
              <div style={{ marginBottom: 14 }}>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)', marginBottom: 4 }}>🌊 Suasana & tips komunitas</h3>
                <p style={{ fontSize: 12, color: 'var(--text-2)', fontStyle: 'italic', lineHeight: 1.5 }}>
                  Pengalaman dari kontributor yang sering visit — bisa berubah, bukan fakta absolut.
                </p>
              </div>

              <div style={{
                padding: 14, background: 'var(--surface-alt)',
                borderRadius: 'var(--r-md)', border: '1px solid var(--border)',
                marginBottom: 14,
              }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 5 }}>Vibe umum</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)', lineHeight: 1.4 }}>{n.general_vibe}</div>
              </div>

              {/* Crowd patterns sebagai opini, bukan data */}
              {n.crowd_pattern?.length > 0 && (
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>
                    Kapan biasanya ramai
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {n.crowd_pattern.map((p, i) => {
                      const tone = LEVEL_TONE[p.level] || 'gray';
                      return (
                        <div key={i} style={{
                          display: 'flex', gap: 12, padding: '10px 14px',
                          background: 'var(--surface)', borderRadius: 'var(--r-sm)',
                          border: '1px solid var(--border)',
                          borderLeft: `3px solid ${TONE[tone]}`,
                        }}>
                          <div style={{ flexShrink: 0, fontVariantNumeric: 'tabular-nums', fontSize: 12, fontWeight: 700, color: 'var(--text-1)', width: 90 }}>
                            {p.time}
                          </div>
                          <div style={{ flex: 1 }}>
                            <span style={{
                              display: 'inline-block', padding: '1px 8px', borderRadius: 'var(--r-full)',
                              background: TONE_BG[tone],
                              color: TONE[tone],
                              fontSize: 10, fontWeight: 700, textTransform: 'capitalize',
                              marginRight: 8,
                            }}>{p.level}</span>
                            <span style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5 }}>{p.reason}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Special notes */}
              {n.special_notes?.length > 0 && (
                <div style={{ padding: '12px 14px', background: 'var(--amber-bg)', borderRadius: 'var(--r-sm)', borderLeft: '3px solid var(--amber)' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--amber)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 6 }}>
                    💡 Heads up
                  </div>
                  <ul style={{ fontSize: 12, color: 'var(--text-1)', lineHeight: 1.6, paddingLeft: 18, margin: 0 }}>
                    {n.special_notes.map((note, i) => <li key={i}>{note}</li>)}
                  </ul>
                </div>
              )}
            </section>
          )}

          {/* === AMBIENCE === */}
          {place.ambience && place.ambience.length > 0 && (
            <section>
              <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)', marginBottom: 12 }}>✨ Ambience</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {place.ambience.map(a => {
                  const al = ambienceLabels[a] || { emoji: '', label: a };
                  return (
                    <span key={a} style={{
                      display: 'inline-flex', alignItems: 'center', gap: 5,
                      padding: '6px 12px', borderRadius: 'var(--r-full)',
                      background: 'var(--surface)', border: '1px solid var(--border)',
                      fontSize: 12, fontWeight: 600, color: 'var(--text-1)',
                    }}>
                      <span>{al.emoji}</span>{al.label}
                    </span>
                  );
                })}
              </div>
            </section>
          )}

          {/* === MENU === */}
          <MenuSection menu={place.menu} color={place.color} />

          {/* === REVIEWS (interactive) === */}
          <Reviews place={place} currentUser={currentUser} />

          {/* === HOURS === */}
          <section>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)', marginBottom: 12 }}>🕐 Jam buka</h3>
            <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--r-md)', overflow: 'hidden' }}>
              {DAYS.map((d, i) => {
                const isToday = d.id === todayId;
                return (
                  <div key={d.id} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '10px 14px',
                    background: isToday ? 'var(--accent-light)' : 'transparent',
                    borderBottom: i < DAYS.length - 1 ? '1px solid var(--border)' : 'none',
                  }}>
                    <span style={{ fontSize: 13, fontWeight: isToday ? 700 : 500, color: isToday ? 'var(--accent-hover)' : 'var(--text-2)' }}>
                      {d.label}{isToday && <span style={{ fontSize: 10, marginLeft: 8, padding: '1px 7px', background: 'var(--accent)', color: 'white', borderRadius: 'var(--r-full)', fontWeight: 700 }}>HARI INI</span>}
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)', fontVariantNumeric: 'tabular-nums' }}>
                      {place.operating_hours?.[d.id] || '—'}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* === ADDRESS === */}
          <section>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)', marginBottom: 12 }}>📍 Lokasi</h3>
            <div style={{
              padding: 16, borderRadius: 'var(--r-md)',
              background: 'var(--surface-alt)', border: '1px solid var(--border)',
              display: 'flex', alignItems: 'flex-start', gap: 12,
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: 'var(--text-1)', lineHeight: 1.5 }}>{place.address}</div>
                {place.min_purchase && (
                  <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 6 }}>💸 {place.min_purchase}</div>
                )}
              </div>
              <button style={{
                padding: '7px 12px', borderRadius: 'var(--r-sm)',
                background: 'var(--surface)', border: '1px solid var(--border)',
                fontSize: 11, fontWeight: 700, color: 'var(--text-1)',
                cursor: 'pointer', flexShrink: 0, fontFamily: 'var(--font-ui)',
              }}>Buka di Maps ↗</button>
            </div>
          </section>

          {/* Methodology footer — honest disclaimer */}
          <div style={{ fontSize: 10, color: 'var(--text-3)', textAlign: 'center', lineHeight: 1.6, padding: '8px 16px 24px', borderTop: '1px solid var(--border)', paddingTop: 16 }}>
            <strong style={{ color: 'var(--text-2)' }}>Tentang data:</strong> WiFi diuji pakai Speedtest (terukur).<br/>
            Colokan, meja, suasana, dan crowd pattern berdasarkan pengamatan & foto kontributor — bisa berbeda saat kamu visit.
          </div>
        </div>
      </div>
    </div>
  );
}

// PhotoEvidenceGallery — horizontal scrollable strip with captions
function PhotoEvidenceGallery({ photos }) {
  return (
    <div style={{ display: 'flex', gap: 10, overflowX: 'auto', scrollbarWidth: 'thin', paddingBottom: 4 }}>
      {photos.map((p, i) => (
        <figure key={i} style={{ flexShrink: 0, width: 200, margin: 0 }}>
          <div style={{
            width: 200, height: 140, borderRadius: 'var(--r-md)',
            background: `linear-gradient(135deg, ${p.gradient[0]}, ${p.gradient[1]})`,
            position: 'relative', overflow: 'hidden',
            border: '1px solid var(--border)',
          }}>
            <div style={{
              position: 'absolute', top: 8, right: 8,
              padding: '3px 7px', borderRadius: 'var(--r-full)',
              background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(4px)',
              fontSize: 9, fontWeight: 700, color: 'var(--text-2)',
              letterSpacing: '0.04em', textTransform: 'uppercase',
            }}>📷 Foto {i + 1}</div>
          </div>
          <figcaption style={{ fontSize: 11, color: 'var(--text-2)', lineHeight: 1.45, marginTop: 8, padding: '0 2px', textWrap: 'pretty' }}>
            {p.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

Object.assign(window, { DetailPanel, PhotoEvidenceGallery });
