// aTyp — GPS: Life Journey Guide for ASD Parents.
// Built on the JoyDew "Small Question Model" (atyp-gps-data.jsx): 8 life
// milestones, each a tree of neutral questions. Level 1 screening questions
// reveal Level 2 clarifiers, which reveal Level 3 follow-ups. One-tap answers
// (Yes / No / Not sure / Not relevant) feed the AI layer; unresolved cascade
// questions carry over to the next milestone as top-level questions.
// Progress persists per child in localStorage under 'atyp_gps_v2'.

// ── Question-tree helpers ─────────────────────────────────────────────

function gpsFlatQuestions(milestone) {
  const out = [];
  const walk = (q) => { out.push(q); (q.children || []).forEach(walk); };
  milestone.questions.forEach(walk);
  return out;
}

function gpsAnsweredCount(milestone, answers) {
  return gpsFlatQuestions(milestone).filter(q => answers[q.id]).length;
}

// A milestone's screening pass is done when every Level 1 root is answered.
function gpsRootsAnswered(milestone, answers) {
  return milestone.questions.every(q => answers[q.id]);
}

function gpsOpenCritical(milestone, answers) {
  return milestone.questions.filter(q => !answers[q.id]);
}

// Cascade questions from the previous milestone that the family marked
// "No" / "Not sure" — they resurface here as top-level questions.
function gpsCarriedQuestions(mIndex, answers) {
  if (mIndex === 0) return [];
  const prev = GPS_MILESTONES[mIndex - 1];
  return gpsFlatQuestions(prev).filter(q => q.cascade && GPS_OPEN_ANSWERS.has(answers[q.id]));
}

// Index of the milestone anchoring "you are here" for the child's age.
function currentMilestoneIndex(childAge) {
  for (let i = 0; i < GPS_MILESTONES.length; i++) {
    if (childAge <= GPS_MILESTONES[i].maxAge) return i;
  }
  return GPS_MILESTONES.length - 1;
}

// ── Simulated AI layer ────────────────────────────────────────────────
// Placeholder for the real LLM: it already uses the same inputs the live
// model will get (child profile + the family's answers), so swapping in an
// API call later only means replacing this function.

function gpsAIReply(child, scope, answers, turn) {
  const milestones = scope.milestone ? [scope.milestone] : GPS_MILESTONES;
  const name = child.name, age = child.age;

  const flags = [], open = [], wins = [];
  milestones.forEach(m => {
    gpsFlatQuestions(m).forEach(q => {
      const a = answers[q.id];
      if (!a && q.level === 1) open.push({ q, m });
      else if (a === 'no' || a === 'unsure') flags.push({ q, m, a });
      else if (a === 'yes' && q.level === 1) wins.push({ q, m });
    });
  });

  const answeredAny = flags.length + wins.length > 0 ||
    milestones.some(m => gpsAnsweredCount(m, answers) > 0);

  const openers = [
    `Here's what stands out for ${name} (age ${age}) right now:`,
    `Looking at ${name}'s profile and your answers:`,
    `Good question — here's my read based on what you've shared so far:`,
  ];
  const p = [openers[turn % openers.length]];

  if (!answeredAny) {
    p.push(scope.milestone
      ? `I don't have your answers for ${scope.milestone.label} yet. Tap through the questions above — even quick "Not sure" answers help me point you to what matters most for ${name}.`
      : `You haven't answered questions on the path yet. Open the stage marked "you are here" and tap through a few — I'll get much more specific.`);
  } else {
    if (flags.length) {
      const top = flags.slice(0, 3);
      p.push('The biggest gaps you\'ve flagged:\n' + top.map(f =>
        `• ${f.q.text} — you said "${f.a === 'no' ? 'No' : 'Not sure'}"${scope.milestone ? '' : ` (${f.m.label})`}`
      ).join('\n'));
      const why = top.find(f => f.q.why);
      if (why) p.push(`Why it matters: ${why.q.why}`);
    }
    if (open.length) {
      p.push(`There ${open.length === 1 ? 'is 1 key screening question' : `are ${open.length} key screening questions`} you haven't looked at yet — starting with "${open[0].q.text}"`);
    }
    if (wins.length && flags.length) {
      p.push(`Already in good shape: "${wins[0].q.text}" — keep that going.`);
    }
    if (!flags.length && !open.length) {
      p.push(`You've worked through ${scope.milestone ? 'this stage' : 'the path'} — nothing is unresolved right now. I'd revisit these answers whenever something changes at school, at home, or with services.`);
    }
  }

  const next = GPS_MILESTONES.find(m => m.minAge > age);
  if (next && !scope.milestone) {
    p.push(`Coming up for ${name}: ${next.emoji} ${next.label} (${next.trigger}). The earlier you start, the calmer it goes.`);
  }
  p.push('Want me to turn any of this into concrete next steps?');
  return p.join('\n\n');
}

// ── Answer chips ──────────────────────────────────────────────────────

const GPS_ANSWER_COLORS = { yes: T.green, no: T.red, unsure: T.yellow, na: T.muted };

function AnswerChips({ q, answers, onAnswer }) {
  const current = answers[q.id];
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
      {GPS_ANSWER_OPTIONS.map(opt => {
        const sel = current === opt.id;
        const c = GPS_ANSWER_COLORS[opt.id];
        return (
          <button key={opt.id} onClick={() => onAnswer(q, sel ? null : opt.id)} style={{
            height: 32, padding: '0 12px', borderRadius: 999, cursor: 'pointer',
            fontFamily: 'inherit', fontSize: 12.5, fontWeight: 700,
            border: sel ? 'none' : `1.5px solid ${T.line}`,
            background: sel ? c : '#fff',
            color: sel ? '#fff' : T.ink2,
            display: 'flex', alignItems: 'center', gap: 5,
            transition: 'all .12s',
          }}>
            <span style={{ fontSize: 12 }}>{opt.emoji}</span>{opt.label}
          </button>
        );
      })}
    </div>
  );
}

// One question card. Answering it reveals its child questions (next level).
function QuestionNode({ q, answers, onAnswer, depth = 0 }) {
  const [whyOpen, setWhyOpen] = React.useState(false);
  const answered = answers[q.id];
  const riskDot = q.risk === 'critical' ? T.red : q.risk === 'high' ? T.yellow : T.line;
  return (
    <div style={{ marginLeft: depth ? 16 : 0 }}>
      <div style={{
        background: '#fff', borderRadius: 16, padding: '13px 15px', marginBottom: 8,
        border: `1.5px solid ${answered ? 'rgba(45,106,79,0.25)' : T.line}`,
        boxShadow: depth
          ? `inset 3px 0 0 ${T.mint}, 0 2px 8px rgba(27,36,33,0.04)`
          : '0 2px 8px rgba(27,36,33,0.04)',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
          <div style={{ width: 7, height: 7, borderRadius: 999, background: riskDot, flexShrink: 0, marginTop: 6 }}/>
          <div style={{ flex: 1 }}>
            {depth > 0 && (
              <div style={{ fontSize: 9.5, fontWeight: 800, color: T.muted, letterSpacing: '0.06em', marginBottom: 3 }}>
                LEVEL {q.level}
              </div>
            )}
            <div style={{ fontSize: depth ? 13.5 : 14.5, fontWeight: 700, color: T.ink, lineHeight: 1.4 }}>
              {q.text}
            </div>
            {q.why && (
              <button onClick={() => setWhyOpen(o => !o)} style={{
                marginTop: 5, padding: 0, border: 'none', background: 'none', cursor: 'pointer',
                fontFamily: 'inherit', fontSize: 11.5, fontWeight: 700, color: T.green,
              }}>
                {whyOpen ? '▾ Why this matters' : '▸ Why this matters'}
              </button>
            )}
            {q.why && whyOpen && (
              <div style={{ fontSize: 12, color: T.ink2, lineHeight: 1.5, marginTop: 4 }}>{q.why}</div>
            )}
            <AnswerChips q={q} answers={answers} onAnswer={onAnswer}/>
          </div>
        </div>
      </div>
      {answered && (q.children || []).map(c => (
        <QuestionNode key={c.id} q={c} answers={answers} onAnswer={onAnswer} depth={depth + 1}/>
      ))}
    </div>
  );
}

// ── GPS map (age-anchored milestone path) ─────────────────────────────

function GPSMapContent({ child, openProfile, openSwitcher, embedded = false }) {
  // When embedded the status-bar space is already handled by the parent.
  const topPad = embedded ? 8 : (window.ATYP_MOBILE ? 12 : 54);
  const childAge = child ? child.age : 10;
  const currentIndex = currentMilestoneIndex(childAge);

  // All GPS progress (answers per child) lives in one localStorage blob.
  const childId = child ? child.id : 'default';
  const [gpsStore, setGpsStore] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('atyp_gps_v2')) || {}; } catch { return {}; }
  });
  React.useEffect(() => {
    try { localStorage.setItem('atyp_gps_v2', JSON.stringify(gpsStore)); } catch {}
  }, [gpsStore]);
  const answers = (gpsStore[childId] || {}).answers || {};

  const [sheetIndex, setSheetIndex] = React.useState(null); // milestone sheet
  const [showSummary, setShowSummary] = React.useState(false);
  // AI chat: null | { milestone } | { path: true }
  const [aiScope, setAiScope] = React.useState(null);

  const saveAnswer = (q, optionId) => {
    setGpsStore(prev => {
      const cur = prev[childId] || {};
      const next = { ...(cur.answers || {}) };
      if (optionId) next[q.id] = optionId;
      else {
        // Un-answering hides the sub-questions again — drop their answers too.
        delete next[q.id];
        const dropChildren = (node) => (node.children || []).forEach(c => { delete next[c.id]; dropChildren(c); });
        dropChildren(q);
      }
      return { ...prev, [childId]: { ...cur, answers: next } };
    });
  };

  // Per-milestone state + progressive unlock.
  const msState = GPS_MILESTONES.map((m, i) => ({
    m,
    total: gpsFlatQuestions(m).length,
    answered: gpsAnsweredCount(m, answers),
    rootsDone: gpsRootsAnswered(m, answers),
    carried: gpsCarriedQuestions(i, answers),
  }));
  const unlocked = GPS_MILESTONES.map((_, i) => i <= currentIndex || msState[i - 1].rootsDone);
  const total = GPS_MILESTONES.length;
  const exploredCount = msState.filter(s => s.answered > 0).length;
  const answeredTotal = msState.reduce((n, s) => n + s.answered, 0);
  const questionsTotal = msState.reduce((n, s) => n + s.total, 0);

  // ── Milestone sheet — Now / Planning tracks + carried-over questions ──
  const questionSheet = sheetIndex !== null ? (() => {
    const { m, total: qTotal, answered, carried } = msState[sheetIndex];
    const nowQs = m.questions.filter(q => q.timing === 'current');
    const futureQs = m.questions.filter(q => q.timing === 'future');
    const sectionTitle = (label, hint) => (
      <div style={{ margin: '18px 0 8px' }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: T.green, letterSpacing: '0.06em' }}>{label}</div>
        <div style={{ fontSize: 11.5, color: T.muted, marginTop: 1 }}>{hint}</div>
      </div>
    );
    return (
      <div style={{ position: 'absolute', inset: 0, zIndex: 200, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <div onClick={() => setSheetIndex(null)} style={{ position: 'absolute', inset: 0, background: 'rgba(27,36,33,0.45)' }}/>
        <div style={{ position: 'relative', background: T.bg, borderRadius: '22px 22px 0 0', maxHeight: '90%', display: 'flex', flexDirection: 'column', animation: 'atypSheetUp .28s ease' }}>
          <div style={{ padding: '0 18px', flexShrink: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 12, paddingBottom: 4 }}>
              <div style={{ width: 36, height: 4, borderRadius: 999, background: T.line }}/>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4, marginBottom: 10 }}>
              <span style={{ fontSize: 22 }}>{m.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: T.ink }}>{m.label}</div>
                <div style={{ fontSize: 11.5, color: T.muted }}>{m.trigger} · {m.domain}</div>
              </div>
              <button onClick={() => setSheetIndex(null)} style={{ width: 30, height: 30, borderRadius: 999, border: 'none', background: T.bgAlt, cursor: 'pointer', fontFamily: 'inherit', fontSize: 17, color: T.muted, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <div style={{ flex: 1, height: 6, borderRadius: 99, background: 'rgba(45,106,79,0.15)', overflow: 'hidden' }}>
                <div style={{ width: `${Math.round((answered / qTotal) * 100)}%`, height: '100%', background: T.green, borderRadius: 99, transition: 'width .25s' }}/>
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.green, whiteSpace: 'nowrap' }}>{answered}/{qTotal} answered</div>
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '0 18px 14px' }}>
            <div style={{ fontSize: 12.5, color: T.ink2, lineHeight: 1.5, margin: '8px 0 2px' }}>{m.description}</div>

            {carried.length > 0 && (
              <>
                <div style={{ margin: '16px 0 8px', background: '#FFF3D6', borderRadius: 14, padding: '10px 13px' }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#9C7A1A', letterSpacing: '0.05em' }}>CARRIED OVER FROM {GPS_MILESTONES[sheetIndex - 1].label.toUpperCase()}</div>
                  <div style={{ fontSize: 11.5, color: '#7A6115', marginTop: 2, lineHeight: 1.45 }}>
                    You marked these unresolved earlier — at this stage they become primary questions.
                  </div>
                </div>
                {carried.map(q => (
                  <QuestionNode key={`carry_${q.id}`} q={{ ...q, children: [] }} answers={answers} onAnswer={saveAnswer}/>
                ))}
              </>
            )}

            {sectionTitle('NOW', 'Where things stand today')}
            {nowQs.map(q => <QuestionNode key={q.id} q={q} answers={answers} onAnswer={saveAnswer}/>)}

            {sectionTitle('PLANNING AHEAD', 'What to prepare before the next stage')}
            {futureQs.map(q => <QuestionNode key={q.id} q={q} answers={answers} onAnswer={saveAnswer}/>)}

            <div style={{ fontSize: 11, color: T.muted, textAlign: 'center', marginTop: 10, lineHeight: 1.5 }}>
              There is no right answer — only your family's path.
            </div>
          </div>

          <div style={{ padding: '10px 18px 30px', flexShrink: 0, background: T.bg, borderTop: `1px solid ${T.line}` }}>
            <button onClick={() => setAiScope({ milestone: m })} style={{
              width: '100%', height: 50, borderRadius: 14, border: 'none', cursor: 'pointer',
              background: `linear-gradient(140deg, ${T.green}, ${T.greenDeep})`, color: '#fff',
              fontFamily: 'inherit', fontSize: 15, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: '0 4px 14px rgba(45,106,79,0.28)',
            }}>
              <Icon.Sparkle s={17} c="#fff"/> Ask AI about this stage
            </button>
          </div>
        </div>
      </div>
    );
  })() : null;

  // ── Path summary (🏁) — progress + open critical topics per milestone ─
  const openTopics = [];
  msState.forEach((s, i) => {
    if (i > currentIndex && s.answered === 0) return; // not there yet
    gpsOpenCritical(s.m, answers).forEach(q => openTopics.push({ q, m: s.m }));
    s.carried.forEach(q => openTopics.push({ q, m: s.m, carried: true }));
  });

  const summarySheet = showSummary ? (
    <div style={{ position: 'absolute', inset: 0, zIndex: 200, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <div onClick={() => setShowSummary(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(27,36,33,0.45)' }}/>
      <div style={{ position: 'relative', background: T.bg, borderRadius: '22px 22px 0 0', maxHeight: '90%', display: 'flex', flexDirection: 'column', animation: 'atypSheetUp .28s ease' }}>
        <div style={{ padding: '0 18px', flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 12, paddingBottom: 4 }}>
            <div style={{ width: 36, height: 4, borderRadius: 999, background: T.line }}/>
          </div>
          <div style={{ fontSize: 19, fontWeight: 800, color: T.ink, letterSpacing: '-0.02em', marginTop: 6 }}>
            Path summary
          </div>
          <div style={{ fontSize: 12.5, color: T.ink2, lineHeight: 1.5, marginTop: 2, marginBottom: 10 }}>
            {answeredTotal} of {questionsTotal} questions answered across {child.name}'s path.
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 18px 14px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {msState.map((s, i) => {
              const openCrit = gpsOpenCritical(s.m, answers).length;
              return (
                <button key={s.m.id} onClick={() => { setShowSummary(false); setSheetIndex(i); }} style={{
                  width: '100%', background: '#fff', borderRadius: 14, padding: '11px 13px',
                  border: `1.5px solid ${T.line}`, cursor: 'pointer', fontFamily: 'inherit',
                  display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left',
                }}>
                  <span style={{ fontSize: 18 }}>{s.m.emoji}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: T.ink }}>{s.m.label}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                      <div style={{ flex: 1, height: 4, borderRadius: 99, background: 'rgba(45,106,79,0.12)', overflow: 'hidden' }}>
                        <div style={{ width: `${Math.round((s.answered / s.total) * 100)}%`, height: '100%', background: T.green, borderRadius: 99 }}/>
                      </div>
                      <span style={{ fontSize: 10.5, fontWeight: 700, color: T.muted }}>{s.answered}/{s.total}</span>
                    </div>
                  </div>
                  {s.answered > 0 && openCrit > 0 && (
                    <span style={{ fontSize: 10, fontWeight: 800, color: '#fff', background: T.red, borderRadius: 999, padding: '3px 8px', flexShrink: 0 }}>
                      {openCrit} open
                    </span>
                  )}
                  <Icon.ChevronRight s={14} c={T.muted}/>
                </button>
              );
            })}
          </div>

          {openTopics.length > 0 && (
            <>
              <div style={{ fontSize: 11, fontWeight: 800, color: T.green, letterSpacing: '0.06em', margin: '18px 0 8px' }}>
                OPEN CRITICAL TOPICS
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {openTopics.slice(0, 8).map(({ q, m, carried }) => (
                  <div key={q.id} style={{ background: carried ? '#FFF3D6' : '#fff', borderRadius: 12, padding: '10px 12px', border: `1px solid ${carried ? 'rgba(156,122,26,0.25)' : T.line}` }}>
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: T.ink, lineHeight: 1.4 }}>{q.text}</div>
                    <div style={{ fontSize: 10.5, color: T.muted, marginTop: 3 }}>{m.emoji} {m.label}{carried ? ' · carried over' : ''}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <div style={{ padding: '10px 18px 30px', flexShrink: 0, background: T.bg, borderTop: `1px solid ${T.line}` }}>
          <button onClick={() => setAiScope({ path: true })} style={{
            width: '100%', height: 50, borderRadius: 14, border: 'none', cursor: 'pointer',
            background: `linear-gradient(140deg, ${T.green}, ${T.greenDeep})`, color: '#fff',
            fontFamily: 'inherit', fontSize: 15, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: '0 4px 14px rgba(45,106,79,0.28)',
          }}>
            <Icon.Sparkle s={17} c="#fff"/> Ask AI about the whole path
          </button>
        </div>
      </div>
    </div>
  ) : null;

  // ── AI chat sheet ─────────────────────────────────────────────────────
  const aiSheet = aiScope ? (
    <GPSAIChat child={child} scope={aiScope} answers={answers} onClose={() => setAiScope(null)}/>
  ) : null;

  // ── Node-path geometry (serpentine) ───────────────────────────────────
  const BOARD_W = 300, NODE_GAP = 108, TOP = 56;
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
        background: 'linear-gradient(180deg, rgba(248,246,241,1) 80%, rgba(248,246,241,0))',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: '#fff', borderRadius: 999, padding: '6px 12px 6px 6px',
          boxShadow: `inset 0 0 0 1px ${T.line}`,
        }}>
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
        {/* Intro + progress */}
        <div style={{ background: T.greenSoft, borderRadius: 16, padding: '14px 16px', marginBottom: 18 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: T.ink, marginBottom: 4 }}>
            {child.name}'s life path
          </div>
          <div style={{ fontSize: 12, color: T.ink2, lineHeight: 1.5, marginBottom: 12 }}>
            8 milestones, one path. Answer the questions at each stage — the AI uses them, together with {child.name}'s profile, to guide you.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ flex: 1, height: 6, borderRadius: 99, background: 'rgba(45,106,79,0.15)', overflow: 'hidden' }}>
              <div style={{ width: `${Math.round((answeredTotal / questionsTotal) * 100)}%`, height: '100%', background: T.green, borderRadius: 99, transition: 'width .25s' }}/>
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: T.green, whiteSpace: 'nowrap' }}>
              {answeredTotal}/{questionsTotal} questions
            </div>
          </div>
        </div>

        {/* Winding node path */}
        <div style={{ position: 'relative', width: BOARD_W, height: boardH, margin: '6px auto 0' }}>
          <svg width={BOARD_W} height={boardH} style={{ position: 'absolute', left: 0, top: 0 }}>
            {allCenters.slice(1).map((c, idx) => {
              const prev = allCenters[idx];
              const st = msState[idx];
              const filled = st && st.rootsDone && st.answered > 0;
              return (
                <line key={idx} x1={prev.x} y1={prev.y} x2={c.x} y2={c.y}
                  stroke={filled ? T.mint : T.line} strokeWidth={4} strokeLinecap="round"
                  strokeDasharray={filled ? 'none' : '2 9'}/>
              );
            })}
          </svg>

          {GPS_MILESTONES.map((m, i) => {
            const st = msState[i];
            const isUnlocked = unlocked[i];
            const isComplete = st.rootsDone && isUnlocked && st.answered > 0;
            const isHere     = i === currentIndex;
            const { x, y }   = allCenters[i];
            const size       = isHere ? 66 : 58;
            const nodeColor  = isComplete ? T.mint : isHere ? T.green : isUnlocked ? '#CFE3D6' : '#E8EBE7';
            const nodeBorder = !isUnlocked ? `2px dashed ${T.line}` : 'none';
            const carriedIn  = st.carried.length;

            return (
              <React.Fragment key={m.id}>
                <button
                  onClick={isUnlocked ? () => setSheetIndex(i) : undefined}
                  style={{
                    position: 'absolute', left: x - size / 2, top: y - size / 2,
                    width: size, height: size, borderRadius: 999, padding: 0,
                    background: nodeColor, border: nodeBorder,
                    cursor: isUnlocked ? 'pointer' : 'default', fontFamily: 'inherit',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: isHere ? '0 8px 22px rgba(45,106,79,0.32)' : isComplete ? '0 4px 12px rgba(45,106,79,0.18)' : '0 2px 6px rgba(27,36,33,0.06)',
                    transition: 'all .2s',
                  }}>
                  {isComplete
                    ? <Icon.Check s={24} c="#fff" sw={2.8}/>
                    : !isUnlocked
                      ? <Icon.Lock s={20} c={T.muted}/>
                      : <span style={{ fontSize: isHere ? 28 : 24 }}>{m.emoji}</span>}
                  {isHere && (
                    <div style={{ position: 'absolute', top: -3, right: -3, width: 16, height: 16, borderRadius: 999, background: '#E63946', border: '2px solid #fff', boxShadow: '0 1px 4px rgba(230,57,70,0.5)' }}/>
                  )}
                  {st.answered > 0 && !isComplete && (
                    <div style={{ position: 'absolute', bottom: -3, right: -3, minWidth: 18, height: 18, padding: '0 4px', borderRadius: 999, background: T.green, color: '#fff', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>{st.answered}</div>
                  )}
                  {carriedIn > 0 && isUnlocked && (
                    <div style={{ position: 'absolute', top: -3, left: -3, minWidth: 18, height: 18, padding: '0 4px', borderRadius: 999, background: '#E8B948', color: '#fff', fontSize: 10, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>↩{carriedIn}</div>
                  )}
                </button>
                <div style={{ position: 'absolute', left: x, top: y + size / 2 + 5, transform: 'translateX(-50%)', width: 138, textAlign: 'center', pointerEvents: 'none' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: isUnlocked ? T.ink : T.muted, lineHeight: 1.2 }}>{m.label}</div>
                  <div style={{ fontSize: 10.5, color: T.muted, marginTop: 1 }}>{m.sub}</div>
                  {isHere && <div style={{ fontSize: 9.5, fontWeight: 700, color: '#E63946', marginTop: 2, letterSpacing: '0.03em' }}>YOU ARE HERE</div>}
                </div>
              </React.Fragment>
            );
          })}

          {/* summary node — opens the whole-path summary */}
          <button
            onClick={summaryUnlocked ? () => setShowSummary(true) : undefined}
            style={{
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
              <div style={{ position: 'absolute', bottom: -3, right: -6, height: 18, padding: '0 6px', borderRadius: 999,
                background: T.red, color: '#fff',
                fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '2px solid #fff' }}>
                {openTopics.length}
              </div>
            )}
          </button>
          <div style={{ position: 'absolute', left: summaryCenter.x, top: summaryCenter.y + 38, transform: 'translateX(-50%)', width: 138, textAlign: 'center', pointerEvents: 'none' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: summaryUnlocked ? T.ink : T.muted, lineHeight: 1.2 }}>Path summary</div>
            <div style={{ fontSize: 10.5, color: T.muted, marginTop: 1 }}>Progress & open topics</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── AI chat sheet (simulated LLM layer) ───────────────────────────────

function GPSAIChat({ child, scope, answers, onClose }) {
  const title = scope.milestone ? `${scope.milestone.emoji} ${scope.milestone.label}` : `🏁 ${child.name}'s whole path`;
  const [messages, setMessages] = React.useState([]);
  const [input, setInput] = React.useState('');
  const [typing, setTyping] = React.useState(false);
  const turnRef = React.useRef(0);
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, typing]);

  const suggestions = scope.milestone
    ? ['What should we focus on first?', 'Why do these questions matter now?', `What's coming next for ${child.name}?`]
    : ['Where are our biggest gaps?', 'What should we do this year?', 'Summarize our progress'];

  const send = (text) => {
    const clean = (text || '').trim();
    if (!clean || typing) return;
    setMessages(ms => [...ms, { role: 'user', text: clean }]);
    setInput('');
    setTyping(true);
    const turn = turnRef.current++;
    setTimeout(() => {
      setMessages(ms => [...ms, { role: 'ai', text: gpsAIReply(child, scope, answers, turn) }]);
      setTyping(false);
    }, 900);
  };

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 300, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(27,36,33,0.5)' }}/>
      <div style={{ position: 'relative', background: T.bg, borderRadius: '22px 22px 0 0', height: '92%', display: 'flex', flexDirection: 'column', animation: 'atypSheetUp .28s ease' }}>
        {/* header */}
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
              <div style={{ fontSize: 11.5, color: T.muted, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title} · uses {child.name}'s profile & your answers</div>
            </div>
            <button onClick={onClose} style={{ width: 30, height: 30, borderRadius: 999, border: 'none', background: T.bgAlt, cursor: 'pointer', fontFamily: 'inherit', fontSize: 17, color: T.muted, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
          </div>
        </div>

        {/* messages */}
        <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '14px 18px' }}>
          {messages.length === 0 && !typing && (
            <div style={{ textAlign: 'center', padding: '18px 10px' }}>
              <div style={{ fontSize: 13, color: T.ink2, lineHeight: 1.55, marginBottom: 14 }}>
                Ask anything about {scope.milestone ? `the ${scope.milestone.label} stage` : `${child.name}'s path`} — I'll answer using {child.name}'s profile (age {child.age}, {child.diagnosis}) and the answers you've given.
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
              <div style={{
                maxWidth: '85%', padding: '11px 14px', fontSize: 13.5, lineHeight: 1.55,
                whiteSpace: 'pre-line',
                background: msg.role === 'user' ? T.green : '#fff',
                color: msg.role === 'user' ? '#fff' : T.ink,
                borderRadius: msg.role === 'user' ? '18px 4px 18px 18px' : '4px 18px 18px 18px',
                boxShadow: msg.role === 'user' ? 'none' : `inset 0 0 0 1px ${T.line}`,
              }}>{msg.text}</div>
            </div>
          ))}
          {typing && (
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 10 }}>
              <div style={{ padding: '13px 16px', background: '#fff', borderRadius: '4px 18px 18px 18px', boxShadow: `inset 0 0 0 1px ${T.line}`, fontSize: 13, color: T.muted }}>
                Thinking…
              </div>
            </div>
          )}
        </div>

        {/* input */}
        <div style={{ padding: '10px 18px 26px', flexShrink: 0, borderTop: `1px solid ${T.line}`, background: T.bg }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send(input)}
              placeholder={`Ask about ${scope.milestone ? scope.milestone.label : 'the path'}…`}
              style={{ flex: 1, height: 46, boxSizing: 'border-box', border: `1.5px solid ${T.line}`, borderRadius: 14, background: '#fff', padding: '0 14px', fontSize: 14, color: T.ink, fontFamily: 'inherit', outline: 'none' }}
              onFocus={e => e.currentTarget.style.borderColor = T.green}
              onBlur={e => e.currentTarget.style.borderColor = T.line}
            />
            <button onClick={() => send(input)} style={{
              width: 46, height: 46, borderRadius: 14, border: 'none', cursor: 'pointer', flexShrink: 0,
              background: T.green, color: '#fff', fontFamily: 'inherit', fontSize: 18, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: input.trim() && !typing ? 1 : 0.45,
            }}>↑</button>
          </div>
          <div style={{ fontSize: 10, color: T.muted, textAlign: 'center', marginTop: 8, lineHeight: 1.4 }}>
            Preview — replies are simulated from your answers. The pilot connects a live AI with {child.name}'s full profile.
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
      <ScreenHeader title={stage.label} subtitle={stage.sub} onBack={back}/>
      <div style={{ padding: '0 18px 32px' }}>
        <div style={{ background: T.greenSoft, borderRadius: 18, padding: '16px 18px', marginBottom: 20, display: 'flex', gap: 12 }}>
          <div style={{ fontSize: 28 }}>{stage.emoji}</div>
          <div style={{ fontSize: 14, color: T.ink2, lineHeight: 1.5 }}>{stage.description}</div>
        </div>
        {stage.questions.map(q => (
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
function StageDetailScreen({ back }) { return <LifeMomentScreen stage={GPS_MILESTONES[2]} back={back}/>; }
function QuestionDetailScreen({ back }) { return <LifeMomentScreen stage={GPS_MILESTONES[2]} back={back}/>; }

Object.assign(window, { MapScreen, GPSMapContent, StageDetailScreen, QuestionDetailScreen, AGE_STAGES, stagesForChild });
