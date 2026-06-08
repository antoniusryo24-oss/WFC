// SubmissionForm.jsx — Image-first, content-aligned, enjoyable to fill
// Multi-step: Foto → Identitas → Vibe → Fasilitas → Menu → Preview
// Exports: SubmissionForm

function SubmissionForm({ onClose, onSubmit, isLoggedIn, onLogin, currentUser }) {
  const [step, setStep] = React.useState(1);
  const TOTAL_STEPS = 6;
  const [submitted, setSubmitted] = React.useState(false);

  const [form, setForm] = React.useState({
    // 1. Foto
    photos: [],            // [{ id, gradient, caption, category }]
    // 2. Identitas
    name: '', type: 'cafe', district: 'dago', address: '',
    price_range: 2, min_purchase: '',
    highlight: '',
    // 3. Vibe & suasana
    general_vibe: '',
    ambience: [],
    special_notes: [],     // free-form list
    note: '',              // submitter note (story)
    // 4. Fasilitas
    wifi_tested: false,
    wifi_download: '', wifi_upload: '', wifi_ping: '', wifi_provider: '',
    outlet_availability: '', outlet_notes: '',
    setup_types: [], setup_tips: '',
    ac_available: true, indoor_outdoor: 'indoor',
    // 5. Menu
    menu_signature: [],    // [{ name, price, desc }]
    menu_recommended: [],
    // 6. Operating hours (compact)
    hours_uniform: '08:00-22:00',
    hours_weekend_same: true,
    hours_weekend: '08:00-23:00',
  });

  const handleField = React.useCallback((key) => (e) => {
    setForm(prev => ({ ...prev, [key]: e.target.value }));
  }, []);
  const set = React.useCallback((key, val) => {
    setForm(prev => ({ ...prev, [key]: val }));
  }, []);
  const toggleArray = React.useCallback((key, val) => {
    setForm(prev => ({ ...prev, [key]: prev[key].includes(val) ? prev[key].filter(v => v !== val) : [...prev[key], val] }));
  }, []);

  // -------------- photo helpers
  const PHOTO_CATEGORIES = [
    { id: 'cover', label: 'Cover / suasana', emoji: '🌅', tip: 'Foto suasana keseluruhan' },
    { id: 'outlet', label: 'Bukti colokan', emoji: '⚡', tip: 'Foto colokan & meja kerja' },
    { id: 'seating', label: 'Meja & kursi', emoji: '🪑', tip: 'Foto setup meja kerja' },
    { id: 'ambience', label: 'Detail vibe', emoji: '✨', tip: 'Foto detail interior/exterior' },
  ];
  const GRADIENT_PALETTE = [
    ['#C8A882','#8B6340'], ['#9BB5A0','#4A7A5A'], ['#B5A0C8','#7A5090'],
    ['#A0B5C8','#3A6A8B'], ['#D4BC8A','#9A7A30'], ['#A8C5A0','#3A7A50'],
  ];

  function addMockPhoto(category) {
    if (form.photos.length >= 8) return;
    const g = GRADIENT_PALETTE[form.photos.length % GRADIENT_PALETTE.length];
    set('photos', [...form.photos, {
      id: Date.now() + Math.random(),
      gradient: g, caption: '', category,
    }]);
  }
  function removePhoto(id) {
    set('photos', form.photos.filter(p => p.id !== id));
  }
  function updatePhotoField(id, key, val) {
    set('photos', form.photos.map(p => p.id === id ? { ...p, [key]: val } : p));
  }

  // -------------- highlight catalog (matches data.js)
  const HIGHLIGHTS = window.WFC_HIGHLIGHTS || {};
  const HIGHLIGHT_LIST = ['deep-focus', 'cozy-work', 'all-rounder', 'productive', 'meeting-friendly', 'budget-vibe', 'budget-wfc', 'outdoor-escape', 'social-spot']
    .map(id => ({ id, ...HIGHLIGHTS[id] })).filter(h => h.label);

  const AMBIENCE = window.AMBIENCE_LABELS || {};
  const AMBIENCE_LIST = Object.entries(AMBIENCE).map(([id, v]) => ({ id, ...v }));

  const SETUP_TYPES = [
    { id: 'long-table', emoji: '📏', label: 'Meja panjang' },
    { id: 'bar', emoji: '🍸', label: 'Bar / counter' },
    { id: 'sofa', emoji: '🛋️', label: 'Sofa lounge' },
    { id: 'individual', emoji: '◻️', label: 'Meja individual' },
    { id: 'gazebo', emoji: '🏡', label: 'Gazebo outdoor' },
    { id: 'outdoor', emoji: '🌤️', label: 'Outdoor seating' },
    { id: 'private-corner', emoji: '🪟', label: 'Pojokan privat' },
  ];

  // Menu items helpers
  function addMenuItem(key) {
    if (form[key].length >= 5) return;
    set(key, [...form[key], { name: '', price: '', desc: '' }]);
  }
  function updateMenuItem(key, idx, field, val) {
    set(key, form[key].map((it, i) => i === idx ? { ...it, [field]: val } : it));
  }
  function removeMenuItem(key, idx) {
    set(key, form[key].filter((_, i) => i !== idx));
  }

  function addSpecialNote() {
    set('special_notes', [...form.special_notes, '']);
  }
  function updateSpecialNote(idx, val) {
    set('special_notes', form.special_notes.map((n, i) => i === idx ? val : n));
  }
  function removeSpecialNote(idx) {
    set('special_notes', form.special_notes.filter((_, i) => i !== idx));
  }

  // -------------- gating
  const canProceed = (() => {
    if (step === 1) return form.photos.length >= 2;
    if (step === 2) return form.name.trim().length > 1 && form.address.trim().length > 4 && form.highlight;
    if (step === 3) return form.general_vibe.trim().length > 8 && form.ambience.length >= 2;
    if (step === 4) return !!form.outlet_availability && form.setup_types.length > 0;
    if (step === 5) return form.menu_signature.length === 0 || form.menu_signature.every(m => m.name && m.price);
    if (step === 6) return true;
    return true;
  })();

  const canProceedReason = (() => {
    if (step === 1) return form.photos.length < 2 ? `Minimal 2 foto (${form.photos.length}/2)` : '';
    if (step === 2) return !form.highlight ? 'Pilih highlight tempat' : !form.name ? 'Isi nama' : !form.address ? 'Isi alamat' : '';
    if (step === 3) return form.general_vibe.length < 8 ? 'Tulis vibe (min 8 huruf)' : form.ambience.length < 2 ? 'Pilih min 2 tag ambience' : '';
    if (step === 4) return !form.outlet_availability ? 'Pilih ketersediaan colokan' : form.setup_types.length === 0 ? 'Pilih jenis tempat duduk' : '';
    return '';
  })();

  function handleFinalSubmit() {
    setSubmitted(true);
    setTimeout(() => {
      onSubmit(form);
      onClose();
    }, 1500);
  }

  // -------------- shared styles
  const overlayStyle = {
    position: 'fixed', inset: 0, zIndex: 200,
    background: 'rgba(26,23,20,0.6)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    backdropFilter: 'blur(4px)', padding: 20,
  };
  const panelStyle = {
    background: 'var(--surface)',
    borderRadius: 'var(--r-xl)',
    width: '100%', maxWidth: 640,
    maxHeight: '92vh',
    display: 'flex', flexDirection: 'column',
    boxShadow: 'var(--shadow-xl)',
    overflow: 'hidden',
  };
  const inputStyle = {
    width: '100%', height: 44, padding: '0 14px',
    border: '1.5px solid var(--border)', borderRadius: 'var(--r-md)',
    fontFamily: 'var(--font-ui)', fontSize: 14, color: 'var(--text-1)',
    background: 'var(--surface-alt)', outline: 'none', transition: 'border-color 0.15s',
  };
  const selectStyle = { ...inputStyle, cursor: 'pointer' };
  const labelStyle = { fontSize: 11, fontWeight: 700, color: 'var(--text-2)', display: 'block', marginBottom: 6, letterSpacing: '0.04em', textTransform: 'uppercase' };
  const sectionStyle = { display: 'flex', flexDirection: 'column', gap: 16 };

  function ChipButton({ label, emoji, active, onClick, dim }) {
    return (
      <button type="button" onClick={onClick} style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '8px 14px', borderRadius: 'var(--r-full)',
        border: active ? '1.5px solid var(--text-1)' : '1.5px solid var(--border)',
        background: active ? 'var(--text-1)' : 'var(--surface)',
        color: active ? 'var(--surface)' : 'var(--text-2)',
        fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 600,
        cursor: 'pointer', opacity: dim ? 0.5 : 1, transition: 'all 0.15s', whiteSpace: 'nowrap',
      }}>
        {emoji && <span style={{ fontSize: 14 }}>{emoji}</span>}
        {label}
      </button>
    );
  }

  // -------------- success overlay
  if (submitted) {
    return (
      <div style={overlayStyle}>
        <div style={{ ...panelStyle, maxWidth: 420, padding: '48px 36px', textAlign: 'center', alignItems: 'center' }} className="fade-in">
          <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 400, marginBottom: 10, lineHeight: 1.2 }}>Submission terkirim!</h2>
          <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.5, marginBottom: 20 }}>
            Terima kasih sudah kontribusi ke komunitas. Admin akan review dalam 1–2 hari kerja, dan kamu bakal dapet notifikasi kalau udah live.
          </p>
        </div>
      </div>
    );
  }

  // -------------- render
  return (
    <div style={overlayStyle} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={panelStyle} className="fade-in">

        {/* Header */}
        <div style={{ padding: '18px 24px 14px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexShrink: 0 }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 400, marginBottom: 2, lineHeight: 1.1 }}>
              Rekomendasiin tempat
            </h2>
            <div style={{ fontSize: 12, color: 'var(--text-2)' }}>
              Bagikan tempat WFC favoritmu ke komunitas Bandung
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 22, color: 'var(--text-3)', lineHeight: 1, padding: 4 }}>×</button>
        </div>

        {/* Step pills */}
        <div style={{ padding: '14px 24px', borderBottom: '1px solid var(--border)', flexShrink: 0, display: 'flex', gap: 6, overflowX: 'auto', scrollbarWidth: 'none' }}>
          {['Foto', 'Identitas', 'Vibe', 'Fasilitas', 'Menu', 'Review'].map((label, i) => {
            const n = i + 1;
            const isActive = n === step;
            const isDone = n < step;
            return (
              <button key={n} type="button" onClick={() => n < step && setStep(n)}
                disabled={n > step}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '6px 12px', borderRadius: 'var(--r-full)',
                  border: '1.5px solid',
                  borderColor: isActive ? 'var(--accent)' : isDone ? 'var(--border)' : 'var(--border)',
                  background: isActive ? 'var(--accent-light)' : isDone ? 'var(--green-bg)' : 'var(--surface-alt)',
                  color: isActive ? 'var(--accent-hover)' : isDone ? 'var(--green)' : 'var(--text-3)',
                  fontSize: 12, fontWeight: 700, cursor: n < step ? 'pointer' : 'default',
                  flexShrink: 0, transition: 'all 0.15s', fontFamily: 'var(--font-ui)',
                }}>
                <span style={{ fontSize: 10 }}>{isDone ? '✓' : `0${n}`}</span>
                {label}
              </button>
            );
          })}
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>

          {/* ========== STEP 1: PHOTOS ========== */}
          {step === 1 && (
            <div style={sectionStyle}>
              <div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>Mulai dengan foto 📸</h3>
                <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5 }}>
                  Foto adalah bukti utama. Upload foto-foto yang jelas — komunitas akan percaya kalau ada bukti visual.
                </p>
              </div>

              {/* Category-based upload */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {PHOTO_CATEGORIES.map(cat => {
                  const catPhotos = form.photos.filter(p => p.category === cat.id);
                  return (
                    <div key={cat.id} style={{ padding: 14, background: 'var(--surface-alt)', borderRadius: 'var(--r-md)', border: '1px solid var(--border)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                        <span style={{ fontSize: 18 }}>{cat.emoji}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)' }}>{cat.label}</div>
                          <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{cat.tip}</div>
                        </div>
                        <button type="button" onClick={() => addMockPhoto(cat.id)}
                          disabled={form.photos.length >= 8}
                          style={{
                            padding: '6px 12px', borderRadius: 'var(--r-sm)', border: 'none',
                            background: 'var(--surface)', color: 'var(--text-1)',
                            fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-ui)',
                          }}
                        >+ Tambah foto</button>
                      </div>
                      {catPhotos.length > 0 && (
                        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
                          {catPhotos.map((photo) => (
                            <div key={photo.id} style={{ flexShrink: 0, width: 130 }}>
                              <div style={{
                                position: 'relative', width: 130, height: 90, borderRadius: 'var(--r-sm)',
                                background: `linear-gradient(135deg, ${photo.gradient[0]}, ${photo.gradient[1]})`,
                                marginBottom: 6,
                              }}>
                                <button onClick={() => removePhoto(photo.id)} style={{
                                  position: 'absolute', top: 4, right: 4,
                                  width: 22, height: 22, borderRadius: '50%',
                                  background: 'rgba(0,0,0,0.6)', border: 'none',
                                  color: 'white', fontSize: 13, cursor: 'pointer', lineHeight: 1,
                                }}>×</button>
                              </div>
                              {cat.id !== 'cover' && (
                                <input type="text" placeholder="Caption (opsional)"
                                  value={photo.caption}
                                  onChange={e => updatePhotoField(photo.id, 'caption', e.target.value)}
                                  style={{ ...inputStyle, height: 30, fontSize: 11, padding: '0 8px' }}
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div style={{ padding: '12px 14px', background: 'var(--accent-light)', borderRadius: 'var(--r-md)', borderLeft: '3px solid var(--accent)', fontSize: 12, color: 'var(--text-1)', lineHeight: 1.5 }}>
                💡 <strong>Tips:</strong> Foto colokan & meja kerja sangat membantu user lain mempercayai rekomendasimu.
              </div>
            </div>
          )}

          {/* ========== STEP 2: IDENTITAS ========== */}
          {step === 2 && (
            <div style={sectionStyle}>
              <div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>Identitas tempat 🏠</h3>
                <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5 }}>
                  Detail dasar yang user butuh sebelum mereka berangkat.
                </p>
              </div>

              <div>
                <label style={labelStyle}>Nama tempat</label>
                <input style={inputStyle} value={form.name} onChange={handleField('name')}
                  placeholder="cth: Kopi Selasar"
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={labelStyle}>Tipe venue</label>
                  <select style={selectStyle} value={form.type} onChange={handleField('type')}>
                    <option value="cafe">Cafe</option>
                    <option value="restaurant">Restoran</option>
                    <option value="hybrid">Cafe / Resto</option>
                    <option value="hotel_lobby">Hotel Lobby</option>
                    <option value="other">Lainnya</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Area</label>
                  <select style={selectStyle} value={form.district} onChange={handleField('district')}>
                    <option value="dago">Dago</option>
                    <option value="buah_batu">Buah Batu</option>
                    <option value="braga">Braga</option>
                    <option value="setiabudhi">Setiabudhi</option>
                    <option value="antapani">Antapani</option>
                    <option value="other">Lainnya</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Alamat lengkap</label>
                <input style={inputStyle} value={form.address} onChange={handleField('address')}
                  placeholder="cth: Jl. Bukit Pakar Timur No.100, Ciburial"
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={labelStyle}>Kisaran harga</label>
                  <div style={{ display: 'flex', gap: 4, padding: 3, background: 'var(--surface-alt)', borderRadius: 'var(--r-md)' }}>
                    {[{val:1,label:'< 30k'},{val:2,label:'30–60k'},{val:3,label:'60–100k'},{val:4,label:'> 100k'}].map(o => (
                      <button key={o.val} type="button" onClick={() => set('price_range', o.val)}
                        style={{
                          flex: 1, padding: '8px 4px', borderRadius: 'var(--r-sm)', border: 'none',
                          background: form.price_range === o.val ? 'var(--surface)' : 'transparent',
                          color: form.price_range === o.val ? 'var(--text-1)' : 'var(--text-2)',
                          fontSize: 11, fontWeight: form.price_range === o.val ? 700 : 600,
                          cursor: 'pointer', fontFamily: 'var(--font-ui)',
                          boxShadow: form.price_range === o.val ? 'var(--shadow-xs)' : 'none',
                        }}>{o.label}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Min. purchase (opsional)</label>
                  <input style={inputStyle} value={form.min_purchase} onChange={handleField('min_purchase')}
                    placeholder="cth: Min. 1 minuman"
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'} />
                </div>
              </div>

              {/* Highlight selector — VISUAL CARDS */}
              <div>
                <label style={labelStyle}>Cocok untuk apa? <span style={{ color: 'var(--text-3)', fontWeight: 500, textTransform: 'none' }}>· pilih satu</span></label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                  {HIGHLIGHT_LIST.map(h => (
                    <button key={h.id} type="button" onClick={() => set('highlight', h.id)}
                      style={{
                        textAlign: 'left',
                        padding: '12px 12px', borderRadius: 'var(--r-md)',
                        border: form.highlight === h.id ? `2px solid ${h.color}` : '2px solid var(--border)',
                        background: form.highlight === h.id ? h.bg : 'var(--surface)',
                        cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'var(--font-ui)',
                      }}>
                      <div style={{ fontSize: 20, marginBottom: 4 }}>{h.emoji}</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: form.highlight === h.id ? h.color : 'var(--text-1)' }}>
                        {h.label}
                      </div>
                    </button>
                  ))}
                </div>
                {form.highlight && HIGHLIGHTS[form.highlight] && (
                  <div className="fade-in" style={{
                    marginTop: 10, padding: '10px 14px',
                    background: HIGHLIGHTS[form.highlight].bg,
                    color: 'var(--text-1)', borderRadius: 'var(--r-sm)',
                    fontSize: 12, lineHeight: 1.5, fontStyle: 'italic',
                  }}>
                    "{HIGHLIGHTS[form.highlight].desc}"
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========== STEP 3: VIBE ========== */}
          {step === 3 && (
            <div style={sectionStyle}>
              <div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>Suasana & vibe 🌊</h3>
                <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5 }}>
                  Ceritakan vibe tempatnya — ini yang bedain rekomendasimu dari yang lain.
                </p>
              </div>

              <div>
                <label style={labelStyle}>Vibe umum <span style={{ color: 'var(--text-3)', fontWeight: 500, textTransform: 'none' }}>· 1 kalimat</span></label>
                <input style={inputStyle} value={form.general_vibe} onChange={handleField('general_vibe')}
                  placeholder="cth: Tenang dan kondusif untuk fokus"
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'} />
              </div>

              <div>
                <label style={labelStyle}>Ambience tags <span style={{ color: 'var(--text-3)', fontWeight: 500, textTransform: 'none' }}>· pilih 2–5</span></label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {AMBIENCE_LIST.map(a => (
                    <ChipButton key={a.id} label={a.label} emoji={a.emoji}
                      active={form.ambience.includes(a.id)}
                      onClick={() => toggleArray('ambience', a.id)} />
                  ))}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4 }}>{form.ambience.length} dipilih</div>
              </div>

              <div>
                <label style={labelStyle}>Heads-up untuk komunitas <span style={{ color: 'var(--text-3)', fontWeight: 500, textTransform: 'none' }}>· opsional</span></label>
                <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 8 }}>
                  Hal-hal penting yang user perlu tahu sebelum datang. cth: "Jumat sore biasanya ramai anak SMA", "Hindari weekend kalau mau kerja serius"
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {form.special_notes.map((note, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: 6 }}>
                      <input style={inputStyle} value={note} onChange={e => updateSpecialNote(idx, e.target.value)}
                        placeholder="cth: Sabtu sore biasanya ada live music"
                        onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                        onBlur={e => e.target.style.borderColor = 'var(--border)'} />
                      <button type="button" onClick={() => removeSpecialNote(idx)}
                        style={{
                          width: 44, height: 44, borderRadius: 'var(--r-md)',
                          border: '1.5px solid var(--border)', background: 'var(--surface)',
                          cursor: 'pointer', fontSize: 16, color: 'var(--text-3)', flexShrink: 0,
                        }}>×</button>
                    </div>
                  ))}
                  <button type="button" onClick={addSpecialNote}
                    style={{
                      padding: '10px 14px', borderRadius: 'var(--r-md)',
                      border: '1.5px dashed var(--border-mid)',
                      background: 'transparent', color: 'var(--text-2)',
                      fontSize: 12, fontWeight: 600, cursor: 'pointer',
                      fontFamily: 'var(--font-ui)',
                    }}>+ Tambah heads-up</button>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Cerita kamu <span style={{ color: 'var(--text-3)', fontWeight: 500, textTransform: 'none' }}>· biar personal</span></label>
                <textarea value={form.note} onChange={handleField('note')}
                  placeholder="Apa yang bikin tempat ini spesial untukmu? Tulis pengalaman pribadi yang relate ke pekerjaanmu."
                  style={{ ...inputStyle, height: 100, padding: '12px 14px', resize: 'vertical', lineHeight: 1.5 }}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'} />
              </div>
            </div>
          )}

          {/* ========== STEP 4: FASILITAS ========== */}
          {step === 4 && (
            <div style={sectionStyle}>
              <div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>Fasilitas WFC ⚡</h3>
                <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5 }}>
                  Detail yang user pakai buat mutuskan apakah mereka bisa kerja di sini.
                </p>
              </div>

              {/* WiFi */}
              <div style={{ padding: 16, background: 'var(--surface-alt)', borderRadius: 'var(--r-md)', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>📶 WiFi (Speedtest)</div>
                    <div style={{ fontSize: 11, color: 'var(--text-3)' }}>Skip kalau belum sempat tes</div>
                  </div>
                  <button type="button" onClick={() => set('wifi_tested', !form.wifi_tested)}
                    style={{
                      padding: '6px 12px', borderRadius: 'var(--r-full)', border: '1.5px solid',
                      borderColor: form.wifi_tested ? 'var(--green)' : 'var(--border)',
                      background: form.wifi_tested ? 'var(--green-bg)' : 'var(--surface)',
                      color: form.wifi_tested ? 'var(--green)' : 'var(--text-2)',
                      fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-ui)',
                    }}>
                    {form.wifi_tested ? '✓ Sudah tes' : 'Belum tes'}
                  </button>
                </div>
                {form.wifi_tested && (
                  <div className="fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                    <div>
                      <div style={{ fontSize: 10, color: 'var(--text-3)', marginBottom: 4, fontWeight: 600 }}>Download (Mbps)</div>
                      <input style={{ ...inputStyle, height: 36, fontSize: 13 }} type="number" value={form.wifi_download}
                        onChange={handleField('wifi_download')} placeholder="47" />
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: 'var(--text-3)', marginBottom: 4, fontWeight: 600 }}>Upload (Mbps)</div>
                      <input style={{ ...inputStyle, height: 36, fontSize: 13 }} type="number" value={form.wifi_upload}
                        onChange={handleField('wifi_upload')} placeholder="18" />
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: 'var(--text-3)', marginBottom: 4, fontWeight: 600 }}>Ping (ms)</div>
                      <input style={{ ...inputStyle, height: 36, fontSize: 13 }} type="number" value={form.wifi_ping}
                        onChange={handleField('wifi_ping')} placeholder="24" />
                    </div>
                  </div>
                )}
              </div>

              {/* Outlets */}
              <div>
                <label style={labelStyle}>Ketersediaan colokan</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 8 }}>
                  {[
                    { val: 'plenty', label: 'Banyak', desc: 'Hampir semua meja', tone: 'good' },
                    { val: 'adequate', label: 'Cukup', desc: 'Sebagian meja', tone: 'okay' },
                    { val: 'limited', label: 'Terbatas', desc: 'Harus rebutan', tone: 'bad' },
                  ].map(opt => {
                    const TONE = { good: '#2D6A4F', okay: '#A65C00', bad: '#B03030' };
                    const TONE_BG = { good: '#E8F4EE', okay: '#FFF3D6', bad: '#FDECEA' };
                    const active = form.outlet_availability === opt.val;
                    return (
                      <button key={opt.val} type="button" onClick={() => set('outlet_availability', opt.val)}
                        style={{
                          padding: '12px', borderRadius: 'var(--r-md)',
                          border: active ? `2px solid ${TONE[opt.tone]}` : '2px solid var(--border)',
                          background: active ? TONE_BG[opt.tone] : 'var(--surface)',
                          cursor: 'pointer', textAlign: 'center', fontFamily: 'var(--font-ui)',
                        }}>
                        <div style={{
                          width: 12, height: 12, borderRadius: '50%',
                          background: TONE[opt.tone], margin: '0 auto 6px',
                        }}></div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: active ? TONE[opt.tone] : 'var(--text-1)' }}>{opt.label}</div>
                        <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 2 }}>{opt.desc}</div>
                      </button>
                    );
                  })}
                </div>
                <input style={inputStyle} value={form.outlet_notes} onChange={handleField('outlet_notes')}
                  placeholder="Catatan: di mana colokannya? (opsional)"
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'} />
              </div>

              {/* Setup types */}
              <div>
                <label style={labelStyle}>Tempat duduk yang tersedia <span style={{ color: 'var(--text-3)', fontWeight: 500, textTransform: 'none' }}>· pilih semua yang ada</span></label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {SETUP_TYPES.map(t => (
                    <ChipButton key={t.id} label={t.label} emoji={t.emoji}
                      active={form.setup_types.includes(t.id)}
                      onClick={() => toggleArray('setup_types', t.id)} />
                  ))}
                </div>
              </div>

              <div>
                <label style={labelStyle}>Tips meja & kursi <span style={{ color: 'var(--text-3)', fontWeight: 500, textTransform: 'none' }}>· opsional</span></label>
                <input style={inputStyle} value={form.setup_tips} onChange={handleField('setup_tips')}
                  placeholder="cth: Lantai 2 paling nyaman buat kerja seharian"
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'} />
              </div>

              {/* AC + indoor/outdoor */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={labelStyle}>AC</label>
                  <div style={{ display: 'flex', gap: 4, padding: 3, background: 'var(--surface-alt)', borderRadius: 'var(--r-md)' }}>
                    {[{val: true, label: '❄️ Ada'}, {val: false, label: 'Tidak ada'}].map(o => (
                      <button key={String(o.val)} type="button" onClick={() => set('ac_available', o.val)}
                        style={{
                          flex: 1, padding: '8px', borderRadius: 'var(--r-sm)', border: 'none',
                          background: form.ac_available === o.val ? 'var(--surface)' : 'transparent',
                          color: form.ac_available === o.val ? 'var(--text-1)' : 'var(--text-2)',
                          fontSize: 12, fontWeight: 700, cursor: 'pointer',
                          fontFamily: 'var(--font-ui)',
                          boxShadow: form.ac_available === o.val ? 'var(--shadow-xs)' : 'none',
                        }}>{o.label}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Lokasi</label>
                  <div style={{ display: 'flex', gap: 4, padding: 3, background: 'var(--surface-alt)', borderRadius: 'var(--r-md)' }}>
                    {[{val:'indoor',label:'Indoor'},{val:'outdoor',label:'Outdoor'},{val:'both',label:'Mix'}].map(o => (
                      <button key={o.val} type="button" onClick={() => set('indoor_outdoor', o.val)}
                        style={{
                          flex: 1, padding: '8px', borderRadius: 'var(--r-sm)', border: 'none',
                          background: form.indoor_outdoor === o.val ? 'var(--surface)' : 'transparent',
                          color: form.indoor_outdoor === o.val ? 'var(--text-1)' : 'var(--text-2)',
                          fontSize: 12, fontWeight: 700, cursor: 'pointer',
                          fontFamily: 'var(--font-ui)',
                          boxShadow: form.indoor_outdoor === o.val ? 'var(--shadow-xs)' : 'none',
                        }}>{o.label}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========== STEP 5: MENU ========== */}
          {step === 5 && (
            <div style={sectionStyle}>
              <div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>Menu rekomendasi 🍽️</h3>
                <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5 }}>
                  Bantu user dengan rekomendasi menu — most favorite & lainnya yang oke.
                </p>
              </div>

              {/* Signature */}
              <div>
                <label style={labelStyle}>⭐ Most favorite <span style={{ color: 'var(--text-3)', fontWeight: 500, textTransform: 'none' }}>· wajib coba (1–3 items)</span></label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {form.menu_signature.map((item, idx) => (
                    <div key={idx} style={{ padding: 12, background: 'var(--accent-light)', borderRadius: 'var(--r-md)', border: '1px solid var(--accent-light)' }}>
                      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                        <input style={{ ...inputStyle, flex: 2 }} placeholder="Nama menu"
                          value={item.name} onChange={e => updateMenuItem('menu_signature', idx, 'name', e.target.value)}
                          onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                          onBlur={e => e.target.style.borderColor = 'var(--border)'} />
                        <input style={{ ...inputStyle, flex: 1 }} placeholder="Rp 28k"
                          value={item.price} onChange={e => updateMenuItem('menu_signature', idx, 'price', e.target.value)}
                          onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                          onBlur={e => e.target.style.borderColor = 'var(--border)'} />
                        <button type="button" onClick={() => removeMenuItem('menu_signature', idx)}
                          style={{ width: 44, height: 44, borderRadius: 'var(--r-md)', border: '1.5px solid var(--border)', background: 'var(--surface)', cursor: 'pointer', fontSize: 16, color: 'var(--text-3)', flexShrink: 0 }}>×</button>
                      </div>
                      <input style={inputStyle} placeholder="Deskripsi singkat (opsional)"
                        value={item.desc} onChange={e => updateMenuItem('menu_signature', idx, 'desc', e.target.value)}
                        onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                        onBlur={e => e.target.style.borderColor = 'var(--border)'} />
                    </div>
                  ))}
                  {form.menu_signature.length < 3 && (
                    <button type="button" onClick={() => addMenuItem('menu_signature')}
                      style={{ padding: '12px 14px', borderRadius: 'var(--r-md)', border: '1.5px dashed var(--accent)', background: 'transparent', color: 'var(--accent-hover)', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-ui)' }}>
                      + Tambah most favorite
                    </button>
                  )}
                </div>
              </div>

              {/* Recommended */}
              <div>
                <label style={labelStyle}>Lainnya yang oke <span style={{ color: 'var(--text-3)', fontWeight: 500, textTransform: 'none' }}>· opsional</span></label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {form.menu_recommended.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: 8 }}>
                      <input style={{ ...inputStyle, flex: 2 }} placeholder="Nama menu"
                        value={item.name} onChange={e => updateMenuItem('menu_recommended', idx, 'name', e.target.value)}
                        onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                        onBlur={e => e.target.style.borderColor = 'var(--border)'} />
                      <input style={{ ...inputStyle, flex: 1 }} placeholder="Rp"
                        value={item.price} onChange={e => updateMenuItem('menu_recommended', idx, 'price', e.target.value)}
                        onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                        onBlur={e => e.target.style.borderColor = 'var(--border)'} />
                      <button type="button" onClick={() => removeMenuItem('menu_recommended', idx)}
                        style={{ width: 44, height: 44, borderRadius: 'var(--r-md)', border: '1.5px solid var(--border)', background: 'var(--surface)', cursor: 'pointer', fontSize: 16, color: 'var(--text-3)', flexShrink: 0 }}>×</button>
                    </div>
                  ))}
                  {form.menu_recommended.length < 5 && (
                    <button type="button" onClick={() => addMenuItem('menu_recommended')}
                      style={{ padding: '10px 14px', borderRadius: 'var(--r-md)', border: '1.5px dashed var(--border-mid)', background: 'transparent', color: 'var(--text-2)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-ui)' }}>
                      + Tambah menu lain
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ========== STEP 6: REVIEW / PREVIEW ========== */}
          {step === 6 && <PreviewStep form={form} HIGHLIGHTS={HIGHLIGHTS} AMBIENCE={AMBIENCE} SETUP_TYPES={SETUP_TYPES} />}
        </div>

        {/* Footer */}
        <div style={{ padding: '14px 24px', borderTop: '1px solid var(--border)', display: 'flex', gap: 8, justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <button onClick={() => step > 1 ? setStep(s => s - 1) : onClose()}
            className="btn btn-secondary" style={{ fontSize: 13 }}>
            {step > 1 ? '← Kembali' : 'Batal'}
          </button>

          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            {!canProceed && canProceedReason && (
              <span style={{ fontSize: 11, color: 'var(--amber)' }}>⚠ {canProceedReason}</span>
            )}
            <button
              onClick={() => step < TOTAL_STEPS ? setStep(s => s + 1) : handleFinalSubmit()}
              disabled={!canProceed}
              className="btn btn-primary"
              style={{ fontSize: 13, opacity: canProceed ? 1 : 0.4, cursor: canProceed ? 'pointer' : 'not-allowed' }}
            >
              {step < TOTAL_STEPS ? 'Lanjut →' : '✓ Kirim ke admin'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// PREVIEW STEP — looks like the actual sidebar card + detail panel snippet
function PreviewStep({ form, HIGHLIGHTS, AMBIENCE, SETUP_TYPES }) {
  const DISTRICT_LABELS = { dago:'Dago', buah_batu:'Buah Batu', braga:'Braga', setiabudhi:'Setiabudhi', antapani:'Antapani', other:'Lainnya' };
  const TYPE_LABELS = { cafe:'Cafe', restaurant:'Restoran', hybrid:'Cafe · Resto', hotel_lobby:'Hotel Lobby', other:'Lainnya' };
  const PRICE_LABELS = { 1:'Rp <30k', 2:'Rp 30–60k', 3:'Rp 60–100k', 4:'Rp >100k' };
  const AVAILABILITY = {
    plenty:    { label: 'Banyak',   color: 'var(--green)' },
    adequate:  { label: 'Cukup',    color: 'var(--amber)' },
    limited:   { label: 'Terbatas', color: 'var(--red)' },
  };

  const highlight = HIGHLIGHTS[form.highlight];
  const coverPhoto = form.photos.find(p => p.category === 'cover') || form.photos[0];
  const coverGradient = coverPhoto?.gradient || ['#C8A882', '#8B6340'];
  const outletPhotos = form.photos.filter(p => p.category === 'outlet');
  const seatingPhotos = form.photos.filter(p => p.category === 'seating');

  function SummaryRow({ label, value, highlight, missing }) {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
        <span style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 600 }}>{label}</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: missing ? 'var(--text-3)' : highlight ? 'var(--accent-hover)' : 'var(--text-1)', textAlign: 'right', maxWidth: '65%', fontStyle: missing ? 'italic' : 'normal' }}>
          {value}
        </span>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div>
        <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>Review submission kamu 👀</h3>
        <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5 }}>
          Ini preview gimana rekomendasimu bakal muncul di komunitas. Pastikan udah pas sebelum kirim.
        </p>
      </div>

      {/* ====== Preview: sidebar card ====== */}
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
          Tampilan di sidebar
        </div>
        <div style={{
          display: 'flex', gap: 12, padding: '14px 16px',
          background: 'var(--surface-alt)', borderRadius: 'var(--r-md)', border: '1px solid var(--border)',
        }}>
          <div style={{
            width: 72, height: 72, borderRadius: 'var(--r-sm)', flexShrink: 0,
            background: `linear-gradient(135deg, ${coverGradient[0]}, ${coverGradient[1]})`,
          }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 2 }}>
              <span style={{ fontWeight: 700, fontSize: 13.5, color: 'var(--text-1)' }}>{form.name || '(belum diisi)'}</span>
              <svg width="13" height="13" viewBox="0 0 14 14"><path d="M7 13c3.314 0 6-2.686 6-6S10.314 1 7 1 1 3.686 1 7s2.686 6 6 6Z" fill="#3B82F6"/><path d="M4.5 7L6.2 8.7L9.5 5.4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 6 }}>
              {TYPE_LABELS[form.type]} · {DISTRICT_LABELS[form.district]} · {PRICE_LABELS[form.price_range]}
            </div>
            {highlight && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 'var(--r-full)', background: highlight.bg, color: highlight.color, fontSize: 10, fontWeight: 700, marginBottom: 6 }}>
                {highlight.emoji} {highlight.label}
              </div>
            )}
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {form.wifi_tested && form.wifi_download && (
                <span className="pill pill-gray"><span style={{ fontWeight: 800, color: form.wifi_download >= 30 ? 'var(--green)' : form.wifi_download >= 15 ? 'var(--amber)' : 'var(--red)' }}>{form.wifi_download}</span><span style={{ opacity: 0.7, marginLeft: 2 }}>Mbps</span></span>
              )}
              {form.outlet_availability && (
                <span className="pill pill-gray" style={{ color: AVAILABILITY[form.outlet_availability]?.color, fontWeight: 700 }}>
                  ⚡ Colokan {AVAILABILITY[form.outlet_availability]?.label?.toLowerCase()}
                </span>
              )}
              {form.menu_signature[0]?.name && (
                <span className="pill pill-accent">⭐ {form.menu_signature[0].name}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ====== Preview: hero header look ====== */}
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
          Hero detail panel
        </div>
        <div style={{
          position: 'relative', height: 140, borderRadius: 'var(--r-md)', overflow: 'hidden',
          background: `linear-gradient(135deg, ${coverGradient[0]}, ${coverGradient[1]})`,
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.55) 100%)' }} />
          <div style={{ position: 'absolute', top: 10, left: 14, display: 'flex', gap: 4 }}>
            <span style={{ padding: '3px 9px', borderRadius: 'var(--r-full)', background: 'rgba(255,255,255,0.95)', color: 'var(--text-1)', fontSize: 10, fontWeight: 700 }}>{TYPE_LABELS[form.type]}</span>
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '14px 18px 12px', color: 'white' }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.85, marginBottom: 2 }}>{DISTRICT_LABELS[form.district]}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 400, lineHeight: 1.05, letterSpacing: '-0.02em' }}>{form.name || '(nama tempat)'}</div>
          </div>
        </div>
      </div>

      {/* ====== Summary table ====== */}
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
          Ringkasan
        </div>
        <div style={{ padding: '0 16px', background: 'var(--surface-alt)', borderRadius: 'var(--r-md)', border: '1px solid var(--border)' }}>
          <SummaryRow label="Highlight" value={highlight ? `${highlight.emoji} ${highlight.label}` : '— belum dipilih'} highlight={!!highlight} missing={!highlight} />
          <SummaryRow label="Foto" value={`${form.photos.length} foto (${form.photos.filter(p=>p.category==='outlet').length} colokan, ${form.photos.filter(p=>p.category==='seating').length} meja)`} />
          <SummaryRow label="Vibe" value={form.general_vibe || '— belum diisi'} missing={!form.general_vibe} />
          <SummaryRow label="Ambience" value={form.ambience.length > 0 ? form.ambience.map(a => AMBIENCE[a]?.label || a).join(' · ') : '— belum dipilih'} missing={form.ambience.length === 0} />
          <SummaryRow label="WiFi" value={form.wifi_tested && form.wifi_download ? `${form.wifi_download} Mbps ↓ / ${form.wifi_upload || '?'} ↑ / ${form.wifi_ping || '?'}ms` : 'Belum diuji'} missing={!form.wifi_tested} />
          <SummaryRow label="Colokan" value={form.outlet_availability ? AVAILABILITY[form.outlet_availability]?.label : '— belum dipilih'} missing={!form.outlet_availability} />
          <SummaryRow label="Meja" value={form.setup_types.length > 0 ? form.setup_types.map(t => SETUP_TYPES.find(s=>s.id===t)?.label || t).join(' · ') : '— belum dipilih'} missing={form.setup_types.length === 0} />
          <SummaryRow label="Most fav" value={form.menu_signature.length > 0 ? form.menu_signature.filter(m=>m.name).map(m => `⭐ ${m.name}`).join(' · ') : '— belum diisi'} missing={form.menu_signature.length === 0} />
          <SummaryRow label="Menu lain" value={form.menu_recommended.length > 0 ? `${form.menu_recommended.filter(m=>m.name).length} item` : '—'} />
          <SummaryRow label="Heads up" value={form.special_notes.filter(n=>n).length > 0 ? `${form.special_notes.filter(n=>n).length} tip` : '—'} />
        </div>
      </div>

      {/* Confirmation */}
      <div style={{ padding: '14px 16px', background: 'var(--accent-light)', borderRadius: 'var(--r-md)', border: '1px solid var(--accent)', borderLeft: '3px solid var(--accent)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <span style={{ fontSize: 18, lineHeight: 1.2 }}>📝</span>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-hover)', marginBottom: 4 }}>Sebelum kirim:</div>
            <ul style={{ fontSize: 12, color: 'var(--text-1)', paddingLeft: 16, margin: 0, lineHeight: 1.6 }}>
              <li>Submission akan dikurasi admin dalam 1–2 hari kerja.</li>
              <li>Kalau ada yang perlu diperbaiki, admin bakal kasih feedback.</li>
              <li>Setelah disetujui, rekomendasimu akan visible ke komunitas dengan kreditmu sebagai kontributor.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { SubmissionForm });
