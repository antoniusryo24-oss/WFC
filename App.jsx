// App.jsx — Main application, state management, routing
// Requires all components to be loaded first

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "light",
  "density": "comfortable",
  "accent": "#A67C52"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply theme
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', t.theme === 'dark' ? 'dark' : 'light');
  }, [t.theme]);

  // Apply accent color
  React.useEffect(() => {
    document.documentElement.style.setProperty('--accent', t.accent);
    // Derive lighter/darker tones
    document.documentElement.style.setProperty('--accent-light', t.accent + '22');
    document.documentElement.style.setProperty('--accent-hover', t.accent + 'CC');
  }, [t.accent]);

  // App state
  const [screen, setScreen] = React.useState('explore'); // explore | admin
  const [showLogin, setShowLogin] = React.useState(false);
  const [showSubmit, setShowSubmit] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [activePlace, setActivePlace] = React.useState(null);
  const [areaFilter, setAreaFilter] = React.useState('all');
  const [sortBy, setSortBy] = React.useState('best');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeFilters, setActiveFilters] = React.useState(new Set());
  const [toast, setToast] = React.useState(null);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  function toggleFilter(id) {
    setActiveFilters(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  // Score + partition places:
  // - Hard filter only by search (text) and area (spatial)
  // - Chip filters become PREFERENCES that rank places
  const { matches, others, total } = React.useMemo(() => {
    let list = WFC_DATA.places;

    // Hard filter: search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        p.district.toLowerCase().includes(q) ||
        p.note.toLowerCase().includes(q)
      );
    }

    // Hard filter: area
    if (areaFilter !== 'all') {
      list = list.filter(p => p.district === areaFilter);
    }

    // Preferences (soft filter)
    const PREFS = {
      many_outlets:  p => p.criteria.power_outlet === 'many',
      fast_wifi:     p => p.criteria.wifi_speed === 'fast',
      quiet:         p => p.criteria.noise_level === 'quiet',
      proper_setup:  p => p.criteria.setup_ergonomics === 'proper',
      cheap:         p => p.price_range <= 2,
      natural_light: p => p.criteria.lighting === 'natural',
      ac:            p => p.criteria.ac_available,
    };

    const activeArr = [...activeFilters].filter(id => PREFS[id]);

    const decorated = list.map(p => {
      const matched = activeArr.filter(id => PREFS[id](p)).length;
      return { place: p, matchInfo: { matched, total: activeArr.length } };
    });

    // Sort
    if (sortBy === 'price') {
      decorated.sort((a, b) => a.place.price_range - b.place.price_range);
    } else if (sortBy === 'best') {
      decorated.sort((a, b) => {
        if (b.matchInfo.matched !== a.matchInfo.matched) return b.matchInfo.matched - a.matchInfo.matched;
        const score = p => (p.criteria.wifi_speed === 'fast' ? 3 : p.criteria.wifi_speed === 'medium' ? 1 : 0)
          + (p.criteria.power_outlet === 'many' ? 2 : p.criteria.power_outlet === 'few' ? 1 : 0)
          + (p.criteria.noise_level === 'quiet' ? 2 : p.criteria.noise_level === 'moderate' ? 1 : 0)
          + (p.criteria.setup_ergonomics === 'proper' ? 2 : p.criteria.setup_ergonomics === 'lumayan' ? 1 : 0);
        return score(b.place) - score(a.place);
      });
    }

    if (activeArr.length === 0) {
      return { matches: decorated, others: [], total: decorated.length };
    }
    const matches = decorated.filter(d => d.matchInfo.matched === activeArr.length);
    const others  = decorated.filter(d => d.matchInfo.matched < activeArr.length);
    return { matches, others, total: decorated.length };
  }, [searchQuery, areaFilter, activeFilters, sortBy]);

  const allPlacesForMap = React.useMemo(() => [...matches, ...others].map(d => d.place), [matches, others]);

  function handleLogin(user) {
    setCurrentUser(user);
    setShowLogin(false);
    showToast(`Halo, ${user.display_name}! 👋`);
  }

  function handleSubmit(data) {
    showToast('Submission dikirim! Admin akan review dalam 1–2 hari kerja.');
  }

  function handleVerify(placeId) {
    showToast('Konfirmasi diterima. Terima kasih sudah membantu komunitas!');
  }

  const appStyle = {
    display: 'flex', flexDirection: 'column',
    height: '100vh', overflow: 'hidden',
    paddingTop: 'var(--topbar-h)',
    fontFamily: 'var(--font-ui)',
    background: 'var(--bg)',
    color: 'var(--text-1)',
  };

  const mainStyle = {
    display: 'flex', flex: 1,
    overflow: 'hidden', minHeight: 0,
  };

  const mapAreaStyle = {
    flex: 1, position: 'relative',
    overflow: 'hidden', minWidth: 0,
    background: 'var(--surface-alt)',
    display: 'flex', flexDirection: 'column',
  };

  return (
    <div style={appStyle}>
      <TopBar
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        activeFilters={activeFilters}
        onToggleFilter={toggleFilter}
        onSubmit={() => currentUser ? setShowSubmit(true) : setShowLogin(true)}
        onLogin={() => setShowLogin(true)}
        isLoggedIn={!!currentUser}
        currentUser={currentUser}
        onAdminClick={() => setScreen(screen === 'admin' ? 'explore' : 'admin')}
      />

      <main style={mainStyle}>
        <Sidebar
          matches={matches}
          others={others}
          activePlace={activePlace}
          onPlaceClick={p => setActivePlace(p)}
          areaFilter={areaFilter}
          onAreaChange={setAreaFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalCount={total}
          activeFilterCount={activeFilters.size}
        />

        <div style={mapAreaStyle}>
          <MapView
            places={allPlacesForMap}
            activePlace={activePlace}
            onPlaceClick={p => setActivePlace(p)}
          />
          <DetailPanel
            place={activePlace}
            isOpen={!!activePlace}
            onClose={() => setActivePlace(null)}
            onVerify={handleVerify}
            isLoggedIn={!!currentUser}
            onLogin={() => setShowLogin(true)}
            currentUser={currentUser}
          />
        </div>
      </main>

      {/* Overlays */}
      {showLogin && <LoginScreen onLogin={handleLogin} onClose={() => setShowLogin(false)} />}
      {showSubmit && (
        <SubmissionForm
          onClose={() => setShowSubmit(false)}
          onSubmit={handleSubmit}
          isLoggedIn={!!currentUser}
          onLogin={() => setShowLogin(true)}
          currentUser={currentUser}
        />
      )}
      {screen === 'admin' && (
        <AdminQueue onClose={() => setScreen('explore')} currentUser={currentUser} />
      )}

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
          zIndex: 500, background: 'var(--text-1)', color: 'var(--surface)',
          padding: '10px 20px', borderRadius: 'var(--r-full)',
          fontSize: 13, fontWeight: 600, boxShadow: 'var(--shadow-lg)',
          whiteSpace: 'nowrap',
        }} className="fade-in">
          {toast}
        </div>
      )}

      {/* Tweaks panel */}
      <TweaksPanel>
        <TweakSection label="Appearance" />
        <TweakToggle
          label="Dark mode"
          value={t.theme === 'dark'}
          onChange={v => setTweak('theme', v ? 'dark' : 'light')}
        />
        <TweakColor
          label="Accent color"
          value={t.accent}
          options={['#A67C52', '#2D6A4F', '#3D5A8A', '#7A4A8A']}
          onChange={v => setTweak('accent', v)}
        />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
