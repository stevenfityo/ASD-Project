// aTyp — GPS: Life Journey Guide for ASD Parents.
// A branching decision tree: each answer reveals a different next question,
// so parents can preview the path their child may take based on their choices.

// ── Life Journey Data ─────────────────────────────────────────────────
// Each stage has an `entry` moment id. Each choice carries a `next` field:
// the id of the moment that choice leads to, or null to end the stage's path.
const GPS_STAGES = [
  {
    id: 'g1', emoji: '🌱', label: 'First Steps',
    sub: 'Diagnosis & adjustment', ageRange: '0 – 5', minAge: 0, maxAge: 5,
    description: 'Learning your child has autism is one of the most profound moments of your life. Everything you imagined about your future shifts. This stage is about finding your footing — as a parent, as a family.',
    entry: 'g1m1',
    moments: [
      {
        id: 'g1m1',
        question: 'How are you doing emotionally right now?',
        choices: [
          { id: 'a', label: 'Finding my way', emoji: '🌊', next: 'g1m2',
            insight: 'Grief, confusion, and love can coexist. Many parents describe the months after diagnosis as a fog — and then, slowly, clarity. You don\'t need to have it figured out yet. Reaching out to other ASD parents often helps more than any book.' },
          { id: 'b', label: 'Stronger than expected', emoji: '💪', next: 'g1m2',
            insight: 'Some parents surprise themselves with resilience. If you\'re feeling capable right now — lean into it. Build routines, make calls, set up systems. But stay honest with yourself: burnout often comes later when adrenaline fades.' },
          { id: 'c', label: 'Overwhelmed and exhausted', emoji: '😮‍💨', next: null,
            insight: 'This is one of the hardest things a parent can carry. Please don\'t carry it alone. Ask your doctor about parent support groups, look into respite care, and remember: taking care of yourself is taking care of your child. Start there before anything else.' },
        ]
      },
      {
        id: 'g1m2',
        question: 'How has your family reacted to the diagnosis?',
        choices: [
          { id: 'a', label: 'We\'re united', emoji: '🤝', next: null,
            insight: 'A united family is your child\'s greatest asset. Make sure everyone — grandparents, siblings — has a basic understanding of autism. Books like "Ten Things Every Child with Autism Wishes You Knew" are gentle starting points.' },
          { id: 'b', label: 'Some don\'t accept it', emoji: '💔', next: null,
            insight: 'Denial in family members is extremely common, especially among grandparents. Give people time, but protect your child from dismissive environments. A family therapy session with an autism-informed therapist can open difficult conversations.' },
          { id: 'c', label: 'We\'re mostly on our own', emoji: '🏝️', next: null,
            insight: 'Many ASD families are isolated. Online communities like the Autism Society forums have connected thousands of families who were once exactly where you are. You don\'t have to discover this alone.' },
        ]
      },
    ],
  },
  {
    id: 'g2', emoji: '🏠', label: 'Building Roots',
    sub: 'Family rhythms & early school', ageRange: '4 – 9', minAge: 4, maxAge: 9,
    description: 'Life has reorganized itself around your child\'s needs. Routines, therapy schedules, school choices — the logistics are real. But so are the moments of unexpected joy, connection, and growth.',
    entry: 'g2m1',
    moments: [
      {
        id: 'g2m1',
        question: 'How has your daily life changed since the diagnosis?',
        choices: [
          { id: 'a', label: 'We built strong routines', emoji: '📅', next: 'g2m2',
            insight: 'Structure is one of the most powerful gifts you can give a child with ASD. Document what works: the morning sequence, calming rituals, the dinner routine. These are gold for caregivers, teachers, and grandparents.' },
          { id: 'b', label: 'Still figuring it out', emoji: '🔄', next: 'g2m2',
            insight: 'Most families take 1–3 years to find their rhythm. Visual schedules, predictable transitions, and sensory-friendly environments help — but the "right" routine is the one that works for your specific child. Permission to experiment.' },
          { id: 'c', label: 'It\'s often chaotic', emoji: '🌀', next: null,
            insight: 'If daily life feels unmanageable, look into respite care (breaks for parents), in-home support workers, and parent training programs. Stabilising daily life comes first — you shouldn\'t have to hold this alone.' },
        ]
      },
      {
        id: 'g2m2',
        question: 'How are siblings handling life with an ASD brother or sister?',
        choices: [
          { id: 'a', label: 'They\'re understanding and close', emoji: '❤️', next: null,
            insight: 'Siblings who grow up alongside an ASD sibling often develop extraordinary empathy and resilience. Make sure they also have space to be kids — their own activities, their own one-on-one time with you.' },
          { id: 'b', label: 'They struggle sometimes', emoji: '😔', next: null,
            insight: 'Sibling struggles are completely normal. They may feel overlooked, frustrated, or embarrassed — all valid feelings. Sibshops (support groups for siblings) can be transformative. Regular one-on-one time with each child matters enormously.' },
          { id: 'c', label: 'No siblings', emoji: '👶', next: null,
            insight: 'Some parents wonder about having more children. There is a small increased genetic risk for ASD in subsequent siblings (around 10–20%). Genetic counseling can help you think through this if it\'s on your mind.' },
        ]
      },
    ],
  },
  {
    id: 'g3', emoji: '🌿', label: 'Growing Up',
    sub: 'Identity, school & friendships', ageRange: '8 – 14', minAge: 8, maxAge: 14,
    description: 'Your child is developing their own sense of who they are. School is social as well as academic. Friendships — and the lack of them — become more visible. You\'re getting to know a person, not just a child.',
    entry: 'g3m1',
    moments: [
      {
        id: 'g3m1',
        question: 'Does your child know about their autism?',
        choices: [
          { id: 'a', label: 'Yes — we talk openly', emoji: '💬', next: 'g3m2',
            insight: 'Children who understand their own autism develop better self-advocacy and self-esteem. Keep the conversation ongoing and age-appropriate. Books like "The Reason I Jump" can open wonderful conversations.' },
          { id: 'b', label: 'They sense they\'re different', emoji: '🔍', next: 'g3m2',
            insight: 'Many children this age are aware they experience the world differently, even without knowing the word "autism." This gap can lead to anxiety or shame. Gently bridging toward an honest conversation — on their timeline — is usually kinder than waiting.' },
          { id: 'c', label: 'We haven\'t told them yet', emoji: '⏳', next: 'g3m2',
            insight: 'Most autism experts now recommend telling children about their diagnosis, typically between ages 6–10. Keeping it secret can lead to confusion and low self-esteem. There is no perfect moment — but sooner is usually kinder.' },
        ]
      },
      {
        id: 'g3m2',
        question: 'How is your relationship with your partner holding up?',
        choices: [
          { id: 'a', label: 'We\'ve grown closer', emoji: '💑', next: 'g3m3',
            insight: 'Some couples find that raising an ASD child deepens their partnership. Make space to appreciate each other — not just as co-parents, but as partners. Shared purpose is powerful.' },
          { id: 'b', label: 'It\'s been a strain', emoji: '⚖️', next: 'g3m3',
            insight: 'The stress is real. Couples therapy with a therapist who understands parental stress can help. Even 30 minutes of scheduled time together after bedtime makes a meaningful difference over months.' },
          { id: 'c', label: 'I\'m parenting solo', emoji: '🦸', next: 'g3m3',
            insight: 'Single parents of ASD children carry an extraordinary load. Lean into your support network. Many communities have programs specifically for single parents of children with disabilities — they\'re worth finding.' },
        ]
      },
      {
        id: 'g3m3',
        question: 'How do you talk to people outside your family about your child?',
        choices: [
          { id: 'a', label: 'Openly — we don\'t hide it', emoji: '🗣️', next: null,
            insight: 'Openness tends to build more understanding and support around your family. It also models self-acceptance for your child. The families who share openly often find their social worlds expand rather than shrink.' },
          { id: 'b', label: 'Selectively — case by case', emoji: '🎯', next: null,
            insight: 'This is the most common approach, and a wise one. You learn who responds with empathy and who doesn\'t. Over time you build a circle of people who "get it" — and those relationships become invaluable.' },
          { id: 'c', label: 'We tend to stay private', emoji: '🔒', next: null,
            insight: 'Privacy is a valid choice, especially where stigma is real. But isolation has real costs too. Consider letting one trusted person in fully. Having someone who knows your whole story matters more than you might expect.' },
        ]
      },
    ],
  },
  {
    id: 'g4', emoji: '🔄', label: 'Adolescence',
    sub: 'Identity, future & big questions', ageRange: '12 – 18', minAge: 12, maxAge: 18,
    description: 'Puberty amplifies everything — sensory sensitivities, emotional intensity, social complexity. Your teenager is asking who they are, where they belong, and what their future holds. These are big questions. You don\'t need all the answers.',
    entry: 'g4m1',
    moments: [
      {
        id: 'g4m1',
        question: 'How is your teen relating to their autism identity?',
        choices: [
          { id: 'a', label: 'They\'ve embraced it', emoji: '🌈', next: 'g4m2',
            insight: 'More and more young autistic people are finding their identity and each other through neurodiversity communities. If your teen has embraced their autism, that\'s not just okay — it\'s genuinely protective for their mental health.' },
          { id: 'b', label: 'They struggle with it', emoji: '🌊', next: 'g4m2',
            insight: 'Many autistic teenagers go through periods of anger, grief, or shame about their diagnosis. This is developmentally normal — and a mental health signal to take seriously. An autistic-affirming therapist can be transformative at this stage.' },
          { id: 'c', label: 'They avoid the topic', emoji: '🚪', next: 'g4m2',
            insight: 'Avoidance often signals the topic feels loaded with shame or fear. Don\'t push, but don\'t abandon the conversation either. Try "side-door" approaches: a documentary about autistic adults, connection with a positive autistic role model.' },
        ]
      },
      {
        id: 'g4m2',
        question: 'What does your teen\'s social world look like?',
        choices: [
          { id: 'a', label: 'A few meaningful friendships', emoji: '🤝', next: null,
            insight: 'Depth over breadth is often the autistic social style — and that\'s not a deficit, it\'s a strength. One or two genuine friendships provide more wellbeing than a large social network. Celebrate and protect the friendships that exist.' },
          { id: 'b', label: 'Mostly online connections', emoji: '💻', next: null,
            insight: 'Online communities have been life-changing for many autistic people — shared interests, lower sensory load, more control over communication. Online friendships count. Help them navigate safely.' },
          { id: 'c', label: 'Very isolated', emoji: '🏝️', next: null,
            insight: 'Social isolation in adolescence is a real mental health risk. Look for interest-based groups rather than "social skills" programs — robotics clubs, anime communities, gaming groups. Shared passion is the best connector.' },
        ]
      },
    ],
  },
  {
    id: 'g5', emoji: '🌟', label: 'Becoming Adult',
    sub: 'Transition, rights & independence', ageRange: '17 – 23', minAge: 17, maxAge: 23,
    description: 'The legal and practical landscape shifts enormously at 18. Your child becomes an adult in the eyes of the law. This is one of the most logistically intense stages for families — and one of the most important to plan for.',
    entry: 'g5m1',
    moments: [
      {
        id: 'g5m1',
        question: 'What does independence look like for your young adult?',
        choices: [
          { id: 'a', label: 'Fully or mostly independent', emoji: '🌟', next: 'g5m2',
            insight: 'Many autistic adults live fully independent lives — with strategies tailored to their needs. Continue building self-advocacy skills: the ability to understand and communicate one\'s own needs is one of the most valuable things an autistic adult can develop.' },
          { id: 'b', label: 'Will need supported living', emoji: '🏠', next: 'g5m2',
            insight: 'Supported living varies enormously. Research your state\'s waiver programs (like Medicaid HCBS waivers) early — waitlists can be years long. Start the process before age 18.' },
          { id: 'c', label: 'Still figuring it out', emoji: '🗺️', next: 'g5m2',
            insight: 'Many families are still navigating this at 17–18, and that\'s okay. Connect with a transition specialist through the IEP process — post-secondary planning should begin at age 14. Adult disability services in your state are your next key resource.' },
        ]
      },
      {
        id: 'g5m2',
        question: 'Have you started planning for the long-term future?',
        choices: [
          { id: 'a', label: 'Yes — we have a plan', emoji: '📋', next: null,
            insight: 'Families who plan legally and financially reduce uncertainty for their child enormously. Make sure you have a special needs trust, a letter of intent (your child\'s story for future caregivers), and clear guardianship arrangements.' },
          { id: 'b', label: 'Thought about it, haven\'t acted', emoji: '⏳', next: null,
            insight: 'The gap between thinking and doing is where most families get stuck. Pick one thing: schedule a meeting with a special needs attorney. That single action tends to unlock everything else.' },
          { id: 'c', label: 'Too hard to think about', emoji: '💙', next: null,
            insight: '"Who will care for my child when I\'m gone" is one of the most emotionally difficult questions a parent can face. Families who face it — even imperfectly — feel enormous relief. Consider bringing a trusted person into the conversation.' },
        ]
      },
    ],
  },
  {
    id: 'g6', emoji: '🏡', label: 'Adult Life',
    sub: 'Work, home & flourishing', ageRange: '22 – 40', minAge: 22, maxAge: 40,
    description: 'Your child is an adult now. Life has its own rhythm — work, routines, relationships, passions. Your role has shifted from manager to supporter. The goal is a life worth living, defined on their own terms.',
    entry: 'g6m1',
    moments: [
      {
        id: 'g6m1',
        question: 'Where does your adult child live?',
        choices: [
          { id: 'a', label: 'With us at home', emoji: '🏠', next: 'g6m2',
            insight: 'Many autistic adults live with family — and for some, this is genuinely the right fit. Make sure your adult child has as much agency as possible: their own space, their own schedule, their own decisions. Independence isn\'t only about where you live.' },
          { id: 'b', label: 'Supported living', emoji: '🏘️', next: 'g6m2',
            insight: 'Supported living varies enormously in quality. Visit regularly, know the staff, stay involved. Your adult child\'s voice about their preferences and experiences matters most.' },
          { id: 'c', label: 'Semi-independently', emoji: '🌟', next: 'g6m2',
            insight: 'Semi-independent living with some support services is a growing model. Technology — smart home devices, reminder apps, video calls — can extend independence significantly.' },
        ]
      },
      {
        id: 'g6m2',
        question: 'What brings your adult child the most joy?',
        choices: [
          { id: 'a', label: 'Their special interests', emoji: '⭐', next: null,
            insight: 'Special interests are not just hobbies — for many autistic people they are central to identity and wellbeing. A life built around one\'s passions is a good life. Many autistic adults have found meaningful work and community through their interests.' },
          { id: 'b', label: 'Routine and structure', emoji: '📅', next: null,
            insight: 'For many autistic adults, a predictable, structured life is genuinely satisfying — not a limitation. Stable routines reduce anxiety and create the foundation for other pleasures. Honor this rather than pushing for variety for its own sake.' },
          { id: 'c', label: 'Family connection', emoji: '❤️', next: null,
            insight: 'Family remains central for many autistic adults. Regular family time — structured, predictable, centered around shared activities — is deeply valuable. You\'re not just a support system; you\'re the people they love.' },
        ]
      },
    ],
  },
  {
    id: 'g7', emoji: '♾️', label: 'Long-term',
    sub: 'Legacy & lifetime planning', ageRange: '40+', minAge: 40, maxAge: 999,
    description: 'This is the stage most parents never want to think about — and the one that matters most to plan for. What happens when you can no longer be your child\'s primary support? The answer to that question is the most important gift you can give them.',
    entry: 'g7m1',
    moments: [
      {
        id: 'g7m1',
        question: 'Who will advocate for your adult child in the future?',
        choices: [
          { id: 'a', label: 'A sibling or family member', emoji: '👨‍👩‍👧', next: null,
            insight: 'Sibling caregivers are often deeply committed. But "willing" isn\'t the same as "prepared." Bring your chosen future caregiver into planning conversations now. Share the letter of intent, the financial plan, the daily support needs.' },
          { id: 'b', label: 'A professional guardian', emoji: '⚖️', next: null,
            insight: 'Professional guardians and trustees can be appropriate, especially when family isn\'t available. Look for providers with specific autism experience. Get references, visit programs, and include your adult child\'s preferences in the planning.' },
          { id: 'c', label: 'Haven\'t figured this out yet', emoji: '💭', next: null,
            insight: 'This is the most important unanswered question in special needs planning. A special needs estate planning attorney can walk you through options — and help you build a plan that gives your child security for life. Please don\'t leave it unanswered.' },
        ]
      },
    ],
  },
];

function stageStatus(stage, childAge) {
  if (childAge > stage.maxAge) return 'past';
  if (childAge >= stage.minAge) return 'current';
  return 'future';
}

// Index of the stage that matches the child's current age (first stage whose
// range still includes — or lies ahead of — the child). Anchors "You are here".
function currentStageIndex(childAge) {
  for (let i = 0; i < GPS_STAGES.length; i++) {
    if (childAge <= GPS_STAGES[i].maxAge) return i;
  }
  return GPS_STAGES.length - 1;
}

// Walk a stage's branch following the parent's answers.
// Returns { steps:[{moment, choiceId, choice}], nextMoment|null, complete }.
function stagePath(stage, answers) {
  const steps = [];
  let momentId = stage.entry;
  const seen = new Set();
  while (momentId && !seen.has(momentId)) {
    seen.add(momentId);
    const moment = stage.moments.find(m => m.id === momentId);
    if (!moment) break;
    const choiceId = answers[`${stage.id}_${moment.id}`];
    if (!choiceId) {
      return { steps, nextMoment: moment, complete: false };
    }
    const choice = moment.choices.find(c => c.id === choiceId);
    steps.push({ moment, choiceId, choice });
    momentId = choice ? choice.next : null;
  }
  return { steps, nextMoment: null, complete: true };
}

// ── GPS Timeline (age-anchored branching life-path tree) ──────────────
function GPSMapContent({ child, openProfile, openSwitcher, embedded = false }) {
  // When embedded (inside AssistantScreen's Screen + header) the status-bar
  // space is already handled by the parent, so we skip the top padding.
  const topPad = embedded ? 8 : 54;
  const childAge = child ? child.age : 10;
  const currentIndex = currentStageIndex(childAge);

  const [answers, setAnswers] = React.useState({});
  // activeChoice: { stage, moment } | null
  const [activeChoice, setActiveChoice] = React.useState(null);
  // Past stages (already lived) start collapsed to keep the focus on "now".
  const [collapsed, setCollapsed] = React.useState(() => {
    const init = {};
    GPS_STAGES.forEach((s, i) => { if (i < currentIndex) init[s.id] = true; });
    return init;
  });
  // Which answered cards have their insight expanded.
  const [openInsight, setOpenInsight] = React.useState({});

  const getAnswer = (stageId, momentId) => answers[`${stageId}_${momentId}`];
  const toggleCollapse = id => setCollapsed(c => ({ ...c, [id]: !c[id] }));
  const toggleInsight = key => setOpenInsight(o => ({ ...o, [key]: !o[key] }));

  // Saving an answer may re-route the branch. Prune any answers that belonged
  // to moments past the one being (re)answered, so stale cards don't linger.
  const saveAnswer = (stage, momentId, choiceId) => {
    setAnswers(prev => {
      const next = { ...prev, [`${stage.id}_${momentId}`]: choiceId };
      const live = new Set();
      let mId = stage.entry;
      const seen = new Set();
      while (mId && !seen.has(mId)) {
        seen.add(mId);
        const moment = stage.moments.find(m => m.id === mId);
        if (!moment) break;
        const key = `${stage.id}_${mId}`;
        live.add(key);
        const cId = next[key];
        if (!cId) break;
        const choice = moment.choices.find(c => c.id === cId);
        mId = choice ? choice.next : null;
      }
      Object.keys(next).forEach(k => {
        if (k.startsWith(`${stage.id}_`) && !live.has(k)) delete next[k];
      });
      return next;
    });
    setActiveChoice(null);
  };

  // Precompute branch state + progressive unlock for every stage.
  const stageState = GPS_STAGES.map(stage => ({ stage, path: stagePath(stage, answers) }));
  // Stages up to & including the current age stage are open immediately;
  // future stages unlock once the stage before them is complete.
  const unlocked = GPS_STAGES.map((_, i) => i <= currentIndex || stageState[i - 1].path.complete);
  const hereIndex = currentIndex;

  const total = GPS_STAGES.length;
  const exploredCount = stageState.filter(s => s.path.steps.length > 0).length;

  // ── Choice picker — rendered as an overlay on top of the timeline so the
  //    timeline stays mounted and its scroll position is preserved. ───────
  const pickerOverlay = activeChoice ? (() => {
    const { stage, moment } = activeChoice;
    const selectedId = getAnswer(stage.id, moment.id);
    return (
      <div style={{ position: 'absolute', inset: 0, zIndex: 50, background: T.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ paddingTop: embedded ? 16 : 54, paddingInline: 18, paddingBottom: 16, flexShrink: 0 }}>
          <button onClick={() => setActiveChoice(null)} style={{
            display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none',
            cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: 700,
            color: T.ink2, padding: '4px 0', marginBottom: 14,
          }}>
            <Icon.Back s={18} c={T.ink2}/> {stage.label}
          </button>
          <div style={{ background: T.greenSoft, borderRadius: 18, padding: '14px 18px' }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: T.ink, lineHeight: 1.4 }}>{moment.question}</div>
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 18px 32px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {moment.choices.map(ch => {
            const isSel = selectedId === ch.id;
            return (
              <button key={ch.id} onClick={() => saveAnswer(stage, moment.id, ch.id)} style={{
                width: '100%', background: '#fff', borderRadius: 16, padding: '16px 18px',
                border: `2px solid ${isSel ? T.green : T.line}`,
                cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                display: 'flex', gap: 14, alignItems: 'flex-start',
                boxShadow: isSel ? `0 0 0 1px ${T.green}` : '0 2px 8px rgba(27,36,33,0.05)',
                transition: 'border-color .14s',
              }}>
                <div style={{ fontSize: 24, flexShrink: 0, marginTop: 2 }}>{ch.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: T.ink }}>{ch.label}</div>
                  {isSel && <div style={{ fontSize: 13, color: T.ink2, lineHeight: 1.55, marginTop: 6 }}>{ch.insight}</div>}
                </div>
                {isSel && <Icon.Check s={18} c={T.green} sw={2.5}/>}
              </button>
            );
          })}
          <div style={{ fontSize: 11, color: T.muted, textAlign: 'center', marginTop: 4 }}>
            There is no right answer — only your family's path.
          </div>
        </div>
      </div>
    );
  })() : null;

  // Path summary across all completed stages.
  const summary = stageState
    .filter(s => s.path.complete && s.path.steps.length > 0)
    .map(s => ({ stage: s.stage, steps: s.path.steps }));

  // Colour of the connector line for a given stage index.
  const lineColor = (idx) => {
    const s = stageState[idx];
    if (s.path.complete && s.path.steps.length > 0) return T.mint;
    if (idx <= currentIndex) return T.green;
    return T.line;
  };

  // Renders a single answered step with an expandable insight.
  const AnsweredCard = ({ stage, moment, choice }) => {
    const key = `${stage.id}_${moment.id}`;
    const open = !!openInsight[key];
    return (
      <div style={{ background: '#fff', border: `1.5px solid ${T.green}`, borderRadius: 12,
        boxShadow: '0 2px 8px rgba(45,106,79,0.08)', overflow: 'hidden' }}>
        <button onClick={() => toggleInsight(key)} style={{
          width: '100%', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
          textAlign: 'left', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{ width: 22, height: 22, borderRadius: 999, flexShrink: 0, background: T.green,
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon.Check s={12} c="#fff" sw={2.5}/>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 11, color: T.muted, fontWeight: 600, marginBottom: 1 }}>{moment.question}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>
              {choice ? `${choice.emoji} ${choice.label}` : '—'}
            </div>
          </div>
          <div style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .15s', flexShrink: 0 }}>
            <Icon.ChevronDown s={16} c={T.muted}/>
          </div>
        </button>
        {open && (
          <div style={{ padding: '0 14px 12px 46px' }}>
            <div style={{ fontSize: 12.5, color: T.ink2, lineHeight: 1.55, marginBottom: 8 }}>
              {choice ? choice.insight : ''}
            </div>
            <button onClick={() => setActiveChoice({ stage, moment })} style={{
              background: T.greenSoft, border: 'none', borderRadius: 99, padding: '5px 12px',
              cursor: 'pointer', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, color: T.green,
            }}>Change answer</button>
          </div>
        )}
      </div>
    );
  };

  // ── Timeline view ────────────────────────────────────────────────────
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: T.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {pickerOverlay}
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

      {/* Scrollable timeline */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '4px 18px 40px' }}>
        {/* Intro + progress */}
        <div style={{ background: T.greenSoft, borderRadius: 16, padding: '14px 16px', marginBottom: 18 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: T.ink, marginBottom: 4 }}>
            {child.name}'s life path
          </div>
          <div style={{ fontSize: 12, color: T.ink2, lineHeight: 1.5, marginBottom: 12 }}>
            A guide through the years ahead. Each answer shapes what comes next — and the road ahead unlocks as you go.
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

        {GPS_STAGES.map((stage, i) => {
          const { path } = stageState[i];
          const isUnlocked = unlocked[i];
          const isComplete = path.complete && isUnlocked && path.steps.length > 0;
          const isHere     = i === hereIndex;
          const isPast     = i < currentIndex;
          const isCollapsed = isUnlocked && collapsed[stage.id];
          const isLast     = i === GPS_STAGES.length - 1;

          const nodeColor  = isComplete ? T.mint : isHere ? T.green : isUnlocked ? '#CFE3D6' : '#E8EBE7';
          const nodeBorder = !isUnlocked ? `2px dashed ${T.line}` : 'none';
          const lineBelow  = lineColor(i);
          const lineAbove  = i > 0 ? lineColor(i - 1) : 'transparent';
          const answeredCount = path.steps.length;

          return (
            <div key={stage.id} style={{ display: 'flex', gap: 0, alignItems: 'stretch' }}>
              {/* Left: connector + node */}
              <div style={{ width: 44, display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{ width: 2, height: i === 0 ? 8 : 20, background: lineAbove, borderRadius: 1 }}/>
                <div style={{
                  width: isHere ? 40 : 32, height: isHere ? 40 : 32,
                  borderRadius: 999, background: nodeColor, border: nodeBorder,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, position: 'relative',
                  boxShadow: isHere ? '0 6px 20px rgba(45,106,79,0.30)' : isComplete ? '0 2px 8px rgba(45,106,79,0.15)' : 'none',
                  transition: 'all .2s',
                }}>
                  {isComplete
                    ? <Icon.Check s={16} c="#fff" sw={2.8}/>
                    : <span style={{ fontSize: isHere ? 20 : 16, opacity: isUnlocked ? 1 : 0.5 }}>{stage.emoji}</span>
                  }
                  {isHere && (
                    <div style={{
                      position: 'absolute', top: -4, right: -4,
                      width: 14, height: 14, borderRadius: 999,
                      background: '#E63946', border: '2px solid #fff',
                      boxShadow: '0 1px 4px rgba(230,57,70,0.5)',
                    }}/>
                  )}
                </div>
                {!isLast && (
                  <div style={{ width: 2, flex: 1, minHeight: 24, background: lineBelow, borderRadius: 1 }}/>
                )}
              </div>

              {/* Right: stage content */}
              <div style={{ flex: 1, paddingLeft: 14, paddingTop: i === 0 ? 4 : 12, paddingBottom: isLast ? 0 : 4 }}>
                {/* Stage header — tap to collapse/expand when unlocked */}
                <button
                  onClick={isUnlocked ? () => toggleCollapse(stage.id) : undefined}
                  style={{
                    width: '100%', background: 'none', border: 'none', padding: 0,
                    marginBottom: !isUnlocked ? 14 : isCollapsed ? 8 : 10,
                    cursor: isUnlocked ? 'pointer' : 'default', fontFamily: 'inherit', textAlign: 'left',
                    display: 'flex', alignItems: 'flex-start', gap: 8,
                  }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: isHere ? 15 : 14, fontWeight: 700, color: !isUnlocked ? T.muted : T.ink }}>
                        {stage.label}
                      </span>
                      {isHere && (
                        <span style={{
                          fontSize: 10, fontWeight: 700, color: '#E63946',
                          background: 'rgba(230,57,70,0.10)', borderRadius: 99,
                          padding: '2px 7px', letterSpacing: '0.03em',
                        }}>YOU ARE HERE</span>
                      )}
                      {isPast && (
                        <span style={{
                          fontSize: 9.5, fontWeight: 700, color: T.muted,
                          background: T.bgAlt, borderRadius: 99, padding: '2px 7px', letterSpacing: '0.03em',
                        }}>LIVED</span>
                      )}
                      {isComplete && answeredCount > 0 && (
                        <span style={{ fontSize: 10.5, fontWeight: 600, color: T.mint }}>{answeredCount} ✓</span>
                      )}
                    </div>
                    <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>
                      {stage.sub} · {stage.ageRange}
                    </div>
                  </div>
                  {isUnlocked && (
                    <div style={{ transform: isCollapsed ? 'none' : 'rotate(180deg)', transition: 'transform .15s', marginTop: 2 }}>
                      <Icon.ChevronDown s={16} c={T.muted}/>
                    </div>
                  )}
                </button>

                {/* Collapsed unlocked stage: one-line summary */}
                {isUnlocked && isCollapsed && (
                  <div style={{ fontSize: 12, color: T.muted, marginBottom: 18 }}>
                    {answeredCount > 0
                      ? `${answeredCount} answered · tap to view`
                      : 'Tap to revisit this stage'}
                  </div>
                )}

                {/* Expanded unlocked stage: the branch */}
                {isUnlocked && !isCollapsed && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 18 }}>
                    {path.steps.map(({ moment, choice }) => (
                      <AnsweredCard key={moment.id} stage={stage} moment={moment} choice={choice}/>
                    ))}

                    {path.nextMoment && (
                      <button
                        onClick={() => setActiveChoice({ stage, moment: path.nextMoment })}
                        style={{
                          background: T.bgAlt,
                          border: `1.5px solid ${isHere ? T.green : T.line}`,
                          borderRadius: 12, padding: '10px 14px',
                          cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                          display: 'flex', alignItems: 'center', gap: 10,
                        }}>
                        <div style={{
                          width: 22, height: 22, borderRadius: 999, flexShrink: 0, background: '#D6D9D2',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <div style={{ width: 6, height: 6, borderRadius: 999, background: '#fff' }}/>
                        </div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: T.ink2, lineHeight: 1.35, flex: 1 }}>
                          {path.nextMoment.question}
                        </div>
                        <Icon.ChevronRight s={14} c={T.muted}/>
                      </button>
                    )}
                  </div>
                )}

                {/* Locked future stage: a teaser of what's ahead */}
                {!isUnlocked && (
                  <div style={{
                    background: T.bgAlt, borderRadius: 12, padding: '12px 14px', marginBottom: 18,
                    border: `1px dashed ${T.line}`,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                      <Icon.Lock s={12} c={T.muted}/>
                      <span style={{ fontSize: 10.5, fontWeight: 700, color: T.muted, letterSpacing: '0.04em' }}>
                        ON THE ROAD AHEAD
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {stage.moments.map(m => (
                        <div key={m.id} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                          <div style={{ width: 5, height: 5, borderRadius: 999, background: T.muted, marginTop: 6, flexShrink: 0 }}/>
                          <div style={{ fontSize: 12.5, color: T.ink2, lineHeight: 1.4 }}>{m.question}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ fontSize: 11, color: T.muted, marginTop: 10 }}>
                      Unlocks when you complete the previous stage.
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Path summary — appears once at least one stage is complete */}
        {summary.length > 0 && (
          <div style={{
            marginTop: 8, background: T.greenSoft, borderRadius: 18, padding: '16px 18px',
          }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: T.ink, marginBottom: 4 }}>
              Your family's path so far
            </div>
            <div style={{ fontSize: 12, color: T.ink2, lineHeight: 1.5, marginBottom: 14 }}>
              A picture of the journey, shaped by the choices you've made.
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {summary.map(({ stage, steps }) => (
                <div key={stage.id}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6 }}>
                    <span style={{ fontSize: 15 }}>{stage.emoji}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>{stage.label}</span>
                  </div>
                  {steps.map(({ moment, choice }) => (
                    <div key={moment.id} style={{
                      background: '#fff', borderRadius: 12, padding: '10px 12px',
                      marginBottom: 6, border: `1px solid ${T.line}`,
                    }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: T.ink, marginBottom: 3 }}>
                        {choice ? `${choice.emoji} ${choice.label}` : '—'}
                      </div>
                      <div style={{ fontSize: 11.5, color: T.ink2, lineHeight: 1.5 }}>
                        {choice ? choice.insight : ''}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── LifeMomentScreen (kept for backward-compat StageDetailScreen) ─────
function LifeMomentScreen({ stage, back, childAge }) {
  return (
    <Screen bg={T.bg}>
      <ScreenHeader title={stage.label} subtitle={stage.sub} onBack={back}/>
      <div style={{ padding: '0 18px 32px' }}>
        <div style={{ background: T.greenSoft, borderRadius: 18, padding: '16px 18px', marginBottom: 20,
          display: 'flex', gap: 12 }}>
          <div style={{ fontSize: 28 }}>{stage.emoji}</div>
          <div style={{ fontSize: 14, color: T.ink2, lineHeight: 1.5 }}>{stage.description}</div>
        </div>
        {stage.moments.map(m => (
          <div key={m.id} style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', marginBottom: 8,
            border: `1px solid ${T.line}` }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: T.ink }}>{m.question}</div>
          </div>
        ))}
      </div>
    </Screen>
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
const AGE_STAGES = GPS_STAGES;
function stagesForChild() { return GPS_STAGES; }
function StageDetailScreen({ back }) { return <LifeMomentScreen stage={GPS_STAGES[2]} childAge={10} back={back}/>; }
function QuestionDetailScreen({ back }) { return <LifeMomentScreen stage={GPS_STAGES[2]} childAge={10} back={back}/>; }

Object.assign(window, { MapScreen, GPSMapContent, StageDetailScreen, QuestionDetailScreen, AGE_STAGES, stagesForChild });
