# Design Guidelines: NoteSense AI - Voice Processing Application

## Design Approach
**System-Based with Custom Modifications**: Material Design 3 foundation adapted for productivity-focused voice interface, drawing inspiration from Google Translate's clarity and Otter.ai's recording-first interface.

## Core Design Principles
1. **Recording-First Design**: The microphone/record button is the hero element
2. **Immediate Feedback**: Every user action receives visual confirmation
3. **Progressive Disclosure**: Complex features revealed contextually
4. **Glanceable Results**: Information hierarchy optimized for quick scanning

---

## Typography System

**Primary Font Stack**: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif

**Hierarchy:**
- Hero Text/Primary CTA: 48px/semibold (3xl on mobile)
- Section Headers: 32px/bold
- Card Titles: 24px/semibold
- Body Text: 16px/regular, line-height 1.6
- Captions/Metadata: 14px/medium
- Button Text: 16px/medium, letter-spacing 0.5px
- Recording Status: 20px/semibold with subtle animation

**Font Loading**: Google Fonts CDN (Inter: 400, 500, 600, 700 weights)

---

## Layout System

**Spacing Units**: Use Tailwind units of 2, 4, 6, 8, 12, 16, 20 consistently
- Micro spacing (icons, inline elements): 2, 4
- Component padding: 6, 8
- Card spacing: 12, 16
- Section spacing: 20
- Page margins: 8, 12, 16

**Grid Structure:**
- Max container width: 1200px (max-w-6xl)
- Content sections: max-w-4xl for optimal readability
- Card grids: 1 column mobile, 2-3 columns desktop (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)

**Responsive Breakpoints:**
- Mobile: base (< 768px)
- Tablet: md (768px+)
- Desktop: lg (1024px+)
- Wide: xl (1280px+)

---

## Component Library

### Authentication Components
**Login/Register Cards**
- Centered modal overlay (max-w-md)
- Card with shadow-lg and rounded-2xl
- Replit Auth button (primary action)
- Email/password fields with floating labels
- Error messages in #FF6B6B below inputs
- Padding: p-8

### Voice Recording Interface

**Recording Button (Primary Interaction)**
- Size: 120px diameter desktop, 100px mobile
- Perfectly centered in viewport initially
- Icon: Heroicons microphone (24px)
- States:
  - Idle: Border ring in #10A37F, white background
  - Recording: Solid #FF6B6B background, pulsing animation (scale 1.05)
  - Processing: Spinner overlay, #4299E1 accent
- Drop shadow: shadow-xl with increased intensity on hover
- Touch target: Minimum 96px diameter

**Waveform Visualizer**
- Positioned directly below record button
- Height: 80px desktop, 60px mobile
- Canvas-based real-time visualization
- Wave color: #10A37F at 60% opacity
- Background: transparent

**Recording Timer**
- Positioned above record button
- Format: "00:00" display
- Font: Tabular numbers, 32px/semibold
- Color: #FF6B6B during recording, #1A202C otherwise

### Results Display Cards

**Transcription Card**
- Full-width container with max-w-4xl
- Background: white with border-l-4 in #10A37F
- Padding: p-8
- Rounded: rounded-xl
- Shadow: shadow-md
- Header: "Transcription" with copy button (Heroicons clipboard-document)
- Text area: Minimum height 150px, scrollable
- Font: 16px/regular, line-height 1.7

**Summary Card**
- Layout identical to transcription
- Border accent: #4299E1
- Header: "AI Summary" with regenerate button
- Collapsible detail levels (Brief/Standard/Detailed)
- Toggle buttons: Horizontal pill group with active state

**Translation Card**
- Border accent: #48BB78
- Language selector: Dropdown (20+ languages)
- Positioned in card header
- Flag icons from CDN (optional enhancement)
- Input/Output split layout on desktop (2 columns)

### Navigation & Layout

**Top Navigation Bar**
- Height: 64px
- Background: white with shadow-sm
- Logo: Left-aligned, 32px height
- User menu: Right-aligned avatar (40px circle)
- Navigation links: Hidden on mobile, hamburger menu
- Position: sticky top-0

**Dashboard Layout (Post-Auth)**
- Hero Section: 50vh minimum with large record button centered
- Quick Actions: Grid of 3 cards (Recent, Upload, Settings)
- History Section: List view with infinite scroll
- Sidebar: Fixed left sidebar on desktop (260px), drawer on mobile

**History List Items**
- Card-based design with hover elevation
- Height: Auto-fit content, minimum 100px
- Layout: Left metadata (date/time, duration), Right preview text
- Actions: Edit, Delete, Share icons (Heroicons, 20px)
- Divider: 1px border-b between items

### Form Elements

**Input Fields**
- Height: 48px
- Padding: px-4
- Border: 2px solid #E2E8F0, focus border #10A37F
- Rounded: rounded-lg
- Font size: 16px (prevents zoom on iOS)
- Placeholder: #A0AEC0

**Buttons**
- Primary: bg-#10A37F, white text, shadow-md
- Secondary: Border-2 #10A37F, text #10A37F
- Danger: bg-#FF6B6B, white text
- Height: 48px (44px mobile minimum for touch)
- Padding: px-8
- Rounded: rounded-lg
- Font: 16px/medium
- Hover: Translate-y by -1px, shadow-lg

**Dropdowns/Selects**
- Custom styled (not native select)
- Height: 48px to match inputs
- Chevron icon: Heroicons chevron-down
- Menu: Absolute positioning, max-height 300px scroll

### Feedback & States

**Loading States**
- Spinner: Heroicons arrow-path with spin animation
- Skeleton screens: Pulse animation for card content
- Progress bars: Indeterminate #10A37F track

**Notifications/Toasts**
- Position: Fixed top-right
- Width: 360px max
- Auto-dismiss: 5 seconds
- Types: Success (#48BB78), Error (#FF6B6B), Info (#4299E1)
- Icon + Message layout with close button

**Empty States**
- Illustration placeholder: Heroicons document-text at 120px
- Centered text: "No recordings yet"
- CTA button: "Start Recording"

---

## Iconography
**Icon Library**: Heroicons (outline style primary, solid for active states)
**Icon Sizes**: 16px (inline), 20px (buttons), 24px (features), 32px+ (heroes)
**CDN**: Load via Heroicons CDN

---

## Animations (Minimal & Purposeful)

**Use Only For:**
1. Recording pulse: Scale from 1 to 1.05, 1.5s ease-in-out infinite
2. Button hovers: Translate-y -1px, shadow expansion (150ms)
3. Card entry: Fade-in with slight translate-y (300ms stagger)
4. Microphone permission: Success checkmark animation

**Avoid:** Page transitions, excessive scroll effects, decorative animations

---

## Accessibility Requirements

- Color contrast: WCAG AA minimum (4.5:1 text, 3:1 UI)
- Focus indicators: 3px #4299E1 outline with 2px offset
- ARIA labels: All interactive elements
- Keyboard navigation: Full tab order, Enter/Space activation
- Screen reader: Live regions for recording status
- Motion: Respect prefers-reduced-motion

---

## Images

**No Hero Images Required** - This is a tool-focused application where the primary interaction (record button) serves as the visual anchor.

**Icon/Graphics Only:**
- Authentication screens: Small OpenAI logo (80px) centered above login card
- Empty states: Simple icon illustrations (not photos)
- User avatars: Circular 40px in navigation
- Tutorial overlays: Simple diagrams if needed for microphone permissions

The design prioritizes functional clarity over decorative imagery, maintaining focus on the recording interface and text results.