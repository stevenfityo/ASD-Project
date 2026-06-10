// aTyp — Home (dashboard) tab. First tab in the bottom nav.

function HomeScreen({ onTab, openProfile, openStage, openQuestion, child, openSwitcher }) {
  const stages = stagesForChild(child.id);
  const curStage = stages.find(s => s.status === 'current') || stages[0];
  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  })();

  // Daily routine — typical for kids on the spectrum.
  // Each item recurs every day; ✓ tracks today only.
  const routineSeed = [
    { id: 'r1', time: '7:30 AM', title: 'Morning melatonin', sub: '2.5 mg with water', kind: 'med',     done: true  },
    { id: 'r2', time: '8:00 AM', title: 'GF/CF breakfast',   sub: 'No gluten · no dairy', kind: 'meal', done: true  },
    { id: 'r3', time: '12:30 PM', title: 'Sensory break',    sub: '10 min · quiet corner', kind: 'sensory', done: true },
    { id: 'r4', time: '4:00 PM', title: 'Speech exercises',  sub: '15 min · /s/ & /r/ drills', kind: 'therapy', done: false },
    { id: 'r5', time: '8:30 PM', title: 'Wind-down routine', sub: 'Bath · weighted blanket · book', kind: 'sleep', done: false },
  ];
  const [routine, setRoutine] = React.useState(routineSeed);
  const toggle = (id) => setRoutine(rs => rs.map(r => r.id === id ? { ...r, done: !r.done } : r));
  const doneCount = routine.filter(r => r.done).length;

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
          <button style={{
            width: 42, height: 42, borderRadius: 999, border: 'none', cursor: 'pointer',
            background: '#fff', boxShadow: `inset 0 0 0 1px ${T.line}`, position: 'relative',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon.Bell s={20} c={T.ink2}/>
            <div style={{
              position: 'absolute', top: 8, right: 9, width: 8, height: 8, borderRadius: 999,
              background: T.green, border: '2px solid #fff',
            }}/>
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
          Today
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: T.ink2, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Today's routine
          </div>
          <button onClick={openProfile} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: 'inherit', fontSize: 12, fontWeight: 700, color: T.green,
          }}>Edit →</button>
        </div>

        {/* Progress strip */}
        <div style={{
          background: '#fff', borderRadius: 14, padding: '10px 14px',
          boxShadow: `inset 0 0 0 1px ${T.line}`,
          display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10,
        }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: T.green, letterSpacing: '-0.02em', minWidth: 44 }}>
            {doneCount}<span style={{ color: T.muted, fontSize: 14, fontWeight: 600 }}>/{routine.length}</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12.5, color: T.ink2, fontWeight: 600, marginBottom: 5, letterSpacing: '-0.005em' }}>
              {doneCount === routine.length ? 'All done — nice work today.' : `${routine.length - doneCount} task${routine.length - doneCount === 1 ? '' : 's'} to go`}
            </div>
            <div style={{ height: 5, background: T.line, borderRadius: 999, overflow: 'hidden' }}>
              <div style={{
                width: `${(doneCount / routine.length) * 100}%`, height: '100%',
                background: T.green, transition: 'width .25s',
              }}/>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {routine.map(r => <RoutineItem key={r.id} item={r} onToggle={() => toggle(r.id)}/>)}
        </div>


      </div>

      {/* Assistant highlight */}
      <div style={{ padding: '8px 18px 12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: T.ink2, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Ask the assistant</div>
          <button onClick={() => onTab('assistant')} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: 'inherit', fontSize: 12, fontWeight: 700, color: T.green,
          }}>Open →</button>
        </div>
        <button onClick={() => onTab('assistant')} style={{
          width: '100%', background: `linear-gradient(160deg, #FFFFFF 0%, ${T.greenSoft} 140%)`,
          borderRadius: 18, padding: '16px',
          boxShadow: `inset 0 0 0 1px ${T.line}`, border: 'none', cursor: 'pointer',
          fontFamily: 'inherit', textAlign: 'left',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 12,
              background: `linear-gradient(150deg, ${T.green}, ${T.greenDeep})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(45,106,79,0.22)',
            }}>
              <Icon.Sparkle s={20} c="#fff"/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14.5, fontWeight: 700, color: T.ink, letterSpacing: '-0.01em' }}>
                aTyp Assistant
              </div>
              <div style={{ fontSize: 12, color: T.muted, marginTop: 1 }}>
                Personalized to {child.name} · {child.currentStageLabel}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              'Prepare for tomorrow\'s IEP meeting',
              'Help me write an email to the teacher',
              'Signs of sensory overload to watch for',
            ].map(p => (
              <div key={p} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: 'rgba(255,255,255,0.7)', borderRadius: 12,
                padding: '9px 12px',
                boxShadow: `inset 0 0 0 1px ${T.line}`,
                fontSize: 13, color: T.ink2, fontWeight: 600, letterSpacing: '-0.005em',
              }}>
                <Icon.Sparkle s={13} c={T.green} sw={1.8}/>
                <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p}</span>
                <Icon.ChevronRight s={14} c={T.muted}/>
              </div>
            ))}
          </div>
        </button>
      </div>
    </Screen>
  );
}

window.HomeScreen = HomeScreen;

// Routine item — checkable task. Tap circle to toggle done.
function RoutineItem({ item, onToggle }) {
  const kinds = {
    med:     { I: Icon.Hospital,  tint: '#C25450', bg: '#F5E1E0' },
    meal:    { I: Icon.Bulb,      tint: '#9C5E3A', bg: '#F2E4D8' },
    sensory: { I: Icon.Brain,     tint: T.blue,    bg: '#E4EEF6' },
    therapy: { I: Icon.Pen,       tint: T.green,   bg: T.greenSoft },
    sleep:   { I: Icon.Bookmark,  tint: '#8B5BAE', bg: '#EDE3F4' },
  };
  const k = kinds[item.kind] || kinds.therapy;
  const done = item.done;

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      background: done ? 'rgba(255,255,255,0.55)' : '#fff',
      borderRadius: 14, padding: '11px 12px 11px 11px',
      boxShadow: `inset 0 0 0 1px ${T.line}`,
      transition: 'background .15s, opacity .15s',
      opacity: done ? 0.72 : 1,
    }}>
      <button onClick={onToggle} aria-label={done ? 'Mark not done' : 'Mark done'} style={{
        width: 28, height: 28, borderRadius: 999, border: 'none', cursor: 'pointer',
        background: done ? T.green : 'transparent',
        boxShadow: done ? 'none' : `inset 0 0 0 1.8px ${T.line}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        padding: 0, transition: 'background .15s',
      }}>
        {done && <Icon.Check s={16} c="#fff" sw={3}/>}
      </button>
      <div style={{
        width: 34, height: 34, borderRadius: 10, background: k.bg, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <k.I s={18} c={k.tint}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 14.5, fontWeight: 700, color: T.ink, letterSpacing: '-0.01em', lineHeight: 1.25,
          textDecoration: done ? 'line-through' : 'none',
          textDecorationColor: T.muted, textDecorationThickness: '1.5px',
        }}>{item.title}</div>
        <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>{item.sub}</div>
      </div>
      <div style={{
        fontSize: 11.5, fontWeight: 700, color: T.ink2,
        background: T.bgAlt, padding: '4px 8px', borderRadius: 999,
        whiteSpace: 'nowrap', flexShrink: 0, letterSpacing: '0.01em',
      }}>{item.time}</div>
    </div>
  );
}
