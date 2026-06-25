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

// Files group reused by every Documents Vault category — supports delete + upload.
// `tint`/`bg` colour the file chips. `initial` is the starting list of { name, meta, ext }.
function FilesGroup({ initial = [], tint = T.green, bg = T.greenSoft }) {
  const [files, setFiles] = React.useState(initial.map((f, i) => ({ ...f, id: 'f' + i })));
  const remove = (id) => setFiles(s => s.filter(f => f.id !== id));
  const upload = () => {
    const n = files.length + 1;
    setFiles(s => [...s, { id: 'f' + Date.now(), name: `New document ${n}.pdf`, meta: 'Uploaded just now · 0.4 MB', ext: 'PDF' }]);
  };
  return (
    <InfoGroup label="Files">
      {files.map(f => <FileRow key={f.id} name={f.name} meta={f.meta} ext={f.ext} tint={tint} bg={bg} onDelete={() => remove(f.id)}/>)}
      <AddDashedBtn label="Upload document" onClick={upload}/>
    </InfoGroup>
  );
}

// ── Medical ────────────────────────────────────────────────────────────

function ProfileMedicalScreen({ back }) {
  return (
    <Screen bg={T.bg}>
      <ScreenHeader title="Medical" onBack={back} sticky={false}/>
      <div style={{ padding: '0 18px 32px' }}>
        <FilesGroup tint="#C25450" bg="#F5E1E0" initial={[
          { name: 'Diagnostic Report.pdf',   meta: 'Autism dx · Dr. Chen · Jan 2024 · 1.2 MB', ext: 'PDF' },
          { name: 'Primary Care Summary.pdf', meta: 'Annual physical · Jan 2026 · 480 KB',      ext: 'PDF' },
        ]}/>
      </div>
    </Screen>
  );
}

// ── Therapies ─────────────────────────────────────────────────────────

function ProfileTherapiesScreen({ back }) {
  return (
    <Screen bg={T.bg}>
      <ScreenHeader title="Therapies" onBack={back} sticky={false}/>
      <div style={{ padding: '0 18px 32px' }}>
        <FilesGroup tint={T.blue} bg="#E4EEF6" initial={[
          { name: 'Speech Assessment.pdf', meta: 'Annual evaluation · Tom R., SLP · Nov 2025 · 860 KB', ext: 'PDF' },
          { name: 'OT Evaluation.pdf',     meta: 'Sensory profile · Amy K., OTR · Oct 2025 · 1.0 MB',  ext: 'PDF' },
        ]}/>
      </div>
    </Screen>
  );
}

// ── Education & IEP ───────────────────────────────────────────────────

function ProfileEducationScreen({ back }) {
  return (
    <Screen bg={T.bg}>
      <ScreenHeader title="Education & IEP" onBack={back} sticky={false}/>
      <div style={{ padding: '0 18px 32px' }}>
        <FilesGroup initial={[
          { name: 'IEP 2026.pdf',         meta: 'Renewed Mar 2026 · 24 pages · 1.8 MB',  ext: 'PDF' },
          { name: 'Psych Evaluation.pdf', meta: 'School psychologist · Feb 2026 · 1.1 MB', ext: 'PDF' },
        ]}/>
      </div>
    </Screen>
  );
}

// ── Legal & Financial ─────────────────────────────────────────────────

function ProfileLegalScreen({ back }) {
  return (
    <Screen bg={T.bg}>
      <ScreenHeader title="Legal & Financial" onBack={back} sticky={false}/>
      <div style={{ padding: '0 18px 32px' }}>
        <FilesGroup tint="#9C5E3A" bg="#F2E4D8" initial={[
          { name: 'ABLE Account Statement.pdf', meta: 'Tax-advantaged savings · 2025 · 540 KB', ext: 'PDF' },
          { name: 'SSI Benefits Letter.pdf',    meta: 'Award letter · Review Aug 2026 · 280 KB', ext: 'PDF' },
        ]}/>
      </div>
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

        {adding ? (
          <div style={{ background: '#fff', borderRadius: 16, padding: '14px', boxShadow: `inset 0 0 0 1.5px ${T.green}` }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input value={newItem.title} onChange={e => setNewItem(s => ({ ...s, title: e.target.value }))} placeholder="Task name…" style={{ height: 42, borderRadius: 10, border: `1.5px solid ${T.line}`, padding: '0 12px', fontFamily: 'inherit', fontSize: 14, color: T.ink, outline: 'none', width: '100%', boxSizing: 'border-box' }}/>
              <div style={{ display: 'flex', gap: 8 }}>
                <input value={newItem.time} onChange={e => setNewItem(s => ({ ...s, time: e.target.value }))} placeholder="7:30 AM" style={{ flex: 1, height: 38, borderRadius: 10, border: `1.5px solid ${T.line}`, padding: '0 10px', fontFamily: 'inherit', fontSize: 13, color: T.ink, outline: 'none' }}/>
                <select value={newItem.kind} onChange={e => setNewItem(s => ({ ...s, kind: e.target.value }))} style={{ height: 38, borderRadius: 10, border: `1.5px solid ${T.line}`, padding: '0 8px', fontFamily: 'inherit', fontSize: 13, color: T.ink, background: '#fff', outline: 'none' }}>
                  {Object.entries(kindMeta).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                </select>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <Btn variant="primary" style={{ height: 40, fontSize: 14 }} onClick={addItem}>Add task</Btn>
                <Btn variant="ghost" full={false} style={{ height: 40, fontSize: 14, padding: '0 16px' }} onClick={() => setAdding(false)}>Cancel</Btn>
              </div>
            </div>
          </div>
        ) : (
          <AddDashedBtn label="Add daily task" onClick={() => setAdding(true)}/>
        )}
      </div>
    </Screen>
  );
}

// ── Documents Vault ───────────────────────────────────────────────────

function ProfileDocumentsScreen({ back }) {
  const docs = [
    { id: 'doc1', title: 'IEP 2026',           sub: 'Renewed Mar 2026 · 24 pages',           kind: 'IEP',       date: 'Mar 2026' },
    { id: 'doc2', title: 'Diagnostic Report',  sub: 'Autism dx · Dr. Chen · Jan 2024',       kind: 'Medical',   date: 'Jan 2024' },
    { id: 'doc3', title: 'Speech Assessment',  sub: 'Annual evaluation · Tom R., SLP',       kind: 'Therapy',   date: 'Nov 2025' },
    { id: 'doc4', title: 'OT Evaluation',      sub: 'Sensory profile · Amy K., OTR',         kind: 'Therapy',   date: 'Oct 2025' },
    { id: 'doc5', title: 'Medical Records',    sub: 'Primary care summary · Various',        kind: 'Medical',   date: 'Jan 2026' },
    { id: 'doc6', title: 'Insurance Cards',    sub: 'Medicaid + secondary · 2026',           kind: 'Insurance', date: 'Jan 2026' },
  ];

  const kindColor = {
    IEP:       [T.green,   T.greenSoft],
    Medical:   ['#C25450', '#F5E1E0'],
    Therapy:   [T.blue,    '#E4EEF6'],
    Insurance: ['#9C5E3A', '#F2E4D8'],
  };

  return (
    <Screen bg={T.bg}>
      <ScreenHeader title="Documents Vault" onBack={back} sticky={false}
        right={<button style={{ height: 32, padding: '0 12px', borderRadius: 999, background: T.greenSoft, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, color: T.green, display: 'flex', alignItems: 'center', gap: 5 }}><Icon.Plus s={13} c={T.green}/> Upload</button>}
      />
      <div style={{ padding: '0 18px 32px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {docs.map(d => {
          const [tint, bg] = kindColor[d.kind] || [T.green, T.greenSoft];
          return (
            <div key={d.id} style={{ background: '#fff', borderRadius: 14, padding: '12px 14px', boxShadow: `inset 0 0 0 1px ${T.line}`, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 11, background: bg, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon.Folder s={20} c={tint}/>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14.5, fontWeight: 700, color: T.ink, letterSpacing: '-0.01em' }}>{d.title}</div>
                <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>{d.sub}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
                <span style={{ fontSize: 10.5, fontWeight: 700, color: tint, background: bg, padding: '2px 7px', borderRadius: 999 }}>{d.kind}</span>
                <span style={{ fontSize: 11, color: T.muted, fontWeight: 600 }}>{d.date}</span>
              </div>
            </div>
          );
        })}
      </div>
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

  const Field = ({ label, value, onChange, placeholder, type = 'text' }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ fontSize: 11.5, fontWeight: 700, color: T.muted, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</div>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} type={type}
        style={{ height: 42, borderRadius: 10, border: `1.5px solid ${T.line}`, padding: '0 12px', fontFamily: 'inherit', fontSize: 14, color: T.ink, outline: 'none', width: '100%', boxSizing: 'border-box', background: '#fff' }}/>
    </div>
  );

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

        {/* Add form */}
        {adding ? (
          <div style={{ background: '#fff', borderRadius: 16, padding: '16px', boxShadow: `inset 0 0 0 1.5px ${T.green}`, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: T.ink, marginBottom: 2 }}>New trusted person</div>
            <Field label="Full name" value={draft.name} onChange={v => setDraft(d => ({ ...d, name: v }))} placeholder="Jane Smith"/>
            <Field label="Relationship" value={draft.relation} onChange={v => setDraft(d => ({ ...d, relation: v }))} placeholder="Aunt, sibling, family friend…"/>
            <Field label="Phone" value={draft.phone} onChange={v => setDraft(d => ({ ...d, phone: v }))} placeholder="+1 (555) 000-0000" type="tel"/>
            <Field label="Email" value={draft.email} onChange={v => setDraft(d => ({ ...d, email: v }))} placeholder="name@email.com" type="email"/>
            <Field label="Note (optional)" value={draft.note} onChange={v => setDraft(d => ({ ...d, note: v }))} placeholder="Power of attorney, specific instructions…"/>
            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
              <button onClick={add} style={{ flex: 1, height: 42, borderRadius: 11, border: 'none', background: T.green, fontFamily: 'inherit', fontSize: 14, fontWeight: 700, color: '#fff', cursor: 'pointer' }}>Add person</button>
              <button onClick={() => { setAdding(false); setDraft(emptyPerson); }} style={{ flex: 1, height: 42, borderRadius: 11, border: `1.5px solid ${T.line}`, background: 'transparent', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, color: T.ink2, cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        ) : (
          <button onClick={() => setAdding(true)} style={{
            width: '100%', height: 50, borderRadius: 14, cursor: 'pointer', fontFamily: 'inherit',
            fontSize: 14, fontWeight: 700, color: T.green,
            background: T.greenSoft, border: `1.5px dashed ${T.green}55`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            <Icon.Plus s={16} c={T.green}/> Add trusted person
          </button>
        )}
      </div>
    </Screen>
  );
}

// ── Router ────────────────────────────────────────────────────────────

function ProfileSectionScreen({ sectionId, back, child }) {
  switch (sectionId) {
    case 'medical':   return <ProfileMedicalScreen back={back} child={child}/>;
    case 'therapies': return <ProfileTherapiesScreen back={back} child={child}/>;
    case 'education': return <ProfileEducationScreen back={back} child={child}/>;
    case 'legal':     return <ProfileLegalScreen back={back} child={child}/>;
    case 'routine':   return <ProfileRoutineScreen back={back} child={child}/>;
    case 'documents': return <ProfileDocumentsScreen back={back} child={child}/>;
    case 'trusted':   return <ProfileTrustedScreen back={back} child={child}/>;
    default:          return null;
  }
}

Object.assign(window, { ProfileSectionScreen });
