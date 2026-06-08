// MenuSection.jsx — Display signature & recommended menu items
// Exports: MenuSection

function MenuSection({ menu, color }) {
  if (!menu) return null;
  const sig = menu.signature || [];
  const rec = menu.recommended || [];
  if (sig.length === 0 && rec.length === 0) return null;

  function Item({ item, featured }) {
    const [c1, c2] = color || ['#C8A882', '#8B6340'];
    return (
      <div style={{
        display: 'flex', gap: 12,
        padding: featured ? 14 : '12px 0',
        background: featured ? 'var(--accent-light)' : 'transparent',
        borderRadius: featured ? 'var(--r-md)' : 0,
        border: featured ? '1px solid var(--accent-light)' : 'none',
        borderBottom: featured ? '1px solid var(--accent-light)' : '1px solid var(--border)',
        alignItems: 'flex-start',
      }}>
        {featured && (
          <div style={{
            width: 56, height: 56, borderRadius: 'var(--r-sm)',
            background: `linear-gradient(135deg, ${c1}, ${c2})`,
            flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24, position: 'relative',
          }}>
            <span style={{
              position: 'absolute', top: -6, right: -6,
              fontSize: 14, transform: 'rotate(8deg)',
            }}>⭐</span>
            <span style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }}>
              {item.name.toLowerCase().includes('kopi') || item.name.toLowerCase().includes('latte') || item.name.toLowerCase().includes('americano') || item.name.toLowerCase().includes('cappuccino') ? '☕' :
               item.name.toLowerCase().includes('croissant') || item.name.toLowerCase().includes('roti') || item.name.toLowerCase().includes('toast') || item.name.toLowerCase().includes('bread') ? '🥐' :
               item.name.toLowerCase().includes('nasi') ? '🍚' :
               item.name.toLowerCase().includes('mie') || item.name.toLowerCase().includes('pasta') || item.name.toLowerCase().includes('spaghetti') ? '🍜' :
               item.name.toLowerCase().includes('burger') ? '🍔' :
               item.name.toLowerCase().includes('iga') || item.name.toLowerCase().includes('ayam') ? '🍖' :
               item.name.toLowerCase().includes('pisang') || item.name.toLowerCase().includes('cookies') ? '🍪' :
               item.name.toLowerCase().includes('avocado') ? '🥑' :
               item.name.toLowerCase().includes('matcha') ? '🍵' :
               item.name.toLowerCase().includes('eggs') ? '🍳' :
               '🍽️'}
            </span>
          </div>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}>
            <span style={{
              fontFamily: featured ? 'var(--font-display)' : 'var(--font-ui)',
              fontSize: featured ? 15 : 13.5, fontWeight: featured ? 400 : 700,
              color: 'var(--text-1)', lineHeight: 1.2,
              letterSpacing: featured ? '-0.01em' : 0,
            }}>{item.name}</span>
            <span style={{
              fontSize: 13, fontWeight: 800, color: 'var(--accent-hover)',
              flexShrink: 0, fontVariantNumeric: 'tabular-nums',
            }}>{item.price}</span>
          </div>
          {item.desc && (
            <div style={{
              fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5, textWrap: 'pretty',
            }}>{item.desc}</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <section>
      <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)', marginBottom: 14 }}>🍽️ Menu rekomendasi</h3>

      {/* Signatures — featured cards */}
      {sig.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
            ⭐ Most favorite — wajib coba
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {sig.map((item, i) => <Item key={i} item={item} featured />)}
          </div>
        </div>
      )}

      {/* Recommended — list */}
      {rec.length > 0 && (
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>
            Lainnya yang oke
          </div>
          {rec.map((item, i) => <Item key={i} item={item} />)}
        </div>
      )}

      <div style={{ fontSize: 10, color: 'var(--text-3)', textAlign: 'center', marginTop: 12 }}>
        Harga dapat berubah. Rekomendasi dari kontributor komunitas.
      </div>
    </section>
  );
}

Object.assign(window, { MenuSection });
