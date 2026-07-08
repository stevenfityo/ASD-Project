// Tiny line-icon library for aTyp. Stroked, rounded, friendly.
// Each icon: ({size=22, color='currentColor', stroke=1.8})

const Icon = {
  Home: ({ s = 22, c = 'currentColor', sw = 1.8 }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M3.5 11L12 4l8.5 7v9a1 1 0 01-1 1h-4v-6h-7v6h-4a1 1 0 01-1-1v-9z" stroke={c} strokeWidth={sw} strokeLinejoin="round" />
    </svg>,

  // GPS pin — used for the renamed "GPS" tab (formerly "Map")
  Map: ({ s = 22, c = 'currentColor', sw = 1.8 }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" stroke={c} strokeWidth={sw} strokeLinejoin="round" />
      <circle cx="12" cy="9" r="2.6" stroke={c} strokeWidth={sw} />
    </svg>,

  User: ({ s = 22, c = 'currentColor', sw = 1.8 }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke={c} strokeWidth={sw} />
      <path d="M4 21c1.5-4.5 4.5-7 8-7s6.5 2.5 8 7" stroke={c} strokeWidth={sw} strokeLinecap="round" />
    </svg>,

  Calendar: ({ s = 22, c = 'currentColor', sw = 1.8 }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" stroke={c} strokeWidth={sw} />
      <path d="M3.5 10h17M8 3v4M16 3v4" stroke={c} strokeWidth={sw} strokeLinecap="round" />
    </svg>,

  Store: ({ s = 22, c = 'currentColor', sw = 1.8 }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M4 9l1.2-4.5h13.6L20 9M4 9v10.5h16V9M4 9h16" stroke={c} strokeWidth={sw} strokeLinejoin="round" />
      <path d="M9 14h6v5.5H9z" stroke={c} strokeWidth={sw} />
    </svg>,

  Chat: ({ s = 22, c = 'currentColor', sw = 1.8 }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M4 6.5C4 5.1 5.1 4 6.5 4h11C18.9 4 20 5.1 20 6.5v8c0 1.4-1.1 2.5-2.5 2.5H10l-4 3.5V17H6.5C5.1 17 4 15.9 4 14.5v-8z" stroke={c} strokeWidth={sw} strokeLinejoin="round" />
    </svg>,

  Back: ({ s = 22, c = 'currentColor', sw = 2 }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M15 5l-7 7 7 7" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
    </svg>,

  ChevronRight: ({ s = 18, c = 'currentColor', sw = 2 }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M9 6l6 6-6 6" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
    </svg>,

  ChevronDown: ({ s = 18, c = 'currentColor', sw = 2 }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M6 9l6 6 6-6" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
    </svg>,

  Check: ({ s = 22, c = 'currentColor', sw = 2.4 }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M5 12.5l4.5 4.5L19 7.5" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
    </svg>,

  Lock: ({ s = 18, c = 'currentColor', sw = 1.8 }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <rect x="5" y="10" width="14" height="10" rx="2" stroke={c} strokeWidth={sw} />
      <path d="M8 10V7a4 4 0 018 0v3" stroke={c} strokeWidth={sw} strokeLinecap="round" />
    </svg>,

  Search: ({ s = 20, c = 'currentColor', sw = 1.8 }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="10.5" cy="10.5" r="6.5" stroke={c} strokeWidth={sw} />
      <path d="M15.5 15.5L20 20" stroke={c} strokeWidth={sw} strokeLinecap="round" />
    </svg>,

  Bookmark: ({ s = 18, c = 'currentColor', sw = 1.8, filled = false }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill={filled ? c : 'none'}>
      <path d="M6 4h12v17l-6-4-6 4V4z" stroke={c} strokeWidth={sw} strokeLinejoin="round" />
    </svg>,

  Star: ({ s = 14, c = '#F4B400' }) =>
  <svg width={s} height={s} viewBox="0 0 24 24">
      <path d="M12 2l3 6.5 7 .9-5.1 4.8 1.4 7-6.3-3.5-6.3 3.5 1.4-7L2 9.4l7-.9L12 2z" fill={c} />
    </svg>,

  Plus: ({ s = 22, c = 'currentColor', sw = 2.2 }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M12 5v14M5 12h14" stroke={c} strokeWidth={sw} strokeLinecap="round" />
    </svg>,

  Bell: ({ s = 20, c = 'currentColor', sw = 1.8 }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M6 16V11a6 6 0 1112 0v5l1.5 2H4.5L6 16z" stroke={c} strokeWidth={sw} strokeLinejoin="round" data-comment-anchor="e73b0d0e56-path-89-7" />
      <path d="M10 21a2 2 0 004 0" stroke={c} strokeWidth={sw} strokeLinecap="round" />
    </svg>,

  Heart: ({ s = 18, c = 'currentColor', sw = 1.8 }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M12 20s-8-5-8-11.5A4.5 4.5 0 0112 5a4.5 4.5 0 018 3.5C20 15 12 20 12 20z" stroke={c} strokeWidth={sw} strokeLinejoin="round" />
    </svg>,

  Hand: ({ s = 18, c = 'currentColor', sw = 1.8 }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M9 11V5a1.5 1.5 0 013 0v5M12 10V4a1.5 1.5 0 013 0v6M15 10V6a1.5 1.5 0 013 0v8a6 6 0 01-12 0v-2L4 9.5a1.5 1.5 0 012.5-1.6L9 11" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
    </svg>,

  Bulb: ({ s = 18, c = 'currentColor', sw = 1.8 }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M9 18h6M10 21h4M7 11a5 5 0 1110 0c0 2-1.5 3-2 5H9c-.5-2-2-3-2-5z" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
    </svg>,

  Pen: ({ s = 18, c = 'currentColor', sw = 1.8 }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M4 20l1-4L17 4l3 3L8 19l-4 1z" stroke={c} strokeWidth={sw} strokeLinejoin="round" />
    </svg>,

  Paperclip: ({ s = 18, c = 'currentColor', sw = 1.8 }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M20 12L12 20a5 5 0 11-7-7l8-8a3.5 3.5 0 015 5l-8 8a2 2 0 11-3-3l7-7" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
    </svg>,

  Hospital: ({ s = 22, c = 'currentColor', sw = 1.8 }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M4 21V8l8-4 8 4v13" stroke={c} strokeWidth={sw} strokeLinejoin="round" />
      <path d="M12 11v6M9 14h6" stroke={c} strokeWidth={sw} strokeLinecap="round" />
      <path d="M4 21h16" stroke={c} strokeWidth={sw} strokeLinecap="round" />
    </svg>,

  Brain: ({ s = 22, c = 'currentColor', sw = 1.8 }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M9 5a3 3 0 013 0 3 3 0 013 0 3 3 0 013 3v8a3 3 0 01-3 3 3 3 0 01-3 0 3 3 0 01-3 0 3 3 0 01-3-3V8a3 3 0 013-3z" stroke={c} strokeWidth={sw} strokeLinejoin="round" />
      <path d="M12 5v14" stroke={c} strokeWidth={sw} />
    </svg>,

  School: ({ s = 22, c = 'currentColor', sw = 1.8 }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M3 9l9-4 9 4-9 4-9-4z" stroke={c} strokeWidth={sw} strokeLinejoin="round" />
      <path d="M7 11v5c0 1.5 2.5 3 5 3s5-1.5 5-3v-5M20 9.5V15" stroke={c} strokeWidth={sw} strokeLinecap="round" />
    </svg>,

  Scale: ({ s = 22, c = 'currentColor', sw = 1.8 }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M12 4v16M5 20h14M6 8h12M6 8l-2 6h4l-2-6zM18 8l-2 6h4l-2-6z" stroke={c} strokeWidth={sw} strokeLinejoin="round" />
    </svg>,

  Clipboard: ({ s = 22, c = 'currentColor', sw = 1.8 }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <rect x="5" y="5" width="14" height="16" rx="2" stroke={c} strokeWidth={sw} />
      <rect x="9" y="3" width="6" height="4" rx="1" stroke={c} strokeWidth={sw} />
      <path d="M8 12h8M8 16h5" stroke={c} strokeWidth={sw} strokeLinecap="round" />
    </svg>,

  Folder: ({ s = 22, c = 'currentColor', sw = 1.8 }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" stroke={c} strokeWidth={sw} strokeLinejoin="round" />
    </svg>,

  Switch: ({ s = 18, c = 'currentColor', sw = 1.8 }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M5 9l3-3 3 3M8 6v12M19 15l-3 3-3-3M16 18V6" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
    </svg>,

  Slider: ({ s = 18, c = 'currentColor', sw = 1.8 }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M4 7h11M19 7h1M4 17h5M13 17h7" stroke={c} strokeWidth={sw} strokeLinecap="round" />
      <circle cx="17" cy="7" r="2" stroke={c} strokeWidth={sw} />
      <circle cx="11" cy="17" r="2" stroke={c} strokeWidth={sw} />
    </svg>,

  Sparkle: ({ s = 22, c = 'currentColor', sw = 1.6 }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M12 3.5l1.6 4.5 4.5 1.6-4.5 1.6L12 15.7l-1.6-4.5L5.9 9.6l4.5-1.6L12 3.5z" stroke={c} strokeWidth={sw} strokeLinejoin="round" fill="none" />
      <path d="M18.5 14.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8z" stroke={c} strokeWidth={sw} strokeLinejoin="round" fill="none" />
    </svg>,

  Send: ({ s = 22, c = 'currentColor', sw = 1.8 }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M5 12h13M13 6l6 6-6 6" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
    </svg>,

  Mic: ({ s = 20, c = 'currentColor', sw = 1.8 }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <rect x="9" y="3" width="6" height="12" rx="3" stroke={c} strokeWidth={sw} />
      <path d="M5 11a7 7 0 0014 0M12 18v3M9 21h6" stroke={c} strokeWidth={sw} strokeLinecap="round" />
    </svg>,

  Confetti: ({ s = 28, c = '#2D6A4F' }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M3 21l7-2-5-5-2 7z" fill={c} fillOpacity="0.15" stroke={c} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M14 4l1 2M19 7l2-1M16 11l2 1M21 12l1-1" stroke={c} strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="13" cy="9" r="1" fill={c} />
      <circle cx="20" cy="14" r="1" fill={c} />
    </svg>,

  LogOut: ({ s = 22, c = 'currentColor', sw = 1.8 }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 17l5-5-5-5" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 12H3" stroke={c} strokeWidth={sw} strokeLinecap="round" />
    </svg>,

  Camera: ({ s = 22, c = 'currentColor', sw = 1.8 }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M3 9a2 2 0 012-2h1.5l1-1.6A1.5 1.5 0 019 4.7h6a1.5 1.5 0 011.3.7l1 1.6H19a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke={c} strokeWidth={sw} strokeLinejoin="round" />
      <circle cx="12" cy="13" r="3.2" stroke={c} strokeWidth={sw} />
    </svg>,

  Image: ({ s = 22, c = 'currentColor', sw = 1.8 }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="16" rx="2.5" stroke={c} strokeWidth={sw} />
      <circle cx="8.5" cy="9.5" r="1.6" stroke={c} strokeWidth={sw} />
      <path d="M4 17l4.5-4.5a2 2 0 012.8 0L20 20" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
    </svg>,

  ExternalLink: ({ s = 22, c = 'currentColor', sw = 1.8 }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 3h6v6M10 14L21 3" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
    </svg>

};

window.Icon = Icon;