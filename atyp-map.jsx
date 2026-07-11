// aTyp — GPS: Life Journey Guide for ASD Parents.
// Built directly on Moisha's question grid (atyp-gps-data.jsx): 8 age stages,
// each holding his categories (Medical, Therapy, Education, …). Every category
// shows its headline question (Level 1) then follow-ups (Level 2), split into
// Current ("now") and Future ("planning ahead"). One-tap answers
// (Yes / No / Not sure / Not relevant) feed the AI layer. No hidden reveals —
// opening a stage shows every question flat.
// Progress persists per child in localStorage under 'atyp_gps_v2'.

// ── Question helpers ──────────────────────────────────────────────────

// Every question in a stage, across all its categories (flat).
function gpsFlatQuestions(stage) {
  return stage.categories.reduce((out, c) => out.concat(c.questions), []);
}

function gpsAnsweredCount(stage, answers) {
  return gpsFlatQuestions(stage).filter(q => answers[q.id]).length;
}

// "Key questions" = the Level-1 headline of each category.
function gpsKeyQuestions(stage) {
  return gpsFlatQuestions(stage).filter(q => q.level === 1);
}

function gpsKeyAnswered(stage, answers) {
  return gpsKeyQuestions(stage).filter(q => answers[q.id]).length;
}

// Key questions still unanswered in a stage.
function gpsOpenKey(stage, answers) {
  return gpsKeyQuestions(stage).filter(q => !answers[q.id]);
}

// Index of the age stage anchoring "you are here" for the child's age.
function currentStageIndex(childAge) {
  for (let i = 0; i < GPS_MILESTONES.length; i++) {
    if (childAge <= GPS_MILESTONES[i].maxAge) return i;
  }
  return GPS_MILESTONES.length - 1;
}

// ── Simulated AI layer ────────────────────────────────────────────────
// Placeholder for the real LLM: it already uses the same inputs the live
// model will get (child profile + the family's answers), so swapping in an
// API call later only means replacing this function.

function gpsAIReply(child, scope, answers, userText, turn) {
  const milestones = scope.milestone ? [scope.milestone] : GPS_MILESTONES;
  const name = child.name, age = child.age;
  const LBL = { yes: 'Yes', no: 'No', unsure: 'Not sure', na: 'Not relevant' };

  // Everything the family has actually told us, in question order.
  const answered = [], flags = [], wins = [], open = [];
  milestones.forEach(m => {
    gpsFlatQuestions(m).forEach(q => {
      const a = answers[q.id];
      if (!a) { if (q.level === 1) open.push({ q, m }); return; }
      answered.push({ q, a, m });
      if (a === 'no' || a === 'unsure') flags.push({ q, a, m });
      else if (a === 'yes') wins.push({ q, m });
    });
  });

  // Crude intent detection so the reply follows the user's question.
  const t = (userText || '').toLowerCase();
  const wantsWhy   = /why|matter|важлив|чому/.test(t);
  const wantsNext  = /next|coming|ahead|later|далі|наступ/.test(t);
  const wantsFocus = /focus|first|start|priorit|begin|фокус|почат/.test(t);
  const wantsRecap = /summar|progress|recap|far|підсум|прогрес/.test(t);

  const here = scope.milestone ? `the ${scope.milestone.label} stage` : `${name}'s whole path`;
  const p = [];

  // Nothing answered in scope — say so explicitly instead of pretending.
  if (!answered.length) {
    p.push(`You haven't answered anything in ${here} yet, so I can only speak generally for a ${age}-year-old${child.diagShort ? ` with ${child.diagShort}` : ''}.`);
    if (open.length) p.push(`Answer even one key question and I'll get specific. A good place to start: "${open[0].q.text}"`);
    return p.join('\n\n');
  }

  // 1) Mirror the answers back, so it's clear the reply is built on them.
  const mark = (a) => a === 'yes' ? '✓' : a === 'na' ? '—' : '⚠';
  const mirror = answered.slice(-5).map(({ q, a, m }) =>
    `${mark(a)} "${q.text}" → ${LBL[a]}${scope.milestone ? '' : ` (${m.label})`}`).join('\n');
  const openers = [
    `Here's my read for ${name} (age ${age}), built on what you've told me:`,
    `Working from your ${answered.length} answer${answered.length > 1 ? 's' : ''} in ${here}:`,
    `Let me anchor this in what you've shared so far:`,
  ];
  p.push(`${openers[turn % openers.length]}\n\n${mirror}`);

  // 2) Answer-driven guidance, steered by the question's intent.
  if (flags.length) {
    p.push(`Where I'd focus${wantsFocus ? ' first' : ''}:\n` + flags.slice(0, 3).map((f, i) =>
      `${i + 1}. ${f.q.text} — you marked "${LBL[f.a]}"`
    ).join('\n'));
  } else {
    p.push(`Nothing you've answered in ${here} is unresolved — ${wins.length ? `"${wins[0].q.text}" looks solid` : 'good footing so far'}. I'd revisit these whenever something changes at school, at home, or with services.`);
  }

  if (wantsRecap && scope.milestone === undefined) {
    const started = GPS_MILESTONES.filter(m => gpsFlatQuestions(m).some(q => answers[q.id]));
    p.push(`Progress so far: ${started.length} of ${GPS_MILESTONES.length} stages started, ${answered.length} questions answered, ${flags.length} flagged unresolved.`);
  }

  if (open.length && !wantsNext) {
    p.push(`Still unanswered in ${here}: ${open.length} key question${open.length > 1 ? 's' : ''} — next up "${open[0].q.text}"`);
  }

  const next = GPS_MILESTONES.find(m => m.minAge > age);
  if (next && (wantsNext || !scope.milestone)) {
    p.push(`Coming up for ${name}: ${next.emoji} ${next.label}. The earlier you start, the calmer it goes.`);
  }

  p.push(turn % 2 === 0
    ? 'Want me to turn any of this into concrete next steps?'
    : 'Ask me about any of these — or answer another question above and I\'ll update my read.');
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

// One flat question card with its answer chips. `headline` = the Level-1
// question of a category (shown a touch bigger, with a green accent bar).
function QuestionNode({ q, answers, onAnswer, headline = false }) {
  const answered = answers[q.id];
  return (
    <div style={{
      background: '#fff', borderRadius: 16, padding: headline ? '14px 16px' : '12px 14px',
      marginBottom: 8,
      border: `1.5px solid ${answered ? 'rgba(45,106,79,0.25)' : T.line}`,
      boxShadow: headline
        ? `inset 3px 0 0 ${T.green}, 0 2px 8px rgba(27,36,33,0.05)`
        : '0 2px 8px rgba(27,36,33,0.04)',
    }}>
      <div style={{ fontSize: headline ? 15 : 13.5, fontWeight: 700, color: T.ink, lineHeight: 1.4 }}>
        {q.text}
      </div>
      <AnswerChips q={q} answers={answers} onAnswer={onAnswer}/>
    </div>
  );
}

// ── GPS map (age-anchored milestone path) ─────────────────────────────

function GPSMapContent({ child, openProfile, openSwitcher, embedded = false }) {
  // When embedded the status-bar space is already handled by the parent.
  const topPad = embedded ? 8 : (window.ATYP_MOBILE ? 12 : 54);
  const childAge = child ? child.age : 10;
  const currentIndex = currentStageIndex(childAge);

  // All GPS progress (answers per child) lives in one localStorage blob.
  const childId = child ? child.id : 'default';
  const [gpsStore, setGpsStore] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('atyp_gps_v2')) || {}; } catch { return {}; }
  });
  React.useEffect(() => {
    try { localStorage.setItem('atyp_gps_v2', JSON.stringify(gpsStore)); } catch {}
  }, [gpsStore]);
  const answers = (gpsStore[childId] || {}).answers || {};

  const [sheetIndex, setSheetIndex] = React.useState(null); // open age-stage sheet
  const openSheet = (i) => setSheetIndex(i);
  const [showSummary, setShowSummary] = React.useState(false);
  // AI chat: null | { milestone } | { path: true }
  const [aiScope, setAiScope] = React.useState(null);

  const saveAnswer = (q, optionId) => {
    setGpsStore(prev => {
      const cur = prev[childId] || {};
      const next = { ...(cur.answers || {}) };
      if (optionId) next[q.id] = optionId;
      else delete next[q.id];
      return { ...prev, [childId]: { ...cur, answers: next } };
    });
  };

  // Per-stage progress + progressive unlock.
  const msState = GPS_MILESTONES.map((m) => {
    const keyTotal = gpsKeyQuestions(m).length;
    const keyAns = gpsKeyAnswered(m, answers);
    return {
      m,
      total: gpsFlatQuestions(m).length,
      answered: gpsAnsweredCount(m, answers),
      keyAns,
      keyTotal,
      keyDone: keyTotal > 0 && keyAns === keyTotal,
      started: gpsFlatQuestions(m).some(q => answers[q.id]),
    };
  });
  // The next stage opens as soon as the previous one has been started —
  // families answer the questions that speak to them, not all of them.
  const unlocked = GPS_MILESTONES.map((_, i) => i <= currentIndex || msState[i - 1].started);
  const total = GPS_MILESTONES.length;
  const exploredCount = msState.filter(s => s.answered > 0).length;
  const answeredTotal = msState.reduce((n, s) => n + s.answered, 0);

  // ── Age-stage sheet ───────────────────────────────────────────────────
  // Opening a stage shows every question flat, grouped by Moisha's categories.
  // Per category: the Level-1 headline first, then Current follow-ups, then
  // Future follow-ups. Nothing is hidden behind a tap.
  const questionSheet = sheetIndex !== null ? (() => {
    const { m, answered, keyAns, keyTotal } = msState[sheetIndex];
    const isHere = sheetIndex === currentIndex;

    const subLabel = (label, color) => (
      <div style={{ fontSize: 10.5, fontWeight: 800, color, letterSpacing: '0.07em', margin: '12px 0 6px' }}>{label}</div>
    );

    const categoryBlock = (cat) => {
      const l1 = cat.questions.filter(q => q.level === 1);
      const l2 = cat.questions.filter(q => q.level !== 1);
      const curQ = l2.filter(q => q.timing === 'current');
      const futQ = l2.filter(q => q.timing === 'future');
      return (
        <div key={cat.name} style={{ marginTop: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 18 }}>{cat.emoji}</span>
            <div style={{ fontSize: 14.5, fontWeight: 800, color: T.ink, letterSpacing: '-0.01em' }}>{cat.name}</div>
          </div>
          {l1.map(q => <QuestionNode key={q.id} q={q} answers={answers} onAnswer={saveAnswer} headline/>)}
          {curQ.length > 0 && <React.Fragment>{subLabel('CURRENT · NOW', T.green)}{curQ.map(q => <QuestionNode key={q.id} q={q} answers={answers} onAnswer={saveAnswer}/>)}</React.Fragment>}
          {futQ.length > 0 && <React.Fragment>{subLabel('FUTURE · PLANNING AHEAD', '#9C7A1A')}{futQ.map(q => <QuestionNode key={q.id} q={q} answers={answers} onAnswer={saveAnswer}/>)}</React.Fragment>}
        </div>
      );
    };

    return (
      <div style={{ position: 'absolute', inset: 0, zIndex: 200, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <div onClick={() => openSheet(null)} style={{ position: 'absolute', inset: 0, background: 'rgba(27,36,33,0.45)' }}/>
        <div style={{ position: 'relative', background: T.bg, borderRadius: '22px 22px 0 0', maxHeight: '90%', display: 'flex', flexDirection: 'column', animation: 'atypSheetUp .28s ease' }}>
          <div style={{ padding: '0 18px', flexShrink: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 12, paddingBottom: 4 }}>
              <div style={{ width: 36, height: 4, borderRadius: 999, background: T.line }}/>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4, marginBottom: 10 }}>
              <span style={{ fontSize: 22 }}>{m.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: T.ink }}>
                  {m.label}
                  {isHere && <span style={{ fontSize: 9.5, fontWeight: 800, color: '#E63946', marginLeft: 8, letterSpacing: '0.03em' }}>YOU ARE HERE</span>}
                </div>
                <div style={{ fontSize: 11.5, color: T.muted }}>{m.sub} · {m.categories.length} categories</div>
              </div>
              <button onClick={() => openSheet(null)} style={{ width: 30, height: 30, borderRadius: 999, border: 'none', background: T.bgAlt, cursor: 'pointer', fontFamily: 'inherit', fontSize: 17, color: T.muted, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <div style={{ flex: 1, height: 6, borderRadius: 99, background: 'rgba(45,106,79,0.15)', overflow: 'hidden' }}>
                <div style={{ width: `${keyTotal ? Math.round((keyAns / keyTotal) * 100) : 0}%`, height: '100%', background: T.green, borderRadius: 99, transition: 'width .25s' }}/>
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.green, whiteSpace: 'nowrap' }}>
                {keyAns}/{keyTotal} key{answered > keyAns ? ` · ${answered} answered` : ''}
              </div>
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '0 18px 14px' }}>
            <div style={{ fontSize: 12.5, color: T.ink2, lineHeight: 1.5, margin: '8px 0 2px' }}>{m.description}</div>
            {m.categories.map(categoryBlock)}
            <div style={{ fontSize: 11, color: T.muted, textAlign: 'center', marginTop: 18, lineHeight: 1.5 }}>
              Answer what speaks to you — there is no right answer, only your family's path.
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
    gpsOpenKey(s.m, answers).forEach(q => openTopics.push({ q, m: s.m }));
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
            {answeredTotal} question{answeredTotal === 1 ? '' : 's'} answered across {child.name}'s path.
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 18px 14px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {msState.map((s, i) => {
              const openCrit = gpsOpenKey(s.m, answers).length;
              return (
                <button key={s.m.id} onClick={() => { setShowSummary(false); openSheet(i); }} style={{
                  width: '100%', background: '#fff', borderRadius: 14, padding: '11px 13px',
                  border: `1.5px solid ${T.line}`, cursor: 'pointer', fontFamily: 'inherit',
                  display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left',
                }}>
                  <span style={{ fontSize: 18 }}>{s.m.emoji}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: T.ink }}>{s.m.label}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                      <div style={{ flex: 1, height: 4, borderRadius: 99, background: 'rgba(45,106,79,0.12)', overflow: 'hidden' }}>
                        <div style={{ width: `${s.keyTotal ? Math.round((s.keyAns / s.keyTotal) * 100) : 0}%`, height: '100%', background: T.green, borderRadius: 99 }}/>
                      </div>
                      <span style={{ fontSize: 10.5, fontWeight: 700, color: T.muted }}>{s.keyAns}/{s.keyTotal} key</span>
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
                OPEN KEY QUESTIONS
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {openTopics.slice(0, 8).map(({ q, m }) => (
                  <div key={q.id} style={{ background: '#fff', borderRadius: 12, padding: '10px 12px', border: `1px solid ${T.line}` }}>
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: T.ink, lineHeight: 1.4 }}>{q.text}</div>
                    <div style={{ fontSize: 10.5, color: T.muted, marginTop: 3 }}>{m.emoji} {m.label}</div>
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
            8 age stages, one path. Open a stage to see the questions to ask — grouped by category, split into now and planning ahead. The AI uses your answers with {child.name}'s profile to guide you.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ flex: 1, height: 6, borderRadius: 99, background: 'rgba(45,106,79,0.15)', overflow: 'hidden' }}>
              <div style={{ width: `${Math.round((exploredCount / total) * 100)}%`, height: '100%', background: T.green, borderRadius: 99, transition: 'width .25s' }}/>
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: T.green, whiteSpace: 'nowrap' }}>
              {exploredCount}/{total} stages
            </div>
          </div>
        </div>

        {/* Winding node path */}
        <div style={{ position: 'relative', width: BOARD_W, height: boardH, margin: '6px auto 0' }}>
          <svg width={BOARD_W} height={boardH} style={{ position: 'absolute', left: 0, top: 0 }}>
            {allCenters.slice(1).map((c, idx) => {
              const prev = allCenters[idx];
              const st = msState[idx];
              const filled = st && st.keyDone && st.answered > 0;
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
            const isComplete = st.keyDone && isUnlocked && st.answered > 0;
            const isHere     = i === currentIndex;
            const { x, y }   = allCenters[i];
            const size       = isHere ? 66 : 58;
            const nodeColor  = isComplete ? T.mint : isHere ? T.green : isUnlocked ? '#CFE3D6' : '#E8EBE7';
            const nodeBorder = !isUnlocked ? `2px dashed ${T.line}` : 'none';

            return (
              <React.Fragment key={m.id}>
                <button
                  onClick={isUnlocked ? () => openSheet(i) : undefined}
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

  const scopeAnswered = (scope.milestone ? [scope.milestone] : GPS_MILESTONES)
    .reduce((n, m) => n + gpsAnsweredCount(m, answers), 0);

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
      setMessages(ms => [...ms, { role: 'ai', text: gpsAIReply(child, scope, answers, clean, turn) }]);
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
              <div style={{ fontSize: 13, color: T.ink2, lineHeight: 1.55, marginBottom: 10 }}>
                Ask anything about {scope.milestone ? `the ${scope.milestone.label} stage` : `${child.name}'s path`} — I'll answer using {child.name}'s profile (age {child.age}, {child.diagnosis}) and the answers you've given.
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: scopeAnswered ? T.greenSoft : T.bgAlt, borderRadius: 999, padding: '5px 12px', marginBottom: 14 }}>
                <span style={{ fontSize: 11.5, fontWeight: 700, color: scopeAnswered ? T.green : T.muted }}>
                  {scopeAnswered
                    ? `${scopeAnswered} answer${scopeAnswered > 1 ? 's' : ''} on record — my replies build on them`
                    : 'No answers yet — answer a question first for a personalized reply'}
                </span>
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
        {gpsFlatQuestions(stage).map(q => (
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
