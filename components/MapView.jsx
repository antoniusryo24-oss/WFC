// MapView.jsx — Leaflet map with custom name markers + popup previews
// Exports: MapView

function MapView({ places, activePlace, onPlaceClick }) {
  const containerRef = React.useRef(null);
  const mapRef = React.useRef(null);
  const markersRef = React.useRef({});
  const activePlaceRef = React.useRef(null);

  const DISTRICT_LABELS = { dago:'Dago', buah_batu:'Buah Batu', braga:'Braga', setiabudhi:'Setiabudhi', antapani:'Antapani', other:'Lainnya' };

  function createIcon(place, isActive) {
    const short = place.name.length > 15 ? place.name.slice(0, 14) + '…' : place.name;
    const w = Math.max(80, short.length * 7 + 24);
    return L.divIcon({
      className: 'wfc-marker',
      html: `<div class="wfc-marker-pill${isActive ? ' active' : ''}">${short}</div>`,
      iconSize: [w, 30],
      iconAnchor: [w / 2, 15],
    });
  }

  function createPopupContent(place) {
    const district = DISTRICT_LABELS[place.district] || place.district;
    const highlight = window.WFC_HIGHLIGHTS?.[place.highlight];
    const status = window.isOpenNow ? window.isOpenNow(place) : { open: false, label: '' };
    const rating = window.avgRating ? window.avgRating(place) : null;
    const w = place.wifi, o = place.outlets;
    const sig = place.menu?.signature?.[0];

    const wifiTone = w ? (w.download_mbps >= 30 ? '#2D6A4F' : w.download_mbps >= 15 ? '#A65C00' : '#B03030') : '#9E9690';

    return `
      <div style="font-family:'Plus Jakarta Sans',system-ui,sans-serif;width:260px;margin:-14px -16px;">
        <div style="position:relative;height:140px;background:linear-gradient(135deg, ${place.color[0]}, ${place.color[1]});overflow:hidden;">
          <div style="position:absolute;inset:0;background:linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.6) 100%);"></div>
          <div style="position:absolute;top:10px;left:12px;display:flex;gap:4px;flex-wrap:wrap;">
            <span style="padding:3px 9px;background:rgba(255,255,255,0.95);color:#1A1714;border-radius:99px;font-size:10px;font-weight:700;">${district}</span>
            ${rating?.count ? `<span style="padding:3px 9px;background:rgba(255,255,255,0.95);color:#1A1714;border-radius:99px;font-size:10px;font-weight:700;display:inline-flex;align-items:center;gap:3px;">⭐ ${rating.avg.toFixed(1)} <span style="color:#9E9690;font-weight:500;">· ${rating.count}</span></span>` : ''}
          </div>
          ${status.open ? `
          <div style="position:absolute;top:10px;right:12px;display:inline-flex;align-items:center;gap:4px;padding:3px 9px;background:rgba(45,106,79,0.95);color:white;border-radius:99px;font-size:10px;font-weight:700;">
            <span style="width:5px;height:5px;border-radius:50%;background:white;display:inline-block;"></span>Buka
          </div>` : `
          <div style="position:absolute;top:10px;right:12px;padding:3px 9px;background:rgba(0,0,0,0.55);color:white;border-radius:99px;font-size:10px;font-weight:700;">Tutup</div>
          `}
          <div style="position:absolute;bottom:10px;left:12px;right:12px;color:white;">
            <div style="font-family:'DM Serif Display',serif;font-size:19px;font-weight:400;line-height:1.15;letter-spacing:-0.01em;text-shadow:0 2px 8px rgba(0,0,0,0.4);">${place.name}</div>
            <div style="font-size:11px;opacity:0.95;font-weight:600;margin-top:2px;">${place.price_range_text}</div>
          </div>
        </div>

        <div style="padding:12px 14px;">
          ${highlight ? `
          <div style="display:inline-flex;align-items:center;gap:5px;padding:4px 10px;background:${highlight.bg};color:${highlight.color};border-radius:99px;font-size:11px;font-weight:700;margin-bottom:10px;">
            <span>${highlight.emoji}</span><span>${highlight.label}</span>
          </div>` : ''}

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:10px;padding:8px 10px;background:#F7F4EF;border-radius:8px;">
            ${w ? `
            <div>
              <div style="font-size:9px;font-weight:700;color:#9E9690;letter-spacing:0.05em;text-transform:uppercase;margin-bottom:2px;">WiFi</div>
              <div style="font-size:14px;font-weight:800;color:${wifiTone};line-height:1;">${w.download_mbps}<span style="font-size:9px;font-weight:600;opacity:0.7;margin-left:2px;">Mbps</span></div>
            </div>` : ''}
            ${o ? `
            <div>
              <div style="font-size:9px;font-weight:700;color:#9E9690;letter-spacing:0.05em;text-transform:uppercase;margin-bottom:2px;">Colokan</div>
              <div style="font-size:12px;font-weight:800;color:${o.availability === 'plenty' ? '#2D6A4F' : o.availability === 'limited' ? '#A65C00' : '#B03030'};line-height:1;text-transform:capitalize;">${o.availability === 'plenty' ? 'Banyak' : o.availability === 'limited' ? 'Terbatas' : 'Sedikit'}</div>
            </div>` : ''}
          </div>

          ${sig ? `
          <div style="display:flex;align-items:center;gap:6px;padding:8px 10px;background:#F0E8DB;border-radius:8px;margin-bottom:10px;">
            <span style="font-size:14px;">⭐</span>
            <div style="flex:1;min-width:0;">
              <div style="font-size:9px;font-weight:700;color:#8B6340;letter-spacing:0.05em;text-transform:uppercase;">Most favorite</div>
              <div style="font-size:12px;font-weight:700;color:#1A1714;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${sig.name} · ${sig.price}</div>
            </div>
          </div>` : ''}

          <div style="padding-top:10px;border-top:1px solid #E5E0D8;font-size:10px;color:#9E9690;display:flex;align-items:center;justify-content:space-between;">
            <span>${status.open ? status.label : 'Sudah tutup'}</span>
            <span style="color:#A67C52;font-weight:700;">Klik buat detail →</span>
          </div>
        </div>
      </div>
    `;
  }

  // Init map once
  React.useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [-6.9175, 107.6191],
      zoom: 13,
      zoomControl: false,
      attributionControl: true,
    });

    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      {
        attribution: '&copy; <a href="https://openstreetmap.org">OSM</a> &copy; <a href="https://carto.com">CARTO</a>',
        maxZoom: 19,
      }
    ).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Add / refresh markers when places change
  React.useEffect(() => {
    if (!mapRef.current) return;

    Object.values(markersRef.current).forEach(m => m.remove());
    markersRef.current = {};

    places.forEach(place => {
      const isActive = activePlaceRef.current?.id === place.id;
      const marker = L.marker([place.lat, place.lng], {
        icon: createIcon(place, isActive),
        zIndexOffset: isActive ? 1000 : 0,
      })
        .addTo(mapRef.current)
        .bindPopup(createPopupContent(place), {
          className: 'wfc-popup',
          maxWidth: 240,
          minWidth: 240,
          offset: [0, -8],
          closeButton: false,
          autoPan: false,
        })
        .on('click', () => {
          onPlaceClick(place);
        })
        .on('mouseover', function () {
          this.openPopup();
        })
        .on('mouseout', function () {
          // Delay close so user can move into the popup
          const m = this;
          setTimeout(() => {
            const popupEl = m.getPopup()?.getElement();
            if (popupEl && popupEl.matches(':hover')) return;
            m.closePopup();
          }, 120);
        });

      markersRef.current[place.id] = marker;
    });
  }, [places]);

  // Update active marker styling
  React.useEffect(() => {
    if (!mapRef.current) return;

    const prev = activePlaceRef.current;
    if (prev && markersRef.current[prev.id]) {
      markersRef.current[prev.id].setIcon(createIcon(prev, false));
      markersRef.current[prev.id].setZIndexOffset(0);
    }

    if (activePlace && markersRef.current[activePlace.id]) {
      markersRef.current[activePlace.id].setIcon(createIcon(activePlace, true));
      markersRef.current[activePlace.id].setZIndexOffset(1000);
      mapRef.current.panTo([activePlace.lat, activePlace.lng], { animate: true, duration: 0.5 });
    }

    activePlaceRef.current = activePlace;
  }, [activePlace]);

  return (
    <div style={{ position: 'relative', flex: 1, overflow: 'hidden', minHeight: 0 }}>
      <div ref={containerRef} style={{ position: 'absolute', inset: 0 }} />

      {/* Current location button */}
      <button
        title="Lokasi saya"
        onClick={() => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
              mapRef.current?.panTo([pos.coords.latitude, pos.coords.longitude]);
            });
          }
        }}
        style={{
          position: 'absolute', bottom: 80, right: 10, zIndex: 1000,
          width: 34, height: 34, borderRadius: 'var(--r-sm)',
          background: 'var(--surface)', border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', fontSize: 16, color: 'var(--text-2)',
        }}
      >
        ◎
      </button>
    </div>
  );
}

Object.assign(window, { MapView });
