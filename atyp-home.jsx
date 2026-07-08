// aTyp — Home (dashboard) tab. First tab in the bottom nav.

function HomeScreen({ onTab, openProfile, openStage, openQuestion, child, openSwitcher, openSection }) {
  const stages = stagesForChild(child.id);
  const curStage = stages.find(s => s.status === 'current') || stages[0];
  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  })();

  const routineWithStatus = [
    { id: 'r1', time: '7:30 AM',  title: 'Morning melatonin', sub: '2.5 mg with water',              kind: 'med',     status: 'past'     },
    { id: 'r2', time: '8:00 AM',  title: 'GF/CF breakfast',   sub: 'No gluten · no dairy',           kind: 'meal',    status: 'past'     },
    { id: 'r3', time: '12:30 PM', title: 'Sensory break',     sub: '10 min · quiet corner',          kind: 'sensory', status: 'current'  },
    { id: 'r4', time: '4:00 PM',  title: 'Speech exercises',  sub: '15 min · /s/ & /r/ drills',      kind: 'therapy', status: 'upcoming' },
    { id: 'r5', time: '8:30 PM',  title: 'Wind-down routine', sub: 'Bath · weighted blanket · book', kind: 'sleep',   status: 'upcoming' },
  ];

  return (
    <Screen bg={T.bg} bottomTab={<TabBar active="home" onTab={onTab}/>}>
      {/* Greeting + child card */}
      <div style={{ padding: '4px 18px 10px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, color: T.muted, fontWeight: 600, letterSpacing: '0.01em' }}>{greeting},</div>
            <div style={{ fontSize: 26, fontWeight: 700, color: T.ink, letterSpacing: '-0.025em', lineHeight: 1.15, marginTop: 2 }}>
              Maria
            </div>
          </div>
          <button onClick={() => onTab('profile')} title="Account" aria-label="Account" style={{
            width: 42, height: 42, borderRadius: 999, border: 'none', cursor: 'pointer',
            background: '#fff', boxShadow: `inset 0 0 0 1px ${T.line}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon.User s={20} c={T.ink2}/>
          </button>
        </div>
      </div>

      {/* Child card — tap avatar opens profile */}
      <div style={{ padding: '6px 18px 16px' }}>
        <div style={{
          background: `linear-gradient(160deg, ${T.green} 0%, ${T.greenDeep} 100%)`,
          borderRadius: 22, padding: '18px 18px 16px', color: '#fff',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', right: -32, top: -32, width: 130, height: 130, borderRadius: 999, background: 'rgba(255,255,255,0.07)' }}/>
          <div style={{ position: 'absolute', right: 40, bottom: -50, width: 90, height: 90, borderRadius: 999, background: 'rgba(255,255,255,0.06)' }}/>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, position: 'relative' }}>
            <button onClick={openProfile} style={{
              background: 'none', border: 'none', padding: 0, cursor: 'pointer',
              borderRadius: 999, boxShadow: '0 0 0 3px rgba(255,255,255,0.2)',
            }}>
              <Avatar initials={child.initials} size={56} color="#fff"/>
            </button>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 19, fontWeight: 700, letterSpacing: '-0.02em' }}>{child.name}</div>
              <div style={{ fontSize: 12.5, opacity: 0.85, marginTop: 2 }}>{child.dob} ({child.age} years old)</div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                background: 'rgba(255,255,255,0.18)', padding: '3px 9px', borderRadius: 999,
                fontSize: 10.5, fontWeight: 700, letterSpacing: '0.04em', marginTop: 7,
              }}>
                <span style={{ width: 5, height: 5, borderRadius: 999, background: T.mint }}/>
                {child.diagnosis.toUpperCase()}
              </div>
            </div>
            <button onClick={openSwitcher} style={{
              background: 'rgba(255,255,255,0.16)', border: 'none', cursor: 'pointer',
              color: '#fff', borderRadius: 999, width: 36, height: 36,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }} title="Switch child">
              <Icon.Switch s={18} c="#fff"/>
            </button>
          </div>
        </div>
      </div>

      {/* Today's snapshot */}
      <div style={{ padding: '0 18px 12px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: T.ink2, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
          Calendar Events
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button onClick={() => onTab('events')} style={{
            background: '#fff', borderRadius: 16, padding: '14px',
            boxShadow: `inset 0 0 0 1px ${T.line}`, border: 'none', cursor: 'pointer',
            fontFamily: 'inherit', textAlign: 'left',
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12, background: `${T.blue}1A`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Icon.Calendar s={20} c={T.blue}/>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.blue, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Next event</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: T.ink, letterSpacing: '-0.01em', marginTop: 2, lineHeight: 1.25 }}>IEP Annual Review</div>
              <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>May 14 · 9:30 AM</div>
            </div>
          </button>
        </div>
      </div>

      {/* Today's routine */}
      <div style={{ padding: '8px 18px 12px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: T.ink2, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>
          Today's routine
        </div>
        <div style={{ fontSize: 11.5, color: T.muted, marginBottom: 10 }}>5 items · ends at 8:30 PM</div>
        <div style={{ background: '#fff', borderRadius: 16, boxShadow: `inset 0 0 0 1px ${T.line}`, overflow: 'hidden' }}>
          {routineWithStatus.map((r, i) => <ScheduleItem key={r.id} item={r} last={i === routineWithStatus.length - 1}/>)}
        </div>
      </div>

    </Screen>
  );
}

window.HomeScreen = HomeScreen;

function ScheduleItem({ item, last }) {
  const kinds = {
    med:     { I: Icon.Hospital,  tint: '#C25450', bg: '#F5E1E0' },
    meal:    { I: Icon.Bulb,      tint: '#9C5E3A', bg: '#F2E4D8' },
    sensory: { I: Icon.Brain,     tint: T.blue,    bg: '#E4EEF6' },
    therapy: { I: Icon.Pen,       tint: T.green,   bg: T.greenSoft },
    sleep:   { I: Icon.Bookmark,  tint: '#8B5BAE', bg: '#EDE3F4' },
  };
  const k = kinds[item.kind] || kinds.therapy;

  const past = item.status === 'past';
  const current = item.status === 'current';

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '10px 14px',
      borderBottom: last ? 'none' : `1px solid ${T.line}`,
      background: current ? `${T.green}08` : 'transparent',
      borderLeft: current ? `3px solid ${T.green}` : '3px solid transparent',
      opacity: past ? 0.4 : 1,
    }}>
      {/* Time */}
      <div style={{ width: 44, flexShrink: 0, textAlign: 'right' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: current ? T.green : T.muted, letterSpacing: '0.01em', lineHeight: 1.2 }}>
          {item.time}
        </div>
      </div>

      {/* Icon */}
      <div style={{
        width: 30, height: 30, borderRadius: 8, background: k.bg, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <k.I s={15} c={k.tint}/>
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13.5, fontWeight: 700, color: T.ink, letterSpacing: '-0.01em', lineHeight: 1.25 }}>
          {item.title}
        </div>
        <div style={{ fontSize: 11, color: T.muted, marginTop: 1 }}>{item.sub}</div>
      </div>

      {current && (
        <div style={{
          fontSize: 10, fontWeight: 700, color: T.green,
          background: `${T.green}18`, padding: '3px 8px', borderRadius: 999,
          letterSpacing: '0.03em', flexShrink: 0,
        }}>Now</div>
      )}
    </div>
  );
}
