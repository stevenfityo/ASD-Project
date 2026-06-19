// aTyp — Profile, Events, Marketplace, Community tab screens.

// ── Profile ───────────────────────────────────────────────────────────

function ProfileScreen({ onTab, back, child, openSection }) {
  const groups = [
    {
      title: 'Daily Care',
      items: [
        { key: 'routine',   I: Icon.Clipboard, label: 'Daily Routine',     sub: 'Meds, meals, therapy, sleep'     },
        { key: 'documents', I: Icon.Folder,    label: 'Documents Vault',   sub: 'Reports, evaluations, records'   },
        { key: 'trusted',   I: Icon.Heart,     label: 'Trusted Person',    sub: 'Emergency guardian access'       },
      ]
    },
    {
      title: 'Records',
      items: [
        { key: 'medical',   I: Icon.Hospital,  label: 'Medical',           sub: 'Doctors, medications, allergies' },
        { key: 'therapies', I: Icon.Brain,     label: 'Therapies',         sub: 'ABA, speech, occupational'       },
        { key: 'education', I: Icon.School,    label: 'Education & IEP',   sub: 'School, accommodations, goals'   },
        { key: 'legal',     I: Icon.Scale,     label: 'Legal & Financial', sub: 'Guardianship, ABLE, trusts'      },
      ]
    },
  ];

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

      {/* Child hero — Account-style */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4px 18px 20px' }}>
        <div style={{
          width: 72, height: 72, borderRadius: 999,
          background: `linear-gradient(140deg, ${T.green}, ${T.greenDeep})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 26, fontWeight: 700, color: '#fff',
          boxShadow: '0 8px 22px rgba(45,106,79,0.24)',
        }}>{child.initials}</div>
        <div style={{ fontSize: 21, fontWeight: 700, color: T.ink, marginTop: 10, letterSpacing: '-0.02em' }}>{child.name}</div>
        <div style={{ fontSize: 13, color: T.muted, marginTop: 3 }}>{child.dob} · {child.age} years old</div>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          background: T.greenSoft, padding: '4px 11px', borderRadius: 999,
          fontSize: 11, fontWeight: 700, color: T.green, letterSpacing: '0.04em', marginTop: 8,
        }}>
          <span style={{ width: 5, height: 5, borderRadius: 999, background: T.green }}/>
          {child.diagnosis.toUpperCase()}
        </div>
      </div>

      <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 20, paddingBottom: 28 }}>

        {/* Profile completion tile */}
        <div style={{ background: '#fff', borderRadius: 16, padding: '14px 16px', boxShadow: `inset 0 0 0 1px ${T.line}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: T.ink }}>Profile completeness</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.green }}>60%</div>
          </div>
          <div style={{ height: 6, background: T.line, borderRadius: 999, overflow: 'hidden', marginBottom: 10 }}>
            <div style={{ width: '60%', height: '100%', background: T.green, borderRadius: 999 }}/>
          </div>
          <div style={{ fontSize: 12, color: T.muted }}>Add medical info to improve your profile</div>
        </div>

        {/* Section groups */}
        {groups.map(g => (
          <div key={g.title}>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: T.muted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>{g.title}</div>
            <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: `inset 0 0 0 1px ${T.line}` }}>
              {g.items.map((s, i) => (
                <button key={s.key} onClick={() => openSection && openSection(s.key)} style={{
                  width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: 'inherit', textAlign: 'left',
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '12px 14px',
                  borderBottom: i < g.items.length - 1 ? `1px solid ${T.line}` : 'none',
                }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: 9, background: T.greenSoft,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <s.I s={17} c={T.green}/>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14.5, fontWeight: 700, color: T.ink, letterSpacing: '-0.01em' }}>{s.label}</div>
                    <div style={{ fontSize: 11.5, color: T.muted, marginTop: 1 }}>{s.sub}</div>
                  </div>
                  <Icon.ChevronRight s={15} c={T.muted}/>
                </button>
              ))}
            </div>
          </div>
        ))}

      </div>
    </Screen>
  );
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

// ── Guide Tree Data ───────────────────────────────────────────────────
const GUIDE_TREE = {
  start: {
    q: (name) => `What's on your mind today?`,
    sub: 'Choose the area that concerns you most right now',
    choices: [
      { id: 'medical',   label: 'Health & Medical',   emoji: '🏥', next: 'age' },
      { id: 'therapy',   label: 'Therapies',           emoji: '🧠', next: 'age' },
      { id: 'education', label: 'Education',           emoji: '🏫', next: 'age' },
      { id: 'daily',     label: 'Daily Life',          emoji: '📅', next: 'age' },
      { id: 'finance',   label: 'Finance & Legal',     emoji: '⚖️', next: 'age' },
      { id: 'crisis',    label: 'Crisis Help',         emoji: '🚨', next: 'crisis_type' },
    ],
  },
  age: {
    q: (name) => `How old is ${name}?`,
    sub: 'This helps us give age-appropriate guidance',
    choices: [
      { id: '0-3',  label: '0 – 3 years',  emoji: '🌱', next: 'sub' },
      { id: '4-8',  label: '4 – 8 years',  emoji: '🌿', next: 'sub' },
      { id: '9-13', label: '9 – 13 years', emoji: '🌳', next: 'sub' },
      { id: '14+',  label: '14+ years',    emoji: '🌲', next: 'sub' },
    ],
  },
  sub: {
    q: (name, ctx) => { const map = {
      medical: {
        '0-3':  { q: 'What is your main concern?', choices: [
          { id: 'diagnosis', label: 'Getting a diagnosis',      emoji: '🔍', next: 'result' },
          { id: 'speech',    label: 'My child is not speaking', emoji: '🗣️', next: 'result' },
          { id: 'routine',   label: 'Medical routine & doctors',emoji: '💊', next: 'result' },
        ]},
        '4-8':  { q: 'What is your main concern?', choices: [
          { id: 'meds',      label: 'Medications & supplements', emoji: '💊', next: 'result' },
          { id: 'sleep',     label: 'Sleep problems',            emoji: '😴', next: 'result' },
          { id: 'emergency', label: 'Medical emergencies',       emoji: '🚑', next: 'result' },
        ]},
        '9-13': { q: 'What is your main concern?', choices: [
          { id: 'puberty',   label: 'Puberty & changes',        emoji: '🔄', next: 'result' },
          { id: 'meds',      label: 'Medications & specialists', emoji: '💊', next: 'result' },
          { id: 'cooccur',   label: 'Co-occurring conditions',  emoji: '🩺', next: 'result' },
        ]},
        '14+':  { q: 'What is your main concern?', choices: [
          { id: 'adult',     label: 'Transition to adult care', emoji: '🏥', next: 'result' },
          { id: 'meds',      label: 'Long-term medications',    emoji: '💊', next: 'result' },
          { id: 'mental',    label: 'Mental health support',    emoji: '🧩', next: 'result' },
        ]},
      },
      therapy: {
        '0-3':  { q: 'Which therapy area?', choices: [
          { id: 'early',  label: 'Early intervention',     emoji: '⭐', next: 'result' },
          { id: 'speech', label: 'Speech & language',      emoji: '🗣️', next: 'result' },
          { id: 'aba',    label: 'ABA therapy',            emoji: '🔁', next: 'result' },
        ]},
        '4-8':  { q: 'Which therapy area?', choices: [
          { id: 'speech', label: 'Speech & communication', emoji: '🗣️', next: 'result' },
          { id: 'ot',     label: 'Occupational therapy',   emoji: '✋', next: 'result' },
          { id: 'alt',    label: 'Alternative approaches', emoji: '🌿', next: 'result' },
        ]},
        '9-13': { q: 'Which therapy area?', choices: [
          { id: 'social', label: 'Social skills',          emoji: '🤝', next: 'result' },
          { id: 'behav',  label: 'Behavior support',       emoji: '🔁', next: 'result' },
          { id: 'alt',    label: 'Alternative therapies',  emoji: '🌿', next: 'result' },
        ]},
        '14+':  { q: 'Which therapy area?', choices: [
          { id: 'voc',    label: 'Vocational skills',      emoji: '💼', next: 'result' },
          { id: 'social', label: 'Social & independence',  emoji: '🤝', next: 'result' },
          { id: 'mental', label: 'Mental health therapy',  emoji: '🧘', next: 'result' },
        ]},
      },
      education: {
        '0-3':  { q: 'What are you planning?', choices: [
          { id: 'daycare', label: 'Choosing a daycare',      emoji: '🏠', next: 'result' },
          { id: 'ei',      label: 'Early intervention prog.', emoji: '⭐', next: 'result' },
          { id: 'iep',     label: 'Preparing for school',    emoji: '📋', next: 'result' },
        ]},
        '4-8':  { q: 'What are you planning?', choices: [
          { id: 'school',  label: 'Choosing the right school', emoji: '🏫', next: 'result' },
          { id: 'iep',     label: 'IEP & accommodations',      emoji: '📋', next: 'result' },
          { id: 'home',    label: 'Home education support',     emoji: '📚', next: 'result' },
        ]},
        '9-13': { q: 'What are you planning?', choices: [
          { id: 'school',  label: 'Middle school transition',  emoji: '🏫', next: 'result' },
          { id: 'iep',     label: 'IEP goals & rights',        emoji: '📋', next: 'result' },
          { id: 'social',  label: 'Social inclusion at school', emoji: '🤝', next: 'result' },
        ]},
        '14+':  { q: 'What are you planning?', choices: [
          { id: 'highsch', label: 'High school & graduation',  emoji: '🎓', next: 'result' },
          { id: 'college', label: 'Higher education options',  emoji: '🏛️', next: 'result' },
          { id: 'voc',     label: 'Vocational / work training', emoji: '💼', next: 'result' },
        ]},
      },
      daily: {
        '0-3':  { q: 'What part of daily life?', choices: [
          { id: 'routine', label: 'Daily routine & structure', emoji: '📅', next: 'result' },
          { id: 'sleep',   label: 'Sleep & night routine',     emoji: '😴', next: 'result' },
          { id: 'family',  label: 'Family & siblings',         emoji: '👨‍👩‍👧', next: 'result' },
        ]},
        '4-8':  { q: 'What part of daily life?', choices: [
          { id: 'routine', label: 'Managing daily routine',    emoji: '📅', next: 'result' },
          { id: 'melt',    label: 'Meltdowns & behavior',      emoji: '🌊', next: 'result' },
          { id: 'social',  label: 'Playdates & socializing',   emoji: '🤝', next: 'result' },
        ]},
        '9-13': { q: 'What part of daily life?', choices: [
          { id: 'routine', label: 'Routine & transitions',     emoji: '📅', next: 'result' },
          { id: 'melt',    label: 'Emotional regulation',      emoji: '🌊', next: 'result' },
          { id: 'holiday', label: 'Holidays & special events', emoji: '🎉', next: 'result' },
        ]},
        '14+':  { q: 'What part of daily life?', choices: [
          { id: 'indep',   label: 'Building independence',     emoji: '🌟', next: 'result' },
          { id: 'social',  label: 'Social relationships',      emoji: '🤝', next: 'result' },
          { id: 'future',  label: 'Planning for the future',   emoji: '🗺️', next: 'result' },
        ]},
      },
      finance: {
        '0-3':  { q: 'What do you need help with?', choices: [
          { id: 'pay',     label: 'Who pays for early intervention', emoji: '💰', next: 'result' },
          { id: 'rights',  label: 'Legal rights & protections',      emoji: '⚖️', next: 'result' },
          { id: 'costs',   label: 'Planning for future costs',       emoji: '📊', next: 'result' },
        ]},
        '4-8':  { q: 'What do you need help with?', choices: [
          { id: 'school',  label: 'Who pays for school services',    emoji: '🏫', next: 'result' },
          { id: 'therapy', label: 'Funding therapies',               emoji: '💰', next: 'result' },
          { id: 'rights',  label: 'My legal rights as a parent',     emoji: '⚖️', next: 'result' },
        ]},
        '9-13': { q: 'What do you need help with?', choices: [
          { id: 'rights',  label: 'Rights & IEP law',                emoji: '⚖️', next: 'result' },
          { id: 'benefits','label': 'Government benefits',            emoji: '🏛️', next: 'result' },
          { id: 'future',  label: 'Planning for adulthood',          emoji: '📋', next: 'result' },
        ]},
        '14+':  { q: 'What do you need help with?', choices: [
          { id: 'guardianship', label: 'Guardianship options',       emoji: '⚖️', next: 'result' },
          { id: 'ssi',     label: 'SSI / disability benefits',       emoji: '💰', next: 'result' },
          { id: 'trust',   label: 'Special needs trust & ABLE',      emoji: '🏦', next: 'result' },
        ]},
      },
    };
    const catMap = map[ctx.category];
    return catMap ? catMap[ctx.age] : null;
  },
  },
  crisis_type: {
    q: () => 'What kind of help do you need right now?',
    sub: 'We\'ll guide you to the right resources immediately',
    choices: [
      { id: 'meltdown', label: 'My child is having a meltdown', emoji: '🌊', next: 'result' },
      { id: 'aggr',     label: 'Aggressive or unsafe behavior',  emoji: '🚨', next: 'result' },
      { id: 'school',   label: 'Crisis at school',               emoji: '🏫', next: 'result' },
    ],
  },
};

const GUIDE_RESULTS = {
  // Medical
  medical_diagnosis:    { title: 'Getting a Diagnosis', steps: ['Contact your pediatrician and request an ASD evaluation referral', 'Ask for a developmental pediatrician or child psychologist who specializes in ASD', 'Request the evaluation in writing — this creates a paper trail', 'Ask about the DSM-5 diagnostic code (F84.0) for future services', 'Early diagnosis = earlier access to services and funding'] },
  medical_speech:       { title: 'Speech & Non-Verbal', steps: ['Ask your doctor for a referral to a speech-language pathologist (SLP) immediately', 'Look into AAC (Augmentative and Alternative Communication) devices', 'Early intervention programs often include free SLP services before age 3', 'Consider PECS (Picture Exchange Communication System) for home use', 'Document all communication attempts — it helps therapists track progress'] },
  medical_routine:      { title: 'Medical Routine & Doctors', steps: ['Find a pediatrician experienced with ASD — ask your local autism society for referrals', 'Keep a single medical binder: diagnoses, meds, allergies, contacts', 'Schedule annual check-ins with a developmental pediatrician', 'Create a "hospital passport" — a one-page profile of your child for emergencies', 'Bring a support person to medical appointments when possible'] },
  medical_meds:         { title: 'Medications & Supplements', steps: ['Always consult a child psychiatrist before starting any medication', 'Keep a log of behaviors, sleep, appetite — share it with the doctor', 'Ask about evidence-based supplements (Omega-3, Melatonin) vs. unproven ones', 'Request a medication review every 6 months', 'Never stop medications abruptly — always taper under medical supervision'] },
  medical_sleep:        { title: 'Sleep Problems', steps: ['Discuss Melatonin with your doctor — it\'s often effective and safe for ASD', 'Build a strict wind-down routine: bath → book → weighted blanket → lights out', 'Reduce screen time at least 2 hours before bedtime', 'Check for sensory issues affecting sleep (scratchy pajamas, room temperature, sounds)', 'A sleep specialist referral may be needed for severe cases'] },
  medical_emergency:    { title: 'Medical Emergencies', steps: ['Create a Medical ID card your child carries at all times', 'Register with local emergency services if your child may elope (wander)', 'Train your child on "stop, find an adult, show the card"', 'Add a medical alert note to your child\'s phone if they carry one', 'Keep emergency contacts visible at home and in school bag'] },
  medical_puberty:      { title: 'Puberty & ASD', steps: ['Start conversations about body changes early using social stories or visual supports', 'Ask your pediatrician to recommend an ASD-knowledgeable gynecologist or urologist', 'Address hygiene routines explicitly — create visual step-by-step guides', 'Prepare for potential behavior changes during hormonal shifts', 'Discuss consent and personal boundaries in concrete, explicit terms'] },
  medical_cooccur:      { title: 'Co-occurring Conditions', steps: ['Common co-occurring conditions: ADHD, anxiety, epilepsy, GI issues, sensory processing disorder', 'Request comprehensive evaluations for each suspected condition separately', 'Ensure all specialists communicate with each other — you may need to coordinate', 'Keep a symptom diary to identify patterns', 'Join condition-specific parent groups for targeted support'] },
  medical_adult:        { title: 'Transition to Adult Medical Care', steps: ['Begin transition planning at age 14 — don\'t wait until 18', 'Find adult physicians experienced with ASD before the transition', 'Transfer all medical records and create a comprehensive health summary', 'Discuss guardianship or supported decision-making for medical consent', 'Connect with adult disability services in your state'] },
  medical_mental:       { title: 'Mental Health Support', steps: ['Look for therapists who specialize in ASD + co-occurring mental health conditions', 'CBT adapted for ASD has strong evidence for anxiety and depression', 'Peer support groups for teens with ASD can reduce isolation significantly', 'Be alert to signs of depression — they may present differently in ASD (withdrawal, regression)', 'School counselors can be part of the support team — include them in IEP meetings'] },
  // Therapy
  therapy_early:        { title: 'Early Intervention (0–3)', steps: ['Contact your state\'s Early Intervention program immediately — it\'s federally mandated and usually free', 'Services can include speech, OT, PT, and developmental therapy', 'Evaluations must happen within 45 days of your request', 'Create an IFSP (Individualized Family Service Plan) with the team', 'Therapy in the home is most effective at this age — advocate for home visits'] },
  therapy_speech:       { title: 'Speech & Language Therapy', steps: ['Request an evaluation from a certified Speech-Language Pathologist (SLP)', 'Therapy should happen at least 2–3x per week for meaningful progress', 'Ask the SLP to teach you strategies to use at home daily', 'Consider AAC devices if verbal speech is limited', 'Schools are required to provide speech services if it\'s in the IEP'] },
  therapy_aba:          { title: 'ABA Therapy', steps: ['Find a BCBA (Board Certified Behavior Analyst) supervisor — check credentials at bacb.com', 'ABA should be individualized — ask to see the behavior plan and data', 'Intensity matters: 20–40 hours/week is often recommended for ages 2–5', 'Insurance often covers ABA — check your state\'s autism mandate law', 'Ask for parent training sessions — you are part of the therapy team'] },
  therapy_ot:           { title: 'Occupational Therapy', steps: ['OT addresses sensory processing, fine motor skills, and daily living activities', 'Request a sensory profile evaluation as part of the OT assessment', 'Ask for a sensory diet — a personalized schedule of sensory activities', 'OT can be provided in schools through the IEP', 'Weighted vests, fidget tools, and sensory corners can help at home'] },
  therapy_alt:          { title: 'Alternative Approaches', steps: ['Discuss any alternative therapy with your medical team first', 'Evidence-based: Social Stories, PECS, Floortime, DIR/Floortime, RDI', 'Be cautious of unproven and costly "cures" — research thoroughly', 'Music therapy and animal-assisted therapy have growing evidence', 'Ask for peer-reviewed studies before committing to any new approach'] },
  therapy_social:       { title: 'Social Skills', steps: ['Look for social skills groups run by psychologists or SLPs — peer practice is key', 'Social Stories (Carol Gray method) are highly effective for teaching expectations', 'Role-play specific social scenarios at home before real situations', 'Video modeling — watching themselves or peers — works well for many ASD youth', 'Identify one or two genuine social interests to build friendships around'] },
  therapy_behav:        { title: 'Behavior Support', steps: ['Work with a BCBA to identify triggers (ABC: Antecedent → Behavior → Consequence)', 'Create a Behavior Intervention Plan (BIP) — request it formally through the school', 'Positive reinforcement is more effective than punishment for ASD', 'Keep a behavior log: time, trigger, behavior, duration, what helped', 'Look for the function of the behavior — communication, escape, sensory, attention'] },
  therapy_voc:          { title: 'Vocational Skills', steps: ['Explore vocational rehabilitation services — most states offer them for free at 14+', 'Identify your child\'s strengths and interests as a foundation for career exploration', 'Job coaching programs provide supported employment with on-site guidance', 'Consider internships or volunteer work to build real-world experience', 'Ask the IEP team to include transition and vocational goals starting at age 14'] },
  therapy_mental:       { title: 'Mental Health Therapy', steps: ['Seek therapists trained in CBT adapted for autism (CBT-A)', 'Anxiety and depression are very common in ASD teens — early treatment matters', 'Mindfulness and relaxation techniques can be taught with visual supports', 'Group therapy with peers who have ASD can reduce shame and isolation', 'Be transparent with your teen about their diagnosis and strengths'] },
  // Education
  education_daycare:    { title: 'Choosing a Daycare (0–3)', steps: ['Look for daycares with low child-to-staff ratios (ideally 1:3 or 1:4)', 'Ask if staff have any ASD or special needs training', 'Inclusive settings with typically developing peers benefit communication development', 'Visit at least twice — once announced, once unannounced', 'Coordinate with your Early Intervention team to share strategies with daycare staff'] },
  education_ei:         { title: 'Early Intervention Programs', steps: ['Under IDEA Part C, EI is free for children 0–3 with developmental delays', 'Request services in writing to start the 45-day evaluation clock', 'You have the right to attend all meetings and disagree with the plan', 'Transition to school-based services begins at age 3 — plan ahead', 'Keep copies of all evaluations and IFSP documents'] },
  education_iep:        { title: 'IEP & Accommodations', steps: ['You are a full member of the IEP team — your voice matters equally', 'Review annual goals before the meeting and come with your own priority list', 'Request specific, measurable goals (not vague ones like "will improve communication")', 'Common accommodations: extended time, preferential seating, sensory breaks, written instructions', 'You can request an independent educational evaluation (IEE) at school\'s expense if you disagree'] },
  education_school:     { title: 'Choosing the Right School', steps: ['Visit prospective schools with your child\'s IEP/profile in hand', 'Ask about their inclusion philosophy, resource room, and related services', 'Request data on outcomes for students with similar profiles', 'Inclusive classrooms with support are often the least restrictive environment (LRE) — your right under IDEA', 'Trust your instincts — and your child\'s reaction to the environment'] },
  education_home:       { title: 'Home Education Support', steps: ['Structure and visual schedules are especially important for home learning', 'Break tasks into small steps with clear start and end points', 'Use your child\'s interests to make content engaging', 'Build in sensory breaks every 30–45 minutes', 'Connect with your school\'s resource team — they can advise even for home learning'] },
  education_social:     { title: 'Social Inclusion at School', steps: ['Talk to the school counselor about peer education programs (teaching classmates about neurodiversity)', 'Lunch bunch and structured recess programs pair ASD students with trained peer buddies', 'Extracurricular activities tied to special interests help build genuine friendships', 'Coordinate with the teacher on seating and grouping for collaborative work', 'Watch for signs of bullying — ASD students are disproportionately targeted; act quickly'] },
  education_highsch:    { title: 'High School & Graduation', steps: ['Ensure the IEP includes post-secondary transition goals by age 14 (required by IDEA)', 'Explore diploma options — some states offer certificates of completion for students who can\'t meet standard requirements', 'Plan for college applications — colleges have disability services offices; connect early', 'Self-advocacy skills are critical — teach your teen to understand and communicate their needs', 'Explore dual enrollment in community college as a bridge option'] },
  education_college:    { title: 'Higher Education', steps: ['Contact the Disability Services Office at each college being considered', 'Self-disclosure is the student\'s choice — but documentation must be current', 'Look for colleges with dedicated ASD support programs (many now exist)', 'Consider starting with community college for a supported transition', 'Discuss executive function supports: planning, organization, time management'] },
  education_voc:        { title: 'Vocational Training', steps: ['Contact your state\'s Vocational Rehabilitation (VR) office — free services available', 'Explore Project SEARCH, a high school transition program based in workplaces', 'Identify strengths and interests early — career path should build on them', 'Job coaching provides on-site support during initial employment', 'Many companies have neurodiversity hiring programs — SAP, Microsoft, EY, etc.'] },
  // Daily Life
  daily_routine:        { title: 'Daily Routine & Structure', steps: ['Visual schedules (pictures or icons) reduce anxiety about transitions', 'Keep the routine consistent — same time, same sequence, same cues', 'Use first/then boards: "First breakfast, then play"', 'Prepare for changes 24–48 hours in advance with visual previews', 'Build in transition warnings: "In 5 minutes we\'re leaving"'] },
  daily_sleep:          { title: 'Sleep & Night Routine', steps: ['Use a consistent bedtime sequence with a visual schedule', 'Weighted blankets (10% of body weight) help many children with ASD', 'Eliminate screens at least 1 hour before bed', 'White noise or soft music can block sensory triggers at night', 'Melatonin is commonly used — discuss dose with your doctor'] },
  daily_family:         { title: 'Family & Siblings', steps: ['Schedule one-on-one time with siblings who may feel overlooked', 'Explain the diagnosis to siblings age-appropriately — they cope better with information', 'Join a sibling support group (Sibshops is a well-known program)', 'Build couple time into the schedule — caregiver burnout is real', 'Accept help when offered — and ask for it when you need it'] },
  daily_melt:           { title: 'Meltdowns & Emotional Regulation', steps: ['Identify the antecedents — what triggers the meltdown? Keep a log', 'Create a calm-down kit: noise-canceling headphones, fidgets, comfort object', 'During a meltdown: lower your voice, reduce demands, give space', 'After: reconnect warmly — no punishment or long explanations', 'Teach calming strategies during calm moments — not in the heat of the moment'] },
  daily_social:         { title: 'Social Life & Connections', steps: ['Build on special interests to find like-minded peers', 'Structured social activities (coding clubs, robotics, drama) work better than free play', 'Practice social scripts for common situations at home', 'Set realistic expectations — one good friendship is more valuable than many acquaintances', 'Model and narrate social interactions in everyday life'] },
  daily_holiday:        { title: 'Holidays & Special Events', steps: ['Prepare well in advance with social stories about what will happen', 'Create a visual schedule for the event day', 'Have a quiet retreat plan if the child becomes overwhelmed', 'Communicate needs to relatives before the event — don\'t expect them to "just understand"', 'Adjust expectations — modified participation is still participation'] },
  daily_indep:          { title: 'Building Independence', steps: ['Teach daily living skills explicitly: cooking, laundry, banking, transportation', 'Use task analysis: break each skill into tiny steps with visual supports', 'Practice in real settings — not just at home', 'Allow failure in safe environments — it\'s part of learning', 'Connect with adult transition services before age 18'] },
  daily_future:         { title: 'Planning for the Future', steps: ['Start discussions about living arrangements, employment, and relationships early', 'Explore supported living options — group homes, supported apartments, family home', 'Develop a "Life Plan" document with your child\'s vision, needs, and supports', 'Connect with adult disability organizations in your area', 'Legal and financial planning (guardianship, ABLE accounts, special needs trusts) should begin at 16–17'] },
  // Finance & Legal
  finance_pay:          { title: 'Funding Early Intervention', steps: ['Early intervention is federally funded under IDEA Part C — it\'s free or low-cost', 'Insurance may also cover some services — check your policy', 'Medicaid waiver programs provide additional funding — apply early, waitlists can be long', 'Contact your state\'s Family Support Network for local funding resources', 'Keep records of all services and costs for potential reimbursement'] },
  finance_rights:       { title: 'Legal Rights & Protections', steps: ['Under IDEA, your child has the right to a Free Appropriate Public Education (FAPE)', 'You have the right to have an advocate present at any school meeting', 'The ADA protects your child in schools, public places, and eventually workplaces', 'You can file complaints with your state Department of Education if rights are violated', 'Contact your state\'s Parent Training and Information Center (PTI) for free guidance'] },
  finance_costs:        { title: 'Planning for Future Costs', steps: ['Estimate lifetime support costs — factor in housing, medical, therapy, day programs', 'Open an ABLE account (tax-advantaged savings for people with disabilities)', 'Consider a Special Needs Trust to protect assets without affecting benefits eligibility', 'Check if your child qualifies for SSI (Supplemental Security Income)', 'Life insurance on parents is critical — ensure there\'s a plan if you can no longer provide care'] },
  finance_school:       { title: 'Funding School Services', steps: ['Public school services are free under IDEA — including related services in the IEP', 'Private school tuition may be reimbursable if public school cannot meet needs', 'Medicaid can fund some school-based therapies — check your state rules', 'Extended school year (ESY / summer school) is available if regression is documented', 'Request an itemized breakdown of all services your child receives'] },
  finance_therapy:      { title: 'Funding Therapies', steps: ['Most states have autism insurance mandates requiring coverage for ABA and other therapies', 'Check your state\'s Medicaid waiver for therapy funding', 'Medicaid HCBS waivers can fund in-home and community therapies', 'University training clinics often offer reduced-cost therapy', 'Nonprofit organizations sometimes offer grants for families — search the Autism Speaks resource guide'] },
  finance_benefits:     { title: 'Government Benefits', steps: ['SSI (Supplemental Security Income) provides monthly income for children with disabilities', 'Medicaid provides health coverage — check your state\'s eligibility rules', 'SNAP (food stamps) may be available depending on household income', 'Many states have autism-specific Medicaid waivers with additional services', 'A special needs attorney or benefits counselor can help you maximize entitlements'] },
  finance_future:       { title: 'Planning for Adulthood', steps: ['Transition planning must start in the IEP at age 14 under IDEA', 'Explore adult day programs, supported employment, and residential options early', 'Connect with adult disability services at age 18 — don\'t wait', 'Begin the SSI/SSDI application process 6–12 months before age 18', 'Create a transition portfolio: skills, interests, medical summary, goals'] },
  finance_guardianship: { title: 'Guardianship Options', steps: ['At 18, your child becomes a legal adult — parental rights end automatically', 'Full guardianship gives you decision-making authority but removes autonomy', 'Consider less restrictive options: supported decision-making, limited guardianship, power of attorney', 'Consult a special needs attorney who specializes in guardianship', 'File for guardianship 6–12 months before age 18 — courts take time'] },
  finance_ssi:          { title: 'SSI & Disability Benefits', steps: ['Apply for SSI at age 18 — even if denied, appeal immediately', 'SSI provides up to ~$914/month (2024) for qualifying individuals', 'To maintain SSI, assets must stay below $2,000 — use an ABLE account for savings', 'If a parent is retired, disabled, or deceased, your child may qualify for SSDI instead', 'Hire a benefits counselor to navigate this — mistakes can cause overpayments or loss of benefits'] },
  finance_trust:        { title: 'Special Needs Trust & ABLE', steps: ['An ABLE account allows tax-free savings up to $18,000/year without affecting benefits', 'A Special Needs Trust holds assets for your child without disqualifying them from Medicaid/SSI', 'A "first-party" trust holds the disabled person\'s own assets; a "third-party" trust is funded by others', 'Include the trust in your will and coordinate with life insurance beneficiary designations', 'Consult a special needs estate planning attorney — this is complex and high-stakes'] },
  // Crisis
  crisis_meltdown:      { title: 'During a Meltdown — Right Now', steps: ['Stay calm — your body language matters more than your words', 'Lower your voice, slow your movements, remove demands completely', 'Give physical space — avoid grabbing or restraining unless there\'s immediate danger', 'Remove others from the area if possible — an audience makes it worse', 'Offer a comfort object, headphones, or weighted blanket silently'] },
  crisis_aggr:          { title: 'Unsafe Behavior — Right Now', steps: ['Ensure everyone\'s physical safety first — your safety matters too', 'Use a calm, low voice: "I\'m here. You\'re safe. Let\'s find a quiet spot."', 'Avoid wrestling or restraining — use blocking techniques only if necessary', 'If there is a real safety emergency, call 911 and tell them your child has autism', 'After the crisis, document everything: time, trigger, what happened, what helped'] },
  crisis_school:        { title: 'School Crisis — Act Now', steps: ['Call the school immediately and request to be present', 'Know your rights: you can go to the school at any time if your child is in crisis', 'If your child was physically restrained, request a written incident report within 24 hours', 'Request an emergency IEP meeting within 10 days to address the situation', 'Contact your state\'s Parent Training and Information Center (PTI) for free advocacy support'] },
};

// ── Guide Map Visual Component ────────────────────────────────────────
function GuideMapView({ path, currentStep, done, stepData, result, childName, choose, reset }) {
  const svgRef = React.useRef(null);
  const W = 340;
  const NODE_H = 40;
  const NODE_W_SELECTED = 260;
  const NODE_W_CHOICE = 95;
  const LEVEL_GAP = 90;

  // Build the list of levels to render
  const levels = [];

  // Level 0: root
  const startChoices = GUIDE_TREE.start.choices;
  const startSel = path.find(p => p.step === 'start');
  levels.push({
    step: 'start',
    label: "What's on your mind?",
    isActive: currentStep === 'start' && !done,
    isDone: !!startSel,
    selectedId: startSel ? startSel.choiceId : null,
    choices: startChoices,
    selectedLabel: startSel ? startSel.choiceLabel : null,
    selectedEmoji: startSel ? startSel.emoji : null,
  });

  // Level 1: age or crisis_type
  if (startSel) {
    if (startSel.choiceId === 'crisis') {
      const criSel = path.find(p => p.step === 'crisis_type');
      levels.push({
        step: 'crisis_type',
        label: 'What kind of help?',
        isActive: currentStep === 'crisis_type' && !done,
        isDone: !!criSel,
        selectedId: criSel ? criSel.choiceId : null,
        choices: GUIDE_TREE.crisis_type.choices,
        selectedLabel: criSel ? criSel.choiceLabel : null,
        selectedEmoji: criSel ? criSel.emoji : null,
      });
    } else {
      const ageSel = path.find(p => p.step === 'age');
      levels.push({
        step: 'age',
        label: 'Age of ' + childName + '?',
        isActive: currentStep === 'age' && !done,
        isDone: !!ageSel,
        selectedId: ageSel ? ageSel.choiceId : null,
        choices: GUIDE_TREE.age.choices,
        selectedLabel: ageSel ? ageSel.choiceLabel : null,
        selectedEmoji: ageSel ? ageSel.emoji : null,
      });

      // Level 2: sub-question
      if (ageSel) {
        const subSel = path.find(p => p.step === 'sub');
        const subData = GUIDE_TREE.sub.q(childName, { category: startSel.choiceId, age: ageSel.choiceId });
        if (subData) {
          levels.push({
            step: 'sub',
            label: subData.q,
            isActive: currentStep === 'sub' && !done,
            isDone: !!subSel,
            selectedId: subSel ? subSel.choiceId : null,
            choices: subData.choices,
            selectedLabel: subSel ? subSel.choiceLabel : null,
            selectedEmoji: subSel ? subSel.emoji : null,
          });
        }
      }
    }
  }

  // Result level
  if (done && result) {
    levels.push({
      step: 'result',
      label: result.title,
      isActive: false,
      isDone: true,
      isResult: true,
      choices: [],
      selectedLabel: null,
    });
  }

  // Calculate total SVG height
  const totalH = levels.reduce((acc, lv) => {
    if (lv.isDone || lv.isResult) return acc + LEVEL_GAP;
    if (lv.isActive) {
      const rows = Math.ceil(lv.choices.length / 3);
      return acc + LEVEL_GAP + rows * (NODE_H + 10);
    }
    return acc + LEVEL_GAP;
  }, 80);

  // Render
  const nodes = [];
  const lines = [];
  let y = 40;
  let prevCx = W / 2;
  let prevY = y;

  levels.forEach((lv, li) => {
    const cx = W / 2;
    const nodeW = lv.isResult ? NODE_W_SELECTED + 20 : (lv.isDone ? NODE_W_SELECTED : NODE_W_SELECTED);
    const nodeX = cx - nodeW / 2;

    if (li > 0) {
      // Line from previous to this node
      lines.push(
        <line key={`line-${li}`} x1={prevCx} y1={prevY + NODE_H} x2={cx} y2={y} stroke={T.green} strokeWidth={2} strokeDasharray={lv.isActive ? '5,4' : 'none'} opacity={0.5}/>
      );
    }

    if (lv.isResult) {
      nodes.push(
        <g key={`node-${li}`}>
          <rect x={nodeX} y={y} width={nodeW} height={NODE_H + 8} rx={12} fill={T.greenDeep} opacity={0.92}/>
          <text x={cx} y={y + NODE_H / 2 + 9} textAnchor="middle" fontSize={12} fontWeight="700" fill="#fff" fontFamily="inherit">
            {lv.label.length > 28 ? lv.label.slice(0, 26) + '…' : lv.label}
          </text>
          <text x={cx} y={y + 16} textAnchor="middle" fontSize={10} fill="rgba(255,255,255,0.7)" fontFamily="inherit">Result</text>
        </g>
      );
      prevCx = cx; prevY = y;
      y += LEVEL_GAP;
    } else if (lv.isDone) {
      nodes.push(
        <g key={`node-${li}`}>
          <rect x={nodeX} y={y} width={nodeW} height={NODE_H} rx={10} fill={T.green}/>
          <text x={cx - 12} y={y + NODE_H / 2 + 5} textAnchor="middle" fontSize={13} fill="#fff" fontFamily="inherit">{lv.selectedEmoji}</text>
          <text x={cx + 8} y={y + NODE_H / 2 + 5} textAnchor="start" fontSize={12} fontWeight="700" fill="#fff" fontFamily="inherit"
            style={{maxWidth: 160}}>
            {(lv.selectedLabel || '').length > 22 ? (lv.selectedLabel || '').slice(0, 20) + '…' : lv.selectedLabel}
          </text>
        </g>
      );
      prevCx = cx; prevY = y;
      y += LEVEL_GAP;
    } else if (lv.isActive) {
      // Question label
      nodes.push(
        <g key={`qlabel-${li}`}>
          <text x={cx} y={y + 14} textAnchor="middle" fontSize={11} fontWeight="700" fill={T.muted} fontFamily="inherit" letterSpacing="0.04em">
            {lv.label.toUpperCase().slice(0, 32)}
          </text>
        </g>
      );

      const choiceCount = lv.choices.length;
      const perRow = Math.min(3, choiceCount);
      const choiceW = Math.floor((W - (perRow - 1) * 8) / perRow);
      const startY = y + 26;

      lv.choices.forEach((ch, ci) => {
        const row = Math.floor(ci / perRow);
        const col = ci % perRow;
        const cx2 = (choiceW + 8) * col + choiceW / 2;
        const cy2 = startY + row * (NODE_H + 8);

        // Line from question center to each choice
        lines.push(
          <line key={`cline-${li}-${ci}`} x1={cx} y1={y + 18} x2={cx2} y2={cy2} stroke={T.green} strokeWidth={1.5} opacity={0.25}/>
        );

        nodes.push(
          <g key={`choice-${li}-${ci}`} style={{cursor:'pointer'}} onClick={() => choose(ch, lv.step)}>
            <rect x={col * (choiceW + 8)} y={cy2} width={choiceW} height={NODE_H} rx={10}
              fill="#fff" stroke={T.line} strokeWidth={1.5}/>
            <text x={cx2} y={cy2 + 16} textAnchor="middle" fontSize={14} fontFamily="inherit">{ch.emoji}</text>
            <text x={cx2} y={cy2 + 30} textAnchor="middle" fontSize={10} fontWeight="600" fill={T.ink2} fontFamily="inherit">
              {ch.label.length > 12 ? ch.label.slice(0, 11) + '…' : ch.label}
            </text>
          </g>
        );
      });

      const rows = Math.ceil(choiceCount / perRow);
      prevCx = cx; prevY = startY + (rows - 1) * (NODE_H + 8);
      y = startY + rows * (NODE_H + 8) + 20;
    }
  });

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '10px 4px 100px' }}>
      {path.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 12px 8px' }}>
          <button onClick={reset} style={{ height: 28, padding: '0 12px', borderRadius: 999, background: T.bgAlt, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, color: T.ink2 }}>↺ Start over</button>
        </div>
      )}
      <svg ref={svgRef} width={W} height={Math.max(totalH, 300)} style={{ display: 'block', margin: '0 auto', overflow: 'visible' }}>
        {lines}
        {nodes}
      </svg>
      {done && result && (
        <div style={{ margin: '0 14px' }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: '14px 16px', boxShadow: `inset 0 0 0 1px ${T.line}`, marginTop: 8 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: T.ink, marginBottom: 10 }}>{result.title}</div>
            {result.steps.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start' }}>
                <div style={{ width: 20, height: 20, borderRadius: 999, background: T.green, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#fff', flexShrink: 0, marginTop: 1 }}>{i+1}</div>
                <div style={{ fontSize: 13, color: T.ink2, lineHeight: 1.45 }}>{s}</div>
              </div>
            ))}
          </div>
          <button onClick={reset} style={{ width: '100%', marginTop: 12, height: 46, borderRadius: 14, border: 'none', background: T.green, color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
            Ask another question
          </button>
        </div>
      )}
    </div>
  );
}

function AssistantScreen({ onTab, child, openMap, openProfile, openSwitcher }) {
  const [path, setPath] = React.useState([]);
  const [currentStep, setCurrentStep] = React.useState('start');
  const [done, setDone] = React.useState(false);
  const [viewMode, setViewMode] = React.useState('guide');
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [path, done]);

  const childName = child?.name || 'your child';

  const getCtx = () => {
    const category = path.find(p => p.step === 'start')?.choiceId;
    const age = path.find(p => p.step === 'age')?.choiceId;
    const sub = path.find(p => p.step === 'sub')?.choiceId;
    return { category, age, sub };
  };

  const getStepData = (step) => {
    if (step === 'sub') {
      const ctx = getCtx();
      const node = GUIDE_TREE.sub;
      const data = node.q(childName, ctx);
      return data ? { q: data.q, sub: null, choices: data.choices } : null;
    }
    const node = GUIDE_TREE[step];
    if (!node) return null;
    if (node.choices) return { q: typeof node.q === 'function' ? node.q(childName) : node.q, sub: node.sub, choices: node.choices };
    return null;
  };

  const getResultKey = () => {
    const ctx = getCtx();
    if (ctx.category === 'crisis') {
      const type = path.find(p => p.step === 'crisis_type')?.choiceId;
      return `crisis_${type}`;
    }
    return `${ctx.category}_${ctx.sub}`;
  };

  const choose = (choice, step) => {
    const newPath = [...path, { step, choiceId: choice.id, choiceLabel: choice.label, emoji: choice.emoji }];
    setPath(newPath);
    if (choice.next === 'result') {
      setCurrentStep('result');
      setDone(true);
    } else {
      setCurrentStep(choice.next);
    }
  };

  const reset = () => {
    setPath([]);
    setCurrentStep('start');
    setDone(false);
  };

  const result = done ? GUIDE_RESULTS[getResultKey()] : null;
  const stepData = !done ? getStepData(currentStep) : null;

  return (
    <Screen bg={T.bg} bottomTab={<TabBar active="assistant" onTab={onTab}/>}>
      {/* Header */}
      <div style={{ padding: '2px 18px 10px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 12, color: T.muted, fontWeight: 600, letterSpacing: '0.01em' }}>
              {(() => { const h = new Date().getHours(); return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'; })()},
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: T.ink, letterSpacing: '-0.025em', lineHeight: 1.15, marginTop: 1 }}>Guide</div>
          </div>
          {path.length > 0 && viewMode === 'guide' && (
            <button onClick={reset} style={{ height: 34, padding: '0 14px', borderRadius: 999, background: T.bgAlt, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, color: T.ink2 }}>
              ↺ Start over
            </button>
          )}
        </div>
        {/* View mode tabs */}
        <div style={{ display: 'flex', gap: 6, background: T.bgAlt, borderRadius: 12, padding: 4 }}>
          {[['guide', '☰  Assistant'], ['gps', '🗺  GPS']].map(([mode, label]) => (
            <button key={mode} onClick={() => setViewMode(mode)} style={{
              flex: 1, height: 34, borderRadius: 9, border: 'none', cursor: 'pointer',
              fontFamily: 'inherit', fontSize: 13, fontWeight: 700,
              background: viewMode === mode ? '#fff' : 'transparent',
              color: viewMode === mode ? T.ink : T.muted,
              boxShadow: viewMode === mode ? '0 1px 4px rgba(27,36,33,0.10)' : 'none',
              transition: 'all .15s',
            }}>{label}</button>
          ))}
        </div>
      </div>

      {/* GPS life journey view */}
      {viewMode === 'gps' && (
        <GPSMapContent child={child} openProfile={openProfile} openSwitcher={openSwitcher} embedded/>
      )}

      {/* Guide view */}
      {viewMode === 'guide' && (
        <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '0 14px 110px' }}>

          {/* Breadcrumb path */}
          {path.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
              {path.map((p, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4, height: 28, padding: '0 10px', borderRadius: 999, background: T.greenSoft, border: `1px solid rgba(45,106,79,0.15)`, fontSize: 12, fontWeight: 600, color: T.green }}>
                  <span>{p.emoji}</span><span>{p.choiceLabel}</span>
                </div>
              ))}
            </div>
          )}

          {/* Assistant question bubble */}
          {stepData && (
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 20 }}>
              <div style={{ width: 36, height: 36, borderRadius: 999, flexShrink: 0, background: `linear-gradient(150deg, ${T.green}, ${T.greenDeep})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon.Sparkle s={16} c="#fff"/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ background: '#fff', borderRadius: '4px 18px 18px 18px', padding: '14px 16px', boxShadow: `inset 0 0 0 1px ${T.line}` }}>
                  <div style={{ fontSize: 15.5, fontWeight: 700, color: T.ink, lineHeight: 1.35 }}>{stepData.q}</div>
                  {stepData.sub && <div style={{ fontSize: 13, color: T.muted, marginTop: 4, lineHeight: 1.4 }}>{stepData.sub}</div>}
                </div>
              </div>
            </div>
          )}

          {/* Choice cards */}
          {stepData && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginLeft: 46 }}>
              {stepData.choices.map(choice => (
                <button key={choice.id} onClick={() => choose(choice, currentStep)} style={{
                  width: '100%', padding: '14px 16px', background: '#fff', borderRadius: 16,
                  border: `1.5px solid ${T.line}`, cursor: 'pointer', fontFamily: 'inherit',
                  textAlign: 'left', display: 'flex', alignItems: 'center', gap: 12,
                  boxShadow: '0 2px 8px rgba(27,36,33,0.05)', transition: 'border-color .12s',
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = T.green}
                  onMouseLeave={e => e.currentTarget.style.borderColor = T.line}
                >
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: T.greenSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                    {choice.emoji}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14.5, fontWeight: 700, color: T.ink }}>{choice.label}</div>
                  </div>
                  <div style={{ fontSize: 18, color: T.muted, flexShrink: 0 }}>›</div>
                </button>
              ))}
            </div>
          )}

          {/* Result card */}
          {done && result && (
            <div style={{ marginLeft: 46 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: 999, flexShrink: 0, background: `linear-gradient(150deg, ${T.green}, ${T.greenDeep})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon.Sparkle s={16} c="#fff"/>
                </div>
                <div style={{ flex: 1, background: '#fff', borderRadius: '4px 18px 18px 18px', padding: '14px 16px', boxShadow: `inset 0 0 0 1px ${T.line}` }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: T.ink, marginBottom: 12 }}>Here's your guide: {result.title}</div>
                  {result.steps.map((step, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                      <div style={{ width: 22, height: 22, borderRadius: 999, background: T.green, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0, marginTop: 1 }}>{i + 1}</div>
                      <div style={{ fontSize: 13.5, color: T.ink2, lineHeight: 1.5, flex: 1 }}>{step}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ fontSize: 11, color: T.muted, textAlign: 'center', padding: '4px 0 0', lineHeight: 1.5 }}>
                Always confirm medical, legal, or crisis advice with a qualified professional.
              </div>
              <button onClick={reset} style={{ width: '100%', marginTop: 16, height: 48, borderRadius: 14, border: 'none', background: T.green, color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 14px rgba(45,106,79,0.28)' }}>
                Ask another question
              </button>
            </div>
          )}
        </div>
      )}
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
