// aTyp — Home (dashboard) tab. First tab in the bottom nav.
// Parent-centric: greeting intro, mood check-in, next event, today's routine, "For you".

const PARENT_NAME = 'Maria';

// Intro wishes — one is picked at random each time the intro plays.
const INTRO_WISHES = [
  "You're going to have a great day today. ✨",
  'Wishing you a calm and easy day. 🍃',
  "You're doing better than you think. 💚",
  'May today bring you a small win. 🌱',
  'Take it one step at a time today. ☀️',
  'Someone little is lucky to have you. 🤍',
];

// Mood check-in options + supportive follow-ups.
const MOODS = [
  { id: 'great',       emoji: '😊', label: 'Great',       reply: 'Love to hear it! Keep that energy.' },
  { id: 'okay',        emoji: '🙂', label: 'Okay',        reply: 'Steady days count too.' },
  { id: 'tired',       emoji: '😮‍💨', label: 'Tired',       reply: 'Remember to rest — you matter too.', guide: true },
  { id: 'overwhelmed', emoji: '😵‍💫', label: 'Overwhelmed', reply: "You're not alone. A short reset can help.", guide: true },
];

function HomeScreen({ onTab, openProfile, openStage, openQuestion, child, openSwitcher, openSection }) {
  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  })();

  // Intro greeting overlay — once per session (window flag survives tab switches).
  const [intro, setIntro] = React.useState(() => !window.__atypGreeted);
  const [introLeaving, setIntroLeaving] = React.useState(false);
  const played = React.useRef(!window.__atypGreeted).current; // stagger content only after the intro
  const wish = React.useRef(INTRO_WISHES[Math.floor(Math.random() * INTRO_WISHES.length)]).current;
  const dismissIntro = React.useCallback(() => {
    setIntroLeaving(true);
    setTimeout(() => setIntro(false), 380);
  }, []);
  React.useEffect(() => {
    if (!intro) return;
    window.__atypGreeted = true;
    const t = setTimeout(dismissIntro, 3600);
    return () => clearTimeout(t);
  }, []);

  // Mood — one answer per session.
  const [mood, setMood] = React.useState(() => window.__atypMood || null);
  const pickMood = (m) => { window.__atypMood = m; setMood(m); };

  const routineWithStatus = [
    { id: 'r1', time: '7:30 AM',  title: 'Morning melatonin', sub: '2.5 mg with water',              kind: 'med',     status: 'past'     },
    { id: 'r2', time: '8:00 AM',  title: 'GF/CF breakfast',   sub: 'No gluten · no dairy',           kind: 'meal',    status: 'past'     },
    { id: 'r3', time: '12:30 PM', title: 'Sensory break',     sub: '10 min · quiet corner',          kind: 'sensory', status: 'current'  },
    { id: 'r4', time: '4:00 PM',  title: 'Speech exercises',  sub: '15 min · /s/ & /r/ drills',      kind: 'therapy', status: 'upcoming' },
    { id: 'r5', time: '8:30 PM',  title: 'Wind-down routine', sub: 'Bath · weighted blanket · book', kind: 'sleep',   status: 'upcoming' },
  ];

  // Stagger sections in after the intro; no animation on plain tab returns.
  const rise = (i) => played ? { animation: 'atypRiseFade .5s ease both', animationDelay: `${0.12 + i * 0.09}s` } : {};

  return (
    <Screen bg={T.bg} bottomTab={<TabBar active="home" onTab={onTab}/>}>
      {/* Greeting header */}
      <div style={{ padding: '4px 18px 12px', ...rise(0) }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, color: T.muted, fontWeight: 600, letterSpacing: '0.01em' }}>{greeting},</div>
            <div style={{ fontSize: 26, fontWeight: 700, color: T.ink, letterSpacing: '-0.025em', lineHeight: 1.15, marginTop: 2 }}>
              {PARENT_NAME} <span style={{ fontSize: 22 }}>👋</span>
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

      {/* Mood check-in */}
      <div style={{ padding: '0 18px 16px', ...rise(1) }}>
        <MoodCheckIn mood={mood} onPick={pickMood} onGuide={() => onTab('assistant')}/>
      </div>

      {/* Next event */}
      <div style={{ padding: '0 18px 12px', ...rise(2) }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: T.ink2, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
          Next event
        </div>
        <button onClick={() => onTab('events')} style={{
          width: '100%', background: '#fff', borderRadius: 16, padding: '14px',
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
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: T.blue, textTransform: 'uppercase', letterSpacing: '0.04em' }}>In 6 days</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: T.ink, letterSpacing: '-0.01em', marginTop: 2, lineHeight: 1.25 }}>IEP Annual Review</div>
            <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>May 14 · 9:30 AM · Franklin Elementary</div>
          </div>
          <Icon.ChevronRight s={16} c={T.muted}/>
        </button>
      </div>

      {/* Today's routine */}
      <div style={{ padding: '8px 18px 12px', ...rise(3) }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.ink2, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Today's routine
            </div>
            <div style={{ fontSize: 11.5, color: T.muted, marginTop: 2 }}>5 items · ends at 8:30 PM</div>
          </div>
          {/* Child context chip — tap to switch child */}
          <button onClick={openSwitcher} title="Switch child" style={{
            display: 'flex', alignItems: 'center', gap: 7,
            background: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
            borderRadius: 999, padding: '5px 10px 5px 5px',
            boxShadow: `inset 0 0 0 1px ${T.line}`, flexShrink: 0,
          }}>
            <Avatar initials={child.initials} size={24} color={child.color}/>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: T.ink }}>{child.name}</span>
            <Icon.ChevronDown s={13} c={T.muted}/>
          </button>
        </div>
        <div style={{ background: '#fff', borderRadius: 16, boxShadow: `inset 0 0 0 1px ${T.line}`, overflow: 'hidden' }}>
          {routineWithStatus.map((r, i) => <ScheduleItem key={r.id} item={r} last={i === routineWithStatus.length - 1}/>)}
        </div>
      </div>

      {/* For you */}
      <div style={{ padding: '8px 18px 16px', ...rise(4) }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: T.ink2, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
          For you
        </div>
        <div style={{
          background: `linear-gradient(160deg, ${T.green} 0%, ${T.greenDeep} 100%)`,
          borderRadius: 18, padding: '16px 16px 14px', color: '#fff',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', right: -28, top: -28, width: 110, height: 110, borderRadius: 999, background: 'rgba(255,255,255,0.07)' }}/>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', opacity: 0.85, textTransform: 'uppercase' }}>
            <Icon.Sparkle s={13} c="#fff"/> Guide suggestion
          </div>
          <div style={{ fontSize: 15.5, fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.3, marginTop: 7, position: 'relative' }}>
            {child.name}'s IEP review is coming up
          </div>
          <div style={{ fontSize: 12.5, opacity: 0.85, lineHeight: 1.5, marginTop: 4, position: 'relative' }}>
            A little prep goes a long way. See what to request, bring, and ask at the meeting.
          </div>
          <button onClick={() => onTab('assistant')} style={{
            marginTop: 12, height: 38, padding: '0 16px', borderRadius: 999, border: 'none',
            background: 'rgba(255,255,255,0.92)', color: T.green, cursor: 'pointer',
            fontFamily: 'inherit', fontSize: 13, fontWeight: 700,
            display: 'inline-flex', alignItems: 'center', gap: 6, position: 'relative',
          }}>
            Prepare with Guide <Icon.ChevronRight s={14} c={T.green}/>
          </button>
        </div>
      </div>

      {/* Intro greeting overlay — once per session */}
      {intro && (
        <div onClick={dismissIntro} style={{
          position: 'absolute', inset: 0, zIndex: 150, background: T.bg,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end',
          paddingBottom: 140, cursor: 'pointer',
          animation: introLeaving ? 'atypIntroOut .38s ease both' : 'none',
        }}>
          <div style={{
            width: 54, height: 54, borderRadius: 999, marginBottom: 18,
            background: `linear-gradient(140deg, ${T.green}, ${T.greenDeep})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 10px 26px rgba(45,106,79,0.28)',
            animation: 'atypBubbleIn .45s cubic-bezier(.2,.8,.2,1) both',
          }}>
            <Icon.Sparkle s={24} c="#fff"/>
          </div>
          <div style={{
            background: '#fff', borderRadius: '20px 20px 20px 6px', padding: '13px 18px',
            boxShadow: `inset 0 0 0 1px ${T.line}, 0 10px 28px rgba(27,36,33,0.08)`,
            fontSize: 16.5, fontWeight: 700, color: T.ink, letterSpacing: '-0.01em',
            animation: 'atypBubbleIn .45s cubic-bezier(.2,.8,.2,1) both', animationDelay: '.15s',
          }}>
            Hello {PARENT_NAME} 👋
          </div>
          <div style={{
            marginTop: 8, background: '#fff', borderRadius: '20px 20px 20px 6px', padding: '13px 18px',
            maxWidth: 260, textAlign: 'center', lineHeight: 1.45,
            boxShadow: `inset 0 0 0 1px ${T.line}, 0 10px 28px rgba(27,36,33,0.08)`,
            fontSize: 15, fontWeight: 600, color: T.ink2,
            animation: 'atypBubbleIn .45s cubic-bezier(.2,.8,.2,1) both', animationDelay: '.85s',
          }}>
            {wish}
          </div>
        </div>
      )}

    </Screen>
  );
}

window.HomeScreen = HomeScreen;

// ── Mood check-in card ─────────────────────────────────────────────────

function MoodCheckIn({ mood, onPick, onGuide }) {
  const picked = mood ? MOODS.find(m => m.id === mood.id) || mood : null;

  if (picked) {
    return (
      <div style={{
        background: '#fff', borderRadius: 16, padding: '12px 14px',
        boxShadow: `inset 0 0 0 1px ${T.line}`,
        display: 'flex', alignItems: 'center', gap: 12,
        animation: 'atypFadeIn .25s ease',
      }}>
        <div style={{
          width: 38, height: 38, borderRadius: 999, background: T.greenSoft, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 19,
        }}>{picked.emoji}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: T.ink, letterSpacing: '-0.01em' }}>
            Thanks for sharing
          </div>
          <div style={{ fontSize: 12, color: T.muted, marginTop: 1, lineHeight: 1.4 }}>{picked.reply}</div>
        </div>
        {picked.guide && (
          <button onClick={onGuide} style={{
            height: 32, padding: '0 12px', borderRadius: 999, border: 'none', flexShrink: 0,
            background: T.greenSoft, color: T.green, cursor: 'pointer',
            fontFamily: 'inherit', fontSize: 12, fontWeight: 700,
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            <Icon.Sparkle s={13} c={T.green}/> Guide
          </button>
        )}
      </div>
    );
  }

  return (
    <div style={{
      background: '#fff', borderRadius: 16, padding: '14px 14px 12px',
      boxShadow: `inset 0 0 0 1px ${T.line}`,
    }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: T.ink, letterSpacing: '-0.01em' }}>
        How are you today?
      </div>
      <div style={{ fontSize: 11.5, color: T.muted, marginTop: 2 }}>Checking in on you — not just the kids.</div>
      <div style={{ display: 'flex', gap: 7, marginTop: 11 }}>
        {MOODS.map(m => (
          <button key={m.id} onClick={() => onPick(m)} style={{
            flex: 1, border: 'none', cursor: 'pointer', fontFamily: 'inherit',
            background: T.bgAlt, borderRadius: 12, padding: '9px 2px 8px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
          }}>
            <span style={{ fontSize: 20, lineHeight: 1 }}>{m.emoji}</span>
            <span style={{ fontSize: 10.5, fontWeight: 700, color: T.ink2 }}>{m.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

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
