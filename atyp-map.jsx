// aTyp — GPS: Life Journey Guide, built on Moisha's Small Question Model.
// (atyp-gps-data.jsx: 8 milestones, 90 neutral questions in a Level 1→2→3 tree.)
//
// The value this GPS delivers (the investor story): it turns an overwhelming
// system into a simple, personal PREP PLAN — the right questions to ask, at the
// right age, that a parent can bring to a real meeting.
//   • Milestones sit on a life path by AGE or TRIGGER (puberty / family aging).
//   • Each milestone frames a real moment ("Before an IEP meeting") and splits
//     questions into NOW and PLANNING-AHEAD.
//   • You drill a Level-1 concern → Level-2 that fits you → Level-3 exact
//     question. The narrowing itself is the value (that's the Small Question
//     Model). You then ⭐ add the question to your prep plan.
//   • The 🏁 summary is the payoff: your collected questions, grouped by
//     meeting — something you could print and take with you.
//   • "Ask AI" is a preview of the full product's LLM layer.
// Progress persists per child in localStorage under 'atyp_gps_v3'.

// ── Milestone framing (the real-life moment each one prepares you for) ──
const GPS_MOMENT = {
  'diagnosis':                          { moment: 'When you\'re getting or reviewing the diagnosis', bring: 'your pediatrician or diagnostician' },
  'iep-readiness-advocacy':             { moment: 'Before an IEP meeting',                            bring: 'your next IEP meeting' },
  'puberty':                            { moment: 'As puberty-related changes begin',                 bring: 'your doctor or support team' },
  'high-school-planning':               { moment: 'Planning the high-school years',                   bring: 'your school planning meeting' },
  'adult-readiness-post-21-preparation':{ moment: 'Preparing for life after 21 (the transition)',     bring: 'your transition planning team' },
  't1-cliff':                           { moment: 'When school services end at 21',                   bring: 'your adult-services coordinator' },
  'housing-launch':                     { moment: 'Getting on housing waiting lists early',           bring: 'your benefits / housing coordinator' },
  'isp-annual-planning':                { moment: 'Before the yearly ISP meeting',                    bring: 'your next ISP meeting' },
};
const gpsMoment = (m) => GPS_MOMENT[m.id] || { moment: m.description, bring: 'your next meeting' };

// ── Tree helpers ──────────────────────────────────────────────────────

function gpsFlatQuestions(milestone) {
  const out = [];
  const walk = (q) => { out.push(q); (q.children || []).forEach(walk); };
  milestone.questions.forEach(walk);
  return out;
}

function gpsKeys(milestone, track) {
  return milestone.questions.filter(q => !track || q.timing === track);
}

function gpsFind(milestone, id) {
  return gpsFlatQuestions(milestone).find(q => q.id === id) || null;
}

// Locate a question (and its milestone) anywhere in the model.
function gpsFindAnywhere(id) {
  for (const m of GPS_MILESTONES) { const q = gpsFind(m, id); if (q) return { m, q }; }
  return null;
}

// Count prep-list stars inside a Level-1's subtree.
function gpsSubtreeStars(l1, prep) {
  let n = 0;
  const walk = (q) => { if (prep[q.id]) n++; (q.children || []).forEach(walk); };
  walk(l1);
  return n;
}

// A milestone's state, driven by what the parent has collected (prep) + explored.
function gpsMsState(gps, prep, milestone) {
  const l1s = milestone.questions;
  const explored = l1s.filter(q => gps[q.id]).length;
  const prepCount = gpsFlatQuestions(milestone).filter(q => prep[q.id]).length;
  return { total: l1s.length, explored, prepCount, captured: prepCount > 0 };
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
const GPS_TRACK = { current: { label: 'Now', emoji: '🟢' }, future: { label: 'Planning ahead', emoji: '🔭' } };

// ── Simulated AI layer (a preview of the full LLM) ────────────────────

function gpsAIReply(child, scope, gps, userText, turn) {
  const name = child.name, age = child.age;
  const path = scope.path || null;
  const deep = path ? path[path.length - 1] : null;
  const t = (userText || '').toLowerCase();
  const wantsWhy = /why|matter|важлив|чому/.test(t);
  const wantsSteps = /step|do|start|prepare|how|next|крок|роби|готу/.test(t);
  const p = [];

  if (path && deep) {
    const trail = path.map(n => n.text).join('  →  ');
    p.push(`For ${name} (age ${age}${child.diagShort ? `, ${child.diagShort}` : ''}), here's guidance on the question you drilled to:\n\n“${deep.text}”`);
    if (path.length > 1) p.push(`Your path: ${trail}`);
    const why = [...path].reverse().find(n => n.why);
    if (why && (wantsWhy || turn === 0)) p.push(`Why this matters: ${why.why}`);
    p.push(wantsSteps
      ? `Practical next steps:\n1. Add this to your prep plan so you don't forget it.\n2. Bring it to your next meeting or provider.\n3. Ask me to turn it into a checklist tailored to ${name}.`
      : `In the full app I'd answer this using ${name}'s profile and your location's rules — the question is the same everywhere, only the answer changes by place.`);
    p.push(turn % 2 === 0 ? 'Want this as concrete steps for your next meeting?' : `Ask me anything else about “${deep.text}”.`);
    return p.join('\n\n');
  }

  const scopeMs = scope.milestone ? [scope.milestone] : GPS_MILESTONES;
  const openKeys = [];
  scopeMs.forEach(ms => gpsKeys(ms).forEach(q => openKeys.push({ q, ms })));
  const here = scope.milestone ? `the ${scope.milestone.label} stage` : `${name}'s whole journey`;
  p.push(`Here's my read for ${name} (age ${age}) on ${here}.`);
  if (scope.milestone) p.push(`${scope.milestone.ageLabel} · ${gpsMoment(scope.milestone).moment}. ${scope.milestone.description}`);
  p.push(`Key questions worth adding to your prep plan:\n` +
    openKeys.slice(0, 3).map((o, i) => `${i + 1}. ${o.q.text}${scope.milestone ? '' : ` (${o.ms.label})`}`).join('\n'));
  p.push('Open any question, narrow it down, and add it to your plan — that\'s what you\'ll bring to your meetings.');
  return p.join('\n\n');
}

// ── Small pieces ──────────────────────────────────────────────────────

function AgeChip({ m }) {
  const trig = m.isTrigger;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10.5, fontWeight: 800,
      letterSpacing: '0.02em', color: trig ? '#8A5A00' : T.green, background: trig ? '#FFF3D6' : T.greenSoft,
      padding: '3px 9px', borderRadius: 999 }}>{trig ? '⚡' : '📅'} {m.ageLabel}</span>
  );
}

function TrackChip({ timing }) {
  const tk = GPS_TRACK[timing] || GPS_TRACK.current;
  return <span style={{ fontSize: 10, fontWeight: 800, color: T.muted, letterSpacing: '0.03em' }}>{tk.emoji} {tk.label.toUpperCase()}</span>;
}

// A star button that adds/removes a question from the prep plan.
function StarBtn({ on, onClick, big }) {
  return (
    <button onClick={onClick} style={{
      height: big ? 46 : 30, padding: big ? '0 16px' : '0 10px', borderRadius: big ? 13 : 999,
      border: on ? 'none' : `1.5px solid ${T.green}`, cursor: 'pointer', fontFamily: 'inherit',
      background: on ? T.green : '#fff', color: on ? '#fff' : T.green,
      fontSize: big ? 14.5 : 12, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 6,
      width: big ? '100%' : 'auto', justifyContent: 'center',
    }}>
      <span>{on ? '★' : '☆'}</span>{big ? (on ? 'Added to your prep plan' : 'Add to my prep plan') : (on ? 'Added' : 'Add')}
    </button>
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
  const bucket = gpsStore[childId] || {};
  const gps = bucket.gps || {};
  const prep = bucket.prep || {};

  const [sheetIndex, setSheetIndex] = React.useState(null);
  const [funnel, setFunnel] = React.useState(null);       // { mi, path:[nodes] }
  const [showSummary, setShowSummary] = React.useState(false);
  const [aiScope, setAiScope] = React.useState(null);

  const closeSheet = () => setSheetIndex(null);   // keep funnel so reopening the same stage resumes it
  const openSheet = (i) => { setFunnel(f => (f && f.mi === i) ? f : null); setSheetIndex(i); };

  const recordExplore = (l1id, pathNodes) => {
    setGpsStore(prev => {
      const cur = prev[childId] || {};
      const g = { ...(cur.gps || {}) };
      const done = (pathNodes[pathNodes.length - 1].children || []).length === 0;
      g[l1id] = { path: pathNodes.map(n => n.id), done: (g[l1id] && g[l1id].done) || done };
      return { ...prev, [childId]: { ...cur, gps: g } };
    });
  };

  const toggleStar = (mId, node, pathNodes) => {
    setGpsStore(prev => {
      const cur = prev[childId] || {};
      const pr = { ...(cur.prep || {}) };
      if (pr[node.id]) delete pr[node.id];
      else pr[node.id] = { ms: mId, path: pathNodes.map(n => n.id) };
      return { ...prev, [childId]: { ...cur, prep: pr } };
    });
  };

  // Add/remove the whole path (all 3 questions) to/from the prep plan at once.
  const togglePathStar = (mId, pathNodes) => {
    setGpsStore(prev => {
      const cur = prev[childId] || {};
      const pr = { ...(cur.prep || {}) };
      const ids = pathNodes.map(n => n.id);
      const allIn = ids.every(id => pr[id]);
      if (allIn) ids.forEach(id => delete pr[id]);
      else pathNodes.forEach(n => { pr[n.id] = { ms: mId, path: ids }; });
      return { ...prev, [childId]: { ...cur, prep: pr } };
    });
  };

  const openFunnel = (mi, l1) => {
    const saved = gps[l1.id];
    let pathNodes = [l1];
    if (saved && saved.path) {
      const m = GPS_MILESTONES[mi];
      const resumed = saved.path.map(id => gpsFind(m, id)).filter(Boolean);
      if (resumed.length) pathNodes = resumed;
    }
    setFunnel({ mi, path: pathNodes });
    recordExplore(l1.id, pathNodes);
  };
  const funnelGo = (node) => setFunnel(f => {
    const next = { ...f, path: [...f.path, node] };
    recordExplore(next.path[0].id, next.path);
    return next;
  });
  const funnelTo = (idx) => setFunnel(f => ({ ...f, path: f.path.slice(0, idx + 1) }));

  const msStates = GPS_MILESTONES.map(m => gpsMsState(gps, prep, m));
  const unlocked = GPS_MILESTONES.map(() => true);   // every stage is open
  const total = GPS_MILESTONES.length;
  const capturedCount = msStates.filter(s => s.captured).length;
  const prepTotal = Object.keys(prep).length;

  // ── Milestone sheet ───────────────────────────────────────────────────
  const questionSheet = sheetIndex !== null ? (() => {
    const m = GPS_MILESTONES[sheetIndex];
    const isHere = sheetIndex === currentIndex;
    const moment = gpsMoment(m);

    let body;
    if (funnel && funnel.mi === sheetIndex) {
      const path = funnel.path;
      const node = path[path.length - 1];
      const kids = node.children || [];
      const leaf = kids.length === 0;
      const starred = !!prep[node.id];

      body = (
        <>
          <button onClick={() => setFunnel(null)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 12.5, fontWeight: 700, color: T.green, padding: '10px 0 4px', textAlign: 'left' }}>‹ All key questions</button>

          {/* level state — filled = chosen, empty = not chosen yet */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, margin: '6px 0 6px' }}>
            {[1, 2, 3].map((lvl, i) => {
              const filled = lvl <= path.length;
              const current = lvl === path.length + 1;   // the step being chosen now
              return (
                <React.Fragment key={lvl}>
                  {i > 0 && <span style={{ color: T.line, fontSize: 12 }}>›</span>}
                  <button onClick={filled ? () => funnelTo(lvl - 1) : undefined} disabled={!filled} style={{ border: filled ? 'none' : `1.5px ${current ? 'solid' : 'dashed'} ${current ? T.green : T.line}`, background: filled ? T.green : 'transparent', color: filled ? '#fff' : current ? T.green : T.muted, cursor: filled ? 'pointer' : 'default', fontFamily: 'inherit', fontSize: 10.5, fontWeight: 800, borderRadius: 999, padding: '4px 9px', letterSpacing: '0.02em' }}>L{lvl}</button>
                </React.Fragment>
              );
            })}
          </div>

          {/* next step */}
          {!leaf && (
            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: T.muted, letterSpacing: '0.05em', marginBottom: 8 }}>{kids.length > 1 ? 'WHICH FITS YOUR SITUATION?' : 'GO DEEPER'}</div>
              {kids.map(c => (
                <button key={c.id} onClick={() => funnelGo(c)} style={{ width: '100%', background: '#fff', borderRadius: 14, padding: '13px 15px', marginBottom: 8, border: `1.5px solid ${T.line}`, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 2px 8px rgba(27,36,33,0.05)' }}>
                  <div style={{ flex: 1, fontSize: 13.5, fontWeight: 700, color: T.ink, lineHeight: 1.4 }}>{c.text}</div>
                  <Icon.ChevronRight s={15} c={T.muted}/>
                </button>
              ))}
              <div style={{ marginTop: 4, textAlign: 'center' }}>
                <button onClick={() => toggleStar(m.id, node, path)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, color: starred ? T.green : T.muted }}>
                  {starred ? '★ In your prep plan' : '☆ Add this question to your plan'}
                </button>
              </div>
            </div>
          )}

          {/* leaf → the payoff: a question to take with you */}
          {leaf && (
            <div style={{ marginTop: 14 }}>
              <div style={{ background: T.greenSoft, borderRadius: 16, padding: '15px 16px' }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: T.green, letterSpacing: '0.05em', marginBottom: 8 }}>YOUR QUESTION — FROM GENERAL TO SPECIFIC</div>
                {path.map((n, i) => (
                  <div key={n.id} style={{ display: 'flex', gap: 8, marginBottom: i < path.length - 1 ? 6 : 0 }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: T.green, flexShrink: 0, marginTop: 1 }}>{i + 1}.</span>
                    <span style={{ fontSize: 12.5, color: i === path.length - 1 ? T.ink : T.ink2, fontWeight: i === path.length - 1 ? 700 : 500, lineHeight: 1.4 }}>{n.text}</span>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 12.5, color: T.ink2, lineHeight: 1.5, margin: '14px 2px 12px' }}>
                This is the specific thing to raise with <b style={{ color: T.ink }}>{moment.bring}</b>. Add it to your summary, or ask the AI about this period right now.
              </div>
              <StarBtn big on={path.every(n => !!prep[n.id])} onClick={() => togglePathStar(m.id, path)}/>
              <button onClick={() => setAiScope({ milestone: m, path })} style={{
                width: '100%', height: 50, marginTop: 10, borderRadius: 14, border: 'none', cursor: 'pointer',
                background: `linear-gradient(140deg, ${T.green}, ${T.greenDeep})`, color: '#fff',
                fontFamily: 'inherit', fontSize: 15, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                boxShadow: '0 4px 14px rgba(45,106,79,0.28)',
              }}>
                <Icon.Sparkle s={17} c="#fff"/> Ask AI about this period <span style={{ fontSize: 10, opacity: 0.75, fontWeight: 700 }}>· preview</span>
              </button>
              {/* stage stepper — jump to the previous / next stage */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginTop: 12 }}>
                <button disabled={sheetIndex === 0} onClick={() => openSheet(sheetIndex - 1)} style={{ flex: 1, height: 42, borderRadius: 12, border: `1.5px solid ${T.line}`, background: '#fff', cursor: sheetIndex === 0 ? 'default' : 'pointer', opacity: sheetIndex === 0 ? 0.4 : 1, fontFamily: 'inherit', fontSize: 13, fontWeight: 700, color: T.ink2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>‹ Prev stage</button>
                <span style={{ fontSize: 11, fontWeight: 700, color: T.muted, whiteSpace: 'nowrap' }}>{sheetIndex + 1} / {total}</span>
                <button disabled={sheetIndex === total - 1} onClick={() => openSheet(sheetIndex + 1)} style={{ flex: 1, height: 42, borderRadius: 12, border: `1.5px solid ${T.line}`, background: '#fff', cursor: sheetIndex === total - 1 ? 'default' : 'pointer', opacity: sheetIndex === total - 1 ? 0.4 : 1, fontFamily: 'inherit', fontSize: 13, fontWeight: 700, color: T.ink2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>Next stage ›</button>
              </div>
              <div style={{ fontSize: 11, color: T.muted, textAlign: 'center', marginTop: 10, lineHeight: 1.5 }}>
                In the full app, the AI answers this using {child.name}'s profile.
              </div>
            </div>
          )}
        </>
      );
    } else {
      // ── Overview: all key questions for this stage ──
      const keys = gpsKeys(m);
      body = (
        <>
          <div style={{ background: T.greenSoft, borderRadius: 14, padding: '11px 13px', margin: '6px 0 12px', display: 'flex', gap: 9, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 15 }}>🎯</span>
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 800, color: T.ink, lineHeight: 1.35 }}>{moment.moment}</div>
              <div style={{ fontSize: 11.5, color: T.ink2, lineHeight: 1.45, marginTop: 2 }}>{m.description}</div>
            </div>
          </div>
          <div style={{ fontSize: 11, color: T.muted, margin: '4px 2px 12px', lineHeight: 1.4 }}>
            Tap a question, narrow it down, add it to your plan.
          </div>
          {keys.map(q => {
            const stars = gpsSubtreeStars(q, prep);
            return (
              <button key={q.id} onClick={() => openFunnel(sheetIndex, q)} style={{ width: '100%', background: '#fff', borderRadius: 16, padding: '14px 15px', marginBottom: 10, border: `1.5px solid ${stars ? 'rgba(45,106,79,0.35)' : T.line}`, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', boxShadow: '0 2px 8px rgba(27,36,33,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <div style={{ width: 7, height: 7, borderRadius: 999, background: GPS_RISK_COLOR[q.risk] || T.line, flexShrink: 0 }}/>
                  <div style={{ flex: 1, fontSize: 14.5, fontWeight: 700, color: T.ink, lineHeight: 1.4 }}>{q.text}</div>
                  <Icon.ChevronRight s={16} c={T.muted}/>
                </div>
              </button>
            );
          })}
        </>
      );
    }

    return (
      <div style={{ position: 'absolute', inset: 0, zIndex: 200, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <div onClick={closeSheet} style={{ position: 'absolute', inset: 0, background: 'rgba(27,36,33,0.45)' }}/>
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
                <div style={{ marginTop: 4 }}><AgeChip m={m}/></div>
              </div>
              <button onClick={closeSheet} style={{ width: 30, height: 30, borderRadius: 999, border: 'none', background: T.bgAlt, cursor: 'pointer', fontFamily: 'inherit', fontSize: 17, color: T.muted, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '4px 18px 28px' }}>{body}</div>
        </div>
      </div>
    );
  })() : null;

  // ── Prep plan (🏁 summary) — the payoff ────────────────────────────────
  const prepByMs = GPS_MILESTONES.map(m => {
    const items = gpsFlatQuestions(m).filter(q => prep[q.id]);
    return { m, items };
  }).filter(x => x.items.length);

  const summarySheet = showSummary ? (
    <div style={{ position: 'absolute', inset: 0, zIndex: 200, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <div onClick={() => setShowSummary(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(27,36,33,0.45)' }}/>
      <div style={{ position: 'relative', background: T.bg, borderRadius: '22px 22px 0 0', maxHeight: '90%', display: 'flex', flexDirection: 'column', animation: 'atypSheetUp .28s ease' }}>
        <div style={{ padding: '0 18px', flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 12, paddingBottom: 4 }}>
            <div style={{ width: 36, height: 4, borderRadius: 999, background: T.line }}/>
          </div>
          <div style={{ fontSize: 19, fontWeight: 800, color: T.ink, letterSpacing: '-0.02em', marginTop: 6 }}>{child.name}'s prep plan</div>
          <div style={{ fontSize: 12.5, color: T.ink2, lineHeight: 1.5, marginTop: 2, marginBottom: 10 }}>
            {prepTotal
              ? `${prepTotal} question${prepTotal > 1 ? 's' : ''} ready — the right things to ask, grouped by the meeting they belong to.`
              : 'Nothing added yet — but you can still ask the AI about where you are right now.'}
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 18px 14px' }}>
          {prepTotal === 0 && (
            <>
              <div style={{ background: T.greenSoft, borderRadius: 14, padding: '18px 16px', marginBottom: 14, textAlign: 'center' }}>
                <div style={{ fontSize: 28, marginBottom: 6 }}>📝</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: T.ink, marginBottom: 5 }}>No questions selected yet</div>
                <div style={{ fontSize: 12, color: T.ink2, lineHeight: 1.55 }}>
                  You haven't added any questions to your summary. Open a milestone, narrow a worry to the exact question and tap ★ — or ask the AI about your current stage right now.
                </div>
              </div>
              <div style={{ fontSize: 11, fontWeight: 800, color: T.green, letterSpacing: '0.06em', marginBottom: 8 }}>GOOD PLACES TO START</div>
              {GPS_MILESTONES.slice(0, 3).map((m, idx) => (
                <button key={m.id} onClick={() => { setShowSummary(false); openSheet(GPS_MILESTONES.indexOf(m)); }} style={{ width: '100%', background: '#fff', borderRadius: 14, padding: '12px 14px', marginBottom: 8, border: `1.5px solid ${T.line}`, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 18 }}>{m.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: T.ink }}>{m.label}</div>
                    <div style={{ fontSize: 11, color: T.muted }}>{gpsMoment(m).moment}</div>
                  </div>
                  <Icon.ChevronRight s={15} c={T.muted}/>
                </button>
              ))}
            </>
          )}
          {prepByMs.map(({ m, items }) => (
            <div key={m.id} style={{ marginBottom: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 17 }}>{m.emoji}</span>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 800, color: T.ink }}>{m.label}</div>
                  <div style={{ fontSize: 10.5, color: T.muted }}>Bring to {gpsMoment(m).bring}</div>
                </div>
              </div>
              {items.map(q => (
                <div key={q.id} style={{ background: '#fff', borderRadius: 12, padding: '11px 13px', marginBottom: 7, border: `1px solid ${T.line}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                    <TrackChip timing={q.timing}/>
                    <button onClick={() => toggleStar(m.id, q, [q])} style={{ border: 'none', background: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 11, fontWeight: 700, color: T.muted, padding: 0, flexShrink: 0 }}>remove</button>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: T.ink, lineHeight: 1.4, marginTop: 4 }}>{q.text}</div>
                  {q.why && <div style={{ fontSize: 11, color: T.ink2, lineHeight: 1.45, marginTop: 4 }}>{q.why}</div>}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ padding: '10px 18px 30px', flexShrink: 0, background: T.bg, borderTop: `1px solid ${T.line}` }}>
          <button onClick={() => setAiScope(prepTotal ? { whole: true } : { milestone: GPS_MILESTONES[currentIndex] })} style={{ width: '100%', height: 50, borderRadius: 14, border: 'none', cursor: 'pointer', background: `linear-gradient(140deg, ${T.green}, ${T.greenDeep})`, color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 4px 14px rgba(45,106,79,0.28)' }}>
            <Icon.Sparkle s={17} c="#fff"/> {prepTotal ? 'Ask AI about the whole plan' : 'Ask AI about your current stage'} <span style={{ fontSize: 10, opacity: 0.75, fontWeight: 700 }}>· preview</span>
          </button>
        </div>
      </div>
    </div>
  ) : null;

  const aiSheet = aiScope ? <GPSAIChat child={child} scope={aiScope} gps={gps} onClose={() => setAiScope(null)}/> : null;

  // ── Node-path geometry ────────────────────────────────────────────────
  const BOARD_W = 300, NODE_GAP = 112, TOP = 56;
  const WAVE = [0, 74, 0, -74];
  const nodePos = (i) => ({ x: BOARD_W / 2 + WAVE[i % WAVE.length], y: TOP + i * NODE_GAP });
  const allCenters = GPS_MILESTONES.map((_, i) => nodePos(i));
  const summaryCenter = nodePos(GPS_MILESTONES.length);
  allCenters.push(summaryCenter);
  const boardH = summaryCenter.y + 100;
  // Always reachable: even with an empty plan the summary offers to ask the
  // AI about the current stage.
  const summaryUnlocked = true;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: T.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {questionSheet}
      {summarySheet}
      {aiSheet}
      {/* Child pill */}
      <div style={{ flexShrink: 0, paddingTop: topPad, paddingInline: 18, paddingBottom: 12, background: 'linear-gradient(180deg, rgba(248,246,241,1) 80%, rgba(248,246,241,0))' }}>
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
          <div style={{ fontSize: 14, fontWeight: 800, color: T.ink, marginBottom: 4 }}>The right questions, at the right age</div>
          <div style={{ fontSize: 12, color: T.ink2, lineHeight: 1.5, marginBottom: 12 }}>
            Open a milestone, narrow a worry into the exact question to ask, and add it to {child.name}'s prep plan — a checklist you bring to your meetings.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ flex: 1, height: 6, borderRadius: 99, background: 'rgba(45,106,79,0.15)', overflow: 'hidden' }}>
              <div style={{ width: `${Math.min(100, prepTotal * 12)}%`, height: '100%', background: T.green, borderRadius: 99, transition: 'width .25s' }}/>
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: prepTotal ? T.green : T.muted, whiteSpace: 'nowrap' }}>
              {prepTotal ? `★ ${prepTotal} in your plan` : 'plan is empty'}
            </div>
          </div>
        </div>

        <div style={{ position: 'relative', width: BOARD_W, height: boardH, margin: '6px auto 0' }}>
          <svg width={BOARD_W} height={boardH} style={{ position: 'absolute', left: 0, top: 0 }}>
            {allCenters.slice(1).map((c, idx) => {
              const prev = allCenters[idx];
              const filled = msStates[idx] && msStates[idx].captured;
              return <line key={idx} x1={prev.x} y1={prev.y} x2={c.x} y2={c.y} stroke={filled ? T.mint : T.line} strokeWidth={4} strokeLinecap="round" strokeDasharray={filled ? 'none' : '2 9'}/>;
            })}
          </svg>

          {GPS_MILESTONES.map((m, i) => {
            const st = msStates[i];
            const isUnlocked = unlocked[i];
            const isCaptured = st.captured && isUnlocked;
            const isHere = i === currentIndex;
            const { x, y } = allCenters[i];
            const size = isHere ? 66 : 58;
            const nodeColor = isCaptured ? T.mint : isHere ? T.green : isUnlocked ? '#CFE3D6' : '#E8EBE7';
            const nodeBorder = !isUnlocked ? `2px dashed ${T.line}` : 'none';
            return (
              <React.Fragment key={m.id}>
                <button onClick={isUnlocked ? () => openSheet(i) : undefined} style={{ position: 'absolute', left: x - size / 2, top: y - size / 2, width: size, height: size, borderRadius: 999, padding: 0, background: nodeColor, border: nodeBorder, cursor: isUnlocked ? 'pointer' : 'default', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: isHere ? '0 8px 22px rgba(45,106,79,0.32)' : isCaptured ? '0 4px 12px rgba(45,106,79,0.18)' : '0 2px 6px rgba(27,36,33,0.06)', transition: 'all .2s' }}>
                  {isCaptured ? <span style={{ fontSize: isHere ? 26 : 22 }}>{m.emoji}</span>
                    : !isUnlocked ? <Icon.Lock s={20} c={T.muted}/>
                    : <span style={{ fontSize: isHere ? 28 : 24 }}>{m.emoji}</span>}
                  {m.isTrigger && isUnlocked && (
                    <div style={{ position: 'absolute', top: -4, left: -4, width: 20, height: 20, borderRadius: 999, background: '#FFF3D6', border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>⚡</div>
                  )}
                  {isHere && <div style={{ position: 'absolute', top: -3, right: -3, width: 16, height: 16, borderRadius: 999, background: '#E63946', border: '2px solid #fff', boxShadow: '0 1px 4px rgba(230,57,70,0.5)' }}/>}
                  {st.prepCount > 0 && (
                    <div style={{ position: 'absolute', bottom: -4, right: -4, minWidth: 20, height: 20, padding: '0 5px', borderRadius: 999, background: T.green, color: '#fff', fontSize: 10.5, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>★{st.prepCount}</div>
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

          <button onClick={summaryUnlocked ? () => setShowSummary(true) : undefined} style={{ position: 'absolute', left: summaryCenter.x - 36, top: summaryCenter.y - 36, width: 72, height: 72, borderRadius: 999, padding: 0, background: summaryUnlocked ? `linear-gradient(150deg, ${T.green}, ${T.greenDeep})` : '#E8EBE7', border: summaryUnlocked ? 'none' : `2px dashed ${T.line}`, cursor: summaryUnlocked ? 'pointer' : 'default', fontFamily: 'inherit', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: summaryUnlocked ? '0 6px 18px rgba(45,106,79,0.32)' : 'none' }}>
            <span style={{ fontSize: 22, opacity: summaryUnlocked ? 1 : 0.5 }}>📋</span>
            {prepTotal > 0 && <span style={{ fontSize: 10, fontWeight: 800, color: '#fff', marginTop: 1 }}>{prepTotal}</span>}
          </button>
          <div style={{ position: 'absolute', left: summaryCenter.x, top: summaryCenter.y + 42, transform: 'translateX(-50%)', width: 150, textAlign: 'center', pointerEvents: 'none' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: summaryUnlocked ? T.ink : T.muted, lineHeight: 1.2 }}>Your prep plan</div>
            <div style={{ fontSize: 10.5, color: T.muted, marginTop: 1 }}>{prepTotal ? `${prepTotal} question${prepTotal > 1 ? 's' : ''} to bring` : 'the questions to bring'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── AI chat sheet (preview of the LLM layer) ──────────────────────────

function GPSAIChat({ child, scope, gps, onClose }) {
  const deep = scope.path ? scope.path[scope.path.length - 1] : null;
  const title = deep ? `${scope.milestone.emoji} ${deep.text.slice(0, 40)}${deep.text.length > 40 ? '…' : ''}`
    : scope.milestone ? `${scope.milestone.emoji} ${scope.milestone.label}`
    : `📋 ${child.name}'s plan`;
  const [messages, setMessages] = React.useState([]);
  const [input, setInput] = React.useState('');
  const [typing, setTyping] = React.useState(false);
  const turnRef = React.useRef(0);
  const scrollRef = React.useRef(null);

  React.useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages, typing]);

  const suggestions = deep
    ? ['What should I do about this?', 'Why does this matter now?', 'Turn this into steps for my meeting']
    : scope.milestone
      ? ['What should we focus on first?', `What's coming next for ${child.name}?`, 'Which question is most urgent?']
      : ['What should we do this year?', 'Which questions are most urgent?', 'Summarize my plan'];

  const send = (text) => {
    const clean = (text || '').trim();
    if (!clean || typing) return;
    setMessages(ms => [...ms, { role: 'user', text: clean }]);
    setInput(''); setTyping(true);
    const turn = turnRef.current++;
    setTimeout(() => { setMessages(ms => [...ms, { role: 'ai', text: gpsAIReply(child, scope, gps, clean, turn) }]); setTyping(false); }, 850);
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
              <div style={{ fontSize: 14.5, fontWeight: 800, color: T.ink }}>Ask AI <span style={{ fontSize: 10, fontWeight: 700, color: T.muted }}>· preview</span></div>
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
                  ? <>This is a preview of the full product. The live AI answers this exact question using {child.name}'s profile (age {child.age}, {child.diagnosis}) and your local rules.</>
                  : <>Preview of the full product's AI. It uses {child.name}'s profile (age {child.age}, {child.diagnosis}) and the questions in your plan.</>}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {suggestions.map(s => (
                  <button key={s} onClick={() => send(s)} style={{ width: '100%', padding: '12px 14px', background: '#fff', borderRadius: 14, border: `1.5px solid ${T.line}`, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 600, color: T.green, textAlign: 'left' }}>{s}</button>
                ))}
              </div>
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', marginBottom: 10 }}>
              <div style={{ maxWidth: '85%', padding: '11px 14px', fontSize: 13.5, lineHeight: 1.55, whiteSpace: 'pre-line', background: msg.role === 'user' ? T.green : '#fff', color: msg.role === 'user' ? '#fff' : T.ink, borderRadius: msg.role === 'user' ? '18px 4px 18px 18px' : '4px 18px 18px 18px', boxShadow: msg.role === 'user' ? 'none' : `inset 0 0 0 1px ${T.line}` }}>{msg.text}</div>
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
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send(input)} placeholder="Ask a question…" style={{ flex: 1, height: 46, boxSizing: 'border-box', border: `1.5px solid ${T.line}`, borderRadius: 14, background: '#fff', padding: '0 14px', fontSize: 14, color: T.ink, fontFamily: 'inherit', outline: 'none' }} onFocus={e => e.currentTarget.style.borderColor = T.green} onBlur={e => e.currentTarget.style.borderColor = T.line}/>
            <button onClick={() => send(input)} style={{ width: 46, height: 46, borderRadius: 14, border: 'none', cursor: 'pointer', flexShrink: 0, background: T.green, color: '#fff', fontFamily: 'inherit', fontSize: 18, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: input.trim() && !typing ? 1 : 0.45 }}>↑</button>
          </div>
          <div style={{ fontSize: 10, color: T.muted, textAlign: 'center', marginTop: 8, lineHeight: 1.4 }}>Preview — replies are simulated. The pilot connects a live AI with {child.name}'s full profile.</div>
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
