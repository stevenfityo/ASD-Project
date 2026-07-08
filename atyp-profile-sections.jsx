// aTyp — Profile section inner screens (Medical, Therapies, Education, Legal, Routine, Documents)

// ── Shared helpers ────────────────────────────────────────────────────

function InfoGroup({ label, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: T.ink2, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>{label}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{children}</div>
    </div>
  );
}

function InfoRow({ I, tint = T.green, bg = T.greenSoft, title, sub, badge, onDelete }) {
  return (
    <div style={{ background: '#fff', borderRadius: 14, padding: '12px 14px', boxShadow: `inset 0 0 0 1px ${T.line}`, display: 'flex', alignItems: 'center', gap: 12 }}>
      {I && (
        <div style={{ width: 38, height: 38, borderRadius: 11, background: bg, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <I s={19} c={tint}/>
        </div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14.5, fontWeight: 700, color: T.ink, letterSpacing: '-0.01em' }}>{title}</div>
        {sub && <div style={{ fontSize: 12, color: T.muted, marginTop: 2, lineHeight: 1.4 }}>{sub}</div>}
      </div>
      {badge && <span style={{ fontSize: 11, fontWeight: 700, color: tint, background: bg, padding: '3px 8px', borderRadius: 999, whiteSpace: 'nowrap', flexShrink: 0 }}>{badge}</span>}
      {onDelete && (
        <button onClick={onDelete} style={{ width: 26, height: 26, borderRadius: 999, border: 'none', cursor: 'pointer', background: '#FEE2E2', color: '#C25450', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 16, fontWeight: 700 }}>×</button>
      )}
    </div>
  );
}

function AddDashedBtn({ label, onClick }) {
  return (
    <button onClick={onClick} style={{ marginTop: 4, width: '100%', background: 'transparent', borderRadius: 14, padding: '12px', border: `1.5px dashed ${T.line}`, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, color: T.green, fontWeight: 700, fontSize: 13 }}>
      <Icon.Plus s={15} c={T.green}/> {label}
    </button>
  );
}

function FileRow({ name, meta, ext = 'PDF', tint = T.green, bg = T.greenSoft, onDelete }) {
  return (
    <div style={{ background: '#fff', borderRadius: 12, padding: '10px 14px', boxShadow: `inset 0 0 0 1px ${T.line}`, display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ width: 36, height: 36, borderRadius: 9, background: bg, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon.Paperclip s={17} c={tint}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: T.ink, letterSpacing: '-0.01em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</div>
        {meta && <div style={{ fontSize: 11.5, color: T.muted, marginTop: 2 }}>{meta}</div>}
      </div>
      <span style={{ fontSize: 10, fontWeight: 700, color: tint, background: bg, padding: '2px 7px', borderRadius: 999, flexShrink: 0 }}>{ext}</span>
      {onDelete && (
        <button onClick={onDelete} style={{ width: 26, height: 26, borderRadius: 999, border: 'none', cursor: 'pointer', background: '#FEE2E2', color: '#C25450', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 16, fontWeight: 700 }}>×</button>
      )}
    </div>
  );
}

// ── Documents Vault data model ────────────────────────────────────────
// Vault state itself lives in App (atyp-app.jsx) so files survive
// navigation and are shared between category screens and the vault list.

const VAULT_CATS = [
  { key: 'medical',   label: 'Medical',           tint: '#C25450', bg: '#F5E1E0' },
  { key: 'therapies', label: 'Therapies',         tint: T.blue,    bg: '#E4EEF6' },
  { key: 'education', label: 'Education & IEP',   tint: T.green,   bg: T.greenSoft },
  { key: 'legal',     label: 'Legal & Financial', tint: '#9C5E3A', bg: '#F2E4D8' },
];

const VAULT_INITIAL = {
  medical: [
    { id: 'm1', name: 'Diagnostic Report.pdf',    meta: 'Autism dx · Dr. Chen · Jan 2024 · 1.2 MB', ext: 'PDF' },
    { id: 'm2', name: 'Primary Care Summary.pdf', meta: 'Annual physical · Jan 2026 · 480 KB',      ext: 'PDF' },
  ],
  therapies: [
    { id: 'th1', name: 'Speech Assessment.pdf', meta: 'Annual evaluation · Tom R., SLP · Nov 2025 · 860 KB', ext: 'PDF' },
    { id: 'th2', name: 'OT Evaluation.pdf',     meta: 'Sensory profile · Amy K., OTR · Oct 2025 · 1.0 MB',  ext: 'PDF' },
  ],
  education: [
    { id: 'e1', name: 'IEP 2026.pdf',         meta: 'Renewed Mar 2026 · 24 pages · 1.8 MB',    ext: 'PDF' },
    { id: 'e2', name: 'Psych Evaluation.pdf', meta: 'School psychologist · Feb 2026 · 1.1 MB', ext: 'PDF' },
  ],
  legal: [
    { id: 'l1', name: 'ABLE Account Statement.pdf', meta: 'Tax-advantaged savings · 2025 · 540 KB',    ext: 'PDF' },
    { id: 'l2', name: 'SSI Benefits Letter.pdf',    meta: 'Award letter · Review Aug 2026 · 280 KB',   ext: 'PDF' },
    { id: 'l3', name: 'Insurance Cards.pdf',        meta: 'Medicaid + secondary · Jan 2026 · 320 KB',  ext: 'PDF' },
  ],
};

const UPLOAD_SOURCES = [
  { key: 'camera', label: 'Take photo',    sub: 'Scan a document with the camera', I: Icon.Camera },
  { key: 'photos', label: 'Photo Library', sub: 'Pick an existing image',          I: Icon.Image  },
  { key: 'files',  label: 'Files',         sub: 'Browse PDFs and documents',       I: Icon.Folder },
];

// Files list for one Documents Vault category — presentational only;
// uploads go through the shared UploadSheet.
function FilesGroup({ files, tint = T.green, bg = T.greenSoft, onDelete, onUpload }) {
  return (
    <InfoGroup label="Files">
      {files.map(f => <FileRow key={f.id} name={f.name} meta={f.meta} ext={f.ext} tint={tint} bg={bg} onDelete={() => onDelete(f.id)}/>)}
      <AddDashedBtn label="Upload document" onClick={onUpload}/>
    </InfoGroup>
  );
}

// Unified upload drawer: pick a source → confirm file + destination folder.
// `presetCat` pre-selects the folder (when opened from a category screen);
// from the Documents Vault it stays null until the user picks one.
function UploadSheet({ presetCat = null, vault, onAttach, onClose }) {
  const [step, setStep] = React.useState('source'); // 'source' | 'confirm'
  const [pending, setPending] = React.useState(null);
  const [cat, setCat] = React.useState(presetCat);

  const pick = (key) => {
    const n = Object.values(vault).reduce((a, l) => a + l.length, 0) + 1;
    const p = key === 'camera' ? { name: `Scan ${n}.jpg`,     ext: 'JPG', size: '0.8 MB', from: 'Camera' }
            : key === 'photos' ? { name: `Photo ${n}.jpg`,    ext: 'JPG', size: '1.1 MB', from: 'Photo Library' }
            :                     { name: `Document ${n}.pdf`, ext: 'PDF', size: '0.4 MB', from: 'Files' };
    setPending(p);
    setStep('confirm');
  };

  const attach = () => {
    if (!cat || !pending) return;
    onAttach(cat, { id: 'f' + Date.now(), name: pending.name, ext: pending.ext, meta: `${pending.from} · just now · ${pending.size}` });
    onClose();
  };

  const catMeta = VAULT_CATS.find(c => c.key === cat);
  const tint = catMeta ? catMeta.tint : T.green;
  const bg = catMeta ? catMeta.bg : T.greenSoft;

  return (
    <Sheet title="Upload document" onClose={onClose}>
      {step === 'source' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {UPLOAD_SOURCES.map(s => (
            <button key={s.key} onClick={() => pick(s.key)} style={{
              width: '100%', background: T.bg, border: `1px solid ${T.line}`, borderRadius: 12,
              padding: '12px 14px', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: bg, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <s.I s={19} c={tint}/>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.ink }}>{s.label}</div>
                <div style={{ fontSize: 11.5, color: T.muted, marginTop: 1 }}>{s.sub}</div>
              </div>
              <Icon.ChevronRight s={15} c={T.muted}/>
            </button>
          ))}
          <button onClick={onClose} style={{ marginTop: 6, height: 52, borderRadius: 14, border: `1.5px solid ${T.line}`, background: 'transparent', fontFamily: 'inherit', fontSize: 16, fontWeight: 700, color: T.ink2, cursor: 'pointer' }}>Cancel</button>
        </div>
      )}

      {step === 'confirm' && pending && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: T.bg, borderRadius: 12, padding: '12px 14px', border: `1px solid ${T.line}` }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: bg, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon.Paperclip s={20} c={tint}/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{pending.name}</div>
              <div style={{ fontSize: 11.5, color: T.muted, marginTop: 2 }}>{pending.from} · {pending.size}</div>
            </div>
            <span style={{ fontSize: 10, fontWeight: 700, color: tint, background: bg, padding: '2px 7px', borderRadius: 999, flexShrink: 0 }}>{pending.ext}</span>
          </div>

          <div>
            <div style={sheetLabelStyle}>Save to folder</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {VAULT_CATS.map(c => {
                const active = c.key === cat;
                return (
                  <button key={c.key} onClick={() => setCat(c.key)} style={{
                    width: '100%', background: '#fff', borderRadius: 12,
                    boxShadow: active ? `inset 0 0 0 2px ${T.green}` : `inset 0 0 0 1px ${T.line}`,
                    border: 'none', padding: '10px 12px', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                    display: 'flex', alignItems: 'center', gap: 12,
                  }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: c.bg, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon.Folder s={18} c={c.tint}/>
                    </div>
                    <div style={{ flex: 1, minWidth: 0, fontSize: 14, fontWeight: 700, color: T.ink }}>{c.label}</div>
                    {active ? (
                      <div style={{ width: 24, height: 24, borderRadius: 999, background: T.green, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon.Check s={14} c="#fff" sw={3}/>
                      </div>
                    ) : (
                      <div style={{ width: 24, height: 24, borderRadius: 999, boxShadow: `inset 0 0 0 1.5px ${T.line}`, flexShrink: 0 }}/>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
            <button onClick={attach} style={{
              height: 52, borderRadius: 14, border: 'none', background: T.green,
              fontFamily: 'inherit', fontSize: 16, fontWeight: 700, color: '#fff', cursor: 'pointer',
              opacity: cat ? 1 : 0.5
            }}>Attach</button>
            <button onClick={() => { setPending(null); setStep('source'); }} style={{
              height: 52, borderRadius: 14, border: `1.5px solid ${T.line}`,
              background: 'transparent', fontFamily: 'inherit', fontSize: 16, fontWeight: 700,
              color: T.ink2, cursor: 'pointer'
            }}>Choose again</button>
          </div>
        </div>
      )}
    </Sheet>
  );
}

function SheetField({ label, value, onChange, placeholder, type = 'text', autoFocus = false }) {
  return (
    <div>
      <div style={sheetLabelStyle}>{label}</div>
      <input autoFocus={autoFocus} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} type={type}
        style={sheetInputStyle}
        onFocus={e => e.currentTarget.style.borderColor = T.green}
        onBlur={e => e.currentTarget.style.borderColor = T.line}/>
    </div>
  );
}

// ── Vault category screens (Medical / Therapies / Education / Legal) ──

function ProfileVaultCategoryScreen({ catKey, back, vault, addVaultFile, removeVaultFile }) {
  const cat = VAULT_CATS.find(c => c.key === catKey);
  const [uploadOpen, setUploadOpen] = React.useState(false);
  return (
    <Screen bg={T.bg}>
      <ScreenHeader title={cat.label} onBack={back} sticky={false}/>
      <div style={{ padding: '0 18px 32px' }}>
        <FilesGroup files={vault[catKey] || []} tint={cat.tint} bg={cat.bg}
          onDelete={id => removeVaultFile(catKey, id)} onUpload={() => setUploadOpen(true)}/>
      </div>
      {uploadOpen && <UploadSheet presetCat={catKey} vault={vault} onAttach={addVaultFile} onClose={() => setUploadOpen(false)}/>}
    </Screen>
  );
}

// ── Daily Routine (edit page) ─────────────────────────────────────────

function ProfileRoutineScreen({ back }) {
  const kindMeta = {
    med:     { label: 'Medication', I: Icon.Hospital, tint: '#C25450', bg: '#F5E1E0' },
    meal:    { label: 'Meal',       I: Icon.Bulb,     tint: '#9C5E3A', bg: '#F2E4D8' },
    sensory: { label: 'Sensory',    I: Icon.Brain,    tint: T.blue,    bg: '#E4EEF6' },
    therapy: { label: 'Therapy',    I: Icon.Pen,      tint: T.green,   bg: T.greenSoft },
    sleep:   { label: 'Sleep',      I: Icon.Bookmark, tint: '#8B5BAE', bg: '#EDE3F4' },
  };

  const [items, setItems] = React.useState([
    { id: 'r1', time: '7:30 AM',  title: 'Morning melatonin',  sub: '2.5 mg with water',              kind: 'med' },
    { id: 'r2', time: '8:00 AM',  title: 'GF/CF breakfast',    sub: 'No gluten · no dairy',           kind: 'meal' },
    { id: 'r3', time: '12:30 PM', title: 'Sensory break',       sub: '10 min · quiet corner',         kind: 'sensory' },
    { id: 'r4', time: '4:00 PM',  title: 'Speech exercises',   sub: '15 min · /s/ & /r/ drills',     kind: 'therapy' },
    { id: 'r5', time: '8:30 PM',  title: 'Wind-down routine',  sub: 'Bath · weighted blanket · book', kind: 'sleep' },
  ]);

  const [adding, setAdding] = React.useState(false);
  const [newItem, setNewItem] = React.useState({ time: '', title: '', kind: 'med' });
  const [editingId, setEditingId] = React.useState(null);
  const [editDraft, setEditDraft] = React.useState({});

  const addItem = () => {
    if (!newItem.title.trim()) return;
    setItems(s => [...s, { ...newItem, id: 'r' + Date.now(), sub: '' }]);
    setNewItem({ time: '', title: '', kind: 'med' });
    setAdding(false);
  };

  return (
    <Screen bg={T.bg}>
      <ScreenHeader title="Daily Routine" onBack={back} sticky={false}
        right={<div style={{ fontSize: 12, color: T.muted, fontWeight: 600 }}>{items.length} tasks</div>}
      />
      <div style={{ padding: '0 18px 32px' }}>
        <div style={{ fontSize: 13, color: T.muted, marginBottom: 14, lineHeight: 1.5 }}>
          Repeats every day and appears on the Home screen checklist.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 10 }}>
          {items.map(item => {
            const k = kindMeta[item.kind] || kindMeta.therapy;
            const isEditing = editingId === item.id;
            return (
              <div key={item.id} style={{ background: '#fff', borderRadius: 14, boxShadow: isEditing ? `inset 0 0 0 1.5px ${T.green}` : `inset 0 0 0 1px ${T.line}`, overflow: 'hidden', transition: 'box-shadow .15s' }}>
                {isEditing ? (
                  <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div>
                      <div style={{ fontSize: 11, color: T.muted, fontWeight: 600, marginBottom: 5 }}>Task name</div>
                      <input autoFocus value={editDraft.title} onChange={e => setEditDraft(d => ({ ...d, title: e.target.value }))}
                        style={{ width: '100%', boxSizing: 'border-box', height: 42, borderRadius: 10, border: `1.5px solid ${T.line}`, padding: '0 12px', fontFamily: 'inherit', fontSize: 14, color: T.ink, outline: 'none' }}
                        onFocus={e => e.currentTarget.style.borderColor = T.green}
                        onBlur={e => e.currentTarget.style.borderColor = T.line} />
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: T.muted, fontWeight: 600, marginBottom: 5 }}>Notes / details</div>
                      <input value={editDraft.sub} onChange={e => setEditDraft(d => ({ ...d, sub: e.target.value }))}
                        placeholder="Optional description…"
                        style={{ width: '100%', boxSizing: 'border-box', height: 38, borderRadius: 10, border: `1.5px solid ${T.line}`, padding: '0 12px', fontFamily: 'inherit', fontSize: 13, color: T.ink, outline: 'none' }}
                        onFocus={e => e.currentTarget.style.borderColor = T.green}
                        onBlur={e => e.currentTarget.style.borderColor = T.line} />
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 11, color: T.muted, fontWeight: 600, marginBottom: 5 }}>Time</div>
                        <input value={editDraft.time} onChange={e => setEditDraft(d => ({ ...d, time: e.target.value }))}
                          placeholder="7:30 AM"
                          style={{ width: '100%', boxSizing: 'border-box', height: 38, borderRadius: 10, border: `1.5px solid ${T.line}`, padding: '0 10px', fontFamily: 'inherit', fontSize: 13, color: T.ink, outline: 'none' }}
                          onFocus={e => e.currentTarget.style.borderColor = T.green}
                          onBlur={e => e.currentTarget.style.borderColor = T.line} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 11, color: T.muted, fontWeight: 600, marginBottom: 5 }}>Category</div>
                        <select value={editDraft.kind} onChange={e => setEditDraft(d => ({ ...d, kind: e.target.value }))}
                          style={{ width: '100%', height: 38, borderRadius: 10, border: `1.5px solid ${T.line}`, padding: '0 8px', fontFamily: 'inherit', fontSize: 13, color: T.ink, background: '#fff', outline: 'none' }}>
                          {Object.entries(kindMeta).map(([kk, v]) => <option key={kk} value={kk}>{v.label}</option>)}
                        </select>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => { setItems(s => s.map(i => i.id === item.id ? { ...i, ...editDraft } : i)); setEditingId(null); }}
                        style={{ flex: 1, height: 40, borderRadius: 10, border: 'none', background: T.green, fontFamily: 'inherit', fontSize: 14, fontWeight: 700, color: '#fff', cursor: 'pointer' }}>Save</button>
                      <button onClick={() => setEditingId(null)}
                        style={{ flex: 1, height: 40, borderRadius: 10, border: `1.5px solid ${T.line}`, background: 'transparent', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, color: T.ink2, cursor: 'pointer' }}>Cancel</button>
                      <button onClick={() => { setItems(s => s.filter(i => i.id !== item.id)); setEditingId(null); }}
                        style={{ width: 40, height: 40, borderRadius: 10, border: 'none', background: '#FEE2E2', fontFamily: 'inherit', fontSize: 18, color: '#C25450', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
                    </div>
                  </div>
                ) : (
                  <div style={{ padding: '11px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 5, alignSelf: 'stretch', borderRadius: 999, background: k.tint, opacity: 0.7, flexShrink: 0 }}/>
                    <div style={{ width: 34, height: 34, borderRadius: 10, background: k.bg, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <k.I s={17} c={k.tint}/>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: T.ink, letterSpacing: '-0.01em' }}>{item.title}</div>
                      {item.sub && <div style={{ fontSize: 11.5, color: T.muted, marginTop: 1 }}>{item.sub}</div>}
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: T.ink2, background: T.bgAlt, padding: '3px 8px', borderRadius: 999, whiteSpace: 'nowrap', flexShrink: 0 }}>
                      {item.time}
                    </div>
                    <button onClick={() => { setEditingId(item.id); setEditDraft({ title: item.title, sub: item.sub || '', time: item.time, kind: item.kind }); }}
                      style={{ height: 28, padding: '0 10px', borderRadius: 999, border: 'none', cursor: 'pointer', background: T.greenSoft, fontFamily: 'inherit', fontSize: 12, fontWeight: 700, color: T.green, flexShrink: 0 }}>Edit</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <AddDashedBtn label="Add daily task" onClick={() => setAdding(true)}/>
      </div>
      {adding && (
        <Sheet title="Add daily task" onClose={() => setAdding(false)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <div style={sheetLabelStyle}>Task name *</div>
              <input autoFocus value={newItem.title} onChange={e => setNewItem(s => ({ ...s, title: e.target.value }))} placeholder="Task name..."
                style={sheetInputStyle}
                onFocus={e => e.currentTarget.style.borderColor = T.green}
                onBlur={e => e.currentTarget.style.borderColor = T.line}/>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <div style={{ flex: 1 }}>
                <div style={sheetLabelStyle}>Time</div>
                <input value={newItem.time} onChange={e => setNewItem(s => ({ ...s, time: e.target.value }))} placeholder="7:30 AM"
                  style={sheetInputStyle}
                  onFocus={e => e.currentTarget.style.borderColor = T.green}
                  onBlur={e => e.currentTarget.style.borderColor = T.line}/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={sheetLabelStyle}>Category</div>
                <select value={newItem.kind} onChange={e => setNewItem(s => ({ ...s, kind: e.target.value }))}
                  style={{ ...sheetInputStyle, background: T.bg }}>
                  {Object.entries(kindMeta).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
              <button onClick={addItem} style={{
                height: 52, borderRadius: 14, border: 'none', background: T.green,
                fontFamily: 'inherit', fontSize: 16, fontWeight: 700, color: '#fff', cursor: 'pointer',
                opacity: newItem.title.trim() ? 1 : 0.5
              }}>Add task</button>
              <button onClick={() => setAdding(false)} style={{
                height: 52, borderRadius: 14, border: `1.5px solid ${T.line}`,
                background: 'transparent', fontFamily: 'inherit', fontSize: 16, fontWeight: 700,
                color: T.ink2, cursor: 'pointer'
              }}>Cancel</button>
            </div>
          </div>
        </Sheet>
      )}
    </Screen>
  );
}

// ── Documents Vault ───────────────────────────────────────────────────

function ProfileDocumentsScreen({ back, vault, addVaultFile }) {
  const [uploadOpen, setUploadOpen] = React.useState(false);
  const docs = VAULT_CATS.flatMap(c => (vault[c.key] || []).map(f => ({ ...f, cat: c })));

  return (
    <Screen bg={T.bg}>
      <ScreenHeader title="Documents Vault" onBack={back} sticky={false}
        right={<button onClick={() => setUploadOpen(true)} style={{ height: 32, padding: '0 12px', borderRadius: 999, background: T.greenSoft, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, color: T.green, display: 'flex', alignItems: 'center', gap: 5 }}><Icon.Plus s={13} c={T.green}/> Upload</button>}
      />
      <div style={{ padding: '0 18px 32px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {docs.map(d => (
          <div key={`${d.cat.key}-${d.id}`} style={{ background: '#fff', borderRadius: 14, padding: '12px 14px', boxShadow: `inset 0 0 0 1px ${T.line}`, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 11, background: d.cat.bg, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon.Folder s={20} c={d.cat.tint}/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14.5, fontWeight: 700, color: T.ink, letterSpacing: '-0.01em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.name}</div>
              <div style={{ fontSize: 12, color: T.muted, marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.meta}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
              <span style={{ fontSize: 10.5, fontWeight: 700, color: d.cat.tint, background: d.cat.bg, padding: '2px 7px', borderRadius: 999 }}>{d.cat.label}</span>
              <span style={{ fontSize: 11, color: T.muted, fontWeight: 600 }}>{d.ext}</span>
            </div>
          </div>
        ))}
        <AddDashedBtn label="Upload document" onClick={() => setUploadOpen(true)}/>
      </div>
      {uploadOpen && <UploadSheet presetCat={null} vault={vault} onAttach={addVaultFile} onClose={() => setUploadOpen(false)}/>}
    </Screen>
  );
}

// ── Trusted Person ────────────────────────────────────────────────────

function ProfileTrustedScreen({ back }) {
  const emptyPerson = { name: '', relation: '', phone: '', email: '', note: '' };
  const [people, setPeople] = React.useState([
    { id: 't1', name: 'Robert Miller', relation: 'Uncle', phone: '+1 (555) 234-5678', email: 'robert@example.com', note: 'Has full medical power of attorney.' },
  ]);
  const [adding, setAdding] = React.useState(false);
  const [draft, setDraft] = React.useState(emptyPerson);
  const [deletingId, setDeletingId] = React.useState(null);

  const add = () => {
    if (!draft.name.trim()) return;
    setPeople(p => [...p, { ...draft, id: 't' + Date.now() }]);
    setDraft(emptyPerson);
    setAdding(false);
  };

  const remove = (id) => { setPeople(p => p.filter(x => x.id !== id)); setDeletingId(null); };

  return (
    <Screen bg={T.bg}>
      <ScreenHeader title="Trusted Person" onBack={back} sticky={false}/>

      <div style={{ padding: '0 18px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* Info banner */}
        <div style={{ background: `${T.green}0F`, borderRadius: 14, padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'flex-start', boxShadow: `inset 0 0 0 1px ${T.green}22` }}>
          <Icon.Heart s={18} c={T.green} style={{ flexShrink: 0, marginTop: 1 }}/>
          <div style={{ fontSize: 13, color: T.ink2, lineHeight: 1.55 }}>
            Trusted persons can receive guardianship of this child's profile if the primary caregiver is unable to continue. They will not have access until you explicitly transfer the account.
          </div>
        </div>

        {/* List of trusted people */}
        {people.map(p => (
          <div key={p.id} style={{ background: '#fff', borderRadius: 16, boxShadow: `inset 0 0 0 1px ${T.line}`, overflow: 'hidden' }}>
            <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 46, height: 46, borderRadius: 999, background: T.greenSoft, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 18, fontWeight: 700, color: T.green }}>
                  {p.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                </span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15.5, fontWeight: 700, color: T.ink, letterSpacing: '-0.01em' }}>{p.name}</div>
                <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>{p.relation}</div>
              </div>
              <button onClick={() => setDeletingId(p.id)} style={{
                width: 32, height: 32, borderRadius: 999, border: 'none', cursor: 'pointer',
                background: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, color: '#C25450', flexShrink: 0,
              }}>×</button>
            </div>
            <div style={{ borderTop: `1px solid ${T.line}`, padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {p.phone && (
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <div style={{ fontSize: 11.5, fontWeight: 700, color: T.muted, width: 52 }}>Phone</div>
                  <div style={{ fontSize: 13.5, color: T.ink, fontWeight: 600 }}>{p.phone}</div>
                </div>
              )}
              {p.email && (
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <div style={{ fontSize: 11.5, fontWeight: 700, color: T.muted, width: 52 }}>Email</div>
                  <div style={{ fontSize: 13.5, color: T.ink, fontWeight: 600 }}>{p.email}</div>
                </div>
              )}
              {p.note && (
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <div style={{ fontSize: 11.5, fontWeight: 700, color: T.muted, width: 52, paddingTop: 1 }}>Note</div>
                  <div style={{ fontSize: 13, color: T.ink2, flex: 1, lineHeight: 1.45 }}>{p.note}</div>
                </div>
              )}
            </div>

            {/* Delete confirm */}
            {deletingId === p.id && (
              <div style={{ borderTop: `1px solid ${T.line}`, padding: '12px 16px', background: '#FEF2F2', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ fontSize: 13, color: '#C25450', fontWeight: 600 }}>Remove {p.name} as trusted person?</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => remove(p.id)} style={{ flex: 1, height: 38, borderRadius: 10, border: 'none', background: '#C25450', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, color: '#fff', cursor: 'pointer' }}>Yes, remove</button>
                  <button onClick={() => setDeletingId(null)} style={{ flex: 1, height: 38, borderRadius: 10, border: `1.5px solid ${T.line}`, background: 'transparent', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, color: T.ink2, cursor: 'pointer' }}>Cancel</button>
                </div>
              </div>
            )}
          </div>
        ))}

        <AddDashedBtn label="Add trusted person" onClick={() => setAdding(true)}/>
      </div>
      {adding && (
        <Sheet title="New trusted person" onClose={() => { setAdding(false); setDraft(emptyPerson); }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <SheetField autoFocus label="Full name" value={draft.name} onChange={v => setDraft(d => ({ ...d, name: v }))} placeholder="Jane Smith"/>
            <SheetField label="Relationship" value={draft.relation} onChange={v => setDraft(d => ({ ...d, relation: v }))} placeholder="Aunt, sibling, family friend..."/>
            <SheetField label="Phone" value={draft.phone} onChange={v => setDraft(d => ({ ...d, phone: v }))} placeholder="+1 (555) 000-0000" type="tel"/>
            <SheetField label="Email" value={draft.email} onChange={v => setDraft(d => ({ ...d, email: v }))} placeholder="name@email.com" type="email"/>
            <SheetField label="Note (optional)" value={draft.note} onChange={v => setDraft(d => ({ ...d, note: v }))} placeholder="Power of attorney, specific instructions..."/>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
              <button onClick={add} style={{
                height: 52, borderRadius: 14, border: 'none', background: T.green,
                fontFamily: 'inherit', fontSize: 16, fontWeight: 700, color: '#fff', cursor: 'pointer',
                opacity: draft.name.trim() ? 1 : 0.5
              }}>Add person</button>
              <button onClick={() => { setAdding(false); setDraft(emptyPerson); }} style={{
                height: 52, borderRadius: 14, border: `1.5px solid ${T.line}`,
                background: 'transparent', fontFamily: 'inherit', fontSize: 16, fontWeight: 700,
                color: T.ink2, cursor: 'pointer'
              }}>Cancel</button>
            </div>
          </div>
        </Sheet>
      )}
    </Screen>
  );
}

// ── Router ────────────────────────────────────────────────────────────

function ProfileSectionScreen({ sectionId, back, child, vault, addVaultFile, removeVaultFile }) {
  switch (sectionId) {
    case 'medical':
    case 'therapies':
    case 'education':
    case 'legal':     return <ProfileVaultCategoryScreen catKey={sectionId} back={back} vault={vault} addVaultFile={addVaultFile} removeVaultFile={removeVaultFile}/>;
    case 'routine':   return <ProfileRoutineScreen back={back} child={child}/>;
    case 'documents': return <ProfileDocumentsScreen back={back} child={child} vault={vault} addVaultFile={addVaultFile} removeVaultFile={removeVaultFile}/>;
    case 'trusted':   return <ProfileTrustedScreen back={back} child={child}/>;
    default:          return null;
  }
}

Object.assign(window, { ProfileSectionScreen, VAULT_CATS, VAULT_INITIAL });
