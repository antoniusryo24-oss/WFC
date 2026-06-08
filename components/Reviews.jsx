// Reviews.jsx — Interactive review/rating section
// Non-login users can submit with anonymous nickname (defaults "Anonim")
// Persists per-place reviews in localStorage
// Exports: Reviews, StarRating, StarDisplay

function StarDisplay({ rating, size = 14 }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <span style={{ display: 'inline-flex', gap: 1, alignItems: 'center' }}>
      {stars.map(s => {
        const filled = rating >= s - 0.25;
        const half = !filled && rating >= s - 0.75;
        return (
          <svg key={s} width={size} height={size} viewBox="0 0 14 14" style={{ display: 'block' }}>
            <defs>
              <linearGradient id={`half-${s}-${size}`}>
                <stop offset="50%" stopColor="#E0A847" />
                <stop offset="50%" stopColor="#E5E0D8" />
              </linearGradient>
            </defs>
            <path
              d="M7 1.2 8.8 4.85 12.8 5.42 9.9 8.24 10.6 12.2 7 10.32 3.4 12.2 4.1 8.24 1.2 5.42 5.2 4.85z"
              fill={filled ? '#E0A847' : half ? `url(#half-${s}-${size})` : '#E5E0D8'}
            />
          </svg>
        );
      })}
    </span>
  );
}

function StarRating({ value, onChange, size = 26 }) {
  const [hover, setHover] = React.useState(0);
  const display = hover || value;
  return (
    <div style={{ display: 'flex', gap: 4 }} onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map(s => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          onMouseEnter={() => setHover(s)}
          style={{
            background: 'none', border: 'none', padding: 0, cursor: 'pointer',
            transition: 'transform 0.12s',
            transform: hover === s ? 'scale(1.15)' : 'scale(1)',
          }}
        >
          <svg width={size} height={size} viewBox="0 0 14 14" style={{ display: 'block' }}>
            <path
              d="M7 1.2 8.8 4.85 12.8 5.42 9.9 8.24 10.6 12.2 7 10.32 3.4 12.2 4.1 8.24 1.2 5.42 5.2 4.85z"
              fill={display >= s ? '#E0A847' : '#E5E0D8'}
            />
          </svg>
        </button>
      ))}
    </div>
  );
}

function Reviews({ place, currentUser }) {
  // Combine seeded reviews + locally added ones (localStorage)
  const storageKey = `wfc_reviews_${place.id}`;

  const [userReviews, setUserReviews] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem(storageKey) || '[]'); }
    catch { return []; }
  });

  // Reset when place changes
  React.useEffect(() => {
    try { setUserReviews(JSON.parse(localStorage.getItem(`wfc_reviews_${place.id}`) || '[]')); }
    catch { setUserReviews([]); }
  }, [place.id]);

  // Form state
  const [rating, setRating] = React.useState(0);
  const [comment, setComment] = React.useState('');
  const [nickname, setNickname] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);
  const [sortBy, setSortBy] = React.useState('recent'); // recent | helpful

  const allReviews = [...userReviews, ...(place.reviews || [])];

  // Sort
  const sortedReviews = React.useMemo(() => {
    const arr = [...allReviews];
    if (sortBy === 'helpful') arr.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    return arr;
  }, [allReviews, sortBy]);

  // Stats
  const stats = React.useMemo(() => {
    if (!allReviews.length) return { avg: 0, count: 0, distribution: [0,0,0,0,0] };
    const dist = [0, 0, 0, 0, 0];
    let sum = 0;
    allReviews.forEach(r => {
      sum += r.rating;
      dist[r.rating - 1]++;
    });
    return {
      avg: sum / allReviews.length,
      count: allReviews.length,
      distribution: dist.reverse(), // 5,4,3,2,1
    };
  }, [allReviews]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!rating || !comment.trim()) return;
    const review = {
      id: `local-${Date.now()}`,
      nickname: currentUser?.display_name || nickname.trim() || 'Anonim',
      rating,
      comment: comment.trim(),
      ts: 'Baru saja',
      verified_visit: !!currentUser,
      local: true,
    };
    const updated = [review, ...userReviews];
    setUserReviews(updated);
    try { localStorage.setItem(storageKey, JSON.stringify(updated)); } catch {}

    setSubmitted(true);
    setRating(0); setComment(''); setNickname('');
    setTimeout(() => setSubmitted(false), 2500);
  }

  function deleteLocalReview(id) {
    const updated = userReviews.filter(r => r.id !== id);
    setUserReviews(updated);
    try { localStorage.setItem(storageKey, JSON.stringify(updated)); } catch {}
  }

  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)' }}>💬 Review & rating dari komunitas</h3>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          style={{
            fontSize: 11, fontWeight: 600, color: 'var(--text-2)',
            background: 'transparent', border: 'none',
            fontFamily: 'var(--font-ui)', cursor: 'pointer', outline: 'none',
          }}
        >
          <option value="recent">Terbaru</option>
          <option value="helpful">Rating tertinggi</option>
        </select>
      </div>

      {/* Stats summary */}
      {stats.count > 0 && (
        <div style={{
          display: 'flex', gap: 24, padding: '18px 20px',
          background: 'var(--surface-alt)', borderRadius: 'var(--r-md)',
          marginBottom: 16, border: '1px solid var(--border)',
        }}>
          {/* Big avg */}
          <div style={{ textAlign: 'center', flexShrink: 0 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 400, lineHeight: 1, color: 'var(--text-1)', letterSpacing: '-0.02em' }}>
              {stats.avg.toFixed(1)}
            </div>
            <div style={{ margin: '4px 0' }}>
              <StarDisplay rating={stats.avg} size={12} />
            </div>
            <div style={{ fontSize: 10, color: 'var(--text-3)' }}>
              {stats.count} {stats.count === 1 ? 'review' : 'reviews'}
            </div>
          </div>

          {/* Distribution bars */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, justifyContent: 'center' }}>
            {stats.distribution.map((count, i) => {
              const star = 5 - i;
              const pct = stats.count ? (count / stats.count) * 100 : 0;
              return (
                <div key={star} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11 }}>
                  <span style={{ width: 12, color: 'var(--text-3)', fontWeight: 600 }}>{star}</span>
                  <svg width="10" height="10" viewBox="0 0 14 14"><path d="M7 1.2 8.8 4.85 12.8 5.42 9.9 8.24 10.6 12.2 7 10.32 3.4 12.2 4.1 8.24 1.2 5.42 5.2 4.85z" fill="#E0A847"/></svg>
                  <div style={{ flex: 1, height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: 'var(--accent)', borderRadius: 3, transition: 'width 0.3s' }} />
                  </div>
                  <span style={{ width: 16, color: 'var(--text-3)', textAlign: 'right' }}>{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add review form */}
      <form onSubmit={handleSubmit} style={{
        padding: 18, marginBottom: 18,
        border: '1.5px solid var(--border)', borderRadius: 'var(--r-md)',
        background: 'var(--surface)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)', marginBottom: 2 }}>Pernah ke sini?</div>
            <div style={{ fontSize: 11, color: 'var(--text-3)' }}>Share pengalamanmu — login optional, anonim juga oke.</div>
          </div>
          <StarRating value={rating} onChange={setRating} size={28} />
        </div>

        <textarea
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="Tulis pengalamanmu — apa yang bikin tempat ini bagus atau kurang?"
          maxLength={280}
          rows={3}
          style={{
            width: '100%', padding: '10px 12px',
            border: '1.5px solid var(--border)', borderRadius: 'var(--r-sm)',
            fontFamily: 'var(--font-ui)', fontSize: 13,
            background: 'var(--surface-alt)', color: 'var(--text-1)',
            resize: 'vertical', outline: 'none',
            lineHeight: 1.5,
          }}
          onFocus={e => e.target.style.borderColor = 'var(--accent)'}
          onBlur={e => e.target.style.borderColor = 'var(--border)'}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10, flexWrap: 'wrap' }}>
          {!currentUser ? (
            <input
              type="text"
              value={nickname}
              onChange={e => setNickname(e.target.value)}
              placeholder="Nama (opsional)"
              maxLength={20}
              style={{
                flex: '1 1 140px',
                padding: '8px 12px', height: 36,
                border: '1.5px solid var(--border)', borderRadius: 'var(--r-sm)',
                fontFamily: 'var(--font-ui)', fontSize: 12,
                background: 'var(--surface-alt)', color: 'var(--text-1)',
                outline: 'none',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--accent)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          ) : (
            <div style={{
              flex: '1 1 140px', display: 'flex', alignItems: 'center', gap: 8,
              fontSize: 12, color: 'var(--text-2)',
            }}>
              <div style={{
                width: 24, height: 24, borderRadius: '50%',
                background: 'var(--accent-light)', color: 'var(--accent-hover)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700,
              }}>{currentUser.display_name[0].toUpperCase()}</div>
              Sebagai <strong style={{ color: 'var(--text-1)' }}>{currentUser.display_name}</strong>
            </div>
          )}
          <div style={{ fontSize: 10, color: 'var(--text-3)' }}>{comment.length}/280</div>
          <button
            type="submit"
            disabled={!rating || !comment.trim()}
            style={{
              padding: '8px 16px', height: 36,
              borderRadius: 'var(--r-sm)', border: 'none',
              background: (!rating || !comment.trim()) ? 'var(--surface-alt)' : 'var(--text-1)',
              color: (!rating || !comment.trim()) ? 'var(--text-3)' : 'var(--surface)',
              fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 700,
              cursor: (!rating || !comment.trim()) ? 'not-allowed' : 'pointer',
              transition: 'all 0.15s',
              marginLeft: 'auto',
            }}
          >
            Post review
          </button>
        </div>

        {submitted && (
          <div className="fade-in" style={{ marginTop: 10, padding: '8px 12px', background: 'var(--green-bg)', color: 'var(--green)', borderRadius: 'var(--r-sm)', fontSize: 12, fontWeight: 600 }}>
            ✓ Review-mu dipost! Terima kasih sudah bantu komunitas.
          </div>
        )}
      </form>

      {/* Review list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {sortedReviews.length === 0 && (
          <div style={{ padding: 32, textAlign: 'center', color: 'var(--text-3)', fontSize: 13 }}>
            Belum ada review. Jadi yang pertama!
          </div>
        )}
        {sortedReviews.map((r, i) => (
          <div key={r.id} style={{
            padding: '14px 0',
            borderBottom: i < sortedReviews.length - 1 ? '1px solid var(--border)' : 'none',
            display: 'flex', gap: 12,
          }}>
            {/* Avatar */}
            <div style={{
              width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
              background: r.local ? 'var(--accent)' : `linear-gradient(135deg, ${place.color[0]}, ${place.color[1]})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontSize: 13, fontWeight: 700,
            }}>{r.nickname[0].toUpperCase()}</div>

            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)' }}>{r.nickname}</span>
                {r.verified_visit && (
                  <span title="Verified visit" style={{
                    display: 'inline-flex', alignItems: 'center', gap: 3,
                    fontSize: 9, fontWeight: 700,
                    padding: '1px 6px', borderRadius: 'var(--r-full)',
                    background: '#E8F0FE', color: '#1A56DB',
                  }}>✓ Verified</span>
                )}
                {r.local && (
                  <span style={{
                    fontSize: 9, fontWeight: 700,
                    padding: '1px 6px', borderRadius: 'var(--r-full)',
                    background: 'var(--accent-light)', color: 'var(--accent-hover)',
                  }}>KAMU</span>
                )}
                <StarDisplay rating={r.rating} size={11} />
                <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--text-3)' }}>{r.ts}</span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-1)', lineHeight: 1.55, textWrap: 'pretty' }}>{r.comment}</div>
              {r.local && (
                <button
                  onClick={() => deleteLocalReview(r.id)}
                  style={{
                    marginTop: 6, background: 'none', border: 'none', padding: 0,
                    fontSize: 11, color: 'var(--red)', cursor: 'pointer', fontFamily: 'var(--font-ui)',
                    fontWeight: 600,
                  }}
                >Hapus</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { Reviews, StarRating, StarDisplay });
