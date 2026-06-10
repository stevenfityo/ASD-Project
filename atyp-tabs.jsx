// aTyp — Profile, Events, Marketplace, Community tab screens.

// ── Profile ───────────────────────────────────────────────────────────

function ProfileScreen({ onTab, back, child, openSection }) {
  const sections = [
  { key: 'routine',   I: Icon.Clipboard, label: 'Daily Routine',    sub: 'Meds, meals, therapy, sleep',      count: '7 daily tasks' },
  { key: 'medical',   I: Icon.Hospital,  label: 'Medical',          sub: 'Doctors, medications, allergies',  count: '4 entries' },
  { key: 'therapies', I: Icon.Brain,     label: 'Therapies',        sub: 'ABA, speech, occupational',        count: '2 active' },
  { key: 'education', I: Icon.School,    label: 'Education & IEP',  sub: 'School, accommodations, goals',    count: 'IEP renewed Mar 2026' },
  { key: 'legal',     I: Icon.Scale,     label: 'Legal & Financial', sub: 'Guardianship, ABLE, trusts',       count: 'Add details' },
  { key: 'documents', I: Icon.Folder,    label: 'Documents Vault',  sub: 'Reports, evaluations, records',    count: '6 files' }];

  return (
    <Screen bg={T.bg} bottomTab={<TabBar active="home" onTab={onTab} />}>
      <ScreenHeader title="Child profile" onBack={back} sticky={false} right={
        <button style={{
          display: 'flex', alignItems: 'center', gap: 5,
          height: 34, padding: '0 12px', borderRadius: 999,
          background: T.greenSoft, border: 'none', cursor: 'pointer',
          fontFamily: 'inherit', fontSize: 12.5, fontWeight: 700, color: T.green,
        }}>
          <Icon.Plus s={15} c={T.green}/> Add child
        </button>
      }/>
      {/* Hero */}
      <div style={{
        margin: '0 18px 14px',
        background: `linear-gradient(160deg, ${T.green} 0%, ${T.greenDeep} 100%)`,
        borderRadius: 22, padding: '20px 20px 18px',
        color: '#fff', position: 'relative', overflow: 'hidden'
      }}>
        {/* decorative circles */}
        <div style={{ position: 'absolute', right: -28, top: -28, width: 140, height: 140, borderRadius: 999, background: 'rgba(255,255,255,0.06)' }} />
        <div style={{ position: 'absolute', right: 30, bottom: -50, width: 90, height: 90, borderRadius: 999, background: 'rgba(255,255,255,0.06)' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, position: 'relative' }}>
          <Avatar initials={child.initials} size={64} color="#fff" />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>{child.name}</div>
            <div style={{ fontSize: 13, opacity: 0.85, marginTop: 2, display: 'flex', alignItems: 'center', gap: 5 }}>
              <Icon.Calendar s={13} c="#fff" sw={1.6}/>
              {child.dob} ({child.age} years old)
            </div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'rgba(255,255,255,0.18)',
              padding: '3px 9px', borderRadius: 999,
              fontSize: 11, fontWeight: 700, letterSpacing: '0.04em',
              marginTop: 8
            }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: T.mint }} />
              {child.diagnosis.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Profile completion */}
        <div style={{ marginTop: 18, position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 600, opacity: 0.9 }}>Profile 60% complete</span>
            <span style={{ fontSize: 12, fontWeight: 700 }}>Add medical info</span>
          </div>
          <div style={{ height: 6, background: 'rgba(255,255,255,0.18)', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{ width: '60%', height: '100%', background: T.mint }} />
          </div>
        </div>
      </div>

      {/* Section list */}
      <div style={{ padding: '4px 18px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {sections.map((s, i) =>
        <button key={i} onClick={() => openSection && openSection(s.key)} style={{
          background: '#fff', borderRadius: 16, padding: '14px 16px',
          boxShadow: `inset 0 0 0 1px ${T.line}`,
          display: 'flex', alignItems: 'center', gap: 14,
          border: 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
          width: '100%'
        }}>
            <div style={{
            width: 44, height: 44, borderRadius: 12, background: T.greenSoft,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
          }}>
              <s.I s={22} c={T.green} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: T.ink, letterSpacing: '-0.01em' }}>{s.label}</div>
              <div style={{ fontSize: 12.5, color: T.muted, marginTop: 2 }}>{s.sub}</div>
            </div>
            <div style={{ fontSize: 12, color: T.muted, fontWeight: 600, marginRight: 6, whiteSpace: 'nowrap' }}>{s.count}</div>
            <Icon.ChevronRight s={16} c={T.muted} />
          </button>
        )}
      </div>


    </Screen>);

}

// ── Events ────────────────────────────────────────────────────────────

function EventsScreen({ onTab }) {
  // May 2026 starts on Friday (May 1, 2026 was a Friday)
  const monthLabel = 'May 2026';
  const daysInMonth = 31;
  const startDow = 5; // Fri = 5 (Sun=0)
  const today = 8;

  const dots = {
    5: ['blue'], 8: ['yellow'], 14: ['blue', 'yellow'],
    18: ['green'], 21: ['blue'], 25: ['blue'], 27: ['green']
  };
  const dotColor = { blue: T.blue, green: T.green, yellow: T.yellow };

  const cells = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const [showAdd, setShowAdd] = React.useState(false);
  const [form, setForm] = React.useState({ title: '', date: '', time: '', location: '', kind: 'Personal' });
  const kinds = ['Personal', 'Public event', 'Milestone'];
  const kindColor = { Personal: T.blue, 'Public event': T.green, Milestone: T.yellow };

  const [extraEvents, setExtraEvents] = React.useState([]);

  const handleAdd = () => {
    if (!form.title.trim()) return;
    const month = form.date ? form.date.split('-')[1] : '';
    const day = form.date ? String(parseInt(form.date.split('-')[2])) : '?';
    const months = ['', 'JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
    const mLabel = month ? months[parseInt(month)] : 'MAY';
    setExtraEvents(e => [...e, {
      id: Date.now(), color: kindColor[form.kind] || T.blue,
      date: { d: day, m: mLabel },
      title: form.title, meta: [form.location, form.time].filter(Boolean).join(' · '),
      kind: form.kind
    }]);
    setForm({ title: '', date: '', time: '', location: '', kind: 'Personal' });
    setShowAdd(false);
  };

  const inputStyle = { width: '100%', boxSizing: 'border-box', height: 44, borderRadius: 12, border: `1.5px solid ${T.line}`, padding: '0 14px', fontFamily: 'inherit', fontSize: 14.5, color: T.ink, outline: 'none', background: T.bg };
  const labelStyle = { fontSize: 11.5, fontWeight: 700, color: T.muted, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' };

  return (
    <Screen bg={T.bg} bottomTab={<TabBar active="events" onTab={onTab} />}>
      <div style={{ padding: '0 18px 14px' }}>
        <ScreenHeader title="Events" sticky={false} />

        {/* Month switcher */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginTop: -4, marginBottom: 14
        }}>
          <button style={{
            width: 36, height: 36, borderRadius: 999, border: 'none',
            background: '#fff', color: T.ink, cursor: 'pointer',
            boxShadow: `inset 0 0 0 1px ${T.line}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Icon.Back s={18} />
          </button>
          <div style={{ fontSize: 18, fontWeight: 700, color: T.ink, letterSpacing: '-0.01em' }}>{monthLabel}</div>
          <button style={{
            width: 36, height: 36, borderRadius: 999, border: 'none',
            background: '#fff', color: T.ink, cursor: 'pointer',
            boxShadow: `inset 0 0 0 1px ${T.line}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'scaleX(-1)'
          }}>
            <Icon.Back s={18} />
          </button>
        </div>

        {/* Calendar */}
        <div style={{
          background: '#fff', borderRadius: 18, padding: '14px 12px',
          boxShadow: `inset 0 0 0 1px ${T.line}`
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0, marginBottom: 4 }}>
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) =>
            <div key={i} style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, color: T.muted, padding: '4px 0' }}>{d}</div>
            )}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0 }}>
            {cells.map((d, i) =>
            <div key={i} style={{
              height: 44, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              position: 'relative'
            }}>
                {d &&
              <>
                    <div style={{
                  width: 30, height: 30, borderRadius: 999,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, fontWeight: d === today ? 700 : 500,
                  color: d === today ? '#fff' : T.ink,
                  background: d === today ? T.green : 'transparent'
                }}>{d}</div>
                    {dots[d] &&
                <div style={{ position: 'absolute', bottom: 4, display: 'flex', gap: 3 }}>
                        {dots[d].map((c, j) =>
                  <div key={j} style={{ width: 4, height: 4, borderRadius: 999, background: dotColor[c] }} />
                  )}
                      </div>
                }
                  </>
              }
              </div>
            )}
          </div>
          {/* Legend */}
          <div style={{ display: 'flex', gap: 14, padding: '10px 6px 2px', flexWrap: 'wrap' }}>
            {[['blue', 'Personal'], ['green', 'Public event'], ['yellow', 'Milestone']].map(([c, l]) =>
            <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: 999, background: dotColor[c] }} />
                <span style={{ fontSize: 11, color: T.muted, fontWeight: 600 }}>{l}</span>
              </div>
            )}
          </div>
        </div>

        {/* Upcoming */}
        <div style={{ marginTop: 22 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: T.ink2, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
            Upcoming
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <EventCard color={T.blue} date={{ d: '14', m: 'MAY' }} title="IEP Annual Review" meta="Franklin Elementary · 9:30 AM" kind="Personal appointment" />
            <EventCard color={T.green} date={{ d: '18', m: 'MAY' }} title="Autism Family Conference NJ" meta="Newark, NJ · All day" kind="Public event" cta="Register" />
            <EventCard color={T.yellow} date={{ d: '🎂', m: '8 mo' }} title="Emma turns 11 in 8 months" meta="See what's ahead — Ages 9–13 wrap-up" kind="Milestone reminder" />
            {extraEvents.map(ev => <EventCard key={ev.id} color={ev.color} date={ev.date} title={ev.title} meta={ev.meta} kind={ev.kind} />)}
          </div>
        </div>
      </div>

      {/* FAB */}
      <button onClick={() => setShowAdd(true)} style={{
        position: 'absolute', right: 18, bottom: 110,
        width: 56, height: 56, borderRadius: 999, border: 'none',
        background: T.green, color: '#fff', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 12px 24px rgba(45,106,79,0.32), 0 2px 6px rgba(45,106,79,0.18)',
        zIndex: 25
      }}>
        <Icon.Plus s={26} c="#fff" />
      </button>

      {/* Add Event sheet */}
      {showAdd && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 50, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <div onClick={() => setShowAdd(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(27,36,33,0.45)' }}/>
          <div style={{ position: 'relative', background: '#fff', borderRadius: '22px 22px 0 0', padding: '0 18px 40px', maxHeight: '85%', overflowY: 'auto', animation: 'atypSheetUp .28s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 12, paddingBottom: 4 }}>
              <div style={{ width: 36, height: 4, borderRadius: 999, background: T.line }}/>
            </div>
            <div style={{ fontSize: 19, fontWeight: 700, color: T.ink, letterSpacing: '-0.02em', marginTop: 8, marginBottom: 20 }}>Add event</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <div style={labelStyle}>Title *</div>
                <input autoFocus value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  placeholder="e.g. Speech therapy session"
                  style={inputStyle}
                  onFocus={e => e.currentTarget.style.borderColor = T.green}
                  onBlur={e => e.currentTarget.style.borderColor = T.line}/>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <div style={labelStyle}>Date</div>
                  <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                    style={inputStyle}
                    onFocus={e => e.currentTarget.style.borderColor = T.green}
                    onBlur={e => e.currentTarget.style.borderColor = T.line}/>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={labelStyle}>Time</div>
                  <input type="time" value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
                    style={inputStyle}
                    onFocus={e => e.currentTarget.style.borderColor = T.green}
                    onBlur={e => e.currentTarget.style.borderColor = T.line}/>
                </div>
              </div>
              <div>
                <div style={labelStyle}>Location</div>
                <input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                  placeholder="Address or place name"
                  style={inputStyle}
                  onFocus={e => e.currentTarget.style.borderColor = T.green}
                  onBlur={e => e.currentTarget.style.borderColor = T.line}/>
              </div>
              <div>
                <div style={labelStyle}>Type</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {kinds.map(k => (
                    <button key={k} onClick={() => setForm(f => ({ ...f, kind: k }))} style={{
                      flex: 1, height: 38, borderRadius: 999, border: 'none', cursor: 'pointer',
                      fontFamily: 'inherit', fontSize: 12.5, fontWeight: 700,
                      background: form.kind === k ? kindColor[k] : T.greenSoft,
                      color: form.kind === k ? '#fff' : T.ink2,
                      transition: 'background .12s'
                    }}>{k}</button>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
                <button onClick={handleAdd} style={{
                  height: 52, borderRadius: 14, border: 'none', background: T.green,
                  fontFamily: 'inherit', fontSize: 16, fontWeight: 700, color: '#fff', cursor: 'pointer',
                  opacity: form.title.trim() ? 1 : 0.5
                }}>Add event</button>
                <button onClick={() => setShowAdd(false)} style={{
                  height: 52, borderRadius: 14, border: `1.5px solid ${T.line}`,
                  background: 'transparent', fontFamily: 'inherit', fontSize: 16, fontWeight: 700,
                  color: T.ink2, cursor: 'pointer'
                }}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Screen>);

}

function EventCard({ color, date, title, meta, kind, cta }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 16, padding: '14px 14px 14px 12px',
      boxShadow: `inset 0 0 0 1px ${T.line}`,
      display: 'flex', alignItems: 'center', gap: 12
    }}>
      <div style={{
        width: 54, height: 54, borderRadius: 12,
        background: `${color}1A`, color, flexShrink: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
      }}>
        <div style={{ fontSize: 18, fontWeight: 800, lineHeight: 1, letterSpacing: '-0.02em' }}>{date.d}</div>
        <div style={{ fontSize: 10, fontWeight: 700, marginTop: 2, letterSpacing: '0.06em' }}>{date.m}</div>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 2 }}>{kind}</div>
        <div style={{ fontSize: 15, fontWeight: 700, color: T.ink, letterSpacing: '-0.01em', lineHeight: 1.25 }}>{title}</div>
        <div style={{ fontSize: 12.5, color: T.muted, marginTop: 3 }}>{meta}</div>
      </div>
      {cta &&
      <button style={{
        padding: '8px 14px', borderRadius: 999, border: 'none',
        background: color, color: '#fff', fontFamily: 'inherit',
        fontSize: 13, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap'
      }}>{cta}</button>
      }
    </div>);

}

function MarketplaceScreen({ onTab, openListing }) {
  const [filter, setFilter] = React.useState('All');
  const filters = ['All', 'Therapy', 'Medical', 'School', 'Legal'];
  const [saved, setSaved] = React.useState(new Set());
  const toggleSave = (e, id) => { e.stopPropagation(); setSaved(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; }); };

  const all = window.MARKETPLACE_LISTINGS || [];
  const listings = filter === 'All' ? all : all.filter(l => l.cat === filter);
  const iconMap = { Brain: Icon.Brain, Hospital: Icon.Hospital, School: Icon.School, Pen: Icon.Pen, Hand: Icon.Hand, Scale: Icon.Scale };

  const [showSuggest, setShowSuggest] = React.useState(false);
  const [suggestForm, setSuggestForm] = React.useState({ name: '', cat: 'Therapy', location: '', website: '', notes: '' });
  const [submitted, setSubmitted] = React.useState(false);
  const cats = ['Therapy', 'Medical', 'School', 'Legal'];

  const handleSubmit = () => {
    if (!suggestForm.name.trim()) return;
    setSubmitted(true);
    setTimeout(() => { setShowSuggest(false); setSubmitted(false); setSuggestForm({ name: '', cat: 'Therapy', location: '', website: '', notes: '' }); }, 2000);
  };

  const inputStyle = { width: '100%', boxSizing: 'border-box', height: 44, borderRadius: 12, border: `1.5px solid ${T.line}`, padding: '0 14px', fontFamily: 'inherit', fontSize: 14.5, color: T.ink, outline: 'none', background: T.bg };

  return (
    <Screen bg={T.bg} bottomTab={<TabBar active="market" onTab={onTab}/>}>
      <div style={{ padding: '0 18px' }}>
        <ScreenHeader title="Marketplace" sticky={false}/>

        {/* Search */}
        <div style={{ marginTop: -4, background: '#fff', borderRadius: 14, boxShadow: `inset 0 0 0 1px ${T.line}`, height: 48, padding: '0 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Icon.Search s={20} c={T.muted}/>
          <input placeholder="Search specialists, services…" style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: 'inherit', fontSize: 15, color: T.ink }}/>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: T.greenSoft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon.Slider s={16} c={T.green}/>
          </div>
        </div>

        {/* Filters */}
        <div style={{ marginTop: 14, marginInline: -18, paddingInline: 18, overflowX: 'auto', whiteSpace: 'nowrap' }}>
          <div style={{ display: 'inline-flex', gap: 8 }}>
            {filters.map(f => <Chip key={f} active={filter === f} onClick={() => setFilter(f)}>{f}</Chip>)}
            <div style={{ width: 8, flexShrink: 0 }}/>
          </div>
        </div>

        {/* Count */}
        <div style={{ marginTop: 16, fontSize: 12, color: T.muted, fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
          <span>{listings.length} results within 15 miles</span>
          <span style={{ color: T.green }}>Sort: Closest ▾</span>
        </div>

        {/* Listings */}
        <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: 100 }}>
          {listings.map(l => {
            const LI = iconMap[l.icon] || Icon.Brain;
            return (
              <button key={l.id} onClick={() => openListing && openListing(l.id)} style={{ background: '#fff', borderRadius: 18, overflow: 'hidden', boxShadow: `inset 0 0 0 1px ${T.line}`, border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', padding: 0, fontFamily: 'inherit' }}>
                <div style={{ height: 90, background: `linear-gradient(135deg, ${l.bg}, ${l.tint}18)`, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 16, background: `linear-gradient(150deg, ${l.tint}, ${l.tint}BB)`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 6px 14px ${l.tint}44` }}>
                    <LI s={24} c="#fff"/>
                  </div>
                  {l.promoted && (
                    <div style={{ position: 'absolute', left: 12, top: 10, background: 'rgba(0,0,0,0.5)', color: '#fff', padding: '3px 8px', borderRadius: 6, fontSize: 10, fontWeight: 700, letterSpacing: '0.05em' }}>PROMOTED</div>
                  )}
                  <button onClick={e => toggleSave(e, l.id)} style={{ position: 'absolute', right: 10, bottom: 10, width: 32, height: 32, borderRadius: 999, border: 'none', background: 'rgba(255,255,255,0.9)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
                    <Icon.Bookmark s={16} c={saved.has(l.id) ? l.tint : T.ink2} filled={saved.has(l.id)}/>
                  </button>
                </div>
                <div style={{ padding: '12px 14px 14px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: l.tint, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 3 }}>{l.sub}</div>
                  <div style={{ fontSize: 15.5, fontWeight: 700, color: T.ink, letterSpacing: '-0.01em', lineHeight: 1.25 }}>{l.name}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 7, fontSize: 12.5, color: T.muted, flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontWeight: 700, color: T.ink2 }}>
                      <Icon.Star s={12}/> {l.rating}
                    </span>
                    <span>({l.reviews})</span>
                    <span>·</span>
                    <span>{l.loc}</span>
                    <span>·</span>
                    <span>{l.dist}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* FAB */}
      <button onClick={() => setShowSuggest(true)} style={{
        position: 'absolute', right: 18, bottom: 110,
        width: 56, height: 56, borderRadius: 999, border: 'none',
        background: T.green, color: '#fff', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 12px 24px rgba(45,106,79,0.32), 0 2px 6px rgba(45,106,79,0.18)',
        zIndex: 25
      }}>
        <Icon.Plus s={26} c="#fff"/>
      </button>

      {/* Suggest bottom sheet */}
      {showSuggest && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 50, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          {/* Backdrop */}
          <div onClick={() => setShowSuggest(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(27,36,33,0.45)' }}/>
          {/* Sheet */}
          <div style={{ position: 'relative', background: '#fff', borderRadius: '22px 22px 0 0', padding: '0 18px 40px', maxHeight: '85%', overflowY: 'auto', animation: 'atypSheetUp .28s ease' }}>
            {/* Handle */}
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 12, paddingBottom: 4 }}>
              <div style={{ width: 36, height: 4, borderRadius: 999, background: T.line }}/>
            </div>

            {submitted ? (
              <div style={{ padding: '40px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 64, height: 64, borderRadius: 999, background: T.greenSoft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon.Check s={32} c={T.green} sw={2.5}/>
                </div>
                <div style={{ fontSize: 18, fontWeight: 700, color: T.ink, letterSpacing: '-0.02em' }}>Thanks for the suggestion!</div>
                <div style={{ fontSize: 13.5, color: T.muted, textAlign: 'center', lineHeight: 1.5 }}>We'll review it and add it to the directory soon.</div>
              </div>
            ) : (
              <>
                <div style={{ fontSize: 19, fontWeight: 700, color: T.ink, letterSpacing: '-0.02em', marginTop: 8, marginBottom: 4 }}>Suggest a listing</div>
                <div style={{ fontSize: 13, color: T.muted, marginBottom: 20, lineHeight: 1.5 }}>Know a great specialist or service? Share it with the community.</div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div>
                    <div style={{ fontSize: 11.5, fontWeight: 700, color: T.muted, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Name *</div>
                    <input autoFocus value={suggestForm.name} onChange={e => setSuggestForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="e.g. Sunrise ABA Therapy"
                      style={inputStyle}
                      onFocus={e => e.currentTarget.style.borderColor = T.green}
                      onBlur={e => e.currentTarget.style.borderColor = T.line}/>
                  </div>

                  <div>
                    <div style={{ fontSize: 11.5, fontWeight: 700, color: T.muted, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Category</div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {cats.map(c => (
                        <button key={c} onClick={() => setSuggestForm(f => ({ ...f, cat: c }))} style={{
                          height: 36, padding: '0 16px', borderRadius: 999, border: 'none', cursor: 'pointer',
                          fontFamily: 'inherit', fontSize: 13, fontWeight: 700,
                          background: suggestForm.cat === c ? T.green : T.greenSoft,
                          color: suggestForm.cat === c ? '#fff' : T.green,
                          transition: 'background .12s'
                        }}>{c}</button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: 11.5, fontWeight: 700, color: T.muted, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Location</div>
                    <input value={suggestForm.location} onChange={e => setSuggestForm(f => ({ ...f, location: e.target.value }))}
                      placeholder="City, address or area"
                      style={inputStyle}
                      onFocus={e => e.currentTarget.style.borderColor = T.green}
                      onBlur={e => e.currentTarget.style.borderColor = T.line}/>
                  </div>

                  <div>
                    <div style={{ fontSize: 11.5, fontWeight: 700, color: T.muted, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Website or phone</div>
                    <input value={suggestForm.website} onChange={e => setSuggestForm(f => ({ ...f, website: e.target.value }))}
                      placeholder="www.example.com or +1 555…"
                      style={inputStyle}
                      onFocus={e => e.currentTarget.style.borderColor = T.green}
                      onBlur={e => e.currentTarget.style.borderColor = T.line}/>
                  </div>

                  <div>
                    <div style={{ fontSize: 11.5, fontWeight: 700, color: T.muted, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Notes</div>
                    <textarea value={suggestForm.notes} onChange={e => setSuggestForm(f => ({ ...f, notes: e.target.value }))}
                      placeholder="Why do you recommend this place?"
                      rows={3}
                      style={{ ...inputStyle, height: 'auto', padding: '12px 14px', resize: 'none', lineHeight: 1.5 }}
                      onFocus={e => e.currentTarget.style.borderColor = T.green}
                      onBlur={e => e.currentTarget.style.borderColor = T.line}/>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
                    <button onClick={handleSubmit} style={{
                      height: 52, borderRadius: 14, border: 'none', background: T.green,
                      fontFamily: 'inherit', fontSize: 16, fontWeight: 700, color: '#fff',
                      cursor: 'pointer',
                      opacity: suggestForm.name.trim() ? 1 : 0.5
                    }}>Submit suggestion</button>
                    <button onClick={() => setShowSuggest(false)} style={{
                      height: 52, borderRadius: 14, border: `1.5px solid ${T.line}`,
                      background: 'transparent', fontFamily: 'inherit', fontSize: 16, fontWeight: 700,
                      color: T.ink2, cursor: 'pointer'
                    }}>Cancel</button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </Screen>
  );
}

function shade(hex, amt) {
  // Hex to rgb, shift each channel
  let h = hex.replace('#', '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const num = parseInt(h, 16);
  const r = Math.max(0, Math.min(255, (num >> 16 & 0xff) + amt));
  const g = Math.max(0, Math.min(255, (num >> 8 & 0xff) + amt));
  const b = Math.max(0, Math.min(255, (num & 0xff) + amt));
  return `rgb(${r}, ${g}, ${b})`;
}

// ── Assistant ─────────────────────────────────────────────────────────
// ── Journey card — collapsible child context strip ─────────────────────
function JourneyCard({ child, onOpenMap, onSwitchChild }) {
  const [expanded, setExpanded] = React.useState(false);
  const stages = stagesForChild(child.id);
  const cur = stages.find(s => s.status === 'current');
  const completedStages = stages.filter(s => s.status === 'completed');
  const pct = cur ? Math.round((cur.done / cur.total) * 100) : 0;

  return (
    <div style={{
      background: '#fff', borderRadius: expanded ? 20 : 16,
      boxShadow: `inset 0 0 0 1px ${T.line}`,
      overflow: 'hidden', transition: 'border-radius .2s',
    }}>
      {/* ── Collapsed row (always visible) ── */}
      <button onClick={() => setExpanded(e => !e)} style={{
        width: '100%', padding: '11px 13px',
        background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        {/* Child avatar */}
        <div style={{
          width: 34, height: 34, borderRadius: 999, flexShrink: 0,
          background: `linear-gradient(140deg, ${child.color || T.green}, ${T.greenDeep})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: '0.02em',
          boxShadow: '0 2px 6px rgba(45,106,79,0.22)',
        }}>
          {child.initials}
        </div>

        {/* Name + stage */}
        <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <span style={{ fontSize: 14.5, fontWeight: 700, color: T.ink, letterSpacing: '-0.01em' }}>
              {child.name}
            </span>
            <span style={{
              fontSize: 10.5, fontWeight: 700, color: T.green,
              background: T.greenSoft, padding: '2px 7px', borderRadius: 999,
              letterSpacing: '0.02em',
            }}>
              {cur ? cur.label : '—'}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 3 }}>
            {/* Mini 5-dot strip */}
            {stages.map(s => (
              <div key={s.id} style={{
                width: s.status === 'current' ? 14 : 7,
                height: 5, borderRadius: 999,
                background: s.status === 'completed' ? T.green : s.status === 'current' ? T.green : T.line,
                opacity: s.status === 'upcoming' ? 0.45 : 1,
                transition: 'width .2s',
              }}/>
            ))}

          </div>
        </div>

        {/* Switch child button */}
        {onSwitchChild && (
          <button onClick={e => { e.stopPropagation(); onSwitchChild(); }} style={{
            height: 28, padding: '0 10px', borderRadius: 999, border: 'none',
            background: T.greenSoft, cursor: 'pointer', fontFamily: 'inherit',
            fontSize: 12, fontWeight: 700, color: T.green, flexShrink: 0,
            display: 'flex', alignItems: 'center', gap: 4
          }}>
            <Icon.Switch s={13} c={T.green}/> Switch
          </button>
        )}

        {/* Expand chevron */}
        <div style={{
          width: 26, height: 26, borderRadius: 999, background: T.bgAlt,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform .2s',
        }}>
          <Icon.ChevronDown s={14} c={T.ink2}/>
        </div>
      </button>

      {/* ── Expanded content ── */}
      {expanded && (
        <div style={{ padding: '0 13px 14px' }}>
          <div style={{ height: 1, background: T.line, marginBottom: 14 }}/>

          {/* Current stage progress bar */}
          {cur && (
            <div style={{
              background: T.greenSoft, borderRadius: 12, padding: '9px 12px',
              display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10,
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.green, marginBottom: 5 }}>
                  {cur.label} · {cur.done}/{cur.total} steps
                </div>
                <div style={{ height: 4, background: 'rgba(45,106,79,0.15)', borderRadius: 999 }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: T.green, borderRadius: 999 }}/>
                </div>
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: T.green, textAlign: 'right', lineHeight: 1.3 }}>
                <div>{cur.done} done</div>
                <div style={{ color: T.muted }}>{cur.total - cur.done} left</div>
              </div>
            </div>
          )}

          {/* View map button — full width, centered */}
          <button onClick={onOpenMap} style={{
            width: '100%', height: 44, borderRadius: 12, border: 'none',
            background: T.green, cursor: 'pointer', fontFamily: 'inherit',
            fontSize: 14, fontWeight: 700, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>
            <Icon.Map s={16} c="#fff"/> View full map
          </button>
        </div>
      )}
    </div>
  );
}

// ── Demo conversation chain ──────────────────────────────────────────

const DEMO_CHAIN = [
  {
    q: `How do I prepare for Emma's IEP meeting next week?`,
    a: `Great question — being prepared makes a real difference.\n\n**Before the meeting:**\n• Request Emma's progress reports from each teacher a week ahead\n• Note any behavior or sensory changes since her last IEP (March 2026)\n• Write down your top 3 goals you want addressed\n\n**Bring with you:**\n• A copy of her current IEP to annotate\n• Therapy notes from Jennifer (ABA) or Tom (speech)\n• A support person — you're allowed to bring an advocate\n\nYou have the right to request any evaluation and to disagree with the school in writing.`,
    next: `What accommodations should I push for at this age?`,
  },
  {
    q: `What accommodations should I push for at this age?`,
    a: `For Emma at Ages 9–13 with ASD Level 2, these have strong evidence:\n\n• **Extended time (1.5×)** on all tests and timed assignments\n• **Preferential seating** — front-center, away from doors and high-traffic areas\n• **Sensory breaks** every 90 min in a designated quiet space\n• **Chunked instructions** — tasks broken into 2–3 clear steps\n• **Advance notice** of schedule changes (at least 24 hours)\n• **Written weekly schedule** sent home every Friday\n\nHer current IEP already has the first two. I'd focus on getting sensory breaks formalized and the schedule notice added this cycle.`,
    next: `How do I explain Emma's sensory triggers to her teacher?`,
  },
  {
    q: `How do I explain Emma's sensory triggers to her teacher?`,
    a: `The most effective approach is a **one-page sensory profile** to hand the teacher in September.\n\nFor Emma it would cover:\n\n• **Triggers:** loud sudden noise, unexpected physical contact, flickering lights\n• **Early warning signs:** hand-flapping, verbal repetition, social withdrawal\n• **What helps:** dimmed lights, earplugs, 5-min break with preferred object\n\n**When you talk to the teacher:**\n• Frame it as "here's what works" — not a list of problems\n• Request a 15-min meeting before school starts\n• Share Emma's strengths too — her memory and depth of focus are real assets\n\nWould you like me to draft that one-page note for you?`,
    next: `What should Emma's crisis plan look like at school?`,
  },
  {
    q: `What should Emma's crisis plan look like at school?`,
    a: `A school crisis plan should be written into Emma's IEP as a **Behavior Intervention Plan (BIP)** — you can request this formally at any time.\n\n**Prevention:**\n• All staff trained on Emma's early warning signs\n• Known triggers avoided where possible\n\n**During a meltdown:**\n• Move her to a quiet space immediately\n• No crowd, no raised voices, minimal physical contact\n• Offer weighted blanket or familiar object\n• Reduce all demands — calm presence only\n\n**After:**\n• Document the trigger and notify you same day\n• Review the plan if meltdowns increase in frequency\n\nThis gives the school a clear playbook and protects Emma's rights under IDEA.`,
    next: null,
  },
];

function AIMd({ text }) {
  return (
    <div>
      {text.split('\n').map((line, i) => {
        const bullet = line.startsWith('• ');
        const content = bullet ? line.slice(2) : line;
        if (content === '') return <div key={i} style={{ height: 5 }}/>;
        const parts = content.split(/\*\*(.*?)\*\*/g);
        return (
          <div key={i} style={{ display: 'flex', gap: bullet ? 5 : 0, lineHeight: 1.5 }}>
            {bullet && <span style={{ color: T.green, flexShrink: 0 }}>•</span>}
            <span>{parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p)}</span>
          </div>
        );
      })}
    </div>
  );
}

function AssistantScreen({ onTab, child, openMap }) {
  const allChildren = window.CHILDREN || [];
  const [activeChild, setActiveChild] = React.useState(child);
  const [showSwitcher, setShowSwitcher] = React.useState(false);
  const [draft, setDraft] = React.useState('');
  const [messages, setMessages] = React.useState([]);
  const [typing, setTyping] = React.useState(false);
  const inputRef = React.useRef(null);
  const listEndRef = React.useRef(null);
  const hasMessages = messages.length > 0;

  // Inject typing animation once
  React.useEffect(() => {
    if (document.getElementById('atyp-typing-css')) return;
    const s = document.createElement('style');
    s.id = 'atyp-typing-css';
    s.textContent = '@keyframes atypDot{0%,60%,100%{opacity:.25;transform:translateY(0)}30%{opacity:1;transform:translateY(-3px)}}';
    document.head.appendChild(s);
  }, []);

  // Scroll to bottom on new messages
  React.useEffect(() => {
    if (!listEndRef.current) return;
    let el = listEndRef.current.parentElement;
    while (el) {
      const ov = window.getComputedStyle(el).overflowY;
      if (ov === 'auto' || ov === 'scroll') { el.scrollTop = el.scrollHeight; return; }
      el = el.parentElement;
    }
  }, [messages, typing]);

  const handleFocus = () => {
    if (!draft && !hasMessages) setDraft(DEMO_CHAIN[0].q);
  };

  const sendMessage = (q) => {
    if (!q.trim() || typing) return;
    setDraft('');
    setMessages(p => [...p, { role: 'user', content: q }]);
    setTyping(true);
    const match = DEMO_CHAIN.find(c => c.q === q) || DEMO_CHAIN[0];
    setTimeout(() => {
      setTyping(false);
      setMessages(p => [...p, { role: 'ai', content: match.a, next: match.next }]);
    }, 1300);
  };

  const send = () => sendMessage(draft);

  const quickChips = ['Prepare for the IEP meeting', 'Signs of sensory overload', 'Draft an email to the teacher', 'Explain Medicaid waivers'];

  return (
    <Screen bg={T.bg} bottomTab={<TabBar active="assistant" onTab={onTab}/>}>
      {/* Header */}
      <div style={{ padding: '2px 18px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 12, color: T.muted, fontWeight: 600, letterSpacing: '0.01em' }}>
            {(() => { const h = new Date().getHours(); return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'; })()},
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: T.ink, letterSpacing: '-0.025em', lineHeight: 1.15, marginTop: 1 }}>Assistant</div>
        </div>
        <button style={{ display: 'flex', alignItems: 'center', gap: 6, height: 36, padding: '0 14px', borderRadius: 999, background: '#fff', border: 'none', cursor: 'pointer', boxShadow: `inset 0 0 0 1px ${T.line}`, fontFamily: 'inherit', fontSize: 13, fontWeight: 700, color: T.ink2 }}>
          <Icon.Bookmark s={14} c={T.ink2}/> History
        </button>
      </div>

      {/* Journey card */}
      <div style={{ padding: '0 14px', marginBottom: 14, position: 'relative' }}>
        <JourneyCard child={activeChild} onOpenMap={openMap} onSwitchChild={() => setShowSwitcher(s => !s)}/>

        {/* Child picker dropdown */}
        {showSwitcher && (
          <div style={{ position: 'absolute', top: '100%', left: 14, right: 14, zIndex: 40, background: '#fff', borderRadius: 16, boxShadow: '0 8px 24px rgba(27,36,33,0.14)', overflow: 'hidden', marginTop: 6, border: `1px solid ${T.line}` }}>
            {allChildren.map(c => (
              <button key={c.id} onClick={() => { setActiveChild(c); setShowSwitcher(false); }} style={{
                width: '100%', padding: '12px 14px', background: c.id === activeChild.id ? T.greenSoft : 'transparent',
                border: 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                display: 'flex', alignItems: 'center', gap: 12,
                borderBottom: `1px solid ${T.line}`
              }}>
                <div style={{ width: 36, height: 36, borderRadius: 999, background: `linear-gradient(140deg, ${c.color || T.green}, ${T.greenDeep})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                  {c.initials}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14.5, fontWeight: 700, color: T.ink }}>{c.name}</div>
                  <div style={{ fontSize: 12, color: T.muted, marginTop: 1 }}>{c.age} y.o. · {c.currentStageLabel}</div>
                </div>
                {c.id === activeChild.id && <Icon.Check s={16} c={T.green} sw={2.5}/>}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Chat messages */}
      {hasMessages && (
        <div style={{ padding: '0 14px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {messages.map((m, i) => m.role === 'user' ? (
            <div key={i} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{ maxWidth: '80%', background: T.green, color: '#fff', borderRadius: '18px 18px 4px 18px', padding: '10px 14px', fontSize: 14, lineHeight: 1.45 }}>{m.content}</div>
            </div>
          ) : (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <div style={{ width: 28, height: 28, borderRadius: 999, flexShrink: 0, background: `linear-gradient(150deg, ${T.green}, ${T.greenDeep})`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
                  <Icon.Sparkle s={13} c="#fff"/>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ background: '#fff', borderRadius: '4px 18px 18px 18px', padding: '12px 14px', boxShadow: `inset 0 0 0 1px ${T.line}`, fontSize: 13.5, color: T.ink2, lineHeight: 1.5 }}>
                    <AIMd text={m.content}/>
                  </div>
                </div>
              </div>
              {m.next && (
                <button onClick={() => sendMessage(m.next)} style={{ marginLeft: 36, background: T.greenSoft, borderRadius: 14, border: `1.5px solid rgba(45,106,79,0.18)`, cursor: 'pointer', fontFamily: 'inherit', padding: '11px 14px', fontSize: 13.5, fontWeight: 700, color: T.green, display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left', width: 'calc(100% - 36px)', boxSizing: 'border-box' }}>
                  <Icon.Sparkle s={20} c={T.green} sw={1.6}/>
                  <span style={{ flex: 1 }}>{m.next}</span>
                </button>
              )}
            </div>
          ))}

          {typing && (
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <div style={{ width: 28, height: 28, borderRadius: 999, flexShrink: 0, background: `linear-gradient(150deg, ${T.green}, ${T.greenDeep})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon.Sparkle s={13} c="#fff"/>
              </div>
              <div style={{ background: '#fff', borderRadius: '4px 18px 18px 18px', padding: '12px 16px', boxShadow: `inset 0 0 0 1px ${T.line}`, display: 'flex', gap: 5, alignItems: 'center' }}>
                {[0,1,2].map(j => <div key={j} style={{ width: 7, height: 7, borderRadius: 999, background: T.muted, animation: `atypDot .9s ${j*0.18}s infinite ease-in-out` }}/>)}
              </div>
            </div>
          )}
          <div ref={listEndRef} style={{ height: 80 }}/>
        </div>
      )}

      {/* Sticky bottom: chips + composer + disclaimer */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 86, zIndex: 25, padding: '8px 14px 6px', background: hasMessages ? 'rgba(248,246,241,0.97)' : 'linear-gradient(0deg,rgba(248,246,241,1) 55%,rgba(248,246,241,0))', backdropFilter: hasMessages ? 'blur(10px)' : 'none', WebkitBackdropFilter: hasMessages ? 'blur(10px)' : 'none' }}>
        {!hasMessages && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 10, justifyContent: 'flex-end' }}>
            {quickChips.map(q => (
              <button key={q} onClick={() => { setDraft(q); setTimeout(() => inputRef.current?.focus(), 50); }} style={{ height: 32, padding: '0 12px', borderRadius: 999, border: `1px solid ${T.line}`, background: '#fff', color: T.ink2, fontWeight: 600, fontSize: 12, fontFamily: 'inherit', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                <Icon.Sparkle s={11} c={T.green} sw={1.8}/>{q}
              </button>
            ))}
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', borderRadius: 26, boxShadow: '0 6px 18px rgba(20,30,25,0.08), inset 0 0 0 1px ' + T.line, padding: '6px 6px 6px 14px' }}>
          <input
            ref={inputRef}
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onFocus={handleFocus}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder={`Ask about ${child?.name || 'Emma'}…`}
            style={{ flex: 1, minWidth: 0, height: 40, border: 'none', outline: 'none', background: 'transparent', fontFamily: 'inherit', fontSize: 15, color: T.ink, letterSpacing: '-0.005em' }}
          />
          <button onClick={send} style={{ width: 40, height: 40, borderRadius: 999, border: 'none', cursor: draft.trim() ? 'pointer' : 'default', background: draft.trim() ? T.green : T.bgAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: draft.trim() ? '0 4px 10px rgba(45,106,79,0.32)' : 'none', transition: 'background .15s' }}>
            <Icon.Send s={18} c={draft.trim() ? '#fff' : T.muted}/>
          </button>
        </div>
        <div style={{ fontSize: 11, color: T.muted, textAlign: 'center', padding: '5px 0 0', lineHeight: 1.4 }}>
          AI-generated · Always confirm medical, legal, or crisis advice with a professional.
        </div>
      </div>
    </Screen>
  );
}

// ── User Account Screen ───────────────────────────────────────────────

function AccSectionTitle({ children }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 700, color: T.muted, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>
      {children}
    </div>
  );
}

function ProfileRow({ label, value, editing, onEdit, onChange, onSave, onCancel, divider }) {
  return (
    <div>
      {editing ? (
        <div style={{ padding: '10px 16px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 12, color: T.muted, fontWeight: 600 }}>{label}</div>
          <input autoFocus value={value} onChange={e => onChange(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && onSave()}
            style={{ width: '100%', boxSizing: 'border-box', height: 44, border: `1.5px solid ${T.green}`, borderRadius: 10, padding: '0 12px', fontSize: 15, color: T.ink, fontFamily: 'inherit', outline: 'none', background: T.bg }} />
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={onCancel} style={{ flex: 1, height: 36, borderRadius: 8, border: `1.5px solid ${T.line}`, background: 'transparent', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, color: T.ink2, cursor: 'pointer' }}>Cancel</button>
            <button onClick={onSave} style={{ flex: 1, height: 36, borderRadius: 8, border: 'none', background: T.green, fontFamily: 'inherit', fontSize: 13, fontWeight: 700, color: '#fff', cursor: 'pointer' }}>Save</button>
          </div>
        </div>
      ) : (
        <button onClick={onEdit} style={{ width: '100%', padding: '14px 16px', background: 'none', border: 'none', fontFamily: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: T.muted, fontWeight: 600 }}>{label}</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: T.ink, marginTop: 2 }}>{value}</div>
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: T.green }}>Edit</span>
        </button>
      )}
      {divider && <div style={{ height: 1, background: T.line, marginInline: 16 }} />}
    </div>
  );
}

function UserProfileScreen({ onTab }) {
  const [user, setUser] = React.useState({ name: 'Sarah Miller', email: 'sarah@example.com' });
  const [editField, setEditField] = React.useState(null);
  const [draft, setDraft] = React.useState({});
  const [children, setChildren] = React.useState(() => [...(window.CHILDREN || [])]);
  const [showAddChild, setShowAddChild] = React.useState(false);
  const [newChildName, setNewChildName] = React.useState('');
  const [pwFields, setPwFields] = React.useState({ current: '', next: '', confirm: '' });

  const startEdit = (field) => { setEditField(field); setDraft({ ...user }); };
  const saveEdit = () => { setUser({ ...draft }); setEditField(null); };

  const removeChild = (id) => setChildren(c => c.filter(ch => ch.id !== id));
  const addChild = () => {
    if (!newChildName.trim()) return;
    const parts = newChildName.trim().split(' ');
    const initials = parts.map(w => w[0]).join('').slice(0, 2).toUpperCase();
    setChildren(c => [...c, {
      id: 'new_' + Date.now(), name: newChildName.trim(), initials,
      age: '', diagShort: 'New', currentStageLabel: 'Ages 1–3',
      currentStageId: 'a1', color: T.mint
    }]);
    setNewChildName(''); setShowAddChild(false);
  };

  const initials = user.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <Screen bg={T.bg} bottomTab={<TabBar active="profile" onTab={onTab} />}>
      <ScreenHeader title="Account" sticky={false} />

      {/* Hero avatar */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4px 18px 24px' }}>
        <div style={{
          width: 78, height: 78, borderRadius: 999,
          background: `linear-gradient(140deg, ${T.green}, ${T.greenDeep})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 28, fontWeight: 700, color: '#fff',
          boxShadow: '0 8px 22px rgba(45,106,79,0.28)'
        }}>{initials}</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: T.ink, marginTop: 12, letterSpacing: '-0.02em' }}>{user.name}</div>
        <div style={{ fontSize: 13, color: T.muted, marginTop: 3 }}>{user.email}</div>
      </div>

      <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 22, paddingBottom: 28 }}>

        {/* Personal info */}
        <div>
          <AccSectionTitle>Personal info</AccSectionTitle>
          <div style={{ background: '#fff', borderRadius: 18, overflow: 'hidden', boxShadow: `inset 0 0 0 1px ${T.line}` }}>
            <ProfileRow label="Full name" value={editField === 'name' ? draft.name : user.name}
              editing={editField === 'name'} onEdit={() => startEdit('name')}
              onChange={v => setDraft(d => ({ ...d, name: v }))} onSave={saveEdit}
              onCancel={() => setEditField(null)} divider />
            <ProfileRow label="Email" value={editField === 'email' ? draft.email : user.email}
              editing={editField === 'email'} onEdit={() => startEdit('email')}
              onChange={v => setDraft(d => ({ ...d, email: v }))} onSave={saveEdit}
              onCancel={() => setEditField(null)} divider />

            {/* Password row */}
            <div>
              <button onClick={() => setEditField(editField === 'password' ? null : 'password')} style={{
                width: '100%', padding: '14px 16px', background: 'none', border: 'none',
                fontFamily: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left'
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: T.muted, fontWeight: 600 }}>Password</div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: T.ink, marginTop: 2, letterSpacing: '0.1em' }}>••••••••</div>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: editField === 'password' ? T.muted : T.green }}>
                  {editField === 'password' ? 'Cancel' : 'Change'}
                </span>
              </button>
              {editField === 'password' && (
                <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[['current', 'Current password'], ['next', 'New password'], ['confirm', 'Confirm new password']].map(([k, lbl]) => (
                    <div key={k}>
                      <div style={{ fontSize: 12, color: T.muted, fontWeight: 600, marginBottom: 5 }}>{lbl}</div>
                      <input type="password" value={pwFields[k]}
                        onChange={e => setPwFields(p => ({ ...p, [k]: e.target.value }))}
                        style={{ width: '100%', boxSizing: 'border-box', height: 44, border: `1.5px solid ${T.line}`, borderRadius: 10, background: T.bg, padding: '0 12px', fontSize: 15, color: T.ink, fontFamily: 'inherit', outline: 'none' }}
                        onFocus={e => e.currentTarget.style.borderColor = T.green}
                        onBlur={e => e.currentTarget.style.borderColor = T.line} />
                    </div>
                  ))}
                  <button style={{ height: 44, borderRadius: 12, background: T.green, color: '#fff', border: 'none', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer', marginTop: 2 }}>
                    Update password
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Children */}
        <div>
          <AccSectionTitle>My children</AccSectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {children.map(c => (
              <div key={c.id} style={{
                background: '#fff', borderRadius: 16, padding: '12px 14px',
                boxShadow: `inset 0 0 0 1px ${T.line}`,
                display: 'flex', alignItems: 'center', gap: 12
              }}>
                <Avatar initials={c.initials} size={44} color={c.color || T.green} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15.5, fontWeight: 700, color: T.ink, letterSpacing: '-0.01em' }}>
                    {c.name}{c.age ? <span style={{ color: T.muted, fontWeight: 500, fontSize: 13 }}> · Age {c.age}</span> : null}
                  </div>
                  <div style={{ fontSize: 12.5, color: T.muted, marginTop: 2 }}>{c.diagShort} · {c.currentStageLabel}</div>
                </div>
                <button onClick={() => removeChild(c.id)} style={{
                  width: 30, height: 30, borderRadius: 999, border: 'none',
                  background: 'rgba(194,84,80,0.1)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6l12 12" stroke={T.red} strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            ))}

            {showAddChild ? (
              <div style={{ background: '#fff', borderRadius: 16, padding: '14px', boxShadow: `inset 0 0 0 1.5px ${T.green}` }}>
                <div style={{ fontSize: 12, color: T.muted, fontWeight: 600, marginBottom: 8 }}>Child's name</div>
                <input autoFocus value={newChildName} onChange={e => setNewChildName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addChild()}
                  placeholder="e.g. Oliver"
                  style={{ width: '100%', boxSizing: 'border-box', height: 44, border: `1.5px solid ${T.line}`, borderRadius: 10, padding: '0 12px', fontSize: 15, color: T.ink, fontFamily: 'inherit', outline: 'none', background: T.bg }}
                  onFocus={e => e.currentTarget.style.borderColor = T.green}
                  onBlur={e => e.currentTarget.style.borderColor = T.line} />
                <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                  <button onClick={() => setShowAddChild(false)} style={{ flex: 1, height: 40, borderRadius: 10, border: `1.5px solid ${T.line}`, background: 'transparent', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, color: T.ink2, cursor: 'pointer' }}>Cancel</button>
                  <button onClick={addChild} style={{ flex: 1, height: 40, borderRadius: 10, border: 'none', background: T.green, fontFamily: 'inherit', fontSize: 14, fontWeight: 700, color: '#fff', cursor: 'pointer' }}>Add</button>
                </div>
              </div>
            ) : (
              <button onClick={() => setShowAddChild(true)} style={{
                background: 'transparent', borderRadius: 16, padding: '14px',
                border: `1.5px dashed ${T.line}`, cursor: 'pointer', fontFamily: 'inherit',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                color: T.green, fontWeight: 700, fontSize: 14
              }}>
                <Icon.Plus s={18} c={T.green} /> Add another child
              </button>
            )}
          </div>
        </div>

        {/* Sign out */}
        <button style={{
          width: '100%', height: 52, borderRadius: 14, border: `1.5px solid ${T.line}`,
          background: 'transparent', fontFamily: 'inherit', fontSize: 15, fontWeight: 700,
          color: T.ink2, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
        }}>
          <Icon.LogOut s={18} c={T.ink2} /> Sign out
        </button>

        <button style={{ background: 'none', border: 'none', fontFamily: 'inherit', fontSize: 13, color: T.red, cursor: 'pointer', textDecoration: 'underline', textAlign: 'center', padding: 0 }}>
          Delete account
        </button>

      </div>
    </Screen>
  );
}

Object.assign(window, { ProfileScreen, EventsScreen, MarketplaceScreen, AssistantScreen, UserProfileScreen });
