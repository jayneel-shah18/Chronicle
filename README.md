# Chronicle

> A comprehensive life management dashboard for tracking your daily todos, long-term goals, habits, journal entries, and expenses.

![Chronicle Dashboard](./docs/screenshot.png)

## ✨ Features

- **📝 Daily To-Dos**: Manage your tasks with a clean, intuitive interface
- **🎯 Long-Term Goals**: Track progress on your biggest ambitions with progress bars
- **📖 Journal**: Write daily reflections and review past entries
- **🔥 Habit Tracker**: Build consistency with daily habit tracking
- **💰 Expense Tracker**: Monitor spending by category
- **📅 365-Day Calendar**: Visualize your productivity across the year
- **🌙 Dark Mode**: Beautiful dark theme for comfortable viewing
- **💾 Auto-Save**: All data automatically persists locally

## 🚀 Quick Start

### Current Version (Standalone HTML)

Simply open `index.html` in your browser! No installation required.

### Development Version (React + Vite)

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

## 📁 Project Structure

```
chronicle/
├── src/                    # Source files (React app)
│   ├── components/        # React components
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API services
│   ├── types/            # TypeScript types
│   └── utils/            # Helper functions
├── public/               # Static assets
├── tests/                # Test files
├── docs/                 # Documentation
├── index.html            # Standalone version
├── todos.html           # Standalone todos page
├── goals.html           # Standalone goals page
├── journal.html         # Standalone journal page
├── habits.html          # Standalone habits page
└── expenses.html        # Standalone expenses page
```

## 🎨 Design System

Chronicle uses a carefully crafted design system:

- **Colors**: Dark navy background (#0f172a), slate cards (#1e293b)
- **Accents**: Blue (#3b82f6), Amber (#f59e0b), Emerald (#10b981), Rose (#f43f5e)
- **Typography**: System font stack for optimal performance
- **Layout**: Responsive grid with mobile-first approach

## 🛠️ Technology Stack

### Current
- React 18 (via CDN)
- Tailwind CSS (via CDN)
- localStorage for data persistence

### Planned (Production)
- React 18 + TypeScript
- Vite
- Supabase (Backend + Auth)
- React Router
- Zustand (State Management)
- React Hook Form + Zod
- Lucide React Icons

## 📋 Roadmap

See [SCALING_PLAN.md](./SCALING_PLAN.md) for detailed roadmap.

### Phase 1: Foundation ✅ (In Progress)
- [x] Core functionality
- [x] Standalone pages
- [x] Data synchronization
- [ ] Modern build setup
- [ ] Component library
- [ ] TypeScript migration

### Phase 2: Backend & Database
- [ ] User authentication
- [ ] PostgreSQL database
- [ ] API development
- [ ] Multi-device sync

### Phase 3: Enhanced Features
- [ ] PWA support
- [ ] Data export
- [ ] Search functionality
- [ ] Notifications

### Phase 4: Testing & Quality
- [ ] Unit tests
- [ ] E2E tests
- [ ] Accessibility audit
- [ ] Performance optimization

### Phase 5: Deployment
- [ ] CI/CD pipeline
- [ ] Production deployment
- [ ] Monitoring
- [ ] Analytics

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Styling by [Tailwind CSS](https://tailwindcss.com/)
- Built with [React](https://react.dev/)

## 📧 Contact

For questions or feedback, please open an issue or reach out on [Twitter](https://twitter.com/yourhandle).

---

**Chronicle** - Track your life, achieve your goals. 🚀
