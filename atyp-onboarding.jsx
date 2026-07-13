// aTyp — Onboarding screens (5 screens) + the "Ready" success screen.

function WelcomeScreen({ go }) {
  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative',
      background: `radial-gradient(120% 60% at 50% 0%, ${T.mintBg} 0%, ${T.greenSoft} 35%, ${T.bg} 75%)`,
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px', textAlign: 'center' }}>
        {/* Logo mark */}
        <div style={{ marginBottom: 32, position: 'relative' }}>
          <div style={{
            width: 96, height: 96, borderRadius: 28,
            background: T.green, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 18px 40px rgba(45,106,79,0.32)',
            transform: 'rotate(-6deg)',
          }}>
            <span style={{ fontSize: 44, fontWeight: 700, letterSpacing: '-0.04em', fontFamily: 'Manrope, system-ui' }}>a</span>
            <span style={{
              position: 'absolute', right: -10, bottom: -6,
              width: 26, height: 26, borderRadius: 999, background: T.mint,
              border: '3px solid #F8F6F1',
            }}/>
          </div>
        </div>
        <div style={{ fontSize: 40, fontWeight: 700, color: T.ink, letterSpacing: '-0.03em', lineHeight: 1.05 }}>aTyp</div>
        <div style={{ marginTop: 16, fontSize: 18, color: T.ink2, lineHeight: 1.4, maxWidth: 300 }}>
          Your guide through every stage of your child's journey.
        </div>
      </div>
      <div style={{ padding: '0 22px 44px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Btn onClick={() => go('account')}>Get Started</Btn>
        <Btn variant="ghost" onClick={() => go('map')}>I already have an account</Btn>
      </div>
    </div>
  );
}

function AccountScreen({ go, back }) {
  const [v, setV] = React.useState({});
  const set = k => e => setV(s => ({ ...s, [k]: e.target.value }));
  return (
    <Screen bg={T.bg}>
      <div style={{ padding: '8px 22px 0', display: 'flex', alignItems: 'center', gap: 14 }}>
        <button onClick={back} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: T.ink }}>
          <Icon.Back s={22}/>
        </button>
        <StepDots step={1}/>
      </div>
      <div style={{ padding: '20px 22px 8px' }}>
        <div style={{ fontSize: 28, fontWeight: 700, color: T.ink, letterSpacing: '-0.025em', lineHeight: 1.15 }}>Create your account</div>
        <div style={{ fontSize: 15, color: T.muted, marginTop: 6 }}>Step 1 of 4 · Takes about a minute.</div>
      </div>
      <div style={{ padding: '12px 22px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <Field label="First name" value={v.fn} onChange={set('fn')} placeholder="Anat"/>
          <Field label="Last name" value={v.ln} onChange={set('ln')} placeholder="Alvarez"/>
        </div>
        <Field label="Email" value={v.em || 'maria.a@email.com'} onChange={set('em')} placeholder="you@example.com"/>
        <Field label="Password" type="password" value={v.pw || '••••••••••'} onChange={set('pw')}/>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 10 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.ink2, marginBottom: 6 }}>State</div>
            <button style={{
              width: '100%', height: 50, borderRadius: 12,
              border: `1.5px solid ${T.line}`, background: '#fff',
              padding: '0 14px', fontSize: 16, color: T.ink, fontFamily: 'inherit',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer',
            }}>
              New Jersey <Icon.ChevronDown s={16} c={T.muted}/>
            </button>
          </div>
          <Field label="ZIP" value={v.zip || '07042'} onChange={set('zip')} placeholder="07042"/>
        </div>
        <div style={{ marginTop: 6 }}>
          <Btn onClick={() => go('child')}>Continue</Btn>
        </div>
      </div>
    </Screen>
  );
}

function ChildScreen({ go, back }) {
  const [diag, setDiag] = React.useState('confirmed');
  const [gender, setGender] = React.useState('girl');
  return (
    <Screen bg={T.bg}>
      <div style={{ padding: '8px 22px 0', display: 'flex', alignItems: 'center', gap: 14 }}>
        <button onClick={back} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: T.ink }}>
          <Icon.Back s={22}/>
        </button>
        <StepDots step={2}/>
      </div>
      <div style={{ padding: '20px 22px 8px' }}>
        <div style={{ fontSize: 28, fontWeight: 700, color: T.ink, letterSpacing: '-0.025em', lineHeight: 1.15 }}>Tell us about your child</div>
        <div style={{ fontSize: 15, color: T.muted, marginTop: 6 }}>Step 2 of 4 · You can add more children later.</div>
      </div>
      <div style={{ padding: '12px 22px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Field label="Child's first name" value={'Emma'} placeholder="Emma" onChange={()=>{}}/>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.ink2, marginBottom: 6 }}>Date of birth</div>
          <button style={{
            width: '100%', height: 50, borderRadius: 12,
            border: `1.5px solid ${T.line}`, background: '#fff',
            padding: '0 14px', fontSize: 16, color: T.ink, fontFamily: 'inherit',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer',
          }}>
            <span>March 14, 2016</span>
            <Icon.Calendar s={18} c={T.muted}/>
          </button>
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.ink2, marginBottom: 8 }}>Gender <span style={{ color: T.muted, fontWeight: 500 }}>(optional)</span></div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[['girl','Girl'],['boy','Boy'],['nb','Non-binary'],['skip','Prefer not']].map(([k,l]) => (
              <button key={k} onClick={() => setGender(k)} style={{
                flex: 1, height: 44, borderRadius: 12, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: 600,
                background: gender === k ? T.green : '#fff', color: gender === k ? '#fff' : T.ink2,
                boxShadow: gender === k ? 'none' : `inset 0 0 0 1.5px ${T.line}`,
              }}>{l}</button>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.ink2, marginBottom: 8 }}>Diagnosis status</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              ['confirmed', 'Confirmed ASD', 'A clinician has diagnosed.'],
              ['suspected', 'Suspected', "We're in evaluation or waiting."],
              ['other', 'Other / Prefer not to say', ''],
            ].map(([k,l,sub]) => {
              const on = diag === k;
              return (
                <button key={k} onClick={() => setDiag(k)} style={{
                  textAlign: 'left', padding: '14px 16px', borderRadius: 14,
                  border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                  background: on ? T.greenSoft : '#fff',
                  boxShadow: on ? `inset 0 0 0 1.5px ${T.green}` : `inset 0 0 0 1.5px ${T.line}`,
                  display: 'flex', alignItems: 'center', gap: 12,
                }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: 999,
                    border: `2px solid ${on ? T.green : T.line}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>{on && <div style={{ width: 10, height: 10, borderRadius: 999, background: T.green }}/>}</div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: T.ink }}>{l}</div>
                    {sub && <div style={{ fontSize: 13, color: T.muted, marginTop: 2 }}>{sub}</div>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        <div style={{ marginTop: 4 }}>
          <Btn onClick={() => go('notif')}>Continue</Btn>
          <button onClick={() => go('notif')} style={{
            width: '100%', marginTop: 10, padding: 12, background: 'none', border: 'none',
            color: T.muted, fontFamily: 'inherit', fontSize: 14, fontWeight: 500, cursor: 'pointer',
          }}>Skip for now</button>
        </div>
      </div>
    </Screen>
  );
}

function NotifScreen({ go, back }) {
  const [s, setS] = React.useState({ milestones: true, events: true, assistant: true });
  const items = [
    ['milestones', 'Milestone reminders', 'Key planning windows by age stage', Icon.Bell],
    ['events', 'Upcoming events', 'Conferences, workshops, IEP dates', Icon.Calendar],
    ['assistant', 'Assistant tips', 'Smart nudges from your AI helper', Icon.Sparkle],
  ];
  return (
    <Screen bg={T.bg}>
      <div style={{ padding: '8px 22px 0', display: 'flex', alignItems: 'center', gap: 14 }}>
        <button onClick={back} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: T.ink }}>
          <Icon.Back s={22}/>
        </button>
        <StepDots step={3}/>
      </div>
      <div style={{ padding: '20px 22px 8px' }}>
        <div style={{ fontSize: 28, fontWeight: 700, color: T.ink, letterSpacing: '-0.025em', lineHeight: 1.15 }}>Stay on top of what matters</div>
        <div style={{ fontSize: 15, color: T.muted, marginTop: 6 }}>Step 3 of 4 · You can change these anytime.</div>
      </div>
      <div style={{ padding: '16px 22px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {items.map(([k, label, desc, I]) => (
          <div key={k} style={{
            background: '#fff', borderRadius: 16, padding: '16px 18px',
            display: 'flex', alignItems: 'center', gap: 14,
            boxShadow: `inset 0 0 0 1px ${T.line}`,
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12, background: T.greenSoft,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <I s={22} c={T.green}/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 600, color: T.ink }}>{label}</div>
              <div style={{ fontSize: 13, color: T.muted, marginTop: 2 }}>{desc}</div>
            </div>
            <Toggle on={s[k]} onChange={(v) => setS(p => ({ ...p, [k]: v }))}/>
          </div>
        ))}
      </div>
      <div style={{ padding: '12px 22px 24px' }}>
        <Btn onClick={() => go('ready')}>Continue</Btn>
      </div>
    </Screen>
  );
}

function ReadyScreen({ go }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: `radial-gradient(80% 60% at 50% 30%, ${T.mintBg} 0%, ${T.bg} 70%)`,
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ padding: '24px 22px 0' }}>
        <StepDots step={4}/>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px', textAlign: 'center' }}>
        <div style={{
          width: 110, height: 110, borderRadius: 999, background: T.green,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 0 0 12px ${T.greenSoft}, 0 18px 40px rgba(45,106,79,0.28)`,
          marginBottom: 32,
        }}>
          <Icon.Check s={56} c="#fff" sw={3.2}/>
        </div>
        <div style={{ fontSize: 32, fontWeight: 700, color: T.ink, letterSpacing: '-0.025em', lineHeight: 1.1 }}>You're all set!</div>
        <div style={{ marginTop: 14, fontSize: 17, color: T.ink2, lineHeight: 1.45, maxWidth: 320 }}>
          Emma's journey map is ready. Let's explore what's ahead.
        </div>
      </div>
      <div style={{ padding: '0 22px 44px' }}>
        <Btn onClick={() => go('map')}>Go to my Map</Btn>
      </div>
    </div>
  );
}

Object.assign(window, { WelcomeScreen, AccountScreen, ChildScreen, NotifScreen, ReadyScreen });
