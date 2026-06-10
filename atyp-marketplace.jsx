// aTyp — Marketplace listings data + detail screen

const MARKETPLACE_LISTINGS = [
  {
    id: 1, name: 'Sunrise ABA Therapy', cat: 'Therapy', sub: 'ABA · Behavioral',
    rating: 4.8, reviews: 42, loc: 'Newark, NJ', dist: '2.3 mi',
    tint: '#2D6A4F', bg: '#E8F2EC', icon: 'Brain', verified: true,
    about: 'Sunrise specializes in naturalistic ABA for school-age children (ages 3–18). All lead therapists hold BCBA certification. Emma\'s current therapist Jennifer L. is based here.',
    services: ['In-home ABA sessions', 'Clinic-based program', 'Parent training (20h)', 'Social skills groups', 'School consultation visits'],
    address: '441 Market St, Newark, NJ 07102',
    hours: 'Mon–Fri  8 AM – 7 PM',
    phone: '(973) 555-0142',
    insurance: 'Medicaid · BCBS · Aetna · Cigna',
    sampleReviews: [
      { initials: 'MT', name: 'Michael T.', rating: 5, text: 'Jennifer has been incredible with our son. The naturalistic approach made a huge difference in generalization.' },
      { initials: 'SA', name: 'Sarah A.', rating: 5, text: 'Parent training hours are a game-changer. We finally understand how to support him at home.' },
    ],
  },
  {
    id: 2, name: 'Dr. Rachel Kim', cat: 'Medical', sub: 'Neurology · Pediatric',
    rating: 4.9, reviews: 18, loc: 'Montclair, NJ', dist: '4.1 mi',
    tint: '#C25450', bg: '#F5E1E0', icon: 'Hospital', verified: true,
    about: 'Board-certified pediatric neurologist with 14 years of experience in ASD, ADHD, and epilepsy. Takes a medication-cautious, family-centered approach.',
    services: ['Diagnostic evaluations', 'EEG & brain mapping', 'Medication management', 'Co-occurring condition review', 'Telehealth available'],
    address: '255 Bloomfield Ave, Montclair, NJ 07042',
    hours: 'Tue–Sat  9 AM – 5 PM',
    phone: '(973) 555-0276',
    insurance: 'Medicaid · Horizon · Aetna',
    sampleReviews: [
      { initials: 'LR', name: 'Linda R.', rating: 5, text: 'Dr. Kim listens and never rushes. She explained everything in plain language we could understand.' },
      { initials: 'JP', name: 'James P.', rating: 4, text: 'Great neurologist, but book 6–8 weeks out. Worth the wait.' },
    ],
  },
  {
    id: 3, name: 'Greenwood Special Ed School', cat: 'School', sub: 'K–8 · Special Education',
    rating: 4.6, reviews: 31, loc: 'Edison, NJ', dist: '8.0 mi',
    tint: '#3B82C4', bg: '#E4EEF6', icon: 'School', verified: true, promoted: true,
    about: 'Private special education school for K–8 with 4:1 student-to-teacher ratio. Strong focus on ABA integration, speech, and social development in a structured environment.',
    services: ['Small classes (4:1 ratio)', 'On-site speech & OT', 'ABA-integrated curriculum', 'Extended school year', 'Parent workshops monthly'],
    address: '110 Woodbridge Ave, Edison, NJ 08817',
    hours: 'Mon–Fri  8:30 AM – 3 PM',
    phone: '(732) 555-0089',
    insurance: 'District-funded IEP placements · Private pay',
    sampleReviews: [
      { initials: 'CC', name: 'Carol C.', rating: 5, text: 'Our daughter went from refusing to enter a classroom to loving school. The staff truly understand ASD.' },
      { initials: 'BW', name: 'Brian W.', rating: 4, text: 'Long commute but 100% worth it. Integrated therapy model made the difference.' },
    ],
  },
  {
    id: 4, name: 'SpeakUp Speech Therapy', cat: 'Therapy', sub: 'Speech · Language',
    rating: 4.7, reviews: 28, loc: 'Livingston, NJ', dist: '5.6 mi',
    tint: '#9C5E3A', bg: '#F2E4D8', icon: 'Pen', verified: true,
    about: 'ASHA-certified SLPs specializing in late-talking and minimally verbal children on the autism spectrum. AAC device assessment and training available.',
    services: ['Articulation therapy', 'AAC device support', 'Social communication', 'Feeding therapy', 'Telehealth (NJ)'],
    address: '83 S Livingston Ave, Livingston, NJ 07039',
    hours: 'Mon–Fri  9 AM – 6 PM · Sat 9–1',
    phone: '(973) 555-0331',
    insurance: 'Medicaid · Horizon BCBS · United',
    sampleReviews: [
      { initials: 'NP', name: 'Nina P.', rating: 5, text: 'Tom made our daughter feel safe enough to try — and she did. Incredible therapist.' },
      { initials: 'MK', name: 'Mark K.', rating: 5, text: 'AAC training completely changed communication at home. Cannot recommend enough.' },
    ],
  },
  {
    id: 5, name: 'Sensory Smart OT', cat: 'Therapy', sub: 'Occupational Therapy',
    rating: 4.8, reviews: 22, loc: 'Millburn, NJ', dist: '6.2 mi',
    tint: '#8B5BAE', bg: '#EDE3F4', icon: 'Hand', verified: true,
    about: 'OT practice focused on sensory processing disorders and daily living skills. Certified in Sensory Integration (SI) therapy. Fun gym-based sessions for children 3–16.',
    services: ['Sensory integration (SI)', 'Fine motor skills', 'Self-care / ADL training', 'Handwriting Without Tears', 'Home program design'],
    address: '92 Main St, Millburn, NJ 07041',
    hours: 'Mon–Thu  8 AM – 6 PM · Fri 8–3',
    phone: '(973) 555-0418',
    insurance: 'Medicaid · Aetna · Cigna · Self-pay',
    sampleReviews: [
      { initials: 'AL', name: 'Amy L.', rating: 5, text: 'Working with Amy K. for a year now. Sensory meltdowns have dropped dramatically.' },
      { initials: 'RS', name: 'Rebecca S.', rating: 5, text: 'My daughter actually asks to go to OT now — that says everything.' },
    ],
  },
  {
    id: 6, name: 'Carter & Bell Law Group', cat: 'Legal', sub: 'Special Needs · IEP Law',
    rating: 4.9, reviews: 14, loc: 'Parsippany, NJ', dist: '11 mi',
    tint: '#9C7A1A', bg: '#FFF9E6', icon: 'Scale', verified: true,
    about: 'Special education law firm with 20+ years in NJ. Handles IEP disputes, due process, guardianship (age 18), and ABLE account setup. Free 30-min consultation.',
    services: ['IEP advocacy', 'Due process hearings', 'Guardianship filing', 'ABLE account setup', 'Special needs trusts'],
    address: '1200 US-46, Parsippany, NJ 07054',
    hours: 'Mon–Fri  9 AM – 5 PM',
    phone: '(973) 555-0502',
    insurance: 'Hourly + contingency · Free 30-min consult',
    sampleReviews: [
      { initials: 'DP', name: 'Diana P.', rating: 5, text: 'They got us a 1:1 aide after the district refused for two years. Worth every cent.' },
      { initials: 'TH', name: 'Tom H.', rating: 5, text: 'Very responsive, clear strategy. They know NJ special ed law inside out.' },
    ],
  },
];

window.MARKETPLACE_LISTINGS = MARKETPLACE_LISTINGS;

// ── Marketplace detail screen ─────────────────────────────────────────

function MarketplaceDetailScreen({ listingId, back }) {
  const l = (window.MARKETPLACE_LISTINGS || []).find(x => x.id === listingId);
  const [saved, setSaved] = React.useState(false);
  if (!l) return null;

  const iconMap = { Brain: Icon.Brain, Hospital: Icon.Hospital, School: Icon.School, Pen: Icon.Pen, Hand: Icon.Hand, Scale: Icon.Scale };
  const LI = iconMap[l.icon] || Icon.Brain;

  return (
    <Screen bg={T.bg}>
      <ScreenHeader title="" onBack={back} sticky={false}
        right={
          <button onClick={() => setSaved(s => !s)} style={{ width: 38, height: 38, borderRadius: 999, border: 'none', cursor: 'pointer', background: '#fff', boxShadow: `inset 0 0 0 1px ${T.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon.Bookmark s={18} c={saved ? l.tint : T.ink2} filled={saved}/>
          </button>
        }
      />

      <div style={{ padding: '0 18px 32px' }}>
        {/* Hero */}
        <div style={{ background: `linear-gradient(140deg, ${l.bg}, ${l.tint}22)`, borderRadius: 22, padding: '28px 20px 22px', marginBottom: 18, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, boxShadow: `inset 0 0 0 1px ${l.tint}22` }}>
          <div style={{ width: 64, height: 64, borderRadius: 20, background: `linear-gradient(150deg, ${l.tint}, ${l.tint}BB)`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 8px 20px ${l.tint}44` }}>
            <LI s={30} c="#fff"/>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 4 }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: T.ink, letterSpacing: '-0.02em' }}>{l.name}</div>
              {l.verified && <Icon.Check s={16} c={l.tint} sw={2.5}/>}
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: l.tint, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{l.sub}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13, color: T.ink2 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontWeight: 700 }}>
              <Icon.Star s={13}/> {l.rating}
            </span>
            <span style={{ color: T.muted }}>({l.reviews} reviews)</span>
            <span style={{ color: T.line }}>·</span>
            <span style={{ color: T.muted }}>{l.dist}</span>
          </div>
        </div>

        {/* About */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: T.ink2, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>About</div>
          <div style={{ fontSize: 14, color: T.ink2, lineHeight: 1.6 }}>{l.about}</div>
        </div>

        {/* Services */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: T.ink2, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>Services</div>
          <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: `inset 0 0 0 1px ${T.line}` }}>
            {l.services.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', borderTop: i ? `1px solid ${T.line}` : 'none' }}>
                <Icon.Check s={14} c={l.tint} sw={2.5}/>
                <span style={{ fontSize: 14, color: T.ink, fontWeight: 500 }}>{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: T.ink2, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>Info</div>
          <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: `inset 0 0 0 1px ${T.line}` }}>
            {[
              { label: 'Address', value: l.address, I: Icon.Map },
              { label: 'Hours', value: l.hours, I: Icon.Calendar },
              { label: 'Phone', value: l.phone, I: Icon.Bell },
              { label: 'Insurance', value: l.insurance, I: Icon.Clipboard },
            ].map(({ label, value, I: RI }, i) => (
              <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '11px 14px', borderTop: i ? `1px solid ${T.line}` : 'none' }}>
                <RI s={16} c={T.muted}/>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: T.muted, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 1 }}>{label}</div>
                  <div style={{ fontSize: 13.5, color: T.ink, fontWeight: 500 }}>{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: T.ink2, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>Reviews</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {l.sampleReviews.map((r, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '13px 14px', boxShadow: `inset 0 0 0 1px ${T.line}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <Avatar initials={r.initials} size={32} color={l.tint}/>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: T.ink }}>{r.name}</div>
                    <div style={{ display: 'flex', gap: 2, marginTop: 2 }}>
                      {[...Array(r.rating)].map((_, j) => <Icon.Star key={j} s={11}/>)}
                    </div>
                  </div>
                </div>
                <div style={{ fontSize: 13, color: T.ink2, lineHeight: 1.5 }}>{r.text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 10 }}>
          <Btn variant="primary" style={{ flex: 1 }}>Contact</Btn>
          <Btn variant="secondary" style={{ width: 130 }} full={false}>Directions</Btn>
        </div>
      </div>
    </Screen>
  );
}

Object.assign(window, { MarketplaceDetailScreen });
