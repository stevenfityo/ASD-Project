// aTyp — GPS: Life Journey Guide for ASD Parents.
// A branching decision tree: each answer reveals a different next question,
// so parents can preview the path their child may take based on their choices.
// Answers also generate a personal route — concrete next steps parents can
// open, read, and check off (Plan B: "step route"). Progress persists per
// child in localStorage under the 'atyp_gps' key.
// The question tree is the "small question model" (SQM): the GPS guides
// parents on WHAT to ask; finishing a branch hands the collected context to
// an AI chat (AiHandoffSheet) that provides the answers — the SQM → LLM
// collaboration at the core of the product.

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
        why: 'Parents who acknowledge their own state early reach support faster. Your wellbeing is the foundation every other decision in this journey rests on.',
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
        why: 'Family alignment determines how much day-to-day support your child gets. Knowing where everyone stands tells you which conversations to have now.',
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
        why: 'Daily structure is one of the strongest predictors of calmer days for a child with ASD. This shows where your routines need reinforcement first.',
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
        why: 'Siblings shape — and are shaped by — the family system. Naming their reality early prevents resentment and builds lifelong allies for your child.',
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
        why: 'Self-understanding drives self-esteem and self-advocacy. When and how a child learns about their diagnosis shapes how they see themselves for years.',
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
        why: 'Parental burnout and relationship strain are the hidden risks of this stage. A stable partnership — or a supported solo parent — is your child\'s infrastructure.',
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
        why: 'Your disclosure style decides how much support your family can draw from schools, friends and community — and models self-acceptance for your child.',
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
        why: 'How a teenager relates to their diagnosis is one of the strongest mental-health signals of adolescence. It tells us whether identity support is needed now.',
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
        why: 'Isolation in adolescence is a real mental-health risk, while even one genuine friendship is protective. This shows which kind of support matters next.',
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
        why: 'The right services depend entirely on the level of independence you\'re planning for — and many programs have years-long waitlists that reward starting early.',
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
        why: 'Trusts, guardianship and letters of intent take months to set up and decades to matter. Where you stand today determines the next legal and financial step.',
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
        why: 'Housing determines the entire support system around your adult child. Each arrangement comes with different funding, services and family roles to plan for.',
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
        why: 'A good adult life is built around what genuinely engages your child. Their sources of joy point to the work, community and daily structure that will last.',
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
        why: 'This is the most consequential question in special-needs planning: who will hold your child\'s story when you can\'t. Everything else builds on this answer.',
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

// ── Route actions ─────────────────────────────────────────────────────
// Every answer maps to one concrete next step. Keyed `${momentId}${choiceId}`
// (moment ids are globally unique). These become the personal route.
const GPS_ACTIONS = {
  g1m1a: { title: 'Connect with other ASD parents', detail: 'Join a local or online parent support group this week. Hearing from parents a few steps ahead of you brings more clarity than any book.' },
  g1m1b: { title: 'Set up your family systems', detail: 'Use your current energy well: build the routine calendar, organize paperwork, book upcoming appointments — and schedule one rest day for yourself to protect against later burnout.' },
  g1m1c: { title: 'Get support for yourself first', detail: 'Ask your doctor about parent support groups and respite care options. Book one hour this week that is only for you.' },
  g1m2a: { title: 'Give family a shared foundation', detail: 'Pick one gentle resource — like "Ten Things Every Child with Autism Wishes You Knew" — and share it with grandparents and siblings.' },
  g1m2b: { title: 'Plan one honest conversation', detail: 'Choose the family member who matters most and set up a calm one-on-one talk. An autism-informed family therapist can help open the hardest conversations.' },
  g1m2c: { title: 'Find your community online', detail: 'Join an ASD-parents community (Autism Society forums, local parent groups) and introduce yourself. You don\'t have to discover this alone.' },
  g2m1a: { title: 'Document what works', detail: 'Write down your morning sequence, calming rituals and dinner routine so caregivers, teachers and grandparents can follow them.' },
  g2m1b: { title: 'Try one visual schedule', detail: 'Pick the hardest part of the day and test a simple picture schedule for two weeks. Permission to experiment — the "right" routine is the one that works for your child.' },
  g2m1c: { title: 'Apply for respite care', detail: 'Look up respite care and in-home support programs in your area and start one application this week. Stabilising daily life comes first.' },
  g2m2a: { title: 'Protect sibling one-on-one time', detail: 'Put a recurring "just us" hour with each sibling into the family calendar — they need space to just be kids.' },
  g2m2b: { title: 'Find a sibling support group', detail: 'Search for Sibshops or similar sibling groups nearby and book a first session. Their feelings are valid and deserve their own space.' },
  g2m2c: { title: 'Talk to a genetic counselor', detail: 'If more children are on your mind, book a genetic counseling consult to think through the numbers calmly.' },
  g3m1a: { title: 'Keep the conversation alive', detail: 'Pick an age-appropriate book or video about autism to enjoy together this month — like "The Reason I Jump".' },
  g3m1b: { title: 'Prepare the conversation', detail: 'Gather the words, books and examples you\'d use, so you\'re ready to gently name autism on your child\'s timeline.' },
  g3m1c: { title: 'Plan the disclosure talk', detail: 'Most experts recommend telling children between ages 6–10. Choose a calm moment in the coming weeks and prepare a simple, positive explanation.' },
  g3m2a: { title: 'Schedule partner time', detail: 'Protect one evening a month that is about you two — not logistics, not therapy schedules.' },
  g3m2b: { title: 'Book couples support', detail: 'Find a therapist familiar with special-needs parenting stress. Even 30 minutes of scheduled time together after bedtime helps over months.' },
  g3m2c: { title: 'Map your support network', detail: 'List three people or services you can call on, and look up programs for single parents of children with disabilities in your community.' },
  g3m3a: { title: 'Build your ally circle', detail: 'Identify the teachers, neighbors and friends who "get it" and keep them in the loop — they are your infrastructure.' },
  g3m3b: { title: 'Prepare a short explanation', detail: 'Write a two-sentence description of your child\'s needs you can use when it serves them — at school, activities, or travel.' },
  g3m3c: { title: 'Let one trusted person in', detail: 'Choose one person and share the full story with them. Having someone who knows everything matters more than you might expect.' },
  g4m1a: { title: 'Connect them with community', detail: 'Help your teen find neurodiversity communities or a positive autistic role model or mentor.' },
  g4m1b: { title: 'Find an affirming therapist', detail: 'Look for an autistic-affirming therapist. Teenage grief or shame about the diagnosis is a mental-health signal worth acting on.' },
  g4m1c: { title: 'Try a side-door approach', detail: 'Watch a documentary or series featuring autistic adults together — no pressure, no big talk, just exposure.' },
  g4m2a: { title: 'Protect the friendships', detail: 'Make hangouts easy: rides, predictable plans, a sensory-friendly place. One or two genuine friendships are worth protecting.' },
  g4m2b: { title: 'Make online life safe', detail: 'Talk through privacy and safety rules together — and treat online friends as real friends, because they are.' },
  g4m2c: { title: 'Find one interest-based group', detail: 'Search for a club around their passion — gaming, anime, robotics — and try one meeting. Shared passion is the best connector.' },
  g5m1a: { title: 'Build self-advocacy skills', detail: 'Practice together how to explain their needs at college, at work, and at the doctor\'s office.' },
  g5m1b: { title: 'Apply for waiver programs', detail: 'Research your state\'s Medicaid HCBS waivers now — waitlists can run years. Start the process before age 18.' },
  g5m1c: { title: 'Meet a transition specialist', detail: 'Request a transition-planning meeting through the IEP process this semester. Post-secondary planning should already be underway.' },
  g5m2a: { title: 'Review the plan yearly', detail: 'Put an annual review of the special needs trust, letter of intent and guardianship arrangements into your calendar.' },
  g5m2b: { title: 'Book the attorney meeting', detail: 'Schedule one meeting with a special needs attorney. That single action tends to unlock everything else.' },
  g5m2c: { title: 'Start with one conversation', detail: 'Invite one trusted person into the "what comes after us" topic. You don\'t have to plan alone — you just have to start.' },
  g6m1a: { title: 'Grow agency at home', detail: 'Give your adult child one new domain to fully own — their schedule, their meals, a personal budget.' },
  g6m1b: { title: 'Stay actively involved', detail: 'Set a regular visiting rhythm, know the staff by name, and keep your adult child\'s own preferences at the center.' },
  g6m1c: { title: 'Add supportive tech', detail: 'Set up reminder apps, smart-home helpers and a video-call routine that quietly extend independence.' },
  g6m2a: { title: 'Invest in the passion', detail: 'Find a community, course or work opportunity built around their special interest — for many autistic adults it\'s the center of a good life.' },
  g6m2b: { title: 'Stabilize the routine', detail: 'Protect the weekly structure and plan any changes well in advance, together. Predictability is a foundation, not a limitation.' },
  g6m2c: { title: 'Ritualize family time', detail: 'Make family time predictable: same day, same shared activity, something to look forward to.' },
  g7m1a: { title: 'Prepare the future advocate', detail: 'Bring your chosen family member into planning now: share the letter of intent, the finances and the daily-support details.' },
  g7m1b: { title: 'Vet the professional guardian', detail: 'Interview candidates with autism experience, check references, visit their programs — and include your adult child\'s preferences.' },
  g7m1c: { title: 'See an estate planning attorney', detail: 'Book a special-needs estate planning consult. It\'s the most important unanswered question — and it\'s answerable.' },
};

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

// ── "Why this matters" — collapsible note under each question. Keyed by
//    moment id from the caller so it resets when the question advances. ──
function WhyToggle({ why }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ marginTop: -6, marginBottom: 14 }}>
      <button onClick={() => setOpen(o => !o)} style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, color: T.green, display: 'flex', alignItems: 'center', gap: 5 }}>
        <span style={{ fontSize: 13 }}>💡</span> Why this question matters
        <span style={{ display: 'inline-flex', transform: open ? 'rotate(90deg)' : 'none', transition: 'transform .15s' }}><Icon.ChevronRight s={12} c={T.green}/></span>
      </button>
      {open && (
        <div style={{ marginTop: 8, background: T.bgAlt, borderRadius: 12, padding: '10px 13px', fontSize: 12.5, color: T.ink2, lineHeight: 1.55 }}>{why}</div>
      )}
    </div>
  );
}

// ── Ask AI — the SQM → LLM handoff ────────────────────────────────────
// The GPS guides parents through the questions (the "small question model");
// this sheet hands the collected context to the AI for the answers. In the
// prototype the reply is scripted from the chosen insights; "Open in ChatGPT"
// is a real deep link carrying the same prefilled prompt.
function AiTypedText({ text, onGrow }) {
  const [n, setN] = React.useState(0);
  React.useEffect(() => {
    setN(0);
    const id = setInterval(() => setN(cur => {
      if (cur >= text.length) { clearInterval(id); return cur; }
      return Math.min(text.length, cur + 3);
    }), 18);
    return () => clearInterval(id);
  }, [text]);
  React.useEffect(() => { if (onGrow) onGrow(); }, [n]);
  return <span style={{ whiteSpace: 'pre-wrap' }}>{text.slice(0, n)}{n < text.length ? '▍' : ''}</span>;
}

function AiHandoffSheet({ stage, path, child, onClose }) {
  const [thinking, setThinking] = React.useState(true);
  const scrollRef = React.useRef(null);
  React.useEffect(() => {
    const t = setTimeout(() => setThinking(false), 1200);
    return () => clearTimeout(t);
  }, []);
  const scrollDown = () => { const el = scrollRef.current; if (el) el.scrollTop = el.scrollHeight; };

  const name = child ? child.name : 'my child';
  const steps = path.steps;
  const intro = `${name} is ${child ? `${child.age} ` : ''}and on the autism spectrum. We're at the "${stage.label}" stage (${stage.sub}, ages ${stage.ageRange}).`;
  const prompt = steps.length > 0
    ? `${intro} Here's where we stand:\n${steps.map(({ moment, choice }) => `• ${moment.question} — ${choice.label}`).join('\n')}\nWhat should we focus on next?`
    : `${intro} We're just getting started. What should we know and focus on first?`;
  const answer = steps.length > 0
    ? `Here's what stands out for ${name} at the ${stage.label} stage, based on your answers:\n\n${steps.map(({ choice }) => `${choice.emoji} ${choice.insight}`).join('\n\n')}\n\nI've turned these into concrete next steps on your route — find them at the 🏁 flag on the map. Anything you'd like to go deeper on?`
    : `${stage.description}\n\nAnswer the questions on this stage and I'll tailor my guidance to ${name}'s specific path — every answer sharpens what I can tell you.`;
  const gptUrl = 'https://chatgpt.com/?q=' + encodeURIComponent(prompt);

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 210, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <style>{`@keyframes atypAiDot{0%,80%,100%{opacity:.25;transform:translateY(0)}40%{opacity:1;transform:translateY(-2px)}}`}</style>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(27,36,33,0.45)' }}/>
      <div style={{ position: 'relative', background: '#fff', borderRadius: '22px 22px 0 0', maxHeight: '88%', display: 'flex', flexDirection: 'column', animation: 'atypSheetUp .28s ease' }}>
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 12, paddingBottom: 4, flexShrink: 0 }}>
          <div style={{ width: 36, height: 4, borderRadius: 999, background: T.line }}/>
        </div>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 18px 12px', flexShrink: 0 }}>
          <div style={{ width: 36, height: 36, borderRadius: 999, flexShrink: 0, background: `linear-gradient(150deg, ${T.green}, ${T.greenDeep})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon.Sparkle s={16} c="#fff"/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14.5, fontWeight: 700, color: T.ink }}>aTyp AI</div>
            <div style={{ fontSize: 11.5, color: T.muted }}>We guide the questions — AI answers</div>
          </div>
          <button onClick={onClose} style={{ width: 30, height: 30, borderRadius: 999, border: 'none', background: T.bgAlt, cursor: 'pointer', fontFamily: 'inherit', fontSize: 17, color: T.muted, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
        </div>
        {/* Conversation */}
        <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '2px 18px 8px' }}>
          {/* User prompt bubble — the context the GPS collected */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
            <div style={{ maxWidth: '85%', background: T.green, color: '#fff', borderRadius: '18px 4px 18px 18px', padding: '11px 14px', fontSize: 12.5, lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>{prompt}</div>
          </div>
          {/* AI reply bubble */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 999, flexShrink: 0, marginTop: 2, background: `linear-gradient(150deg, ${T.green}, ${T.greenDeep})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon.Sparkle s={12} c="#fff"/>
            </div>
            <div style={{ flex: 1, background: T.bgAlt, borderRadius: '4px 18px 18px 18px', padding: '12px 14px', fontSize: 13, color: T.ink2, lineHeight: 1.55 }}>
              {thinking ? (
                <div style={{ display: 'flex', gap: 4, padding: '4px 2px' }}>
                  {[0, 1, 2].map(i => (
                    <span key={i} style={{ width: 6, height: 6, borderRadius: 999, background: T.muted, animation: `atypAiDot 1.1s ${i * 0.18}s infinite` }}/>
                  ))}
                </div>
              ) : (
                <AiTypedText text={answer} onGrow={scrollDown}/>
              )}
            </div>
          </div>
        </div>
        {/* Actions */}
        <div style={{ flexShrink: 0, padding: '10px 18px 30px', display: 'flex', flexDirection: 'column', gap: 8, borderTop: `1px solid ${T.line}` }}>
          <a href={gptUrl} target="_blank" rel="noreferrer" style={{ height: 46, borderRadius: 14, border: `1.5px solid ${T.line}`, background: '#fff', color: T.ink, fontSize: 14, fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            Continue in ChatGPT ↗
          </a>
          <button onClick={onClose} style={{ height: 46, borderRadius: 14, border: 'none', background: T.green, color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Done</button>
        </div>
      </div>
    </div>
  );
}

// ── GPS Timeline (age-anchored branching life-path tree) ──────────────
function GPSMapContent({ child, openProfile, openSwitcher, embedded = false }) {
  // When embedded (inside AssistantScreen's Screen + header) the status-bar
  // space is already handled by the parent, so we skip the top padding.
  const topPad = embedded ? 8 : 54;
  const childAge = child ? child.age : 10;
  const currentIndex = currentStageIndex(childAge);

  // All GPS progress (answers + completed route steps, per child) lives in one
  // localStorage blob so it survives sessions and child switches.
  const childId = child ? child.id : 'default';
  const [gpsStore, setGpsStore] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('atyp_gps')) || {}; } catch { return {}; }
  });
  React.useEffect(() => {
    try { localStorage.setItem('atyp_gps', JSON.stringify(gpsStore)); } catch {}
  }, [gpsStore]);
  const answers   = (gpsStore[childId] || {}).answers || {};
  const doneSteps = (gpsStore[childId] || {}).done || {};
  const updateChild = (fn) => setGpsStore(prev => ({ ...prev, [childId]: fn(prev[childId] || {}) }));

  // sheetStage: the stage whose question sheet (bottom popup) is open, or null.
  const [sheetStage, setSheetStage] = React.useState(null);
  // aiStage: the stage whose Ask-AI sheet is open (SQM → LLM handoff), or null.
  const [aiStage, setAiStage] = React.useState(null);
  // Whether the route (next steps) bottom sheet is open.
  const [showSummary, setShowSummary] = React.useState(false);
  // Which route step card is expanded inside the route sheet.
  const [expandedStep, setExpandedStep] = React.useState(null);

  // Saving an answer may re-route the branch. Prune any answers that belonged
  // to moments past the one being (re)answered, so stale cards don't linger.
  const saveAnswer = (stage, momentId, choiceId) => {
    updateChild(cur => {
      const next = { ...(cur.answers || {}), [`${stage.id}_${momentId}`]: choiceId };
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
      return { ...cur, answers: next };
    });
  };

  const toggleStep = (key) => updateChild(cur => ({
    ...cur, done: { ...(cur.done || {}), [key]: !(cur.done || {})[key] },
  }));

  // Precompute branch state + progressive unlock for every stage.
  const stageState = GPS_STAGES.map(stage => ({ stage, path: stagePath(stage, answers) }));
  // Stages up to & including the current age stage are open immediately;
  // future stages unlock once the stage before them is complete.
  const unlocked = GPS_STAGES.map((_, i) => i <= currentIndex || stageState[i - 1].path.complete);
  const hereIndex = currentIndex;

  const total = GPS_STAGES.length;
  const exploredCount = stageState.filter(s => s.path.steps.length > 0).length;

  // ── Question sheet — steps through the active stage's questions one at a
  //    time as a bottom popup. saveAnswer advances the branch automatically. ─
  const questionSheet = sheetStage ? (() => {
    const stage = sheetStage;
    const path = stagePath(stage, answers);
    const moment = path.nextMoment;
    const done = !moment;
    return (
      <div style={{ position: 'absolute', inset: 0, zIndex: 200, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <div onClick={() => setSheetStage(null)} style={{ position: 'absolute', inset: 0, background: 'rgba(27,36,33,0.45)' }}/>
        <div style={{ position: 'relative', background: '#fff', borderRadius: '22px 22px 0 0', padding: '0 18px 32px', maxHeight: '88%', overflowY: 'auto', animation: 'atypSheetUp .28s ease' }}>
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 12, paddingBottom: 4 }}>
            <div style={{ width: 36, height: 4, borderRadius: 999, background: T.line }}/>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4, marginBottom: 14 }}>
            <span style={{ fontSize: 20 }}>{stage.emoji}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14.5, fontWeight: 700, color: T.ink }}>{stage.label}</div>
              <div style={{ fontSize: 11.5, color: T.muted }}>{stage.sub} · {stage.ageRange}</div>
            </div>
            <button onClick={() => setSheetStage(null)} style={{ width: 30, height: 30, borderRadius: 999, border: 'none', background: T.bgAlt, cursor: 'pointer', fontFamily: 'inherit', fontSize: 17, color: T.muted, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
          </div>

          {done ? (
            <div style={{ padding: '8px 0 4px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, textAlign: 'center' }}>
              <div style={{ width: 56, height: 56, borderRadius: 999, background: T.mint, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon.Check s={28} c="#fff" sw={2.8}/>
              </div>
              <div style={{ fontSize: 17, fontWeight: 800, color: T.ink }}>Stage complete</div>
              <div style={{ fontSize: 13, color: T.ink2, lineHeight: 1.5, maxWidth: 260 }}>
                You've walked through {stage.label}. Your answers added new steps to your route — find it at the 🏁 flag.
              </div>
              <button onClick={() => { setSheetStage(null); setAiStage(stage); }} style={{ marginTop: 6, width: '100%', height: 48, borderRadius: 14, border: 'none', background: T.green, color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <Icon.Sparkle s={15} c="#fff"/> Ask aTyp AI about this
              </button>
              <button onClick={() => setSheetStage(null)} style={{ width: '100%', height: 44, borderRadius: 14, border: 'none', background: 'transparent', color: T.muted, fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Back to map</button>
            </div>
          ) : (
            <>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.green, letterSpacing: '0.04em', marginBottom: 6 }}>
                QUESTION {path.steps.length + 1}
              </div>
              <div style={{ background: T.greenSoft, borderRadius: 16, padding: '14px 16px', marginBottom: 14 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: T.ink, lineHeight: 1.4 }}>{moment.question}</div>
              </div>
              {moment.why && <WhyToggle key={moment.id} why={moment.why}/>}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {moment.choices.map(ch => (
                  <button key={ch.id} onClick={() => {
                    saveAnswer(stage, moment.id, ch.id);
                    // Last question of the branch — close the sheet right away
                    // and return to the map. Asking the AI stays the parent's
                    // own choice (button below / on the completed stage).
                    if (!ch.next) setSheetStage(null);
                  }} style={{
                    width: '100%', background: '#fff', borderRadius: 16, padding: '14px 16px',
                    border: `2px solid ${T.line}`,
                    cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                    display: 'flex', gap: 14, alignItems: 'flex-start',
                    boxShadow: '0 2px 8px rgba(27,36,33,0.05)',
                    transition: 'border-color .14s',
                  }}>
                    <div style={{ fontSize: 24, flexShrink: 0, marginTop: 2 }}>{ch.emoji}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: T.ink }}>{ch.label}</div>
                    </div>
                    <Icon.ChevronRight s={16} c={T.muted}/>
                  </button>
                ))}
              </div>
              <div style={{ fontSize: 11, color: T.muted, textAlign: 'center', marginTop: 12 }}>
                There is no right answer — only your family's path.
              </div>
              {/* Optional AI handoff — always the parent's choice, never automatic. */}
              <button onClick={() => { setSheetStage(null); setAiStage(stage); }} style={{
                marginTop: 12, width: '100%', height: 46, borderRadius: 14,
                border: `1.5px solid rgba(45,106,79,0.35)`, background: T.greenSoft,
                color: T.green, fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}>
                <Icon.Sparkle s={15} c={T.green}/>
                {path.steps.length > 0 ? 'Ask aTyp AI about your answers' : 'Ask aTyp AI about this stage'}
              </button>
            </>
          )}
        </div>
      </div>
    );
  })() : null;

  // ── Ask-AI sheet — opens after the final answer of a stage's branch. ──
  const aiSheet = aiStage ? (
    <AiHandoffSheet stage={aiStage} path={stagePath(aiStage, answers)} child={child} onClose={() => setAiStage(null)}/>
  ) : null;

  // ── Personal route (Plan B: "Маршрут кроків") ─────────────────────────
  // Every answered question contributes one concrete action. Steps from the
  // current stage come first, then the road ahead, then revisited past stages.
  const stageOrder = [];
  for (let i = currentIndex; i < GPS_STAGES.length; i++) stageOrder.push(i);
  for (let i = currentIndex - 1; i >= 0; i--) stageOrder.push(i);
  const route = [];
  stageOrder.forEach(i => {
    const { stage, path } = stageState[i];
    path.steps.forEach(({ moment, choiceId, choice }) => {
      const action = GPS_ACTIONS[`${moment.id}${choiceId}`];
      if (action) route.push({ key: `${stage.id}_${moment.id}`, stage, action, choice });
    });
  });
  const routeSteps = route.slice(0, 6);
  const doneCount = routeSteps.filter(s => doneSteps[s.key]).length;

  // ── Route sheet — the final node opens the personal step route. ───────
  const summarySheet = showSummary ? (
    <div style={{ position: 'absolute', inset: 0, zIndex: 200, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <div onClick={() => setShowSummary(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(27,36,33,0.45)' }}/>
      <div style={{ position: 'relative', background: '#fff', borderRadius: '22px 22px 0 0', padding: '0 18px 32px', maxHeight: '88%', overflowY: 'auto', animation: 'atypSheetUp .28s ease' }}>
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 12, paddingBottom: 4 }}>
          <div style={{ width: 36, height: 4, borderRadius: 999, background: T.line }}/>
        </div>
        <div style={{ fontSize: 19, fontWeight: 800, color: T.ink, letterSpacing: '-0.02em', marginTop: 6, marginBottom: 4 }}>
          Your route
        </div>
        <div style={{ fontSize: 12.5, color: T.ink2, lineHeight: 1.5, marginBottom: 14 }}>
          {routeSteps.length === 0
            ? 'Your personal next steps, built from your answers.'
            : `${routeSteps.length} step${routeSteps.length > 1 ? 's' : ''} from today — built from your answers on the map.`}
        </div>
        {routeSteps.length === 0 ? (
          <div style={{ background: T.greenSoft, borderRadius: 14, padding: '18px 16px', fontSize: 13, color: T.ink2, lineHeight: 1.55, textAlign: 'center' }}>
            Answer a few questions on the map — each answer adds a step to your family's route.
          </div>
        ) : (
          <>
            {/* Route progress */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <div style={{ flex: 1, height: 6, borderRadius: 99, background: 'rgba(45,106,79,0.15)', overflow: 'hidden' }}>
                <div style={{ width: `${Math.round((doneCount / routeSteps.length) * 100)}%`, height: '100%', background: T.mint, borderRadius: 99, transition: 'width .25s' }}/>
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.green, whiteSpace: 'nowrap' }}>
                {doneCount}/{routeSteps.length} done
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {routeSteps.map((step, idx) => {
                const isDone = !!doneSteps[step.key];
                const isOpen = expandedStep === step.key;
                return (
                  <div key={step.key} style={{
                    background: isDone ? T.greenSoft : '#fff', borderRadius: 16,
                    border: `1.5px solid ${isDone ? T.mint : T.line}`,
                    boxShadow: isDone ? 'none' : '0 2px 8px rgba(27,36,33,0.05)',
                    transition: 'all .18s', overflow: 'hidden',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 14px', cursor: 'pointer' }}
                      onClick={() => setExpandedStep(isOpen ? null : step.key)}>
                      {/* check circle */}
                      <button onClick={(e) => { e.stopPropagation(); toggleStep(step.key); }} style={{
                        width: 28, height: 28, borderRadius: 999, flexShrink: 0, marginTop: 1,
                        border: isDone ? 'none' : `2px solid ${T.line}`,
                        background: isDone ? T.mint : '#fff',
                        cursor: 'pointer', fontFamily: 'inherit',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all .15s',
                      }}>
                        {isDone
                          ? <Icon.Check s={15} c="#fff" sw={3}/>
                          : <span style={{ fontSize: 11.5, fontWeight: 700, color: T.muted }}>{idx + 1}</span>}
                      </button>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.35,
                          color: isDone ? T.muted : T.ink,
                          textDecoration: isDone ? 'line-through' : 'none' }}>
                          {step.action.title}
                        </div>
                        <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>
                          {step.stage.emoji} {step.stage.label} · {step.choice ? step.choice.label : ''}
                        </div>
                      </div>
                      <div style={{ flexShrink: 0, marginTop: 4, transform: isOpen ? 'rotate(90deg)' : 'none', transition: 'transform .18s' }}>
                        <Icon.ChevronRight s={15} c={T.muted}/>
                      </div>
                    </div>
                    {isOpen && (
                      <div style={{ padding: '0 14px 13px 54px' }}>
                        <div style={{ fontSize: 12.5, color: T.ink2, lineHeight: 1.55 }}>{step.action.detail}</div>
                        {step.choice && (
                          <div style={{ fontSize: 11.5, color: T.muted, lineHeight: 1.5, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${isDone ? 'rgba(45,106,79,0.15)' : T.line}` }}>
                            {step.choice.insight}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {doneCount === routeSteps.length && (
              <div style={{ marginTop: 14, background: T.mintBg, borderRadius: 14, padding: '14px 16px', textAlign: 'center', fontSize: 13, fontWeight: 700, color: T.greenDeep }}>
                🎉 Route complete — answer more questions to extend it.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  ) : null;

  // ── Node-path geometry (Duolingo-style serpentine) ───────────────────
  const BOARD_W = 300, NODE_GAP = 108, TOP = 56;
  const WAVE = [0, 74, 0, -74];
  const nodePos = (i) => ({ x: BOARD_W / 2 + WAVE[i % WAVE.length], y: TOP + i * NODE_GAP });
  const allCenters = GPS_STAGES.map((_, i) => nodePos(i));
  const summaryCenter = nodePos(GPS_STAGES.length);
  allCenters.push(summaryCenter);
  const boardH = summaryCenter.y + 96;
  const summaryUnlocked = exploredCount > 0;

  // ── Node-path view ───────────────────────────────────────────────────
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: T.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {questionSheet}
      {aiSheet}
      {summarySheet}
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
            A guide through the years ahead. Each answer shapes what comes next — and adds a step to your personal route at the finish.
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
          {/* connectors between consecutive node centres */}
          <svg width={BOARD_W} height={boardH} style={{ position: 'absolute', left: 0, top: 0 }}>
            {allCenters.slice(1).map((c, idx) => {
              const prev = allCenters[idx];
              const st = stageState[idx];
              const filled = st && st.path.complete && st.path.steps.length > 0;
              return (
                <line key={idx} x1={prev.x} y1={prev.y} x2={c.x} y2={c.y}
                  stroke={filled ? T.mint : T.line} strokeWidth={4} strokeLinecap="round"
                  strokeDasharray={filled ? 'none' : '2 9'}/>
              );
            })}
          </svg>

          {/* stage nodes */}
          {GPS_STAGES.map((stage, i) => {
            const { path } = stageState[i];
            const isUnlocked = unlocked[i];
            const isComplete = path.complete && isUnlocked && path.steps.length > 0;
            const isHere     = i === hereIndex;
            const answered   = path.steps.length;
            const { x, y }   = allCenters[i];
            const size       = isHere ? 66 : 58;
            const nodeColor  = isComplete ? T.mint : isHere ? T.green : isUnlocked ? '#CFE3D6' : '#E8EBE7';
            const nodeBorder = !isUnlocked ? `2px dashed ${T.line}` : 'none';

            return (
              <React.Fragment key={stage.id}>
                <button
                  onClick={isUnlocked ? () => setSheetStage(stage) : undefined}
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
                      : <span style={{ fontSize: isHere ? 28 : 24 }}>{stage.emoji}</span>}
                  {isHere && (
                    <div style={{ position: 'absolute', top: -3, right: -3, width: 16, height: 16, borderRadius: 999, background: '#E63946', border: '2px solid #fff', boxShadow: '0 1px 4px rgba(230,57,70,0.5)' }}/>
                  )}
                  {answered > 0 && !isComplete && (
                    <div style={{ position: 'absolute', bottom: -3, right: -3, minWidth: 18, height: 18, padding: '0 4px', borderRadius: 999, background: T.green, color: '#fff', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>{answered}</div>
                  )}
                </button>
                <div style={{ position: 'absolute', left: x, top: y + size / 2 + 5, transform: 'translateX(-50%)', width: 138, textAlign: 'center', pointerEvents: 'none' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: isUnlocked ? T.ink : T.muted, lineHeight: 1.2 }}>{stage.label}</div>
                  <div style={{ fontSize: 10.5, color: T.muted, marginTop: 1 }}>{stage.ageRange}</div>
                  {isHere && <div style={{ fontSize: 9.5, fontWeight: 700, color: '#E63946', marginTop: 2, letterSpacing: '0.03em' }}>YOU ARE HERE</div>}
                </div>
              </React.Fragment>
            );
          })}

          {/* route node — opens the personal step route */}
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
            {routeSteps.length > 0 && (
              <div style={{ position: 'absolute', bottom: -3, right: -6, height: 18, padding: '0 6px', borderRadius: 999,
                background: doneCount === routeSteps.length ? T.mint : T.green, color: '#fff',
                fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '2px solid #fff' }}>
                {doneCount}/{routeSteps.length}
              </div>
            )}
          </button>
          <div style={{ position: 'absolute', left: summaryCenter.x, top: summaryCenter.y + 38, transform: 'translateX(-50%)', width: 138, textAlign: 'center', pointerEvents: 'none' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: summaryUnlocked ? T.ink : T.muted, lineHeight: 1.2 }}>Your route</div>
            <div style={{ fontSize: 10.5, color: T.muted, marginTop: 1 }}>Your next steps</div>
          </div>
        </div>
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
