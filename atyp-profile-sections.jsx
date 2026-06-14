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

// ── Medical ────────────────────────────────────────────────────────────

function ProfileMedicalScreen({ back }) {
  const [doctors, setDoctors] = React.useState([
    { id: 'd1', title: 'Dr. Sarah Chen', sub: 'Developmental Pediatrician · Next: Jun 12', badge: 'Primary' },
    { id: 'd2', title: 'Dr. Mark Wilson', sub: 'Neurologist · Next: Aug 3' },
  ]);
  const [meds, setMeds] = React.useState([
    { id: 'm1', title: 'Melatonin 2.5 mg', sub: 'Nightly · 30 min before bed' },
    { id: 'm2', title: 'Omega-3 (Nordic Naturals)', sub: '1 capsule daily · with breakfast' },
    { id: 'm3', title: 'Magnesium Glycinate 100 mg', sub: 'Nightly · supports sleep' },
  ]);
  const [allergies, setAllergies] = React.useState([
    { id: 'a1', title: 'Casein (dairy)', sub: 'GI distress, behavioral changes' },
    { id: 'a2', title: 'Red dye #40', sub: 'Hyperactivity spike' },
  ]);
  const del = (setter) => (id) => setter(s => s.filter(i => i.id !== id));

  return (
    <Screen bg={T.bg}>
      <ScreenHeader title="Medical" onBack={back} sticky={false}/>
      <div style={{ padding: '0 18px 32px' }}>
        <InfoGroup label="Doctors">
          {doctors.map(d => <InfoRow key={d.id} I={Icon.Hospital} tint="#C25450" bg="#F5E1E0" title={d.title} sub={d.sub} badge={d.badge} onDelete={() => del(setDoctors)(d.id)}/>)}
          <AddDashedBtn label="Add doctor" onClick={() => {}}/>
        </InfoGroup>
        <InfoGroup label="Medications">
          {meds.map(m => <InfoRow key={m.id} I={Icon.Bulb} tint="#9C5E3A" bg="#F2E4D8" title={m.title} sub={m.sub} onDelete={() => del(setMeds)(m.id)}/>)}
          <AddDashedBtn label="Add medication" onClick={() => {}}/>
        </InfoGroup>
        <InfoGroup label="Allergies & Sensitivities">
          {allergies.map(a => <InfoRow key={a.id} I={Icon.Bell} tint="#C25450" bg="#FEE2E2" title={a.title} sub={a.sub} onDelete={() => del(setAllergies)(a.id)}/>)}
          <AddDashedBtn label="Add allergy" onClick={() => {}}/>
        </InfoGroup>
      </div>
    </Screen>
  );
}

// ── Therapies ─────────────────────────────────────────────────────────

function ProfileTherapiesScreen({ back }) {
  const [therapies, setTherapies] = React.useState([
    { id: 't1', title: 'ABA Therapy', detail: 'Jennifer L., BCBA', schedule: 'Mon–Fri 3–7 PM · 24h/week', I: Icon.Brain, tint: T.blue, bg: '#E4EEF6' },
    { id: 't2', title: 'Speech Therapy', detail: 'Tom R., SLP', schedule: 'Tue & Thu 4–5 PM · 2×/week', I: Icon.Pen, tint: T.green, bg: T.greenSoft },
    { id: 't3', title: 'Occupational Therapy', detail: 'Amy K., OTR/L', schedule: 'Wed 3–4 PM · 1×/week', I: Icon.Hand, tint: '#8B5BAE', bg: '#EDE3F4' },
  ]);

  return (
    <Screen bg={T.bg}>
      <ScreenHeader title="Therapies" onBack={back} sticky={false}
        right={<button style={{ height: 32, padding: '0 12px', borderRadius: 999, background: T.greenSoft, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, color: T.green, display: 'flex', alignItems: 'center', gap: 5 }}><Icon.Plus s={13} c={T.green}/> Add</button>}
      />
      <div style={{ padding: '0 18px 32px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {therapies.map(t => (
          <div key={t.id} style={{ background: '#fff', borderRadius: 18, padding: '14px 16px', boxShadow: `inset 0 0 0 1px ${T.line}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: t.bg, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <t.I s={20} c={t.tint}/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15.5, fontWeight: 700, color: T.ink, letterSpacing: '-0.01em' }}>{t.title}</div>
                <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>{t.detail}</div>
              </div>
              <span style={{ fontSize: 10.5, fontWeight: 700, color: t.tint, background: t.bg, padding: '3px 9px', borderRadius: 999 }}>Active</span>
            </div>
            <div style={{ background: T.bgAlt, borderRadius: 10, padding: '8px 12px', fontSize: 13, color: T.ink2, fontWeight: 600 }}>
              {t.schedule}
            </div>
          </div>
        ))}
        <AddDashedBtn label="Add therapy" onClick={() => {}}/>
      </div>
    </Screen>
  );
}

// ── Education & IEP ───────────────────────────────────────────────────

function ProfileEducationScreen({ back }) {
  const accommodations = ['Extended time (1.5×)', 'Quiet testing room', 'Sensory breaks every 90 min', 'Preferential seating near teacher', 'Fidget tools allowed'];
  const goals = [
    { title: 'Reading comprehension', progress: 65, label: 'On track' },
    { title: 'Peer social interaction', progress: 38, label: 'Developing' },
    { title: 'Written expression', progress: 55, label: 'On track' },
  ];

  return (
    <Screen bg={T.bg}>
      <ScreenHeader title="Education & IEP" onBack={back} sticky={false}/>
      <div style={{ padding: '0 18px 32px' }}>
        <InfoGroup label="School">
          <InfoRow I={Icon.School} title="Lincoln Middle School" sub="Grade 5 · Homeroom: Mrs. Johnson"/>
        </InfoGroup>

        <InfoGroup label="IEP Status">
          <div style={{ background: '#fff', borderRadius: 14, padding: '14px', boxShadow: `inset 0 0 0 1px ${T.line}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: T.ink }}>IEP 2026</div>
                <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>Renewed March 2026 · Valid 1 year</div>
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: T.green, background: T.greenSoft, padding: '3px 9px', borderRadius: 999 }}>Active</span>
            </div>
            <div style={{ background: '#FFF9E6', borderRadius: 10, padding: '8px 12px' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#9C7A1A' }}>Next review: March 2027</div>
            </div>
          </div>
        </InfoGroup>

        <InfoGroup label="Accommodations">
          {accommodations.map((a, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 12, padding: '10px 14px', boxShadow: `inset 0 0 0 1px ${T.line}`, display: 'flex', alignItems: 'center', gap: 10 }}>
              <Icon.Check s={14} c={T.green} sw={2.5}/>
              <span style={{ fontSize: 13.5, fontWeight: 600, color: T.ink }}>{a}</span>
            </div>
          ))}
        </InfoGroup>

        <InfoGroup label="Active Goals">
          {goals.map((g, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '12px 14px', boxShadow: `inset 0 0 0 1px ${T.line}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                <span style={{ fontSize: 13.5, fontWeight: 700, color: T.ink }}>{g.title}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: g.progress >= 50 ? T.green : T.yellow }}>{g.label}</span>
              </div>
              <div style={{ height: 4, background: T.line, borderRadius: 999 }}>
                <div style={{ width: `${g.progress}%`, height: '100%', background: g.progress >= 50 ? T.green : T.yellow, borderRadius: 999 }}/>
              </div>
            </div>
          ))}
        </InfoGroup>
      </div>
    </Screen>
  );
}

// ── Legal & Financial ─────────────────────────────────────────────────

function ProfileLegalScreen({ back }) {
  const items = [
    { I: Icon.Scale,     title: 'Guardianship',        sub: 'Not yet applicable · Emma is 10',    badge: 'Age 18+',    tint: T.muted,   bg: T.bgAlt },
    { I: Icon.Folder,    title: 'ABLE Account',         sub: 'Opened 2023 · Tax-advantaged savings', badge: 'Active',  tint: T.green,   bg: T.greenSoft },
    { I: Icon.Bookmark,  title: 'Special Needs Trust',  sub: 'In progress · Attorney: pending',    badge: 'Pending',   tint: '#9C7A1A', bg: '#FFF9E6' },
    { I: Icon.Clipboard, title: 'SSI Benefits',         sub: 'Review due Aug 2026',                badge: 'Review',    tint: T.blue,    bg: '#E4EEF6' },
  ];

  return (
    <Screen bg={T.bg}>
      <ScreenHeader title="Legal & Financial" onBack={back} sticky={false}/>
      <div style={{ padding: '0 18px 32px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map((it, i) => <InfoRow key={i} I={it.I} tint={it.tint} bg={it.bg} title={it.title} sub={it.sub} badge={it.badge}/>)}
        <AddDashedBtn label="Add item" onClick={() => {}}/>
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
