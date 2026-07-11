// aTyp — GPS: Life Journey Guide, built on Moisha's Small Question Model.
// (atyp-gps-data.jsx: 8 milestones, 90 neutral questions in a Level 1→2→3 tree.)
//
// Moisha's model, faithfully:
//   • The GPS shows milestones by AGE or TRIGGER. Some are age-anchored
//     (Ages 15-17), some fire on an event, not a year (puberty, family aging).
//   • Each milestone has a NOW track (current) and a PLANNING-AHEAD track (future).
//   • You start at a Level-1 key question, pick the Level-2 that fits your
//     situation, reach its Level-3 — and THEN the AI answers, using the child's
//     profile + the exact question you drilled to.
//   • Every question can show WHY it matters, and you can Ask AI at any level.
// The database stays neutral (no laws/answers); the AI layer personalizes.
// Progress persists per child in localStorage under 'atyp_gps_v3'.

// ── Tree helpers ──────────────────────────────────────────────────────

function gpsFlatQuestions(milestone) {
  const out = [];
  const walk = (q) => { out.push(q); (q.children || []).forEach(walk); };
  milestone.questions.forEach(walk);
  return out;
}

// Level-1 key questions, optionally filtered by track (current/future).
function gpsKeys(milestone, track) {
  return milestone.questions.filter(q => !track || q.timing === track);
}

function gpsFind(milestone, id) {
  return gpsFlatQuestions(milestone).find(q => q.id === id) || null;
}

// A milestone's per-child GPS state: { [l1id]: { path:[ids], done:bool } }.
function gpsMsState(gps, milestone) {
  const l1s = milestone.questions;
  const explored = l1s.filter(q => gps[q.id]);
  const done = l1s.filter(q => gps[q.id] && gps[q.id].done);
  return { total: l1s.length, explored: explored.length, done: done.length,
           complete: l1s.length > 0 && done.length === l1s.length };
}

// Open Level-1 key questions the family hasn't finished drilling yet.
function gpsOpenKeys(gps, milestone) {
  return milestone.questions.filter(q => !gps[q.id] || !gps[q.id].done);
}

// "You are here": the milestone whose start age is the latest one reached.
function currentStageIndex(childAge) {
  let best = 0, bestAge = -1;
  GPS_MILESTONES.forEach((m, i) => {
    if (m.startAge <= childAge && m.startAge > bestAge) { bestAge = m.startAge; best = i; }
  });
  return best;
}

const GPS_RISK_COLOR = { critical: T.red, high: T.yellow, medium: T.line };

// ── Simulated AI layer (SQM → LLM handoff) ────────────────────────────
// Placeholder for the live model. It already receives the same inputs the
// real one will (child profile + the exact question path the family drilled
// to), so going live means swapping this function for an API call.

function gpsAIReply(child, scope, gps, userText, turn) {
  const name = child.name, age = child.age;
  const path = scope.path || null;            // funnel: array of nodes L1..Ln
  const m = scope.milestone || (path && scope.milestone) || null;
  const deep = path ? path[path.length - 1] : null;

  const t = (userText || '').toLowerCase();
  const wantsWhy   = /why|matter|важлив|чому/.test(t);
  const wantsSteps = /step|do|start|prepare|how|next|крок|роби|готу/.test(t);

  const p = [];

  if (path && deep) {
    // Specific-question answer — the whole point of the funnel.
    const trail = path.map(n => n.text).join('  →  ');
    p.push(`For ${name} (age ${age}${child.diagShort ? `, ${child.diagShort}` : ''}), here's guidance on the question you drilled to:\n\n“${deep.text}”`);
    if (path.length > 1) p.push(`Your path: ${trail}`);
    const why = [...path].reverse().find(n => n.why);
    if (why && (wantsWhy || turn === 0)) p.push(`Why this matters: ${why.why}`);
    p.push(wantsSteps
      ? `Practical next steps I'd suggest:\n1. Gather what you already have that answers this (reports, notes, prior plans).\n2. Bring this exact question to your next meeting or provider.\n3. Ask me to turn the answer into a checklist tailored to ${name}.`
      : `In the live app I'd answer this using ${name}'s full profile, your location's rules, and ${child.diagShort || 'the diagnosis'} — the questions stay the same everywhere, only the answer changes by place.`);
    p.push(turn % 2 === 0 ? 'Want this as concrete steps for your next meeting?' : `Ask me anything else about “${deep.text}”.`);
    return p.join('\n\n');
  }

  // Milestone- or path-level.
  const scopeMs = m ? [m] : GPS_MILESTONES;
  const openKeys = [];
  scopeMs.forEach(ms => gpsOpenKeys(gps, ms).forEach(q => openKeys.push({ q, ms })));
  const here = m ? `the ${m.label} stage` : `${name}'s whole journey`;

  p.push(`Here's my read for ${name} (age ${age}) on ${here}.`);
  if (m) p.push(`${m.ageLabel} · ${m.domain}. ${m.description}`);
  if (openKeys.length) {
    p.push(`Key questions worth drilling into ${m ? 'here' : 'next'}:\n` +
      openKeys.slice(0, 3).map((o, i) => `${i + 1}. ${o.q.text}${m ? '' : ` (${o.ms.label})`}`).join('\n'));
  } else {
    p.push(`You've explored every key question ${m ? 'here' : 'across the journey'} — I'd revisit them whenever something changes at home, school, or with services.`);
  }
  if (!m) {
    const next = GPS_MILESTONES.find(ms => ms.startAge > age);
    if (next) p.push(`Coming up: ${next.emoji} ${next.label} (${next.ageLabel}). The earlier you start, the calmer it goes.`);
  }
  p.push('Open any key question and I\'ll get specific — that\'s where I give you the real answer.');
  return p.join('\n\n');
}

// ── Small pieces ──────────────────────────────────────────────────────

function WhyToggle({ why }) {
  const [open, setOpen] = React.useState(false);
  if (!why) return null;
  return (
    <>
      <button onClick={() => setOpen(o => !o)} style={{
        marginTop: 6, padding: 0, border: 'none', background: 'none', cursor: 'pointer',
        fontFamily: 'inherit', fontSize: 11.5, fontWeight: 700, color: T.green,
      }}>{open ? '▾ Why this matters' : '▸ Why this matters'}</button>
      {open && <div style={{ fontSize: 12, color: T.ink2, lineHeight: 1.5, marginTop: 4 }}>{why}</div>}
    </>
  );
}

function AgeChip({ m }) {
  const trig = m.isTrigger;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      fontSize: 10.5, fontWeight: 800, letterSpacing: '0.02em',
      color: trig ? '#8A5A00' : T.green, background: trig ? '#FFF3D6' : T.greenSoft,
      padding: '3px 9px', borderRadius: 999,
    }}>{trig ? '⚡' : '📅'} {m.ageLabel}</span>
  );
}

// ── GPS map ───────────────────────────────────────────────────────────

function GPSMapContent({ child, openProfile, openSwitcher, embedded = false }) {
  const topPad = embedded ? 8 : (window.ATYP_MOBILE ? 12 : 54);
  const childAge = child ? child.age : 10;
  const currentIndex = currentStageIndex(childAge);
  const childId = child ? child.id : 'default';

  const [gpsStore, setGpsStore] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('atyp_gps_v3')) || {}; } catch { return {}; }
  });
  React.useEffect(() => {
    try { localStorage.setItem('atyp_gps_v3', JSON.stringify(gpsStore)); } catch {}
  }, [gpsStore]);
  const gps = (gpsStore[childId] || {}).gps || {};

  const [sheetIndex, setSheetIndex] = React.useState(null);     // open milestone
  const [track, setTrack] = React.useState('current');          // now | future
  const [funnel, setFunnel] = React.useState(null);             // { mi, path:[nodes] }
  const [showSummary, setShowSummary] = React.useState(false);
  const [aiScope, setAiScope] = React.useState(null);

  const openSheet = (i) => { setFunnel(null); setTrack('current'); setSheetIndex(i); };

  // Record drilling progress for a Level-1 question.
  const recordPath = (l1id, pathNodes) => {
    const done = (pathNodes[pathNodes.length - 1].children || []).length === 0;
    setGpsStore(prev => {
      const cur = prev[childId] || {};
      const g = { ...(cur.gps || {}) };
      const prevDone = g[l1id] && g[l1id].done;
      g[l1id] = { path: pathNodes.map(n => n.id), done: prevDone || done };
      return { ...prev, [childId]: { ...cur, gps: g } };
    });
  };

  // Open the funnel for a Level-1 question (resume its saved path if any).
  const openFunnel = (mi, l1) => {
    const saved = gps[l1.id];
    let pathNodes = [l1];
    if (saved && saved.path) {
      const m = GPS_MILESTONES[mi];
      const resumed = saved.path.map(id => gpsFind(m, id)).filter(Boolean);
      if (resumed.length) pathNodes = resumed;
    }
    setFunnel({ mi, path: pathNodes });
    recordPath(l1.id, pathNodes);
  };

  const funnelGo = (node) => {
    setFunnel(f => {
      const next = { ...f, path: [...f.path, node] };
      recordPath(next.path[0].id, next.path);
      return next;
    });
  };
  const funnelTo = (idx) => setFunnel(f => ({ ...f, path: f.path.slice(0, idx + 1) }));

  const msStates = GPS_MILESTONES.map(m => gpsMsState(gps, m));
  const unlocked = GPS_MILESTONES.map((_, i) => i <= currentIndex || msStates[i - 1].explored > 0);
  const total = GPS_MILESTONES.length;
  const exploredCount = msStates.filter(s => s.explored > 0).length;

  // ── Milestone sheet ───────────────────────────────────────────────────
  const questionSheet = sheetIndex !== null ? (() => {
    const m = GPS_MILESTONES[sheetIndex];
    const st = msStates[sheetIndex];
    const isHere = sheetIndex === currentIndex;

    // ── Funnel (drill-down) body ──
    let body;
    if (funnel && funnel.mi === sheetIndex) {
      const path = funnel.path;
      const node = path[path.length - 1];
      const kids = node.children || [];
      const leaf = kids.length === 0;

      body = (
        <>
          <button onClick={() => setFunnel(null)} style={{
            border: 'none', background: 'none', cursor: 'pointer', fontFamily: 'inherit',
            fontSize: 12.5, fontWeight: 700, color: T.green, padding: '10px 0 4px', textAlign: 'left',
          }}>‹ All key questions</button>

          {/* breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 6, margin: '6px 0 10px' }}>
            {path.map((n, i) => (
              <React.Fragment key={n.id}>
                {i > 0 && <span style={{ color: T.muted, fontSize: 12 }}>›</span>}
                <button onClick={() => funnelTo(i)} style={{
                  border: 'none', background: i === path.length - 1 ? T.green : T.greenSoft,
                  color: i === path.length - 1 ? '#fff' : T.green, cursor: 'pointer', fontFamily: 'inherit',
                  fontSize: 10.5, fontWeight: 800, borderRadius: 999, padding: '4px 9px', letterSpacing: '0.02em',
                }}>L{n.level}</button>
              </React.Fragment>
            ))}
          </div>

          {/* current question */}
          <div style={{ background: '#fff', borderRadius: 16, padding: '15px 16px',
            border: `1.5px solid ${T.line}`, boxShadow: `inset 3px 0 0 ${T.green}, 0 2px 10px rgba(27,36,33,0.05)` }}>
            <div style={{ fontSize: 10.5, fontWeight: 800, color: T.green, letterSpacing: '0.05em', marginBottom: 5 }}>
              {(GPS_LEVEL_LABEL[node.level] || `Level ${node.level}`).toUpperCase()}
            </div>
            <div style={{ fontSize: 15.5, fontWeight: 700, color: T.ink, lineHeight: 1.4 }}>{node.text}</div>
            <WhyToggle why={node.why}/>
          </div>

          {/* next step */}
          {!leaf && (
            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: T.muted, letterSpacing: '0.05em', marginBottom: 8 }}>
                {kids.length > 1 ? 'WHICH FITS YOUR SITUATION?' : 'GO DEEPER'}
              </div>
              {kids.map(c => (
                <button key={c.id} onClick={() => funnelGo(c)} style={{
                  width: '100%', background: '#fff', borderRadius: 14, padding: '13px 15px', marginBottom: 8,
                  border: `1.5px solid ${T.line}`, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                  display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 2px 8px rgba(27,36,33,0.05)',
                }}>
                  <div style={{ flex: 1, fontSize: 13.5, fontWeight: 700, color: T.ink, lineHeight: 1.4 }}>{c.text}</div>
                  <Icon.ChevronRight s={15} c={T.muted}/>
                </button>
              ))}
            </div>
          )}

          {/* leaf → hand off to AI */}
          {leaf && (
            <div style={{ marginTop: 16, background: T.greenSoft, borderRadius: 16, padding: '16px', textAlign: 'center' }}>
              <div style={{ width: 44, height: 44, borderRadius: 999, background: `linear-gradient(150deg, ${T.green}, ${T.greenDeep})`,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon.Sparkle s={20} c="#fff"/>
              </div>
              <div style={{ fontSize: 14.5, fontWeight: 800, color: T.ink, marginTop: 8 }}>You've reached the specific question</div>
              <div style={{ fontSize: 12.5, color: T.ink2, lineHeight: 1.5, marginTop: 4 }}>
                This is where the AI takes over — it answers using {child.name}'s profile and exactly this question.
              </div>
            </div>
          )}
        </>
      );
    } else {
      // ── Overview: Now / Planning-ahead L1 key questions ──
      const keys = gpsKeys(m, track);
      const seg = (id, label) => (
        <button onClick={() => setTrack(id)} style={{
          flex: 1, height: 36, borderRadius: 10, border: 'none', cursor: 'pointer', fontFamily: 'inherit',
          fontSize: 12.5, fontWeight: 700,
          background: track === id ? '#fff' : 'transparent',
          color: track === id ? T.green : T.muted,
          boxShadow: track === id ? '0 1px 4px rgba(27,36,33,0.12)' : 'none',
        }}>{label}</button>
      );
      body = (
        <>
          <div style={{ fontSize: 12.5, color: T.ink2, lineHeight: 1.5, margin: '8px 0 12px' }}>{m.description}</div>
          <div style={{ display: 'flex', gap: 4, background: T.bgAlt, borderRadius: 12, padding: 4, marginBottom: 14 }}>
            {seg('current', '🟢 Now')}
            {seg('future', '🔭 Planning ahead')}
          </div>
          {keys.map(q => {
            const state = gps[q.id];
            return (
              <button key={q.id} onClick={() => openFunnel(sheetIndex, q)} style={{
                width: '100%', background: '#fff', borderRadius: 16, padding: '14px 15px', marginBottom: 10,
                border: `1.5px solid ${state ? 'rgba(45,106,79,0.30)' : T.line}`, cursor: 'pointer',
                fontFamily: 'inherit', textAlign: 'left', boxShadow: '0 2px 8px rgba(27,36,33,0.05)',
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                  <div style={{ width: 7, height: 7, borderRadius: 999, background: GPS_RISK_COLOR[q.risk] || T.line, flexShrink: 0, marginTop: 6 }}/>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14.5, fontWeight: 700, color: T.ink, lineHeight: 1.4 }}>{q.text}</div>
                    <WhyToggle why={q.why}/>
                    <div style={{ fontSize: 11.5, fontWeight: 700, color: state ? T.green : T.muted, marginTop: 7 }}>
                      {state && state.done ? '✓ Explored — tap to revisit' : state ? 'In progress ›' : 'Explore ›'}
                    </div>
                  </div>
                  <Icon.ChevronRight s={16} c={T.muted}/>
                </div>
              </button>
            );
          })}
          <div style={{ fontSize: 11, color: T.muted, textAlign: 'center', marginTop: 8, lineHeight: 1.5 }}>
            Pick the question that speaks to you, narrow it down, then let the AI answer.
          </div>
        </>
      );
    }

    const inFunnel = funnel && funnel.mi === sheetIndex;
    const aiLabel = inFunnel ? 'Ask AI about this question' : 'Ask AI about this stage';
    const onAsk = () => setAiScope(inFunnel ? { milestone: m, path: funnel.path } : { milestone: m });

    return (
      <div style={{ position: 'absolute', inset: 0, zIndex: 200, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <div onClick={() => openSheet(null)} style={{ position: 'absolute', inset: 0, background: 'rgba(27,36,33,0.45)' }}/>
        <div style={{ position: 'relative', background: T.bg, borderRadius: '22px 22px 0 0', maxHeight: '90%', display: 'flex', flexDirection: 'column', animation: 'atypSheetUp .28s ease' }}>
          <div style={{ padding: '0 18px', flexShrink: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 12, paddingBottom: 4 }}>
              <div style={{ width: 36, height: 4, borderRadius: 999, background: T.line }}/>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4, marginBottom: 8 }}>
              <span style={{ fontSize: 22 }}>{m.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <div style={{ fontSize: 15, fontWeight: 800, color: T.ink }}>{m.label}</div>
                  {m.super && <span style={{ fontSize: 9, fontWeight: 800, color: '#fff', background: T.green, borderRadius: 999, padding: '2px 6px' }}>KEY STAGE</span>}
                  {isHere && <span style={{ fontSize: 9.5, fontWeight: 800, color: '#E63946', letterSpacing: '0.03em' }}>YOU ARE HERE</span>}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                  <AgeChip m={m}/>
                </div>
              </div>
              <button onClick={() => openSheet(null)} style={{ width: 30, height: 30, borderRadius: 999, border: 'none', background: T.bgAlt, cursor: 'pointer', fontFamily: 'inherit', fontSize: 17, color: T.muted, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <div style={{ flex: 1, height: 6, borderRadius: 99, background: 'rgba(45,106,79,0.15)', overflow: 'hidden' }}>
                <div style={{ width: `${st.total ? Math.round((st.done / st.total) * 100) : 0}%`, height: '100%', background: T.green, borderRadius: 99, transition: 'width .25s' }}/>
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.green, whiteSpace: 'nowrap' }}>{st.done}/{st.total} explored</div>
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '0 18px 14px' }}>{body}</div>

          <div style={{ padding: '10px 18px 30px', flexShrink: 0, background: T.bg, borderTop: `1px solid ${T.line}` }}>
            <button onClick={onAsk} style={{
              width: '100%', height: 50, borderRadius: 14, border: 'none', cursor: 'pointer',
              background: `linear-gradient(140deg, ${T.green}, ${T.greenDeep})`, color: '#fff',
              fontFamily: 'inherit', fontSize: 15, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: '0 4px 14px rgba(45,106,79,0.28)',
            }}>
              <Icon.Sparkle s={17} c="#fff"/> {aiLabel}
            </button>
          </div>
        </div>
      </div>
    );
  })() : null;

  // ── Path summary ──────────────────────────────────────────────────────
  const openTopics = [];
  msStates.forEach((s, i) => {
    if (i > currentIndex && s.explored === 0) return;
    gpsOpenKeys(gps, GPS_MILESTONES[i]).forEach(q => openTopics.push({ q, m: GPS_MILESTONES[i] }));
  });

  const summarySheet = showSummary ? (
    <div style={{ position: 'absolute', inset: 0, zIndex: 200, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <div onClick={() => setShowSummary(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(27,36,33,0.45)' }}/>
      <div style={{ position: 'relative', background: T.bg, borderRadius: '22px 22px 0 0', maxHeight: '90%', display: 'flex', flexDirection: 'column', animation: 'atypSheetUp .28s ease' }}>
        <div style={{ padding: '0 18px', flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 12, paddingBottom: 4 }}>
            <div style={{ width: 36, height: 4, borderRadius: 999, background: T.line }}/>
          </div>
          <div style={{ fontSize: 19, fontWeight: 800, color: T.ink, letterSpacing: '-0.02em', marginTop: 6 }}>Journey summary</div>
          <div style={{ fontSize: 12.5, color: T.ink2, lineHeight: 1.5, marginTop: 2, marginBottom: 10 }}>
            {exploredCount} of {total} milestones started on {child.name}'s path.
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 18px 14px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {msStates.map((s, i) => {
              const m = GPS_MILESTONES[i];
              const open = gpsOpenKeys(gps, m).length;
              return (
                <button key={m.id} onClick={() => { setShowSummary(false); openSheet(i); }} style={{
                  width: '100%', background: '#fff', borderRadius: 14, padding: '11px 13px',
                  border: `1.5px solid ${T.line}`, cursor: 'pointer', fontFamily: 'inherit',
                  display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left',
                }}>
                  <span style={{ fontSize: 18 }}>{m.emoji}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: T.ink }}>{m.label}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                      <div style={{ flex: 1, height: 4, borderRadius: 99, background: 'rgba(45,106,79,0.12)', overflow: 'hidden' }}>
                        <div style={{ width: `${s.total ? Math.round((s.done / s.total) * 100) : 0}%`, height: '100%', background: T.green, borderRadius: 99 }}/>
                      </div>
                      <span style={{ fontSize: 10.5, fontWeight: 700, color: T.muted }}>{s.done}/{s.total}</span>
                    </div>
                  </div>
                  {s.explored > 0 && open > 0 && (
                    <span style={{ fontSize: 10, fontWeight: 800, color: '#fff', background: T.red, borderRadius: 999, padding: '3px 8px', flexShrink: 0 }}>{open} open</span>
                  )}
                  <Icon.ChevronRight s={14} c={T.muted}/>
                </button>
              );
            })}
          </div>
        </div>
        <div style={{ padding: '10px 18px 30px', flexShrink: 0, background: T.bg, borderTop: `1px solid ${T.line}` }}>
          <button onClick={() => setAiScope({ whole: true })} style={{
            width: '100%', height: 50, borderRadius: 14, border: 'none', cursor: 'pointer',
            background: `linear-gradient(140deg, ${T.green}, ${T.greenDeep})`, color: '#fff',
            fontFamily: 'inherit', fontSize: 15, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: '0 4px 14px rgba(45,106,79,0.28)',
          }}>
            <Icon.Sparkle s={17} c="#fff"/> Ask AI about the whole journey
          </button>
        </div>
      </div>
    </div>
  ) : null;

  const aiSheet = aiScope ? (
    <GPSAIChat child={child} scope={aiScope} gps={gps} onClose={() => setAiScope(null)}/>
  ) : null;

  // ── Node-path geometry ────────────────────────────────────────────────
  const BOARD_W = 300, NODE_GAP = 112, TOP = 56;
  const WAVE = [0, 74, 0, -74];
  const nodePos = (i) => ({ x: BOARD_W / 2 + WAVE[i % WAVE.length], y: TOP + i * NODE_GAP });
  const allCenters = GPS_MILESTONES.map((_, i) => nodePos(i));
  const summaryCenter = nodePos(GPS_MILESTONES.length);
  allCenters.push(summaryCenter);
  const boardH = summaryCenter.y + 96;
  const summaryUnlocked = exploredCount > 0;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: T.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {questionSheet}
      {summarySheet}
      {aiSheet}
      {/* Child pill */}
      <div style={{ flexShrink: 0, paddingTop: topPad, paddingInline: 18, paddingBottom: 12,
        background: 'linear-gradient(180deg, rgba(248,246,241,1) 80%, rgba(248,246,241,0))' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', borderRadius: 999, padding: '6px 12px 6px 6px', boxShadow: `inset 0 0 0 1px ${T.line}` }}>
          <Avatar initials={child.initials} size={38} color={child.color}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: T.ink }}>{child.name} · Age {child.age}</div>
            <div style={{ fontSize: 11.5, color: T.muted }}>Life journey</div>
          </div>
          {openSwitcher && (
            <button onClick={openSwitcher} style={{ width: 30, height: 30, borderRadius: 999, border: 'none', background: T.greenSoft, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon.Switch s={16} c={T.green}/>
            </button>
          )}
        </div>
      </div>

      {/* Scrollable milestone path */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '4px 18px 40px' }}>
        <div style={{ background: T.greenSoft, borderRadius: 16, padding: '14px 16px', marginBottom: 18 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: T.ink, marginBottom: 4 }}>{child.name}'s life path</div>
          <div style={{ fontSize: 12, color: T.ink2, lineHeight: 1.5, marginBottom: 12 }}>
            8 milestones by age or trigger. Open one, pick a key question, narrow it down level by level — then the AI answers using {child.name}'s profile.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ flex: 1, height: 6, borderRadius: 99, background: 'rgba(45,106,79,0.15)', overflow: 'hidden' }}>
              <div style={{ width: `${Math.round((exploredCount / total) * 100)}%`, height: '100%', background: T.green, borderRadius: 99, transition: 'width .25s' }}/>
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: T.green, whiteSpace: 'nowrap' }}>{exploredCount}/{total} started</div>
          </div>
        </div>

        <div style={{ position: 'relative', width: BOARD_W, height: boardH, margin: '6px auto 0' }}>
          <svg width={BOARD_W} height={boardH} style={{ position: 'absolute', left: 0, top: 0 }}>
            {allCenters.slice(1).map((c, idx) => {
              const prev = allCenters[idx];
              const filled = msStates[idx] && msStates[idx].complete;
              return (
                <line key={idx} x1={prev.x} y1={prev.y} x2={c.x} y2={c.y}
                  stroke={filled ? T.mint : T.line} strokeWidth={4} strokeLinecap="round"
                  strokeDasharray={filled ? 'none' : '2 9'}/>
              );
            })}
          </svg>

          {GPS_MILESTONES.map((m, i) => {
            const st = msStates[i];
            const isUnlocked = unlocked[i];
            const isComplete = st.complete && isUnlocked;
            const isHere = i === currentIndex;
            const { x, y } = allCenters[i];
            const size = isHere ? 66 : 58;
            const nodeColor = isComplete ? T.mint : isHere ? T.green : isUnlocked ? '#CFE3D6' : '#E8EBE7';
            const nodeBorder = !isUnlocked ? `2px dashed ${T.line}` : 'none';
            return (
              <React.Fragment key={m.id}>
                <button onClick={isUnlocked ? () => openSheet(i) : undefined} style={{
                  position: 'absolute', left: x - size / 2, top: y - size / 2,
                  width: size, height: size, borderRadius: 999, padding: 0,
                  background: nodeColor, border: nodeBorder,
                  cursor: isUnlocked ? 'pointer' : 'default', fontFamily: 'inherit',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: isHere ? '0 8px 22px rgba(45,106,79,0.32)' : isComplete ? '0 4px 12px rgba(45,106,79,0.18)' : '0 2px 6px rgba(27,36,33,0.06)',
                  transition: 'all .2s',
                }}>
                  {isComplete ? <Icon.Check s={24} c="#fff" sw={2.8}/>
                    : !isUnlocked ? <Icon.Lock s={20} c={T.muted}/>
                    : <span style={{ fontSize: isHere ? 28 : 24 }}>{m.emoji}</span>}
                  {m.isTrigger && isUnlocked && (
                    <div style={{ position: 'absolute', top: -4, left: -4, width: 20, height: 20, borderRadius: 999, background: '#FFF3D6', border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>⚡</div>
                  )}
                  {isHere && <div style={{ position: 'absolute', top: -3, right: -3, width: 16, height: 16, borderRadius: 999, background: '#E63946', border: '2px solid #fff', boxShadow: '0 1px 4px rgba(230,57,70,0.5)' }}/>}
                  {st.explored > 0 && !isComplete && (
                    <div style={{ position: 'absolute', bottom: -3, right: -3, minWidth: 18, height: 18, padding: '0 4px', borderRadius: 999, background: T.green, color: '#fff', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>{st.explored}</div>
                  )}
                </button>
                <div style={{ position: 'absolute', left: x, top: y + size / 2 + 5, transform: 'translateX(-50%)', width: 150, textAlign: 'center', pointerEvents: 'none' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: isUnlocked ? T.ink : T.muted, lineHeight: 1.2 }}>{m.label}</div>
                  <div style={{ fontSize: 10, color: m.isTrigger ? '#8A5A00' : T.muted, marginTop: 1 }}>{m.ageLabel}</div>
                  {isHere && <div style={{ fontSize: 9.5, fontWeight: 700, color: '#E63946', marginTop: 2, letterSpacing: '0.03em' }}>YOU ARE HERE</div>}
                </div>
              </React.Fragment>
            );
          })}

          <button onClick={summaryUnlocked ? () => setShowSummary(true) : undefined} style={{
            position: 'absolute', left: summaryCenter.x - 33, top: summaryCenter.y - 33,
            width: 66, height: 66, borderRadius: 999, padding: 0,
            background: summaryUnlocked ? '#FFF3D6' : '#E8EBE7',
            border: summaryUnlocked ? 'none' : `2px dashed ${T.line}`,
            cursor: summaryUnlocked ? 'pointer' : 'default', fontFamily: 'inherit',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: summaryUnlocked ? '0 6px 16px rgba(156,122,26,0.22)' : 'none',
          }}>
            <span style={{ fontSize: 28, opacity: summaryUnlocked ? 1 : 0.5 }}>🏁</span>
            {openTopics.length > 0 && summaryUnlocked && (
              <div style={{ position: 'absolute', bottom: -3, right: -6, height: 18, padding: '0 6px', borderRadius: 999, background: T.red, color: '#fff', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>{openTopics.length}</div>
            )}
          </button>
          <div style={{ position: 'absolute', left: summaryCenter.x, top: summaryCenter.y + 38, transform: 'translateX(-50%)', width: 138, textAlign: 'center', pointerEvents: 'none' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: summaryUnlocked ? T.ink : T.muted, lineHeight: 1.2 }}>Journey summary</div>
            <div style={{ fontSize: 10.5, color: T.muted, marginTop: 1 }}>Progress & open topics</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── AI chat sheet (simulated LLM layer) ───────────────────────────────

function GPSAIChat({ child, scope, gps, onClose }) {
  const deep = scope.path ? scope.path[scope.path.length - 1] : null;
  const title = deep ? `${scope.milestone.emoji} ${deep.text.slice(0, 40)}${deep.text.length > 40 ? '…' : ''}`
    : scope.milestone ? `${scope.milestone.emoji} ${scope.milestone.label}`
    : `🏁 ${child.name}'s whole journey`;
  const [messages, setMessages] = React.useState([]);
  const [input, setInput] = React.useState('');
  const [typing, setTyping] = React.useState(false);
  const turnRef = React.useRef(0);
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, typing]);

  const suggestions = deep
    ? ['What should I do about this?', 'Why does this matter now?', 'Turn this into steps for my meeting']
    : scope.milestone
      ? ['What should we focus on first?', `What's coming next for ${child.name}?`, 'Which question is most urgent?']
      : ['Where are our biggest gaps?', 'What should we do this year?', 'Summarize our progress'];

  const send = (text) => {
    const clean = (text || '').trim();
    if (!clean || typing) return;
    setMessages(ms => [...ms, { role: 'user', text: clean }]);
    setInput('');
    setTyping(true);
    const turn = turnRef.current++;
    setTimeout(() => {
      setMessages(ms => [...ms, { role: 'ai', text: gpsAIReply(child, scope, gps, clean, turn) }]);
      setTyping(false);
    }, 850);
  };

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 300, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(27,36,33,0.5)' }}/>
      <div style={{ position: 'relative', background: T.bg, borderRadius: '22px 22px 0 0', height: '92%', display: 'flex', flexDirection: 'column', animation: 'atypSheetUp .28s ease' }}>
        <div style={{ padding: '0 18px', flexShrink: 0, borderBottom: `1px solid ${T.line}` }}>
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 12, paddingBottom: 4 }}>
            <div style={{ width: 36, height: 4, borderRadius: 999, background: T.line }}/>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 0 12px' }}>
            <div style={{ width: 36, height: 36, borderRadius: 999, flexShrink: 0, background: `linear-gradient(150deg, ${T.green}, ${T.greenDeep})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon.Sparkle s={16} c="#fff"/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14.5, fontWeight: 800, color: T.ink }}>Ask AI</div>
              <div style={{ fontSize: 11.5, color: T.muted, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title} · uses {child.name}'s profile</div>
            </div>
            <button onClick={onClose} style={{ width: 30, height: 30, borderRadius: 999, border: 'none', background: T.bgAlt, cursor: 'pointer', fontFamily: 'inherit', fontSize: 17, color: T.muted, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
          </div>
        </div>

        <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '14px 18px' }}>
          {messages.length === 0 && !typing && (
            <div style={{ textAlign: 'center', padding: '18px 10px' }}>
              <div style={{ fontSize: 13, color: T.ink2, lineHeight: 1.55, marginBottom: 14 }}>
                {deep
                  ? <>You drilled to a specific question. I'll answer it using {child.name}'s profile (age {child.age}, {child.diagnosis}) — the question is the same everywhere, only the answer changes by place.</>
                  : <>Ask anything about {scope.milestone ? `the ${scope.milestone.label} stage` : `${child.name}'s journey`} — I'll use {child.name}'s profile (age {child.age}, {child.diagnosis}) and the questions you've explored.</>}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {suggestions.map(s => (
                  <button key={s} onClick={() => send(s)} style={{
                    width: '100%', padding: '12px 14px', background: '#fff', borderRadius: 14,
                    border: `1.5px solid ${T.line}`, cursor: 'pointer', fontFamily: 'inherit',
                    fontSize: 13.5, fontWeight: 600, color: T.green, textAlign: 'left',
                  }}>{s}</button>
                ))}
              </div>
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', marginBottom: 10 }}>
              <div style={{ maxWidth: '85%', padding: '11px 14px', fontSize: 13.5, lineHeight: 1.55, whiteSpace: 'pre-line',
                background: msg.role === 'user' ? T.green : '#fff', color: msg.role === 'user' ? '#fff' : T.ink,
                borderRadius: msg.role === 'user' ? '18px 4px 18px 18px' : '4px 18px 18px 18px',
                boxShadow: msg.role === 'user' ? 'none' : `inset 0 0 0 1px ${T.line}` }}>{msg.text}</div>
            </div>
          ))}
          {typing && (
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 10 }}>
              <div style={{ padding: '13px 16px', background: '#fff', borderRadius: '4px 18px 18px 18px', boxShadow: `inset 0 0 0 1px ${T.line}`, fontSize: 13, color: T.muted }}>Thinking…</div>
            </div>
          )}
        </div>

        <div style={{ padding: '10px 18px 26px', flexShrink: 0, borderTop: `1px solid ${T.line}`, background: T.bg }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send(input)}
              placeholder="Ask a question…"
              style={{ flex: 1, height: 46, boxSizing: 'border-box', border: `1.5px solid ${T.line}`, borderRadius: 14, background: '#fff', padding: '0 14px', fontSize: 14, color: T.ink, fontFamily: 'inherit', outline: 'none' }}
              onFocus={e => e.currentTarget.style.borderColor = T.green} onBlur={e => e.currentTarget.style.borderColor = T.line}/>
            <button onClick={() => send(input)} style={{ width: 46, height: 46, borderRadius: 14, border: 'none', cursor: 'pointer', flexShrink: 0, background: T.green, color: '#fff', fontFamily: 'inherit', fontSize: 18, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: input.trim() && !typing ? 1 : 0.45 }}>↑</button>
          </div>
          <div style={{ fontSize: 10, color: T.muted, textAlign: 'center', marginTop: 8, lineHeight: 1.4 }}>
            Preview — replies are simulated. The pilot connects a live AI with {child.name}'s full profile.
          </div>
        </div>
      </div>
    </div>
  );
}

// ── GPS Screen (standalone, with TabBar) ──────────────────────────────
function MapScreen({ go, back, onTab, openProfile, child, openSwitcher }) {
  return (
    <div style={{ width: '100%', height: '100%', background: T.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <GPSMapContent child={child} openProfile={openProfile} openSwitcher={openSwitcher}/>
      </div>
      <TabBar active="assistant" onTab={onTab}/>
    </div>
  );
}

// ── Backward-compatible exports ───────────────────────────────────────
function LifeMomentScreen({ stage, back }) {
  return (
    <Screen bg={T.bg}>
      <ScreenHeader title={stage.label} subtitle={stage.ageLabel} onBack={back}/>
      <div style={{ padding: '0 18px 32px' }}>
        <div style={{ background: T.greenSoft, borderRadius: 18, padding: '16px 18px', marginBottom: 20, display: 'flex', gap: 12 }}>
          <div style={{ fontSize: 28 }}>{stage.emoji}</div>
          <div style={{ fontSize: 14, color: T.ink2, lineHeight: 1.5 }}>{stage.description}</div>
        </div>
        {gpsKeys(stage).map(q => (
          <div key={q.id} style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', marginBottom: 8, border: `1px solid ${T.line}` }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: T.ink }}>{q.text}</div>
          </div>
        ))}
      </div>
    </Screen>
  );
}

const AGE_STAGES = GPS_MILESTONES;
function stagesForChild() { return GPS_MILESTONES; }
function StageDetailScreen({ back }) { return <LifeMomentScreen stage={GPS_MILESTONES[0]} back={back}/>; }
function QuestionDetailScreen({ back }) { return <LifeMomentScreen stage={GPS_MILESTONES[0]} back={back}/>; }

Object.assign(window, { MapScreen, GPSMapContent, StageDetailScreen, QuestionDetailScreen, AGE_STAGES, stagesForChild });
