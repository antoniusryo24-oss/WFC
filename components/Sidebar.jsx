// Sidebar.jsx — Left panel: area filter, sort, place list partitioned by match
// Exports: Sidebar

function Sidebar({ matches, others, activePlace, onPlaceClick, areaFilter, onAreaChange, sortBy, onSortChange, totalCount, activeFilterCount }) {
  const AREAS = [
    { id: 'all',        label: 'Semua' },
    { id: 'dago',       label: 'Dago' },
    { id: 'buah_batu',  label: 'Buah Batu' },
    { id: 'braga',      label: 'Braga' },
    { id: 'setiabudhi', label: 'Setiabudhi' },
    { id: 'antapani',   label: 'Antapani' },
  ];
  const SORTS = [
    { id: 'best',    label: 'Terbaik' },
    { id: 'nearest', label: 'Terdekat' },
    { id: 'newest',  label: 'Terbaru' },
    { id: 'price',   label: 'Harga ↑' },
  ];

  const hasFilters = activeFilterCount > 0;

  const sidebarStyle = {
    width: 'var(--sidebar-w)',
    flexShrink: 0,
    background: 'var(--surface)',
    borderRight: '1px solid var(--border)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  };

  const areaTabStyle = (active) => ({
    padding: '7px 12px',
    borderRadius: 'var(--r-sm)',
    fontSize: 12,
    fontWeight: active ? 700 : 500,
    cursor: 'pointer',
    border: 'none',
    background: active ? 'var(--text-1)' : 'transparent',
    color: active ? 'var(--surface)' : 'var(--text-2)',
    transition: 'all 0.15s',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  });

  function SectionDivider({ label, count, subtle }) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '14px 16px 10px',
        background: subtle ? 'var(--bg)' : 'transparent',
        borderBottom: '1px solid var(--border)',
        borderTop: subtle ? '1px solid var(--border)' : 'none',
      }}>
        <span style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: subtle ? 'var(--text-3)' : 'var(--text-2)',
        }}>{label}</span>
        <span style={{
          fontSize: 10, fontWeight: 700,
          padding: '1px 7px', borderRadius: 'var(--r-full)',
          background: subtle ? 'var(--surface-alt)' : 'var(--accent-light)',
          color: subtle ? 'var(--text-3)' : 'var(--accent-hover)',
        }}>{count}</span>
        <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>
    );
  }

  return (
    <aside style={sidebarStyle}>
      {/* Area filter */}
      <div style={{ padding: '12px 12px 0', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', gap: 4, overflowX: 'auto', paddingBottom: 12, scrollbarWidth: 'none' }}>
          {AREAS.map(a => (
            <button
              key={a.id}
              style={areaTabStyle(areaFilter === a.id)}
              onClick={() => onAreaChange(a.id)}
              onMouseEnter={e => { if (areaFilter !== a.id) e.currentTarget.style.background = 'var(--surface-alt)'; }}
              onMouseLeave={e => { if (areaFilter !== a.id) e.currentTarget.style.background = 'transparent'; }}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>

      {/* Count + Sort row */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 16px',
        borderBottom: '1px solid var(--border)',
      }}>
        <span style={{ fontSize: 12, color: 'var(--text-2)', fontWeight: 500 }}>
          <strong style={{ color: 'var(--text-1)' }}>{totalCount}</strong> tempat
          {hasFilters && matches.length > 0 && (
            <span style={{ marginLeft: 6, color: 'var(--accent)' }}>
              · {matches.length} cocok
            </span>
          )}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 11, color: 'var(--text-3)' }}>Urutkan:</span>
          <select
            value={sortBy}
            onChange={e => onSortChange(e.target.value)}
            style={{
              fontSize: 12, fontWeight: 600, color: 'var(--text-1)',
              background: 'transparent', border: 'none',
              fontFamily: 'var(--font-ui)', cursor: 'pointer',
              outline: 'none',
            }}
          >
            {SORTS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </div>
      </div>

      {/* Place list */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {matches.length === 0 && others.length === 0 ? (
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', padding: '60px 24px', gap: 12,
          }}>
            <div style={{ fontSize: 32 }}>☕</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-2)', textAlign: 'center' }}>
              Tidak ada tempat di area ini
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-3)', textAlign: 'center' }}>
              Coba pilih area lain atau ubah pencarian
            </div>
          </div>
        ) : (
          <>
            {/* When filters are active, header for matches */}
            {hasFilters && matches.length > 0 && (
              <SectionDivider label="Cocok dengan preferensimu" count={matches.length} />
            )}

            {matches.map(({ place, matchInfo }) => (
              <PlaceCard
                key={place.id}
                place={place}
                matchInfo={hasFilters ? matchInfo : null}
                isActive={activePlace?.id === place.id}
                onClick={onPlaceClick}
              />
            ))}

            {/* Divider before others */}
            {hasFilters && others.length > 0 && (
              <SectionDivider label="Tempat lain" count={others.length} subtle />
            )}

            {others.map(({ place, matchInfo }) => (
              <PlaceCard
                key={place.id}
                place={place}
                matchInfo={hasFilters ? matchInfo : null}
                dimIfUnmatched={hasFilters}
                isActive={activePlace?.id === place.id}
                onClick={onPlaceClick}
              />
            ))}
          </>
        )}
      </div>
    </aside>
  );
}

Object.assign(window, { Sidebar });
