// Shared UI primitives, theme tokens, and screen container for aTyp.

const T = {
  ink: '#1B2421',
  ink2: '#3D4A45',
  muted: '#7A8580',
  line: '#E5E8E2',
  card: '#FFFFFF',
  bg: '#F8F6F1', // warm cream
  bgAlt: '#F2EFE7',
  green: '#2D6A4F',
  greenSoft: '#E8F2EC',
  greenDeep: '#1F4A37',
  mint: '#74C69D',
  mintBg: '#D8EEDF',
  blue: '#3B82C4',
  yellow: '#E8B948',
  red: '#C25450'
};

window.T = T;

// — Children roster ————————————————————————————————————————————————

const CHILDREN = [
{
  id: 'emma', name: 'Emma', initials: 'E', age: 10, dob: '25 March 2016',
  diagnosis: 'ASD · Level 2', diagShort: 'ASD',
  currentStageId: 'a3', currentStageLabel: 'Ages 9–13',
  color: '#2D6A4F'
},
{
  id: 'liam', name: 'Liam', initials: 'L', age: 23, dob: 'June 2003',
  diagnosis: 'ASD · Level 1', diagShort: 'ASD',
  currentStageId: 'a6', currentStageLabel: 'Ages 22–30',
  color: '#3B82C4'
}];

window.CHILDREN = CHILDREN;

// — Atomic primitives ————————————————————————————————————————

function Btn({ children, variant = 'primary', onClick, full = true, style = {} }) {
  const base = {
    height: 54, borderRadius: 14, border: 'none', cursor: 'pointer',
    fontFamily: 'inherit', fontSize: 17, fontWeight: 600,
    width: full ? '100%' : 'auto', padding: full ? 0 : '0 22px',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    transition: 'transform .08s ease, opacity .15s',
    letterSpacing: '-0.01em'
  };
  const styles = {
    primary: { background: T.green, color: '#fff', boxShadow: '0 1px 0 rgba(31,74,55,0.4) inset, 0 4px 14px rgba(45,106,79,0.2)' },
    secondary: { background: 'transparent', color: T.green, border: `1.5px solid ${T.green}` },
    ghost: { background: 'transparent', color: T.ink2 },
    soft: { background: T.greenSoft, color: T.green },
    dark: { background: T.ink, color: '#fff' }
  };
  return (
    <button onClick={onClick} style={{ ...base, ...styles[variant], ...style }}
    onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.985)'}
    onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
      {children}
    </button>);

}

function Field({ label, value, type = 'text', onChange, placeholder }) {
  return (
    <label style={{ display: 'block' }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: T.ink2, marginBottom: 6, letterSpacing: '0.01em' }}>{label}</div>
      <input type={type} value={value || ''} onChange={onChange} placeholder={placeholder}
      style={{
        width: '100%', height: 50, boxSizing: 'border-box',
        border: `1.5px solid ${T.line}`, borderRadius: 12, background: '#fff',
        padding: '0 14px', fontSize: 16, color: T.ink, fontFamily: 'inherit',
        outline: 'none'
      }}
      onFocus={(e) => e.currentTarget.style.borderColor = T.green}
      onBlur={(e) => e.currentTarget.style.borderColor = T.line} />
      
    </label>);

}

function Toggle({ on, onChange }) {
  return (
    <button onClick={() => onChange(!on)}
    style={{
      width: 50, height: 30, borderRadius: 999, border: 'none', cursor: 'pointer',
      background: on ? T.green : '#D6D8D2', position: 'relative',
      transition: 'background .18s', padding: 0
    }}>
      <div style={{
        position: 'absolute', top: 3, left: on ? 23 : 3, width: 24, height: 24,
        background: '#fff', borderRadius: 999, transition: 'left .18s',
        boxShadow: '0 1px 3px rgba(0,0,0,0.18)'
      }} />
    </button>);

}

function Chip({ children, active = false, onClick, size = 'md' }) {
  const small = size === 'sm';
  return (
    <button onClick={onClick} style={{
      height: small ? 30 : 36,
      padding: small ? '0 12px' : '0 14px',
      borderRadius: 999,
      border: active ? 'none' : `1px solid ${T.line}`,
      background: active ? T.green : '#fff',
      color: active ? '#fff' : T.ink2,
      fontWeight: 600, fontSize: small ? 13 : 14,
      fontFamily: 'inherit', cursor: 'pointer', whiteSpace: 'nowrap',
      flexShrink: 0
    }}>{children}</button>);

}

function Avatar({ initials = 'E', size = 40, color = T.green }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: 999,
      background: `linear-gradient(140deg, ${color}, ${T.greenDeep})`,
      color: '#fff', fontWeight: 700, fontSize: size * 0.42,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0, letterSpacing: '0.02em'
    }} data-comment-anchor="3b4660cad7-div-123-5">{initials}</div>);

}

// Progress dots for onboarding
function StepDots({ step, total = 4 }) {
  return (
    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
      {Array.from({ length: total }).map((_, i) =>
      <div key={i} style={{
        width: i + 1 === step ? 22 : 6, height: 6, borderRadius: 999,
        background: i < step ? T.green : T.line, transition: 'all .2s'
      }} />
      )}
    </div>);

}

// Circular progress ring (used on map nodes & profile)
function ProgressRing({ size = 72, stroke = 6, value = 0, max = 1, color = T.green, track = 'rgba(255,255,255,0.5)' }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(1, value / max));
  return (
    <svg width={size} height={size} style={{ display: 'block' }}>
      <circle cx={size / 2} cy={size / 2} r={r} stroke={track} strokeWidth={stroke} fill="none" />
      <circle cx={size / 2} cy={size / 2} r={r} stroke={color} strokeWidth={stroke} fill="none"
      strokeLinecap="round" strokeDasharray={`${pct * c} ${c}`}
      transform={`rotate(-90 ${size / 2} ${size / 2})`} />
    </svg>);

}

// — Screen container with status bar + bottom tab bar slots ————————————

function Screen({ children, bg = T.bg, bottomTab = null, padTop = true }) {
  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative', background: bg,
      display: 'flex', flexDirection: 'column', overflow: 'hidden'
    }}>
      <div style={{
        flex: 1, overflowY: 'auto', overflowX: 'hidden',
        paddingTop: padTop ? 56 : 0, // status bar space
        paddingBottom: bottomTab ? 96 : 34
      }}>
        {children}
      </div>
      {bottomTab}
    </div>);

}

function ScreenHeader({ title, subtitle, onBack, right = null, sticky = true }) {
  return (
    <div style={{
      position: sticky ? 'sticky' : 'static', top: 0, zIndex: 5,
      background: 'inherit',
      padding: '6px 18px 14px',
      display: 'flex', alignItems: 'center', gap: 10
    }}>
      {onBack &&
      <button onClick={onBack} style={{
        width: 38, height: 38, borderRadius: 999, border: 'none',
        background: 'rgba(255,255,255,0.7)', color: T.ink, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
      }}>
          <Icon.Back s={20} />
        </button>
      }
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: T.ink, lineHeight: 1.15 }}>{title}</div>
        {subtitle && <div style={{ fontSize: 13, color: T.muted, marginTop: 2 }}>{subtitle}</div>}
      </div>
      {right}
    </div>);

}

// Bottom tab bar — four icons. GPS is now embedded in the Assistant tab.
// Profile is reached by tapping the child avatar in screen headers.
function TabBar({ active, onTab }) {
  const tabs = [
  { key: 'home',      label: 'Home',      I: Icon.Home },
  { key: 'events',    label: 'Events',    I: Icon.Calendar },
  { key: 'assistant', label: 'Assistant', I: Icon.Sparkle },
  { key: 'market',    label: 'Market',    I: Icon.Store },
  { key: 'profile',   label: 'Account',   I: Icon.User }];

  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      paddingBottom: 24, paddingTop: 10, paddingInline: 6,
      background: 'rgba(248,246,241,0.92)',
      backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
      borderTop: `1px solid ${T.line}`,
      display: 'flex', justifyContent: 'space-around', zIndex: 30
    }}>
      {tabs.map((t) => {
        const isActive = active === t.key;
        return (
          <button key={t.key} onClick={() => onTab(t.key)} style={{
            flex: 1, padding: '6px 0', background: 'transparent', border: 'none',
            cursor: 'pointer', display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 3,
            color: isActive ? T.green : T.muted,
            fontFamily: 'inherit', fontSize: 10.5, fontWeight: 600, letterSpacing: '0.02em'
          }}>
            <t.I s={24} c={isActive ? T.green : T.muted} />
            <span>{t.label}</span>
          </button>);

      })}
    </div>);

}

Object.assign(window, { Btn, Field, Toggle, Chip, Avatar, StepDots, ProgressRing, Screen, ScreenHeader, TabBar });