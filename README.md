# Chronicle

> Your personal sanctuary for growth - a comprehensive life management app with a warm, natural design that feels like home.

## ✨ Features

- **📝 Daily To-Dos**: Manage your tasks with an intuitive, distraction-free interface
- **🎯 Long-Term Goals**: Track progress on your biggest ambitions with elegant progress bars
- **📖 Journal**: Write daily reflections in a peaceful writing environment
- **🔥 Habit Tracker**: Build consistency with visual streak tracking
- **💰 Expense Tracker**: Monitor spending with clear category breakdowns
- **📅 365-Day Heatmap**: Visualize your productivity journey across the year
- **⌨️ Keyboard Shortcuts**: Navigate efficiently with intuitive shortcuts
- **🎨 Natural Design**: Warm, earthy aesthetic that feels human-crafted
- **💾 Auto-Save**: All data automatically persists locally
- **🔔 Toast Notifications**: Gentle feedback for all actions

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Visit `http://localhost:3000` to see your Chronicle dashboard.

## 📁 Project Structure

```
chronicle/
├── src/
│   ├── components/
│   │   ├── common/        # Reusable UI components (Card, SectionHeader, Toast)
│   │   └── pages/         # Page components (Dashboard, Todos, Goals, etc.)
│   ├── hooks/             # Custom React hooks (keyboard shortcuts)
│   ├── store/             # Zustand state management
│   ├── styles/            # Global CSS and Tailwind configuration
│   ├── utils/             # Helper functions
│   └── main.tsx           # App entry point
├── archive/               # Old standalone HTML files
├── public/                # Static assets
└── index.html             # Vite entry point
```

## 🎨 Design System

Chronicle features a warm, natural design inspired by paper, nature, and comfort:

### Color Palette
- **Base**: Cream (#FFF8F0), Sand (#F5EBE0), Warm Gray (#E3DED8)
- **Text**: Charcoal (#4A4238), Ink (#2D2621), Stone (#C8BDB1)
- **Accents**: Sage (#A8B896), Terracotta (#D4856A), Ochre (#E6A756), Clay (#C4917A)

### Typography
- **Display**: Outfit (headers, 400-800 weight)
- **Body**: Inter (content, 300-700 weight)
- **Scale**: Carefully tuned line heights and letter spacing for readability

### Components
- **Soft shadows**: Layered, subtle depth (0.04-0.08 opacity)
- **Border radius**: Organic curves (0.5rem soft, 1.25rem card, 1.75rem large)
- **Animations**: Smooth cubic-bezier easing for natural motion
- **Patterns**: Subtle dot and grid backgrounds for texture

## 🛠️ Technology Stack

- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool and dev server
- **Zustand** - Lightweight state management
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling with custom design tokens
- **Lucide React** - Beautiful, consistent icons
- **localStorage** - Client-side data persistence

## ⌨️ Keyboard Shortcuts

- **n** - Create new item (context-aware)
- **j/k** - Navigate down/up in lists
- **d** - Delete selected item
- **Enter** - Edit/toggle selected item
- **Esc** - Cancel/close dialogs
- **Ctrl+/** - Show shortcuts help (coming soon)

## 📋 Development Status

Chronicle is currently in **Phase 3: Polish & UX** - the core React application with warm, natural design is complete!

### ✅ Completed
- Modern React 18 + TypeScript + Vite architecture
- All 6 pages migrated (Dashboard, Todos, Goals, Journal, Habits, Expenses)
- Warm, natural design system (cream, sage, terracotta palette)
- Toast notification system
- Keyboard shortcuts
- Component library (Card variants, SectionHeader)
- localStorage persistence with Zustand

### 🎯 Next Steps
See [SCALING_PLAN.md](./SCALING_PLAN.md) for the complete roadmap to production.

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome!

## 📄 License

MIT License - feel free to use this for your own productivity needs.

- Icons by [Lucide](https://lucide.dev/)
- Styling by [Tailwind CSS](https://tailwindcss.com/)
- Built with [React](https://react.dev/)

## 📧 Contact

For questions or feedback, please open an issue or reach out on [Twitter](https://twitter.com/yourhandle).

---

**Chronicle** - Track your life, achieve your goals. 🚀
