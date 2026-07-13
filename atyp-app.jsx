// aTyp — Root app: navigation state, screen routing, in-device frame.

const { useState, useCallback } = React;

function App() {
  // Screen + navigation history
  const [screen, setScreen] = useState('home');
  const [stack, setStack] = useState([]); // back stack (for sub-screens)
  const [stageId, setStageId] = useState('a3');
  const [question, setQuestion] = useState('Which doctor should I talk to?');
  const [doneIds, setDoneIds] = useState(new Set(['q1', 'q2'])); // Mark-as-done state
  const [activeChildId, setActiveChildId] = useState('emma');
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const [profileSectionId, setProfileSectionId] = React.useState('medical');
  const [vault, setVault] = useState(() => window.VAULT_INITIAL || {});
  const child = CHILDREN.find((c) => c.id === activeChildId) || CHILDREN[0];

  const openSwitcher = useCallback(() => setSwitcherOpen(true), []);
  const addVaultFile = useCallback((cat, file) => {
    setVault(v => ({ ...v, [cat]: [...(v[cat] || []), file] }));
  }, []);
  const removeVaultFile = useCallback((cat, id) => {
    setVault(v => ({ ...v, [cat]: (v[cat] || []).filter(f => f.id !== id) }));
  }, []);

  const openProfileSection = useCallback((sectionId) => {
    setProfileSectionId(sectionId);
    setStack((p) => [...p, screen]);
    setScreen('profileSection');
  }, [screen]);
  const pickChild = useCallback((id) => {
    setActiveChildId(id);
    setSwitcherOpen(false);
  }, []);

  const go = useCallback((s) => {
    setStack((p) => [...p, screen]);
    setScreen(s);
  }, [screen]);

  const back = useCallback(() => {
    setStack((p) => {
      const next = [...p];
      const prev = next.pop() || 'welcome';
      setScreen(prev);
      return next;
    });
  }, []);

  const goTab = useCallback((tab) => {
    setStack([]); // tabs reset stack
    if (tab === 'home') setScreen('home');else
    if (tab === 'events') setScreen('events');else
    if (tab === 'map') setScreen('map');else
    if (tab === 'market') setScreen('market');else
    if (tab === 'assistant') setScreen('assistant');else
    if (tab === 'infohub') setScreen('profile');else
    if (tab === 'profile') setScreen('userProfile');else
    if (tab === 'map') setScreen('map');
  }, []);

  const openProfile = useCallback(() => {
    setStack((p) => [...p, screen]);
    setScreen('profile');
  }, [screen]);

  const openStage = useCallback((id) => {
    setStageId(id);
    setStack((p) => [...p, screen]);
    setScreen('stage');
  }, [screen]);

  const openQuestion = useCallback((id, q) => {
    setQuestion(q);
    setStack((p) => [...p, screen]);
    setScreen('question');
  }, [screen]);

  const markDone = useCallback(() => {
    // Find the question id by matching the question string — simpler: we store id on tap
    // We track by current question id which we set with openQuestion; reuse a ref-like approach
    setDoneIds((prev) => {
      const next = new Set(prev);
      // We map back from text → id via the questions map (single Medical question detail demo)
      // For the prototype, the Mark-as-done button will toggle the demo question 'q3' (the visible one).
      const map = {
        'What is my medical routine?': 'q1',
        'Which doctor should I talk to?': 'q2',
        'What should I expect from my doctor?': 'q3',
        'Should I consider medications or supplements?': 'q4',
        'What do I do in case of a medical emergency?': 'q5',
        "How do I manage co-occurring conditions?": 'q6',
        "When should I update Emma's medical records?": 'q7'
      };
      const id = map[question];
      if (id) next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, [question]);

  let body;
  switch (screen) {
    case 'welcome':body = <WelcomeScreen go={go} />;break;
    case 'account':body = <AccountScreen go={go} back={back} />;break;
    case 'child':body = <ChildScreen go={go} back={back} />;break;
    case 'notif':body = <NotifScreen go={go} back={back} />;break;
    case 'ready':body = <ReadyScreen go={go} />;break;
    case 'home':body = <HomeScreen onTab={goTab} openProfile={openProfile} openStage={openStage} openQuestion={openQuestion} child={child} openSwitcher={openSwitcher} openSection={openProfileSection} />;break;
    case 'map':body = <MapScreen go={go} back={back} openStage={openStage} onTab={goTab} openProfile={openProfile} child={child} openSwitcher={openSwitcher} />;break;
    case 'stage':body = <StageDetailScreen stageId={stageId} back={back} openQuestion={openQuestion} doneIds={doneIds} child={child} />;break;
    case 'question':body = <QuestionDetailScreen question={question} back={back} isDone={isQuestionDone(question, doneIds)} markDone={markDone} />;break;
    case 'profileSection':body = <ProfileSectionScreen sectionId={profileSectionId} back={back} child={child} vault={vault} addVaultFile={addVaultFile} removeVaultFile={removeVaultFile} />;break;
    case 'profile':body = <ProfileScreen onTab={goTab} back={back} child={child} openSection={openProfileSection} vault={vault} addVaultFile={addVaultFile} />;break;
    case 'events':body = <EventsScreen onTab={goTab} />;break;
    case 'market':body = <MarketplaceScreen onTab={goTab} />;break;
    case 'assistant':body = <AssistantScreen onTab={goTab} child={child} openMap={() => {setStack((p) => [...p, screen]);setScreen('map');}} openProfile={openProfile} openSwitcher={openSwitcher}/>;break;
    case 'userProfile':body = <UserProfileScreen onTab={goTab} />;break;
    default:body = <WelcomeScreen go={go} />;
  }

  // Emergency FAB shows on the main app screens (not onboarding / sub-detail).
  const FAB_SCREENS = new Set(['home', 'events', 'map', 'market', 'assistant', 'userProfile', 'profile']);
  const showFab = FAB_SCREENS.has(screen);

  // Fullscreen mobile mode (mobile.html) — no demo caption, no phone frame,
  // no fake status bar / island / home indicator: the real device provides them.
  if (window.ATYP_MOBILE) {
    return (
      <div style={{ 
        width: '100%', height: '100vh', 
        background: T.bg, overflow: 'hidden',
        boxSizing: 'border-box'
      }}>
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>{body}</div>

        {showFab && !emergencyOpen && (
          <button onClick={() => setEmergencyOpen(true)} aria-label="Ask Companion" style={{
            position: 'absolute', right: 18, bottom: 96, zIndex: 80,
            width: 60, height: 60, borderRadius: 999, border: '3px solid #fff',
            background: `linear-gradient(140deg, ${T.green}, ${T.greenDeep})`,
            boxShadow: '0 10px 24px rgba(45,106,79,0.4)', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1,
            fontFamily: 'inherit',
          }}>
            <Icon.Sparkle s={24} c="#fff"/>
          </button>
        )}

        {emergencyOpen && <EmergencySheet child={child} onClose={() => setEmergencyOpen(false)} />}

        {switcherOpen &&
        <ChildSwitcher
          activeId={activeChildId}
          onPick={pickChild}
          onClose={() => setSwitcherOpen(false)} />
        }
      </div>);
  }

  return (
    <div className="atyp-stage" data-comment-anchor="0fc1c1e110-div-112-5">
      {/* Side caption / wayfinding for investor demo */}
      <SideCaption screen={screen} go={(s) => {setStack([]);setScreen(s);}} />

      {/* Phone frame */}
      <div style={{
        width: 390, height: 844, borderRadius: 50, overflow: 'hidden',
        position: 'relative',
        background: '#000',
        boxShadow: '0 50px 90px rgba(20,30,25,0.28), 0 0 0 1px rgba(0,0,0,0.18), 0 0 0 10px #1B1B1B'
      }}>
        {/* Dynamic island */}
        <div style={{
          position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)',
          width: 122, height: 36, borderRadius: 22, background: '#000', zIndex: 100
        }} />
        {/* Status bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, zIndex: 90,
          height: 54, padding: '18px 30px 0', boxSizing: 'border-box',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: '-apple-system, system-ui', fontSize: 16, fontWeight: 600,
          color: T.ink,
          pointerEvents: 'none'
        }}>
          <span>9:41</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            {/* signal */}
            <svg width="17" height="11" viewBox="0 0 17 11">
              <rect x="0" y="7" width="3" height="4" rx="0.6" fill={T.ink} />
              <rect x="4.5" y="5" width="3" height="6" rx="0.6" fill={T.ink} />
              <rect x="9" y="2.5" width="3" height="8.5" rx="0.6" fill={T.ink} />
              <rect x="13.5" y="0" width="3" height="11" rx="0.6" fill={T.ink} />
            </svg>
            {/* wifi */}
            <svg width="15" height="11" viewBox="0 0 15 11">
              <path d="M7.5 2.8c2 0 3.9.8 5.3 2.1l1-1A9.3 9.3 0 0 0 7.5.4 9.3 9.3 0 0 0 1.2 3.9l1 1A7.6 7.6 0 0 1 7.5 2.8zm0 3.2a4.6 4.6 0 0 1 3.1 1.2l1-1a6 6 0 0 0-8.2 0l1 1A4.6 4.6 0 0 1 7.5 6zM7.5 9a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z" fill={T.ink} />
            </svg>
            {/* battery */}
            <svg width="24" height="11" viewBox="0 0 24 11">
              <rect x="0.5" y="0.5" width="20" height="10" rx="2.5" stroke={T.ink} strokeOpacity="0.4" fill="none" data-comment-anchor="a924b88946-div-239-5" />
              <rect x="2" y="2" width="17" height="7" rx="1.5" fill={T.ink} />
              <rect x="21.5" y="3.5" width="1.5" height="4" rx="0.5" fill={T.ink} fillOpacity="0.5" />
            </svg>
          </span>
        </div>

        {/* Body */}
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>{body}</div>

        {/* Emergency floating action button (not in the tab bar) */}
        {showFab && !emergencyOpen && (
          <button onClick={() => setEmergencyOpen(true)} aria-label="Ask Companion" style={{
            position: 'absolute', right: 18, bottom: 96, zIndex: 80,
            width: 60, height: 60, borderRadius: 999, border: '3px solid #fff',
            background: `linear-gradient(140deg, ${T.green}, ${T.greenDeep})`,
            boxShadow: '0 10px 24px rgba(45,106,79,0.4)', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1,
            fontFamily: 'inherit',
          }}>
            <Icon.Sparkle s={24} c="#fff"/>
          </button>
        )}

        {/* Emergency sheet */}
        {emergencyOpen && <EmergencySheet child={child} onClose={() => setEmergencyOpen(false)} />}

        {/* Child switcher modal */}
        {switcherOpen &&
        <ChildSwitcher
          activeId={activeChildId}
          onPick={pickChild}
          onClose={() => setSwitcherOpen(false)} />

        }

        {/* Home indicator */}
        <div style={{
          position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
          width: 134, height: 5, borderRadius: 99, background: 'rgba(0,0,0,0.32)', zIndex: 100,
          pointerEvents: 'none'
        }} />
      </div>
    </div>);

}

function ChildSwitcher({ activeId, onPick, onClose }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 200,
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      animation: 'atypFadeIn .18s ease-out'
    }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(20,30,25,0.45)' }} />
      <div style={{
        position: 'relative', background: T.bg,
        borderTopLeftRadius: 28, borderTopRightRadius: 28,
        padding: '12px 18px 36px',
        animation: 'atypSheetUp .22s cubic-bezier(.2,.8,.2,1)'
      }}>
        <div style={{ width: 40, height: 5, borderRadius: 99, background: '#D6D9D2', margin: '4px auto 16px' }} />
        <div style={{ fontSize: 20, fontWeight: 700, color: T.ink, letterSpacing: '-0.02em', marginBottom: 4 }}>Switch child</div>
        <div style={{ fontSize: 13, color: T.muted, marginBottom: 16 }}>Each child has their own journey, profile, and reminders.</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {CHILDREN.map((c) => {
            const active = c.id === activeId;
            return (
              <button key={c.id} onClick={() => onPick(c.id)} style={{
                background: '#fff', borderRadius: 16, padding: '12px 14px',
                border: 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                display: 'flex', alignItems: 'center', gap: 12,
                boxShadow: active ? `inset 0 0 0 2px ${T.green}` : `inset 0 0 0 1px ${T.line}`
              }}>
                <Avatar initials={c.initials} size={46} color={c.color} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15.5, fontWeight: 700, color: T.ink, letterSpacing: '-0.01em' }}>
                    {c.name} <span style={{ color: T.muted, fontWeight: 500 }}>· Age {c.age}</span>
                  </div>
                  <div style={{ fontSize: 12.5, color: T.muted, marginTop: 2 }}>
                    {c.diagShort} · {c.currentStageLabel}
                  </div>
                </div>
                {active ?
                <div style={{
                  width: 26, height: 26, borderRadius: 999, background: T.green,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <Icon.Check s={16} c="#fff" sw={3} />
                  </div> :

                <Icon.ChevronRight s={18} c={T.muted} />
                }
              </button>);

          })}
          <button style={{
            background: 'transparent', borderRadius: 16, padding: '14px',
            border: `1.5px dashed ${T.line}`, cursor: 'pointer', fontFamily: 'inherit',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            color: T.green, fontWeight: 700, fontSize: 14
          }}>
            <Icon.Plus s={18} c={T.green} data-comment-anchor="acae62ede9-div-256-19" /> Add another child
          </button>
        </div>
      </div>
    </div>);

}

// Companion bottom sheet — an always-available AI helper. Pick a topic for a
// quick answer, or type a free-form question to chat with the assistant.
function EmergencySheet({ child, onClose }) {
  const [text, setText] = React.useState('');
  const [messages, setMessages] = React.useState([]);
  const [view, setView] = React.useState('chat');   // 'chat' | 'history'
  // Stub past conversations — the full app persists real chats here.
  const pastChats = [
    { q: 'How do I prepare for the IEP meeting?', when: 'Yesterday' },
    { q: 'Dentists that handle sensory issues?', when: '3 days ago' },
    { q: 'Calming a meltdown at school', when: 'Last week' },
  ];
  const cats = [
    { label: 'Medical', emoji: '🩺' },
    { label: 'Dental', emoji: '🦷' },
    { label: 'Legal', emoji: '⚖️' },
    { label: 'Transport', emoji: '🚗' },
    { label: 'School', emoji: '🏫' },
    { label: 'Mental health', emoji: '🫂' },
  ];

  // Topic-specific canned answers for the preset chips.
  const PRESET_ANSWERS = {
    Medical:         { intro: 'ASD-aware medical options near you:',        options: [ { name: 'Bayside Pediatric Care', meta: 'Open now · 1.2 mi · ASD-aware staff', tag: 'Call' }, { name: 'Dr. Priya Nair — Developmental Peds', meta: '2.4 mi · accepts your plan', tag: 'Book' } ] },
    Dental:          { intro: 'Dentists used to sensory-sensitive kids:',    options: [ { name: 'Dr. Lena Ortiz — Gentle Dental', meta: 'Open until 9 PM · 2.0 mi', tag: 'Call' }, { name: 'Smile Kids — Special Needs Dentistry', meta: '3.1 mi · sedation available', tag: 'Book' } ] },
    Legal:           { intro: 'Legal help for special-needs families:',      options: [ { name: 'Harbor Disability Law', meta: 'Free consult · 4.0 mi', tag: 'Call' }, { name: 'ARC Legal Advocacy Line', meta: 'Guardianship & ABLE accounts', tag: 'Call' } ] },
    Transport:       { intro: 'Getting around with support:',                options: [ { name: 'County Paratransit', meta: 'Door-to-door · book 1 day ahead', tag: 'Book' }, { name: 'SafeRide ASD', meta: 'Trained drivers · 24/7', tag: 'Call' } ] },
    School:          { intro: 'School and IEP support:',                     options: [ { name: 'District Special-Ed Office', meta: 'IEP & accommodations', tag: 'Call' }, { name: 'Parent Training & Info Center', meta: 'Free advocacy support', tag: 'Call' } ] },
    'Mental health': { intro: 'Mental-health support near you:',             options: [ { name: 'Calm Minds Therapy', meta: 'ABA & family therapy · 1.8 mi', tag: 'Book' }, { name: '988 Support Line', meta: '24/7 · trained counselors', tag: 'Call' } ] },
  };

  const pickPreset = (c) => {
    const a = PRESET_ANSWERS[c.label];
    setMessages(m => [...m,
      { role: 'user', text: `Help with ${c.label.toLowerCase()}` },
      { role: 'assistant', intro: `Happy to help. Based on ${child.name}'s profile and your area — ${a.intro}`, options: a.options, note: 'Want me to go deeper on any of these? Just ask below.' },
    ]);
  };

  const sendFree = () => {
    const t = text.trim(); if (!t) return;
    setMessages(m => [...m,
      { role: 'user', text: t },
      { role: 'assistant', intro: "Sure — here's my answer to your question:", body: '…', note: `In the pilot this is simulated; the full app answers this using ${child.name}'s profile.` },
    ]);
    setText('');
  };

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 200, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(27,36,33,0.5)' }}/>
      <div style={{ position: 'relative', background: '#fff', borderRadius: '24px 24px 0 0', padding: '0 18px 32px', maxHeight: '88%', overflowY: 'auto', animation: 'atypSheetUp .28s ease' }}>
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 12, paddingBottom: 4 }}>
          <div style={{ width: 36, height: 4, borderRadius: 999, background: T.line }}/>
        </div>

        {view === 'history' ? (
          <>
            {/* header — history */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6, marginBottom: 14 }}>
              <button onClick={() => setView('chat')} aria-label="Back" style={{ width: 34, height: 34, borderRadius: 999, border: 'none', background: T.bgAlt, cursor: 'pointer', fontFamily: 'inherit', fontSize: 18, color: T.muted, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>‹</button>
              <div style={{ flex: 1, fontSize: 18, fontWeight: 800, color: T.ink, letterSpacing: '-0.02em' }}>History</div>
              <button onClick={onClose} style={{ width: 30, height: 30, borderRadius: 999, border: 'none', background: T.bgAlt, cursor: 'pointer', fontFamily: 'inherit', fontSize: 17, color: T.muted, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>×</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {pastChats.map((h, i) => (
                <button key={i} onClick={() => setView('chat')} style={{ display: 'flex', alignItems: 'center', gap: 12, background: T.bgAlt, border: 'none', borderRadius: 14, padding: '12px 14px', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', width: '100%' }}>
                  <div style={{ width: 34, height: 34, borderRadius: 999, background: T.greenSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon.Sparkle s={16} c={T.green}/>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{h.q}</div>
                    <div style={{ fontSize: 11.5, color: T.muted, marginTop: 1 }}>{h.when}</div>
                  </div>
                  <Icon.ChevronRight s={15} c={T.muted}/>
                </button>
              ))}
            </div>
            <div style={{ fontSize: 11, color: T.muted, textAlign: 'center', marginTop: 16, lineHeight: 1.5 }}>
              Preview — in the full app your past chats are saved here.
            </div>
          </>
        ) : (
          <>
            {/* header — chat */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 6, marginBottom: 14 }}>
              {messages.length === 0 && (
                <button onClick={() => setView('history')} aria-label="Conversation history" style={{ width: 34, height: 34, borderRadius: 999, border: 'none', background: T.bgAlt, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon.History s={18} c={T.ink2}/>
                </button>
              )}
              <div style={{ width: 44, height: 44, borderRadius: 14, background: T.greenSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon.Sparkle s={24} c={T.green}/>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: T.ink, letterSpacing: '-0.02em' }}>Ask Companion</div>
                <div style={{ fontSize: 12, color: T.muted }}>Your AI companion for {child.name} — anything, anytime</div>
              </div>
              <button onClick={onClose} style={{ width: 30, height: 30, borderRadius: 999, border: 'none', background: T.bgAlt, cursor: 'pointer', fontFamily: 'inherit', fontSize: 17, color: T.muted, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>×</button>
            </div>

            {messages.length === 0 ? (
              <div style={{ fontSize: 13.5, color: T.ink2, lineHeight: 1.5, marginBottom: 14 }}>
                Pick a topic for a quick answer, or type your own question — the companion uses {child.name}'s profile and your area to help.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 14 }}>
                {messages.map((msg, i) => msg.role === 'user' ? (
                  <div key={i} style={{ alignSelf: 'flex-end', maxWidth: '85%', background: T.greenSoft, borderRadius: '16px 16px 4px 16px', padding: '10px 14px', fontSize: 13.5, color: T.ink, lineHeight: 1.5 }}>
                    {msg.text}
                  </div>
                ) : (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <div style={{ width: 32, height: 32, borderRadius: 999, background: `linear-gradient(140deg, ${T.green}, ${T.greenDeep})`, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon.Sparkle s={16} c="#fff"/>
                    </div>
                    <div style={{ flex: 1, background: T.bgAlt, borderRadius: '16px 16px 16px 4px', padding: '12px 14px' }}>
                      <div style={{ fontSize: 13.5, color: T.ink2, lineHeight: 1.55 }}>{msg.intro}</div>
                      {msg.body && <div style={{ fontSize: 20, fontWeight: 800, color: T.muted, letterSpacing: '0.15em', margin: '6px 0 2px' }}>{msg.body}</div>}
                      {msg.options && (
                        <div style={{ marginTop: 10 }}>
                          {msg.options.map((o, j) => (
                            <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', borderRadius: 12, padding: '10px 12px', marginBottom: 8, boxShadow: `inset 0 0 0 1px ${T.line}` }}>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: 13.5, fontWeight: 700, color: T.ink }}>{o.name}</div>
                                <div style={{ fontSize: 11.5, color: T.muted, marginTop: 1 }}>{o.meta}</div>
                              </div>
                              <span style={{ fontSize: 11.5, fontWeight: 700, color: '#fff', background: T.green, borderRadius: 999, padding: '5px 12px' }}>{o.tag}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {msg.note && <div style={{ fontSize: 11.5, color: T.muted, lineHeight: 1.5, marginTop: 8 }}>{msg.note}</div>}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* topic presets — only on the first screen, before chatting */}
            {messages.length === 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
                {cats.map(c => (
                  <button key={c.label} onClick={() => pickPreset(c)} style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    background: T.greenSoft, border: 'none', borderRadius: 999, padding: '8px 13px',
                    cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, color: T.green,
                  }}>
                    <span style={{ fontSize: 14 }}>{c.emoji}</span> {c.label}
                  </button>
                ))}
              </div>
            )}
            <textarea value={text} onChange={e => setText(e.target.value)} rows={3}
              placeholder="Ask me anything about caring for your child…"
              style={{ width: '100%', boxSizing: 'border-box', borderRadius: 14, border: `1.5px solid ${T.line}`, padding: '12px 14px', fontFamily: 'inherit', fontSize: 14, color: T.ink, outline: 'none', resize: 'none', lineHeight: 1.5, marginBottom: 12 }}/>
            <button onClick={sendFree} disabled={!text.trim()} style={{
              width: '100%', height: 50, borderRadius: 14, border: 'none',
              background: text.trim() ? `linear-gradient(140deg, ${T.green}, ${T.greenDeep})` : T.line,
              color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700,
              cursor: text.trim() ? 'pointer' : 'default',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              <Icon.Send s={17} c="#fff"/> Ask Companion
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function isQuestionDone(question, doneIds) {
  const map = {
    'What is my medical routine?': 'q1',
    'Which doctor should I talk to?': 'q2',
    'What should I expect from my doctor?': 'q3',
    'Should I consider medications or supplements?': 'q4',
    'What do I do in case of a medical emergency?': 'q5',
    "How do I manage co-occurring conditions?": 'q6',
    "When should I update Emma's medical records?": 'q7'
  };
  return doneIds.has(map[question]);
}

// ── Side caption: a quick screen-jump panel for investor demo ─────────

function SideCaption({ screen, go }) {
  const flow = [
  { group: 'Onboarding', items: [
    ['welcome', '01 Welcome'],
    ['account', '02 Create account'],
    ['child', '03 Add your child'],
    ['notif', '04 Notifications'],
    ['ready', '05 Ready']]
  },
  { group: 'Main app', items: [
    ['home', '06 Home'],
    ['events', '07 Events'],
    ['map', '08 GPS (journey map)'],
    ['stage', '09 Age stage detail'],
    ['question', '10 Question detail'],
    ['market', '11 Marketplace'],
    ['assistant', '12 AI Assistant + Journey'],
    ['map_link', '   ↳ GPS map (from Assistant)', 'map'],
    ['profile', '★  Profile (via avatar)']]
  }];

  return (
    <div className="atyp-caption">
      <div style={{ marginBottom: 18 }}>
        <div style={{
          fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
          fontSize: 11, color: T.muted, letterSpacing: '0.08em', textTransform: 'uppercase'
        }}>aTyp · PoC prototype</div>
        <div style={{ fontSize: 22, fontWeight: 700, color: T.ink, letterSpacing: '-0.02em', marginTop: 4, lineHeight: 1.2 }}>
          A guide for parents of children with autism.
        </div>
        <div style={{ fontSize: 13, color: T.muted, marginTop: 8, lineHeight: 1.5, maxWidth: 280 }}>
          Tap any node on the journey map, walk through onboarding, or jump to a screen below.
        </div>
      </div>

      {flow.map((g) =>
      <div key={g.group} style={{ marginBottom: 16 }}>
          <div style={{
          fontSize: 11, fontWeight: 700, color: T.muted, textTransform: 'uppercase',
          letterSpacing: '0.06em', marginBottom: 8
        }}>{g.group}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {g.items.map(([k, l, nav]) =>
          <button key={k} onClick={() => go(nav || k)} style={{
            textAlign: 'left', padding: '8px 12px', borderRadius: 10,
            fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer',
            background: screen === k ? T.greenSoft : 'transparent',
            color: screen === k ? T.green : T.ink2,
            border: 'none'
          }}>
                {l}
              </button>
          )}
          </div>
        </div>
      )}
    </div>);

}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
