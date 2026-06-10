// aTyp — Map (winding age path), Stage Detail, Question Detail.
// Original interpretation of the "vertical journey path" pattern.

// All stages unlocked — parents can browse all questions across every age group.
// Visual status is computed per child via `stagesForChild(childId)` below.
const AGE_STAGES_BASE = [
  { id: 'a1', label: 'Ages 1–3',   sub: 'Early signs',         total: 24 },
  { id: 'a2', label: 'Ages 4–8',   sub: 'School begins',       total: 31 },
  { id: 'a3', label: 'Ages 9–13',  sub: 'Critical planning',   total: 24 },
  { id: 'a4', label: 'Ages 14–17', sub: 'Adolescence',         total: 22 },
  { id: 'a5', label: 'Ages 18–21', sub: 'Legal adulthood',     total: 28 },
  { id: 'a6', label: 'Ages 22–30', sub: 'Independence',        total: 19 },
  { id: 'a7', label: 'Ages 31–40', sub: 'Adult life',          total: 16 },
  { id: 'a8', label: 'Ages 40+',   sub: 'Long-term care',      total: 14 },
];

// Per-child progress overrides: { childId: { stageId: doneCount } }
const STAGE_PROGRESS = {
  emma: { a1: 24, a2: 31, a3: 6,  a4: 0, a5: 0, a6: 0, a7: 0, a8: 0 },
  liam: { a1: 24, a2: 31, a3: 24, a4: 22, a5: 28, a6: 7, a7: 0, a8: 0 },
};

function stagesForChild(childId) {
  const child = (window.CHILDREN || []).find(c => c.id === childId) || (window.CHILDREN || [])[0];
  const curIdx = AGE_STAGES_BASE.findIndex(s => s.id === child.currentStageId);
  return AGE_STAGES_BASE.map((s, i) => {
    let status;
    if (i < curIdx) status = 'completed';
    else if (i === curIdx) status = 'current';
    else status = 'upcoming';
    const done = (STAGE_PROGRESS[childId] || {})[s.id] ?? 0;
    return { ...s, done, status };
  });
}

// Backwards-compatible export (Emma's view) for any code still referencing AGE_STAGES.
const AGE_STAGES = stagesForChild('emma');

// Layout constants for the map
const NODE_R = 38;
const PATH_W = 322;     // 390 minus 34 horizontal margin each side
const ROW_H = 142;
const MAP_H = ROW_H * AGE_STAGES.length + 80;
const SWING = 86;       // horizontal swing of the winding path

function stageX(i) {
  // sine wave swing centered in the path
  return PATH_W / 2 + Math.sin(i * 1.05) * SWING;
}
function stageY(i) {
  return 60 + i * ROW_H;
}

function MapScreen({ go, back, openStage, onTab, openProfile, child, openSwitcher }) {
  const stages = stagesForChild(child.id);
  const scrollRef = React.useRef(null);
  const [view, setView] = React.useState('map');

  // Scroll to current stage on mount/child change
  React.useEffect(() => {
    const cur = stages.findIndex(s => s.status === 'current');
    if (scrollRef.current && cur >= 0) {
      scrollRef.current.scrollTop = stageY(cur) - 200;
    }
  }, [child.id]);

  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative', background: T.bg,
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
    }}>
      {/* Top bar — child switcher */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 6,
        paddingTop: 56, paddingBottom: 14, paddingInline: 18,
        background: 'linear-gradient(180deg, rgba(248,246,241,0.96) 60%, rgba(248,246,241,0))',
      }}>
        {/* Back button */}
        {back && (
          <button onClick={back} style={{
            height: 34, padding: '0 14px 0 10px', borderRadius: 999, border: 'none',
            background: '#fff', boxShadow: `inset 0 0 0 1px ${T.line}`,
            cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 700,
            color: T.ink2, display: 'flex', alignItems: 'center', gap: 5, marginBottom: 10,
          }}>
            <Icon.Back s={16} c={T.ink2}/> Assistant
          </button>
        )}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          background: '#fff', borderRadius: 999, padding: '6px 14px 6px 6px',
          boxShadow: `inset 0 0 0 1px ${T.line}`,
        }}>

          <button onClick={openProfile} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
            <Avatar initials={child.initials} size={42} color={child.color}/>
          </button>
          <button onClick={openProfile} style={{ flex: 1, background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: T.ink, letterSpacing: '-0.01em' }}>{child.name} · Age {child.age}</div>
            <div style={{ fontSize: 12, color: T.muted }}>Tap to open profile</div>
          </button>
          <button onClick={openSwitcher} style={{
            width: 32, height: 32, borderRadius: 999, border: 'none',
            background: T.greenSoft, color: T.green, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon.Switch s={18} c={T.green}/>
          </button>
        </div>

        {/* Map / List toggle */}
        <div style={{ display: 'flex', background: T.line, borderRadius: 999, padding: 3, marginTop: 10, gap: 2 }}>
          {[['map', Icon.Map || Icon.Bookmark, 'Map'], ['list', Icon.Clipboard, 'List']].map(([k, Ic, lbl]) => (
            <button key={k} onClick={() => setView(k)} style={{
              flex: 1, height: 32, borderRadius: 999, border: 'none', cursor: 'pointer',
              fontFamily: 'inherit', fontSize: 13, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
              background: view === k ? '#fff' : 'transparent',
              color: view === k ? T.ink : T.muted,
              boxShadow: view === k ? '0 1px 4px rgba(27,36,33,0.10)' : 'none',
              transition: 'background .15s'
            }}>
              <Ic s={14} c={view === k ? T.ink : T.muted}/> {lbl}
            </button>
          ))}
        </div>
      </div>

      {/* Scroll area */}
      <div ref={scrollRef} style={{
        flex: 1, overflowY: 'auto', overflowX: 'hidden',
        paddingTop: 185, paddingBottom: 110,
      }}>

      {view === 'list' ? (
        <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {stages.map((st, i) => {
            const pct = st.total > 0 ? Math.round((st.done / st.total) * 100) : 0;
            const clr = st.status === 'completed' ? T.green : st.status === 'current' ? T.green : T.muted;
            return (
              <button key={st.id} onClick={() => st.status !== 'locked' && openStage(st.id)} style={{
                background: '#fff', borderRadius: 16, padding: '14px 16px',
                boxShadow: st.status === 'current' ? `inset 0 0 0 2px ${T.green}` : `inset 0 0 0 1px ${T.line}`,
                border: 'none', cursor: st.status === 'upcoming' ? 'default' : 'pointer',
                fontFamily: 'inherit', textAlign: 'left', opacity: st.status === 'upcoming' ? 0.55 : 1,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                    background: st.status === 'completed' ? T.green : st.status === 'current' ? T.greenSoft : T.bgAlt,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, fontWeight: 700,
                    color: st.status === 'completed' ? '#fff' : clr
                  }}>
                    {st.status === 'completed' ? <Icon.Check s={18} c="#fff" sw={2.5}/> : i + 1}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <span style={{ fontSize: 15, fontWeight: 700, color: T.ink, letterSpacing: '-0.01em' }}>{st.label}</span>
                      {st.status === 'current' && <span style={{ fontSize: 10.5, fontWeight: 700, color: T.green, background: T.greenSoft, padding: '2px 7px', borderRadius: 999 }}>Current</span>}
                    </div>
                    <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>{st.sub}</div>
                    {st.status !== 'upcoming' && (
                      <div style={{ marginTop: 8 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: T.muted, fontWeight: 600, marginBottom: 4 }}>
                          <span>{st.done} of {st.total} done</span>
                          <span style={{ color: clr }}>{pct}%</span>
                        </div>
                        <div style={{ height: 4, background: T.line, borderRadius: 999, overflow: 'hidden' }}>
                          <div style={{ width: `${pct}%`, height: '100%', background: T.green, borderRadius: 999 }}/>
                        </div>
                      </div>
                    )}
                  </div>
                  {st.status !== 'upcoming' && <Icon.ChevronRight s={16} c={T.muted}/>}
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div style={{
          position: 'relative', width: PATH_W, height: MAP_H, margin: '0 auto',
        }}>
          {/* Path SVG */}
          <svg width={PATH_W} height={MAP_H} style={{ position: 'absolute', inset: 0 }}>
            {stages.map((_, i) => {
              if (i === 0) return null;
              const x1 = stageX(i - 1), y1 = stageY(i - 1);
              const x2 = stageX(i),     y2 = stageY(i);
              const status = stages[i - 1].status;
              const stroke = (status === 'completed') ? T.mint : (status === 'current' ? T.green : '#D6D9D2');
              const opacity = (status === 'locked' || stages[i].status === 'locked') ? 0.55 : 1;
              return (
                <path key={i}
                  d={`M${x1},${y1} C${x1},${(y1+y2)/2} ${x2},${(y1+y2)/2} ${x2},${y2}`}
                  stroke={stroke} strokeWidth="3" strokeDasharray="2 7" strokeLinecap="round"
                  fill="none" opacity={opacity}/>
              );
            })}
          </svg>

          {/* Nodes */}
          {stages.map((st, i) => (
            <MapNode key={st.id} stage={st} x={stageX(i)} y={stageY(i)}
              onClick={() => st.status !== 'locked' && openStage(st.id)} />
          ))}


        </div>
      )}
      </div>

      <TabBar active="assistant" onTab={onTab}/>
    </div>
  );
}

function MapNode({ stage, x, y, onClick }) {
  const completed = stage.status === 'completed';
  const current = stage.status === 'current';
  const locked = stage.status === 'locked';
  const upcoming = stage.status === 'upcoming';

  const r = current ? 46 : 38;
  const ringSize = current ? 116 : 96;

  let bg, fg, ring;
  if (completed) { bg = T.mint; fg = '#fff'; ring = T.mint; }
  else if (current) { bg = T.green; fg = '#fff'; ring = T.green; }
  else if (upcoming) { bg = '#fff'; fg = T.ink; ring = T.line; }
  else { bg = '#EEEFEA'; fg = T.muted; ring = T.line; }

  return (
    <div style={{
      position: 'absolute',
      left: x - ringSize / 2, top: y - ringSize / 2,
      width: ringSize, height: ringSize,
      cursor: locked ? 'default' : 'pointer',
      opacity: locked ? 0.6 : 1,
    }} onClick={onClick}>
      {/* Glowing ring for current */}
      {current && (
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 999,
          background: T.greenSoft,
          animation: 'atypPulse 2.4s ease-in-out infinite',
        }}/>
      )}
      {/* Progress ring */}
      <div style={{ position: 'absolute', inset: (ringSize - r * 2 - 18) / 2 }}>
        <ProgressRing
          size={r * 2 + 18} stroke={5}
          value={stage.done} max={stage.total}
          color={completed ? T.green : (current ? '#fff' : T.muted)}
          track={completed ? 'rgba(45,106,79,0.18)' : (current ? 'rgba(255,255,255,0.32)' : T.line)}
        />
      </div>
      {/* Inner circle */}
      <div style={{
        position: 'absolute', left: (ringSize - r * 2) / 2, top: (ringSize - r * 2) / 2,
        width: r * 2, height: r * 2, borderRadius: 999,
        background: bg, color: fg,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        boxShadow: current ? '0 12px 28px rgba(45,106,79,0.35)' : (completed ? '0 6px 14px rgba(45,106,79,0.18)' : 'none'),
        border: upcoming ? `1.5px solid ${T.line}` : 'none',
      }}>
        {completed ? (
          <Icon.Check s={28} c="#fff" sw={3}/>
        ) : locked ? (
          <Icon.Lock s={20} c={T.muted}/>
        ) : (
          <>
            <div style={{ fontSize: current ? 11 : 9, fontWeight: 700, opacity: 0.75, letterSpacing: '0.04em' }}>
              {stage.label.replace('Ages ', '').replace('–', '–')}
            </div>
            <div style={{ fontSize: current ? 12 : 10, fontWeight: 700, opacity: 0.85, marginTop: 2, letterSpacing: '-0.01em' }}>
              {stage.done}/{stage.total}
            </div>
            <div style={{ fontSize: current ? 9 : 8, opacity: 0.65, fontWeight: 600 }}>done</div>
          </>
        )}
      </div>
      {/* Caption — sub only, no duplicate label */}
      <div style={{
        position: 'absolute', top: ringSize + 4, left: '50%', transform: 'translateX(-50%)',
        textAlign: 'center', whiteSpace: 'nowrap',
      }}>
        <div style={{ fontSize: 11, color: locked ? T.muted : T.muted, marginTop: 1 }}>
          {locked ? 'Locked' : stage.sub}
        </div>
      </div>
    </div>
  );
}

// ── Stage Detail ────────────────────────────────────────────────────────

const CATEGORIES = ['Medical', 'Therapy', 'Education', 'Finance', 'Legal', 'Daily Life', 'Family', 'Crisis'];

const STAGE_QUESTIONS = {
  Medical: [
    { id: 'q1', q: 'What is my medical routine?', done: true },
    { id: 'q2', q: 'Which doctor should I talk to?', done: true },
    { id: 'q3', q: 'What should I expect from my doctor?', done: false },
    { id: 'q4', q: 'Should I consider medications or supplements?', done: false },
    { id: 'q5', q: 'What do I do in case of a medical emergency?', done: false },
    { id: 'q6', q: 'How do I manage co-occurring conditions?', done: false },
    { id: 'q7', q: 'When should I update Emma\'s medical records?', done: false },
  ],
  Therapy: [
    { id: 't1', q: 'Is ABA still appropriate at this age?', done: false },
    { id: 't2', q: 'How do I find a speech therapist for older kids?', done: false },
    { id: 't3', q: 'What does occupational therapy look like now?', done: false },
  ],
  Education: [
    { id: 'e1', q: 'What is an IEP and what should it include?', done: false },
    { id: 'e2', q: 'How do I prepare for the middle school transition?', done: false },
    { id: 'e3', q: 'What are my rights at parent-teacher meetings?', done: false },
  ],
  Finance: [], Legal: [], 'Daily Life': [], Family: [], Crisis: [],
};

function StageDetailScreen({ stageId, back, openQuestion, doneIds, child }) {
  const stages = stagesForChild((child && child.id) || 'emma');
  const stage = stages.find(s => s.id === stageId) || stages[2];
  const [cat, setCat] = React.useState('Medical');
  const qs = STAGE_QUESTIONS[cat] || [];
  const completed = qs.filter(q => q.done || doneIds.has(q.id)).length;

  return (
    <Screen bg={T.bg}>
      <ScreenHeader
        title={stage.label}
        subtitle={stage.sub}
        onBack={back}
      />
      <div style={{ padding: '0 18px' }}>
        {/* Stage description */}
        <div style={{
          background: T.greenSoft, borderRadius: 18,
          padding: '16px 18px', display: 'flex', gap: 12, alignItems: 'flex-start',
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 999, background: T.green, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <Icon.Bulb s={18} c="#fff"/>
          </div>
          <div style={{ fontSize: 14, color: T.ink2, lineHeight: 1.45 }}>
            This is a <strong style={{ color: T.green }}>critical planning period</strong>. School transitions, puberty, and legal preparations all begin here.
          </div>
        </div>

        {/* Category tabs */}
        <div style={{
          marginTop: 18, marginInline: -18, paddingInline: 18,
          overflowX: 'auto', whiteSpace: 'nowrap',
        }}>
          <div style={{ display: 'inline-flex', gap: 8 }}>
            {CATEGORIES.map(c => (
              <Chip key={c} active={cat === c} onClick={() => setCat(c)}>{c}</Chip>
            ))}
            <div style={{ width: 8, flexShrink: 0 }}/>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ marginTop: 22, marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: T.ink, letterSpacing: '-0.01em' }}>
              {cat}: {completed} of {qs.length} completed
            </div>
            <div style={{ fontSize: 12, color: T.muted, fontWeight: 600 }}>{qs.length ? Math.round(completed / qs.length * 100) : 0}%</div>
          </div>
          <div style={{ height: 8, background: '#E5E8E2', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{
              width: qs.length ? `${completed / qs.length * 100}%` : '0%',
              height: '100%', background: T.green,
              transition: 'width .25s',
            }}/>
          </div>
        </div>

        {/* Question cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 24 }}>
          {qs.length === 0 ? (
            <div style={{
              background: '#fff', borderRadius: 16, padding: '24px 18px',
              boxShadow: `inset 0 0 0 1px ${T.line}`,
              fontSize: 14, color: T.muted, textAlign: 'center',
            }}>Coming soon — content for this category is being curated by our specialist team.</div>
          ) : qs.map(q => {
            const isDone = q.done || doneIds.has(q.id);
            return (
              <button key={q.id} onClick={() => openQuestion(q.id, q.q)} style={{
                background: '#fff', borderRadius: 16, padding: '16px 18px',
                boxShadow: `inset 0 0 0 1px ${T.line}`,
                display: 'flex', alignItems: 'center', gap: 14,
                cursor: 'pointer', border: 'none', textAlign: 'left', fontFamily: 'inherit',
                width: '100%',
              }}>
                <div style={{
                  width: 12, height: 12, borderRadius: 999, flexShrink: 0,
                  background: isDone ? T.green : '#D6D9D2',
                  boxShadow: isDone ? `0 0 0 4px ${T.greenSoft}` : 'none',
                }}/>
                <div style={{ flex: 1, fontSize: 15, fontWeight: 600, color: T.ink, lineHeight: 1.35, letterSpacing: '-0.01em' }}>
                  {q.q}
                </div>
                <Icon.ChevronRight s={18} c={T.muted}/>
              </button>
            );
          })}
        </div>
      </div>
    </Screen>
  );
}

// ── Question Detail ─────────────────────────────────────────────────────

function QuestionDetailScreen({ question, back, isDone, markDone }) {
  return (
    <Screen bg={T.bg} bottomTab={
      <QuestionActionBar isDone={isDone} markDone={markDone}/>
    }>
      <ScreenHeader
        title={question}
        onBack={back}
      />
      <div style={{ padding: '0 18px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: T.greenSoft, color: T.green, fontSize: 12, fontWeight: 700,
            padding: '4px 10px', borderRadius: 999, letterSpacing: '0.02em',
          }}>
            Medical · Ages 9–13
          </span>
          <span style={{ fontSize: 12, color: T.muted }}>5 min read</span>
        </div>

        <div style={{ fontSize: 15, lineHeight: 1.6, color: T.ink2 }}>
          <p style={{ margin: 0 }}>
            For children ages 9–13 with ASD, your <strong style={{ color: T.ink }}>developmental pediatrician</strong> usually
            remains the central coordinator. They can refer you to specialists as new needs surface — most commonly
            adolescent psychiatry, GI, and sleep medicine.
          </p>
          <p style={{ marginTop: 14 }}>
            Bring a one-page summary to every visit: current medications, recent therapy notes,
            and three questions you most want answered. This keeps short appointments productive.
          </p>
          <p style={{ marginTop: 14 }}>
            If your child is approaching puberty, ask whether your pediatrician is comfortable
            managing this transition or if you should add an adolescent specialist now.
          </p>
        </div>

        {/* Related resources */}
        <div style={{ marginTop: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: T.ink2, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
            Related resources
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { name: 'Dr. Rachel Kim, Neurologist', meta: 'Montclair, NJ · 4.1 mi · ★ 4.9' },
              { name: 'Sunrise Adolescent Care', meta: 'Newark, NJ · 2.9 mi · ★ 4.7' },
            ].map((r, i) => (
              <div key={i} style={{
                background: '#fff', borderRadius: 14, padding: '14px 16px',
                boxShadow: `inset 0 0 0 1px ${T.line}`,
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12, background: T.greenSoft,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon.Hospital s={20} c={T.green}/>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: T.ink }}>{r.name}</div>
                  <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>{r.meta}</div>
                </div>
                <Icon.ChevronRight s={16} c={T.muted}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Screen>
  );
}

function QuestionActionBar({ isDone, markDone }) {
  const items = [
    { key: 'done', label: isDone ? 'Done' : 'Mark done', I: Icon.Check, primary: true },
    { key: 'note', label: 'Add note', I: Icon.Pen },
    { key: 'attach', label: 'Attach', I: Icon.Paperclip },
    { key: 'remind', label: 'Remind', I: Icon.Bell },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      paddingBottom: 24, paddingTop: 12, paddingInline: 14,
      background: 'rgba(248,246,241,0.95)',
      backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
      borderTop: `1px solid ${T.line}`,
      display: 'flex', gap: 8, zIndex: 30,
    }}>
      {items.map(it => {
        const active = it.primary && isDone;
        return (
          <button key={it.key} onClick={it.primary ? markDone : undefined} style={{
            flex: 1, height: 56, borderRadius: 14, border: 'none', cursor: 'pointer',
            background: active ? T.green : (it.primary ? T.ink : '#fff'),
            color: active || it.primary ? '#fff' : T.ink2,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: 2, fontFamily: 'inherit', fontSize: 11, fontWeight: 600,
            boxShadow: it.primary ? 'none' : `inset 0 0 0 1px ${T.line}`,
            transition: 'background .18s',
          }}>
            <it.I s={20} c={active || it.primary ? '#fff' : T.ink2}/>
            <span>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}

Object.assign(window, { MapScreen, StageDetailScreen, QuestionDetailScreen, AGE_STAGES, stagesForChild });
