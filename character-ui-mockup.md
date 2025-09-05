# Sweek-AI Character Switcher UI Mockup

## Visual Design Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│  ╔═══════════════════════════════════════════════════════════════╗  │
│  ║  🟢 SweekAI                              Settings   Profile    ║  │
│  ╚═══════════════════════════════════════════════════════════════╝  │
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  🧑‍🔬 Albert Einstein                    New Chat  History  │   │
│  │  ● Ready to chat                           ▼                │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  🔍 Search characters by name, category, or personality...   │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                      │
│  [ ✨ All ] [ ⭐ Favorites ] [ 🧑‍🔬 Scientists ] [ 🎮 Gaming ]    │
│  [ 📚 Educational ] [ 🎭 Historical ] [ ✍️ Creative ]             │
│                                                                      │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐      │
│  │   🧑‍🔬 ⚡        │ │   ⛏️ 🎮         │ │   👩‍🔬 ☢️        │      │
│  │      ★          │ │      ☆          │ │      ☆          │      │
│  │                 │ │                 │ │                 │      │
│  │ Albert Einstein │ │ Steve           │ │ Marie Curie     │      │
│  │ Theoretical     │ │ Master builder  │ │ Pioneer in      │      │
│  │ physicist       │ │ from Minecraft  │ │ radioactivity   │      │
│  │                 │ │                 │ │                 │      │
│  │ 🧠 ████████░   │ │ 🎨 ████████░   │ │ 💪 ████████░   │      │
│  │ 😊 ███████░░   │ │ ⚡ ████████░   │ │ 🔬 █████████   │      │
│  │ 🎯 ████████░   │ │ 🤝 ███████░░   │ │ 📚 ████████░   │      │
│  │ 😄 ██████░░░   │ │ 🎮 █████████   │ │ 🌟 ███████░░   │      │
│  │                 │ │                 │ │                 │      │
│  │ 💬 1.2k  ⭐4.9  │ │ 💬 856  ⭐4.8   │ │ 💬 654  ⭐4.9   │      │
│  │                 │ │                 │ │                 │      │
│  │ [Chat with      │ │ [Chat with     │ │ [Chat with     │      │
│  │  Einstein]      │ │  Steve]        │ │  Marie]        │      │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘      │
│                                                                      │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐      │
│  │   💻 🚀         │ │   🎭 ✒️         │ │   📚 🎓         │      │
│  │      ★          │ │      ☆          │ │      ☆          │      │
│  │                 │ │                 │ │                 │      │
│  │ Code Mentor     │ │ Shakespeare     │ │ Study Buddy     │      │
│  │ Your patient    │ │ The Bard of     │ │ Your homework   │      │
│  │ coding guide    │ │ Avon            │ │ helper          │      │
│  │                 │ │                 │ │                 │      │
│  │ 🧘 ████████░   │ │ ✍️ █████████   │ │ 🤗 ████████░   │      │
│  │ 💡 ████████░   │ │ 🎨 ████████░   │ │ 📝 ███████░░   │      │
│  │ 🎯 ████████░   │ │ 🎪 ████████░   │ │ 🎯 ██████░░░   │      │
│  │ 🎉 ███████░░   │ │ 😏 ███████░░   │ │ 🌟 ████████░   │      │
│  │                 │ │                 │ │                 │      │
│  │ 💬 2.3k  ⭐5.0  │ │ 💬 432  ⭐4.7   │ │ 💬 1.8k  ⭐4.8  │      │
│  │                 │ │                 │ │                 │      │
│  │ [Chat with Code │ │ [Chat with     │ │ [Chat with     │      │
│  │  Mentor]        │ │  Shakespeare]  │ │  Study Buddy]  │      │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘      │
└─────────────────────────────────────────────────────────────────────┘
```

## Key Visual Elements

### 1. **Header Bar**
- **Lime Green Gradient** (#96ff00 → #00ff88)
- Black "SA" logo with SweekAI branding
- Settings and Profile buttons

### 2. **Character Quick Switch**
- Currently selected character with avatar
- Live status indicator (pulsing green dot)
- Dropdown arrow for quick switching
- Dark background (#1a1a1a)

### 3. **Search & Filter**
- Full-width search bar with icon
- Category filter tabs with emoji icons
- Active tab highlighted in lime green

### 4. **Character Cards**
- **Dark theme** with subtle borders
- Large emoji avatar with badge
- Favorite star (yellow when active)
- Character name and tagline
- **Personality trait bars**:
  - Visual progress bars
  - Emoji indicators
  - Lime green gradient fill
- Statistics row (chats, rating, badge)
- **Call-to-action button** with gradient

### 5. **Interactive States**
- **Hover**: Card lifts with green glow
- **Selected**: Bright green border
- **Favorite**: Yellow star
- **Active category**: Lime green background

## Color Palette

```css
Primary:    #96ff00 (Lime Green)
Secondary:  #00ff88 (Mint Green)
Background: #0a0a0a (Near Black)
Surface:    #1a1a1a (Dark Gray)
Border:     rgba(150, 255, 0, 0.2)
Text:       #ffffff (White)
Muted:      #888888 (Gray)
Accent:     #fbbf24 (Gold - for favorites)
```

## Typography

- **Headers**: Inter, 18-24px, Bold
- **Body**: Inter, 14-16px, Regular
- **Labels**: Inter, 11px, Uppercase, Tracking
- **Buttons**: Inter, 14px, Semi-bold

## Layout Grid

- **Desktop**: 3-4 cards per row
- **Tablet**: 2 cards per row
- **Mobile**: 1 card per row (stack)

## Interaction Patterns

1. **Quick Switch**: Click current character → Dropdown appears
2. **Search**: Type to filter in real-time
3. **Categories**: Click tab to filter by type
4. **Favorite**: Click star to save/unsave
5. **Select**: Click card or button to switch character

## Mobile Adaptation

On mobile devices:
- Character bar becomes floating action button
- Cards stack vertically
- Search remains sticky at top
- Category tabs become horizontally scrollable

This design creates an engaging, game-like interface that makes character selection fun and intuitive while maintaining the professional Sweek-AI branding with the lime green accent colors.