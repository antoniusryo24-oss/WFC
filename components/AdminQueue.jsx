// AdminQueue.jsx — Admin review queue overlay
// Exports: AdminQueue

function AdminQueue({ onClose, currentUser }) {
  const [submissions, setSubmissions] = React.useState(WFC_DATA.adminQueue);
  const [rejectModal, setRejectModal] = React.useState(null); // submission id
  const [rejectReason, setRejectReason] = React.useState('');
  const [toast, setToast] = React.useState(null);

  function showToast(msg, type = 'success') {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  function handleApprove(id) {
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status: 'approved' } : s));
    showToast('Tempat disetujui dan sekarang visible ke publik.');
  }

  function handleReject(id) {
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status: 'rejected', rejection_reason: rejectReason } : s));
    setRejectModal(null);
    setRejectReason('');
    showToast('Submission ditolak. User akan mendapat notifikasi.', 'warn');
  }

  const DISTRICT_LABELS = { dago:'Dago', buah_batu:'Buah Batu', braga:'Braga', setiabudhi:'Setiabudhi', antapani:'Antapani' };
  const TYPE_LABELS = { cafe:'Cafe', restaurant:'Restoran', hybrid:'Cafe·Resto', hotel_lobby:'Hotel Lobby' };

  const pending = submissions.filter(s => s.status === 'pending');
  const reviewed = submissions.filter(s => s.status !== 'pending');

  const overlayStyle = {
    position: 'fixed', inset: 0, zIndex: 200,
    background: 'rgba(26,23,20,0.55)',
    display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end',
    backdropFilter: 'blur(3px)',
  };

  const panelStyle = {
    width: 560,
    height: '100%',
    background: 'var(--surface)',
    borderLeft: '1px solid var(--border)',
    display: 'flex', flexDirection: 'column',
    overflow: 'hidden',
  };

  const badgeStyle = (status) => ({
    pending:  { background:'var(--amber-bg)', color:'var(--amber)' },
    approved: { background:'var(--green-bg)', color:'var(--green)' },
    rejected: { background:'var(--red-bg)',   color:'var(--red)'   },
  }[status] || {});

  return (
    <div style={overlayStyle} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={panelStyle} className="fade-in">
        {/* Header */}
        <div style={{ padding:'20px 24px', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div>
            <h2 style={{ fontSize:18, fontFamily:'var(--font-display)', fontWeight:400, marginBottom:2 }}>Review Queue</h2>
            <div style={{ fontSize:12, color:'var(--text-2)' }}>
              <strong style={{ color:'var(--amber)' }}>{pending.length}</strong> menunggu review
            </div>
          </div>
          <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', fontSize:20, color:'var(--text-3)' }}>×</button>
        </div>

        {/* Content */}
        <div style={{ flex:1, overflowY:'auto', padding:'16px 24px', display:'flex', flexDirection:'column', gap:12 }}>
          {/* Pending section */}
          {pending.length > 0 && (
            <>
              <div style={{ fontSize:10, fontWeight:700, color:'var(--text-3)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:4 }}>Menunggu Review</div>
              {pending.map(sub => (
                <div key={sub.id} style={{ border:'1px solid var(--border)', borderRadius:'var(--r-lg)', overflow:'hidden' }}>
                  <div style={{ padding:'14px 16px' }}>
                    <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:8, marginBottom:6 }}>
                      <div>
                        <div style={{ fontWeight:700, fontSize:14, color:'var(--text-1)', marginBottom:2 }}>{sub.place.name}</div>
                        <div style={{ fontSize:12, color:'var(--text-2)' }}>
                          {TYPE_LABELS[sub.place.type]} · {DISTRICT_LABELS[sub.place.district]}
                        </div>
                      </div>
                      <span className="pill" style={{ ...badgeStyle(sub.status), fontSize:11 }}>{sub.status}</span>
                    </div>
                    <div style={{ fontSize:12, color:'var(--text-3)', marginBottom:8 }}>
                      📍 {sub.place.address}
                    </div>
                    <div style={{ padding:'10px 12px', background:'var(--surface-alt)', borderRadius:'var(--r-sm)', fontSize:12, color:'var(--text-2)', marginBottom:10, lineHeight:1.5 }}>
                      "{sub.note}"
                    </div>
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                      <div style={{ fontSize:11, color:'var(--text-3)' }}>
                        <span>oleh <strong style={{ color:'var(--text-2)' }}>{sub.submittedBy}</strong></span>
                        <span style={{ margin:'0 6px', color:'var(--border-mid)' }}>·</span>
                        <span>{sub.submittedAt}</span>
                        <span style={{ margin:'0 6px', color:'var(--border-mid)' }}>·</span>
                        <span>{sub.images} foto</span>
                      </div>
                      <div style={{ display:'flex', gap:8 }}>
                        <button
                          onClick={() => setRejectModal(sub.id)}
                          style={{ padding:'6px 14px', borderRadius:'var(--r-sm)', border:'1.5px solid var(--border)', background:'var(--surface)', color:'var(--red)', fontFamily:'var(--font-ui)', fontSize:12, fontWeight:600, cursor:'pointer' }}
                        >Tolak</button>
                        <button
                          onClick={() => handleApprove(sub.id)}
                          style={{ padding:'6px 14px', borderRadius:'var(--r-sm)', border:'none', background:'var(--green)', color:'white', fontFamily:'var(--font-ui)', fontSize:12, fontWeight:600, cursor:'pointer' }}
                        >Setujui</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Reviewed section */}
          {reviewed.length > 0 && (
            <>
              <div style={{ fontSize:10, fontWeight:700, color:'var(--text-3)', textTransform:'uppercase', letterSpacing:'0.06em', margin:'8px 0 4px' }}>Sudah Direview</div>
              {reviewed.map(sub => (
                <div key={sub.id} style={{ border:'1px solid var(--border)', borderRadius:'var(--r-lg)', padding:'14px 16px', opacity:0.7 }}>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:8 }}>
                    <div>
                      <div style={{ fontWeight:600, fontSize:13, color:'var(--text-1)', marginBottom:2 }}>{sub.place.name}</div>
                      <div style={{ fontSize:11, color:'var(--text-3)' }}>{TYPE_LABELS[sub.place.type]} · {DISTRICT_LABELS[sub.place.district]}</div>
                    </div>
                    <span className="pill" style={{ ...badgeStyle(sub.status), fontSize:11 }}>{sub.status}</span>
                  </div>
                  {sub.rejection_reason && (
                    <div style={{ marginTop:8, fontSize:11, color:'var(--red)', padding:'6px 10px', background:'var(--red-bg)', borderRadius:'var(--r-sm)' }}>
                      Alasan: {sub.rejection_reason}
                    </div>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Reject modal */}
      {rejectModal && (
        <div style={{ position:'fixed', inset:0, zIndex:300, background:'rgba(26,23,20,0.6)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <div style={{ background:'var(--surface)', borderRadius:'var(--r-xl)', padding:'28px 28px', width:400, boxShadow:'var(--shadow-xl)' }}>
            <h3 style={{ fontSize:16, fontWeight:700, marginBottom:8 }}>Alasan penolakan</h3>
            <p style={{ fontSize:13, color:'var(--text-2)', marginBottom:16 }}>Berikan alasan yang jelas agar user bisa memperbaiki submissionnya.</p>
            <textarea
              value={rejectReason}
              onChange={e => setRejectReason(e.target.value)}
              placeholder="Contoh: Foto tidak jelas, alamat tidak valid..."
              style={{
                width:'100%', height:100, padding:'10px 12px',
                border:'1.5px solid var(--border)', borderRadius:'var(--r-md)',
                fontFamily:'var(--font-ui)', fontSize:13, resize:'vertical',
                outline:'none', background:'var(--surface-alt)', color:'var(--text-1)',
              }}
            />
            <div style={{ display:'flex', gap:8, marginTop:16, justifyContent:'flex-end' }}>
              <button onClick={() => setRejectModal(null)} className="btn btn-secondary" style={{ fontSize:13 }}>Batal</button>
              <button onClick={() => handleReject(rejectModal)} disabled={!rejectReason.trim()} className="btn btn-primary" style={{ fontSize:13, background:'var(--red)', opacity: rejectReason.trim() ? 1 : 0.5 }}>Tolak submission</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={{
          position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)',
          zIndex:400, background: toast.type === 'warn' ? 'var(--amber)' : 'var(--green)',
          color:'white', padding:'10px 20px', borderRadius:'var(--r-full)',
          fontSize:13, fontWeight:600, boxShadow:'var(--shadow-lg)',
        }} className="fade-in">
          {toast.msg}
        </div>
      )}
    </div>
  );
}

Object.assign(window, { AdminQueue });
