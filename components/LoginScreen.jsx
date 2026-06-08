// LoginScreen.jsx — Auth overlay
// Exports: LoginScreen

function LoginScreen({ onLogin, onClose }) {
  const [mode, setMode] = React.useState('login'); // 'login' | 'register'
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const isAdmin = email.includes('admin');
      onLogin({
        id: 'user-1',
        email,
        display_name: name || email.split('@')[0],
        role: isAdmin ? 'admin' : 'user',
      });
      setLoading(false);
    }, 800);
  }

  const overlayStyle = {
    position: 'fixed', inset: 0, zIndex: 300,
    background: 'rgba(26,23,20,0.6)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    backdropFilter: 'blur(4px)',
  };

  const panelStyle = {
    background: 'var(--surface)',
    borderRadius: 'var(--r-xl)',
    padding: '40px 36px',
    width: 400,
    boxShadow: 'var(--shadow-xl)',
    position: 'relative',
  };

  const inputStyle = {
    width: '100%',
    height: 42,
    padding: '0 14px',
    border: '1.5px solid var(--border)',
    borderRadius: 'var(--r-md)',
    fontFamily: 'var(--font-ui)',
    fontSize: 14,
    color: 'var(--text-1)',
    background: 'var(--surface-alt)',
    outline: 'none',
    transition: 'border-color 0.15s',
  };

  const labelStyle = {
    display: 'block',
    fontSize: 12, fontWeight: 600,
    color: 'var(--text-2)',
    marginBottom: 6,
  };

  const googleBtnStyle = {
    width: '100%', height: 42,
    border: '1.5px solid var(--border)',
    borderRadius: 'var(--r-md)',
    background: 'var(--surface)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
    cursor: 'pointer', fontSize: 13, fontWeight: 600, color: 'var(--text-1)',
    fontFamily: 'var(--font-ui)',
    transition: 'background 0.15s',
  };

  return (
    <div style={overlayStyle} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={panelStyle} className="fade-in">
        {/* Close */}
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: 'var(--text-3)' }}
        >×</button>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, marginBottom: 6 }}>
            {mode === 'login' ? 'Selamat datang' : 'Buat akun baru'}
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-2)' }}>
            {mode === 'login'
              ? 'Login untuk rekomendasiin tempat WFC favoritmu'
              : 'Daftar dan mulai kontribusi ke komunitas WFC Bandung'}
          </div>
        </div>

        {/* Google login */}
        <button
          style={googleBtnStyle}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-alt)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--surface)'}
          onClick={() => onLogin({ id: 'user-google', email: 'user@gmail.com', display_name: 'User', role: 'user' })}
        >
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34.5 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"/>
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.9 19 13 24 13c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34.5 6.1 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
            <path fill="#4CAF50" d="M24 44c5.5 0 10.4-2 14.1-5.3l-6.5-5.5C29.4 34.9 26.8 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.6 39.7 16.3 44 24 44z"/>
            <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.3 5.5l6.5 5.5C37.2 38 44 33 44 24c0-1.3-.1-2.6-.4-3.9z"/>
          </svg>
          Lanjutkan dengan Google
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0' }}>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          <span style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 500 }}>atau dengan email</span>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {mode === 'register' && (
            <div>
              <label style={labelStyle}>Nama</label>
              <input style={inputStyle} type="text" placeholder="Nama lengkap" value={name}
                onChange={e => setName(e.target.value)} required
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'} />
            </div>
          )}
          <div>
            <label style={labelStyle}>Email</label>
            <input style={inputStyle} type="email" placeholder="email@kamu.com" value={email}
              onChange={e => setEmail(e.target.value)} required
              onFocus={e => e.target.style.borderColor = 'var(--accent)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'} />
          </div>
          <div>
            <label style={labelStyle}>Password</label>
            <input style={inputStyle} type="password" placeholder="••••••••" value={password}
              onChange={e => setPassword(e.target.value)} required
              onFocus={e => e.target.style.borderColor = 'var(--accent)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'} />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              height: 42, borderRadius: 'var(--r-md)', border: 'none',
              background: loading ? 'var(--text-3)' : 'var(--text-1)',
              color: 'var(--surface)', fontFamily: 'var(--font-ui)',
              fontSize: 14, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.15s', marginTop: 4,
            }}
          >
            {loading ? 'Loading...' : mode === 'login' ? 'Masuk' : 'Daftar'}
          </button>
        </form>

        {/* Toggle mode */}
        <div style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: 'var(--text-2)' }}>
          {mode === 'login' ? 'Belum punya akun? ' : 'Sudah punya akun? '}
          <button
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            style={{ background: 'none', border: 'none', color: 'var(--accent)', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}
          >
            {mode === 'login' ? 'Daftar' : 'Login'}
          </button>
        </div>

        {/* Admin hint */}
        <div style={{ marginTop: 16, padding: '10px 12px', background: 'var(--surface-alt)', borderRadius: 'var(--r-sm)', fontSize: 11, color: 'var(--text-3)' }}>
          💡 Tip: gunakan email mengandung "admin" untuk login sebagai admin
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { LoginScreen });
