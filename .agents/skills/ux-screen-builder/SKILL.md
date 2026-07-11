---
name: ux-screen-builder
description: Apply mobile UX/UI best practices and this project's design system BEFORE building or editing a screen, so it doesn't need to be re-audited/reworked afterward. Use when creating a new screen, adding a form/sheet/modal, or restructuring an existing one in the aTyp app.
risk: low
source: local
source_type: project-authored
date_added: 2026-07-11
license: N/A
---

# UX Screen Builder

## When to Use

Before writing or restructuring any screen, form, bottom sheet, modal, card list,
or navigation flow in this app (`atyp-*.jsx`). This is the *build-time* companion
to `ux-audit` (which is *review-time*, for screens that already exist). Using
this skill first should make a later `ux-audit` pass come back clean.

## When NOT to use

- Auditing an already-built screen → use `ux-audit` instead.
- Pure logic/state changes with no UI surface (e.g. data transforms in
  `atyp-gps-data.jsx`).

## 1. Reuse before you build

This project has a shared primitive library in [`atyp-shared.jsx`](../../../atyp-shared.jsx).
Check it first — do not hand-roll a button, input, toggle, chip, avatar, or
screen shell.

| Need | Use |
|---|---|
| Screen shell (safe-area padding, scroll, tab bar slot) | `<Screen>` |
| Header with back button / title / right-side action | `<ScreenHeader>` |
| Buttons (primary/secondary/ghost/soft/dark) | `<Btn variant="...">` |
| Text input | `<Field>` |
| Boolean setting | `<Toggle>` |
| Filter/selector pill | `<Chip>` |
| Child/person avatar | `<Avatar>` |
| Bottom sheet / "add X" flow | `<Sheet>` |
| Onboarding progress | `<StepDots>` |
| Circular progress (milestones, profile) | `<ProgressRing>` |

Colors, spacing and type must come from the `T` token object (`T.ink`, `T.green`,
`T.line`, etc.) — never hardcode a hex or an ad-hoc font size that isn't already
used elsewhere in the file you're editing.

## 2. Structural checklist (apply while building, not after)

**Layout**
- [ ] Wrapped in `<Screen>`; if it has a tab bar, pass `bottomTab`
- [ ] Uses `<ScreenHeader onBack={...}>` on every non-root screen (User Control & Freedom)
- [ ] One primary task/hero element per screen — no competing CTAs
- [ ] Cards/list rows share the same radius, shadow, and padding as sibling screens

**Touch & spacing**
- [ ] Interactive elements ≥ 44×44px (buttons already default to 54px height — don't shrink below the standard)
- [ ] ≥ 8px gap between adjacent tappable elements
- [ ] Spacing values reuse the increments already used in the file (6/10/14/18/22...) rather than inventing new ones

**Forms & input**
- [ ] Every `<Field>` has a visible `label`, not just a placeholder
- [ ] Destructive actions use `variant="ghost"`/distinct styling + confirmation, never look like `primary`
- [ ] Validate on blur, not on every keystroke

**Feedback & state**
- [ ] Loading state considered (skeleton, not a bare spinner) for anything async
- [ ] Empty state has a message + next action, not a blank area
- [ ] Success/error feedback after a save/submit action

**Navigation & dismissal**
- [ ] `<Sheet>` usage includes `onClose` wired to backdrop tap and an explicit close affordance
- [ ] No dead ends — every screen reachable can also be exited

**Accessibility**
- [ ] Text contrast against `T.bg`/`T.card` stays legible (don't use `T.muted` for anything load-bearing)
- [ ] Icons that convey meaning have a text label nearby (see `TabBar` for the pattern)

## 3. Before marking the screen done

Skim the full Nielsen heuristics list in `ux-audit`'s SKILL.md once — it's the
same list this checklist is derived from, just framed for review instead of
construction. If something there doesn't map to a line above, apply it anyway.

## Limitations

- This encodes conventions observed in the current `atyp-*.jsx` files; if the
  design system changes, update this file rather than working around it.
- Still exercise judgment for one-off screens (e.g. GPS map) that legitimately
  need bespoke layout — the goal is consistency, not rigidity.
