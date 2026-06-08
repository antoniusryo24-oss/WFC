// TopBar.jsx — Logo, Search, Filter chips, CTA buttons
// Exports: TopBar

function TopBar({ onSearch, searchQuery, activeFilters, onToggleFilter, onSubmit, onLogin, isLoggedIn, currentUser, onAdminClick }) {
  const FILTERS = [
    { id: 'many_outlets',   label: '⚡ Colokan banyak' },
    { id: 'fast_wifi',      label: '📶 WiFi cepat' },
    { id: 'quiet',          label: '🤫 Quiet' },
    { id: 'proper_setup',   label: '🪑 Meja proper' },
    { id: 'cheap',          label: '💸 < Rp 50k' },
    { id: 'natural_light',  label: '☀️ Natural light' },
    { id: 'ac',             label: '❄️ AC' },
  ];

  const topBarStyles = {
    wrapper: {
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: 'var(--surface)',
      borderBottom: '1px solid var(--border)',
      boxShadow: 'var(--shadow-xs)',
    },
    inner: {
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '0 16px', height: 'var(--topbar-h)',
    },
    logo: {
      fontFamily: 'var(--font-display)',
      fontSize: 20, fontWeight: 400,
      color: 'var(--text-1)',
      letterSpacing: '-0.02em',
      whiteSpace: 'nowrap',
      cursor: 'default',
      flexShrink: 0,
    },
    logoAccent: { color: 'var(--accent)' },
    divider: { width: 1, height: 24, background: 'var(--border)', flexShrink: 0 },
    searchWrap: {
      position: 'relative', flexShrink: 0,
      width: 220,
    },
    searchIcon: {
      position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)',
      color: 'var(--text-3)', fontSize: 14, pointerEvents: 'none',
    },
    searchInput: {
      width: '100%',
      height: 36,
      padding: '0 12px 0 34px',
      border: '1.5px solid var(--border)',
      borderRadius: 'var(--r-full)',
      background: 'var(--surface-alt)',
      fontFamily: 'var(--font-ui)',
      fontSize: 13,
      color: 'var(--text-1)',
      outline: 'none',
      transition: 'border-color 0.15s, background 0.15s',
    },
    filtersWrap: {
      display: 'flex', gap: 6, overflowX: 'auto', flex: 1,
      scrollbarWidth: 'none',
    },
    filterChip: (active) => ({
      display: 'inline-flex', alignItems: 'center',
      padding: '5px 11px',
      borderRadius: 'var(--r-full)',
      fontSize: 12, fontWeight: 600,
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      border: active ? '1.5px solid var(--text-1)' : '1.5px solid var(--border)',
      background: active ? 'var(--text-1)' : 'var(--surface)',
      color: active ? 'var(--surface)' : 'var(--text-2)',
      transition: 'all 0.15s',
      flexShrink: 0,
    }),
    actions: { display: 'flex', gap: 8, flexShrink: 0, alignItems: 'center' },
    submitBtn: {
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '7px 14px',
      borderRadius: 'var(--r-md)',
      background: 'var(--text-1)',
      color: 'var(--surface)',
      fontFamily: 'var(--font-ui)',
      fontSize: 12, fontWeight: 600,
      border: 'none', cursor: 'pointer',
      whiteSpace: 'nowrap',
      transition: 'background 0.15s',
    },
    avatarBtn: {
      width: 32, height: 32, borderRadius: '50%',
      background: 'var(--accent-light)',
      border: '1.5px solid var(--border)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', fontSize: 13, fontWeight: 700,
      color: 'var(--accent-hover)',
      flexShrink: 0,
    },
    loginBtn: {
      padding: '6px 14px',
      borderRadius: 'var(--r-md)',
      background: 'transparent',
      color: 'var(--text-2)',
      fontFamily: 'var(--font-ui)',
      fontSize: 12, fontWeight: 600,
      border: '1.5px solid var(--border)',
      cursor: 'pointer',
    },
  };

  return (
    <header style={topBarStyles.wrapper}>
      <div style={topBarStyles.inner}>
        {/* Logo */}
        <span style={topBarStyles.logo}>
          WFC <span style={topBarStyles.logoAccent}>Bandung</span>
        </span>

        <div style={topBarStyles.divider}></div>

        {/* Search */}
        <div style={topBarStyles.searchWrap}>
          <span style={topBarStyles.searchIcon}>⌕</span>
          <input
            style={topBarStyles.searchInput}
            type="text"
            placeholder="Cari tempat..."
            value={searchQuery}
            onChange={e => onSearch(e.target.value)}
            onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.background = 'var(--surface)'; }}
            onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.background = 'var(--surface-alt)'; }}
          />
        </div>

        {/* Filter chips */}
        <div style={topBarStyles.filtersWrap}>
          {FILTERS.map(f => (
            <button
              key={f.id}
              style={topBarStyles.filterChip(activeFilters.has(f.id))}
              onClick={() => onToggleFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div style={topBarStyles.actions}>
          <button style={topBarStyles.submitBtn} onClick={onSubmit}>
            + Rekomendasiin
          </button>
          {isLoggedIn ? (
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              {currentUser?.role === 'admin' && (
                <button
                  className="btn btn-ghost"
                  style={{ fontSize: 12, padding: '6px 10px' }}
                  onClick={onAdminClick}
                >
                  Admin
                </button>
              )}
              <div
                style={topBarStyles.avatarBtn}
                onClick={onAdminClick}
                title={currentUser?.display_name}
              >
                {(currentUser?.display_name || 'U')[0].toUpperCase()}
              </div>
            </div>
          ) : (
            <button style={topBarStyles.loginBtn} onClick={onLogin}>
              Masuk
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

Object.assign(window, { TopBar });
